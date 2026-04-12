import { useEffect, useState } from "react";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("http://localhost:5003/orders/orders");
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">📦 My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-500">No orders found</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md cursor-pointer"
                onClick={() => navigate(`/orders/${order.id}`)}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">
                    Order #{order.id}
                  </span>

                  <span className="text-sm text-gray-500">
                    {order.status || "Placed"}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Items: {order.items?.length || 0}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}