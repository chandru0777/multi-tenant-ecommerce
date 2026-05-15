import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { currentUser, logout } =
  useContext(AuthContext);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">

      {/* Gradient border top accent */}
      <div className="h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Main Navbar */}
      <div className="flex items-center justify-between px-8 py-3.5 gap-6">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent whitespace-nowrap shrink-0"
        >
          ShopEase ✦
        </Link>

        {/* Search Bar */}
        <div className="relative w-[42%]">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            width="16" height="16" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2.2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search for products, brands and more..."
            className="w-full bg-gray-100 border border-transparent rounded-2xl pl-11 pr-5 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:bg-white focus:border-purple-400 focus:ring-4 focus:ring-purple-100 transition-all duration-200"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5 shrink-0">

          {/* Login */}
          <Link
            to="/login"
            className="relative text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
          >
            Login
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Signup */}
          <Link
            to="/signup"
            className="relative text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
          >
            Signup
            <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Become a Seller */}
          <button className="relative overflow-hidden text-sm font-semibold text-white px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group">
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">✦ Become a Seller</span>
          </button>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-indigo-50 hover:text-indigo-600 px-4 py-2.5 rounded-xl transition-all duration-200"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Cart
            {/* Badge */}
            <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-pink-500 to-rose-500 text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              {
                  cartItems.reduce(
                  (total, item) => total + item.quantity,
                        0
                     )
                  }
            </span>
          </Link>

        </div>
      </div>

      {/* Category Strip */}
      <div className="border-t border-gray-100">
        <div className="flex items-center gap-1 px-8 py-1 overflow-x-auto">

          {/* Featured Deal */}
          <a href="#" className="flex items-center gap-1.5 text-[13px] font-semibold text-pink-500 px-3 py-2 rounded-lg hover:bg-pink-50 transition-colors duration-200 whitespace-nowrap shrink-0">
            🔥 Deals
            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">UP TO 70%</span>
          </a>

          <div className="w-px h-5 bg-gray-200 mx-1 shrink-0" />

          {[
            ["📱", "Mobiles"],
            ["👗", "Fashion"],
            ["🏠", "Home & Living"],
            ["💄", "Beauty"],
            ["📚", "Books"],
            ["⚽", "Sports"],
            ["🍳", "Kitchen"],
            ["🧸", "Toys"],
            ["🖥️", "Computers"],
            ["🌿", "Grocery"],
          ].map(([icon, label]) => (
            <Link
              key={label}
              to={`/category/${label.toLowerCase()}`}
              className="flex items-center gap-1 text-[13px] font-medium text-gray-500 px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              {icon} {label}
            </Link>
          ))}
        </div>
      </div>

    </header>
  );
}

export default Navbar;
