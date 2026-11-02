import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CallToAction from "@/components/CallToAction";
import Services from "@/components/Services";
import SoundEffects from "@/components/SoundEffects";
import Logos from "@/components/Logos";
import LowerThirds from "@/components/LowerThirds";
import Blog from "@/components/Blog";
import Faqs from "@/components/Faqs";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Call to Action */}
      <CallToAction />

      {/* Sound Effects Section */}
      <SoundEffects />

      {/* Services Section (DJ Drops) */}
      <Services />

      {/* Logo Design Section */}
      <Logos />

      {/* Lower Thirds Section */}
      <LowerThirds />

      {/* Blog Section */}
      <Blog />

      {/* Frequently Asked Questions */}
      <Faqs />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}