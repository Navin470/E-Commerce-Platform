// import API from "./axios";

// export const loginUser = (data) =>
//   API.post("http://localhost:5002/auth/login", data);

// export const registerUser = (data) =>
//   API.post("http://localhost:5002/auth/register", data);

// export const validateToken = () =>
//   API.get("http://localhost:5002/auth/validate");

import API from "./axios";

// Updated port to 32000 to match the working backend in image_0d9fb9.png
export const loginUser = (data) =>
  API.post("http://localhost:32000/auth/login", data);

export const registerUser = (data) =>
  API.post("http://localhost:32000/auth/register", data);

export const validateToken = () =>
  API.get("http://localhost:32000/auth/validate");