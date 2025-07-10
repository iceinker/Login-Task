const API_BASE = "https://api-yeshtery.dev.meetusvr.com/v1";

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/yeshtery/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, isEmployee: true }),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }
  return res.json();
}

export async function fetchUserInfo(token) {
  const res = await fetch(`${API_BASE}/user/info`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to fetch user info");
  return res.json();
}
