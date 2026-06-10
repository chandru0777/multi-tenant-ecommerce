import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function VendorProducts() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (token) fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/products/vendor/my-products",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm("Delete this product?");
    if (!confirmDelete) return;
    setDeletingId(productId);
    try {
      const response = await fetch(
        `http://localhost:8000/api/products/${productId}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
      );
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      alert("Product deleted successfully");
      fetchProducts();
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="mt-8 mb-16">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">Vendor Panel</p>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              My Products
              <span className="block h-1 w-14 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-2" />
            </h1>
          </div>
          <Link
            to="/vendor/add-product"
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-violet-600 hover:to-indigo-600 text-white text-sm font-bold px-5 py-3 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 self-start"
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
            </svg>
            Add New Product
          </Link>
        </div>

        {/* ── Search + Count bar ─────────────────────── */}
        {!loading && products.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <p className="text-sm text-gray-500">
              Showing <span className="font-bold text-gray-800">{filtered.length}</span> of{" "}
              <span className="font-bold text-gray-800">{products.length}</span> products
            </p>
            <div className="relative w-full sm:w-72">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all placeholder-gray-400"
              />
            </div>
          </div>
        )}

        {/* ── Loading skeleton ───────────────────────── */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden border border-gray-100 animate-pulse">
                <div className="h-48 bg-gray-100" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-9 bg-gray-100 rounded-xl flex-1" />
                    <div className="h-9 bg-gray-100 rounded-xl flex-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Empty state ────────────────────────────── */}
        {!loading && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-20 h-20 rounded-3xl bg-indigo-50 flex items-center justify-center mb-5">
              <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke="#6366f1" strokeWidth="1.5">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
            </div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">No Products Yet</h2>
            <p className="text-gray-400 text-sm mb-7 max-w-xs">You haven't listed any products. Add your first product to start selling.</p>
            <Link
              to="/vendor/add-product"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-bold px-6 py-3 rounded-2xl shadow-lg shadow-indigo-200 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Add First Product
            </Link>
          </div>
        )}

        {/* ── No search results ──────────────────────── */}
        {!loading && products.length > 0 && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">🔍</span>
            <h2 className="text-xl font-extrabold text-gray-700 mb-1">No matches found</h2>
            <p className="text-gray-400 text-sm">Try a different search term.</p>
          </div>
        )}

        {/* ── Products Grid ──────────────────────────── */}
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filtered.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-3xl border border-gray-100 hover:border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Image */}
                <div className="relative bg-gray-50 aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Stock badge */}
                  <span className="absolute top-3 left-3 text-[10px] font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                    In Stock
                  </span>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug mb-1 group-hover:text-indigo-600 transition-colors">
                    {product.name}
                  </h3>

                  {product.category && (
                    <span className="text-[11px] font-semibold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full w-fit mb-2 capitalize">
                      {product.category}
                    </span>
                  )}

                  <p className="text-lg font-extrabold text-gray-900 mt-auto mb-4">
                    ₹{Number(product.price).toLocaleString()}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/vendor/edit-product/${product._id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-600 text-indigo-600 hover:text-white text-xs font-bold px-3 py-2.5 rounded-xl transition-all duration-200 border border-indigo-100 hover:border-indigo-600 group/btn"
                    >
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      disabled={deletingId === product._id}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-600 text-red-500 hover:text-white text-xs font-bold px-3 py-2.5 rounded-xl transition-all duration-200 border border-red-100 hover:border-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deletingId === product._id ? (
                        <svg className="animate-spin" width="12" height="12" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v8z"/>
                        </svg>
                      ) : (
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                      )}
                      {deletingId === product._id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </MainLayout>
  );
}

export default VendorProducts;