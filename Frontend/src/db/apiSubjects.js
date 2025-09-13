const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// -------- Get all subjects --------
export async function getSubjects() {
  try {
    const res = await fetch(`${BASE_URL}/subjects`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch subjects");
    }

    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Get subject by ID --------
export async function getSubjectById(id) {
  try {
    const res = await fetch(`${BASE_URL}/subjects/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to fetch subject");
    }

    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Add new subject --------
export async function addSubject({ name, description, icon }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${BASE_URL}/subjects/addsubject`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description, icon }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to add subject");
    }

    return data;
  } catch (err) {
    throw err;
  }
}
