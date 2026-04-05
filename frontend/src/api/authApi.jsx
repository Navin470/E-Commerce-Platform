import axios from "axios";

const API_URL = "http://localhost:5001/auth"; // Change if your auth-service runs on a different port

export const register = async (email, password) => {
  const response = await axios.post(`${API_URL}/register`, { email, password });
  return response.data;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  if (response.data.access_token) {
    localStorage.setItem("accessToken", response.data.access_token);
  }
  return response.data;
};

export const validateToken = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;
  const response = await axios.get(`${API_URL}/validate`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.valid;
};