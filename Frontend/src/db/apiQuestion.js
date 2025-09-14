const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/questions";

// -------- Add new question --------
export async function addQuestion({ subjectId, subtopicId, question, answer }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${BASE_URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        subject_id: subjectId,
        subtopic_id: subtopicId,
        question_text: question,
        answer_text: answer,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to add question");
    }
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Fetch questions by subtopic --------
export async function fetchQuestions(subtopicId) {
  try {
    const res = await fetch(`${BASE_URL}/${subtopicId}`);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch questions");
    }
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Update question --------
export async function updateQuestion({ questionId, question_text, answer_text }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${BASE_URL}/${questionId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ question_text, answer_text }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to update question");
    }
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Delete question --------
export async function deleteQuestion(questionId) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${BASE_URL}/${questionId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to delete question");
    }
    return data;
  } catch (err) {
    throw err;
  }
}
