const BASE_URL = import.meta.env.VITE_BACKEND_URL;

//  Add Subtopic with subjectId
export async function addSubtopic({ subjectId, name }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${BASE_URL}/subtopics/addsubtopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ subjectId, name }), // use subjectId
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to add subtopic");
    }
    return data;
  } catch (err) {
    throw err;
  }
}

// Fetch Subtopics by subjectId
export async function fetchSubtopics({ subjectId }) {
  try {
    const res = await fetch(`${BASE_URL}/subtopics/${subjectId}`);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch subtopics");
    }
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}
