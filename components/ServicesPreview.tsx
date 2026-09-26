"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PublicService } from "@/lib/api";
import { ArrowUpRight, Plus, Minus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServicesPreview({ services }: { services: PublicService[] }) {
  const [activeServiceId, setActiveServiceId] = useState<string>(services[0]?.id || "");

  return (
    <section
      id="services-preview"
      className="relative w-full py-24 sm:py-32 bg-brand-dark text-brand-cream border-t border-brand-border/40 overflow-hidden"
    >
      {/* Subtle purple background ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-brand-purple-glow/25 blur-3xl"
        aria-hidden="true"
      />

      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-border/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-gold text-[11px] sm:text-xs font-mono tracking-editorial uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Disciplines &bull; Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-brand-cream">
              OUR <span className="text-brand-gold">SERVICES</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-brand-muted max-w-md font-sans font-normal leading-relaxed">
            End-to-end cinematic media production from initial treatment to final master grade. Built for brands with uncompromising standards.
          </p>
        </div>

        {/* Editorial Accordion / Interactive Service List */}
        <div className="divide-y divide-brand-border/60">
          {services.map((service, index) => {
            const isOpen = activeServiceId === service.id;
            const indexStr = String(index + 1).padStart(2, "0");

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveServiceId(service.id)}
                onClick={() => setActiveServiceId(isOpen ? "" : service.id)}
                className={cn(
                  "group py-8 sm:py-10 transition-colors duration-300 cursor-pointer",
                  isOpen ? "bg-brand-surface/40 px-4 sm:px-6 rounded-xl" : "hover:bg-brand-surface/20"
                )}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Number + Title */}
                  <div className="flex items-baseline gap-5 sm:gap-8">
                    <span className="text-xs sm:text-sm font-mono text-brand-gold font-bold">
                      {indexStr}
                    </span>
                    <h3
                      className={cn(
                        "text-2xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight transition-colors",
                        isOpen
                          ? "text-brand-gold"
                          : "text-brand-cream group-hover:text-brand-gold"
                      )}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: Tagline / Category */}
                  <div className="flex items-center justify-between md:justify-end gap-6 text-xs font-mono text-brand-muted">
                    <span className="hidden sm:inline-block tracking-wider uppercase font-medium">
                      {service.category}
                    </span>
                    <div className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-gold group-hover:border-brand-gold transition-colors">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Capabilities & Description */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pt-6 sm:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 border-t border-brand-border/40 mt-6">
                        <div className="lg:col-span-6 space-y-3">
                          <p className="text-sm sm:text-base text-brand-cream font-sans font-normal leading-relaxed">
                            {service.description}
                          </p>
                          <div className="pt-2">
                            <Link
                              href="/booking"
                              className="inline-flex items-center gap-2 text-xs font-display font-semibold text-brand-gold hover:underline uppercase tracking-wider"
                            >
                              <span>Commission this discipline</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>

                        {/* Capabilities Pills */}
                        <div className="lg:col-span-6 space-y-2">
                          <span className="text-[11px] font-mono text-brand-muted uppercase tracking-wider block">
                            Key Deliverables &amp; Competencies
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {service.capabilities.map((cap) => (
                              <span
                                key={cap}
                                className="px-3 py-1.5 rounded-full border border-brand-border bg-brand-surface text-xs font-mono text-brand-cream/80"
                              >
                                {cap}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Section Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-brand-border/40 text-xs font-mono text-brand-muted">
          <span>ALL DISCIPLINE INQUIRIES ROUTED WITHIN 24 HOURS</span>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-gold-light uppercase tracking-wider font-bold"
          >
            <span>VIEW IN-DEPTH SERVICES GUIDE</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
