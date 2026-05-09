// import API from "./axios";

// export const loginUser = (data) =>
//   API.post("http://localhost:5002/auth/login", data);

// export const registerUser = (data) =>
//   API.post("http://localhost:5002/auth/register", data);

// export const validateToken = () =>
//   API.get("http://localhost:5002/auth/validate");

import API from "./axios";

// Using the full path required by your microservice
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
export const validateToken = () => API.get("/auth/validate");