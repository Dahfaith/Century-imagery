import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getPageBySlug } from "@/lib/api";
import { Sparkles, Film } from "lucide-react";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("about");
  return {
    title: page?.seo_title || "About The Studio | Century Imagery LLC",
    description: page?.seo_description || "Century Imagery LLC is a distinguished motion picture and cinematography studio directed by Founder & Executive Creative Director Akin Idowu.",
    openGraph: {
      title: page?.seo_title || "About Century Imagery LLC | Motion Picture Studio",
      description: page?.seo_description || "A distinguished Nigerian creative motion picture studio architecting evocative visual legacies to international cinema standards.",
      images: page?.seo_image_url ? [{ url: page.seo_image_url }] : undefined,
    },
  };
}

export default async function AboutPage() {
  const page = await getPageBySlug("about");
  const content: Record<string, any> = page?.content || {};

  return (
    <main className="min-h-screen bg-brand-black text-brand-cream relative selection:bg-brand-gold selection:text-brand-black">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Header: ABOUT CENTURY */}
      <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-20 border-b border-brand-border/40 overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 text-brand-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em]">
            <Film className="w-3.5 h-3.5" />
            <span>STUDIO PROFILE &bull; CENTURY IMAGERY LLC</span>
          </div>

          <h1 className="text-[clamp(2.75rem,7vw,6rem)] font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[0.94] max-w-4xl">
            {content?.hero?.heading || <>ABOUT <span className="text-brand-gold">CENTURY</span></>}
          </h1>
        </div>
      </section>

      {/* 2. WHO WE ARE: Asymmetric 2-Column (Editorial Text + Large Supporting Media) */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.2em] font-semibold block">
                01 / WHO WE ARE
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-brand-cream leading-[1.05]">
                WE DIRECT CINEMA. <br />
                <span className="text-brand-gold">ARCHITECTING LEGACIES.</span>
              </h2>
            </div>

            <div className="space-y-5 text-base sm:text-lg text-brand-muted font-sans font-normal leading-relaxed">
              {content?.bio?.text ? (
                <p className="text-brand-cream/90 font-normal">{content.bio.text}</p>
              ) : (
                <>
                  <p className="text-brand-cream/90 font-normal">
                    Century Imagery is an elite visual storytelling and cinematography brand with deep experience across entertainment, corporate, cultural, and public-sector productions.
                  </p>
                  <p>
                    Operating from studio headquarters in Ibadan with active deployments in Lagos and worldwide transit, our unit serves as primary video architect for landmark nightlife, documents state government protocol across consecutive years, and directs campaign visuals for global music icons and continental tech accelerators.
                  </p>
                  <p>
                    With portfolio releases achieving over <span className="text-brand-gold font-semibold">400,000+ organic views</span>, we translate pulsating energy and solemn ceremony into everlasting motion picture art.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right: Large Supporting Visual */}
          <div className="lg:col-span-6 relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-border/60 bg-brand-surface shadow-2xl">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/brand/hero-mockup-gold.png"
              className="w-full h-full object-cover"
            >
              <source src="/videos/hero.MP4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent opacity-70 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 z-10 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-brand-gold block font-medium">
                PRODUCTION UNIT
              </span>
              <div className="text-lg sm:text-xl font-display font-bold text-brand-cream uppercase tracking-tight">
                Ibadan Studio &bull; Lagos Deployments &bull; Worldwide Transit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHAT WE BELIEVE: Editorial Statement */}
      <section className="w-full border-t border-b border-brand-border/40 bg-brand-surface/30 py-20 sm:py-28 lg:py-36">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8 sm:space-y-12">
          <div className="space-y-2">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.2em] font-semibold block">
              02 / WHAT WE BELIEVE
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold uppercase tracking-tight text-brand-cream leading-[1.05] max-w-4xl">
              &ldquo;WE BELIEVE EVERY IMAGE SHOULD HAVE A{" "}
              <span className="text-brand-gold underline decoration-brand-gold/40 underline-offset-8">
                REASON
              </span>{" "}
              TO EXIST.&rdquo;
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14 pt-6 border-t border-brand-border/40 text-sm sm:text-base text-brand-muted font-sans font-normal leading-relaxed">
            <p>
              We reject flat, thoughtless videography. Story is not an afterthought; it is the structural spine. Every camera move, lighting ratio, and optical choice is dictated by the character and emotion of the subject.
            </p>
            <p>
              By combining cinema camera packages, prime glass sets, and rigorous DaVinci Resolve color science in The Century Post Lab, we turn ephemeral moments into enduring moving heirlooms for discerning brands and private patrons.
            </p>
          </div>
        </div>
      </section>

      {/* 4. FOUNDER / CREATIVE DIRECTOR: Akin Idowu */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 lg:py-32">
        <div className="rounded-2xl sm:rounded-3xl border border-brand-border/60 bg-brand-surface/40 p-8 sm:p-12 lg:p-16 space-y-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-brand-border/40 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.2em] font-semibold block">
                03 / FOUNDER &bull; CREATIVE DIRECTOR
              </span>
              <h3 className="text-3xl sm:text-5xl font-display font-bold text-brand-cream uppercase tracking-tight">
                Akin Idowu
              </h3>
            </div>
            <div className="text-xs font-mono text-brand-gold bg-brand-gold/10 border border-brand-gold/30 px-4 py-2 rounded-full self-start md:self-auto font-medium tracking-wider">
              EXECUTIVE CREATIVE DIRECTOR &bull; CENTURY IMAGERY LLC
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-brand-cream/90 font-sans font-normal leading-relaxed">
              <blockquote className="border-l-2 border-brand-gold pl-6 italic text-brand-cream text-lg sm:text-2xl font-display font-bold leading-snug">
                &ldquo;A camera is merely an instrument; the real work of cinema happens in the mind of the director. We ask the difficult questions: Why this angle? What does the darkness in the corner convey? We do not simply record events—we direct cinema.&rdquo;
              </blockquote>
              <p className="text-sm sm:text-base text-brand-muted pt-2">
                Under Akin Idowu’s creative direction, Century Imagery has established itself as a trusted media partner for high-level state governance, high-society weddings, and premier nightlife brands across Nigeria and the diaspora.
              </p>
            </div>

            <div className="lg:col-span-4 p-6 rounded-xl border border-brand-border/50 bg-brand-surface/60 space-y-3 font-mono text-xs text-brand-muted">
              <div className="text-brand-gold font-semibold uppercase tracking-wider">
                STUDIO HEADQUARTERS
              </div>
              <div className="text-brand-cream leading-relaxed">
                No 6 Zone A, Road 3, Olonde, Ologuneru, Ibadan, Oyo State, Nigeria
              </div>
              <div className="pt-2 border-t border-brand-border/30 text-zinc-400">
                Lagos Deployments &bull; Worldwide Transit
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAPABILITIES & COMPACT EDITORIAL STATS */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24 sm:pb-32 space-y-12">
        <div className="space-y-2 border-b border-brand-border/40 pb-6">
          <span className="text-xs font-mono text-brand-gold uppercase tracking-[0.2em] font-semibold block">
            04 / CAPABILITIES &amp; STATS
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold uppercase tracking-tight text-brand-cream">
            PROVEN TRACK RECORD
          </h2>
        </div>

        {/* Compact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="space-y-1.5 p-6 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
            <span className="text-4xl sm:text-5xl font-display font-extrabold text-brand-gold tracking-tight block">
              400K+
            </span>
            <span className="text-xs font-mono font-medium text-brand-muted uppercase tracking-[0.18em] block">
              PROJECT VIEWS
            </span>
          </div>

          <div className="space-y-1.5 p-6 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
            <span className="text-4xl sm:text-5xl font-display font-extrabold text-brand-gold tracking-tight block">
              3 YEARS
            </span>
            <span className="text-xs font-mono font-medium text-brand-muted uppercase tracking-[0.18em] block">
              OYO STATE ARMED FORCES DAY
            </span>
          </div>

          <div className="space-y-1.5 p-6 rounded-2xl border border-brand-border/40 bg-brand-surface/30">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-brand-gold tracking-tight block">
              PRIMARY ARCHITECT
            </span>
            <span className="text-xs font-mono font-medium text-brand-muted uppercase tracking-[0.18em] block">
              CLUB REBEL EMPIRE
            </span>
          </div>
        </div>

        {/* Bottom Booking Callout */}
        <div className="rounded-2xl border border-brand-gold/30 bg-gradient-to-r from-brand-surface via-brand-surface-elevated to-brand-surface p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-semibold text-brand-gold uppercase tracking-[0.2em] block">
              COMMISSION CENTURY IMAGERY
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-cream">
              Ready To Direct Your Visual Legacy?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted font-sans font-normal leading-relaxed">
              We collaborate with premier brands, artists, and state authorities worldwide.
            </p>
          </div>

          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 shadow-xl shadow-brand-gold/20 hover:scale-105 active:scale-95 flex-shrink-0"
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
