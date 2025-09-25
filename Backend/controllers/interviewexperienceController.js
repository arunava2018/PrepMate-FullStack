import { PrismaClient } from "@prisma/client";
import { cacheClient } from "../utils/cacheClient.js";

const prisma = new PrismaClient();

/**
 * Helper: Invalidate interview experience caches
 */
const invalidateInterviewExperienceCache = async () => {
  try {
    await cacheClient.del("interview:public");
    await cacheClient.del("interview:unpublished");
    console.log("Interview experience caches invalidated");
  } catch (e) {
    console.error("Cache invalidation error:", e?.message || e);
  }
};

/**
 * ➕ Add Interview Experience
 */
export const addInterviewExperience = async (req, res) => {
  try {
    const {
      company_name,
      role,
      linkedin_url,
      github_url,
      content,
      offer_type,
      opportunity_type,
      is_public = false,
      is_anonymous = false,
    } = req.body;

    const experience = await prisma.interview_experiences.create({
      data: {
        user_id: req.user.id, // ✅ always trust token
        company_name,
        role,
        linkedin_url,
        github_url,
        content,
        offer_type,
        opportunity_type,
        is_public,
        is_anonymous,
      },
      include: {
        users: { select: { full_name: true } },
      },
    });

    await invalidateInterviewExperienceCache();

    // Mask if anonymous
    if (experience.is_anonymous) {
      experience.users.full_name = "Anonymous";
    }

    res.status(201).json(experience);
  } catch (err) {
    console.error("Error adding experience:", err);
    res.status(500).json({ error: "Failed to add Interview Experience" });
  }
};

/**
 * 👁️ Fetch a single interview experience by ID
 */
export const fetchExperienceById = async (req, res) => {
  try {
    const { id } = req.params;

    const experience = await prisma.interview_experiences.findUnique({
      where: { id },
      include: {
        users: { select: { full_name: true } },
      },
    });

    if (!experience) {
      return res.status(404).json({ error: "Experience not found" });
    }

    // Auth checks for public/private
    if (experience.is_public) {
      if (!req.user) {
        return res.status(401).json({ error: "Authentication required" });
      }
    } else {
      if (
        !req.user ||
        (String(experience.user_id) !== String(req.user.id) && !req.user.isAdmin)
      ) {
        return res.status(403).json({ error: "Unauthorized to view this experience" });
      }
    }

    // Mask name if anonymous
    if (experience.is_anonymous) {
      experience.users.full_name = "Anonymous";
    }

    res.json(experience);
  } catch (err) {
    console.error("Error fetching experience by ID:", err);
    res.status(500).json({ error: "Failed to fetch experience" });
  }
};

/**
 * 📥 Fetch unpublished interview experiences
 */
export const fetchUnpublishedInterviewExperiences = async (req, res) => {
  try {
    const { id, isAdmin } = req.user;

    const whereClause = {
      is_public: false,
      ...(isAdmin ? {} : { user_id: id }),
    };

    const experiences = await prisma.interview_experiences.findMany({
      where: whereClause,
      orderBy: { created_at: "desc" },
      include: {
        users: { select: { full_name: true } },
      },
    });

    // Mask names for anonymous ones
    experiences.forEach((exp) => {
      if (exp.is_anonymous) exp.users.full_name = "Anonymous";
    });

    res.json(experiences);
  } catch (err) {
    console.error("Error fetching unpublished experiences:", err);
    res.status(500).json({ error: "Failed to fetch unpublished experiences" });
  }
};

/**
 * ❌ Delete interview experience
 */
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, isAdmin } = req.user;

    const exp = await prisma.interview_experiences.findUnique({ where: { id } });
    if (!exp) {
      return res.status(404).json({ error: "Experience not found" });
    }

    if (String(exp.user_id) !== String(userId) && !isAdmin) {
      return res.status(403).json({ error: "Unauthorized to delete this experience" });
    }

    const deleted = await prisma.interview_experiences.delete({ where: { id } });
    await invalidateInterviewExperienceCache();
    res.json(deleted);
  } catch (err) {
    console.error("Error deleting experience:", err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.status(500).json({ error: "Failed to delete interview experience" });
  }
};

/**
 * ✏️ Update interview experience
 */
export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, isAdmin } = req.user;
    const updatedData = req.body;

    const exp = await prisma.interview_experiences.findUnique({ where: { id } });
    if (!exp) {
      return res.status(404).json({ error: "Experience not found" });
    }

    if (String(exp.user_id) !== String(userId) && !isAdmin) {
      return res.status(403).json({ error: "Unauthorized to update this experience" });
    }

    if (exp.is_public) {
      return res.status(400).json({ error: "Published experiences cannot be edited" });
    }

    const updated = await prisma.interview_experiences.update({
      where: { id },
      data: updatedData,
      include: { users: { select: { full_name: true } } },
    });

    await invalidateInterviewExperienceCache();

    // Mask if anonymous
    if (updated.is_anonymous) {
      updated.users.full_name = "Anonymous";
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating experience:", err);
    res.status(500).json({ error: "Failed to update interview experience" });
  }
};

/**
 * ✅ Approve interview experience
 */
export const approveExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const payload = {
      ...updatedData,
      content: updatedData.content || updatedData.experience || "",
      is_public: true,
    };
    delete payload.experience;

    const updated = await prisma.interview_experiences.update({
      where: { id },
      data: payload,
      include: { users: { select: { full_name: true } } },
    });

    await invalidateInterviewExperienceCache();

    if (updated.is_anonymous) {
      updated.users.full_name = "Anonymous";
    }

    res.json(updated);
  } catch (err) {
    console.error("Error approving experience:", err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.status(500).json({ error: "Failed to approve interview experience" });
  }
};

/**
 * 🌍 Fetch all public interview experiences
 */
export const fetchPublicInterviewExperiences = async (req, res) => {
  try {
    const experiences = await prisma.interview_experiences.findMany({
      where: { is_public: true },
      orderBy: { company_name: "asc" },
      include: { users: { select: { full_name: true } } },
    });

    experiences.forEach((exp) => {
      if (exp.is_anonymous) exp.users.full_name = "Anonymous";
    });

    res.json(experiences);
  } catch (err) {
    console.error("Error fetching public experiences:", err);
    res.status(500).json({ error: "Failed to fetch public interview experiences" });
  }
};

/**
 * 👤 Fetch interview experiences for a specific user
 */
export const fetchUserInterviewExperiences = async (req, res) => {
  try {
    const { userId } = req.params;

    const experiences = await prisma.interview_experiences.findMany({
      where: { user_id: userId },
      orderBy: { created_at: "desc" },
      include: {
        users: { select: { full_name: true } },
      },
    });

    experiences.forEach((exp) => {
      if (exp.is_anonymous) exp.users.full_name = "Anonymous";
    });

    res.json(experiences);
  } catch (err) {
    console.error("Error fetching user experiences:", err);
    res.status(500).json({ error: "Failed to fetch user experiences" });
  }
};
