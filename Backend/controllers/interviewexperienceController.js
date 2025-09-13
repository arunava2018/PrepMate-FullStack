import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Add Interview Experience
 */
export const addInterviewExperience = async (req, res) => {
  try {
    const {
      userId,
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
        user_id: userId,
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

    res.status(201).json(experience);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add Interview Experience" });
  }
};

/**
 * Fetch unpublished interview experiences
 */
export const fetchUnpublishedInterviewExperiences = async (req, res) => {
  try {
    const experiences = await prisma.interview_experiences.findMany({
      where: { is_public: false },
      select: {
        id: true,
        company_name: true,
        user_id: true,
        content: true,
        linkedin_url: true,
        github_url: true,
        role: true,
        offer_type: true,
        opportunity_type: true,
        users: {
          select: { full_name: true },
        },
      },
    });

    res.json(experiences);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch unpublished interview experiences" });
  }
};

/**
 * Delete interview experience
 */
export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await prisma.interview_experiences.delete({
      where: { id },
    });

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
      include: {
        users: { select: { full_name: true } },
      },
    });

    res.json(experiences);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to fetch public interview experiences" });
  }
};
