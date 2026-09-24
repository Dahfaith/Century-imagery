import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "hero";
  variant?: "gold" | "white" | "current" | "purple";
  withWordmark?: boolean;
  className?: string;
  linkToHome?: boolean;
  priority?: boolean;
}

const sizeMap = {
  xs: { icon: 24, font: "text-sm", gap: "gap-2" },
  sm: { icon: 32, font: "text-base", gap: "gap-2.5" },
  md: { icon: 42, font: "text-lg", gap: "gap-3" },
  lg: { icon: 54, font: "text-2xl", gap: "gap-3.5" },
  xl: { icon: 72, font: "text-3xl", gap: "gap-4" },
  hero: { icon: 96, font: "text-4xl sm:text-5xl", gap: "gap-5" },
};

const colorMap = {
  gold: {
    iconFill: "#F5C518",
    wordmarkCentury: "text-[#F5C518]",
    wordmarkImagery: "text-[#F5C518]",
  },
  white: {
    iconFill: "#FFFFFF",
    wordmarkCentury: "text-white",
    wordmarkImagery: "text-white",
  },
  current: {
    iconFill: "currentColor",
    wordmarkCentury: "text-current",
    wordmarkImagery: "text-current",
  },
  purple: {
    iconFill: "#9333EA",
    wordmarkCentury: "text-[#9333EA]",
    wordmarkImagery: "text-[#C084FC]",
  },
};

export function CenturyIcon({
  size = 42,
  fill = "#F5C518",
  className,
}: {
  size?: number;
  fill?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0 transition-transform duration-300", className)}
      aria-hidden="true"
    >
      {/* 
        Century Imagery Geometric Aperture C Mark:
        Circular outer perimeter (radius 46 at cx 50, cy 50).
        Inner square aperture (left 32, top 37, right 59, bottom 63).
        Flared opening from the square's right edges to the circle's outer edge.
      */}
      <path
        d="M 88.58 25
           A 46 46 0 1 0 88.58 75
           L 59 63
           L 32 63
           L 32 37
           L 59 37
           Z"
        fill={fill}
      />
    </svg>
  );
}

export function BrandLogo({
  size = "md",
  variant = "gold",
  withWordmark = true,
  className,
  linkToHome = false,
}: BrandLogoProps) {
  const cfg = sizeMap[size];
  const col = colorMap[variant];

  const content = (
    <div
      className={cn(
        "inline-flex items-center select-none group",
        cfg.gap,
        className
      )}
    >
      <CenturyIcon
        size={cfg.icon}
        fill={col.iconFill}
        className="group-hover:scale-105 transition-transform duration-300"
      />
      {withWordmark && (
        <div className="flex flex-col leading-[0.95] tracking-tight font-display font-bold">
          <span className={cn(cfg.font, col.wordmarkCentury, "tracking-tight")}>
            Century
          </span>
          <span className={cn(cfg.font, col.wordmarkImagery, "tracking-tight")}>
            Imagery
          </span>
        </div>
      )}
    </div>
  );

  if (linkToHome) {
    return (
      <Link
        href="/"
        className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-sm transition-opacity hover:opacity-90"
        aria-label="Century Imagery Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
