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
    <div className="w-full border-b border-brand-border/40 overflow-x-auto scrollbar-none pb-2">
      <div className="flex items-center gap-6 sm:gap-8 min-w-max">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={cn(
                "relative pb-3 text-xs font-mono tracking-[0.18em] uppercase transition-colors duration-200 cursor-pointer flex items-center gap-2 focus:outline-none",
                isActive
                  ? "text-brand-gold font-semibold"
                  : "text-brand-cream/60 hover:text-brand-cream"
              )}
            >
              <span>{cat.label}</span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {cat.count}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeFilterUnderline"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-brand-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
