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
 * Add Interview Experience
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
    } = req.body;

    const experience = await prisma.interview_experiences.create({
      data: {
        user_id: req.user.id, // ✅ always trust token, not body
        company_name,
        role,
        linkedin_url,
        github_url,
        content,
        offer_type,
        opportunity_type,
        is_public,
      },
    });

    await invalidateInterviewExperienceCache();
    res.status(201).json(experience);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add Interview Experience" });
  }
};

/**
 * Fetch unpublished interview experiences
 * - Admins: see all
 * - Users: see only their own
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

    res.json(experiences);
  } catch (err) {
    console.error("Error fetching unpublished experiences:", err);
    res.status(500).json({ error: "Failed to fetch unpublished experiences" });
  }
};

/**
 * Delete interview experience
 */
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: userId, isAdmin } = req.user;

    const exp = await prisma.interview_experiences.findUnique({ where: { id } });
    if (!exp) {
      return res.status(404).json({ error: "Experience not found" });
    }

    // console.log("DEBUG DELETE", {
    //   expUserId: exp.user_id,
    //   requestUserId: userId,
    //   isAdmin,
    // });

    if (String(exp.user_id) !== String(userId) && !isAdmin) {
      return res.status(403).json({ error: "Unauthorized to delete this experience" });
    }

    const deleted = await prisma.interview_experiences.delete({ where: { id } });
    await invalidateInterviewExperienceCache();
    res.json(deleted);
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.status(500).json({ error: "Failed to delete interview experience" });
  }
};

/**
 * Update interview experience
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
    });

    await invalidateInterviewExperienceCache();
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update interview experience" });
  }
};

/**
 * Approve interview experience (set is_public = true)
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
    });

    await invalidateInterviewExperienceCache();
    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Experience not found" });
    }
    res.status(500).json({ error: "Failed to approve interview experience" });
  }
};

/**
 * Fetch public interview experiences
 */
export const fetchPublicInterviewExperiences = async (req, res) => {
  try {
    const experiences = await prisma.interview_experiences.findMany({
      where: { is_public: true },
      orderBy: { company_name: "asc" },
      include: { users: { select: { full_name: true } } },
    });

    res.json(experiences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch public interview experiences" });
  }
};

/**
 * Fetch interview experiences for a specific user
 */
export const fetchUserInterviewExperiences = async (req, res) => {
  try {
    const { userId } = req.params;

    const experiences = await prisma.interview_experiences.findMany({
      where: {
        user_id: userId,
        OR: [{ is_public: true }, { is_public: false }],
      },
      orderBy: { created_at: "desc" },
      include: {
        users: { select: { full_name: true } },
      },
    });

    res.json(experiences);
  } catch (err) {
    console.error("Error fetching user experiences:", err);
    res.status(500).json({ error: "Failed to fetch user experiences" });
  }
};
