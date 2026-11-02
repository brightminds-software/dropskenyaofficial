"use client";

const PHONE = "254745736283";
const PHONE_DISPLAY = "+254 745 736 283";
const EMAIL = "hello@dropskenya.com";

const serviceLinks = [
  { label: "DJ Drops & Voice Tags", href: "#dj-drops" },
  { label: "Ultimate SFX Pack", href: "#dj-drops" },
  { label: "Logo Design", href: "#logo-design" },
  { label: "Lower Thirds", href: "#lower-thirds" },
];

const studioLinks = [
  { label: "About the Studio", href: "#about" },
  { label: "Blog & Guides", href: "#blog" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: "instagram", label: "Instagram", href: "https://www.instagram.com/drops_kenya?psln=eWJqcDZ4N2Z0MTI4" },
  { icon: "tiktok", label: "TikTok", href: "https://tiktok.com/@dropskenya" },
  { icon: "youtube", label: "YouTube", href: "https://youtube.com/@dropskenya" },
  { icon: "facebook", label: "Facebook", href: "https://www.facebook.com/dropskenya" },
];

const Icon = ({ name, size = 16, strokeWidth = 1.8 }: { name: string; size?: number; strokeWidth?: number }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "mark") return <svg {...common} strokeWidth={2.4}><path d="M7 10v4M12 6v12M17 10v4" /></svg>;
  if (name === "arrow-up") return <svg {...common}><path d="M12 19V5M5 12l7-7 7 7" /></svg>;
  if (name === "mail") return <svg {...common}><rect width="18" height="14" x="3" y="5" rx="2" /><path d="m3 7 9 6 9-6" /></svg>;
  if (name === "pin") return <svg {...common}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
  if (name === "clock") return <svg {...common}><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>;
  if (name === "whatsapp")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    );
  if (name === "instagram") return <svg {...common}><rect width="18" height="18" x="3" y="3" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>;
  if (name === "youtube") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 12s0-3.85-.49-5.7a2.8 2.8 0 0 0-1.97-1.98C18.7 3.83 12 3.83 12 3.83s-6.7 0-8.54.49A2.8 2.8 0 0 0 1.49 6.3C1 8.15 1 12 1 12s0 3.85.49 5.7a2.8 2.8 0 0 0 1.97 1.98c1.84.49 8.54.49 8.54.49s6.7 0 8.54-.49a2.8 2.8 0 0 0 1.97-1.98C23 15.85 23 12 23 12Zm-13.25 3.02V8.98L15.5 12l-5.75 3.02Z" /></svg>;
  if (name === "tiktok") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.82A4.8 4.8 0 0 1 15.4 2h-3.2v12.93a2.9 2.9 0 1 1-2.9-2.9c.16 0 .32.01.47.04V8.77a6.2 6.2 0 1 0 5.83 6.16V8.6a8 8 0 0 0 4.8 1.56V6.94a4.8 4.8 0 0 1-3.8-1.12Z" /></svg>;
  if (name === "facebook") return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" /></svg>;
  return null;
};

export default function Footer() {
  // Year is always fetched live — never hard-coded
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#0c0c0f] pt-16 sm:pt-20">
      {/* Top hairline + glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        <div className="absolute -bottom-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-purple-600/[0.06] blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-10">
          {/* BRAND */}
          <div>
            <a href="#top" className="inline-flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 text-white shadow-lg shadow-purple-900/25">
                <Icon name="mark" size={17} />
              </span>
              <span className="text-lg font-black tracking-tight text-white">
                Drops<span className="bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">Kenya</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-6 text-zinc-400">
              Custom DJ drops, voice tags, radio imaging, logos and lower thirds — produced in Nairobi for creators across East Africa and beyond.
            </p>
            <div className="mt-5 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-zinc-400 transition hover:border-purple-400/30 hover:bg-purple-500/10 hover:text-white"
                >
                  <Icon name={s.icon} size={15} />
                </a>
              ))}
            </div>
            <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-600">
              M-Pesa · Bank transfer · PayPal on request
            </p>
          </div>

          {/* SERVICES + STUDIO — always side by side, even on small screens */}
          <div className="grid grid-cols-2 gap-6 sm:gap-10 lg:contents">
            <nav aria-label="Services">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Services</p>
              <ul className="mt-4 space-y-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm font-medium text-zinc-400 transition hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Studio">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Studio</p>
              <ul className="mt-4 space-y-2.5">
                {studioLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm font-medium text-zinc-400 transition hover:text-white">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* CONTACT */}
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-zinc-500">Get in touch</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`https://wa.me/${PHONE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm font-medium text-zinc-400 transition hover:text-white"
                >
                  <span className="text-[#25D366]"><Icon name="whatsapp" size={15} /></span>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-2.5 text-sm font-medium text-zinc-400 transition hover:text-white">
                  <span className="text-orange-400"><Icon name="mail" size={15} /></span>
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm font-medium text-zinc-400">
                <span className="text-purple-400"><Icon name="pin" size={15} /></span>
                Nairobi, Kenya
              </li>
              <li className="flex items-center gap-2.5 text-sm font-medium text-zinc-400">
                <span className="text-purple-400"><Icon name="clock" size={15} /></span>
                Mon – Sat · 8am – 8pm EAT
              </li>
            </ul>
          </div>
        </div>

        {/* GIANT WATERMARK — now sized to always fit */}
        <div
          aria-hidden="true"
          className="pointer-events-none mt-14 select-none overflow-hidden whitespace-nowrap text-center text-[clamp(36px,11.5vw,150px)] font-black leading-[0.85] tracking-[-0.05em] text-white/[0.03] translate-y-4 sm:translate-y-6"
        >
          DROPSKENYA
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-zinc-600">
            © {year} DropsKenya. All rights reserved.
          </p>
          <p className="text-xs text-zinc-600">
            Made with <span className="text-orange-400">♥</span> in Nairobi — serving East Africa & beyond.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 text-xs font-bold text-zinc-500 transition hover:text-white"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition group-hover:-translate-y-0.5 group-hover:border-white/30">
              <Icon name="arrow-up" size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}