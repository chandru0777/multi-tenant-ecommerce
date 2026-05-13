import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { products } from "../data/products";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="15" height="15" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ))}
    </div>
  );
}

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

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const [qty, setQty] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const related = products.filter((p) => p.category === product?.category && p.id !== product?.id).slice(0, 4);
  const discount = product?.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  if (!product) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <span className="text-6xl mb-4">🔍</span>
          <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Product Not Found</h1>
          <p className="text-gray-400 mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link to="/" className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-2xl hover:bg-indigo-700 transition-colors">
            Back to Home
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium mt-6 mb-8">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to={`/category/${product.category}`} className="hover:text-indigo-600 transition-colors capitalize">{product.category}</Link>
        <span>/</span>
        <span className="text-gray-600 truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

        {/* ── Left: Image ─────────────────────────────── */}
        <div className="space-y-3">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden border border-gray-100 shadow-sm group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Discount ribbon */}
            {discount && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-black px-3 py-1.5 rounded-2xl shadow-lg">
                -{discount}% OFF
              </div>
            )}

            {/* Badge */}
            {product.badge && (
              <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1.5 rounded-2xl ${BADGE_STYLES[product.badge] || "bg-gray-100 text-gray-700"}`}>
                {product.badge}
              </span>
            )}

            {/* Wishlist */}
            <button
              onClick={() => setWishlisted(!wishlisted)}
              className="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-2xl shadow-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200"
            >
              <svg width="18" height="18" fill={wishlisted ? "#ec4899" : "none"} stroke="#ec4899" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
          </div>

          {/* Thumbnail strip — uses same image for demo */}
          <div className="flex gap-2">
            {[0,1,2,3].map((i) => (
              <div key={i} className={`flex-1 h-16 rounded-xl overflow-hidden border-2 cursor-pointer transition-all duration-200 ${i === 0 ? "border-indigo-500 shadow-md" : "border-gray-100 opacity-60 hover:opacity-100"}`}>
                <img src={product.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Info ──────────────────────────────── */}
        <div className="space-y-5">

          {/* Category tag */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              {product.category}
            </span>
            <span className="text-xs text-gray-400">In Stock</span>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {product.name}
          </h1>

          {/* Rating row */}
          {product.rating && (
            <div className="flex items-center gap-2">
              <StarRating rating={product.rating} />
              <span className="text-sm font-bold text-amber-600">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews?.toLocaleString()} reviews)</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-black text-gray-900">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                <span className="text-sm font-bold text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                  Save ₹{(product.originalPrice - product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-500 leading-7 text-[15px]">
            {product.description}
          </p>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "🚚", title: "Free Delivery", sub: "On orders ₹499+" },
              { icon: "🔄", title: "Easy Returns", sub: "7-day return policy" },
              { icon: "🛡️", title: "Warranty",     sub: "1 year coverage" },
            ].map((b) => (
              <div key={b.title} className="flex flex-col items-center text-center bg-gray-50 border border-gray-100 rounded-2xl p-3 gap-1">
                <span className="text-xl">{b.icon}</span>
                <span className="text-[11px] font-bold text-gray-700">{b.title}</span>
                <span className="text-[10px] text-gray-400">{b.sub}</span>
              </div>
            ))}
          </div>

          {/* Qty + Buttons */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Quantity selector */}
            <div className="flex items-center border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-colors font-bold text-lg"
              >−</button>
              <span className="px-4 py-3 text-sm font-bold text-gray-900 min-w-[40px] text-center border-x border-gray-200">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-indigo-600 transition-colors font-bold text-lg"
              >+</button>
            </div>

            {/* Add to Cart */}
            <button className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-indigo-200 active:scale-95 text-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              Add to Cart
            </button>

            {/* Buy Now */}
            <button className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-7 py-3.5 rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-200 active:scale-95 text-sm">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
              Buy Now
            </button>

          </div>

        </div>
      </div>

      {/* ── Tabs: Description / Specs / Reviews ───────── */}
      <div className="mt-14">
        <div className="flex gap-1 border-b border-gray-100 mb-6">
          {["description", "specs", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 text-sm font-semibold capitalize rounded-t-xl transition-all duration-200 ${
                activeTab === tab
                  ? "bg-indigo-50 text-indigo-600 border-b-2 border-indigo-500"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="text-gray-500 text-sm leading-7">
          {activeTab === "description" && (
            <p>{product.description} This product is built for performance, reliability, and longevity. Designed with premium materials and backed by a comprehensive warranty to ensure total peace of mind.</p>
          )}
          {activeTab === "specs" && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                ["Brand", "ShopEase Premium"],
                ["Category", product.category],
                ["Warranty", "1 Year"],
                ["Availability", "In Stock"],
                ["Shipping", "Free above ₹499"],
                ["Return Policy", "7 Days"],
              ].map(([k, v]) => (
                <div key={k} className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-0.5">{k}</p>
                  <p className="text-sm font-semibold text-gray-700">{v}</p>
                </div>
              ))}
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="space-y-4">
              {[
                { name: "Arjun M.", rating: 5, comment: "Absolutely love this product! Great quality and fast delivery." },
                { name: "Priya S.", rating: 4, comment: "Good value for money. Packaging was excellent too." },
                { name: "Rahul K.", rating: 5, comment: "Exceeded my expectations. Will definitely buy again." },
              ].map((r) => (
                <div key={r.name} className="bg-gray-50 border border-gray-100 rounded-2xl px-5 py-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-black">
                      {r.name[0]}
                    </div>
                    <span className="text-sm font-bold text-gray-800">{r.name}</span>
                    <StarRating rating={r.rating} />
                  </div>
                  <p className="text-sm text-gray-500">{r.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Related Products ──────────────────────────── */}
      {related.length > 0 && (
        <div className="mt-14 mb-10">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">More Like This</p>
              <h3 className="text-2xl font-extrabold text-gray-900">
                Related Products
                <span className="block h-1 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-1.5" />
              </h3>
            </div>
            <Link to={`/category/${product.category}`} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 border border-indigo-200 hover:border-indigo-400 px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5">
              View All
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <Link
                key={p.id}
                to={`/product/${p.id}`}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gray-50 aspect-square overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-1">{p.name}</p>
                  <p className="text-sm font-black text-gray-900 mt-1">₹{p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

    </MainLayout>
  );
}

export default ProductDetails;