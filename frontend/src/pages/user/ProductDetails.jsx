import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import API from "../../api/axios";
import toast from "react-hot-toast";

import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
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
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAACUCAMAAAAAoYNxAAAAS1BMVEXu7u5mZmbz8/PFxcXBwcHV1dVXV1fq6uqRkZGEhISIiIh8fHxfX19iYmL29vaWlpZ2dnanp6eurq7Pz8/c3Nxra2ufn5+3t7dwcHBypgY0AAAB0klEQVR4nO3Z7W6CMBhA4baCKLYqn3r/V7oiflTQGJssfTHn+Sdsy6F7221OKQAAAAAAAAAAAAAAAADAIpk4CYObVZQmXXNR2nUEe0iYvN3lEY6blMmln8uvJ3mXNjnm00j+ym8mvzqEZScXeZPPLkpONnnZ6XNVTAoFJ5v2bLXW635ByZXTA5c/JwpOVpsx2WbLST5ck1f7p8uykk0bvshcN8zFrhC8yibb5uGK9tY6qyeLLCv55Oy5DXpMdiirdlIsKNn4YqftMfzZsfdmfXKS96fLbrO7dl5kTLDUcpLrtR4PCD37Q6lQ1epxTUxyrW/scdJsVO034f03JBnJZl9bHTY/b7naWdfdDw4RyaaoguKhOTjYjLrctF0mZpULFU7FyJ2bx4ddH8d12fgc6ZP9cVDbSfJjnv0au9tz+Hn2ryUkT6bi2ucuzaboHzedvsyGgORqHjzOxlDWPz/OMBtpk7dDlHuZ7Gd35dd4ejNLnVwO3/g3ycPsHqYj4/QpdbLq3/SOfa+ctmkHo3+x8z5xKd9GLF1EsU76zmcZU5w4+d3OE5y8uFVWy0uOXuVkxUo1WZTm81f+N5H/Q0s2Fwn3EAAAAAAAAAAAAAAAAAD8gj/cFxiKAXB8nAAAAABJRU5ErkJggg=="
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
  
              {/* 🛒 ADD TO CART */}
              <button
                onClick={() => {
                  addToCart(product);
                  toast.success("Added to cart 🛒");
                }}
                className="flex-1 bg-yellow-500 text-white py-3 rounded-xl font-semibold hover:bg-yellow-600 transition"
              >
                Add to Cart
              </button>

              {/* ⚡ BUY NOW */}
              <button
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
              >
                Buy Now
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}