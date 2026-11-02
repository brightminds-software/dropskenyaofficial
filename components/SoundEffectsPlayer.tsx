"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";

type Props = {
    files: string[];
};

const formatName = (filename: string) => {
    const name = filename.replace(/\.[^/.]+$/, "");
    return name
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ")
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());
};

const shuffleArray = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const Icon = ({ name, size = 16, strokeWidth = 1.8 }: { name: string; size?: number; strokeWidth?: number }) => {
    const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
    if (name === "play") return <svg {...common}><path d="M8 5.5v13l10-6.5L8 5.5Z" fill="currentColor" stroke="none" /></svg>;
    if (name === "pause") return <svg {...common}><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor" stroke="none" /></svg>;
    if (name === "skip-forward") return <svg {...common}><path d="M5 4l10 8-10 8V4z" /><path d="M19 5v14" /></svg>;
    if (name === "skip-back") return <svg {...common}><path d="M19 20L9 12l10-8v16z" /><path d="M5 19V5" /></svg>;
    if (name === "shuffle") return <svg {...common}><path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l14.2-12.6" /><path d="m22 2-4 4" /><path d="m22 6-4-4" /><path d="M2 6h1.4c1.3 0 2.5.6 3.3 1.7l14.2 12.6" /><path d="m22 18-4 4" /><path d="m22 22-4-4" /></svg>;
    if (name === "check") return <svg {...common}><path d="m5 12 4 4L19 7" /></svg>;
    if (name === "cart") return <svg {...common}><path d="M3 4h2l1.6 10.2a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 1.9-1.4L20 8H6" /><circle cx="9" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></svg>;
    if (name === "folder") return <svg {...common}><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" /></svg>;
    if (name === "volume") return <svg {...common}><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></svg>;
    if (name === "volume-muted") return <svg {...common}><path d="M11 5 6 9H2v6h4l5 4V5z" /><path d="m22 9-6 6M16 9l6 6" /></svg>;
    if (name === "whatsapp") return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
    );
    return null;
};

export default function SoundEffectsPlayer({ files }: Props) {
    const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
    const [playOrder, setPlayOrder] = useState<number[]>(() => files.map((_, i) => i));
    const [isPlaying, setIsPlaying] = useState(false);
    const [isShuffle, setIsShuffle] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [volume, setVolume] = useState(80);
    const [isMuted, setIsMuted] = useState(false);

    const audioRef = useRef<HTMLAudioElement>(null);
    const waveRef = useRef<HTMLDivElement>(null);

    const originalPrice = 1000;
    const currentPrice = 650;
    const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);

    const tracks = useMemo(
        // Change the src to use the API route
        () => files.map((file, i) => ({ id: i, name: formatName(file), src: `/api/audio?file=${encodeURIComponent(file)}` })),
        [files]
    );

    const currentTrackIndex = playOrder[currentOrderIndex] ?? 0;
    const currentTrack = tracks[currentTrackIndex];

    const prevOrderIndex = currentOrderIndex > 0 ? currentOrderIndex - 1 : playOrder.length - 1;
    const nextOrderIndex = currentOrderIndex < playOrder.length - 1 ? currentOrderIndex + 1 : 0;
    const prevTrack = tracks[playOrder[prevOrderIndex]];
    const nextTrack = tracks[playOrder[nextOrderIndex]];

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
        if (audioRef.current) {
            audioRef.current.volume = isMuted ? 0 : volume / 100;
        }
    }, [volume, isMuted]);

    const togglePlay = useCallback(() => {
        if (!audioRef.current || !currentTrack) return;
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play().catch(() => { });
        setIsPlaying(!isPlaying);
    }, [isPlaying, currentTrack]);

    const goToNext = useCallback(() => {
        if (tracks.length === 0) return;
        setCurrentOrderIndex((prev) => (prev === playOrder.length - 1 ? 0 : prev + 1));
        setIsPlaying(true);
    }, [playOrder.length, tracks.length]);

    const goToPrev = useCallback(() => {
        if (tracks.length === 0) return;
        setCurrentOrderIndex((prev) => (prev === 0 ? playOrder.length - 1 : prev - 1));
        setIsPlaying(true);
    }, [playOrder.length, tracks.length]);

    const toggleShuffle = useCallback(() => {
        setIsShuffle((prev) => {
            const newShuffle = !prev;
            if (newShuffle) {
                const currentTrackId = playOrder[currentOrderIndex];
                const others = playOrder.filter((id) => id !== currentTrackId);
                const shuffledOthers = shuffleArray(others);
                const newOrder = [...shuffledOthers];
                newOrder.splice(currentOrderIndex, 0, currentTrackId);
                setPlayOrder(newOrder);
            } else {
                const currentTrackId = playOrder[currentOrderIndex];
                const originalOrder = files.map((_, i) => i);
                const newIndex = originalOrder.indexOf(currentTrackId);
                setPlayOrder(originalOrder);
                setCurrentOrderIndex(newIndex >= 0 ? newIndex : 0);
            }
            return newShuffle;
        });
    }, [playOrder, currentOrderIndex, files.length]);

    useEffect(() => {
        if (audioRef.current && currentTrack) {
            audioRef.current.load();
            setProgress(0);
            setCurrentTime(0);
            if (isPlaying) audioRef.current.play().catch(() => { });
        }
    }, [currentTrackIndex, currentTrack?.src]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const dur = audioRef.current.duration || 0;
            setCurrentTime(current);
            setProgress(dur > 0 ? (current / dur) * 100 : 0);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current && audioRef.current.duration) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleEnded = () => goToNext();

    const handleWaveClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!waveRef.current || !audioRef.current || !duration) return;
        const rect = waveRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const newProgress = Math.max(0, Math.min(100, (x / rect.width) * 100));
        audioRef.current.currentTime = (newProgress / 100) * duration;
        setProgress(newProgress);
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds) || !seconds) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, "0")}`;
    };

    const addToCart = () => {
        try {
            const savedCart = localStorage.getItem("dropsKenyaCart");
            const cart = savedCart ? JSON.parse(savedCart) : [];
            const item = {
                id: "sfx-pack-100",
                title: "Ultimate 100 SFX Pack",
                price: currentPrice,
                image: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?auto=format&fit=crop&w=400&q=80",
            };
            if (!cart.some((i: any) => i.id === item.id)) {
                const nextCart = [...cart, item];
                localStorage.setItem("dropsKenyaCart", JSON.stringify(nextCart));
                setCartCount(nextCart.length);
                window.dispatchEvent(new Event("storage"));
            }
        } catch { }
    };

    const openWhatsAppOrder = () => {
        const phoneNumber = "254745736283";
        const message = `Hello DropsKenya,\n\nI would like to order the Ultimate 100 Sound Effects Pack.\nPrice: KES ${currentPrice}\n\nPlease send me the payment details.\n\nThank you.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
    };

    if (files.length === 0) {
        return (
            <section id="sound-effects" className="relative overflow-hidden bg-[#140f1e] py-16 sm:py-20">
                <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
                    <div className="rounded-2xl border border-orange-400/20 bg-orange-500/10 p-8">
                        <Icon name="folder" size={32} />
                        <h3 className="mt-4 text-xl font-black text-white">No audio files found</h3>
                        <p className="mt-2 text-sm text-zinc-400">
                            Add your MP3/WAV files to <code className="rounded bg-white/5 px-2 py-0.5 font-mono text-xs text-orange-300">public/audio/sfx/</code> and refresh the page.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        // ADDED onContextMenu to disable right-click on the entire section
        <section
            id="sound-effects"
            aria-labelledby="sfx-title"
            className="relative overflow-hidden bg-[#140f1e] py-16 sm:py-20 lg:py-24"
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-purple-600/[0.10] blur-[100px]" />
                <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/[0.07] blur-[100px]" />
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/20 to-transparent" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/[0.10] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-purple-300">
                            <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,.8)]" />
                            Premium Audio Assets
                        </div>
                        <h2 id="sfx-title" className="text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl">
                            The Ultimate{" "}
                            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
                                100 SFX Pack
                            </span>
                        </h2>
                        <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-400">
                            {tracks.length} professionally mastered sound effects for DJs, video editors and content creators. Royalty-free. Instant delivery.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">Limited offer</p>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-2xl font-black text-white">KES {currentPrice}</span>
                                <span className="text-xs text-zinc-600 line-through">KES {originalPrice}</span>
                            </div>
                        </div>
                        <span className="rounded-full border border-orange-300/20 bg-orange-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                            {discount}% OFF
                        </span>
                    </div>
                </header>

                {/* GRID LAYOUT: Player first on mobile (order-1), Product second (order-2). Reversed on desktop. */}
                <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">

                    {/* PLAYER COLUMN — Top on mobile (order-1), Right on desktop (order-2) */}
                    <div className="rounded-2xl border border-white/[0.07] bg-[#1c1628] p-4 sm:p-5 flex flex-col order-1 lg:order-2">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2.5">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white">
                                    <Icon name="folder" size={16} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-white">Preview the Pack</p>
                                    <p className="text-[10px] text-zinc-500">
                                        {tracks.length} tracks · {isShuffle ? "shuffled" : "sequential"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={toggleShuffle}
                                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${isShuffle
                                    ? "bg-purple-500/10 text-purple-400 border border-purple-400/20"
                                    : "text-zinc-500 hover:text-white border border-transparent"
                                    }`}
                                title="Toggle Shuffle"
                            >
                                <Icon name="shuffle" size={12} />
                                <span className="hidden sm:inline">{isShuffle ? "Shuffle On" : "Shuffle"}</span>
                            </button>
                        </div>

                        {/* 3-Track Focused Display */}
                        <div className="flex-1 flex flex-col items-center justify-center py-2 mb-4">
                            {prevTrack && (
                                <button
                                    onClick={goToPrev}
                                    className="group w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-all hover:bg-white/[0.04] mb-1.5"
                                >
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-500 group-hover:text-white transition-colors">
                                        <Icon name="skip-back" size={10} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-zinc-600 leading-tight">Previous</p>
                                        <p
                                            className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 leading-tight truncate"
                                            title={prevTrack.name}
                                            style={{ maxWidth: "18ch" }}
                                        >
                                            {prevTrack.name}
                                        </p>
                                    </div>
                                </button>
                            )}

                            {currentTrack && (
                                <div className="w-full rounded-lg bg-gradient-to-r from-purple-500/10 to-fuchsia-500/10 border border-purple-400/20 px-3 py-2.5 mb-1.5 flex items-center">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-white shadow-lg shadow-purple-900/30 mr-2.5">
                                        {isPlaying ? <Icon name="pause" size={11} /> : <Icon name="play" size={11} />}
                                    </div>
                                    <div className="flex-1 min-w-0 overflow-hidden">
                                        <p className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-purple-300 leading-tight mb-0.5">Now Playing</p>
                                        <p
                                            className="text-[11px] sm:text-xs font-black text-white leading-tight truncate"
                                            title={currentTrack.name}
                                            style={{ maxWidth: "22ch" }}
                                        >
                                            {currentTrack.name}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {nextTrack && (
                                <button
                                    onClick={goToNext}
                                    className="group w-full flex items-center gap-2 rounded-lg px-2.5 py-2 text-left transition-all hover:bg-white/[0.04]"
                                >
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-zinc-500 group-hover:text-white transition-colors">
                                        <Icon name="skip-forward" size={10} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider text-zinc-600 leading-tight">Next Up</p>
                                        <p
                                            className="text-[10px] sm:text-[11px] font-semibold text-zinc-400 leading-tight truncate"
                                            title={nextTrack.name}
                                            style={{ maxWidth: "18ch" }}
                                        >
                                            {nextTrack.name}
                                        </p>
                                    </div>
                                </button>
                            )}
                        </div>

                        {/* Progress + Controls */}
                        <div className="border-t border-white/[0.06] pt-4">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[10px] font-mono text-zinc-500">{formatTime(currentTime)}</span>
                                <span className="text-[10px] font-mono text-zinc-500">{formatTime(duration)}</span>
                            </div>

                            <div
                                ref={waveRef}
                                onClick={handleWaveClick}
                                className="w-full flex items-center justify-center gap-[2px] h-6 cursor-pointer group mb-4"
                            >
                                {Array.from({ length: 40 }).map((_, i) => {
                                    const barProgress = (i / 40) * 100;
                                    const isPlayed = barProgress <= progress;
                                    const baseHeight = Math.sin(i * 0.45) * 15 + 25;
                                    return (
                                        <div
                                            key={i}
                                            className={`w-[3px] rounded-full transition-all duration-200 ${isPlayed
                                                ? "bg-gradient-to-t from-purple-500 to-fuchsia-400"
                                                : "bg-zinc-700 group-hover:bg-zinc-600"
                                                }`}
                                            style={{ height: `${isPlayed ? baseHeight : 18}%` }}
                                        />
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <div className="flex items-center gap-2 flex-1 max-w-[140px]">
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5 shrink-0"
                                        title={isMuted ? "Unmute" : "Mute"}
                                    >
                                        <Icon name={isMuted || volume === 0 ? "volume-muted" : "volume"} size={16} />
                                    </button>
                                    <input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={isMuted ? 0 : volume}
                                        onChange={(e) => {
                                            setVolume(Number(e.target.value));
                                            if (Number(e.target.value) > 0 && isMuted) setIsMuted(false);
                                        }}
                                        className="flex-1 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer"
                                        style={{
                                            background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${isMuted ? 0 : volume}%, #3f3f46 ${isMuted ? 0 : volume}%, #3f3f46 100%)`,
                                        }}
                                    />
                                </div>

                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={goToPrev}
                                        className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
                                    >
                                        <Icon name="skip-back" size={18} />
                                    </button>
                                    <button
                                        onClick={togglePlay}
                                        className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white shadow-lg shadow-purple-900/30 hover:scale-105 transition-transform"
                                    >
                                        {isPlaying ? <Icon name="pause" size={18} /> : <Icon name="play" size={18} />}
                                    </button>
                                    <button
                                        onClick={goToNext}
                                        className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
                                    >
                                        <Icon name="skip-forward" size={18} />
                                    </button>
                                </div>

                                <div className="flex-1 max-w-[140px] hidden sm:block" />
                            </div>
                        </div>
                    </div>

                    {/* PRODUCT COLUMN — Bottom on mobile (order-2), Left on desktop (order-1) */}
                    <div className="space-y-4 order-2 lg:order-1">
                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#1c1628] aspect-[16/10]">
                            <img
                                src="/images/sfx image.jpg"
                                alt="Sound Effects Pack"
                                className="h-full w-full object-cover opacity-80"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-[#1c1628] via-transparent to-transparent" />
                            <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                                <div>
                                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-purple-300">Digital Pack</p>
                                    <p className="text-base font-black text-white">{tracks.length} Studio-Grade SFX</p>
                                </div>
                                <span className="rounded-md bg-black/50 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                                    320kbps MP3
                                </span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/[0.07] bg-[#1c1628] p-4">
                            <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-4">
                                {[
                                    `${tracks.length}+ Premium SFX`,
                                    "320kbps MP3",
                                    "Commercial Rights",
                                    "Instant Delivery",
                                ].map((feature) => (
                                    <div key={feature} className="flex items-center gap-2 text-[11px] font-semibold text-zinc-300">
                                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-purple-400">
                                            <Icon name="check" size={9} />
                                        </span>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={addToCart}
                                    className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-bold text-white transition hover:bg-white/[0.08]"
                                >
                                    <Icon name="cart" size={13} /> Add to Cart
                                </button>
                                <button
                                    type="button"
                                    onClick={openWhatsAppOrder}
                                    className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-xs font-black text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
                                >
                                    <Icon name="whatsapp" size={13} /> Buy Now
                                </button>
                            </div>
                            {cartCount > 0 && (
                                <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                    {cartCount} item(s) in cart
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* SEO FOOTER */}
                <div className="mt-12 border-t border-white/[0.06] pt-6">
                    <p className="text-sm leading-7 text-zinc-400 max-w-4xl mb-4">
                        <span className="font-bold text-white">The DropsKenya Ultimate 100 SFX Pack</span> is East Africa's premier royalty-free sound effects library, professionally mastered and optimized for DJs, video editors, podcasters, content creators, and multimedia producers across Kenya, Uganda, Tanzania, and Rwanda. This comprehensive digital audio pack delivers 100+ high-quality, studio-grade sound effects in 320kbps MP3 format, ensuring crystal-clear audio reproduction for all your creative projects.
                    </p>
                    <p className="text-sm leading-7 text-zinc-400 max-w-4xl mb-4">
                        Our curated sound effects collection includes essential audio assets such as air horns, laser zaps, crowd cheers, vinyl scratches, heavy bass drops, cinematic whooshes, risers, impacts, transitions, vocal shouts, and much more. Every sound effect is meticulously processed, normalized, and ready for immediate use in DJ mixes, YouTube videos, TikTok reels, Instagram stories, live streams, podcasts, radio productions, corporate presentations, and commercial advertisements.
                    </p>
                    <p className="text-sm leading-7 text-zinc-400 max-w-4xl">
                        All sound effects in this pack come with <span className="font-semibold text-white">100% commercial usage rights</span> and full royalty-free licensing, meaning you can use them in monetized content, live broadcasts, client projects, and commercial productions without copyright concerns or additional fees. Instant digital delivery via WhatsApp or email ensures you receive your complete sound effects library within minutes of purchase, allowing you to start enhancing your audio productions immediately. Compatible with all major DJ software (Serato, Rekordbox, VirtualDJ), DAWs (FL Studio, Ableton, Logic Pro), and video editing platforms (Premiere Pro, Final Cut, DaVinci Resolve).
                    </p>
                </div>
            </div>

            {/* HIDDEN AUDIO ELEMENT WITH SECURITY ATTRIBUTES */}
            {currentTrack && (
                <audio
                    ref={audioRef}
                    src={currentTrack.src}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleEnded}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onContextMenu={(e) => e.preventDefault()} // Blocks right-click "Save Audio As..."
                    onDragStart={(e) => e.preventDefault()} // Blocks dragging the file to desktop
                    controlsList="nodownload" // Hides download button if controls were ever shown
                />
            )}

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
          border: 2px solid #1c1628;
        }
        input[type="range"]::-moz-range-thumb {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #a855f7;
          cursor: pointer;
          border: 2px solid #1c1628;
        }
      `}</style>
        </section>
    );
}