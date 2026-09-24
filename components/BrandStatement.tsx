"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function BrandStatement() {
  return (
    <section
      id="brand-statement"
      className="relative w-full py-28 sm:py-36 lg:py-44 bg-brand-black text-brand-cream overflow-hidden border-t border-brand-border/40"
    >
      {/* Ambient background glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-purple-glow/20 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 right-10 w-72 h-72 rounded-full bg-brand-gold/5 blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Subtle Category Marker */}
        <div className="flex items-center gap-3 text-brand-gold text-[11px] sm:text-xs font-mono tracking-editorial uppercase mb-8 sm:mb-12">
          <span className="w-8 h-[1px] bg-brand-gold/60" />
          <span>Brand Philosophy &bull; Century Imagery</span>
        </div>

        {/* Editorial Statement */}
        <div className="space-y-8 sm:space-y-12">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tight leading-[1.08] max-w-5xl"
          >
            &ldquo;WE BELIEVE EVERY IMAGE SHOULD HAVE A{" "}
            <span className="text-brand-gold underline decoration-brand-gold/40 underline-offset-8">
              REASON
            </span>{" "}
            TO EXIST.&rdquo;
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 pt-4 sm:pt-8 border-t border-brand-border/50">
            <div className="lg:col-span-4 text-xs font-mono text-brand-muted tracking-wider uppercase flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <span className="text-brand-gold font-bold block">DISCIPLINES</span>
                <span>COMMERCIAL &bull; CINEMA &bull; EDITORIAL</span>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono font-medium">
                IBADAN &bull; LAGOS &bull; WORLDWIDE
              </div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-8 text-base sm:text-lg lg:text-xl text-brand-cream/90 font-sans font-normal leading-relaxed space-y-4"
            >
              <span>
                Century Imagery is an elite visual storytelling and cinematography studio with proven expertise across entertainment, corporate, cultural, and public-sector productions. Serving as primary video architect for landmark nightlife, documenting state protocol, and directing campaign visuals for global music icons and tech giants.
              </span>
            </motion.p>
          </div>

          {/* Authentic Studio Credentials Bar */}
          <div className="pt-8 border-t border-brand-border/40 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            <div>
              <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-gold block">
                400K+
              </span>
              <span className="text-xs font-mono font-medium text-brand-muted uppercase tracking-wider">
                Audience Project Views
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-gold block">
                3 Consecutive Yrs
              </span>
              <span className="text-xs font-mono font-medium text-brand-muted uppercase tracking-wider">
                Oyo State Armed Forces Day
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-gold block">
                Primary Architect
              </span>
              <span className="text-xs font-mono font-medium text-brand-muted uppercase tracking-wider">
                Club Rebel Empire, Osogbo
              </span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-display font-extrabold text-brand-gold block">
                VIP &amp; Tech
              </span>
              <span className="text-xs font-mono font-medium text-brand-muted uppercase tracking-wider">
                Utiva &bull; DJ Tunez &bull; Cultural Icons
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
