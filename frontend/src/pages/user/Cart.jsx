import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import toast from "react-hot-toast";

export default function Cart() {
  const { cart, removeFromCart, clearCart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const updateQuantity = (id, type) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            if (type === "inc") {
              return { ...item, quantity: item.quantity + 1 };
            }

            if (type === "dec") {
              // 🔥 If quantity is 1 → remove item
              if (item.quantity === 1) return null;

              return { ...item, quantity: item.quantity - 1 };
            }
          }
          return item;
        })
        .filter(Boolean) // ❗ removes null items
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    // ✅ STEP 3: VALIDATION
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }

    try {
      const items = cart.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
      }));

      await API.post("http://localhost:5003/orders/orders", { items });

      toast.success("Order placed successfully 🎉");
      clearCart();

      // ✅ STEP 4: REDIRECT TO SUCCESS PAGE
      navigate("/order-success");

    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <Navbar />

      <div className="p-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">

        {/* 🛒 LEFT */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-3xl font-bold text-gray-800">
            🛒 Your Cart
          </h2>

          {cart.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow text-center">
              <p className="text-gray-500 text-lg">Your cart is empty 😔</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-xl"
              >
                Browse Products
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="group bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow hover:shadow-xl transition flex gap-6 items-center mb-2.5"
                >
                {/* IMAGE */}
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={item.image_url || "https://png.pngtree.com/png-clipart/20230917/original/pngtree-no-image-available-icon-flatvector-illustration-thumbnail-graphic-illustration-vector-png-image_12323920.png"}
                    alt={item.name}
                    className="w-28 h-28 object-cover transform group-hover:scale-110 transition duration-300"
                    />
                </div>

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    ₹ {item.price} per item
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-3 mt-4">

                    <button
                      onClick={() => updateQuantity(item.id, "dec")}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm text-lg font-bold text-gray-700 hover:bg-red-100 hover:border-red-400 hover:text-red-600 transition"
                      >
                      −
                    </button>

                    <span className="text-lg font-semibold min-w-[20px] text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, "inc")}
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm text-lg font-bold text-gray-700 hover:bg-green-100 hover:border-green-400 hover:text-green-600 transition"
                      >
                      +
                    </button>

                  </div>
                </div>

                {/* PRICE */}
                <div className="text-right">
                  <p className="text-xs text-gray-400">Subtotal</p>
                  <p className="text-xl font-bold text-green-600">
                    ₹ {item.price * item.quantity}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* 🧾 RIGHT */}
        <div className="sticky top-20">
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-gray-200">

            <h3 className="text-xl font-bold mb-5 text-gray-800">
              🧾 Order Summary
            </h3>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Subtotal</span>
              <span>₹ {total}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total</span>
              <span className="text-green-600">₹ {total}</span>
            </div>

            {/* CTA */}
            <button
              onClick={placeOrder}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:scale-105 transition transform"
            >
              🚀 Place Order
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-3 text-red-500 text-sm hover:underline"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}