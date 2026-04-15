import API from "./axios";

export const getAdminOrders = () => {
  return API.get("http://localhost:5001/admin/orders");
};
