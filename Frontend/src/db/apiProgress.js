import supabase from "./supabase";

/**
 * Get progress for a subject for the current user.
 */
export async function getProgress(userId, subjectId) {
  if (!subjectId || !userId) return null;

  try {
    // Completed questions
    const { data: completed, error: completedError } = await supabase
      .from("user_question_progress")
      .select("question_id")
      .eq("user_id", userId)
      .eq("subject_id", subjectId)
      .eq("is_read", true);

    if (completedError) throw completedError;

    // Total questions
    const { data: totalQuestions, error: totalError } = await supabase
      .from("questions")
      .select("id")
      .eq("subject_id", subjectId);

    if (totalError) throw totalError;

    const completedQ = completed?.length || 0;
    const totalQ = totalQuestions?.length || 0;
    const progress = totalQ > 0 ? (completedQ / totalQ) * 100 : 0;
    const completed_questions = completed.map(q => q.question_id);

    return { completedQ, totalQ, progress, completed_questions };
  } catch (error) {
    console.error("Error fetching progress:", error.message);
    return { completedQ: 0, totalQ: 0, progress: 0, completed_questions: [] };
  }
};

/**
 * Mark question as read
 */
export async function markQuestionAsRead(userId, subjectId, questionId) {
  if (!userId || !subjectId || !questionId) return false;

  try {
    const { error } = await supabase
      .from("user_question_progress")
      .upsert(
        { user_id: userId, subject_id: subjectId, question_id: questionId, is_read: true },
        { onConflict: ["user_id", "question_id"] }
      );

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error marking question as read:", error.message);
    return false;
  }
}

/**
 * Unmark a question
 */
export async function unmarkQuestion(userId, subjectId, questionId) {
  if (!userId || !subjectId || !questionId) return false;

  try {
    const { error } = await supabase
      .from("user_question_progress")
      .update({ is_read: false })
      .eq("user_id", userId)
      .eq("subject_id", subjectId)
      .eq("question_id", questionId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error unmarking question:", error.message);
    return false;
  }
};
