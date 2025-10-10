const BASE_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Get progress for a subject for the current user.
 */
export async function getProgress(userId, subjectId) {
  if (!subjectId || !userId) return null;

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/progress/${userId}/${subjectId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch progress');

    return data;
  } catch (error) {
    console.error('Error fetching progress:', error.message);
    return { completedQ: 0, totalQ: 0, progress: 0, completed_questions: [] };
  }
}

/**
 * Mark question as read
 */
export async function markQuestionAsRead(userId, subjectId, questionId) {
  if (!userId || !subjectId || !questionId) return false;

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/progress/mark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, subjectId, questionId }),
    });

    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || 'Failed to mark question as read');

    return true;
  } catch (error) {
    console.error('Error marking question as read:', error.message);
    return false;
  }
}

/**
 * Unmark a question
 */
export async function unmarkQuestion(userId, subjectId, questionId) {
  if (!userId || !subjectId || !questionId) return false;

  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/progress/unmark`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userId, subjectId, questionId }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to unmark question');

    return true;
  } catch (error) {
    console.error('Error unmarking question:', error.message);
    return false;
  }
}
