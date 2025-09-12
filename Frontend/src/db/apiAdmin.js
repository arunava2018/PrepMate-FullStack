const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function isAdminUser() {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const res = await fetch(`${BASE_URL}/admin/isAdmin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "User is not an admin");
    }

    return data; // should be { message: "...", admin: true }
  } catch (err) {
    throw err;
  }
}
