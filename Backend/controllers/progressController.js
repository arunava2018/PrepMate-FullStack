import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Get progress for a subject for the current user
 */
export const getProgress = async (req, res) => {
  try {
    const { userId, subjectId } = req.params;

    if (!userId || !subjectId) {
      return res.status(400).json({ error: "userId and subjectId are required" });
    }

    // Fetch completed questions
    const completed = await prisma.user_question_progress.findMany({
      where: { user_id: userId, subject_id: subjectId, is_read: true },
      select: { question_id: true },
    });

    // Fetch total questions
    const totalQuestions = await prisma.questions.count({
      where: { subject_id: subjectId },
    });

    const completedQ = completed.length;
    const totalQ = totalQuestions;
    const progress = totalQ > 0 ? (completedQ / totalQ) * 100 : 0;
    const completed_questions = completed.map((q) => q.question_id);

    res.json({ completedQ, totalQ, progress, completed_questions });
  } catch (err) {
    console.error("Error fetching progress:", err);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

/**
 * Mark a question as read
 */
export const markQuestionAsRead = async (req, res) => {
  try {
    const { userId, subjectId, questionId } = req.body;

    if (!userId || !subjectId || !questionId) {
      return res.status(400).json({ error: "userId, subjectId, and questionId are required" });
    }

    const result = await prisma.user_question_progress.upsert({
      where: {
        user_id_question_id: { user_id: userId, question_id: questionId }, // ✅ uses composite unique
      },
      update: { is_read: true, read_at: new Date() },
      create: { user_id: userId, subject_id: subjectId, question_id: questionId, is_read: true },
    });

    res.json(result);
  } catch (err) {
    console.error("Error marking question as read:", err);
    res.status(500).json({ error: "Failed to mark question as read" });
  }
};

/**
 * Unmark a question (set is_read = false)
 */
export const unmarkQuestion = async (req, res) => {
  try {
    const { userId, subjectId, questionId } = req.body;

    if (!userId || !subjectId || !questionId) {
      return res.status(400).json({ error: "userId, subjectId, and questionId are required" });
    }

    const result = await prisma.user_question_progress.updateMany({
      where: { user_id: userId, subject_id: subjectId, question_id: questionId },
      data: { is_read: false },
    });

    res.json(result);
  } catch (err) {
    console.error("Error unmarking question:", err);
    res.status(500).json({ error: "Failed to unmark question" });
  }
};
