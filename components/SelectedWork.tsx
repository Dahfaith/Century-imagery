"use client";

import React from "react";
import Link from "next/link";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/data/projects";
import { ArrowUpRight, Film } from "lucide-react";

export function SelectedWork() {
  const selectedProjects = projects.slice(0, 4);

  return (
    <section id="selected-work" className="relative w-full py-24 sm:py-32 bg-brand-black text-brand-cream border-t border-brand-border/40">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-border/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-gold text-[11px] sm:text-xs font-mono tracking-editorial uppercase">
              <Film className="w-3.5 h-3.5" />
              <span>Selected Filmography &bull; 2024–2025</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-brand-cream">
              SELECTED <span className="text-brand-gold">WORK</span>
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider text-brand-muted hover:text-brand-gold transition-colors"
          >
            <span>EXPLORE ALL ARCHIVES</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Asymmetric Editorial Portfolio Composition */}
        <div className="space-y-10 sm:space-y-14">
          {/* Prominent Lead Feature */}
          {selectedProjects[0] && (
            <ProjectCard
              key={selectedProjects[0].slug}
              project={selectedProjects[0]}
              layout="lead"
              index={0}
            />
          )}

          {/* Secondary Projects: Alternating 2-Column Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {selectedProjects.slice(1, 4).map((project, idx) => (
              <ProjectCard
                key={project.slug}
                project={project}
                layout="standard"
                index={idx + 1}
              />
            ))}
          </div>
        </div>

        {/* Section Footer Link */}
        <div className="pt-8 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-brand-border hover:border-brand-gold bg-brand-surface hover:bg-brand-surface-elevated text-brand-cream hover:text-brand-gold text-xs sm:text-sm font-display font-semibold tracking-widest uppercase transition-all duration-300"
          >
            <span>VIEW COMPLETE WORK PORTFOLIO</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
