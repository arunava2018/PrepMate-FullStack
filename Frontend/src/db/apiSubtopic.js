const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export async function addSubtopic({ subject, name }) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
    const res = await fetch(`${BASE_URL}/subtopics/addsubtopic`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({subject, name}),
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

export async function fetchSubtopics({ subject }) {
  try{
    const res = await fetch(`${BASE_URL}/subtopics/${subject}`)
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch subtopics");
    }
    const data = await res.json();
    return data;
  }catch(err){
    throw err;
  }
}
