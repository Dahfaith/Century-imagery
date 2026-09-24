"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Sparkles } from "lucide-react";
import { BrandLogo } from "./BrandLogo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { label: "WORK", href: "/work", number: "01" },
  { label: "SERVICES", href: "/services", number: "02" },
  { label: "ABOUT", href: "/about", number: "03" },
  { label: "JOURNAL", href: "/journal", number: "04" },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Trap Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-brand-black/95 backdrop-blur-xl flex flex-col justify-between p-6 sm:p-10"
        >
          {/* Ambient background glow */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-brand-purple-glow/40 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-10 -left-20 w-72 h-72 rounded-full bg-brand-gold/10 blur-3xl"
            aria-hidden="true"
          />

          {/* Top header inside drawer */}
          <div className="flex items-center justify-between border-b border-brand-border/60 pb-5 relative z-10">
            <BrandLogo size="sm" variant="gold" linkToHome />
            <button
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-full border border-brand-border bg-brand-surface hover:border-brand-gold text-brand-cream hover:text-brand-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-5 my-auto py-6 relative z-10">
            {navItems.map((item, idx) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.35, delay: 0.08 * (idx + 1) }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-baseline justify-between border-b border-brand-border/40 pb-3 hover:border-brand-gold transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="text-xs font-mono text-brand-gold">
                      {item.number}
                    </span>
                    <span className="text-3xl sm:text-4xl font-display font-semibold tracking-tight text-brand-cream group-hover:text-brand-gold transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-brand-muted group-hover:text-brand-gold group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </Link>
              </motion.div>
            ))}

            {/* Mobile primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.35, delay: 0.4 }}
              className="pt-4"
            >
              <Link
                href="/booking"
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-brand-gold/10"
              >
                <Sparkles className="w-4 h-4 fill-brand-black" />
                <span>BOOK A PROJECT</span>
              </Link>
            </motion.div>
          </nav>

          {/* Drawer footer metadata */}
          <div className="pt-5 border-t border-brand-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-brand-muted font-mono relative z-10">
            <div>
              <span>Ibadan &amp; Lagos</span> &bull; <span>Worldwide Production</span>
            </div>
            <div className="text-[11px] text-zinc-500">
              © 2026 Century Imagery
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
