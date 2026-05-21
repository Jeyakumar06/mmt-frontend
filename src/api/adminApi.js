const BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_BASE   = `${BASE_URL}/api/admin`;
export const IMAGE_BASE = BASE_URL;

function getToken() {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Not authenticated. Please log in.");
  return token;
}

const jsonHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

const authHeader = () => ({
  Authorization: `Bearer ${getToken()}`,
});

async function handleResponse(res, message) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.message || message);
  }
  // 204 No Content
  if (res.status === 204) return true;
  return res.json();
}

// ── Villas ────────────────────────────────────────────────────────────────────
export const getVillas = () =>
  fetch(`${API_BASE}/villas`, { headers: jsonHeaders() })
    .then(r => handleResponse(r, "Failed to fetch villas"));

export const createVilla = (payload) =>
  fetch(`${API_BASE}/villas`, {
    method: "POST",
    headers: jsonHeaders(),
    body: JSON.stringify(payload),
  }).then(r => handleResponse(r, "Failed to create villa"));

export const updateVilla = (id, payload) =>
  fetch(`${API_BASE}/villas/${id}`, {
    method: "PUT",
    headers: jsonHeaders(),
    body: JSON.stringify(payload),
  }).then(r => handleResponse(r, "Failed to update villa"));

export const deleteVilla = (id) =>
  fetch(`${API_BASE}/villas/${id}`, {
    method: "DELETE",
    headers: jsonHeaders(),
  }).then(r => handleResponse(r, "Failed to delete villa"));

// ── Images ────────────────────────────────────────────────────────────────────
export const uploadImages = (villaId, files) => {
  const form = new FormData();
  files.forEach(f => form.append("files", f));
  return fetch(`${API_BASE}/villas/${villaId}/images`, {
    method: "POST",
    headers: authHeader(),
    body: form,
  }).then(r => handleResponse(r, "Failed to upload images"));
};

export const replaceImage = (imageId, file) => {
  const form = new FormData();
  form.append("file", file);
  return fetch(`${API_BASE}/villas/images/${imageId}`, {
    method: "POST",
    headers: authHeader(),
    body: form,
  }).then(r => handleResponse(r, "Failed to replace image"));
};

export const deleteImage = (imageId) =>
  fetch(`${API_BASE}/villas/images/${imageId}`, {
    method: "DELETE",
    headers: jsonHeaders(),
  }).then(r => handleResponse(r, "Failed to delete image"));

// ── Amenities ─────────────────────────────────────────────────────────────────
export const getAmenities = () =>
  fetch(`${API_BASE}/amenities`, { headers: jsonHeaders() })
    .then(r => handleResponse(r, "Failed to fetch amenities"));
