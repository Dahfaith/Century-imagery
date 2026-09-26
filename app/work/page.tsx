import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WorkPortfolioGrid } from "@/components/WorkPortfolioGrid";
import { getProjects, getPageBySlug } from "@/lib/api";
import { Sparkles, Film } from "lucide-react";

export const dynamic = 'force-dynamic' // or revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("work");
  return {
    title: page?.seo_title || "Selected Work & Filmography | Century Imagery LLC",
    description: page?.seo_description || "Explore commercial campaign films, fashion editorials, music visualizers, and documentaries directed and produced by Century Imagery LLC.",
    openGraph: {
      title: page?.seo_title || "Selected Work | Century Imagery LLC",
      description: page?.seo_description || "A curated archive of commercial, fashion, music, and documentary films directed by Century Imagery LLC.",
      images: page?.seo_image_url ? [{ url: page.seo_image_url }] : undefined,
    },
  };
}

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <main className="min-h-screen bg-brand-black text-brand-cream relative selection:bg-brand-gold selection:text-brand-black">
      {/* Global Navigation */}
      <Navbar />

      {/* Page Header */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 border-b border-brand-border/50 overflow-hidden">
        {/* Subtle background ambient glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/3 w-[600px] h-96 rounded-full bg-brand-purple-glow/20 blur-[140px]"
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-brand-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em]">
            <Film className="w-3.5 h-3.5" />
            <span>ARCHIVE &bull; CENTURY IMAGERY LLC</span>
          </div>

          <div className="space-y-3 max-w-3xl">
            <h1 className="text-[clamp(2.5rem,6.5vw,5.5rem)] font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[0.95]">
              THE <span className="text-brand-gold">WORK</span>
            </h1>
            <p className="text-base sm:text-lg text-brand-muted font-sans font-normal leading-relaxed max-w-2xl">
              An evolving catalog of commercial campaigns, fashion motion, music visualizers, and state documentary archives rendered to international cinema standards.
            </p>
          </div>
        </div>
      </section>

      {/* Main Filterable Portfolio Section */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-24">
        <WorkPortfolioGrid initialProjects={projects} />
      </section>

      {/* Bottom Booking Callout */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="rounded-2xl border border-brand-gold/30 bg-gradient-to-r from-brand-surface via-brand-surface-elevated to-brand-surface p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-medium text-brand-gold uppercase tracking-wider block">
              Have A Vision In Mind?
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-cream">
              Let&rsquo;s Direct Your Next Cinematic Campaign
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted font-sans font-normal leading-relaxed">
              Accepting select commercial, fashion, narrative, and wedding film commissions worldwide.
            </p>
          </div>

          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-brand-gold/20 hover:scale-105 active:scale-95 flex-shrink-0"
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
