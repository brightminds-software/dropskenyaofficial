"use client";
import { useEffect, useMemo, useState, useCallback } from "react";

type LogoDesign = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  galleryImages: string[];
  seoDescription: string;
  category: string;
  tags: string[];
  delivery: string;
  format: string;
};

const logos: LogoDesign[] = [
  {
    id: "logo-golden-rhythm",
    title: "Golden Rhythm Mark",
    subtitle: "Minimalist · Modern · Dynamic",
    price: 450,
    originalPrice: 1500,
    discount: 70,
    image: "/images/logos/Golden Rhythm Mark/Golden Rhythm Mark.jpg",
    galleryImages: [
      "/images/logos/Golden Rhythm Mark/sample1.jpg",
      "/images/logos/Golden Rhythm Mark/sample2.jpg",
      "/images/logos/Golden Rhythm Mark/sample3.jpg",
      "/images/logos/Golden Rhythm Mark/sample4.jpg",
    ],
    category: "Tech & SaaS",
    tags: ["Clean", "Geometric", "Corporate", "Startups", "Nairobi"],
    delivery: "Within 72 hours",
    format: "AI / EPS / PNG / SVG",
    seoDescription: "A premium and dynamic logo identity designed for DJs, music producers, entertainment brands, and creative entrepreneurs who want to stand out with confidence and style. The Golden Rhythm Mark blends bold monogram elements with a luxurious gold finish, representing creativity, excellence, and the power of music to connect audiences. Encircled by a refined emblem, the design symbolizes unity, movement, and an enduring brand presence. Its modern structure and elegant aesthetics make it ideal for event promotions, social media branding, merchandise, music platforms, and professional entertainment ventures seeking a memorable and prestigious visual identity.",
  },
  {
    id: "logo-platinum-beat",
    title: "Platinum Beat Crest",
    subtitle: "Elegant · Luxury · Premium",
    price: 400,
    originalPrice: 1200,
    discount: 67,
    image: "/images/logos/Platinum Beat Crest/Platinum Beat Crest.jpg",
    galleryImages: [
      "/images/logos/Platinum Beat Crest/sample1.jpg",
      "/images/logos/Platinum Beat Crest/sample2.jpg",
      "/images/logos/Platinum Beat Crest/sample3.jpg",
      "/images/logos/Platinum Beat Crest/sample4.jpg",
    ],
    category: "Luxury & Fashion",
    tags: ["Serif", "Premium", "Elegant", "Boutique", "High-end"],
    delivery: "Within 72 hours",
    format: "AI / EPS / PNG / SVG",
    seoDescription: "A refined and prestigious logo identity crafted for DJs, music artists, entertainment professionals, and modern media brands. The Platinum Beat Crest combines a bold monogram design with a sleek platinum-inspired finish, symbolizing excellence, authority, and a passion for sound. The circular crest reinforces strength, unity, and brand recognition, while the three stars represent achievement, quality, and a commitment to outstanding performance. Designed to make a powerful impression across social media, event promotions, merchandise, streaming platforms, and professional branding materials, this identity is perfect for creators seeking a timeless, premium, and memorable visual presence.",
  },
  {
    id: "logo-254-legacy",
    title: "254 Legacy Crest",
    subtitle: "Bold · Energetic · Heritage",
    price: 350,
    originalPrice: 700,
    discount: 50,
    image: "/images/logos/254 Legacy Crest/254 Legacy Crest.jpg",
    galleryImages: [
      "/images/logos/254 Legacy Crest/sample1.jpg",
      "/images/logos/254 Legacy Crest/sample2.jpg",
      "/images/logos/254 Legacy Crest/sample3.jpg",
      "/images/logos/254 Legacy Crest/sample4.jpg",
    ],
    category: "Sports & Fitness",
    tags: ["Dynamic", "Strong", "Athletic", "Heritage", "Active"],
    delivery: "Within 48 hours",
    format: "AI / EPS / PNG / SVG",
    seoDescription: "A distinguished badge-style logo identity inspired by heritage, pride, and enduring brand recognition. The 254 Legacy Crest combines bold typography, a structured circular emblem, and classic star elements to create a mark that symbolizes authenticity, achievement, and strong local roots. Featuring the iconic '254' as a centerpiece of national identity and connection, this design reflects confidence, professionalism, and a commitment to excellence. Its timeless crest-inspired layout makes it ideal for DJs, entertainment brands, creative businesses, apparel labels, and media personalities seeking a memorable and authoritative visual identity that stands the test of time.",
  },
  {
    id: "logo-golden-crown",
    title: "Golden Crown Wings",
    subtitle: "Luxurious · Elegant · Premium",
    price: 250,
    originalPrice: 500,
    discount: 50,
    image: "/images/logos/Golden Crown Wings/Golden Crown Wings.jpg",
    galleryImages: [
      "/images/logos/Golden Crown Wings/sample1.jpg",
      "/images/logos/Golden Crown Wings/sample2.jpg",
      "/images/logos/Golden Crown Wings/sample3.jpg",
      "/images/logos/Golden Crown Wings/sample4.jpg",
    ],
    category: "Entertainment & Music",
    tags: ["Premium", "Elegant", "DJs", "Branding", "Luxury"],
    delivery: "Within 72 hours",
    format: "AI / EPS / PNG / SVG",
    seoDescription: "A luxurious and elegant logo identity crafted for DJs, music producers, entertainment brands, and creative professionals seeking a premium visual presence. The Golden Crown Wings design combines a distinguished central emblem with graceful golden wings and royal-inspired ornamental elements, symbolizing prestige, artistic freedom, and excellence in performance. The balanced composition conveys sophistication, confidence, and the ability to rise above the ordinary, making it an ideal choice for personal branding, event promotions, music labels, streaming platforms, merchandise, and exclusive entertainment ventures. With its timeless gold aesthetic and refined design language, this identity creates a memorable and commanding brand image that reflects success, creativity, and influence.",
  },
  {
    id: "logo-sonic-crown",
    title: "Sonic Crown Emblem",
    subtitle: "Vibrant · Energetic · Musical",
    price: 300,
    originalPrice: 1000,
    discount: 70,
    image: "/images/logos/Sonic Crown Emblem/Sonic Crown Emblem.jpg",
    galleryImages: [
      "/images/logos/Sonic Crown Emblem/sample1.jpg",
      "/images/logos/Sonic Crown Emblem/sample2.jpg",
      "/images/logos/Sonic Crown Emblem/sample3.jpg",
    ],
    category: "Entertainment & Music",
    tags: ["Vibrant", "Energetic", "DJs", "Music", "Branding"],
    delivery: "Within 72 hours",
    format: "AI / EPS / PNG / SVG",
    seoDescription: "A vibrant and energetic logo identity crafted for DJs, music producers, performers, and entertainment brands that live at the center of sound and creativity. The Sonic Crown Emblem combines iconic music elements, including a vinyl record, headphones, dynamic wings, and a royal crown, to symbolize artistic excellence, freedom, and mastery of the mix. The bold design captures the excitement of live performances and the power of music to inspire and connect audiences. With its striking modern aesthetic and strong visual storytelling, this identity is ideal for DJ branding, event promotions, streaming platforms, merchandise, social media presence, and professional entertainment ventures seeking a memorable and influential brand image.",
  },
];

// Reusable Icon Component
const Icon = ({ name, size = 20, strokeWidth = 1.8 }: { name: string; size?: number; strokeWidth?: number }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
  if (name === "close") return <svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>;
  if (name === "check") return <svg {...common}><path d="m5 12 4 4L19 7" /></svg>;
  if (name === "eye") return <svg {...common}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>;
  if (name === "sparkles") return <svg {...common}><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287L12 3Z" /></svg>;
  if (name === "cart") return <svg {...common}><path d="M3 4h2l1.6 10.2a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 1.9-1.4L20 8H6" /><circle cx="9" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></svg>;
  if (name === "zoom") return <svg {...common}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3M11 8v6M8 11h6" /></svg>;
  if (name === "chevron-left") return <svg {...common}><path d="m15 18-6-6 6-6" /></svg>;
  if (name === "chevron-right") return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>;
  return null;
};

export default function Logos() {
  const [viewDrop, setViewDrop] = useState<LogoDesign | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const categories = useMemo(() => ["All", ...Array.from(new Set(logos.map((l) => l.category)))], []);
  const filteredLogos = useMemo(() => activeCategory === "All" ? logos : logos.filter((l) => l.category === activeCategory), [activeCategory]);

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const saved = localStorage.getItem("dropsKenyaCart");
        const cart = saved ? JSON.parse(saved) : [];
        setCartCount(Array.isArray(cart) ? cart.length : 0);
      } catch { setCartCount(0); }
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  useEffect(() => {
    const isModalOpen = viewDrop || lightboxIndex !== null;
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [viewDrop, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null || !viewDrop) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLightboxIndex(null);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : prev));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && viewDrop && prev < viewDrop.galleryImages.length - 1 ? prev + 1 : prev));
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, viewDrop]);

  const addToCart = (drop: any) => {
    try {
      const savedCart = localStorage.getItem("dropsKenyaCart");
      const cart: any[] = savedCart ? JSON.parse(savedCart) : [];
      if (!cart.some((item) => item.id === drop.id)) {
        const nextCart = [...cart, drop];
        localStorage.setItem("dropsKenyaCart", JSON.stringify(nextCart));
        setCartCount(nextCart.length);
        window.dispatchEvent(new Event("storage")); // <-- This already exists, keep it
      }
    } catch { }
  };

  const openWhatsAppOrder = (drop: LogoDesign) => {
    const phoneNumber = "254745736283";
    const message = `Hello DropsKenya,\n\nI am interested in the Logo Design:\n\nConcept: ${drop.title}\nCategory: ${drop.category}\nPrice: KES ${drop.price}\n\nPlease let me know the next steps to provide my brand details.\n\nThank you.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null || !viewDrop) return;
    if (lightboxIndex < viewDrop.galleryImages.length - 1) {
      setLightboxIndex(lightboxIndex + 1);
    }
  }, [lightboxIndex, viewDrop]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1);
    }
  }, [lightboxIndex]);

  const carouselItems = [...logos, ...logos];

  return (
    <>
      <section id="logo-design" aria-labelledby="logo-title" className="relative overflow-hidden bg-[#111114] py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/[0.07] blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-500/[0.06] blur-[120px]" />
          <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/20 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-12 lg:mb-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-purple-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,.8)]" />
                  DropsKenya Design Studio
                </div>
                <h2 id="logo-title" className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  Brands that leave a{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
                    lasting mark.
                  </span>
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                  Modern, professional logo designs and complete brand identities crafted to make your business stand out in any market. From tech startups to luxury fashion, we build visual systems that scale.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">Available now</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-300">{logos.length} premium concepts</p>
                </div>
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300">
                  <Icon name="cart" size={19} />
                  {cartCount > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-black text-white">{cartCount}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-9 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((category) => {
                const active = category === activeCategory;
                return (
                  <button key={category} type="button" onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition-all ${active ? "border-purple-400/40 bg-purple-500 text-white shadow-lg shadow-purple-900/20" : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"}`}>
                    {category}
                  </button>
                );
              })}
            </div>
          </header>

          {/* AUTO-SLIDING CAROUSEL */}
          <div className="mb-16 relative">
            <div className="mb-6 flex items-center gap-2">
              <Icon name="sparkles" size={16} />
              <h3 className="text-sm font-black uppercase tracking-[0.15em] text-white">Featured Branding Slides</h3>
            </div>

            <div
              className="relative overflow-hidden touch-pan-y"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
            >
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#111114] to-transparent z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#111114] to-transparent z-10 pointer-events-none"></div>

              <div className={`flex gap-6 w-max animate-marquee ${isPaused ? 'paused' : ''}`}>
                {carouselItems.map((logo, index) => (
                  <div key={`${logo.id}-${index}`} className="group relative shrink-0 w-[85vw] sm:w-[380px] lg:w-[450px] overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-[#19191d] transition-all duration-300 hover:border-purple-400/20">
                    <div className="absolute right-4 top-4 z-20 rounded-full border border-orange-300/20 bg-orange-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                      Save {logo.discount}%
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img src={logo.image} alt={logo.title} loading="lazy" className="h-full w-full object-cover opacity-90 transition duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#19191d] via-black/30 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5">
                        <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-purple-300">{logo.category}</p>
                        <h4 className="text-2xl font-black tracking-tight text-white">{logo.title}</h4>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="mb-4 text-sm text-zinc-400 line-clamp-3 leading-relaxed">{logo.seoDescription}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600">From</p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-xl font-black text-white">KES {logo.price.toLocaleString()}</span>
                            <span className="text-xs font-medium text-zinc-600 line-through hidden sm:inline">KES {logo.originalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                        <button type="button" onClick={() => setViewDrop(logo)} className="flex h-10 items-center gap-1.5 rounded-xl border border-white/10 px-4 text-xs font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white">
                          View Designs <Icon name="eye" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* LOGO GRID */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredLogos.map((logo) => (
              <article key={logo.id} className="group relative overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-[#19191d] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:shadow-2xl hover:shadow-black/30">
                <div className="absolute right-4 top-4 z-20 rounded-full border border-orange-300/20 bg-orange-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                  Save {logo.discount}%
                </div>
                <div className="relative aspect-square overflow-hidden">
                  <img src={logo.image} alt={logo.title} loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#19191d] via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-5">
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-purple-300">{logo.category}</p>
                    <h3 className="text-xl font-black tracking-tight text-white">{logo.title}</h3>
                  </div>
                </div>
                <div className="p-5">
                  <p className="mb-4 text-sm font-medium text-zinc-400 line-clamp-3 leading-relaxed">{logo.seoDescription}</p>
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {logo.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[9px] font-semibold text-zinc-500">{tag}</span>
                    ))}
                  </div>
                  <div className="border-t border-white/[0.06] pt-4">
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600">From</p>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-xl font-black text-white">KES {logo.price.toLocaleString()}</span>
                          <span className="text-xs font-medium text-zinc-600 line-through">KES {logo.originalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
                      <button type="button" onClick={() => openWhatsAppOrder(logo)} className="flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-4 text-xs font-black text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:from-purple-400 hover:to-orange-400">
                        Order Now <Icon name="arrow" size={14} />
                      </button>
                      <button type="button" onClick={() => setViewDrop(logo)} className="flex h-10 items-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white">
                        View <Icon name="eye" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* SEO FOOTER BLOCK */}
          <div className="mt-20 border-t border-white/5 pt-10">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Professional Logo Design Services in Kenya</h3>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-4xl mb-4">
              At DropsKenya, we specialize in creating custom logo designs and complete brand identity systems for businesses across East Africa. Whether you are launching a tech startup in Nairobi, a fashion boutique in Mombasa, or a fitness brand in Kisumu, our design team delivers high-quality, scalable vector logos (AI, EPS, SVG) that look perfect on business cards, billboards, websites, and mobile apps.
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-4xl">
              Our logo design process focuses on modern aesthetics, cultural relevance, and timeless principles. We offer minimalist logos, luxury brand identities, bold sports marks, and organic eco-friendly designs. Every package includes full commercial ownership rights, multiple file formats, and fast turnaround times to help your brand stand out in the competitive African market and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* LOGO VIEW MORE MODAL */}
      {viewDrop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-5" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) setViewDrop(null); }}>
          <div className="flex max-h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#151519] shadow-2xl shadow-black/60">
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-7">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400">Design Variations</p>
                <p className="mt-1 text-xs text-zinc-500">See this logo in different contexts</p>
              </div>
              <button type="button" aria-label="Close gallery" onClick={() => setViewDrop(null)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:bg-white/10 hover:text-white">
                <Icon name="close" size={17} />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-1">
              <div className="p-5 sm:p-8">
                <div className="mb-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-black/40 flex justify-center">
                  <img
                    src={viewDrop.image}
                    alt={viewDrop.title}
                    className="w-full max-w-[450px] aspect-square object-cover"
                  />
                </div>

                <div className="mb-8">
                  <p className="mb-5 text-[10px] font-black uppercase tracking-[0.18em] text-purple-400">Applied Designs & Mockups <span className="text-zinc-600 font-medium normal-case tracking-normal ml-2">(Click to View)</span></p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    {viewDrop.galleryImages.map((img, index) => (
                      <div
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="group/img relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] aspect-[4/3] cursor-zoom-in transition-all hover:border-purple-400/30"
                      >
                        <img src={img} alt={`${viewDrop.title} variation ${index + 1}`} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover/img:scale-110" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                            <Icon name="zoom" size={20} />
                          </div>
                        </div>
                        <div className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 transition group-hover/img:opacity-100 bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                          View Full
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-[1fr_220px]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-400">About this identity</p>
                    <h4 className="mt-2 text-2xl font-bold text-white">{viewDrop.title}</h4>
                    <p className="mt-4 text-sm leading-7 text-zinc-400">{viewDrop.seoDescription}</p>
                  </div>
                  <aside className="h-fit rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-600">Package Includes</p>
                    <div className="mt-4 space-y-4">
                      {[["check", "Source files (AI/EPS/SVG)"], ["check", "High-res PNG/JPG"], ["check", viewDrop.delivery], ["check", "Full ownership rights"]].map(([icon, label]) => (
                        <div key={label} className="flex items-center gap-2.5 text-xs font-medium text-zinc-300">
                          <span className="text-green-400"><Icon name={icon} size={14} /></span>{label}
                        </div>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            </div>

            {/* UPDATED FOOTER: "Order Now" */}
            <div className="shrink-0 border-t border-white/[0.07] bg-[#151519] p-4 sm:px-8 sm:py-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_auto]">
                <button type="button" onClick={() => openWhatsAppOrder(viewDrop)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-5 py-3.5 text-sm font-black text-white transition hover:from-purple-400 hover:to-orange-400">
                  Order Now <Icon name="arrow" size={16} />
                </button>
                <button type="button" onClick={() => addToCart(viewDrop)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]">
                  <Icon name="cart" size={16} /> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULL-SCREEN LIGHTBOX WITH PREV/NEXT NAVIGATION */}
      {lightboxIndex !== null && viewDrop && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close lightbox"
          >
            <Icon name="close" size={20} />
          </button>

          <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <span className="text-xs font-bold text-white">{lightboxIndex + 1}</span>
            <span className="text-[10px] text-white/40">/</span>
            <span className="text-xs font-bold text-white/60">{viewDrop.galleryImages.length}</span>
          </div>

          {lightboxIndex > 0 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white hover:scale-110"
              aria-label="Previous mockup"
            >
              <Icon name="chevron-left" size={22} />
            </button>
          )}

          {lightboxIndex < viewDrop.galleryImages.length - 1 && (
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 backdrop-blur-md transition hover:bg-white/10 hover:text-white hover:scale-110"
              aria-label="Next mockup"
            >
              <Icon name="chevron-right" size={22} />
            </button>
          )}

          <div
            className="relative w-full h-full flex items-center justify-center p-4 sm:p-16 overflow-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              key={lightboxIndex}
              src={viewDrop.galleryImages[lightboxIndex]}
              alt={`${viewDrop.title} mockup ${lightboxIndex + 1}`}
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-scale-in"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70">
              Mockup {lightboxIndex + 1} of {viewDrop.galleryImages.length}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scale-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        .animate-marquee {
          animation: marquee 45s linear infinite;
          will-change: transform;
        }
        .paused {
          animation-play-state: paused;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.25s ease-out;
        }
      `}</style>
    </>
  );
}