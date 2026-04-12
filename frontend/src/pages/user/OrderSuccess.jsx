import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100">
      
      <div className="bg-white p-8 rounded-xl shadow text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-2">
          🎉 Order Placed!
        </h1>

        <p className="text-gray-600 mb-4">
          Your order has been successfully placed.
        </p>

        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Continue Shopping
        </button>
      </div>

    </div>
  );
}