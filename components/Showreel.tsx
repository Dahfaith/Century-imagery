"use client";

import React from "react";
import { Film, Sparkles } from "lucide-react";
import { CloudflareStreamPlayer } from "./CloudflareStreamPlayer";

interface ShowreelProps {
  reelVideoUrl?: string;
  posterImage?: string;
}

export function Showreel({
  reelVideoUrl = "/videos/showreel.MOV",
  posterImage = "/brand/hero-mockup-gold.png",
}: ShowreelProps) {
  return (
    <section id="showreel" className="w-full border-t border-b border-brand-border/40 bg-brand-black py-20 sm:py-28 lg:py-36 relative">
      {/* Background Ambience */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-brand-gold/5 blur-[180px] rounded-full"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-10 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-border/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-gold text-[11px] sm:text-xs font-mono tracking-editorial uppercase">
              <Film className="w-3.5 h-3.5" />
              <span>Studio Cinematography Showreel</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-brand-cream">
              THE <span className="text-brand-gold">DIRECTOR&apos;S</span> CUT
            </h2>
          </div>
          
          <div className="text-xs sm:text-sm font-mono text-brand-muted max-w-xs md:text-right uppercase tracking-wider">
            A CURATED SELECTION OF OUR MOST EVOCATIVE CINEMATIC FRAMES.
          </div>
        </div>

        {/* Cinematic Video Box */}
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-border/80 bg-brand-surface shadow-2xl group select-none">
          <div className="absolute inset-0 w-full h-full">
            <CloudflareStreamPlayer
              videoId={reelVideoUrl}
              poster={posterImage}
              autoplay={true}
              loop={true}
              muted={true}
              controls={true}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Brand Statement Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 text-center sm:text-left">
          <div className="text-xs sm:text-sm font-mono text-brand-muted uppercase tracking-widest">
            Rendered in DaVinci Resolve
          </div>
          
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em]">
            <Sparkles className="w-3 h-3" />
            <span>International Cinema Standards</span>
          </div>
        </div>
      </div>
    </section>
  );
}
