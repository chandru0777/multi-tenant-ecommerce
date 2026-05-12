function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-16">

      {/* Gradient top border */}
      <div className="h-0.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            ShopEase ✦
          </h2>
          <p className="text-sm leading-7 text-gray-400">
            Your trusted multi-vendor e-commerce platform for electronics, fashion, home products and more.
          </p>
          {/* Newsletter */}
          <div className="flex items-center mt-2 rounded-xl overflow-hidden border border-gray-700 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all duration-200">
            <input
              type="email"
              placeholder="Your email..."
              className="bg-transparent flex-1 px-4 py-2.5 text-sm text-gray-300 placeholder-gray-600 outline-none"
            />
            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-4 py-2.5 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* About */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
            About
          </h3>
          <ul className="space-y-3 text-sm">
            {["Contact Us", "About Us", "Careers", "Press"].map((item) => (
              <li key={item}>
                <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors duration-200">
                  <span className="w-0 group-hover:w-3 h-px bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 rounded-full" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
            Help
          </h3>
          <ul className="space-y-3 text-sm">
            {["Payments", "Shipping", "Cancellation", "FAQ"].map((item) => (
              <li key={item}>
                <a href="#" className="group flex items-center gap-2 hover:text-white transition-colors duration-200">
                  <span className="w-0 group-hover:w-3 h-px bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 rounded-full" />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5">
            Follow Us
          </h3>
          <div className="flex gap-3">
            {[
              { label: "Facebook", icon: (
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              )},
              { label: "Instagram", icon: (
                <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              )},
              { label: "Twitter", icon: (
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M4 4l16 16M4 20 20 4" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/></svg>
              )},
              { label: "YouTube", icon: (
                <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              )},
            ].map(({ label, icon }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="w-9 h-9 rounded-xl bg-gray-800 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 text-gray-400 hover:text-white flex items-center justify-center hover:scale-110 hover:shadow-lg hover:shadow-indigo-500/25 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>

          {/* Payment badges */}
          <div className="mt-8">
            <p className="text-xs text-gray-600 uppercase tracking-widest mb-3 font-semibold">We Accept</p>
            <div className="flex flex-wrap gap-2">
              {["Visa", "Mastercard", "PayPal", "UPI"].map((pay) => (
                <span key={pay} className="text-[11px] font-semibold text-gray-400 border border-gray-700 rounded-md px-2.5 py-1 hover:border-purple-500 hover:text-purple-400 transition-colors duration-200">
                  {pay}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>© 2026 <span className="text-gray-400 font-semibold">ShopEase</span>. All rights reserved.</span>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((link) => (
              <a key={link} href="#" className="hover:text-gray-300 transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
