"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  layout?: "hero-featured" | "tall" | "standard";
  index?: number;
}

export function ProjectCard({ project, layout = "standard", index = 0 }: ProjectCardProps) {
  if (layout === "hero-featured") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className="group relative w-full rounded-2xl overflow-hidden bg-brand-surface border border-brand-border/70 hover:border-brand-gold/60 transition-all duration-500 shadow-2xl"
      >
        <Link href={`/work/${project.slug}`} className="block relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
          {/* Main Hero Visual */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{
              backgroundImage: `url(${project.heroImage}), url('https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1800&q=85')`,
            }}
          />
          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent" />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />

          {/* Top Metadata */}
          <div className="absolute top-5 sm:top-8 inset-x-5 sm:inset-x-8 flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded-full border border-brand-gold/40 bg-brand-black/70 backdrop-blur-md text-brand-gold text-[10px] sm:text-xs font-mono tracking-wider uppercase">
              {project.category}
            </span>
            <span className="text-xs font-mono text-brand-cream/80 bg-brand-black/50 px-3 py-1 rounded-full backdrop-blur-md">
              {project.year} &bull; {project.location}
            </span>
          </div>

          {/* Bottom Project Info */}
          <div className="absolute bottom-5 sm:bottom-8 inset-x-5 sm:inset-x-8 flex flex-col md:flex-row md:items-end justify-between gap-4 z-10">
            <div className="space-y-2 max-w-2xl">
              <div className="text-[11px] font-mono text-brand-gold tracking-widest uppercase">
                Featured Project
              </div>
              <h3 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold text-brand-cream uppercase tracking-tight group-hover:text-brand-gold transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-brand-muted line-clamp-2 max-w-xl font-sans font-normal">
                {project.shortDescription}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider text-brand-cream group-hover:text-brand-gold transition-colors self-start md:self-end">
              <span>View Case Study</span>
              <div className="w-8 h-8 rounded-full border border-brand-border bg-brand-surface group-hover:border-brand-gold flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // Standard Unified Layout
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      className="group relative rounded-2xl overflow-hidden bg-brand-surface border border-brand-border/70 hover:border-brand-gold/60 transition-all duration-500 h-full flex flex-col justify-between"
    >
      <Link href={`/work/${project.slug}`} className="flex flex-col h-full justify-between">
        {/* Visual Container - Fixed Uniform Aspect Ratio */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-surface">
          {project.heroVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={project.heroImage}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            >
              <source src={project.heroVideo} />
            </video>
          ) : (
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url(${project.heroImage}), url('/brand/hero-mockup-gold.png')`,
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-80 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />

          {/* Floating Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 rounded-full border border-brand-border bg-brand-black/70 backdrop-blur-md text-brand-gold text-[10px] font-mono font-medium tracking-wider uppercase">
              {project.category}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10 text-[10px] font-mono font-medium text-zinc-400 bg-brand-black/60 backdrop-blur-md px-2.5 py-1 rounded-full">
            {project.year}
          </div>
        </div>

        {/* Text Details */}
        <div className="p-5 sm:p-7 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-xl sm:text-2xl font-display font-bold text-brand-cream uppercase tracking-tight group-hover:text-brand-gold transition-colors">
                {project.title}
              </h3>
              <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-gold group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
            </div>
            <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed font-sans font-normal">
              {project.shortDescription}
            </p>
          </div>
          <div className="pt-2 flex items-center gap-2 text-[11px] font-mono font-medium text-brand-gold uppercase tracking-wider">
            <span>{project.location}</span> &bull; <span>{project.services[0]}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
