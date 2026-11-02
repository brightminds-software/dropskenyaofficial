"use client";

import { useState, useEffect, useRef } from "react";
import CartDrawer from "./CartDrawer"; // <-- Added Cart Drawer import

// ==========================================
// TYPES
// ==========================================

type DropdownItem = {
  name: string;
  href: string;
  description: string;
  number: string;
};

type NavLink = {
  name: string;
  href: string;
  dropdown?: DropdownItem[];
};

// ==========================================
// NAVIGATION DATA
// ==========================================

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  {
    name: "Services",
    href: "#services",
    dropdown: [
      {
        name: "DJ Drops & Voice Tags",
        href: "#dj-drops",
        description: "Custom voice tags and audio branding.",
        number: "01",
      },
      {
        name: "DJ Sound Effects, SFX",
        href: "#sound-effects",
        description: "Sound Effects to Elevate Your Mixes.",
        number: "02",
      },
      {
        name: "Logo Design",
        href: "#logo-design",
        description: "Creative visual brand identities.",
        number: "03",
      },
      {
        name: "Lower Thirds",
        href: "#lower-thirds",
        description: "Professional video motion graphics.",
        number: "04",
      },
    ],
  },
  { name: "Blog", href: "#blog" },
  { name: "FAQs", href: "#faqs" },
];

// ==========================================
// ICONS
// ==========================================

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg
      className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg
      className="h-3.5 w-3.5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <div className="relative flex h-5 w-5 items-center justify-center">
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`}
      />
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-white transition-all duration-200 ${open ? "opacity-0" : "opacity-100"}`}
      />
      <span
        className={`absolute h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`}
      />
    </div>
  );
}

// ==========================================
// NAVBAR COMPONENT
// ==========================================

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  
  // Cart State
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const navRef = useRef<HTMLElement>(null);

  // ==========================================
  // CART COUNT DETECTION
  // ==========================================
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const saved = localStorage.getItem("dropsKenyaCart");
        const cart = saved ? JSON.parse(saved) : [];
        setCartCount(Array.isArray(cart) ? cart.length : 0);
      } catch {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("cartUpdated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  // ==========================================
  // SCROLL DETECTION
  // ==========================================
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ==========================================
  // CLOSE MENUS WHEN CLICKING OUTSIDE
  // ==========================================
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setActiveDropdown(null);
        setMobileDropdownOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

  // ==========================================
  // ESCAPE KEY
  // ==========================================
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        setActiveDropdown(null);
        setMobileDropdownOpen(false);
        setCartDrawerOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ==========================================
  // CLOSE ALL MENUS
  // ==========================================
  const closeMenus = () => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileDropdownOpen(false);
  };

  // ==========================================
  // NAVIGATION WITH FIXED SCROLL OFFSET
  // ==========================================
  const navigateTo = (href: string) => {
    closeMenus();

    if (href === "/") {
      window.location.href = "/";
      return;
    }

    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        window.history.pushState(null, "", href);
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.hash = href;
      }
    }
  };

  // ==========================================
  // DESKTOP DROPDOWN TOGGLE
  // ==========================================
  const toggleDesktopDropdown = (name: string) => {
    setActiveDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-white/[0.08] bg-[#09070d]/95 shadow-md shadow-black/20 backdrop-blur-xl"
            : "bg-black/30 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto max-w-7xl px-3 sm:px-5 lg:px-8">
          {/* =================================
              MAIN NAVBAR
          ================================= */}
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              isScrolled ? "h-[54px] sm:h-[58px]" : "h-[62px] sm:h-[68px]"
            }`}
          >
            {/* LOGO */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo("/");
              }}
              className="group flex min-w-0 items-center gap-2"
              aria-label="DropsKenya home"
            >
              <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-lg shadow-md transition-transform group-hover:scale-105">
                <img
                  src="/images/logo.jpg"
                  alt="DropsKenya Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="block whitespace-nowrap text-[17px] font-extrabold leading-tight tracking-tight text-white sm:text-lg">
                  Drops<span className="text-purple-400">Kenya</span>
                </span>
                <span className="hidden text-[8px] font-semibold uppercase tracking-[0.13em] text-gray-400 sm:block">
                  Audio & Visual Branding
                </span>
              </div>
            </a>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.dropdown ? (
                    <button
                      type="button"
                      onClick={() => toggleDesktopDropdown(link.name)}
                      aria-expanded={activeDropdown === link.name}
                      aria-haspopup="true"
                      className={`flex items-center gap-1.5 rounded-md px-3 py-2 text-[13px] font-medium transition-colors ${
                        activeDropdown === link.name
                          ? "bg-white/[0.06] text-white"
                          : "text-gray-300 hover:bg-white/[0.05] hover:text-white"
                      }`}
                    >
                      {link.name}
                      <Chevron open={activeDropdown === link.name} />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(link.href);
                      }}
                      className="rounded-md px-3 py-2 text-[13px] font-medium text-gray-300 transition-colors hover:bg-white/[0.05] hover:text-white"
                    >
                      {link.name}
                    </a>
                  )}

                  {/* COMPACT PROFESSIONAL DROPDOWN */}
                  {link.dropdown && activeDropdown === link.name && (
                    <div className="absolute left-1/2 top-full z-50 mt-2 w-[270px] -translate-x-1/2 animate-dropdown">
                      <div className="overflow-hidden rounded-lg border border-white/[0.10] bg-[#111015] shadow-xl shadow-black/60">
                        <div className="border-b border-white/[0.07] px-3.5 py-2.5">
                          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-purple-400">
                            Our Services
                          </p>
                        </div>
                        <div className="p-1.5">
                          {link.dropdown.map((item) => (
                            <a
                              key={item.number}
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault();
                                navigateTo(item.href);
                              }}
                              className="group flex items-center gap-2.5 rounded-md px-2.5 py-2.5 transition-colors hover:bg-white/[0.06]"
                            >
                              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.08] text-[9px] font-bold text-purple-400 transition-colors group-hover:border-purple-500/30 group-hover:bg-purple-500/10">
                                {item.number}
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block text-[12px] font-semibold leading-tight text-gray-100">
                                  {item.name}
                                </span>
                                <span className="mt-1 block text-[10px] leading-snug text-gray-500">
                                  {item.description}
                                </span>
                              </span>
                              <span className="text-gray-600 transition-transform group-hover:translate-x-0.5 group-hover:text-purple-400">
                                <Arrow />
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* DESKTOP CART BUTTON */}
              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="relative ml-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-300 transition hover:bg-white/[0.08] hover:text-white"
                aria-label="Open cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 4h2l1.6 10.2a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 1.9-1.4L20 8H6" />
                  <circle cx="9" cy="20" r="1.2" />
                  <circle cx="17" cy="20" r="1.2" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-black text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* DESKTOP CONTACT */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("#contact");
                }}
                className="ml-3 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-2 text-[12px] font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:shadow-purple-500/30"
              >
                Contact
              </a>
            </div>

            {/* MOBILE ACTIONS (Cart + Menu) */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* MOBILE CART BUTTON */}
              <button
                type="button"
                onClick={() => setCartDrawerOpen(true)}
                className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white transition-colors hover:bg-white/10"
                aria-label="Open cart"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 4h2l1.6 10.2a2 2 0 0 0 2 1.7h7.8a2 2 0 0 0 1.9-1.4L20 8H6" />
                  <circle cx="9" cy="20" r="1.2" />
                  <circle cx="17" cy="20" r="1.2" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[9px] font-black text-white">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* MOBILE MENU BUTTON */}
              <button
                type="button"
                onClick={() => {
                  setIsOpen((prev) => !prev);
                  setMobileDropdownOpen(false);
                  setActiveDropdown(null);
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-white transition-colors hover:bg-white/10"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                <MenuIcon open={isOpen} />
              </button>
            </div>
          </div>
        </div>

        {/* =================================
            MOBILE NAVIGATION
        ================================= */}
        <div
          id="mobile-navigation"
          aria-hidden={!isOpen}
          className={`absolute inset-x-0 top-full overflow-y-auto overscroll-contain border-t border-white/[0.06] border-b border-white/10 bg-[#0c0a10]/[0.98] shadow-xl backdrop-blur-xl transition-all duration-300 lg:hidden ${
            isOpen
              ? "max-h-[calc(100dvh-60px)] opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-7xl px-3 py-3 sm:px-5">
            <div className="space-y-0.5">
              {navLinks.map((link) => (
                <div key={link.name}>
                  {link.dropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setMobileDropdownOpen((prev) => !prev)}
                        aria-expanded={mobileDropdownOpen}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-semibold transition-colors ${
                          mobileDropdownOpen
                            ? "bg-white/[0.06] text-white"
                            : "text-gray-300 hover:bg-white/[0.04] hover:text-white"
                        }`}
                      >
                        Services
                        <Chevron open={mobileDropdownOpen} />
                      </button>
                      <div
                        className={`grid transition-all duration-300 ${
                          mobileDropdownOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="ml-3 border-l border-purple-500/30 py-1 pl-2">
                            {link.dropdown.map((item) => (
                              <a
                                key={item.number}
                                href={item.href}
                                tabIndex={isOpen && mobileDropdownOpen ? 0 : -1}
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigateTo(item.href);
                                }}
                                className="flex items-center gap-2.5 rounded-md px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
                              >
                                <span className="text-[9px] font-bold text-purple-400">
                                  {item.number}
                                </span>
                                <span className="min-w-0 flex-1">
                                  <span className="block text-xs font-semibold text-gray-200">
                                    {item.name}
                                  </span>
                                  <span className="mt-0.5 block text-[10px] text-gray-500">
                                    {item.description}
                                  </span>
                                </span>
                                <Arrow />
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <a
                      href={link.href}
                      tabIndex={isOpen ? 0 : -1}
                      onClick={(e) => {
                        e.preventDefault();
                        navigateTo(link.href);
                      }}
                      className="block rounded-md px-3 py-3 text-sm font-semibold text-gray-300 transition-colors hover:bg-white/[0.04] hover:text-white"
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* MOBILE CONTACT */}
            <div className="mt-3 border-t border-white/[0.08] pt-3">
              <a
                href="#contact"
                tabIndex={isOpen ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("#contact");
                }}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-orange-500 px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:shadow-purple-500/30"
              >
                Contact Us
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* CART DRAWER COMPONENT */}
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />

      {/* =================================
          ANIMATIONS
      ================================= */}
      <style jsx>{`
        @keyframes dropdown {
          from { opacity: 0; transform: translate(-50%, -5px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-dropdown { animation: dropdown 160ms ease-out both; }
        @media (prefers-reduced-motion: reduce) {
          .animate-dropdown { animation: none; }
        }
      `}</style>
    </>
  );
}