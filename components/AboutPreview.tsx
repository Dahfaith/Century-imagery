"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Award, Film, Globe } from "lucide-react";

export function AboutPreview() {
  return (
    <section id="about-preview" className="relative w-full py-24 sm:py-32 bg-brand-surface text-brand-cream border-t border-brand-border/40 overflow-hidden">
      {/* Ambient background aura */}
      <div
        className="pointer-events-none absolute top-1/3 -right-40 w-96 h-96 rounded-full bg-brand-purple-glow/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Official Brand Positioning */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-2 text-brand-gold text-[11px] sm:text-xs font-mono tracking-editorial uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About Century Imagery LLC</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-brand-cream leading-[1.05]">
              NARRATIVE PRECISION MEETS{" "}
              <span className="text-brand-gold">CINEMATIC ARTISTRY.</span>
            </h2>

            {/* Official Brand Copy */}
            <p className="text-base sm:text-xl text-brand-cream/90 font-sans font-normal leading-relaxed border-l-2 border-brand-gold pl-4 sm:pl-6">
              Century Imagery LLC is a distinguished motion picture studio where narrative precision meets cinematic artistry. We architect evocative visual legacies for discerning brands, icons, and celebrations, rendered to the exacting standard of international cinema.
            </p>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-brand-gold/60 bg-brand-black hover:bg-brand-gold hover:text-brand-black text-brand-cream text-xs sm:text-sm font-display font-semibold tracking-widest uppercase transition-all duration-300 shadow-xl group"
              >
                <span>DISCOVER OUR STORY</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Values & Production Pillars */}
          <div className="lg:col-span-6 space-y-8 lg:border-l lg:border-brand-border/60 lg:pl-12">
            <div className="space-y-5 text-xs sm:text-sm text-brand-muted font-sans font-normal leading-relaxed">
              <p>
                Founded by filmmaker and creative director <span className="text-brand-cream font-medium">Akin Idowu</span>, Century Imagery LLC crafts broadcast commercials, brand campaign films, and bespoke Century Legacy wedding cinema anchored in intentionality. Every frame is treated as a fine-art composition, balancing the rich daylight and cultural dynamism of Africa with world-class optical glass.
              </p>
              <p>
                Through our in-house post-production suite—The Century Post Lab—we supervise the entire journey: from script and cinematography to Davinci film-grade color grading and spatial sound mastering.
              </p>
            </div>

            {/* Studio Metrics Grid */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-border/50">
              <div className="space-y-1">
                <span className="text-2xl sm:text-4xl font-display font-extrabold text-brand-gold block">
                  400K+
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-medium text-brand-muted uppercase tracking-wider">
                  Project Views
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-4xl font-display font-extrabold text-brand-gold block">
                  3 Yrs
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-medium text-brand-muted uppercase tracking-wider">
                  Oyo Armed Forces
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-2xl sm:text-4xl font-display font-extrabold text-brand-gold block">
                  Lead
                </span>
                <span className="text-[10px] sm:text-xs font-mono font-medium text-brand-muted uppercase tracking-wider">
                  Rebel Empire Architect
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
