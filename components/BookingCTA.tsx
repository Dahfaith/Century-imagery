"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Calendar } from "lucide-react";

export function BookingCTA() {
  return (
    <section id="booking-cta" className="relative w-full py-28 sm:py-36 lg:py-44 bg-brand-black text-brand-cream border-t border-brand-border/40 overflow-hidden text-center">
      {/* Dynamic atmospheric glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-brand-purple-glow/35 blur-[160px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-brand-gold/10 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col items-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-surface/80 backdrop-blur-md text-brand-gold text-xs font-mono uppercase tracking-wider mb-8"
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>NOW ACCEPTING COMMISSIONS &bull; WORLDWIDE</span>
        </motion.div>

        {/* Big Editorial Manifesto Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[0.98] select-none"
        >
          LET&rsquo;S CREATE SOMETHING{" "}
          <span className="text-brand-gold">WORTH REMEMBERING.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-6 sm:mt-8 text-base sm:text-xl text-brand-muted max-w-2xl font-sans font-normal leading-relaxed"
        >
          Ready to elevate your brand campaign, fashion film, or music visualizer? Share your treatment, brief, or timeline with our production team.
        </motion.p>

        {/* Primary Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45 }}
          className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/booking"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-sm sm:text-base tracking-widest uppercase transition-all duration-300 shadow-2xl shadow-brand-gold/30 hover:scale-[1.03] active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5 fill-brand-black" />
            <span>BOOK A PROJECT</span>
          </Link>

          <Link
            href="/work"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 rounded-full border border-brand-border bg-brand-surface/60 hover:bg-brand-surface hover:border-brand-gold text-brand-cream hover:text-brand-gold font-display font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300"
          >
            <span>VIEW RECENT WORK</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
