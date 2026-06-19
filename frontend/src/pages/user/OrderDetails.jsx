import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../api/axios";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await API.get(
        `http://localhost:5003/orders/orders/${id}`
      );
      setOrder(res.data);
    } catch (err) {
      toast.error("Failed to load order");
    }
  };

  if (!order) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">
          Order #{order.id}
        </h2>

        <p className="mb-4 text-gray-600">
          Status: {order.status || "Placed"}
        </p>

        <div className="space-y-3">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow flex justify-between"
            >
              <span>Product ID: {item.product_id}</span>
              <span>Qty: {item.quantity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}