"use client";
import { useEffect, useMemo, useState, useRef } from "react";

type LowerThird = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discount: number;
  thumbnail: string;
  videoSrc: string;
  youtubeUrl: string;
  seoDescription: string;
  category: string;
  tags: string[];
  delivery: string;
  format: string;
  duration: string;
};

// PLACEHOLDERS
const PLACEHOLDER_VIDEO = "/videos/lowerthirds/lower-third-placeholder.mp4";
const PLACEHOLDER_THUMBNAIL = "/images/lowerthirds-thumbnails/thumbnail1.jpg";
const PLACEHOLDER_YOUTUBE = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const lowerThirds: LowerThird[] = [
  {
    id: "lt-dj-lower-third",
    title: "DJ Lower Third Pack",
    subtitle: "Dynamic • Professional • On-Brand",
    price: 850,
    originalPrice: 2000,
    discount: 58, // (2000 - 850) / 2000 = 57.5% -> 58%
    thumbnail: PLACEHOLDER_THUMBNAIL,
    videoSrc: PLACEHOLDER_VIDEO,
    youtubeUrl: PLACEHOLDER_YOUTUBE,
    category: "DJ & Entertainment",
    tags: ["DJ Name", "Social Media", "Live Sets"],
    delivery: "Within 48 hours",
    format: "MP4 / Green Screen",
    duration: "0:15",
    seoDescription:
      "Elevate your live sets and video mixes with our professional DJ Lower Third Pack. This premium package includes up to 8 customizable text slots (perfect for your DJ name, social media handles, location, and track info). Need more? Additional slots are available for just KES 150 each. Delivered in high-resolution MP4 with a green screen background, ensuring seamless drag-and-drop integration into OBS, Premiere Pro, After Effects, and DaVinci Resolve. Give your streams and recordings the polished, broadcast-ready look they deserve.",
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
  if (name === "play") return <svg {...common}><path d="M8 5.5v13l10-6.5L8 5.5Z" fill="currentColor" stroke="none" /></svg>;
  if (name === "info") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 10v6M12 7.5h.01" /></svg>;
  if (name === "fullscreen") return <svg {...common}><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" /></svg>;
  return null;
};

export default function LowerThirds() {
  const [viewDrop, setViewDrop] = useState<LowerThird | null>(null);
  const [orderDrop, setOrderDrop] = useState<LowerThird | null>(null);
  const [previewVideo, setPreviewVideo] = useState<LowerThird | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [textInput, setTextInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const videoRef = useRef<HTMLVideoElement>(null);

  const categories = useMemo(() => ["All", ...Array.from(new Set(lowerThirds.map((l) => l.category)))], []);
  const filteredDrops = useMemo(() => activeCategory === "All" ? lowerThirds : lowerThirds.filter((l) => l.category === activeCategory), [activeCategory]);

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
    document.body.style.overflow = viewDrop || orderDrop || previewVideo ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [viewDrop, orderDrop, previewVideo]);

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
  const openWhatsAppOrder = (drop: LowerThird) => {
    if (textInput.trim().length < 2) {
      setErrorMsg("Please enter the text you want displayed (e.g., Name & Title).");
      return;
    }
    setErrorMsg("");
    const phoneNumber = "254745736283";
    const message = `Hello DropsKenya,\n\nI would like to order a Lower Third:\n\nPackage: ${drop.title}\nCategory: ${drop.category}\nPrice: KES ${drop.price}\nText to Display: ${textInput.trim()}\n\nPlease let me know the next steps.\n\nThank you.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    setOrderDrop(null);
    setTextInput("");
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (vid) {
      if (vid.requestFullscreen) {
        vid.requestFullscreen();
      }
      // @ts-ignore - Safari iOS support
      else if ((vid as any).webkitEnterFullscreen) {
        (vid as any).webkitEnterFullscreen();
      }
    }
  };

  return (
    <>
      <section id="lower-thirds" aria-labelledby="lt-title" className="relative overflow-hidden bg-[#111114] py-20 sm:py-24 lg:py-28">
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
                  DropsKenya Motion Studio
                </div>
                <h2 id="lt-title" className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  On-screen graphics that{" "}
                  <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
                    command attention.
                  </span>
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                  Professional lower thirds, name straps, and motion graphics for broadcast, streaming, and social media. Delivered with green screen for seamless integration.
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <div className="hidden text-right sm:block">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">Available now</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-300">{lowerThirds.length} motion pack</p>
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

          {/* 16:9 THUMBNAIL GRID */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredDrops.map((drop) => (
              <article key={drop.id} className="group relative overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-[#19191d] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:shadow-2xl hover:shadow-black/30">
                <div className="absolute right-4 top-4 z-20 rounded-full border border-orange-300/20 bg-orange-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white">
                  Save {drop.discount}%
                </div>

                {/* THUMBNAIL AREA (Static Image + Play Button) */}
                <div
                  className="relative aspect-video overflow-hidden bg-black cursor-pointer"
                  onClick={() => setPreviewVideo(drop)}
                >
                  <img
                    src={drop.thumbnail}
                    alt={drop.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#19191d] via-black/40 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 transition-all group-hover:scale-110 group-hover:bg-purple-500 group-hover:border-purple-500">
                      <Icon name="play" size={24} />
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
                    <div className="flex items-center gap-3">
                      <div className="hidden sm:block">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-white/60">Preview</p>
                        <p className="text-xs font-bold text-white">{drop.duration}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-14 right-4 h-0.5 bg-white/20 rounded-full overflow-hidden hidden sm:block">
                      <div className="h-full w-1/3 bg-gradient-to-r from-purple-500 to-orange-500 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-purple-300">{drop.category}</p>
                      <h3 className="text-xl font-black tracking-tight text-white">{drop.title}</h3>
                    </div>
                  </div>
                  <p className="mb-4 text-sm text-zinc-400 line-clamp-2">{drop.subtitle}</p>

                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {drop.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[9px] font-semibold text-zinc-500">{tag}</span>
                    ))}
                  </div>

                  <div className="border-t border-white/[0.06] pt-4">
                    <div className="flex items-end justify-between gap-4 mb-4">
                      <div>
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600">From</p>
                        <div className="mt-1 flex items-baseline gap-2">
                          <span className="text-xl font-black text-white">KES {drop.price.toLocaleString()}</span>
                          <span className="text-xs font-medium text-zinc-600 line-through">KES {drop.originalPrice.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr_auto_auto] gap-2">
                      <button type="button" onClick={() => setOrderDrop(drop)} className="flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-4 text-xs font-black text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:from-purple-400 hover:to-orange-400">
                        Order Now <Icon name="arrow" size={14} />
                      </button>
                      <button type="button" onClick={() => addToCart(drop)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white">
                        <Icon name="cart" size={17} />
                      </button>
                      <button type="button" onClick={() => setViewDrop(drop)} className="flex h-10 items-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white">
                        Details <Icon name="eye" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* SEO FOOTER */}
          <div className="mt-20 border-t border-white/5 pt-10">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">Professional Lower Thirds & Motion Graphics</h3>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-4xl mb-4">
              Elevate your video production with DropsKenya's custom lower thirds and motion graphics. Whether you are running a live DJ set in Nairobi, streaming on Twitch, or creating content for Instagram Reels, our animated name straps and title cards add a layer of professionalism that viewers trust.
            </p>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-4xl">
              All packs are delivered in high-resolution formats (MP4) with green screen backgrounds, ensuring easy drag-and-drop integration into OBS, Premiere Pro, After Effects, and DaVinci Resolve. Fast turnaround and full commercial rights included.
            </p>
          </div>
        </div>
      </section>

      {/* DETAILS MODAL */}
      {viewDrop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-5" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) setViewDrop(null); }}>
          <div className="flex max-h-[95vh] w-full max-w-4xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#151519] shadow-2xl shadow-black/60">
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-7">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400">Motion Preview</p>
                <p className="mt-1 text-xs text-zinc-500">See this pack in action</p>
              </div>
              <button type="button" onClick={() => setViewDrop(null)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:bg-white/10 hover:text-white">
                <Icon name="close" size={17} />
              </button>
            </div>

            <div className="overflow-y-auto custom-scrollbar flex-1">
              <div className="p-5 sm:p-8">

                {/* MAIN GRAPHIC (Static Thumbnail + Play Button) */}
                <div
                  className="mb-8 overflow-hidden rounded-2xl border border-white/[0.07] bg-black aspect-video relative group cursor-pointer"
                  onClick={() => setPreviewVideo(viewDrop)}
                >
                  <img
                    src={viewDrop.thumbnail}
                    alt={viewDrop.title}
                    className="w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                      <Icon name="play" size={24} />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-[10px] font-bold uppercase tracking-wider text-white bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-md">
                    Click to preview full video
                  </div>
                </div>

                {/* INFO & SPECS */}
                <div className="grid gap-8 md:grid-cols-[1fr_220px]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-400">About this pack</p>
                    <h4 className="mt-2 text-2xl font-bold text-white">{viewDrop.title}</h4>

                    {/* PRICE DISPLAY IN DETAILS */}
                    <div className="mt-3 flex items-baseline gap-3">
                      <span className="text-2xl font-black text-white">KES {viewDrop.price.toLocaleString()}</span>
                      <span className="text-sm text-zinc-600 line-through">KES {viewDrop.originalPrice.toLocaleString()}</span>
                      <span className="rounded-md bg-green-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-green-400">
                        Save KES {(viewDrop.originalPrice - viewDrop.price).toLocaleString()}
                      </span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-zinc-400">{viewDrop.seoDescription}</p>
                  </div>
                  <aside className="h-fit rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
                    <p className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-600">Package Includes</p>
                    <div className="mt-4 space-y-4">
                      {[["check", "Up to 8 Text Slots"], ["check", "Extra slots: KES 150 each"], ["check", "Green Screen (MP4)"], ["check", "1080p Resolution"], ["check", viewDrop.delivery]].map(([icon, label]) => (
                        <div key={label} className="flex items-center gap-2.5 text-xs font-medium text-zinc-300">
                          <span className="text-green-400"><Icon name={icon} size={14} /></span>{label}
                        </div>
                      ))}
                    </div>
                  </aside>
                </div>
              </div>
            </div>

            {/* UPDATED FOOTER: Horizontal on mobile, removed "Close" button */}
            <div className="shrink-0 border-t border-white/[0.07] bg-[#151519] p-4 sm:px-8 sm:py-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_auto]">
                <button type="button" onClick={() => { setOrderDrop(viewDrop); setViewDrop(null); }} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-5 py-3.5 text-sm font-black text-white transition hover:from-purple-400 hover:to-orange-400">
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

      {/* FULL SCREEN VIDEO PREVIEW MODAL */}
      {previewVideo && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl animate-fade-in"
          onClick={() => setPreviewVideo(null)}
        >
          <button
            type="button"
            onClick={() => setPreviewVideo(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
            aria-label="Close video preview"
          >
            <Icon name="close" size={20} />
          </button>

          <div
            className="relative w-full max-w-5xl mx-4 sm:mx-auto aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              ref={videoRef}
              src={previewVideo.videoSrc}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>

            {/* Mobile Fullscreen Button */}
            <button
              onClick={handleFullscreen}
              className="absolute bottom-4 right-4 z-30 flex items-center gap-2 rounded-full bg-purple-500/90 backdrop-blur-md px-4 py-2.5 text-xs font-black text-white shadow-lg border border-purple-400/30 sm:hidden active:scale-95 transition-transform"
            >
              <Icon name="fullscreen" size={16} />
              View Horizontally
            </button>
          </div>
        </div>
      )}

      {/* ORDER MODAL */}
      {orderDrop && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md sm:p-5" role="dialog" aria-modal="true" onMouseDown={(e) => { if (e.target === e.currentTarget) { setOrderDrop(null); setErrorMsg(""); } }}>
          <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-7">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-600">Secure your graphics</p>
                <p className="mt-1 text-xs text-slate-400">Complete your order details</p>
              </div>
              <button type="button" onClick={() => { setOrderDrop(null); setErrorMsg(""); }} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-slate-900">
                <Icon name="close" size={17} />
              </button>
            </div>
            <div className="overflow-y-auto">
              <div className="p-5 sm:p-7">
                <div className="flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <img src={orderDrop.thumbnail} alt={orderDrop.title} className="h-16 w-24 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-purple-600">{orderDrop.category}</p>
                    <h3 className="mt-1 truncate text-base font-black text-slate-900">{orderDrop.title}</h3>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{orderDrop.subtitle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-black text-slate-900">KES {orderDrop.price.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  <div>
                    <label htmlFor="lt-text" className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-slate-700">
                      Text to Display (Name, Title, Handle) *
                    </label>
                    <input
                      id="lt-text"
                      type="text"
                      value={textInput}
                      onChange={(e) => { setTextInput(e.target.value); setErrorMsg(""); }}
                      placeholder="e.g., DJ Alex | Live from Nairobi"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                    />
                    <p className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-400">
                      <Icon name="info" size={12} />
                      Provide the exact text you want animated on screen.
                    </p>
                  </div>
                </div>

                {errorMsg && (
                  <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 p-3 text-xs font-medium text-red-700">
                    <Icon name="info" size={15} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => openWhatsAppOrder(orderDrop)}
                  className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-black text-white shadow-lg shadow-green-500/15 transition hover:bg-[#20bd5a]"
                >
                  Complete order on WhatsApp
                  <Icon name="arrow" size={16} />
                </button>
                <p className="mt-3 text-center text-[10px] leading-5 text-slate-400">
                  You will be taken to WhatsApp to confirm payment and delivery details.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.2s ease-out; }
      `}</style>
    </>
  );
}