import API from "./axios";

export const getMyOrders = () => {
  return API.get("http://localhost:5003/order/orders");
};

export const getOrderById = (id) => {
  return API.get(`http://localhost:5003/order/orders/${id}`);
};

export const createOrder = (data) => {
  return API.post("http://localhost:5003/order/orders", data);
};