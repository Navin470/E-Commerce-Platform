import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAdminOrders } from "../../api/adminApi";
import toast from "react-hot-toast";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchAdminOrders();
  }, []);

  const fetchAdminOrders = async () => {
    try {
      const res = await getAdminOrders();
      setOrders(res.data);
    } catch (err) {
      toast.error("Failed to load admin orders. You may not be an admin.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="p-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">⚙️ Admin Dashboard - All Orders</h2>

        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase text-sm border-b">
                <th className="py-4 px-6 text-center">Order ID</th>
                <th className="py-4 px-6 text-center">Date</th>
                <th className="py-4 px-6">Customer Details</th>
                <th className="py-4 px-6 text-center">Total Amount</th>
                <th className="py-4 px-6 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b transition hover:bg-gray-50">
                  <td className="py-4 px-6 text-center font-semibold text-blue-600">#{order.id}</td>
                  <td className="py-4 px-6 text-center text-sm text-gray-500">
                     {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    {order.user_profile ? (
                      <div>
                        <p className="font-medium text-gray-800">
                          {order.user_profile.first_name} {order.user_profile.last_name}
                        </p>
                        <p className="text-sm text-gray-500">{order.user_profile.phone || "No Phone"}</p>
                        <p className="text-xs text-gray-400 mt-1">{order.user_profile.address}</p>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400 italic">User #{order.user_id} (No Profile)</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center font-bold text-green-600">₹ {order.total_amount}</td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}

              {orders.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No orders found in the massive database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
