"use client";

import React from "react";
import { Film } from "lucide-react";
import { cn } from "@/lib/utils";
import { CloudflareStreamPlayer } from "./CloudflareStreamPlayer";

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
  return (
    <div
      className={cn(
        "relative w-full aspect-[16/9] lg:aspect-[21/9] rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-border/80 bg-brand-surface shadow-2xl group select-none",
        className
      )}
    >
      {/* Cloudflare Stream Video Element */}
      <div className="absolute inset-0 w-full h-full">
        <CloudflareStreamPlayer
          videoId={videoUrl}
          poster={posterImage}
          autoplay={true}
          loop={true}
          muted={true}
          controls={true}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Top Overlay Badge - Kept for aesthetics */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2 pointer-events-none">
        <span className="px-3 py-1 rounded-full border border-brand-gold/40 bg-brand-black/75 backdrop-blur-md text-brand-gold text-[10px] sm:text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-xl">
          <Film className="w-3 h-3" />
          <span>CINEMATIC MASTER &bull; {category || "ORIGINAL MOTION PICTURE"}</span>
        </span>
      </div>
    </div>
  );
}
