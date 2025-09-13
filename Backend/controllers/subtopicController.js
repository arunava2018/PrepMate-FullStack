import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// -------- Add Subtopics for a specific subject --------
export const addSubtopic = async (req, res) => {
  try {
    const { subject, name } = req.body;

    // 1. find subject
    const foundSubject = await prisma.subjects.findUnique({
      where: { name: subject },
    });

    if (!foundSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    // 2. create subtopic
    const subtopic = await prisma.subtopics.create({
      data: {
        name,
        subject_id: foundSubject.id,
      },
    });

    res.status(201).json(subtopic);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add subtopics" });
  }
};

// -------- Fetch Subtopics for a Subject --------
export const fetchSubtopics = async (req, res) => {
  try {
    const { subject } = req.params; 

    const foundSubject = await prisma.subjects.findUnique({
      where: { name: subject },
    });

    if (!foundSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    const subtopics = await prisma.subtopics.findMany({
      where: { subject_id: foundSubject.id },
    });

    res.json(subtopics);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch subtopics" });
  }
};
