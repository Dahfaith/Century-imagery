"use client";

import React, { useRef, useEffect } from "react";

interface AutoplayVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

export function AutoplayVideo({ src, poster, className = "" }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict browser autoplay requirements
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback for strict browser policies on initial page load: play on first user scroll/interaction
        const handleInteraction = () => {
          if (videoRef.current) {
            videoRef.current.play().catch(() => {});
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
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      poster={poster}
      className={className}
    >
      <source
        src={src}
        type={src.toLowerCase().endsWith(".mov") ? "video/quicktime" : "video/mp4"}
      />
    </video>
  );
}
