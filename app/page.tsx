import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { BrandStatement } from "@/components/BrandStatement";
import { SelectedWork } from "@/components/SelectedWork";
import { ServicesPreview } from "@/components/ServicesPreview";
import { Showreel } from "@/components/Showreel";
import { AboutPreview } from "@/components/AboutPreview";
import { JournalPreview } from "@/components/JournalPreview";
import { BookingCTA } from "@/components/BookingCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-cream relative selection:bg-brand-gold selection:text-brand-black">
      {/* Global Navigation */}
      <Navbar />

      {/* Section 1: Cinematic Full-Screen Hero */}
      <Hero />

      {/* Section 2: Editorial Brand Statement */}
      <BrandStatement />

      {/* Section 3: Selected Work Showcase */}
      <SelectedWork />

      {/* Section 4: Official Services & The Century Post Lab */}
      <ServicesPreview />

      {/* Section 5: Studio Cinematic Showreel */}
      <Showreel />

      {/* Section 6: About Century Imagery LLC */}
      <AboutPreview />

      {/* Section 7: Editorial Journal */}
      <JournalPreview />

      {/* Section 8: Booking CTA */}
      <BookingCTA />

      {/* Section 9: Premium Footer with Official Brand Tagline & VisioReach Credit */}
      <Footer />
    </main>
  );
}
