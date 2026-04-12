import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../api/orderApi";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import API from "../../api/axios";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await getOrderById(id);
      const orderData = res.data;

      // Fetch product details for each item from product-service
      const itemsWithDetails = await Promise.all(
        orderData.items.map(async (item) => {
          try {
            const productRes = await API.get(
              `http://localhost:5004/product/products/${item.product_id}`
            );
            return { ...item, product: productRes.data };
          } catch (e) {
            return { ...item, product: null };
          }
        })
      );
      
      orderData.items = itemsWithDetails;
      setOrder(orderData);
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

        <div className="space-y-4">
          {order.items.map((item, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition flex justify-between items-center"
            >
              <div className="flex items-center gap-4">
                {item.product && (
                  <img
                    src={item.product.image_url || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAACUCAMAAAAAoYNxAAAAS1BMVEXu7u5mZmbz8/PFxcXBwcHV1dVXV1fq6uqRkZGEhISIiIh8fHxfX19iYmL29vaWlpZ2dnanp6eurq7Pz8/c3Nxra2ufn5+3t7dwcHBypgY0AAAB0klEQVR4nO3Z7W6CMBhA4baCKLYqn3r/V7oiflTQGJssfTHn+Sdsy6F7221OKQAAAAAAAAAAAAAAAADAIpk4CYObVZQmXXNR2nUEe0iYvN3lEY6blMmln8uvJ3mXNjnm00j+ym8mvzqEZScXeZPPLkpONnnZ6XNVTAoFJ5v2bLXW635ByZXTA5c/JwpOVpsx2WbLST5ck1f7p8uykk0bvshcN8zFrhC8yibb5uGK9tY6qyeLLCv55Oy5DXpMdiirdlIsKNn4YqftMfzZsfdmfXKS96fLbrO7dl5kTLDUcpLrtR4PCD37Q6lQ1epxTUxyrW/scdJsVO034f03JBnJZl9bHTY/b7naWdfdDw4RyaaoguKhOTjYjLrctF0mZpULFU7FyJ2bx4ddH8d12fgc6ZP9cVDbSfJjnv0au9tz+Hn2ryUkT6bi2ucuzaboHzedvsyGgORqHjzOxlDWPz/OMBtpk7d7dwcHBypgY0AAAB0klEQVR4nO3Z7W6CMBhA4baCKLYqn3r/V7oiflQwGJssfTHn+Sdsy6F7221OKQAAAAAAAAAAAAAAAADAIpk4CYObVZQmXXNR2nUEe0iYvN3lEY6blMmln8uvJ3mXNjnm00j+ym8mvzqEZScXeZPPLkpONnnZ6XNVTAoFJ5v2bLXW635ByZXTA5c/JwpOVpsx2WbLST5ck1f7p8uykk0bvshcN8zFrhC8yibb5uGK9tY6qyeLLCv55Oy5DXpMdiirdlIsKNn4YqftMfzZsfdmfXKS96fLbrO7dl5kTLDUcpLrtR4PCD37Q6lQ1epxTUxyrW/scdJsVO034f03JBnJZl9bHTY/b7naWdfdDw4RyaaoguKhOTjYjLrctF0mZpULFU7FyJ2bx4ddH8d12fgc6ZP9cVDbSfJjnv0au9tz+Hn2ryUkT6bi2ucuzaboHzedvsyGgORqHjzOxlDWPz/OMBtpk7dDlHuZ7Gd35dd4ejNLnVwO3/g3ycPsHqYj4/QpdbLq3/SOfa+ctmkHo3+x8z5xKd9GLF1EsU76zmcZU5w4+d3OE5y8uFVWy0uOXuVkxUo1WZTm81f+N5H/Q0s2Fwn3EAAAAAAAAAAAAAAAAAD8gj/cFxiKAXB8nAAAAABJRU5ErkJggg=="}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg bg-gray-100 border"
                  />
                )}
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    {item.product ? item.product.name : `Product #${item.product_id}`}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Quantity: <span className="font-medium text-gray-700">{item.quantity}</span>
                  </p>
                  <p className="text-gray-500 text-sm">
                    Price at purchase: <span className="font-medium text-gray-700">₹ {item.price_at_purchase}</span>
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-xs text-gray-400">Subtotal</p>
                <p className="text-xl font-bold text-green-600">
                  ₹ {item.price_at_purchase * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-green-50 p-6 rounded-xl border border-green-200 flex justify-between items-center">
            <span className="text-lg font-semibold text-green-800">Total Order Amount</span>
            <span className="text-2xl font-bold text-green-700">₹ {order.total_amount}</span>
        </div>
      </div>
    </div>
  );
}