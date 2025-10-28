import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ✅ backend base
});

export default api;

// AUTH endpoints
export const registerUser = (userData) => api.post("/auth/register", userData);
export const loginUser = (userData) => api.post("/auth/login", userData);

// FOOD endpoints
export const getFoods = () => api.get("/food");
export const addFood = (foodData, token) =>
  api.post("/food", foodData, {
    headers: { Authorization: `Bearer ${token}` },
  });
