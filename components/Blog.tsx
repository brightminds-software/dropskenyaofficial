"use client";
import { useState, useMemo, useEffect, ReactNode } from "react";

// Reusable Icon Component (Moved to top so it can be used inside blogPosts)
const Icon = ({ name, size = 20, strokeWidth = 1.8 }: { name: string; size?: number; strokeWidth?: number }) => {
    const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
    if (name === "arrow") return <svg {...common}><path d="M5 12h13M13 6l6 6-6 6" /></svg>;
    if (name === "close") return <svg {...common}><path d="M6 6l12 12M18 6 6 18" /></svg>;
    if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
    if (name === "calendar") return <svg {...common}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>;
    if (name === "grid") return <svg {...common}><rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /></svg>;
    return null;
};

type BlogPost = {
    id: string;
    title: string;
    excerpt: string;
    content: (string | ReactNode)[]; // Updated to allow React nodes for custom CTAs
    category: string;
    image: string;
    date: string;
    readTime: string;
    author: string;
};

const blogPosts: BlogPost[] = [
    {
        id: "blog-dj-drops-standout",
        title: "How to Make Your DJ Brand Stand Out with Professional DJ Drops",
        excerpt: "Discover why professional DJ drops and custom voice tags are the secret weapon for top DJs in East Africa. Learn the different styles, how to order, and what makes a tag unforgettable.",
        content: [
            "In the highly competitive music industry across Kenya, Uganda, Tanzania, and Rwanda, talent alone is no longer enough. Thousands of DJs upload mixes to SoundCloud, YouTube, and Mixcloud every week. The difference between a DJ who gets booked for premium gigs and one who struggles to get noticed often comes down to one thing: audio branding. At the heart of this branding are professional DJ drops and custom voice tags.",
            "A DJ drop is a short, pre-recorded audio clip that features your DJ name, a catchy phrase, or a sound effect. It acts as your sonic signature. When a listener hears a high-quality drop saying 'You are now listening to the one and only DJ Alex,' it instantly elevates the perceived value of your mix. It tells the audience that you take your craft seriously and have invested in your professional identity.",
            "There are several styles of DJ drops you can use. The 'Intro Drop' sets the tone at the beginning of a mix. 'Hype Drops' are used during transitions or right before a beat drops to build energy. 'Outro Drops' ensure your name is the last thing the listener hears, encouraging them to follow you. A professional voice tag, on the other hand, is a subtle watermark placed periodically throughout the mix to prevent theft and reinforce your brand.",
            "What makes a voice tag memorable? First, the voice quality. A professional studio recording with proper EQ, compression, and reverb will cut through the music clearly without sounding muddy. Second, the script. It should be short, punchy, and easy to remember. Finally, the sound design. Pairing the voice with a unique sound effect or musical sting creates a psychological anchor in the listener's mind.",
            "Ordering a professional DJ drop in Kenya has never been easier. Services like DropsKenya offer custom recordings tailored to your specific genre, whether you need a deep, commanding voice for Afrobeat or a high-energy hype voice for EDM. By investing in a professional drop, you are not just buying an audio file; you are buying credibility, recognition, and a stronger connection with your audience."
        ],
        category: "Branding",
        image: "/images/blogs/Make Your DJ Brand Stand.jpg",
        date: "Oct 24, 2026",
        readTime: "6 min read",
        author: "DropsKenya Team",
    },
    // --- NEW POST ADDED AT POSITION 2 ---
    {
        id: "blog-importance-of-sfx",
        title: "The Importance of Sound Effects (SFX) in Music Production",
        excerpt: "Discover how high-quality sound effects can transform your DJ sets, mixes, and video content. Learn why a professional SFX pack is a game-changer.",
        content: [
            "In the world of music production, DJing, and content creation, the difference between an amateur mix and a professional, radio-ready track often comes down to the details. One of the most powerful, yet frequently overlooked, tools in a creator's arsenal is the strategic use of Sound Effects (SFX).",
            "Sound effects are not just filler; they are psychological triggers. A well-placed riser builds anticipation before a beat drop. A crisp impact emphasizes a transition. A unique vocal chop or atmospheric texture adds depth and character to an otherwise flat mix. For DJs, SFX are the secret weapon that keeps the crowd engaged, signaling changes in energy and guiding the audience through the musical journey.",
            "However, not all sound effects are created equal. Using low-quality, overused, or poorly mixed SFX can instantly degrade the perceived quality of your work. That's why investing in a professionally curated, high-quality SFX pack is crucial. Premium sound effects are meticulously recorded, processed, and normalized to sit perfectly in a mix without clashing with your music.",
            "Whether you are producing Afrobeat, Amapiano, EDM, or Hip-Hop, having a reliable library of impacts, sweeps, horns, and vocal shouts at your fingertips allows for spontaneous creativity. You no longer have to spend hours searching for the right sound; you can focus on what you do best: performing and creating.",
            <div key="sfx-cta" className="mt-6 p-5 rounded-2xl border border-purple-500/20 bg-purple-500/5">
                <p className="text-base sm:text-lg leading-8 text-zinc-300 font-light mb-4">
                    Ready to elevate your sound? Don't settle for generic, low-quality audio. Give your mixes the professional edge they deserve with our meticulously crafted library.
                </p>
                <a 
                    href="#sound-effects" 
                    onClick={() => {
                        // Close modal and let the browser handle the scroll to #sound-effects
                        const event = new CustomEvent('closeBlogModal');
                        window.dispatchEvent(event);
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-orange-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-purple-900/20 transition hover:-translate-y-0.5 hover:from-purple-400 hover:to-orange-400"
                >
                    Browse & Buy Our Premium SFX Pack <Icon name="arrow" size={16} />
                </a>
            </div>
        ],
        category: "Production Tips",
        image: "/images/blogs/Dj Sound Effects.jpg",
        date: "Nov 02, 2026",
        readTime: "4 min read",
        author: "DropsKenya Team",
    },
    // ------------------------------------
    {
        id: "blog-ai-vs-human-voice",
        title: "AI vs Human Voiceovers: Which Is Best for Your DJ Drops and Adverts?",
        excerpt: "AI voice generators are everywhere, but can they replace a human? We compare cost, emotion, pronunciation, and customization to help you decide what's best for your brand.",
        content: [
            "The rise of Artificial Intelligence has transformed many industries, and voiceover production is no exception. Today, anyone can type a script into an AI tool and generate a voiceover in seconds. For DJs, radio presenters, and advertisers in Kenya, this raises an important question: Should you use an AI voiceover for your DJ drops and adverts, or stick with a professional human voice artist?",
            "Let's look at the advantages of AI. The biggest draw is cost and speed. AI voiceovers are incredibly cheap and can be generated instantly. If you need a quick, temporary tag for a personal project, AI can be a useful tool. However, when it comes to building a professional brand that people will pay to listen to, AI falls short in several critical areas.",
            "The first major limitation of AI is emotion and nuance. A human voice artist understands context, pacing, and energy. They know how to emphasize the right word in your DJ name to make it hit harder. AI voices often sound flat, robotic, or suffer from the 'uncanny valley' effect, where they sound almost human but slightly off, which can make listeners uncomfortable.",
            "Pronunciation and localization are another huge factor, especially in East Africa. AI tools often struggle with local names, slang (like Sheng), Swahili phrasing, and regional accents. A professional Kenyan voice artist will naturally pronounce your name correctly and deliver the script with the cultural authenticity that resonates with your local audience. An AI might butcher the pronunciation, making your brand look unprofessional.",
            "Ultimately, while AI is a fascinating technology, it cannot replace the soul, creativity, and cultural connection of a human voice. For your official DJ drops, radio adverts, and brand imaging, investing in a professional human voiceover is an investment in the credibility and emotional impact of your brand. It is the difference between sounding like a hobbyist and sounding like a star."
        ],
        category: "Industry Insights",
        image: "/images/blogs/AI vs Human Voiceovers.jpg",
        date: "Oct 18, 2026",
        readTime: "5 min read",
        author: "DropsKenya Team",
    },
    {
        id: "blog-create-pro-dj-drop",
        title: "How to Create a Professional DJ Drop: From Script to Final Audio",
        excerpt: "A step-by-step tutorial on crafting the perfect DJ drop. Learn about scriptwriting, voice selection, sound effects, mixing techniques, and exporting for maximum impact.",
        content: [
            "Creating a professional DJ drop is both an art and a science. Whether you are recording it yourself or hiring a professional service like DropsKenya, understanding the process will help you get the best possible result for your brand. Here is a comprehensive guide from the initial script to the final exported audio file.",
            "Step 1: The Script. Keep it short and memorable. Your DJ name should be the focal point. Avoid long, complicated sentences. Phrases like 'DJ Alex on the mix,' 'You're locked in with DJ Alex,' or 'The one and only' work best. Write down a few variations and say them out loud to see which flows naturally.",
            "Step 2: Voice Selection and Recording. If you are recording yourself, use a decent USB microphone in a quiet, treated room (a closet full of clothes works great for reducing echo). Speak clearly and with energy. If you are hiring a voice artist, choose a voice that matches your genre—a deep voice for house music, an energetic voice for hip-hop.",
            "Step 3: Sound Effects and Music Bed. A voice alone can sound dry. Layer your vocal over a subtle sound effect, a riser, or a short musical sting. Ensure the background element doesn't overpower the voice. The voice must remain the star of the show. Popular choices include impacts, sweeps, and atmospheric pads.",
            "Step 4: Mixing and Processing. This is where the magic happens. Apply EQ to the voice to remove muddy low frequencies and boost the crisp high frequencies for clarity. Use compression to even out the volume, making the drop sound punchy and consistent. Add a touch of reverb or delay (echo) to give it space and depth, making it sound like it belongs in a large club.",
            "Step 5: Exporting. Always export your final drop in a high-quality format, such as WAV or 320kbps MP3. Ensure the volume is normalized so it matches the loudness of the tracks you will be mixing it with. A well-crafted drop will seamlessly blend into your set, elevating the entire listening experience."
        ],
        category: "Tutorials",
        image: "/images/blogs/Professional DJ Drop.jpg",
        date: "Oct 10, 2026",
        readTime: "7 min read",
        author: "DropsKenya Team",
    },
    {
        id: "blog-dj-branding-east-africa",
        title: "How DJs in Kenya Can Build a Recognisable Brand and Get More Bookings",
        excerpt: "Talent gets you in the room, but branding gets you paid. Learn how to use voice tags, social media, logos, and networking to build a powerful DJ brand in East Africa.",
        content: [
            "The DJ scene in East Africa is booming. From Nairobi's vibrant nightlife to the beach clubs of Mombasa and the festivals of Kampala, there are more opportunities than ever. However, with more DJs entering the market, standing out requires more than just knowing how to beatmatch. You need a recognizable brand that promoters and fans trust.",
            "Your brand is the sum of everything people experience when they interact with you. It starts with your audio identity. Consistent, high-quality DJ drops and voice tags ensure that every time someone hears your mix, they know exactly who it is. This audio consistency builds familiarity, and familiarity builds trust. When a promoter hears your professional drop, they subconsciously associate you with high production values.",
            "Visual branding is equally important. Invest in a professional logo that looks good on a flyer, a social media profile, and a DJ booth backdrop. Your social media content should reflect your brand's personality. Are you the high-energy party starter, or the sophisticated lounge curator? Your posts, stories, and reels should consistently communicate this vibe.",
            "Networking remains the backbone of the East African music industry. Attend industry events, connect with other DJs, producers, and event organizers. But when you network, ensure your digital presence is polished. When someone asks for a link to your mixes, send them a professionally branded SoundCloud or YouTube link with custom intros and outros, not a raw, unbranded file.",
            "Finally, make it easy for people to book you. Have a clear, professional booking link in your bio. Include a short, well-written bio, links to your best mixes, and testimonials from past events. By combining professional audio branding, strong visuals, and strategic networking, you will transition from being just another DJ to a sought-after brand that commands higher booking fees."
        ],
        category: "Marketing",
        image: "/images/blogs/Recognisable Brand.jpg",
        date: "Oct 05, 2026",
        readTime: "6 min read",
        author: "DropsKenya Team",
    },
    {
        id: "blog-event-promotion-kenya",
        title: "How to Promote an Event in Kenya Using DJ Drops, Posters and Social Media",
        excerpt: "A comprehensive guide for event organizers and promoters on how to combine audio adverts, visual design, and digital campaigns to sell out your next music event.",
        content: [
            "Promoting a music event in Kenya requires a multi-channel approach. Relying solely on posters or just posting on Instagram is no longer enough to guarantee a full house. To create genuine hype and drive ticket sales, you need to integrate audio, visual, and digital strategies into a cohesive campaign.",
            "Audio promotion is often overlooked but incredibly effective. Create a custom 'Event Drop' or audio advert featuring the event name, date, and lineup over a high-energy beat. This audio clip can be used in several ways: play it on local radio stations, use it as the audio for your TikTok and Instagram Reels, and send it to DJs to play in their sets and on their WhatsApp statuses. Audio creates an emotional connection that static images cannot.",
            "Visuals are your first impression. Invest in a high-quality, professional poster that clearly displays the essential information: Who, What, Where, When, and How to buy tickets. Ensure the design aligns with the vibe of the event. A cluttered, poorly designed poster will make potential attendees question the quality of the event itself.",
            "Social media campaigns need a timeline. Start teasing the event 4-6 weeks out. Release the first poster, followed by artist announcements, and finally, the custom audio drops. Use countdown stickers on Instagram Stories, run targeted Facebook ads focusing on the specific location and interests of your target audience, and encourage user-generated content by creating a unique event hashtag.",
            "Finally, leverage partnerships. Collaborate with local influencers, radio presenters, and popular DJs to share your event content. Provide them with your custom audio drops and visuals so they can promote the event to their followers authentically. By combining professional audio branding, striking visuals, and a strategic digital rollout, you will maximize your reach and sell out your event."
        ],
        category: "Event Promotion",
        image: "/images/blogs/Promote an Event in Kenya.jpg",
        date: "Sep 28, 2026",
        readTime: "5 min read",
        author: "DropsKenya Team",
    },
    {
        id: "blog-audio-branding-business",
        title: "What Is Audio Branding, and Why Does Every Serious DJ or Business Need It?",
        excerpt: "Sonic identity is the next frontier of marketing. Learn what audio branding is, how it differs from a simple DJ drop, and how to use it to build a powerful brand.",
        content: [
            "When you think of major global brands, you probably picture their logos. But what if I play a sound? The Netflix 'Ta-dum,' the McDonald's 'Ba da ba ba ba,' or the Intel chime. Instantly, you know exactly which brand is being represented. This is the power of audio branding, also known as sonic identity, and it is a crucial tool for both businesses and serious DJs.",
            "Audio branding is the strategic use of sound to represent a brand's identity. It goes beyond just having a catchy jingle. It encompasses the music used in your adverts, the sound effects in your apps or videos, the tone of your voiceovers, and your signature audio logo. For a business, it creates a psychological association between a specific sound and the values of the company.",
            "For DJs, audio branding is the foundation of your career. Your DJ drops, your intro music, and your voice tags form your sonic identity. When a fan hears your specific drop, they should immediately feel the energy and style associated with your brand. It differentiates you from the thousands of other DJs playing the same tracks.",
            "The difference between a standard DJ drop and a business audio logo is primarily in application, but the principle is the same. A business audio logo is a short, distinctive sound used at the end of TV commercials or at the start of podcasts. A DJ drop serves the same purpose but is designed to be mixed into music. Both require professional production to sound authoritative and memorable.",
            "Implementing audio branding doesn't have to be expensive. Start by defining the 'personality' of your brand. Is it energetic and bold, or smooth and sophisticated? Choose sounds and voices that reflect this personality. Consistency is key. Use the same audio elements across all your platforms—your mixes, your social media videos, your website, and your live performances. Over time, this consistency will build a powerful, recognizable brand that audiences trust and love."
        ],
        category: "Branding",
        image: "/images/blogs/Audio Branding.jpg",
        date: "Sep 20, 2026",
        readTime: "6 min read",
        author: "DropsKenya Team",
    },
    {
        id: "blog-free-dj-tools-kenya",
        title: "Best Free Tools for Beginner DJs in Kenya: Music Editing, Recording and Mixing",
        excerpt: "Starting your DJ journey doesn't have to break the bank. We review the best free software and tools available for beginner DJs in East Africa to practice, record, and perform.",
        content: [
            "The barrier to entry for DJing has never been lower. You no longer need to spend hundreds of thousands of shillings on Pioneer CDJs and a massive mixer to start learning the craft. With a laptop, a pair of headphones, and the right free software, you can begin your journey to becoming a professional DJ right here in Kenya.",
            "For music editing and preparing your tracks, Audacity is an essential, completely free tool. It allows you to trim intros and outros, normalize volume levels, and convert file formats. While it is not a DJ software, it is crucial for organizing your music library and ensuring all your tracks are at a consistent volume before you load them into your DJ program.",
            "When it comes to actual DJ mixing, VirtualDJ offers a robust free version for home use. It is incredibly beginner-friendly, featuring visual waveforms, automatic beatmatching, and a vast library of built-in effects. Another excellent option is Mixxx, which is completely free and open-source. Mixxx supports a wide range of hardware controllers and offers professional features like key detection and recording.",
            "For recording your mixes to share on SoundCloud or YouTube, OBS Studio is the industry standard for free recording and streaming software. While primarily used by gamers, OBS is perfect for capturing your screen and audio output simultaneously, allowing you to create visualizer videos for your mixes without paying for expensive video editing software.",
            "Remember, while free tools are fantastic for learning and practicing, they do have limitations. VirtualDJ's free version, for instance, restricts you to using a mouse and keyboard; to use a physical controller, you will eventually need to upgrade. However, mastering these free tools will give you the foundational skills you need. Once you are ready to invest in your career, upgrading to professional software like Serato or Rekordbox, and investing in professional DJ drops from DropsKenya, will be the natural next step."
        ],
        category: "Resources",
        image: "/images/blogs/Best Free Tools.jpg",
        date: "Sep 15, 2026",
        readTime: "5 min read",
        author: "DropsKenya Team",
    },
    {
        id: "blog-swahili-dj-scripts",
        title: "DJ Drop Scripts, Swahili Voice Tags and Event Promo Ideas for East African DJs",
        excerpt: "Original script templates, Swahili and English variations, and event announcement ideas tailored specifically for DJs and MCs in Kenya, Tanzania, Uganda, and Rwanda.",
        content: [
            "The East African music scene is incredibly diverse, blending global genres with local languages and cultures. For DJs and MCs operating in Kenya, Tanzania, Uganda, and Rwanda, incorporating local languages like Swahili and Luganda into your drops and scripts is a powerful way to connect deeply with your audience.",
            "Here are some original DJ drop script templates you can use. For a high-energy intro, try: 'Hapa ni [DJ Name], tunawaka leo!' (This is [DJ Name], we are burning it up today!). For a smooth lounge set: 'Umeingia kwenye dunia ya [DJ Name]. Relax and enjoy.' (You have entered the world of [DJ Name]. Relax and enjoy.). These bilingual tags appeal to a broader demographic and add a unique local flavor to your mixes.",
            "For MCs hosting live events, having a repertoire of ready-made scripts is essential. Here is a template for hyping up a crowd: 'Mambo vipi Nairobi? Tupo live hapa [Venue Name]! Mkisikia beat hii, nataka niwaone mkijump!' (What's up Nairobi? We are live at [Venue Name]! When you hear this beat, I want to see you jump!). Delivering this with high energy over a custom sound effect will instantly engage the crowd.",
            "When creating event promo ideas, think about the platforms your audience uses most. In East Africa, WhatsApp Status is a massive promotional tool. Create a 15-second audio-visual clip featuring your event drop, the flyer, and a clear call to action ('Link in bio to buy tickets'). Encourage your friends and fellow DJs to post it on their statuses.",
            "Finally, always tailor your branding to the specific country you are targeting. A drop that works perfectly in Nairobi might need a slight adjustment in phrasing or accent for Dar es Salaam or Kampala. Working with a local audio production team like DropsKenya ensures that your Swahili, English, and local slang are pronounced perfectly, giving your brand authentic regional appeal."
        ],
        category: "Scripts & Ideas",
        image: "/images/blogs/DJ Drop Scripts.jpg",
        date: "Sep 08, 2026",
        readTime: "6 min read",
        author: "DropsKenya Team",
    },
];

// Single Blog Card
const BlogCard = ({ post, onRead }: { post: BlogPost; onRead: (p: BlogPost) => void }) => (
    <article className="group relative flex flex-col overflow-hidden rounded-[1.6rem] border border-white/[0.07] bg-[#1d132b] transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/25 hover:shadow-2xl hover:shadow-black/40 flex-shrink-0">
        <div className="relative aspect-[16/10] overflow-hidden">
            <img src={post.image} alt={post.title} loading="lazy" className="h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d132b] via-transparent to-transparent" />
            <div className="absolute top-4 left-4">
                <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    {post.category}
                </span>
            </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
            <div className="mb-3 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                <span className="flex items-center gap-1.5"><Icon name="calendar" size={12} /> {post.date}</span>
                <span className="flex items-center gap-1.5"><Icon name="clock" size={12} /> {post.readTime}</span>
            </div>
            <h3 className="mb-3 text-lg font-black tracking-tight text-white transition group-hover:text-purple-300 line-clamp-2">
                {post.title}
            </h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-zinc-400 line-clamp-3">
                {post.excerpt}
            </p>
            <button
                type="button"
                onClick={() => onRead(post)}
                className="mt-auto flex items-center gap-2 text-xs font-bold text-white transition hover:text-purple-400"
            >
                Read Article <Icon name="arrow" size={14} />
            </button>
        </div>
    </article>
);

export default function Blog() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
    const [showAll, setShowAll] = useState(false);
    const [isPaused, setIsPaused] = useState(false);

    const categories = useMemo(() => ["All", ...Array.from(new Set(blogPosts.map((p) => p.category)))], []);
    const filteredPosts = useMemo(() => activeCategory === "All" ? blogPosts : blogPosts.filter((p) => p.category === activeCategory), [activeCategory]);

    // Avoid duplicate cards when a category has 2 or fewer posts
    const shouldForceGrid = filteredPosts.length <= 2;
    const effectiveShowAll = showAll || shouldForceGrid;

    const carouselItems = useMemo(() => {
        if (shouldForceGrid) return filteredPosts;
        return [...filteredPosts, ...filteredPosts];
    }, [filteredPosts, shouldForceGrid]);

    useEffect(() => {
        document.body.style.overflow = selectedPost ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [selectedPost]);

    // Listen for custom event to close modal when CTA is clicked
    useEffect(() => {
        const handleClose = () => setSelectedPost(null);
        window.addEventListener('closeBlogModal', handleClose);
        return () => window.removeEventListener('closeBlogModal', handleClose);
    }, []);

    return (
        <>
            {/* DISTINCT VIOLET BACKGROUND — no overflow-hidden here so sticky works */}
            <section id="blog" aria-labelledby="blog-title" className="relative bg-[#150d20] py-20 sm:py-24 lg:py-28">
                {/* Decorative glows live in their own clipped wrapper */}
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-600/[0.12] blur-[120px]" />
                    <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-fuchsia-500/[0.08] blur-[120px]" />
                    <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* HEADER */}
                    <header className="mb-8 lg:mb-10">
                        <div className="max-w-3xl">
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-400/25 bg-purple-500/[0.1] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-purple-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_10px_rgba(251,146,60,.8)]" />
                                DropsKenya Journal
                            </div>
                            <h2 id="blog-title" className="max-w-3xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                                Insights, tips, and{" "}
                                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
                                    industry secrets.
                                </span>
                            </h2>
                            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
                                Explore our latest articles on audio branding, DJ techniques, and the business of sound. Level up your craft with expert advice.
                            </p>
                        </div>
                    </header>

                    {/* FLOATING STICKY FILTER BAR — stays pinned while scrolling */}
                    <div className="sticky top-[65px] sm:top-[65px] z-30 mb-8 rounded-2xl border border-white/10 bg-[#1b1129]/90 px-3 py-3 shadow-xl shadow-black/30 backdrop-blur-xl">
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="flex flex-1 min-w-0 gap-2 overflow-x-auto scrollbar-none">
                                {categories.map((category) => {
                                    const active = category === activeCategory;
                                    return (
                                        <button
                                            key={category}
                                            type="button"
                                            onClick={() => { setActiveCategory(category); setShowAll(false); }}
                                            className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-bold transition-all ${active ? "border-purple-400/40 bg-purple-500 text-white shadow-lg shadow-purple-900/20" : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"}`}
                                        >
                                            {category}
                                        </button>
                                    );
                                })}
                            </div>
                            {!shouldForceGrid && (
                                <button
                                    type="button"
                                    onClick={() => setShowAll(!showAll)}
                                    className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold transition-all ${showAll
                                            ? "border-orange-400/40 bg-orange-500 text-white shadow-lg shadow-orange-900/20"
                                            : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                                        }`}
                                >
                                    <Icon name={showAll ? "grid" : "arrow"} size={14} />
                                    {showAll ? "Show Carousel" : "View All"}
                                </button>
                            )}
                        </div>
                    </div>

                    {/* CAROUSEL VIEW */}
                    {!effectiveShowAll && (
                        <div className="mb-10 relative">
                            <div
                                className="relative overflow-hidden touch-pan-y"
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                                onTouchStart={() => setIsPaused(true)}
                                onTouchEnd={() => setIsPaused(false)}
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#150d20] to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#150d20] to-transparent z-10 pointer-events-none"></div>

                                <div className={`flex gap-5 w-max animate-marquee ${isPaused ? "paused" : ""}`}>
                                    {carouselItems.map((post, index) => (
                                        <div key={`${post.id}-${index}`} className="w-[85vw] sm:w-[360px] lg:w-[400px]">
                                            <BlogCard post={post} onRead={setSelectedPost} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* GRID VIEW */}
                    {effectiveShowAll && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
                            {filteredPosts.map((post) => (
                                <BlogCard key={post.id} post={post} onRead={setSelectedPost} />
                            ))}
                        </div>
                    )}

                    {/* SEO FOOTER */}
                    <div className="mt-20 border-t border-white/5 pt-10">
                        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">The DropsKenya Knowledge Hub</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed max-w-4xl">
                            Welcome to the DropsKenya blog. Here we share our expertise in audio production, sonic branding, and the music industry. Whether you are a DJ looking to refine your sound, a business owner exploring audio marketing, or a content creator wanting to improve your production value, our articles are designed to provide actionable insights and professional guidance.
                        </p>
                    </div>
                </div>
            </section>

            {/* ARTICLE READING MODAL */}
            {selectedPost && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-0 sm:p-4 backdrop-blur-xl animate-fade-in"
                    onMouseDown={(e) => { if (e.target === e.currentTarget) setSelectedPost(null); }}
                >
                    <div className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden bg-[#160f21] sm:rounded-[1.75rem] sm:border sm:border-white/10 sm:shadow-2xl sm:my-4 sm:h-[90vh]">
                        <div className="flex shrink-0 items-center justify-between border-b border-white/[0.07] bg-[#160f21]/90 px-5 py-4 backdrop-blur-md sm:px-7 z-10">
                            <div className="flex items-center gap-3">
                                <span className="rounded-full bg-purple-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-purple-400">
                                    {selectedPost.category}
                                </span>
                                <span className="hidden sm:flex items-center gap-1.5 text-[10px] font-semibold text-zinc-500">
                                    <Icon name="clock" size={12} /> {selectedPost.readTime}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedPost(null)}
                                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 transition hover:bg-white/10 hover:text-white"
                                aria-label="Close article"
                            >
                                <Icon name="close" size={17} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="relative w-full overflow-hidden bg-black">
                                <div className="mx-auto max-w-3xl">
                                    <img
                                        src={selectedPost.image}
                                        alt={selectedPost.title}
                                        className="w-full h-auto max-h-[320px] sm:max-h-[380px] object-cover"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#160f21] via-[#160f21]/30 to-transparent pointer-events-none" />
                            </div>

                            <div className="px-5 pb-10 sm:px-10 sm:pb-16 -mt-6 relative z-10">
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.1] mb-6">
                                    {selectedPost.title}
                                </h1>

                                <div className="flex flex-wrap items-center gap-4 mb-8 text-xs font-medium text-zinc-400">
                                    <span className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center text-[9px] font-bold text-white">DK</div>
                                        {selectedPost.author}
                                    </span>
                                    <span className="hidden sm:inline text-zinc-700">•</span>
                                    <span className="flex items-center gap-1.5"><Icon name="calendar" size={12} /> {selectedPost.date}</span>
                                </div>

                                <div className="space-y-6">
                                    {selectedPost.content.map((item, index) => (
                                        typeof item === 'string' ? (
                                            <p key={index} className="text-base sm:text-lg leading-8 text-zinc-300 font-light">
                                                {item}
                                            </p>
                                        ) : (
                                            <div key={index}>{item}</div>
                                        )
                                    ))}
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-sm font-bold text-white">Enjoyed this article?</p>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedPost(null)}
                                        className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/10 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-white/10"
                                    >
                                        Back to all articles <Icon name="arrow" size={14} />
                                    </button>
                                </div>
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
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animate-marquee {
          animation: marquee 60s linear infinite;
          will-change: transform;
        }
        .paused {
          animation-play-state: paused;
        }
      `}</style>
        </>
    );
}