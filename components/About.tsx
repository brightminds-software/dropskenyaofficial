"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Smooth scroll animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 } 
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const fadeUpClass = `transition-all duration-1000 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
  }`;
  
  const fadeUpClassDelayed = `transition-all duration-1000 delay-200 ease-out ${
    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
  }`;

  return (
    <section id="about" ref={sectionRef} className="relative py-24 bg-white overflow-hidden scroll-mt-24">
      
      {/* Subtle Floating Background Animation (Blobs) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* 
           FIX: Changed from Grid to Flex. 
           justify-center pulls them together. 
           gap-12 lg:gap-20 controls the space between them.
           The remaining space naturally goes to the outer edges.
        */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* 1. Mobile Title (Visible only on small screens) */}
          <div className={`lg:hidden order-1 text-center w-full ${fadeUpClass}`}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight relative inline-block">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">DropsKenya</span>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full"></span>
            </h2>
          </div>

          {/* 2. Text Section (Takes up slightly less than half width) */}
          <div className={`order-3 lg:order-1 w-full lg:w-5/12 ${fadeUpClass}`}>
            
            {/* Desktop Title (Hidden on mobile) */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight relative inline-block">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-orange-500">DropsKenya</span>
                <span className="absolute -bottom-2 left-0 w-24 h-1.5 bg-gradient-to-r from-purple-600 to-orange-500 rounded-full"></span>
              </h2>
            </div>

            <p className="text-lg sm:text-xl font-bold text-slate-700 leading-relaxed mb-6">
              DropsKenya is the brainchild of audio engineers who understand that the best branding comes from the best sound.
            </p>

            <p className="text-slate-600 leading-relaxed text-base sm:text-lg mb-8">
              We know that to make a great impression, you need great audio — a combination of top-notch drops, professional logos, and eye-catching visuals. A place without distractions, yet accessible, where development is encouraged and prices aren’t prohibitive, but quality is never sacrificed and clients are treated with respect.
            </p>

            {/* Signature Area */}
            <div className="pt-6 border-t border-slate-200">
              <p className="text-3xl text-slate-800 mb-1 italic" style={{ fontFamily: 'cursive' }}>
                Samwel
              </p>
              <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">
                Founder, DropsKenya
              </p>
            </div>
          </div>

          {/* 3. Image Section (Takes up slightly less than half width) */}
          <div className={`order-2 lg:order-2 w-full lg:w-5/12 flex justify-center ${fadeUpClassDelayed}`}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-md w-full">
              <img 
                src="/images/ABOUT US.jpg" 
                alt="DropsKenya Professional Studio" 
                className="w-full h-[300px] lg:h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

              {/* Clean Play Button */}
              <button className="absolute bottom-4 right-4 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 focus:outline-none group">
                <svg className="w-6 h-6 sm:w-7 sm:h-7 ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            {/* Decorative accent box behind image */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-purple-100 rounded-2xl -z-10 hidden lg:block max-w-md"></div>
          </div>

        </div>
      </div>

      {/* Custom CSS for the floating background blobs */}
      <style jsx>{`
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.15;
          animation: float 10s infinite ease-in-out alternate;
        }
        .blob-1 {
          top: -10%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: #A855F7;
          animation-duration: 12s;
        }
        .blob-2 {
          bottom: -10%;
          right: -10%;
          width: 400px;
          height: 400px;
          background: #F97316;
          animation-duration: 15s;
          animation-delay: -5s;
        }
        .blob-3 {
          top: 40%;
          left: 40%;
          width: 300px;
          height: 300px;
          background: #06B6D4;
          animation-duration: 18s;
          animation-delay: -2s;
        }
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(30px, 50px) scale(1.1); }
        }
      `}</style>
    </section>
  );
}