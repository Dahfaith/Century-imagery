"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CategoryFilterProps {
  categories: { id: string; label: string; count: number }[];
  activeCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2 -my-2 flex items-center gap-2 sm:gap-3">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onSelectCategory(cat.id)}
            className={cn(
              "relative px-4 sm:px-5 py-2.5 rounded-full text-xs font-mono font-medium tracking-wider uppercase whitespace-nowrap transition-all duration-300 flex items-center gap-2 flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold",
              isActive
                ? "bg-brand-gold text-brand-black font-semibold shadow-lg shadow-brand-gold/20"
                : "bg-brand-surface border border-brand-border text-brand-muted hover:text-brand-cream hover:border-brand-gold/40"
            )}
          >
            <span>{cat.label}</span>
            <span
              className={cn(
                "text-[10px] px-1.5 py-0.5 rounded-full",
                isActive
                  ? "bg-black/20 text-brand-black"
                  : "bg-brand-black/60 text-brand-muted"
              )}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
