import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Add a new question
 */
export const addQuestion = async (req, res) => {
  try {
    const { subject, subtopic, question_text, answer_text } = req.body;

    // 1. Find subject
    const foundSubject = await prisma.subjects.findUnique({
      where: { name: subject },
    });
    if (!foundSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    // 2. Find subtopic under subject
    const foundSubtopic = await prisma.subtopics.findFirst({
      where: {
        name: subtopic,
        subject_id: foundSubject.id,
      },
    });
    if (!foundSubtopic) {
      return res.status(404).json({ error: "Subtopic not found" });
    }

    // 3. Insert new question
    const question = await prisma.questions.create({
      data: {
        subject_id: foundSubject.id,
        subtopic_id: foundSubtopic.id,
        question_text,
        answer_text,
      },
    });

    res.status(201).json(question);
  } catch (err) {
    console.error(err);
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Question or answer already exists" });
    }
    res.status(500).json({ error: "Failed to add question" });
  }
};

/**
 * Fetch all questions for a subtopic
 */
export const fetchQuestions = async (req, res) => {
  try {
    const { subtopicId } = req.params;

    const questions = await prisma.questions.findMany({
      where: { subtopic_id: subtopicId },
      orderBy: { created_at: "asc" },
    });

    res.json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

/**
 * Update a question
 */
export const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { question_text, answer_text } = req.body;

    if (!question_text || !answer_text) {
      return res.status(400).json({
        error: "Both question_text and answer_text are required",
      });
    }

    const updated = await prisma.questions.update({
      where: { id: questionId },
      data: {
        question_text,
        answer_text,
        updated_at: new Date(),
      },
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Question or answer already exists" });
    }
    if (err.code === "P2025") {
      // Record not found
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(500).json({ error: "Failed to update question" });
  }
};

/**
 * Delete a question
 */
export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    await prisma.questions.delete({
      where: { id: questionId },
    });

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error(err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(500).json({ error: "Failed to delete question" });
  }
};
