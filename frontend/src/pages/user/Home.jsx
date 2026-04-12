import { useEffect, useState, useContext } from "react";
import { getProducts } from "../../api/productApi";
import Navbar from "../../components/Navbar";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getProducts(search);
      setProducts(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Product service not available 🚨");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar onSearch={setSearch} />

      <div className="p-6 max-w-7xl mx-auto">
        
        {/* 🔥 HEADER */}
        <h2 className="text-2xl font-bold mb-6">
          Explore Products
        </h2>

        {/* ⏳ LOADING SKELETON */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow animate-pulse">
                <div className="h-40 bg-gray-300 rounded mb-3"></div>
                <div className="h-4 bg-gray-300 mb-2 rounded"></div>
                <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products found
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
              >
                {/* 🖼️ IMAGE */}
                <div className="overflow-hidden">
                  <img
                    src={p.image_url || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALIAAACUCAMAAAAAoYNxAAAAS1BMVEXu7u5mZmbz8/PFxcXBwcHV1dVXV1fq6uqRkZGEhISIiIh8fHxfX19iYmL29vaWlpZ2dnanp6eurq7Pz8/c3Nxra2ufn5+3t7dwcHBypgY0AAAB0klEQVR4nO3Z7W6CMBhA4baCKLYqn3r/V7oiflTQGJssfTHn+Sdsy6F7221OKQAAAAAAAAAAAAAAAADAIpk4CYObVZQmXXNR2nUEe0iYvN3lEY6blMmln8uvJ3mXNjnm00j+ym8mvzqEZScXeZPPLkpONnnZ6XNVTAoFJ5v2bLXW635ByZXTA5c/JwpOVpsx2WbLST5ck1f7p8uykk0bvshcN8zFrhC8yibb5uGK9tY6qyeLLCv55Oy5DXpMdiirdlIsKNn4YqftMfzZsfdmfXKS96fLbrO7dl5kTLDUcpLrtR4PCD37Q6lQ1epxTUxyrW/scdJsVO034f03JBnJZl9bHTY/b7naWdfdDw4RyaaoguKhOTjYjLrctF0mZpULFU7FyJ2bx4ddH8d12fgc6ZP9cVDbSfJjnv0au9tz+Hn2ryUkT6bi2ucuzaboHzedvsyGgORqHjzOxlDWPz/OMBtpk7dDlHuZ7Gd35dd4ejNLnVwO3/g3ycPsHqYj4/QpdbLq3/SOfa+ctmkHo3+x8z5xKd9GLF1EsU76zmcZU5w4+d3OE5y8uFVWy0uOXuVkxUo1WZTm81f+N5H/Q0s2Fwn3EAAAAAAAAAAAAAAAAAD8gj/cFxiKAXB8nAAAAABJRU5ErkJggg=="}
                    alt={p.name}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition duration-300"
                  />
                </div>

                {/* 📦 CONTENT */}
                <div className="p-4">
                  
                  {/* 🏷️ NAME */}
                  <h3 className="text-lg font-semibold truncate">
                    {p.name}
                  </h3>

                  {/* ⭐ RATING */}
                  <div className="text-yellow-500 text-sm mt-1">
                    ★★★★☆
                  </div>

                  {/* 💰 PRICE */}
                  <p className="text-green-600 font-bold text-lg mt-1">
                    ₹ {p.price}
                  </p>

                  {/* 🛒 ACTIONS */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => navigate(`/product/${p.id}`)}
                      className="flex-1 bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => {
                        addToCart(p);
                        toast.success("Added to cart 🛒");
                      }}
                      className="flex-1 bg-yellow-500 text-white py-1 rounded-lg hover:bg-yellow-600"
                      >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}