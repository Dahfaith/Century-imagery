"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { CloudflareStreamPlayer } from "./CloudflareStreamPlayer";

interface VideoBackgroundProps {
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
  posterUrl: string;
  overlayOpacity?: string;
  className?: string;
}

export function VideoBackground({
  desktopVideoUrl = "/videos/hero.mp4",
  mobileVideoUrl,
  posterUrl = "/brand/hero-mockup-gold.png",
  overlayOpacity = "bg-black/35",
  className,
}: VideoBackgroundProps) {
  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden select-none bg-brand-black", className)}>
      {/* HTML5 Optimized Video Player / Cloudflare Stream */}
      <div className="absolute inset-0 w-full h-full">
        <CloudflareStreamPlayer
          videoId={desktopVideoUrl}
          poster={posterUrl}
          autoplay={true}
          loop={true}
          muted={true}
          controls={false}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      {/* Crisp Cinematic Overlays:
          1. Clean translucent dark wash (keeps colors vibrant without muting details) */}
      <div className={cn("absolute inset-0 pointer-events-none", overlayOpacity)} />

      {/* 2. Top gradient for navbar clarity */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-brand-black/80 via-brand-black/30 to-transparent pointer-events-none" />

      {/* 3. Bottom gradient to seamlessly blend into Section 2 */}
      <div className="absolute inset-x-0 bottom-0 h-36 sm:h-48 bg-gradient-to-t from-brand-black via-brand-black/70 to-transparent pointer-events-none" />
    </div>
  );
}
