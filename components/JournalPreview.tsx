"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { articles } from "@/data/journal";
import { ArrowUpRight, BookOpen } from "lucide-react";

export function JournalPreview() {
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

        {/* 3-Column Editorial Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, idx) => (
            <motion.article
              key={article.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group rounded-xl overflow-hidden bg-brand-surface border border-brand-border/70 hover:border-brand-gold/60 transition-all duration-300 flex flex-col justify-between"
            >
              <Link href={`/journal/${article.slug}`} className="block">
                {/* Visual */}
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${article.coverImage})` }}
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-2.5 py-1 rounded-full border border-brand-border bg-brand-black/75 backdrop-blur-md text-brand-gold text-[10px] font-mono font-medium tracking-wider uppercase">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono font-medium text-brand-muted">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-brand-cream group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs text-brand-muted line-clamp-3 leading-relaxed font-sans font-normal">
                    {article.excerpt}
                  </p>
                </div>
              </Link>

              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/journal/${article.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-display font-semibold text-brand-gold hover:underline uppercase tracking-wider"
                >
                  <span>Read Article</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
