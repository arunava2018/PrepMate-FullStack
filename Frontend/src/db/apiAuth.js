const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// -------- SIGN UP --------
export async function signup({ name, email, password, college, passoutYear }) {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        full_name: name,
        college_name: college,
        passout_year: passoutYear,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Signup failed');
    }

    localStorage.setItem('token', data.token);
    return data.user;
  } catch (err) {
    throw err;
  }
}

// -------- LOGIN --------
export async function login({ email, password }) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    localStorage.setItem('token', data.token);
    return data.user;
  } catch (err) {
    throw err;
  }
}

// -------- LOGOUT --------
export async function signout() {
  localStorage.removeItem('token');
  return true; // success indicator
}

// -------- GET CURRENT USER PROFILE --------
export async function getCurrentUserProfile() {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch profile');
  }

  return data;
}

// -------- GET USER BY ID --------
export async function getUserById(id) {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Not authenticated');

  const res = await fetch(`${BASE_URL}/auth/user/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || 'Failed to fetch user');
  }

  return data;
}
