"use client";

import React from "react";
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { ArrowUpRight, Instagram, Youtube, Film, Sparkles } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-brand-black text-brand-cream border-t border-brand-border/70 relative overflow-hidden">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-64 bg-brand-purple-glow/20 blur-[130px]"
        aria-hidden="true"
      />

      {/* Main Footer Content */}
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 pb-12 relative z-10 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Studio Bio */}
          <div className="lg:col-span-5 space-y-6">
            <BrandLogo size="md" variant="gold" linkToHome />
            <p className="text-xs sm:text-sm text-brand-muted max-w-sm font-sans leading-relaxed">
              Century Imagery LLC is a distinguished motion picture studio where narrative precision meets cinematic artistry. We architect evocative visual legacies for discerning brands, icons, and celebrations.
            </p>
            <div className="space-y-2 pt-2 text-xs font-mono text-brand-muted">
              <div className="flex items-center gap-2 text-brand-gold">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
                <span className="font-semibold uppercase tracking-wider">STUDIO HEADQUARTERS</span>
              </div>
              <p className="text-zinc-400 font-sans text-xs">
                No 6 Zone A, Road 3, Olonde, Ologuneru, Ibadan, Nigeria
              </p>
              <p className="text-brand-gold/80 font-mono text-[11px]">
                Ibadan Headquarters &bull; Lagos Deployments &bull; Worldwide
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 pt-1">
                <a
                  href="mailto:Centuryimagery@gmail.com"
                  className="text-brand-cream hover:text-brand-gold transition-colors font-mono"
                >
                  Centuryimagery@gmail.com
                </a>
                <span className="hidden sm:inline text-zinc-600">&bull;</span>
                <a
                  href="tel:+2348190041071"
                  className="text-brand-cream hover:text-brand-gold transition-colors font-mono"
                >
                  08190041071
                </a>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-gold block font-semibold">
              NAVIGATION
            </span>
            <ul className="space-y-2.5 text-xs sm:text-sm font-display font-semibold tracking-wider uppercase text-brand-muted">
              <li>
                <Link href="/work" className="hover:text-brand-gold transition-colors inline-flex items-center gap-1">
                  <span>Selected Work</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-brand-gold transition-colors inline-flex items-center gap-1">
                  <span>Services &amp; Post Lab</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-gold transition-colors inline-flex items-center gap-1">
                  <span>About Century</span>
                </Link>
              </li>
              <li>
                <Link href="/journal" className="hover:text-brand-gold transition-colors inline-flex items-center gap-1">
                  <span>Editorial Journal</span>
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-brand-gold transition-colors inline-flex items-center gap-1 text-brand-cream">
                  <span>Book A Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Studio Disciplines */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-gold block font-semibold">
              STUDIO DIVISIONS
            </span>
            <ul className="space-y-2 text-xs font-mono text-brand-muted">
              <li className="hover:text-brand-cream transition-colors">
                &bull; Film &amp; Cinema Production
              </li>
              <li className="hover:text-brand-cream transition-colors">
                &bull; Commercial &amp; Brand Films
              </li>
              <li className="hover:text-brand-cream transition-colors">
                &bull; Luxury Event &amp; Wedding Cinema
              </li>
              <li className="hover:text-brand-cream transition-colors">
                &bull; The Century Post Lab (4K / DaVinci)
              </li>
              <li className="hover:text-brand-cream transition-colors">
                &bull; Aerial &amp; Drone Cinematography
              </li>
              <li className="hover:text-brand-cream transition-colors">
                &bull; Photography Division
              </li>
              <li className="hover:text-brand-cream transition-colors">
                &bull; Production Support &amp; Logistics
              </li>
            </ul>
          </div>
        </div>

        {/* Official Client Tagline Ribbon */}
        <div className="border-y border-brand-border/60 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-sm sm:text-base md:text-lg font-display font-bold tracking-widest uppercase text-brand-cream">
            <span className="text-brand-gold">&gt; </span>
            <span>A CENTURY IMAGERY LLC PRODUCTION — </span>
            <span className="text-brand-gold">WE DIRECT CINEMA.</span>
          </div>

          {/* Social placeholder handles */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-brand-border bg-brand-surface hover:border-brand-gold hover:text-brand-gold text-brand-cream transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://vimeo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-brand-border bg-brand-surface hover:border-brand-gold hover:text-brand-gold text-brand-cream transition-colors"
              aria-label="Vimeo"
            >
              <Film className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-brand-border bg-brand-surface hover:border-brand-gold hover:text-brand-gold text-brand-cream transition-colors"
              aria-label="YouTube"
            >
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom Bar: Copyright & VisioReach Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-muted font-mono pt-2">
          <div>
            &copy; {currentYear} Century Imagery LLC. All rights reserved.
          </div>

          {/* MANDATORY VISIOREACH CREDIT */}
          <div className="text-[11px] text-zinc-400">
            Designed &amp; Built by{" "}
            <a
              href="https://www.visioreach.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-cream hover:text-brand-gold underline underline-offset-4 transition-colors font-medium"
            >
              VisioReach Concepts
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
