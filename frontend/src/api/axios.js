// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost", // we'll override per service
// });

// // Attach token automatically
// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default API;

import axios from "axios";

// Vite uses import.meta.env to access environment variables
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5002", 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;