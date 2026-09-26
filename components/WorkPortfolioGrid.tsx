"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PublicProject } from "@/lib/api";
import { CategoryFilter } from "./CategoryFilter";
import { ProjectCard } from "./ProjectCard";
import { Film } from "lucide-react";

interface WorkPortfolioGridProps {
  initialProjects: PublicProject[];
}

const CATEGORY_KEYS: { id: string; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "ENTERTAINMENT", label: "ENTERTAINMENT & NIGHTLIFE" },
  { id: "DOCUMENTARY", label: "PUBLIC SECTOR & DOCS" },
  { id: "MUSIC", label: "MUSIC & CONCERTS" },
  { id: "CORPORATE", label: "CORPORATE & TECH" },
  { id: "CULTURAL", label: "CULTURAL & VIP" },
];

export function WorkPortfolioGrid({ initialProjects }: WorkPortfolioGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Compute dynamic category counts
  const categoryFilters = useMemo(() => {
    return CATEGORY_KEYS.map((cat) => {
      if (cat.id === "ALL") {
        return { ...cat, count: initialProjects.length };
      }
      const count = initialProjects.filter(
        (p) => p.category === cat.id
      ).length;
      return { ...cat, count };
    });
  }, [initialProjects]);

  // Filter projects by category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") {
      return initialProjects;
    }
    return initialProjects.filter((p) => p.category === activeCategory);
  }, [activeCategory, initialProjects]);

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Category Filter Controls */}
      <div className="border-b border-brand-border/60 pb-6 flex items-center justify-between gap-4">
        <CategoryFilter
          categories={categoryFilters}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />
      </div>

      {/* Filtered Projects Grid with Framer Motion layout transitions */}
      <motion.div layout className="space-y-8 sm:space-y-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center space-y-4 rounded-2xl border border-brand-border bg-brand-surface p-8"
            >
              <Film className="w-10 h-10 text-brand-gold mx-auto opacity-60" />
              <h3 className="text-xl font-display font-bold text-brand-cream">
                No Archive Entries Found
              </h3>
              <p className="text-sm text-brand-muted max-w-sm mx-auto">
                No projects currently categorized under &ldquo;{activeCategory}&rdquo;. Select another discipline above.
              </p>
            </motion.div>
          ) : (
            <div className="space-y-10 sm:space-y-14">
              {/* Feature Lead Project if on ALL */}
              {activeCategory === "ALL" && filteredProjects.length > 0 && (
                <motion.div
                  key={filteredProjects[0].slug}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full"
                >
                  <ProjectCard
                    project={filteredProjects[0]}
                    layout="lead"
                    index={0}
                  />
                </motion.div>
              )}

              {/* Remaining Projects in 2-Column Editorial Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
                {(activeCategory === "ALL"
                  ? filteredProjects.slice(1)
                  : filteredProjects
                ).map((project, idx) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="w-full"
                  >
                    <ProjectCard
                      project={project}
                      layout="standard"
                      index={idx}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
