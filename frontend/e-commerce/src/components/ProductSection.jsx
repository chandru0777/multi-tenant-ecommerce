import ProductCard from "./ProductCard";

function ProductSection({ title, subtitle, products, viewAllLink = "#", accent = "indigo" }) {
  const accentMap = {
    indigo: {
      dot:  "bg-indigo-500",
      btn:  "text-indigo-600 hover:text-indigo-800 border-indigo-200 hover:border-indigo-400",
      line: "from-indigo-500 to-purple-500",
    },
    pink: {
      dot:  "bg-pink-500",
      btn:  "text-pink-600 hover:text-pink-800 border-pink-200 hover:border-pink-400",
      line: "from-pink-500 to-rose-500",
    },
    amber: {
      dot:  "bg-amber-500",
      btn:  "text-amber-600 hover:text-amber-800 border-amber-200 hover:border-amber-400",
      line: "from-amber-400 to-orange-500",
    },
  };
  const a = accentMap[accent] || accentMap.indigo;

  return (
    <section className="mt-14">

      {/* Section Header */}
      <div className="flex items-end justify-between mb-7">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${a.dot} animate-pulse`} />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
              {subtitle || "Featured"}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
            {title}
            <span className={`block h-1 w-12 rounded-full bg-gradient-to-r ${a.line} mt-2`} />
          </h2>
        </div>

        <a
          href={viewAllLink}
          className={`flex items-center gap-1.5 text-sm font-semibold border px-4 py-2 rounded-xl transition-all duration-200 ${a.btn}`}
        >
          View All
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

    </section>
  );
}

export default ProductSection;