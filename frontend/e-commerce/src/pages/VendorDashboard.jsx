import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

const STATS = [
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
    label: "Total Products",
    value: "24",
    change: "+3 this week",
    positive: true,
    bg: "from-indigo-50 to-violet-50",
    iconBg: "bg-indigo-100 text-indigo-600",
    border: "border-indigo-100",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    label: "Total Orders",
    value: "138",
    change: "+12 today",
    positive: true,
    bg: "from-emerald-50 to-teal-50",
    iconBg: "bg-emerald-100 text-emerald-600",
    border: "border-emerald-100",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
      </svg>
    ),
    label: "Total Revenue",
    value: "₹2,48,500",
    change: "+₹14k this month",
    positive: true,
    bg: "from-amber-50 to-orange-50",
    iconBg: "bg-amber-100 text-amber-600",
    border: "border-amber-100",
  },
  {
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: "Customers",
    value: "892",
    change: "+28 this week",
    positive: true,
    bg: "from-pink-50 to-rose-50",
    iconBg: "bg-pink-100 text-pink-600",
    border: "border-pink-100",
  },
];

const QUICK_ACTIONS = [
  {
    to: "/vendor/add-product",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
      </svg>
    ),
    label: "Add Product",
    desc: "List a new item for sale",
    gradient: "from-indigo-500 to-violet-600",
    shadow: "shadow-indigo-200",
  },
  {
    to: "/vendor/products",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
    label: "Manage Products",
    desc: "Edit, pause or remove listings",
    gradient: "from-violet-500 to-purple-600",
    shadow: "shadow-violet-200",
  },
  {
    to: "/vendor/orders",
    icon: (
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/><path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    label: "Manage Orders",
    desc: "Track and fulfil orders",
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-200",
  },
];

const RECENT_ORDERS = [
  { id: "#ORD-1041", product: "iPhone 15 Pro Max", customer: "Arjun M.",  amount: "₹1,34,999", status: "Delivered",  statusColor: "bg-green-100 text-green-700"  },
  { id: "#ORD-1040", product: "Sony WH-1000XM5",   customer: "Priya S.",  amount: "₹24,999",   status: "Shipped",    statusColor: "bg-blue-100 text-blue-700"    },
  { id: "#ORD-1039", product: "MacBook Air M3",     customer: "Rahul K.", amount: "₹1,14,900", status: "Processing", statusColor: "bg-amber-100 text-amber-700"  },
  { id: "#ORD-1038", product: "Dyson Airwrap",      customer: "Sneha R.", amount: "₹45,900",   status: "Pending",    statusColor: "bg-gray-100 text-gray-600"    },
];

function VendorDashboard() {
  return (
    <MainLayout>
      <div className="mt-8 mb-16">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">Welcome back 👋</p>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Vendor Dashboard
              <span className="block h-1 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-2" />
            </h1>
          </div>

          {/* Header CTAs */}
          <div className="flex items-center gap-3">
            <Link
              to="/vendor/add-product"
              className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-violet-600 hover:to-indigo-600 text-white text-sm font-bold px-5 py-2.5 rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              Add Product
            </Link>
            <Link
              to="/vendor/products"
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-indigo-300 text-gray-700 hover:text-indigo-600 text-sm font-semibold px-5 py-2.5 rounded-2xl hover:shadow-md transition-all duration-200"
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Manage Products
            </Link>
            <Link
              to="/vendor/orders"
              className="flex items-center gap-2 bg-white border border-gray-200 hover:border-emerald-300 text-gray-700 hover:text-emerald-600 text-sm font-semibold px-5 py-2.5 rounded-2xl hover:shadow-md transition-all duration-200"
            >
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="2"/>
              </svg>
              Manage Orders
            </Link>
          </div>
        </div>

        {/* ── Stats Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {STATS.map((s) => (
            <div key={s.label} className={`bg-gradient-to-br ${s.bg} border ${s.border} rounded-3xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}>
              <div className="flex items-start justify-between mb-4">
                <div className={`w-11 h-11 rounded-2xl ${s.iconBg} flex items-center justify-center`}>
                  {s.icon}
                </div>
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${s.positive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                  {s.change}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
              <p className="text-sm text-gray-500 mt-0.5 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Quick Actions + Recent Orders ──────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Quick Actions */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-base font-extrabold text-gray-900 mb-5">
              Quick Actions
              <span className="block h-0.5 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 mt-1.5" />
            </h2>
            <div className="space-y-3">
              {QUICK_ACTIONS.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-lg transition-all duration-200 hover:-translate-x-0.5"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${a.gradient} text-white flex items-center justify-center shadow-md ${a.shadow} group-hover:scale-110 transition-transform duration-200`}>
                    {a.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{a.label}</p>
                    <p className="text-xs text-gray-400">{a.desc}</p>
                  </div>
                  <svg className="ml-auto text-gray-300 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all duration-200" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-extrabold text-gray-900">
                Recent Orders
                <span className="block h-0.5 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 mt-1.5" />
              </h2>
              <Link to="/vendor/orders" className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 border border-indigo-100 hover:border-indigo-300 px-3 py-1.5 rounded-xl transition-all duration-200 flex items-center gap-1">
                View All
                <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 pr-4">Order</th>
                    <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 pr-4">Product</th>
                    <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 pr-4 hidden md:table-cell">Customer</th>
                    <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 pb-3 pr-4">Amount</th>
                    <th className="text-left text-xs font-bold uppercase tracking-widest text-gray-400 pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {RECENT_ORDERS.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50/60 transition-colors group">
                      <td className="py-3.5 pr-4 font-mono text-xs font-bold text-indigo-500">{o.id}</td>
                      <td className="py-3.5 pr-4 font-medium text-gray-800 max-w-[140px] truncate">{o.product}</td>
                      <td className="py-3.5 pr-4 text-gray-500 hidden md:table-cell">{o.customer}</td>
                      <td className="py-3.5 pr-4 font-bold text-gray-900">{o.amount}</td>
                      <td className="py-3.5">
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${o.statusColor}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* ── Promo Banner ────────────────────────────── */}
        <div className="mt-6 relative overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-white/5 border border-white/10 pointer-events-none" />
          <div className="absolute -right-4 -bottom-14 w-64 h-64 rounded-full bg-white/5 border border-white/10 pointer-events-none" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest text-indigo-200 mb-1">Pro tip</p>
            <h3 className="text-xl font-extrabold text-white">Boost your sales with ShopEase Ads</h3>
            <p className="text-indigo-200 text-sm mt-1">Reach 10x more customers with promoted listings.</p>
          </div>
          <button className="relative z-10 shrink-0 bg-white text-indigo-700 font-bold text-sm px-6 py-3 rounded-2xl hover:bg-indigo-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-indigo-900/20">
            Explore Ads →
          </button>
        </div>

      </div>
    </MainLayout>
  );
}

export default VendorDashboard;