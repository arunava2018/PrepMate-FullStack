const BASE_URL = import.meta.env.VITE_BACKEND_URL + "/interview";

// -------- Add interview experience (requires auth) --------
export async function addInterviewExperience({
  userId,
  company_name,
  role,
  linkedin_url,
  github_url,
  content,
  offer_type,
  opportunity_type,
  is_public = false,
}) {
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
        userId,
        company_name,
        role,
        linkedin_url,
        github_url,
        content,
        offer_type,
        opportunity_type,
        is_public,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to add interview experience");
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Fetch unpublished interview experiences (admin only) --------
export async function fetchUnpublishedInterviewExperiences() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${BASE_URL}/unpublished`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to fetch unpublished experiences");
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Delete interview experience (admin only) --------
export async function deleteExperience(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to delete experience");
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Approve interview experience (admin only) --------
export async function approveExperience(id, updatedData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    const payload = {
      ...updatedData,
      content: updatedData.content || updatedData.experience || "",
      is_public: true,
    };
    delete payload.experience;

    const res = await fetch(`${BASE_URL}/approve/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to approve experience");
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Fetch public interview experiences  --------
export async function fetchPublicInterviewExperiences() {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");
    const res = await fetch(`${BASE_URL}/public`,{
      method:"GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Failed to fetch public experiences");
    return data;
  } catch (err) {
    throw err;
  }
}
