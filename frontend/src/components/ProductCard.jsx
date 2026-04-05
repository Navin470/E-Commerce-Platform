import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2"/>
      <h2 className="font-bold text-lg">{product.name}</h2>
      <p className="text-gray-700">${product.price}</p>
      <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
        Add to Cart
      </button>
    </div>
  );
}