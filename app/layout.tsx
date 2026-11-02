import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// 1. VIEWPORT EXPORT (Fixes the themeColor warning)
export const viewport: Viewport = {
  themeColor: "#08060b",
};

// 2. METADATA EXPORT (Removed themeColor from here)
export const metadata: Metadata = {
  title: {
    default: "DropsKenya | Premium DJ Drops, Sound Effects & Branding",
    template: "%s | DropsKenya",
  },
  description:
    "Professional custom DJ drops, voice tags, sound effects (SFX), logo design, and lower thirds for DJs, radio presenters, and content creators in Kenya and East Africa. Elevate your brand today.",
  keywords: [
    "DJ drops Kenya",
    "custom voice tags Nairobi",
    "sound effects SFX pack",
    "DJ branding East Africa",
    "logo design Kenya",
    "lower thirds motion graphics",
    "DropsKenya",
    "audio branding Kenya",
  ],
  authors: [{ name: "DropsKenya Team", url: "https://www.dropskenya.com" }],
  creator: "DropsKenya",
  publisher: "DropsKenya",
  alternates: {
    canonical: "https://www.dropskenya.com",
  },
  openGraph: {
    title: "DropsKenya | Premium DJ Drops & Audio Branding",
    description:
      "Professional custom DJ drops, voice tags, sound effects, logo design, and lower thirds for creators in Kenya and East Africa.",
    url: "https://www.dropskenya.com",
    siteName: "DropsKenya",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.dropskenya.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DropsKenya Premium Audio & Visual Branding",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DropsKenya | Premium DJ Drops & Audio Branding",
    description:
      "Professional custom DJ drops, voice tags, sound effects, logo design, and lower thirds for creators in Kenya and East Africa.",
    images: ["https://www.dropskenya.com/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.jpg", // Points to app/icon.jpg
    shortcut: "/icon.jpg",
    apple: "/icon.jpg", // Uses the same image for Apple touch icons
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}