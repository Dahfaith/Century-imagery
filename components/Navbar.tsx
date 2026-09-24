"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./BrandLogo";
import { MobileMenu } from "./MobileMenu";
import { Menu, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "WORK", href: "/work" },
  { label: "SERVICES", href: "/services" },
  { label: "ABOUT", href: "/about" },
  { label: "JOURNAL", href: "/journal" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-40 transition-all duration-300",
          isScrolled
            ? "bg-brand-black/85 backdrop-blur-md border-b border-brand-border/80 py-3.5 shadow-2xl shadow-black/60"
            : "bg-transparent py-5 sm:py-6"
        )}
      >
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Logo on the left */}
          <div className="flex-shrink-0">
            <BrandLogo size="sm" variant="gold" linkToHome />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 lg:gap-10"
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-xs lg:text-sm font-display font-semibold tracking-widest uppercase transition-colors relative py-1",
                    isActive
                      ? "text-brand-gold"
                      : "text-brand-muted hover:text-brand-cream"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 inset-x-0 h-0.5 bg-brand-gold rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action: BOOK A PROJECT CTA (Desktop) + Hamburger (Mobile) */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <Link
              href="/booking"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-3.5 h-3.5 fill-brand-black" />
              <span>BOOK A PROJECT</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden inline-flex items-center justify-center min-w-[44px] min-h-[44px] p-2.5 rounded-lg border border-brand-border bg-brand-surface/90 hover:border-brand-gold/60 text-brand-cream hover:text-brand-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
