import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * ➕ Add a new question
 */
export const addQuestion = async (req, res) => {
  try {
    const { subject_id, subtopic_id, question_text, answer_text } = req.body;

    if (!subject_id || !subtopic_id || !question_text || !answer_text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Validate subject
    const foundSubject = await prisma.subjects.findUnique({
      where: { id: subject_id },
    });
    if (!foundSubject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    // Validate subtopic belongs to subject
    const foundSubtopic = await prisma.subtopics.findFirst({
      where: { id: subtopic_id, subject_id },
    });
    if (!foundSubtopic) {
      return res
        .status(404)
        .json({ error: "Subtopic not found in this subject" });
    }

    // Create question
    const question = await prisma.questions.create({
      data: { subject_id, subtopic_id, question_text, answer_text },
    });

    res.status(201).json({
      message: "Question added successfully",
      question,
    });
  } catch (err) {
    console.error("AddQuestion error:", err);
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Duplicate question or answer" });
    }
    res.status(500).json({ error: "Failed to add question" });
  }
};

/**
 * 📖 Fetch all questions for a subtopic
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
    console.error("FetchQuestions error:", err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
};

/**
 * ✏️ Update a question
 */
export const updateQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;
    const { question_text, answer_text } = req.body;

    if (!question_text || !answer_text) {
      return res
        .status(400)
        .json({ error: "Both question_text and answer_text are required" });
    }

    const updated = await prisma.questions.update({
      where: { id: questionId },
      data: { question_text, answer_text, updated_at: new Date() },
    });

    res.json(updated);
  } catch (err) {
    console.error("UpdateQuestion error:", err);
    if (err.code === "P2002") {
      return res.status(400).json({ error: "Duplicate question or answer" });
    }
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(500).json({ error: "Failed to update question" });
  }
};

/**
 * ❌ Delete a question (with cleanup of related progress)
 */
export const deleteQuestion = async (req, res) => {
  try {
    const { questionId } = req.params;

    // Delete related user progress entries first
    await prisma.user_question_progress.deleteMany({
      where: { question_id: questionId },
    });

    // Delete the question itself
    await prisma.questions.delete({
      where: { id: questionId },
    });

    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    console.error("DeleteQuestion error:", err);
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Question not found" });
    }
    res.status(500).json({ error: "Failed to delete question" });
  }
};
