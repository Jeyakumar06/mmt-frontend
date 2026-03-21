import api from "./axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginApi = (email, password) => {
  console.log("Attempting login with:", { email });

  return api.post(`${BASE_URL}/api/admin/login`, {
    email,
    password,
  });
};