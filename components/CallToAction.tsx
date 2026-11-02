export default function CallToAction() {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Subtle background decoration to blend with the white About section */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/30 to-white pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Main CTA Box */}
        <div className="bg-[#2b2b2e] rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden">
          
          {/* Decorative Gradient Blob inside the dark box */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

          {/* Left Side: Text Content */}
          <div className="flex-1 text-center md:text-left z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-4">
              Need a <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">QUALITY</span> Voice?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-xl mx-auto md:mx-0 leading-relaxed">
              We deliver the very best drops and promotional solutions for African brands, businesses, and creators.
            </p>
          </div>

          {/* Right Side: Button & Promo Text */}
          <div className="flex flex-col items-center md:items-end gap-4 z-10 flex-shrink-0">
            <a 
              href="#contact" 
              className="group relative inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-white/20"
            >
              {/* Microphone Icon */}
              <svg className="w-5 h-5 text-orange-500 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
              Claim Your Voice Now
            </a>
            
            <p className="text-gray-400 text-sm sm:text-base text-center md:text-right max-w-xs">
              Don't Miss the Drop — <span className="text-orange-500 font-bold">Exclusive Discounts</span> Available for a Limited Time!
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}