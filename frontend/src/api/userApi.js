import API from "./axios";

export const getProfile = () => {
  return API.get("http://localhost:5005/user/profile");
};

export const updateProfile = (data) => {
  return API.post("http://localhost:5005/user/profile", data);
};
