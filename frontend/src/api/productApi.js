import API from "./axios";

export const getProducts = (search = "") => {
  return API.get(
    `http://localhost:5004/product/products?search=${search}`
  );
};