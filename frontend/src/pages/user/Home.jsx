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
                    src={p.image_url || "https://via.placeholder.com/150"}
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