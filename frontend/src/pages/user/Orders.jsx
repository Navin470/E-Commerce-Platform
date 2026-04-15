import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getMyOrders } from "../../api/orderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">📦 My Orders</h2>

        {orders.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow text-center">
            No orders yet 😔
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              onClick={() => navigate(`/orders/${order.id}`)}
              className="bg-white p-5 mb-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-semibold">
                  Order #{order.id}
                </h3>

                <span className="text-sm text-gray-500">
                  {order.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm">
                Items: {order.items.length}
              </p>

              <p className="text-green-600 font-bold mt-2">
                ₹ {order.total_amount}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}