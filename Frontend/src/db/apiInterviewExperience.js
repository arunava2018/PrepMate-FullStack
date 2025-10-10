const BASE_URL = import.meta.env.VITE_BACKEND_URL + '/interview';

// -------- Add interview experience (requires auth) --------
export async function addInterviewExperience({
  company_name,
  role,
  linkedin_url,
  github_url,
  content,
  offer_type,
  opportunity_type,
  is_public = false,
  is_anonymous = false,
}) {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        company_name,
        role,
        linkedin_url,
        github_url,
        content,
        offer_type,
        opportunity_type,
        is_public,
        is_anonymous,
      }),
    });

    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || 'Failed to add interview experience');
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Fetch unpublished interview experiences (requires auth) --------
export async function fetchUnpublishedInterviewExperiences() {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/unpublished`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || 'Failed to fetch unpublished experiences');
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Fetch a single interview experience by ID (requires auth) --------
export async function fetchExperienceById(id) {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || 'Failed to fetch interview experience');
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Update unpublished interview experience (requires auth) --------
export async function updateExperience(id, updatedData) {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/update/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData), // ✅ can include is_anonymous
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update experience');
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Delete interview experience (requires auth) --------
export async function deleteExperience(id) {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete experience');
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Approve interview experience (admin only, requires auth) --------
export async function approveExperience(id, updatedData) {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('Not authenticated');

    const payload = {
      ...updatedData,
      content: updatedData.content || updatedData.experience || '',
      is_public: true, // ✅ approval means publish
    };
    delete payload.experience;

    const res = await fetch(`${BASE_URL}/approve/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to approve experience');
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Fetch public interview experiences (no auth required) --------
export async function fetchPublicInterviewExperiences() {
  try {
    const res = await fetch(`${BASE_URL}/public`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || 'Failed to fetch public experiences');
    return data;
  } catch (err) {
    throw err;
  }
}

// -------- Fetch interview experiences of a specific user (no auth required) --------
export async function fetchUserInterviewExperiences(userId) {
  try {
    const res = await fetch(`${BASE_URL}/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || 'Failed to fetch user experiences');
    return data;
  } catch (err) {
    throw err;
  }
}
