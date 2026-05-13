import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { banners } from "../data/banners";

function HeroSlider() {
  return (
    <div className="mt-5 px-4 md:px-0">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
          renderBullet: (_, className) =>
            `<span class="${className} !w-6 !h-1.5 !rounded-full !bg-white/50 [&.swiper-pagination-bullet-active]:!bg-white [&.swiper-pagination-bullet-active]:!w-8 transition-all duration-300"></span>`,
        }}
        loop={true}
        className="rounded-3xl overflow-hidden"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative h-[460px] md:h-[520px] overflow-hidden">

              {/* Background Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover scale-105"
                style={{ animation: "kenBurns 8s ease-in-out infinite alternate" }}
              />

              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r ${banner.accent}`} />

              {/* Noise texture overlay */}
              <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 max-w-3xl">

                {/* Tag pill */}
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white/90 bg-white/15 backdrop-blur-sm border border-white/20 px-3 py-1.5 rounded-full w-fit mb-5 tracking-wide">
                  {banner.tag}
                  <span className="bg-white text-gray-800 text-[10px] font-black px-2 py-0.5 rounded-full ml-1">
                    {banner.badge}
                  </span>
                </span>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4 drop-shadow-lg whitespace-pre-line">
                  {banner.title}
                </h1>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-white/80 mb-8 font-medium max-w-md leading-relaxed">
                  {banner.subtitle}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-4">
                  <button className="group flex items-center gap-2 bg-white text-gray-900 font-bold text-sm px-7 py-3.5 rounded-2xl hover:bg-gray-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl shadow-black/20">
                    {banner.cta}
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                  <button className="text-sm font-semibold text-white/80 hover:text-white transition-colors underline underline-offset-4">
                    View All Deals
                  </button>
                </div>

              </div>

              {/* Decorative circles */}
              <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-white/5 border border-white/10" />
              <div className="absolute -right-8 -bottom-20 w-80 h-80 rounded-full bg-white/5 border border-white/10" />

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        @keyframes kenBurns {
          from { transform: scale(1.05) translateX(0px); }
          to   { transform: scale(1.12) translateX(-15px); }
        }
      `}</style>
    </div>
  );
}

export default HeroSlider;