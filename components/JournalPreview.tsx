"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { JournalArticle } from "@/data/types";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function JournalPreview({ articles }: { articles: JournalArticle[] }) {
  return (
    <section id="journal-preview" className="relative w-full py-24 sm:py-32 bg-brand-black text-brand-cream border-t border-brand-border/40">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-6 border-b border-brand-border/50">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-brand-gold text-[11px] sm:text-xs font-mono tracking-editorial uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial Journal &bull; Insights</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-brand-cream">
              THE <span className="text-brand-gold">JOURNAL</span>
            </h2>
          </div>
          <Link
            href="/journal"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-display font-semibold uppercase tracking-wider text-brand-muted hover:text-brand-gold transition-colors"
          >
            <span>VIEW ALL DISPATCHES</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Editorial Journal Composition: 1 Large Featured + 2 Supporting Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Large Featured Article (7 cols on desktop) */}
          {articles[0] && (
            <motion.article
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 group rounded-2xl overflow-hidden bg-brand-surface/50 border border-brand-border/60 hover:border-brand-gold/60 transition-all duration-500 flex flex-col justify-between shadow-xl"
            >
              <Link href={`/journal/${articles[0].slug}`} className="block flex-1 flex flex-col justify-between">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-surface">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ backgroundImage: `url(${articles[0].coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full border border-brand-gold/40 bg-brand-black/75 backdrop-blur-sm text-brand-gold text-[10px] font-mono font-medium tracking-[0.2em] uppercase">
                      FEATURED DISPATCH
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono font-medium text-brand-muted">
                      <span>{articles[0].date}</span>
                      <span>&bull;</span>
                      <span>{articles[0].readTime}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-cream group-hover:text-brand-gold transition-colors duration-300 leading-snug">
                      {articles[0].title}
                    </h3>

                    <p className="text-sm text-brand-muted line-clamp-3 leading-relaxed font-sans font-normal pt-1">
                      {articles[0].excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border/30 flex items-center gap-2 text-xs font-display font-semibold text-brand-gold uppercase tracking-[0.18em]">
                    <span>READ COMPLETE DISPATCH</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Supporting Stories Stack (5 cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 sm:gap-8">
            {articles.slice(1, 3).map((article, idx) => (
              <motion.article
                key={article.slug}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (idx + 1) * 0.15 }}
                className="group rounded-2xl overflow-hidden bg-brand-surface/40 border border-brand-border/60 hover:border-brand-gold/60 transition-all duration-300 flex-1 flex flex-col justify-between p-6 sm:p-7 shadow-lg"
              >
                <Link href={`/journal/${article.slug}`} className="block space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono font-medium text-brand-gold uppercase tracking-[0.16em]">
                    <span>{article.category}</span>
                    <span className="text-zinc-500 font-mono">{article.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-brand-cream group-hover:text-brand-gold transition-colors duration-300 leading-snug line-clamp-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed font-sans font-normal">
                    {article.excerpt}
                  </p>
                </Link>

                <div className="pt-4 border-t border-brand-border/30 flex items-center justify-between text-xs font-display font-semibold text-brand-cream/80 group-hover:text-brand-gold uppercase tracking-[0.16em] transition-colors">
                  <span>READ STORY</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
