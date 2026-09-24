"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles, Film } from "lucide-react";
import { VideoBackground } from "./VideoBackground";

interface HeroProps {
  onScrollClick?: () => void;
}

export function Hero({ onScrollClick }: HeroProps) {
  const handleScrollClick = () => {
    if (onScrollClick) {
      onScrollClick();
    } else {
      const nextSection = document.getElementById("brand-statement") || document.getElementById("content");
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollBy({ top: window.innerHeight * 0.85, behavior: "smooth" });
      }
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-black">
      {/* Background Cinematic Video + Fallback Poster */}
      <VideoBackground
        posterUrl="/brand/hero-mockup-gold.png"
        desktopVideoUrl="/videos/hero.MP4"
        overlayOpacity="bg-black/35"
      />

      {/* Main Hero Content - Cinema Opening Frame */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 flex flex-col items-center text-center">
        {/* Eyebrow Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-brand-gold/30 bg-brand-black/60 backdrop-blur-sm text-brand-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] mb-6 sm:mb-8"
        >
          <Film className="w-3 h-3 text-brand-gold" />
          <span>Cinematic Digital Media &bull; Creative Direction</span>
        </motion.div>

        {/* Primary Headline - Responsive Clamp with Font-Weight 800 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-[clamp(2.75rem,7.5vw,6.5rem)] font-display font-extrabold tracking-[-0.03em] text-brand-cream uppercase select-none leading-[0.92] max-w-4xl"
        >
          CENTURY <span className="text-brand-gold">IMAGERY</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl text-brand-cream/80 max-w-xl font-sans font-normal tracking-normal leading-relaxed"
        >
          Cinematic storytelling for brands, artists &amp; culture.
        </motion.p>

        {/* Dual Call To Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          {/* Primary CTA: BOOK A PROJECT */}
          <Link
            href="/booking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-xl shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-3.5 h-3.5 fill-brand-black" />
            <span>BOOK A PROJECT</span>
          </Link>

          {/* Secondary CTA: VIEW OUR WORK */}
          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-brand-border/80 hover:border-brand-gold bg-brand-black/40 hover:bg-brand-surface/70 backdrop-blur-sm text-brand-cream hover:text-brand-gold font-display font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300"
          >
            <span>VIEW OUR WORK</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>

      {/* Subtle Scroll Indicator */}
      <motion.button
        type="button"
        onClick={handleScrollClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-8 sm:bottom-10 inset-x-0 mx-auto w-fit z-20 flex flex-col items-center gap-2 text-brand-muted hover:text-brand-gold transition-colors focus:outline-none group cursor-pointer"
        aria-label="Scroll to explore"
      >
        <span className="text-[10px] sm:text-[11px] font-mono tracking-editorial uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-8 h-8 rounded-full border border-brand-border bg-brand-surface/60 group-hover:border-brand-gold flex items-center justify-center transition-colors">
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-brand-gold" />
        </div>
      </motion.button>
    </section>
  );
}
