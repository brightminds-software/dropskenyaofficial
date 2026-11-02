"use client";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-[#08060b] px-4 pt-28 text-white sm:px-6 lg:pt-32">
      
      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/Hero-image.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#100817]/50 to-[#08060b]" />

        {/* Ambient lighting */}
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-purple-700/20 blur-[120px]" />
        <div className="absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-orange-600/15 blur-[120px]" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center py-12 text-center">
        
        {/* Eyebrow */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md">
          <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" />
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-200 sm:text-xs sm:tracking-[0.22em]">
            Kenya's Premium DJ Branding Studio
          </span>
        </div>

        {/* Main heading */}
        <h1 className="mx-auto max-w-5xl text-4xl font-black uppercase leading-[1.12] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-[82px]">
          Give Your DJ Brand
          <span className="mt-2 block bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            A Powerful Voice.
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8 md:text-lg">
          Premium custom DJ drops, animated logos, promotional posters
          and lower thirds. We create professional audio and visual
          identities that make your brand impossible to ignore.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <a
            href="#dj-drops"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-8 py-4 text-sm font-bold text-white shadow-[0_8px_35px_rgba(147,51,234,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(147,51,234,0.4)] sm:w-auto sm:text-base"
          >
            Order Your DJ Drop
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14m-7-7 7 7-7 7"
              />
            </svg>
          </a>

          <a
            href="#sound-effects"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/25 bg-white/[0.04] px-8 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white hover:bg-white hover:text-black sm:w-auto sm:text-base"
          >
            Explore Sound Effects
          </a>
        </div>

        {/* Trust statement */}
        <p className="mt-8 text-xs tracking-wide text-gray-400 sm:text-sm">
          Creative Audio Branding
          <span className="mx-2 text-purple-400">•</span>
          Professional Sound
          <span className="mx-2 text-purple-400">•</span>
          Nairobi, Kenya
        </p>
      </div>

      {/* REDUCED MOTION SUPPORT */}
      <style jsx>{`
        @media (prefers-reduced-motion: no-preference) {
          @keyframes heroReveal {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .relative.z-10 {
            animation: heroReveal 0.9s ease-out both;
          }
        }
      `}</style>
    </section>
  );
}