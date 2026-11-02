"use client";
import { Fragment, useState } from "react";

const PHONE = "254745736283";
const PHONE_DISPLAY = "+254 745 736 283";
const EMAIL = "hello@dropskenya.com";

const topics = ["Order support", "Custom quote", "Collaboration", "Something else"];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/drops_kenya?psln=eWJqcDZ4N2Z0MTI4" },
  { label: "TikTok", href: "https://tiktok.com/@dropskenya" },
  { label: "YouTube", href: "https://youtube.com/@dropskenya" },
  { label: "Facebook", href: "https://www.facebook.com/dropskenya" },
];

/* Deterministic waveform bars — on-brand for an audio studio */
const WAVE = Array.from({ length: 84 }, (_, i) =>
  Math.round(6 + Math.abs(Math.sin(i * 0.55)) * 22 + (i % 4) * 3)
);

const Icon = ({ name, size = 16 }: { name: string; size?: number }) => {
  if (name === "arrow")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h13M13 6l6 6-6 6" />
      </svg>
    );
  if (name === "whatsapp")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    );
  return null;
};

export default function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [topic, setTopic] = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim().length < 2) { setError("please enter your name.", ); return; }
    if (contact.trim().length < 5) { setError("please add an email or phone number."); return; }
    if (message.trim().length < 10) { setError("please describe your request (10+ characters)."); return; }
    setError("");
    const text =
      `Hello DropsKenya,\n\n` +
      `Name: ${name.trim()}\nContact: ${contact.trim()}\nTopic: ${topic}\n\n` +
      `${message.trim()}\n\n(Sent from dropskenya.com)`;
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
    setName(""); setContact(""); setTopic(topics[0]); setMessage("");
    setSent(true);
    setTimeout(() => setSent(false), 6000);
  };

  const labelClass = "mb-2 block font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500";
  const fieldClass =
    "w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400/70 focus:ring-2 focus:ring-orange-500/10";

  const specs = [
    { key: "WhatsApp", value: PHONE_DISPLAY, href: `https://wa.me/${PHONE}`, external: true },
    { key: "Email", value: EMAIL, href: `mailto:${EMAIL}`, copy: true },
    { key: "Studio", value: "Nairobi, Kenya" },
    { key: "Hours", value: "Mon – Sat · 08:00 – 20:00 EAT" },
    { key: "Turnaround", value: "24 – 48 hours" },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative bg-[#111114] py-20 sm:py-24 lg:py-28">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-orange-400">
          {"// contact — nairobi, ke"}
        </p>
        <h2 id="contact-title" className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Book the <span className="text-orange-400">studio.</span>
        </h2>
        <p className="mt-4 max-w-md text-sm leading-7 text-zinc-400">
          One team, one WhatsApp thread, zero ticket numbers. Tell us what you're working on and a producer replies personally — usually within the hour.
        </p>

        {/* WAVEFORM DIVIDER */}
        <div
          aria-hidden="true"
          className="mt-10 flex h-12 items-end gap-[3px] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
        >
          {WAVE.map((h, i) => (
            <span
              key={i}
              className={`w-[3px] rounded-sm ${
                i % 9 === 4 ? "bg-orange-400/70" : i % 9 === 7 ? "bg-purple-400/60" : "bg-white/10"
              }`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>

        {/* TWO COLUMNS WITH A REAL DIVIDER */}
        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT — SPEC SHEET */}
          <div>
            <dl>
              {specs.map((row) => (
                <div
                  key={row.key}
                  className="flex items-baseline gap-4 border-b border-dashed border-white/10 py-3.5 first:border-t"
                >
                  <dt className="w-24 shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                    {row.key}
                  </dt>
                  <dd className="flex min-w-0 flex-1 items-baseline justify-between gap-3">
                    {row.href ? (
                      <a
                        href={row.href}
                        target={row.external ? "_blank" : undefined}
                        rel={row.external ? "noopener noreferrer" : undefined}
                        className="truncate text-sm font-semibold text-zinc-200 transition hover:text-orange-300"
                      >
                        {row.value}
                      </a>
                    ) : (
                      <span className="truncate text-sm font-medium text-zinc-300">{row.value}</span>
                    )}
                    {row.copy && (
                      <button
                        type="button"
                        onClick={copyEmail}
                        className="shrink-0 font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 transition hover:text-orange-300"
                      >
                        {copied ? "[copied]" : "[copy]"}
                      </button>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <a
              href={`https://wa.me/${PHONE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2.5 rounded-lg bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/25 transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
            >
              <Icon name="whatsapp" size={17} />
              Chat on WhatsApp
            </a>

            <div className="mt-7 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-xs font-semibold text-zinc-500">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-600">elsewhere:</span>
              {socials.map((s, i) => (
                <Fragment key={s.label}>
                  {i > 0 && <span className="text-zinc-700">/</span>}
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                    {s.label}
                  </a>
                </Fragment>
              ))}
            </div>
          </div>

          {/* RIGHT — THE BRIEF */}
          <div className="lg:border-l lg:border-white/[0.08] lg:pl-16">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-500">{"// send a brief"}</p>
            <h3 className="mt-3 text-xl font-bold text-white">What are we making?</h3>

            <form onSubmit={handleSubmit} noValidate className="mt-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className={labelClass}>Name *</label>
                  <input
                    id="c-name"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setError(""); }}
                    placeholder="DJ Alex"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="c-contact" className={labelClass}>Email / phone *</label>
                  <input
                    id="c-contact"
                    type="text"
                    value={contact}
                    onChange={(e) => { setContact(e.target.value); setError(""); }}
                    placeholder="you@example.com"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-5">
                <span className={labelClass}>Topic</span>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setTopic(t)}
                      className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
                        topic === t
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <label htmlFor="c-msg" className={labelClass}>The brief *</label>
                <textarea
                  id="c-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => { setMessage(e.target.value); setError(""); }}
                  placeholder="A radio-style drop for my weekend show, plus a quote for a logo…"
                  className={`${fieldClass} resize-none leading-6`}
                />
              </div>

              {error && <p className="mt-4 font-mono text-[11px] text-red-400">error: {error}</p>}
              {sent && <p className="mt-4 font-mono text-[11px] text-green-400">ok: WhatsApp opened with your brief.</p>}

              <button
                type="submit"
                className="group mt-7 inline-flex items-center gap-2.5 rounded-lg bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-orange-400"
              >
                Send the brief
                <span className="transition group-hover:translate-x-1">
                  <Icon name="arrow" size={15} />
                </span>
              </button>
              <p className="mt-3 font-mono text-[13px] leading-5 text-zinc-600">
                Let's Go!
              </p>
            </form>
          </div>
        </div>

        {/* SEO FOOTNOTE */}
        <p className="mt-14 border-t border-white/[0.07] pt-6 text-sm leading-7 text-zinc-500 max-w-3xl">
          Contact DropsKenya for custom DJ drops, voice tags, radio imaging, logo design, lower thirds and premium sound effects in Kenya and across East Africa. Our Nairobi-based production team supports DJs, radio presenters, event organisers, promoters and businesses with fast turnaround, transparent pricing and full commercial usage rights.
        </p>
      </div>
    </section>
  );
}