"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type DjDrop = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  originalPrice: number;
  discount: number;
  isSfx: boolean;
  image: string;
  seoDescription: string;
  category: string;
  tags: string[];
  delivery: string;
  format: string;
};

type Props = {
  audioData: Record<string, string[]>;
};

const djDrops: DjDrop[] = [
  {
    id: "wigman",
    title: "Wigman Signature Drop",
    subtitle: "Male · Deep · Strong",
    price: 500,
    originalPrice: 1000,
    discount: 50,
    isSfx: false,
    image: "/images/drops/wigman.jpg",
    category: "Male Voice",
    tags: ["Deep Voice", "Club", "Radio", "Amapiano"],
    delivery: "Within 48 hours",
    format: "MP3",
    seoDescription:
      "Give your DJ brand a stronger identity with the Wigman Signature Drop. This deep, confident male voice is designed for DJs, radio personalities, event hosts and music brands looking for a commanding vocal identity. The delivery works particularly well across Afrobeat, Amapiano, Dancehall, Hip-Hop and high-energy club mixes. Your DJ name or approved text is professionally recorded and processed to remain clear over music without losing the character of the voice. It is an excellent choice for DJ intros, transitions, station imaging, mix branding and promotional content.",
  },
  {
    id: "velvet",
    title: "Velvet Voice Drop",
    subtitle: "Female · Sultry · Nightlife",
    price: 350,
    originalPrice: 1000,
    discount: 65,
    isSfx: false,
    image: "/images/drops/velvet.jpg",
    category: "Female Voice",
    tags: ["Sultry", "Nightlife", "Deep House", "Afro-Tech"],
    delivery: "Within 48 hours",
    format: "MP3",
    seoDescription:
      "Velvet Voice Drop brings a smoother, more intimate character to your DJ branding. Created with nightlife and after-hours sets in mind, this female vocal style works naturally with deep house, Afro-tech, Amapiano and atmospheric club music. It is ideal for DJ intros, VIP announcements, transitions, branded mixes and promotional audio where a softer but memorable voice is needed. Your approved text is recorded and processed for clarity, giving your drop a finished sound that sits naturally inside a professional DJ mix.",
  },
  {
    id: "titan",
    title: "Titan Power Drop",
    subtitle: "Male · Aggressive · Hype",
    price: 350,
    originalPrice: 1000,
    discount: 65,
    isSfx: false,
    image: "/images/drops/titan.jpg",
    category: "Male Voice",
    tags: ["Hype", "EDM", "Trap", "Festival"],
    delivery: "Within 48 hours",
    format: "MP3",
    seoDescription:
      "Titan Power Drop is built for DJs who want their name to hit with energy. The aggressive, high-impact delivery is suited to peak-time sets, festivals, EDM, Trap, Hip-Hop, Gqom and other high-energy genres. Your DJ name or approved wording is recorded with a punchy vocal treatment designed to cut through a busy mix. Use it during drops, transitions, battle sets, festival introductions, social media mixes and promotional content when you need a stronger vocal signature.",
  },
  {
    id: "alexander",
    title: "Alexander Classic",
    subtitle: "Male · Professional · Radio",
    price: 430,
    originalPrice: 1000,
    discount: 57,
    isSfx: false,
    image: "/images/drops/alexander.jpg",
    category: "Male Voice",
    tags: ["Radio", "Broadcast", "Professional", "Podcast"],
    delivery: "Within 48 hours",
    format: "MP3",
    seoDescription:
      "Alexander Classic is designed for DJs, radio presenters, podcasts and brands that need a clean and authoritative vocal identity. The professional delivery works well for station imaging, programme introductions, DJ mix branding, podcast intros, announcements and corporate audio. Its clear articulation makes the voice easy to understand over music and spoken-word production. Your station name, DJ name, programme title or approved slogan can be incorporated into the final recording.",
  },
  {
    id: "ashley",
    title: "Ashley Pop Drop",
    subtitle: "Female · Bright · Energetic",
    price: 400,
    originalPrice: 1000,
    discount: 60,
    isSfx: false,
    image: "/images/drops/ashley.jpg",
    category: "Female Voice",
    tags: ["Pop", "Afropop", "Dancehall", "Content"],
    delivery: "Within 48 hours",
    format: "MP3",
    seoDescription:
      "Ashley Pop Drop adds a bright, youthful energy to DJ branding and digital content. The upbeat female delivery works particularly well with Afropop, Dancehall, mainstream music, lifestyle videos, social content and live entertainment. It can be used for DJ intros, branded mixes, YouTube content, promotional clips and event announcements. Your custom name or approved text is recorded and processed with a clean modern vocal treatment designed to sound clear across headphones, phones, speakers and larger sound systems.",
  },
];

const Icon = ({ name, size = 20, strokeWidth = 1.8 }: { name: string; size?: number; strokeWidth?: number }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "play") return <svg {...common}><path d="M8 5.5v13l10-6.5L8 5.5Z" fill="currentColor" stroke="none" /></svg>;
  if (name === "pause") return <svg {...common}><path d="M8 5v14M16 5v14" strokeWidth="3" /></svg>;
  if (name === "cart") return <svg {...common}><path d="M3 4h2l1.6 10.2a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 1.9-1.4L20 8H6" /><circle cx="9" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></svg>;
  if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
  if (name === "close") return <svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>;
  if (name === "check") return <svg {...common}><path d="m5 12 4 4L19 7" /></svg>;
  if (name === "bolt") return <svg {...common}><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" /></svg>;
  if (name === "mic") return <svg {...common}><rect x="8" y="3" width="8" height="12" rx="4" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3M9 21h6" /></svg>;
  if (name === "info") return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 10v6M12 7.5h.01" /></svg>;
  if (name === "download") return <svg {...common}><path d="M12 3v12M7 10l5 5 5-5M5 21h14" /></svg>;
  return null;
};

export default function ServicesClient({ audioData }: Props) {
  const [selectedDrop, setSelectedDrop] = useState<DjDrop | null>(null);
  const [orderDrop, setOrderDrop] = useState<DjDrop | null>(null);
  const [showEchoInfo, setShowEchoInfo] = useState(false);
  const [djName, setDjName] = useState("");
  const [needEcho, setNeedEcho] = useState<boolean | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cartCount, setCartCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const detailsScrollRef = useRef<HTMLDivElement>(null); // NEW: ref for smooth scroll

  const categories = useMemo(() => ["All", ...Array.from(new Set(djDrops.map((drop) => drop.category)))], []);
  const filteredDrops = useMemo(() => activeCategory === "All" ? djDrops : djDrops.filter((drop) => drop.category === activeCategory), [activeCategory]);

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
    document.body.style.overflow = (selectedDrop || orderDrop || showEchoInfo) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedDrop, orderDrop, showEchoInfo]);

  // NEW: Smooth scroll to top when Details modal opens
  useEffect(() => {
    if (selectedDrop && detailsScrollRef.current) {
      // Small delay so the modal renders first, then scrolls smoothly
      const timer = setTimeout(() => {
        detailsScrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedDrop]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    setAudioProgress(Math.min(100, Math.max(0, (audio.currentTime / audio.duration) * 100)));
  };

  const handleAudioEnded = () => {
    setIsPlaying(null);
    setAudioProgress(0);
  };

  const handleAudioError = () => {
    console.error("Audio playback failed. Check if the file exists in the public/audio folder.");
    setIsPlaying(null);
    setAudioProgress(0);
  };

  const togglePlay = async (drop: DjDrop) => {
    const audio = audioRef.current;
    if (!audio) return;

    const samples = audioData[drop.id] || [];
    if (samples.length === 0) {
      console.error(`No audio file found for ${drop.id}`);
      return;
    }

    if (isPlaying === drop.id) {
      audio.pause();
      setIsPlaying(null);
      return;
    }

    try {
      audio.pause();
      const src = `/api/audio?folder=${drop.id}&file=${encodeURIComponent(samples[0])}`;
      audio.src = src;
      audio.currentTime = 0;
      setAudioProgress(0);
      await audio.play();
      setIsPlaying(drop.id);
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(null);
      setAudioProgress(0);
    }
  };

  const seekAudio = (event: React.MouseEvent<HTMLButtonElement>) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const position = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
    audio.currentTime = position * audio.duration;
    setAudioProgress(position * 100);
  };

  const openOrder = (drop: DjDrop) => { setSelectedDrop(null); setErrorMsg(""); setOrderDrop(drop); };
  const closeOrder = () => { setOrderDrop(null); setDjName(""); setNeedEcho(null); setErrorMsg(""); };

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

  const sendToWhatsApp = () => {
    if (!orderDrop) return;
    if (!orderDrop.isSfx) {
      const words = djName.trim().split(/\s+/).filter(Boolean);
      if (words.length < 2) { setErrorMsg("Please enter at least two words."); return; }
      if (needEcho === null) { setErrorMsg("Please select echo preference."); return; }
    }
    setErrorMsg("");
    const message = `Hello DropsKenya,\n\nI would like to order:\nDrop: ${orderDrop.title}\nPrice: KES ${orderDrop.price}\n${!orderDrop.isSfx ? `DJ Name: ${djName.trim()}\nEcho: ${needEcho ? "Yes" : "No"}\n` : ''}\nPlease send payment details.`;
    window.open(`https://wa.me/254745736283?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    closeOrder();
  };

  return (
    <>
      <section id="dj-drops" className="relative overflow-hidden bg-[#111114] py-20 sm:py-24 lg:py-28">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/[0.07] blur-[120px]" />
          <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-orange-500/[0.06] blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 lg:mb-12">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-purple-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,.8)]" />
                  DropsKenya Audio Studio
                </div>
                <h2 className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                  Your name should sound <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">unforgettable.</span>
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">Professional DJ drops, radio imaging and premium sound effects created to give your mixes, shows and brand a recognizable voice.</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300">
                  <Icon name="cart" size={19} />
                  {cartCount > 0 && <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-black text-white">{cartCount}</span>}
                </div>
              </div>
            </div>
            <div className="mt-9 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {categories.map((category) => (
                <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition-all ${activeCategory === category ? "border-purple-400/40 bg-purple-500 text-white shadow-lg shadow-purple-900/20" : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"}`}>
                  {category}
                </button>
              ))}
            </div>
          </header>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredDrops.map((drop, index) => {
              const playing = isPlaying === drop.id;
              const hasAudio = (audioData[drop.id] || []).length > 0;

              return (
                <article key={drop.id} className="group relative overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-[#19191d] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/20 hover:shadow-2xl hover:shadow-black/30">
                  <div className="absolute left-5 top-5 z-20 text-[10px] font-black tracking-[0.18em] text-white/25">{String(index + 1).padStart(2, "0")}</div>
                  <div className="absolute right-4 top-4 z-20 rounded-full border border-orange-300/20 bg-orange-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-white">Save {drop.discount}%</div>

                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={drop.image} alt={drop.title} loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-95" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#19191d] via-black/20 to-black/10" />
                    <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
                      <div>
                        <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.18em] text-purple-300">{drop.category}</p>
                        <h3 className="text-xl font-black tracking-tight text-white">{drop.title}</h3>
                      </div>
                      <button onClick={() => togglePlay(drop)} disabled={!hasAudio} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all ${playing ? "border-orange-300/30 bg-orange-500 text-white shadow-lg shadow-orange-900/30" : !hasAudio ? "border-white/10 bg-white/5 text-zinc-600 cursor-not-allowed" : "border-white/15 bg-white/10 text-white backdrop-blur-md hover:scale-105 hover:bg-purple-500"}`}>
                        <Icon name={playing ? "pause" : "play"} size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="p-5">
                    <p className="mb-4 text-sm font-medium text-zinc-400">{drop.subtitle}</p>
                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {drop.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[9px] font-semibold text-zinc-500">{tag}</span>)}
                    </div>
                    <div className="mb-5">
                      <button onClick={seekAudio} className="group/progress block w-full cursor-pointer py-2">
                        <div className="relative h-1 overflow-hidden rounded-full bg-white/[0.08]">
                          <div className={`absolute inset-y-0 left-0 rounded-full transition-[width] duration-100 ${playing ? "bg-gradient-to-r from-purple-500 to-orange-400" : "bg-white/20"}`} style={{ width: playing ? `${audioProgress}%` : "18%" }} />
                        </div>
                      </button>
                      <div className="mt-1 flex justify-between text-[9px] font-semibold uppercase tracking-wider text-zinc-600">
                        <span>{playing ? "Preview playing" : "Audio preview"}</span>
                        <span>{drop.format}</span>
                      </div>
                    </div>

                    <div className="border-t border-white/[0.06] pt-4">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-600">From</p>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-xl font-black text-white">KES {drop.price.toLocaleString()}</span>
                            <span className="text-xs font-medium text-zinc-600 line-through">KES {drop.originalPrice.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-2">
                        <button onClick={() => openOrder(drop)} className="flex h-10 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-4 text-xs font-black text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:from-purple-400 hover:to-orange-400">Buy <Icon name="arrow" size={14} /></button>
                        <button onClick={() => addToCart(drop)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white"><Icon name="cart" size={17} /></button>
                        <button onClick={() => setSelectedDrop(drop)} className="flex h-10 items-center gap-1.5 rounded-xl border border-white/10 px-3 text-xs font-bold text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white">Details <Icon name="arrow" size={14} /></button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <audio ref={audioRef} preload="none" onTimeUpdate={handleTimeUpdate} onEnded={handleAudioEnded} onError={handleAudioError} />

      {/* =====================================================
          PRODUCT DETAILS MODAL
      ===================================================== */}
      {selectedDrop && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-5" onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedDrop(null); }}>
          <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#151519] shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-7">
              <div><p className="text-[9px] font-black uppercase tracking-[0.2em] text-purple-400">DropsKenya Audio</p><p className="mt-1 text-xs text-zinc-500">Product details</p></div>
              <button onClick={() => setSelectedDrop(null)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:bg-white/10 hover:text-white"><Icon name="close" size={17} /></button>
            </div>

            {/* NEW: Added ref for smooth scroll animation */}
            <div ref={detailsScrollRef} className="overflow-y-auto p-5 sm:p-7 scroll-smooth">
              <div className="grid gap-6 md:grid-cols-[180px_1fr]">
                <div className="relative mx-auto w-full max-w-[180px]">
                  <div className="aspect-square overflow-hidden rounded-2xl border border-white/10"><img src={selectedDrop.image} alt={selectedDrop.title} className="h-full w-full object-cover" /></div>
                  <div className="absolute -bottom-2 -right-2 rounded-lg bg-orange-500 px-2.5 py-1.5 text-[9px] font-black text-white shadow-lg">SAVE {selectedDrop.discount}%</div>
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-purple-400">{selectedDrop.category}</p>
                  {/* UPDATED: Smaller title on mobile (text-2xl), scales up on larger screens */}
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.035em] text-white sm:text-3xl lg:text-4xl">{selectedDrop.title}</h3>
                  <p className="mt-2 text-sm font-medium text-zinc-400">{selectedDrop.subtitle}</p>
                  <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-1">
                    <span className="text-3xl font-black text-white">KES {selectedDrop.price.toLocaleString()}</span>
                    <span className="text-sm text-zinc-600 line-through">KES {selectedDrop.originalPrice.toLocaleString()}</span>
                    <span className="rounded-md bg-green-500/10 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-green-400">Save KES {(selectedDrop.originalPrice - selectedDrop.price).toLocaleString()}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {selectedDrop.tags.map((tag) => (<span key={tag} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-semibold text-zinc-400">{tag}</span>))}
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-black/20 p-4 sm:p-5">
                <div className="flex items-center gap-4">
                  <button onClick={() => togglePlay(selectedDrop)} className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-orange-500 text-white shadow-lg"><Icon name={isPlaying === selectedDrop.id ? "pause" : "play"} size={18} /></button>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white">Listen to preview</p>
                    <button onClick={seekAudio} className="mt-2 block w-full cursor-pointer py-2">
                      <div className="relative h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-500 to-orange-400 transition-[width] duration-100" style={{ width: isPlaying === selectedDrop.id ? `${audioProgress}%` : "0%" }} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-[1fr_230px]">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-purple-400">About this drop</p>
                  <h4 className="mt-2 text-xl font-bold text-white">Built around your sound.</h4>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">{selectedDrop.seoDescription}</p>
                </div>
                <aside className="h-fit rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-zinc-600">Included</p>
                  <div className="mt-4 space-y-3">
                    {[["check", "Professional processing"], ["check", selectedDrop.delivery], ["check", selectedDrop.format], ["check", selectedDrop.isSfx ? "150+ sound effects" : "Custom DJ name / text"]].map(([icon, label]) => (
                      <div key={label} className="flex items-center gap-2.5 text-xs font-medium text-zinc-300">
                        <span className="text-green-400"><Icon name={icon} size={14} /></span>{label}
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>

            <div className="shrink-0 border-t border-white/[0.07] bg-[#151519] p-4 sm:px-7 sm:py-5">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-[1fr_auto]">
                <button onClick={() => openOrder(selectedDrop)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-5 py-3.5 text-sm font-black text-white transition hover:from-purple-400 hover:to-orange-400">
                  Buy Now <Icon name="arrow" size={16} />
                </button>
                <button onClick={() => addToCart(selectedDrop)} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-white/[0.08]">
                  <Icon name="cart" size={16} /> Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ORDER MODAL (Dark Theme Matching Echo Popup)
      ===================================================== */}
      {orderDrop && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-3 backdrop-blur-md sm:p-5" onMouseDown={(e) => { if (e.target === e.currentTarget) closeOrder(); }}>
          <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#17171b] shadow-2xl">
            <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-7">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-400">Secure your drop</p>
                <p className="mt-1 text-xs text-zinc-500">Complete your order details</p>
              </div>
              <button onClick={closeOrder} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:bg-white/10 hover:text-white">
                <Icon name="close" size={17} />
              </button>
            </div>

            <div className="overflow-y-auto p-5 sm:p-7">
              <div className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                <img src={orderDrop.image} alt={orderDrop.title} className="h-16 w-16 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-purple-400">{orderDrop.category}</p>
                  <h3 className="mt-1 truncate text-base font-black text-white">{orderDrop.title}</h3>
                  <p className="mt-0.5 truncate text-xs text-zinc-400">{orderDrop.subtitle}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-white">KES {orderDrop.price.toLocaleString()}</p>
                  <p className="text-[10px] text-zinc-600 line-through">KES {orderDrop.originalPrice.toLocaleString()}</p>
                </div>
              </div>

              {!orderDrop.isSfx ? (
                <div className="mt-6 space-y-5">
                  <div>
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-zinc-500">DJ name / text to be spoken</label>
                    <input
                      type="text"
                      value={djName}
                      onChange={(e) => { setDjName(e.target.value); setErrorMsg(""); }}
                      placeholder="DJ Alex on the mix"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-sm font-medium text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10"
                    />
                  </div>

                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-white">Add echo effect?</p>
                        <p className="mt-1 text-[10px] leading-5 text-zinc-400">Adds space and a trailing repeat to the vocal.</p>
                      </div>
                      <button onClick={() => setShowEchoInfo(true)} className="shrink-0 text-[10px] font-bold text-purple-400 underline decoration-dotted underline-offset-4 hover:text-purple-300">Learn more</button>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button onClick={() => { setNeedEcho(true); setErrorMsg(""); }} className={`rounded-xl border-2 py-3 text-sm font-bold transition ${needEcho === true ? "border-purple-500 bg-purple-500/10 text-purple-300" : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"}`}>Yes</button>
                      <button onClick={() => { setNeedEcho(false); setErrorMsg(""); }} className={`rounded-xl border-2 py-3 text-sm font-bold transition ${needEcho === false ? "border-white bg-white text-black" : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white"}`}>No</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-5">
                  <div className="flex gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-orange-500 text-white">
                      <Icon name="download" size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">150+ premium sound effects</p>
                      <p className="mt-1 text-xs leading-5 text-zinc-400">A ready-to-use collection of horns, impacts, risers, transitions and other effects for your DJ sets and content.</p>
                    </div>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="mt-5 flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs font-medium text-red-400">
                  <Icon name="info" size={15} /><span>{errorMsg}</span>
                </div>
              )}

              <button onClick={sendToWhatsApp} className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] py-4 text-sm font-black text-white shadow-lg shadow-green-500/15 transition hover:bg-[#20bd5a]">
                Complete order on WhatsApp <Icon name="arrow" size={16} />
              </button>

              <p className="mt-3 text-center text-[10px] leading-5 text-zinc-500">
                You will be taken to WhatsApp to confirm payment and delivery details with the DropsKenya team.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ECHO INFO POPUP
      ===================================================== */}
      {showEchoInfo && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowEchoInfo(false); }}>
          <div className="w-full max-w-sm overflow-hidden rounded-[1.5rem] bg-[#17171b] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">
              <p className="text-[9px] font-black uppercase tracking-[0.18em] text-purple-400">Audio effect</p>
              <button onClick={() => setShowEchoInfo(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.05] text-zinc-400 hover:bg-white/10 hover:text-white">
                <Icon name="close" size={16} />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="mb-6 flex h-14 items-center justify-center gap-1">
                {[18, 30, 44, 32, 22, 38, 26, 16].map((height, index) => (<span key={index} className={`w-1 rounded-full ${index % 2 === 0 ? "bg-purple-500" : "bg-orange-400"}`} style={{ height, opacity: 1 - index * 0.07 }} />))}
              </div>
              <h3 className="text-xl font-black tracking-tight text-white">What does echo do?</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">Echo creates a controlled repetition after the main voice, giving your DJ drop more depth and space. It is especially effective for intros, transitions and club-style drops.</p>
              <button onClick={() => setShowEchoInfo(false)} className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-black text-slate-900 transition hover:bg-purple-50">Got it</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}