import MainLayout from "../layouts/MainLayout";
import HeroSlider from "../components/HeroSlider";
import ProductSection from "../components/ProductSection";
import { Link } from "react-router-dom";
import { products, trendingProducts, newArrivals } from "../data/products";

/* ── Category Quick-Access Grid ─────────────────────────────────────── */


/* ── Offer Banners (3-up grid) ─────────────────────────────────────── */
const OFFER_BANNERS = [
  {
    title: "Flash Sale",
    desc: "Today only — up to 60% off gadgets",
    emoji: "⚡",
    bg: "from-violet-600 to-indigo-700",
    cta: "Grab Deals",
  },
  {
    title: "Free Shipping",
    desc: "On all orders above ₹499",
    emoji: "🚚",
    bg: "from-emerald-500 to-teal-600",
    cta: "Shop Now",
  },
  {
    title: "New User Offer",
    desc: "Get ₹200 off your first order",
    emoji: "🎁",
    bg: "from-rose-500 to-pink-600",
    cta: "Claim Offer",
  },
];

/* ── Brand Logos ───────────────────────────────────────────────────── */
const BRANDS = ["Apple", "Samsung", "Sony", "Nike", "Dyson", "ASUS", "Levi's", "Philips"];

function Home() {
  return (
    <MainLayout>

      {/* ── Hero Slider ─────────────────────────────────── */}
      <HeroSlider />


      {/* ── 3-up Offer Banner Strip ─────────────────────── */}
      <section className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {OFFER_BANNERS.map((b) => (
          <div
            key={b.title}
            className={`relative overflow-hidden bg-gradient-to-r ${b.bg} rounded-2xl p-6 flex items-center gap-4 group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-200`}
          >
            <span className="text-4xl shrink-0 group-hover:scale-110 transition-transform duration-200">{b.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-white font-black text-lg leading-tight">{b.title}</p>
              <p className="text-white/75 text-xs mt-0.5">{b.desc}</p>
            </div>
            <span className="text-xs font-bold text-white border border-white/30 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm whitespace-nowrap shrink-0 hover:bg-white/20 transition-colors">
              {b.cta} →
            </span>
            {/* decorative circle */}
            <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-white/10" />
          </div>
        ))}
      </section>

      {/* ── Trending Products ───────────────────────────── */}
      <ProductSection
        title="Trending Right Now"
        subtitle="Most Popular"
        products={trendingProducts}
        accent="indigo"
        viewAllLink="/category/electronics"
      />

      {/* ── Wide Promo Banner ───────────────────────────── */}
      <section className="mt-14">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* bg blobs */}
          <div className="absolute top-0 left-1/3 w-72 h-72 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-pink-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block">Limited Offer</span>
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
              Get Extra 10% OFF<br />
              <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
                with ShopEase Plus
              </span>
            </h3>
            <p className="text-gray-400 text-sm max-w-sm">
              Join thousands of smart shoppers. Free delivery, early access to sales & exclusive member deals.
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-xl shadow-indigo-900/40 hover:scale-105 active:scale-95 transition-all duration-200">
              Join for Free →
            </button>
            <span className="text-gray-500 text-xs">No credit card required</span>
          </div>
        </div>
      </section>

      {/* ── New Arrivals ─────────────────────────────────── */}
      <ProductSection
        title="Fresh Arrivals"
        subtitle="Just Dropped"
        products={newArrivals}
        accent="pink"
        viewAllLink="/category/fashion"
      />

      {/* ── Trusted Brands ───────────────────────────────── */}
      <section className="mt-14">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
          Trusted Brands on ShopEase
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {BRANDS.map((brand) => (
            <span
              key={brand}
              className="text-sm font-bold text-gray-400 hover:text-indigo-600 border border-gray-200 hover:border-indigo-200 bg-white hover:bg-indigo-50 px-5 py-2.5 rounded-2xl cursor-pointer transition-all duration-200"
            >
              {brand}
            </span>
          ))}
        </div>
      </section>

      {/* ── All Products ─────────────────────────────────── */}
      <ProductSection
        title="Handpicked For You"
        subtitle="Suggested"
        products={products}
        accent="amber"
        viewAllLink="/category/electronics"
      />

    </MainLayout>
  );
}

export default Home;