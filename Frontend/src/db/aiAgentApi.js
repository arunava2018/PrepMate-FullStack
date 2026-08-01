const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * 🤖 Run Admin AI Agent (Web Search & Function Calling)
 */
export async function runAdminAiAgent({ prompt, subjectId, subtopicId, autoCommit = false }) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/ai/agent/run`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        prompt,
        subject_id: subjectId,
        subtopic_id: subtopicId,
        autoCommit,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to run AI Agent');
    }
    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * 💾 Bulk save approved questions to DB
 */
export async function approveAndSaveQuestions({ subjectId, subtopicId, questions }) {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${BASE_URL}/ai/agent/approve-and-save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({
        subject_id: subjectId,
        subtopic_id: subtopicId,
        questions,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to save questions');
    }
    return data;
  } catch (err) {
    throw err;
  }
}
