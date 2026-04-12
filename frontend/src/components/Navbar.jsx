import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ShoppingCart, Search, User } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Navbar({ onSearch }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, i) => sum + i.quantity, 0);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch && onSearch(value);
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        
        {/* 🏷️ LOGO */}
        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer tracking-tight"
          onClick={() => navigate("/")}
        >
          ShopX
        </h1>

        {/* 🔍 SEARCH BAR */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-xl w-1/3 focus-within:ring-2 ring-blue-500 transition">
          <Search className="text-gray-500 mr-2" size={18} />
          <input
            type="text"
            placeholder="Search for products..."
            value={query}
            onChange={handleSearch}
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* ⚡ ACTIONS */}
        <div className="flex items-center gap-4">
    
          {/* 🛒 CART */}
          <button
            onClick={() => navigate("/cart")}
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ShoppingCart size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {totalItems}
            </span>
          </button>

          {/* 👤 USER */}
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded-lg transition">
            <User size={18} />
            <span className="text-sm font-medium">Account</span>
          </div>

          {/* 🚪 LOGOUT */}
          <button
            onClick={logout}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}