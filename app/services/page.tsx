import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { services } from "@/data/services";
import {
  Film,
  CheckCircle2,
  Sparkles,
  ArrowUpRight,
  Sliders,
  Cpu,
  Tv,
  Camera,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Studio Disciplines | Century Imagery LLC",
  description:
    "Explore the 7 motion picture and creative production divisions of Century Imagery LLC, including Film & Cinema, Commercials, Luxury Event Cinema, and The Century Post Lab.",
  openGraph: {
    title: "Services & Production Disciplines | Century Imagery LLC",
    description:
      "A complete guide to Century Imagery LLC's cinematic production capabilities, optical packages, and post-production lab.",
  },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-brand-black text-brand-cream relative selection:bg-brand-gold selection:text-brand-black">
      {/* Global Navigation */}
      <Navbar />

      {/* 1. Page Header */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 border-b border-brand-border/50 overflow-hidden">
        {/* Ambient background glows */}
        <div
          className="pointer-events-none absolute top-10 left-1/4 w-[600px] h-[500px] rounded-full bg-brand-purple-glow/25 blur-[150px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/2 right-10 w-80 h-80 rounded-full bg-brand-gold/10 blur-[120px]"
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-gold/30 bg-brand-surface text-brand-gold text-[11px] sm:text-xs font-mono tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Disciplines &bull; Century Imagery LLC</span>
          </div>

          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[1.02]">
              MOTION PICTURE <span className="text-brand-gold">DIVISIONS</span> &amp; LAB
            </h1>
            <p className="text-base sm:text-xl text-brand-muted font-sans font-normal leading-relaxed max-w-3xl">
              End-to-end cinematic media production engineered for luxury brands, auteurs, and cultural milestones. Rendered to the exacting standards of international cinema.
            </p>
          </div>

          {/* Quick Discipline Anchors */}
          <div className="pt-6 flex flex-wrap gap-2 sm:gap-3">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-3.5 py-1.5 rounded-full border border-brand-border bg-brand-surface/80 hover:border-brand-gold text-[11px] font-mono uppercase tracking-wider text-brand-muted hover:text-brand-cream transition-colors"
              >
                <span>{s.number}. {s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Detailed Service Divisions Showcase */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-32 space-y-24 sm:space-y-36">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <article
              key={service.id}
              id={service.id}
              className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
            >
              {/* Visual Showcase (Alternating Left/Right) */}
              <div
                className={`lg:col-span-6 relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-border bg-brand-surface shadow-2xl group ${
                  isEven ? "lg:order-1" : "lg:order-2"
                }`}
              >
                {service.videoUrl ? (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    poster={service.imagePlaceholder}
                    className="w-full h-full object-cover scale-[1.01]"
                  >
                    <source src={service.videoUrl} />
                  </video>
                ) : (
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${service.imagePlaceholder}), url('/brand/hero-mockup-gold.png')`,
                    }}
                  />
                )}
                <div className="absolute inset-0 bg-black/35 group-hover:bg-black/15 transition-colors duration-500 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-70 pointer-events-none" />

                {/* Number & Category Overlay */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full border border-brand-gold/40 bg-brand-black/80 backdrop-blur-md text-brand-gold text-xs font-mono font-bold">
                    {service.number}
                  </span>
                  <span className="px-3 py-1 rounded-full border border-brand-border bg-brand-black/60 backdrop-blur-md text-brand-cream/80 text-[10px] font-mono uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Text & Capabilities (Alternating Right/Left) */}
              <div
                className={`lg:col-span-6 space-y-6 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                <div className="space-y-2">
                  <span className="text-xs font-mono text-brand-gold tracking-widest uppercase block font-semibold">
                    DISCIPLINE {service.number}
                  </span>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase tracking-tight text-brand-cream">
                    {service.title}
                  </h2>
                  <p className="text-sm sm:text-base font-sans font-medium text-brand-cream/90 italic">
                    &ldquo;{service.tagline}&rdquo;
                  </p>
                </div>

                <p className="text-sm sm:text-base text-brand-muted font-sans font-normal leading-relaxed">
                  {service.description}
                </p>

                {/* Capabilities List */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block font-semibold">
                    Core Capabilities &amp; Deliverables
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-start gap-2.5 text-xs font-mono text-brand-cream/80 bg-brand-surface/70 border border-brand-border/60 p-2.5 rounded-lg"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold flex-shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Commission CTA */}
                <div className="pt-4">
                  <Link
                    href={`/booking?discipline=${service.id}`}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-brand-gold/60 bg-brand-surface hover:bg-brand-gold hover:text-brand-black text-brand-cream text-xs font-display font-semibold tracking-widest uppercase transition-all duration-300 shadow-lg group"
                  >
                    <span>COMMISSION THIS DISCIPLINE</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      {/* 3. The Century Post Lab Spotlight */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24 sm:pb-36">
        <div className="relative rounded-3xl overflow-hidden border border-brand-gold/40 bg-gradient-to-br from-brand-surface via-[#180F28] to-brand-black p-8 sm:p-14 lg:p-16 shadow-2xl space-y-10">
          {/* Ambient Glow */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 w-96 h-96 rounded-full bg-brand-purple-glow/40 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-brand-border/60 pb-10">
            <div className="lg:col-span-8 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-gold/30 bg-black/50 text-brand-gold text-xs font-mono uppercase tracking-wider font-medium">
                <Sliders className="w-3.5 h-3.5" />
                <span>Specialized Finishing Suite</span>
              </div>
              <h3 className="text-3xl sm:text-5xl font-display font-bold uppercase tracking-tight text-brand-cream">
                THE CENTURY <span className="text-brand-gold">POST LAB</span>
              </h3>
              <p className="text-sm sm:text-base text-brand-muted max-w-2xl leading-relaxed font-sans font-normal">
                A dedicated post-production facility where raw footage is shaped into cinema. Film-grade color timing in DaVinci Resolve, bespoke Foley and sound architecture, and rigorous multi-format delivery.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <Link
                href="/booking?discipline=century-post-lab"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-brand-gold/20"
              >
                <Sparkles className="w-4 h-4 fill-brand-black" />
                <span>BOOK POST LAB</span>
              </Link>
            </div>
          </div>

          {/* 3 Pillars of Post Lab */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-brand-border bg-black/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-gold mb-3">
                <Sliders className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-bold text-brand-cream uppercase">
                DaVinci Color Science
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Custom film emulation look-up tables (LUTs), skin-tone preservation, and HDR mastering for theatrical and digital screens.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-brand-border bg-black/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-gold mb-3">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-bold text-brand-cream uppercase">
                Sound Design &amp; Score
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Spatial sound mixing, original compositional scoring, dialogue cleanup, and visceral sub-bass design.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-brand-border bg-black/40 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-brand-surface border border-brand-border flex items-center justify-center text-brand-gold mb-3">
                <Tv className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-display font-bold text-brand-cream uppercase">
                Multi-Format Delivery
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Simultaneous 4K master outputs tailored to Cinema 2.39:1, Broadcast 16:9, and Mobile 9:16 vertical cuts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Production Workflow */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24 sm:pb-32 space-y-12">
        <div className="space-y-2 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block">
            HOW WE OPERATE
          </span>
          <h3 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tight text-brand-cream">
            THE PRODUCTION PIPELINE
          </h3>
          <p className="text-xs sm:text-sm text-brand-muted">
            A disciplined, four-stage workflow ensuring cinematic excellence from treatment to final release.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface space-y-3">
            <span className="text-xs font-mono text-brand-gold font-bold">01 / DISCOVERY</span>
            <h4 className="text-lg font-display font-bold text-brand-cream uppercase">
              Treatment &amp; Concept
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Deconstructing your creative vision, drafting mood treatments, visual references, shot lists, and logistical strategy.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface space-y-3">
            <span className="text-xs font-mono text-brand-gold font-bold">02 / PRODUCTION</span>
            <h4 className="text-lg font-display font-bold text-brand-cream uppercase">
              Principal Photography
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              On-set filming with cinema optical systems, high-speed lighting rigs, steadicam, and licensed aerial drone teams.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface space-y-3">
            <span className="text-xs font-mono text-brand-gold font-bold">03 / THE POST LAB</span>
            <h4 className="text-lg font-display font-bold text-brand-cream uppercase">
              Editing &amp; Color Grade
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Precision story cutting, DaVinci film-grade color grading, Foley sound design, motion graphics, and sound mastering.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-brand-border bg-brand-surface space-y-3">
            <span className="text-xs font-mono text-brand-gold font-bold">04 / ARCHIVE</span>
            <h4 className="text-lg font-display font-bold text-brand-cream uppercase">
              4K Master Delivery
            </h4>
            <p className="text-xs text-brand-muted leading-relaxed">
              Comprehensive asset handoff including broadcast master files, teaser cuts, social aspect ratios, and full archives.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Closing Booking Callout */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-surface via-brand-surface-elevated to-brand-surface p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-bold block">
              COMMISSION CENTURY IMAGERY LLC
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-brand-cream">
              Ready To Commission A Division?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Connect with our production supervisors to schedule treatments, gear bookings, or full-scale commercial campaigns.
            </p>
          </div>

          <Link
            href="/booking"
            className="inline-flex items-center gap-2.5 px-9 py-5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-brand-gold/25 hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Sparkles className="w-4 h-4 fill-brand-black" />
            <span>START A PROJECT</span>
          </Link>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
