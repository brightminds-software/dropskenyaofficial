"use client";
import { useMemo, useState } from "react";

type Faq = {
  id: string;
  category: string;
  question: string;
  answer: string;
  popular?: boolean;
};

const faqs: Faq[] = [
  {
    id: "faq-order-1",
    category: "Ordering",
    question: "How do I order a DJ drop or sound pack?",
    answer:
      "Browse the DJ Drops section, listen to the previews and press Buy on the voice you like. Fill in the text you want spoken, choose whether you want echo, and complete the order on WhatsApp. For the SFX pack, pressing Buy takes you straight to WhatsApp. Our team confirms your payment details and starts production immediately.",
  },
  {
    id: "faq-order-2",
    category: "Ordering",
    question: "What text should I provide for my drop?",
    answer:
      "Your DJ name, station name, show title or a short slogan works best — for example 'DJ Alex on the mix'. We ask for at least two words so the drop sounds natural. If your name has a special pronunciation, add a note in WhatsApp and the voice artist will follow it exactly.",
  },
  {
    id: "faq-order-3",
    category: "Ordering",
    question: "Can I preview the voices before ordering?",
    answer:
      "Yes. Every product card has a play button that streams a studio preview of that voice or pack, with a real progress bar you can click to seek. Open the Details modal for a larger player, full description and everything included before you decide.",
  },
  {
    id: "faq-pay-1",
    category: "Payments",
    question: "How do I pay for my order?",
    answer:
      "After submitting your order, our team sends you secure M-Pesa payment instructions on WhatsApp. Once payment is confirmed, your order enters the production queue. Clients outside Kenya can arrange alternative payment methods with the team on the same chat.",
  },
  {
    id: "faq-pay-2",
    category: "Payments",
    question: "Are there any hidden charges?",
    answer:
      "No. The price displayed on each product is the price you pay, including recording, processing and delivery. If you request something outside the standard package — such as a fully custom script or extra revisions — we quote it upfront on WhatsApp before any work begins.",
  },
  {
    id: "faq-pay-3",
    category: "Payments",
    question: "Do I pay before or after delivery?",
    answer:
      "Payment is made before final delivery. This confirms your slot in the production queue and protects both parties. You always hear the exact voice preview before paying, so you know precisely what your drop will sound like.",
  },
  {
    id: "faq-del-1",
    category: "Delivery",
    question: "How fast will I receive my drop?",
    answer:
      "Custom voice drops are delivered within 48 hours — most orders are completed the same day. The Ultimate SFX Pack is a ready-made collection, so it is delivered instantly after payment confirmation.",
    popular: true,
  },
  {
    id: "faq-del-2",
    category: "Delivery",
    question: "How will I receive my files?",
    answer:
      "Files are sent directly to your WhatsApp or email as high-quality MP3s, ready to drop into your mixes, radio software or video editor. Sound effect packs arrive as an organised ZIP folder that works with Serato, Rekordbox, VirtualDJ and all major DAWs.",
  },
  {
    id: "faq-del-3",
    category: "Delivery",
    question: "What if there is a mistake in my delivered drop?",
    answer:
      "If the mistake is on our side — wrong pronunciation, wrong text, or a processing issue — we re-record and fix it completely free of charge, as a priority job. If you simply change your mind about the wording after recording, a small revision fee may apply and will always be quoted before we start.",
  },
  {
    id: "faq-cus-1",
    category: "Customization",
    question: "What does the echo effect do?",
    answer:
      "Echo adds a controlled, fading repetition after your main vocal, giving the drop more depth, space and club energy. It is highly recommended for intros, transitions and peak-time drops, but completely optional — clean dry versions work better for radio and corporate imaging.",
  },
  {
    id: "faq-cus-2",
    category: "Customization",
    question: "Can I order a drop in Swahili or Sheng?",
    answer:
      "Absolutely. Our voice artists record in English, Swahili and mixed Sheng delivery. Simply write your text exactly as you want it spoken when placing your order, and mention the language or accent you prefer in the WhatsApp chat.",
  },
  {
    id: "faq-cus-3",
    category: "Customization",
    question: "Do I own the rights to use my drop commercially?",
    answer:
      "Yes. Once your order is paid, you receive full usage rights for your custom drop — mixes, radio, club events, podcasts, social media and paid advertisements. The performance remains by our licensed voice artists, and the recording is made exclusively for your brand.",
  },
];

const Icon = ({ name, size = 20, strokeWidth = 1.8 }: { name: string; size?: number; strokeWidth?: number }) => {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
  if (name === "plus") return <svg {...common}><path d="M12 5v14M5 12h14" /></svg>;
  if (name === "whatsapp")
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    );
  return null;
};

export default function Faqs() {
  const [tab, setTab] = useState("All");
  const [open, setOpen] = useState<string | null>(faqs[0].id);

  const categories = useMemo(() => ["All", ...Array.from(new Set(faqs.map((f) => f.category)))], []);
  const list = useMemo(() => (tab === "All" ? faqs : faqs.filter((f) => f.category === tab)), [tab]);

  return (
    <section id="faqs" aria-labelledby="faqs-title" className="relative bg-[#101418] py-14 sm:py-20 lg:py-24">
      {/* Decorative glows in their own clipped wrapper */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-orange-500/[0.06] blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-purple-600/[0.07] blur-[120px]" />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-orange-500/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* HEADER — compact */}
        <header>
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-300">Support · FAQs</p>
          <h2 id="faqs-title" className="mt-3 text-[26px] font-black tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
            Questions we get{" "}
            <span className="bg-gradient-to-r from-orange-400 via-fuchsia-400 to-purple-400 bg-clip-text text-transparent">
              every single day.
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-[13px] leading-6 text-zinc-400 sm:text-sm">
            Straight answers about ordering, payment, delivery and customization — written by the production team, not a robot.
          </p>
          <p className="mt-2 text-[10px] font-medium text-zinc-600">Last updated October 2026</p>
        </header>

        {/* CATEGORY TABS */}
        <div className="-mx-4 mt-6 overflow-x-auto px-4 scrollbar-none sm:mx-0 sm:mt-8 sm:px-0">
          <div className="flex min-w-max gap-5 border-b border-white/[0.07] sm:gap-7">
            {categories.map((category) => {
              const active = category === tab;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => { setTab(category); setOpen(null); }}
                  className={`relative pb-2.5 text-[11px] font-bold transition-colors sm:text-xs ${
                    active ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {category}
                  <span
                    className={`absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-gradient-to-r from-orange-400 to-purple-400 transition-opacity ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ LIST — compact */}
        <div className="mt-1 divide-y divide-white/[0.06]">
          {list.map((faq, index) => {
            const isOpen = open === faq.id;
            return (
              <div key={faq.id}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-start gap-3 py-4 text-left sm:gap-4 sm:py-5"
                >
                  <span className="mt-0.5 hidden w-6 shrink-0 text-[9px] font-black tracking-[0.18em] text-white/25 tabular-nums sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-bold leading-5 text-white sm:text-base sm:leading-6">
                    {faq.question}
                    {faq.popular && (
                      <span className="ml-2 inline-block rounded-full border border-orange-400/20 bg-orange-500/10 px-2 py-0.5 align-middle text-[8px] font-black uppercase tracking-wider text-orange-300">
                        Most asked
                      </span>
                    )}
                  </span>
                  <span
                    className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:h-7 sm:w-7 ${
                      isOpen
                        ? "rotate-45 border-orange-400/40 bg-orange-500/15 text-orange-300"
                        : "border-white/10 bg-white/[0.03] text-zinc-500"
                    }`}
                  >
                    <Icon name="plus" size={12} />
                  </span>
                </button>

                {/* SMOOTH EXPAND / COLLAPSE */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-5 pr-2 text-[13px] leading-6 text-zinc-400 sm:pb-6 sm:pl-10 sm:pr-14 sm:text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM CTA BAND — compact */}
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 text-center sm:mt-12 sm:flex-row sm:items-center sm:gap-6 sm:p-6 sm:text-left">
          <div className="flex-1">
            <h3 className="text-lg font-black tracking-tight text-white sm:text-xl">Still stuck on something?</h3>
            <p className="mt-1.5 text-[13px] leading-5 text-zinc-400">
              Message us on WhatsApp—talk directly to producer in minutes. No automated waiting or ticket numbers.
            </p>
          </div>
          <a
            href="https://wa.me/254745736283"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-[13px] font-black text-white shadow-lg shadow-green-900/20 transition hover:-translate-y-0.5 hover:bg-[#20bd5a]"
          >
            <Icon name="whatsapp" size={15} />
            Chat with us
          </a>
        </div>

        {/* SEO FOOTNOTE — ORIGINAL SIZE RESTORED (text-[11px] leading-6, mt-10, pt-6) */}
        <p className="mt-10 border-t border-white/[0.06] pt-6 text-sm leading-7 text-zinc-500">
          DropsKenya is a professional audio branding studio serving DJs, radio presenters, event organisers and businesses across Kenya, Tanzania, Uganda and Rwanda. We specialise in custom DJ drops, voice tags, radio imaging and premium sound effect packs with fast turnaround and full commercial usage rights. If your question is not covered here, contact us on WhatsApp for a direct answer from our production team.
        </p>
      </div>
    </section>
  );
}