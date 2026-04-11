import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const items = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      await API.post("http://localhost:5003/orders/orders", { items });

      toast.success("Order placed successfully 🎉");
      clearCart();
      navigate("/");
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          <>
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 mb-3 rounded-lg shadow flex justify-between"
              >
                <div>
                  <h3>{item.name}</h3>
                  <p>₹ {item.price} × {item.quantity}</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}

            <h3 className="text-xl font-bold mt-4">
              Total: ₹ {total}
            </h3>

            <button
              onClick={placeOrder}
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
            >
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}