"use client";

import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface AutoplayVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function AutoplayVideo({ src, poster, className = "" }: AutoplayVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Derive mp4 alternative if src is .mov
  const mp4Src = src && src.toLowerCase().endsWith(".mov")
    ? src.replace(/\.mov$/i, ".mp4")
    : null;

  // IntersectionObserver: only load and play when approaching or in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "250px 0px", threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Handle play / pause based on in-view
  useEffect(() => {
    const video = videoRef.current;
    if (!video || hasError) return;

    if (!isInView) {
      if (!video.paused) {
        video.pause();
      }
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Fallback on strict browser autoplay policies: play on first user scroll/interaction
          const handleInteraction = () => {
            if (videoRef.current && isInView) {
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
            window.removeEventListener("scroll", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("click", handleInteraction);
          };
          window.addEventListener("scroll", handleInteraction, { passive: true, once: true });
          window.addEventListener("touchstart", handleInteraction, { passive: true, once: true });
          window.addEventListener("click", handleInteraction, { passive: true, once: true });
        });
    }
  }, [isInView, hasError, src]);

  const fallbackPoster = poster || "/brand/hero-mockup-gold.png";

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden bg-brand-surface", className)}>
      {/* 1. Instant High-Res Poster Layer: always rendered immediately so there are ZERO blank/black boxes */}
      <div
        className={cn(
          "absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 ease-out",
          isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
        style={{
          backgroundImage: `url(${fallbackPoster}), url('/brand/hero-mockup-gold.png')`,
        }}
        aria-hidden="true"
      />

      {/* 2. Video element: only preloaded and played when in view */}
      {!hasError && src && (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload={isInView ? "metadata" : "none"}
          poster={fallbackPoster}
          onPlaying={() => setIsPlaying(true)}
          onLoadedData={() => setIsPlaying(true)}
          onError={() => {
            setHasError(true);
            setIsPlaying(false);
          }}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-700 ease-out",
            isPlaying ? "opacity-100" : "opacity-0"
          )}
        >
          {mp4Src && <source src={mp4Src} type="video/mp4" />}
          <source
            src={src}
            type={src.toLowerCase().endsWith(".mov") ? "video/quicktime" : "video/mp4"}
          />
        </video>
      )}
    </div>
  );
}
