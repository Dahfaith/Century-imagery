"use client";

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  desktopVideoUrl?: string;
  mobileVideoUrl?: string;
  posterUrl: string;
  overlayOpacity?: string;
  className?: string;
}

export function VideoBackground({
  desktopVideoUrl = "/videos/hero.MP4",
  mobileVideoUrl,
  posterUrl = "/brand/hero-mockup-gold.png",
  overlayOpacity = "bg-black/35",
  className,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict mobile autoplay requirements:
    // 1. Programmatically mute before calling play
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // If browser policy blocks autoplay initially, listen for first touch/interaction
          const handleFirstInteraction = () => {
            if (videoRef.current) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
            window.removeEventListener("touchstart", handleFirstInteraction);
            window.removeEventListener("scroll", handleFirstInteraction);
            window.removeEventListener("click", handleFirstInteraction);
          };

          window.addEventListener("touchstart", handleFirstInteraction, { passive: true });
          window.addEventListener("scroll", handleFirstInteraction, { passive: true });
          window.addEventListener("click", handleFirstInteraction, { passive: true });
        });
    };

    attemptPlay();
  }, [desktopVideoUrl, mobileVideoUrl]);

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden select-none bg-brand-black", className)}>
      {/* Background Poster (visible immediately, fades when playing) */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700",
          isPlaying ? "opacity-0" : "opacity-100"
        )}
        style={{
          backgroundImage: `url(${posterUrl})`,
          backgroundPosition: "center center",
        }}
        aria-hidden="true"
      />

      {/* HTML5 Optimized Video Player */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster={posterUrl}
        onPlaying={() => setIsPlaying(true)}
        className="absolute inset-0 w-full h-full object-cover object-center"
      >
        {mobileVideoUrl && (
          <source src={mobileVideoUrl} media="(max-width: 768px)" />
        )}
        <source src={desktopVideoUrl} />
      </video>

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
