"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Film, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShowreelProps {
  reelVideoUrl?: string;
  posterImage?: string;
}

export function Showreel({
  reelVideoUrl = "/videos/showreel.MOV",
  posterImage = "/brand/hero-mockup-gold.png",
}: ShowreelProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showControls, setShowControls] = useState(false);

  // Autoplay video on scroll into view via IntersectionObserver
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    // Mobile strict autoplay parameters
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // When user reaches the showreel, auto-play
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {
                // If autoplay prevented, wait for interaction
              });
          } else {
            // Pause when out of view to save battery and performance
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [reelVideoUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasInteracted(true);
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    setHasInteracted(true);
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      container.requestFullscreen().catch(() => {});
    }
  };

  return (
    <section
      id="showreel"
      className="relative w-full py-24 sm:py-32 bg-brand-black text-brand-cream border-t border-brand-border/40 overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">
        {/* Header Label */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-gold text-[11px] sm:text-xs font-mono tracking-editorial uppercase">
              <Film className="w-3.5 h-3.5" />
              <span>Motion Picture Compilation</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-brand-cream">
              STUDIO <span className="text-brand-gold">SHOWREEL</span>
            </h2>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-brand-muted">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-gold/30 bg-brand-surface text-brand-gold text-[10px] uppercase">
              <Sparkles className="w-3 h-3" />
              <span>AUTOPLAYS ON SCROLL</span>
            </span>
            <span className="hidden sm:inline">&bull; 4K DCI &bull; 2.39:1</span>
          </div>
        </div>

        {/* Cinematic Auto-Playing Video Box */}
        <div
          ref={containerRef}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
          className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-border/80 bg-brand-surface shadow-2xl group select-none"
        >
          {/* HTML5 Video Element */}
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="auto"
            poster={posterImage}
            onClick={togglePlay}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            className="w-full h-full object-cover cursor-pointer scale-[1.005]"
          >
            <source src={reelVideoUrl} />
          </video>

          {/* Clean Subtle Top and Bottom Vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-brand-black/40 pointer-events-none" />

          {/* Top Live Status Indicator */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2 pointer-events-none">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-gold/40 bg-brand-black/75 backdrop-blur-md text-brand-gold text-[10px] sm:text-xs font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
              <span>{isPlaying ? "NOW PLAYING &bull; CENTURY SHOWREEL" : "PAUSED &bull; CENTURY SHOWREEL"}</span>
            </div>
          </div>

          {/* Center Play Overlay Icon (only visible when paused) */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 cursor-pointer bg-black/40 backdrop-blur-[2px]"
            >
              <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black flex items-center justify-center transition-transform duration-300 hover:scale-110 shadow-2xl shadow-brand-gold/40">
                <Play className="w-6 sm:w-8 h-6 sm:h-8 fill-brand-black ml-1" />
              </div>
              <span className="text-xs sm:text-sm font-display font-bold uppercase tracking-widest text-brand-cream">
                CLICK TO RESUME
              </span>
            </div>
          )}

          {/* Bottom Interactive Controls Bar */}
          <div
            className={cn(
              "absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 z-20 flex items-center justify-between gap-4 p-3 sm:p-4 rounded-xl border border-brand-border/60 bg-brand-black/85 backdrop-blur-md transition-opacity duration-300",
              showControls || !isPlaying || !hasInteracted
                ? "opacity-100"
                : "opacity-0 sm:opacity-85 hover:opacity-100"
            )}
          >
            {/* Left: Play/Pause button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={togglePlay}
                className="w-10 h-10 rounded-full border border-brand-gold/40 bg-brand-gold text-brand-black hover:bg-brand-gold-light flex items-center justify-center transition-transform shadow-md shadow-brand-gold/20"
                aria-label={isPlaying ? "Pause Showreel" : "Play Showreel"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-brand-black" />
                ) : (
                  <Play className="w-4 h-4 fill-brand-black translate-x-0.5" />
                )}
              </button>

              <div className="text-left">
                <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold block">
                  A CENTURY IMAGERY LLC PRODUCTION
                </span>
                <span className="text-xs sm:text-sm font-display font-bold uppercase text-brand-cream tracking-tight">
                  WE DIRECT CINEMA
                </span>
              </div>
            </div>

            {/* Right: Sound Toggle + Fullscreen */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Unmute / Mute Audio Button */}
              <button
                type="button"
                onClick={toggleMute}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-md",
                  isMuted
                    ? "border-brand-gold/60 bg-brand-gold/15 text-brand-gold hover:bg-brand-gold hover:text-brand-black"
                    : "border-brand-border bg-brand-surface text-brand-cream hover:border-brand-gold hover:text-brand-gold"
                )}
                aria-label={isMuted ? "Unmute Showreel Audio" : "Mute Showreel Audio"}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 shrink-0" />
                    <span className="font-bold">UNMUTE SOUND</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>AUDIO ON</span>
                  </>
                )}
              </button>

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-2 sm:p-2.5 rounded-lg border border-brand-border bg-brand-surface hover:border-brand-gold text-brand-cream hover:text-brand-gold transition-colors"
                aria-label="Toggle Fullscreen"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
