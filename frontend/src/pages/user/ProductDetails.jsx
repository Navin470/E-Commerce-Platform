import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import API from "../../api/axios";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(
        `http://localhost:5004/product/products/${id}`
      );
      setProduct(res.data);
    } catch (err) {
      toast.error("Failed to load product");
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="p-6 flex justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 🖼️ LEFT: IMAGE */}
          <div className="flex justify-center items-center">
            <img
              src={
                product.image_url ||
                "https://via.placeholder.com/400"
              }
              alt={product.name}
              className="w-full max-h-96 object-cover rounded-xl shadow-md hover:scale-105 transition"
            />
          </div>

          {/* 📦 RIGHT: DETAILS */}
          <div className="flex flex-col justify-between">
            
            <div>
              <h2 className="text-3xl font-bold mb-2">
                {product.name}
              </h2>

              <p className="text-gray-500 mb-4">
                Product ID: {product.id}
              </p>

              {/* ⭐ Fake rating UI */}
              <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-lg">★★★★☆</span>
                <span className="ml-2 text-gray-600">(120 reviews)</span>
              </div>

              {/* 💰 PRICE */}
              <p className="text-3xl text-green-600 font-bold mb-4">
                ₹ {product.price}
              </p>

              {/* 📝 DESCRIPTION */}
              <p className="text-gray-700 mb-6">
                {product.description || "No description available."}
              </p>
            </div>

            {/* 🛒 BUTTONS */}
            <div className="flex gap-4">
              <button className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition">
                Add to Cart
              </button>

              <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}