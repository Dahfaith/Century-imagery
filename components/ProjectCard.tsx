"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PublicProject } from "@/lib/api";
import { AutoplayVideo } from "./AutoplayVideo";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: PublicProject;
  layout?: "lead" | "standard" | "compact";
  index?: number;
}

export function ProjectCard({ project, layout = "standard", index = 0 }: ProjectCardProps) {
  // 1. Lead Asymmetric Feature Card
  if (layout === "lead") {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="group relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-surface/60 border border-brand-border/60 hover:border-brand-gold/60 transition-all duration-500 shadow-2xl"
      >
        <Link href={`/work/${project.slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
          {/* Dominant Cinematic Visual (7 cols on desktop) */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-brand-surface">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              style={{
                backgroundImage: `url(${project.heroImage}), url('/brand/hero-mockup-gold.png')`,
              }}
            />
            {project.heroVideo && (
              <AutoplayVideo
                src={project.heroVideo}
                poster={project.heroImage}
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/80 via-transparent to-transparent opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />

            {/* Visual Tag */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1 rounded-full border border-brand-gold/40 bg-brand-black/75 backdrop-blur-sm text-brand-gold text-[10px] sm:text-xs font-mono font-medium tracking-[0.2em] uppercase">
                FEATURED WORK
              </span>
            </div>
          </div>

          {/* Editorial Content Stack (4 cols on desktop) */}
          <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-brand-surface/40">
            <div className="space-y-4">
              {/* 1. Category */}
              <div className="text-[11px] font-mono font-medium uppercase tracking-[0.22em] text-brand-gold">
                {project.category}
              </div>

              {/* 2. Project Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-brand-cream uppercase tracking-tight group-hover:text-brand-gold transition-colors duration-300 leading-tight">
                {project.title}
              </h3>

              {/* 3. Year / Location */}
              <div className="text-xs font-mono font-medium text-brand-cream/60 uppercase tracking-wider">
                {project.year} &bull; {project.location}
              </div>

              {/* 4. Short Description */}
              <p className="text-xs sm:text-sm text-brand-muted font-sans font-normal leading-relaxed line-clamp-3 pt-1">
                {project.shortDescription}
              </p>
            </div>

            {/* 5. View Case Study Action */}
            <div className="pt-4 border-t border-brand-border/40 flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-[0.18em] text-brand-cream group-hover:text-brand-gold transition-colors duration-300">
              <span>VIEW CASE STUDY</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // 2. Standard Editorial Card
  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="group relative rounded-2xl overflow-hidden bg-brand-surface/50 border border-brand-border/60 hover:border-brand-gold/60 transition-all duration-500 h-full flex flex-col justify-between shadow-xl"
    >
      <Link href={`/work/${project.slug}`} className="flex flex-col h-full justify-between">
        {/* Dominant Image/Video Frame */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-brand-surface">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            style={{
              backgroundImage: `url(${project.heroImage}), url('/brand/hero-mockup-gold.png')`,
            }}
          />
          {project.heroVideo && (
            <AutoplayVideo
              src={project.heroVideo}
              poster={project.heroImage}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-surface/90 via-transparent to-transparent opacity-70 pointer-events-none" />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />

          {/* Floating Tag */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-2.5 py-1 rounded-full border border-brand-border/60 bg-brand-black/75 backdrop-blur-sm text-brand-gold text-[10px] font-mono font-medium tracking-[0.18em] uppercase">
              {project.category}
            </span>
          </div>

          <div className="absolute top-4 right-4 z-10 text-[10px] font-mono font-medium text-brand-cream/60 bg-brand-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-brand-border/40">
            {project.year}
          </div>
        </div>

        {/* Editorial Text Details */}
        <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
          <div className="space-y-2.5">
            {/* 1. Category & Location */}
            <div className="text-[10px] font-mono font-medium uppercase tracking-[0.2em] text-brand-gold">
              {project.location}
            </div>

            {/* 2. Project Title */}
            <h3 className="text-xl sm:text-2xl font-display font-bold text-brand-cream uppercase tracking-tight group-hover:text-brand-gold transition-colors duration-300 leading-snug">
              {project.title}
            </h3>

            {/* 3. Short Description */}
            <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed font-sans font-normal pt-1">
              {project.shortDescription}
            </p>
          </div>

          {/* 4. View Case Study Action */}
          <div className="pt-3 border-t border-brand-border/30 flex items-center justify-between text-xs font-display font-semibold uppercase tracking-[0.16em] text-brand-cream/80 group-hover:text-brand-gold transition-colors duration-300">
            <span>VIEW CASE STUDY</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
