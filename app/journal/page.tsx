import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JournalArchiveGrid } from "@/components/JournalArchiveGrid";
import { getJournalPosts, getPageBySlug } from "@/lib/api";
import { Sparkles, BookOpen } from "lucide-react";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("journal");
  return {
    title: page?.seo_title || "The Journal | Notes on Cinema & Craft | Century Imagery LLC",
    description: page?.seo_description || "Cinematography breakdowns, director's notes, lighting plots, and cultural dispatches from founder Akin Idowu and the Century Imagery production team.",
    openGraph: {
      title: page?.seo_title || "The Journal | Century Imagery LLC",
      description: page?.seo_description || "Essays and breakdowns on cinematography, lighting ratios, DaVinci color grading, and African luxury visual culture.",
      images: page?.seo_image_url ? [{ url: page.seo_image_url }] : undefined,
    },
  };
}

export default async function JournalPage() {
  const articles = await getJournalPosts();
  return (
    <main className="min-h-screen bg-brand-black text-brand-cream relative selection:bg-brand-gold selection:text-brand-black">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Header with Top Clearance */}
      <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 border-b border-brand-border/40 overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/3 w-[600px] h-96 rounded-full bg-brand-purple-glow/20 blur-[140px]"
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-gold/30 bg-brand-surface text-brand-gold text-[11px] sm:text-xs font-mono tracking-wider uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial Dispatches &bull; Century Imagery LLC</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[1.02]">
              THE <span className="text-brand-gold">JOURNAL</span>: NOTES ON CINEMA
            </h1>
            <p className="text-base sm:text-xl text-brand-muted font-sans font-normal leading-relaxed max-w-3xl">
              Cinematography breakdowns, behind-the-scenes lighting essays, camera optical tests, and cultural analyses from founder Akin Idowu and the Century Imagery studio team.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Filterable Journal Grid */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <JournalArchiveGrid initialArticles={articles} />
      </section>

      {/* 3. Bottom Booking Callout */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-surface via-brand-surface-elevated to-brand-surface p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono font-medium text-brand-gold uppercase tracking-widest block">
              COLLABORATE WITH CENTURY IMAGERY LLC
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-brand-cream">
              Have A Story Worth Telling?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted font-sans font-normal leading-relaxed">
              We collaborate with premier brands, recording artists, and luxury weddings to craft moving images that command global respect.
            </p>
          </div>

          <Link
            href="/booking"
            className="inline-flex items-center gap-2.5 px-9 py-5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-brand-gold/25 hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 fill-brand-black" />
            <span>BOOK A PROJECT</span>
          </Link>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
