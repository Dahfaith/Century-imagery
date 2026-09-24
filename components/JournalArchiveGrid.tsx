"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { JournalArticle } from "@/data/types";
import { ArrowUpRight, BookOpen, Clock, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface JournalArchiveGridProps {
  initialArticles: JournalArticle[];
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
      {/* Category Filter Pills */}
      <div className="border-b border-brand-border/60 pb-6 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none py-2 -my-2">
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
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
                  "px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase whitespace-nowrap transition-all duration-300 flex items-center gap-2 flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
                  isActive
                    ? "bg-brand-gold text-brand-black font-bold shadow-lg shadow-brand-gold/20"
                    : "bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-cream hover:border-brand-gold/40"
                )}
              >
                <span>{cat}</span>
                <span
                  className={cn(
                    "text-[10px] px-1.5 py-0.5 rounded-full",
                    isActive
                      ? "bg-black/20 text-brand-black"
                      : "bg-brand-black/60 text-brand-muted"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Uniform Articles Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredArticles.map((article, idx) => (
            <motion.article
              key={article.slug}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className="group rounded-2xl overflow-hidden bg-brand-surface border border-brand-border/70 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between"
            >
              <Link href={`/journal/${article.slug}`} className="block">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${article.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full border border-brand-border bg-brand-black/75 backdrop-blur-md text-brand-gold text-[10px] font-mono tracking-wider uppercase font-semibold">
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
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
