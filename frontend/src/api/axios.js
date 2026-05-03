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

const API = axios.create({
  // Port updated to 32000 to match image_0d9fb9.png
  baseURL: "http://localhost:32000/auth", 
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;