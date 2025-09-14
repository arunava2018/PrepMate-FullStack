import { PrismaClient } from "@prisma/client";
import { cacheClient } from "../utils/cacheClient.js";

const prisma = new PrismaClient();

export const getSubjects = async (req, res) => {
  try {
    const subjects = await prisma.subjects.findMany();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subjects" });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const subject = await prisma.subjects.findUnique({
      where: { id: req.params.id },
    });
    if (!subject) return res.status(404).json({ error: "Subject not found" });
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch subject" });
  }
};

export const addSubject = async (req, res) => {
  try {
    const { name } = req.body;
    const subject = await prisma.subjects.create({ data: { name } });

    // Invalidate subject caches
    await cacheClient.del("subjects:all");

    res.status(201).json({ message: "Subject added successfully", subject });
  } catch (err) {
    res.status(500).json({ error: "Failed to add subject" });
  }
};
