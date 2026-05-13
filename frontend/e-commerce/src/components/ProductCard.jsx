import { Link } from "react-router-dom";

const BADGE_STYLES = {
  "Best Seller":    "bg-amber-100 text-amber-700",
  "Top Rated":      "bg-green-100 text-green-700",
  "New":            "bg-blue-100 text-blue-700",
  "Trending":       "bg-pink-100 text-pink-700",
  "Gaming Pick":    "bg-violet-100 text-violet-700",
  "Editor's Choice":"bg-indigo-100 text-indigo-700",
  "Luxury":         "bg-rose-100 text-rose-700",
  "Classic":        "bg-gray-100 text-gray-700",
};

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          style={{ "--tw-scale-x": "1.08", "--tw-scale-y": "1.08" }}
        />

        {/* Discount badge */}
        {discount && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[11px] font-black px-2.5 py-1 rounded-xl shadow-md">
            -{discount}%
          </span>
        )}

        {/* Category badge */}
        {product.badge && (
          <span className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-xl ${BADGE_STYLES[product.badge] || "bg-gray-100 text-gray-700"}`}>
            {product.badge}
          </span>
        )}

        {/* Wishlist on hover */}
        <button
          onClick={(e) => e.preventDefault()}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-xl shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 hover:bg-pink-50"
        >
          <svg width="14" height="14" fill="none" stroke="#ec4899" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-[15px] font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-1">
          {product.name}
        </h2>

        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3 flex-1">
          {product.description}
        </p>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5 mb-3">
            <StarRating rating={product.rating} />
            <span className="text-[11px] font-semibold text-amber-600">{product.rating}</span>
            <span className="text-[11px] text-gray-400">({product.reviews?.toLocaleString()})</span>
          </div>
        )}

        {/* Price row */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-black text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1.5">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-colors duration-200 active:scale-95"
          >
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Add
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;