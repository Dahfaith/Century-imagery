"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PublicJournalArticle } from "@/lib/api";
import { ArrowUpRight, BookOpen, Clock, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalArchiveGridProps {
  initialArticles: PublicJournalArticle[];
}

const CATEGORIES = [
  "ALL",
  "Cinematography",
  "Director's Notes",
  "Behind The Scenes",
  "Culture",
  "Campaigns",
];

export function JournalArchiveGrid({ initialArticles }: JournalArchiveGridProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredArticles = useMemo(() => {
    if (activeCategory === "ALL") return initialArticles;
    return initialArticles.filter((a) => a.category === activeCategory);
  }, [activeCategory, initialArticles]);

  const featuredArticle = initialArticles.find((a) => a.featured) || initialArticles[0];

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Category Filter Tabs - Minimal Editorial */}
      <div className="border-b border-brand-border/40 pb-2 overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-6 sm:gap-8 min-w-max">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === "ALL"
                ? initialArticles.length
                : initialArticles.filter((a) => a.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "relative pb-3 text-xs font-mono tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer flex items-center gap-2 focus:outline-none",
                  isActive
                    ? "text-brand-gold font-semibold"
                    : "text-brand-cream/60 hover:text-brand-cream"
                )}
              >
                <span>{cat}</span>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {count}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeJournalFilterUnderline"
                    className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editorial Journal Grid */}
      <motion.div layout className="space-y-10 sm:space-y-14">
        <AnimatePresence mode="popLayout">
          {/* Featured Lead Dispatch if on ALL */}
          {activeCategory === "ALL" && filteredArticles.length > 0 && (
            <motion.article
              key={`featured-${filteredArticles[0].slug}`}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="group rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-surface/60 border border-brand-border/60 hover:border-brand-gold/60 transition-all duration-500 shadow-2xl"
            >
              <Link href={`/journal/${filteredArticles[0].slug}`} className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
                <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-brand-surface">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${filteredArticles[0].coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full border border-brand-gold/40 bg-brand-black/75 backdrop-blur-sm text-brand-gold text-[10px] font-mono font-medium tracking-[0.2em] uppercase">
                      FEATURED DISPATCH
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 bg-brand-surface/40">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-mono font-medium text-brand-muted">
                      <span>{filteredArticles[0].date}</span>
                      <span>&bull;</span>
                      <span>{filteredArticles[0].readTime}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-cream uppercase tracking-tight group-hover:text-brand-gold transition-colors duration-300 leading-tight">
                      {filteredArticles[0].title}
                    </h3>

                    <p className="text-xs sm:text-sm text-brand-muted font-sans font-normal leading-relaxed line-clamp-3 pt-1">
                      {filteredArticles[0].excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border/40 flex items-center gap-2 text-xs font-display font-semibold uppercase tracking-[0.18em] text-brand-cream group-hover:text-brand-gold transition-colors duration-300">
                    <span>READ COMPLETE DISPATCH</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Remaining Articles in 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            {(activeCategory === "ALL"
              ? filteredArticles.slice(1)
              : filteredArticles
            ).map((article, idx) => (
              <motion.article
                key={article.slug}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="group rounded-2xl overflow-hidden bg-brand-surface/50 border border-brand-border/60 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <Link href={`/journal/${article.slug}`} className="block flex-1 flex flex-col justify-between">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-surface">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      style={{ backgroundImage: `url(${article.coverImage})` }}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-2.5 py-1 rounded-full border border-brand-border/60 bg-brand-black/75 backdrop-blur-sm text-brand-gold text-[10px] font-mono tracking-[0.18em] uppercase font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono text-brand-muted">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-brand-cream group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed font-sans font-light">
                    {article.excerpt}
                  </p>
                </div>
              </Link>

              <div className="px-6 pb-6 pt-2 border-t border-brand-border/40 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500 text-[11px]">{article.author}</span>
                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1 text-brand-gold hover:text-brand-gold-light uppercase tracking-wider font-semibold group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
