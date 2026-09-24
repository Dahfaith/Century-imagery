"use client";

import React, { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize2, Film } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectVideoPlayerProps {
  videoUrl: string;
  posterImage: string;
  title: string;
  category?: string;
  className?: string;
}

export function ProjectVideoPlayer({
  videoUrl,
  posterImage,
  title,
  category,
  className,
}: ProjectVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
      className={cn(
        "relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-border/80 bg-brand-surface shadow-2xl group select-none",
        className
      )}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={posterImage}
        onClick={togglePlay}
        className="w-full h-full object-cover scale-[1.01] cursor-pointer"
      >
        <source src={videoUrl} />
      </video>

      {/* Ambient Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-brand-black/40 pointer-events-none" />

      {/* Top Overlay Badge */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2 pointer-events-none">
        <span className="px-3 py-1 rounded-full border border-brand-gold/40 bg-brand-black/75 backdrop-blur-md text-brand-gold text-[10px] sm:text-xs font-mono uppercase tracking-wider flex items-center gap-1.5">
          <Film className="w-3 h-3" />
          <span>CINEMATIC MASTER &bull; 4K DCI</span>
        </span>
      </div>

      {/* Bottom Interactive Controls Bar */}
      <div
        className={cn(
          "absolute bottom-4 sm:bottom-6 inset-x-4 sm:inset-x-6 z-20 flex items-center justify-between gap-4 p-3 sm:p-4 rounded-xl border border-brand-border/60 bg-brand-black/80 backdrop-blur-md transition-opacity duration-300",
          showControls || !isPlaying ? "opacity-100" : "opacity-0 sm:opacity-90 hover:opacity-100"
        )}
      >
        {/* Left: Play/Pause + Title */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="w-10 h-10 rounded-full border border-brand-gold/40 bg-brand-gold text-brand-black hover:bg-brand-gold-light flex items-center justify-center transition-all shadow-md shadow-brand-gold/20"
            aria-label={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-brand-black" />
            ) : (
              <Play className="w-4 h-4 fill-brand-black translate-x-0.5" />
            )}
          </button>

          <div className="hidden xs:block text-left">
            <span className="text-[10px] font-mono uppercase tracking-wider text-brand-gold block">
              {category || "ORIGINAL MOTION PICTURE"}
            </span>
            <span className="text-xs sm:text-sm font-display font-bold uppercase text-brand-cream tracking-tight line-clamp-1">
              {title}
            </span>
          </div>
        </div>

        {/* Right: Audio & Fullscreen Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mute/Unmute */}
          <button
            type="button"
            onClick={toggleMute}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-mono tracking-wider uppercase transition-colors",
              isMuted
                ? "border-brand-border bg-brand-surface text-brand-muted hover:text-brand-cream hover:border-brand-gold"
                : "border-brand-gold bg-brand-gold/20 text-brand-gold"
            )}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">MUTED</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">AUDIO ON</span>
              </>
            )}
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-lg border border-brand-border bg-brand-surface hover:border-brand-gold text-brand-cream hover:text-brand-gold transition-colors"
            aria-label="Toggle Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
