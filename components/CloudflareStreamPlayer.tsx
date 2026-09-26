"use client";

import React, { useState } from "react";
import { Stream } from "@cloudflare/stream-react";

interface CloudflareStreamPlayerProps {
  videoId: string;
  poster?: string;
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  className?: string;
}

export function CloudflareStreamPlayer({
  videoId,
  poster,
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  className = "",
}: CloudflareStreamPlayerProps) {
  const [hasError, setHasError] = useState(false);

  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoplay) return;
    video.muted = muted;
    video.defaultMuted = muted;
    video.playsInline = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
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
  }, [autoplay, muted, videoId]);

  // If the videoId is a full URL or local path, we render a standard video tag
  if (videoId.includes("http") || videoId.includes("/") || videoId.endsWith(".mp4") || videoId.toLowerCase().endsWith(".mov")) {
    const mp4Url = videoId.toLowerCase().endsWith(".mov")
      ? videoId.replace(/\.mov$/i, ".mp4")
      : null;
    const fallbackPoster = poster || "/brand/hero-mockup-gold.png";

    if (hasError) {
      return (
        <div
          className={`w-full h-full bg-cover bg-center ${className}`}
          style={{ backgroundImage: `url(${fallbackPoster})` }}
        />
      );
    }

    return (
      <div className={`relative w-full h-full overflow-hidden bg-brand-surface ${className}`}>
        {/* Instant background poster */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackPoster})` }}
          aria-hidden="true"
        />
        <video
          ref={videoRef}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          controls={controls}
          poster={fallbackPoster}
          playsInline
          preload="metadata"
          onError={() => setHasError(true)}
          className="relative w-full h-full object-cover"
        >
          {mp4Url && <source src={mp4Url} type="video/mp4" />}
          <source src={videoId} type={videoId.toLowerCase().endsWith(".mov") ? "video/quicktime" : "video/mp4"} />
        </video>
      </div>
    );
  }

  // Cloudflare Stream Player
  return (
    <div className={`relative w-full h-full ${className}`}>
      {!hasError ? (
        <Stream
          src={videoId}
          poster={poster}
          autoplay={autoplay}
          muted={muted}
          loop={loop}
          controls={controls}
          responsive={false}
          className="w-full h-full object-cover"
          // @ts-ignore
          onError={() => setHasError(true)}
        />
      ) : (
        <div
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${poster || "/brand/hero-mockup-gold.png"})` }}
        />
      )}
    </div>
  );
}
