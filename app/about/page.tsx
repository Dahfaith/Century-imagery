import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  Film,
  Target,
  Compass,
  CheckCircle2,
  ArrowUpRight,
  Camera,
  Layers,
  Award,
  Shield,
  Eye,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About The Studio | Century Imagery LLC",
  description:
    "Century Imagery LLC is a distinguished motion picture studio where narrative precision meets cinematic artistry. Architecting evocative visual legacies for discerning brands and icons.",
  openGraph: {
    title: "About Century Imagery LLC | Motion Picture Studio",
    description:
      "A distinguished Nigerian creative motion picture studio architecting evocative visual legacies to international cinema standards.",
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-cream relative selection:bg-brand-gold selection:text-brand-black">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Page Header with Generous Top Clearance */}
      <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 border-b border-brand-border/40 overflow-hidden">
        {/* Ambient background glows */}
        <div
          className="pointer-events-none absolute top-10 left-1/4 w-[700px] h-[500px] rounded-full bg-brand-purple-glow/25 blur-[160px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 right-10 w-96 h-96 rounded-full bg-brand-gold/10 blur-[120px]"
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-gold/30 bg-brand-surface text-brand-gold text-[11px] sm:text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>About The Studio &bull; Century Imagery LLC</span>
          </div>

          <div className="space-y-6 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[0.98]">
              WE DIRECT <span className="text-brand-gold">CINEMA.</span> ARCHITECTING LEGACIES.
            </h1>

            {/* Official Brand Statement */}
            <div className="p-6 sm:p-8 rounded-2xl border border-brand-gold/40 bg-gradient-to-r from-brand-surface via-brand-surface-elevated to-brand-surface shadow-2xl">
              <p className="text-base sm:text-xl md:text-2xl text-brand-cream font-sans font-normal leading-relaxed italic">
                &ldquo;Century Imagery LLC is a distinguished motion picture studio where narrative precision meets cinematic artistry. We architect evocative visual legacies for discerning brands, icons, and celebrations, rendered to the exacting standard of international cinema.&rdquo;
              </p>
              <div className="pt-4 text-xs font-mono text-brand-gold tracking-widest uppercase font-bold">
                &gt; A CENTURY IMAGERY LLC PRODUCTION — OFFICIAL MANIFESTO
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Studio Introduction & Visual Atmosphere */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Framing */}
          <div className="lg:col-span-6 relative aspect-[4/5] rounded-3xl overflow-hidden border border-brand-border bg-brand-surface shadow-2xl group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=85')",
              }}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-8 left-8 right-8 z-10 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold block">
                PRINCIPAL STUDIO LOCATION
              </span>
              <div className="text-xl sm:text-2xl font-display font-bold text-brand-cream uppercase">
                Ibadan Headquarters &amp; Lagos Deployments &bull; Worldwide
              </div>
            </div>
          </div>

          {/* Editorial Introduction Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-brand-gold text-xs font-mono uppercase tracking-widest font-bold">
              <Film className="w-3.5 h-3.5" />
              <span>THE GENESIS &bull; CRAFT &amp; INTENTION</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-brand-cream leading-tight">
              IMAGES MUST HAVE A <span className="text-brand-gold">REASON</span> TO EXIST.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-brand-muted font-sans font-normal leading-relaxed">
              <p className="text-brand-cream/90 font-normal">
                Century Imagery is an elite visual storytelling and cinematography brand with deep experience across entertainment, corporate, cultural, and public-sector productions.
              </p>
              <p>
                Founded and directed by filmmaker <span className="text-brand-cream font-medium">Akin Idowu</span>, our brand has served as the primary video architect for <strong className="text-brand-cream font-medium">Club Rebel Empire, Osogbo</strong>, documented the <strong className="text-brand-cream font-medium">Oyo State Armed Forces Day</strong> for three consecutive years, and delivered premier creative cinema for tech accelerator <strong className="text-brand-cream font-medium">Utiva</strong>, global music ambassador <strong className="text-brand-cream font-medium">DJ Tunez</strong>, and prominent cultural figures.
              </p>
              <p>
                With portfolio releases achieving <span className="text-brand-gold font-semibold">400,000+ organic views</span>, Century Imagery continues to create cinematic visuals that capture pivotal moments, elevate global brands, and tell stories with lasting cultural impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Mission Pillars */}
      <section className="w-full bg-brand-dark border-t border-b border-brand-border/50 py-20 sm:py-32">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-16">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block">
              OUR GUIDING NORTH STAR
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-brand-cream">
              VISION &amp; MISSION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Vision Card */}
            <div className="p-8 sm:p-12 rounded-3xl border border-brand-gold/30 bg-brand-surface relative overflow-hidden space-y-6 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-brand-black border border-brand-border flex items-center justify-center text-brand-gold">
                <Compass className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block font-bold">
                  THE VISION
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-cream uppercase">
                  Global Benchmark for African Cinematic Excellence
                </h3>
                <p className="text-sm sm:text-base text-brand-muted font-sans font-light leading-relaxed">
                  To establish Century Imagery LLC as the premier international motion picture house exporting African visual sophistication, technical virtuosity, and narrative power to global cinema, television, and premier luxury brand culture.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="p-8 sm:p-12 rounded-3xl border border-brand-gold/30 bg-brand-surface relative overflow-hidden space-y-6 shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-brand-black border border-brand-border flex items-center justify-center text-brand-gold">
                <Target className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <span className="text-xs font-mono text-brand-gold uppercase tracking-widest block font-bold">
                  THE MISSION
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-brand-cream uppercase">
                  Architecting Evocative Visual Legacies
                </h3>
                <p className="text-sm sm:text-base text-brand-muted font-sans font-light leading-relaxed">
                  To execute every project with surgical narrative precision, employing master-tier optical cinema systems and rigorous in-house post-production color science—transforming ephemeral stories into timeless moving heirlooms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values & Creative Philosophy */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-32 space-y-16">
        <div className="space-y-2">
          <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block">
            HOW WE THINK &amp; CREATE
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase tracking-tight text-brand-cream">
            THE FOUR PHILOSOPHICAL PILLARS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-7 rounded-2xl border border-brand-border bg-brand-surface space-y-4 hover:border-brand-gold/50 transition-colors">
            <span className="text-xs font-mono text-brand-gold font-bold">01 / DISCIPLINE</span>
            <h3 className="text-xl font-display font-bold text-brand-cream uppercase">
              Narrative Precision
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-light">
              Story is not an afterthought; it is the structural spine. Every camera dolly, lighting ratio, and lens choice is dictated by the character and emotion of the script.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-brand-border bg-brand-surface space-y-4 hover:border-brand-gold/50 transition-colors">
            <span className="text-xs font-mono text-brand-gold font-bold">02 / OPTICS</span>
            <h3 className="text-xl font-display font-bold text-brand-cream uppercase">
              Cinematic Artistry
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-light">
              We reject flat, clinical corporate video. We sculpt deep shadows, anamorphic bokeh, and organic film grains that evoke the texture of theatrical cinema.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-brand-border bg-brand-surface space-y-4 hover:border-brand-gold/50 transition-colors">
            <span className="text-xs font-mono text-brand-gold font-bold">03 / IDENTITY</span>
            <h3 className="text-xl font-display font-bold text-brand-cream uppercase">
              Cultural Depth
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-light">
              Deeply rooted in African creative power. We champion the nuance of black skin tones, indigenous design, and modern cosmopolitan life for international screens.
            </p>
          </div>

          <div className="p-7 rounded-2xl border border-brand-border bg-brand-surface space-y-4 hover:border-brand-gold/50 transition-colors">
            <span className="text-xs font-mono text-brand-gold font-bold">04 / TIME</span>
            <h3 className="text-xl font-display font-bold text-brand-cream uppercase">
              Enduring Legacy
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-light">
              We direct works designed to withstand the test of decades. Our outputs become valuable cultural and commercial assets for the brands and families who commission them.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Creative Leadership & Director's Desk */}
      <section className="w-full bg-brand-dark border-t border-brand-border/50 py-20 sm:py-32">
        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-br from-brand-surface via-[#150F22] to-brand-black p-8 sm:p-14 lg:p-16 space-y-10 shadow-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-brand-border/60 pb-8">
              <div className="space-y-2">
                <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block font-bold">
                  FOUNDER &bull; DIRECTORS DESK
                </span>
                <h3 className="text-2xl sm:text-4xl font-display font-bold text-brand-cream uppercase">
                  Akin Idowu &bull; Executive Creative Director
                </h3>
              </div>
              <div className="text-xs font-mono text-brand-gold bg-brand-gold/10 border border-brand-gold/30 px-4 py-2 rounded-full self-start md:self-auto font-bold tracking-wider">
                FOUNDER &bull; CENTURY IMAGERY LLC
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
              <div className="lg:col-span-8 space-y-4 text-base sm:text-lg text-brand-cream/90 font-sans font-light leading-relaxed">
                <blockquote className="border-l-2 border-brand-gold pl-6 italic text-brand-cream text-lg sm:text-2xl font-normal">
                  &ldquo;A camera is merely an instrument; the real work of cinema happens in the mind of the director. We ask the difficult questions: Why this angle? What does the darkness in the corner convey? When we cut, does the viewer&rsquo;s pulse quicken? We do not simply record events—we direct cinema.&rdquo;
                </blockquote>
                <p className="pt-2 text-sm text-brand-muted">
                  Under the creative leadership of founder <span className="text-brand-cream font-medium">Akin Idowu</span>, Century Imagery LLC has established its studio headquarters in Ibadan with active production deployments across Lagos and worldwide, collaborating with state governments, leading tech brands, recording artists, and luxury celebrations.
                </p>
              </div>

              <div className="lg:col-span-4 p-6 rounded-2xl border border-brand-border bg-black/40 space-y-4">
                <div className="text-xs font-mono text-brand-gold uppercase tracking-wider font-semibold">
                  STUDIO STANDARDS
                </div>
                <ul className="text-xs font-mono text-brand-muted space-y-2.5">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>DCI 4K &bull; 2.39:1 Cinema Glass</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>DaVinci Film Emulation Suites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>Licensed 6K Aerial Cinematography</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0" />
                    <span>Strict Production NDA Standards</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Closing Booking CTA */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24">
        <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-surface via-brand-surface-elevated to-brand-surface p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-bold block">
              COLLABORATE WITH CENTURY IMAGERY LLC
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-brand-cream">
              Ready To Architect Your Visual Legacy?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Connect with our production supervisors to schedule treatments, brand campaigns, or luxury event cinema bookings worldwide.
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
