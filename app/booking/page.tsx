import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import {
  MapPin,
  Mail,
  Phone,
  Clock,
  ShieldCheck,
  Plane,
  Sparkles,
  Layers,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Book A Project | Century Imagery LLC",
  description:
    "Initiate a motion picture or commercial cinema commission with Century Imagery LLC. Direct inquiry protocol for feature films, brand campaigns, luxury event cinema, and The Century Post Lab.",
};

const faqs = [
  {
    q: "How far in advance should we commission Century Imagery?",
    a: "For feature cinematography and major commercial campaigns, we recommend booking 4 to 8 weeks in advance to allow adequate pre-production, casting, and tech scouting. For event cinema and post-production lab color grading, we can occasionally accommodate expedited turnarounds of 2 to 3 weeks.",
  },
  {
    q: "Do you deploy production units internationally outside Nigeria?",
    a: "Yes. Century Imagery operates internationally with active project footprints across London, Accra, Dubai, Atlanta, and Johannesburg. Our flight camera kits are packed in ATA-certified flight cases with ATA Carnet customs documentation for rapid worldwide deployment.",
  },
  {
    q: "Can we book The Century Post Lab for footage captured by another crew?",
    a: "Absolutely. Our Post Lab accepts external RAW/ProRes drives for DaVinci Resolve color grading, audio score design, conforming, and 4K mastering. We regularly handle finishing for international directors and indie features.",
  },
  {
    q: "What is your typical production milestone structure?",
    a: "Standard commissions operate on a milestone schedule: 50% upon contract execution and date lock, 30% upon completion of principal photography, and 20% upon final delivery of master DCP, broadcast, and digital assets.",
  },
];

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-brand-black">
      <Navbar />

      <main className="relative pt-32 sm:pt-40 lg:pt-44 pb-24 sm:pb-32 overflow-hidden">
        {/* Ambient atmospheric glow */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full bg-brand-purple-glow/15 blur-[180px]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Main 2-Column Grid: LEFT (Studio Info & Contacts) + RIGHT (Booking Form) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* LEFT COLUMN: BOOK A PROJECT / Intro / Studio Info / Contacts */}
            <aside className="lg:col-span-5 space-y-10">
              {/* Header block */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-brand-gold text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>COMMISSION PROTOCOL</span>
                </div>

                <h1 className="text-[clamp(2.75rem,5.5vw,5rem)] font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[0.95]">
                  BOOK A <br />
                  <span className="text-brand-gold">PROJECT.</span>
                </h1>

                <p className="text-base sm:text-lg text-brand-muted font-sans font-normal leading-relaxed pt-2">
                  Whether you require an auteur cinematography unit for commercial campaigns, narrative films, luxury celebration cinema, or film-grade DaVinci color grading, share your brief below. Reviews are conducted within 24–48 hours.
                </p>
              </div>

              {/* Studio Headquarters & Direct Contacts */}
              <div className="rounded-2xl border border-brand-border/60 bg-brand-surface/40 p-6 sm:p-8 space-y-6 shadow-xl">
                <div className="text-xs font-mono uppercase tracking-[0.2em] text-brand-gold font-semibold">
                  STUDIO DESKS &amp; DIRECT CONTACT
                </div>

                <div className="space-y-5 text-sm">
                  {/* Studio Headquarters */}
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display font-semibold text-brand-cream text-sm">
                        Century Studio Headquarters
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed mt-0.5">
                        No 6 Zone A, Road 3, Olonde, Ologuneru, Ibadan, Oyo State, Nigeria
                      </p>
                      <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                        Lagos Deployments &bull; Worldwide Transit
                      </span>
                    </div>
                  </div>

                  {/* Direct Producer Email */}
                  <div className="flex items-start gap-3.5 pt-3 border-t border-brand-border/30">
                    <Mail className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display font-semibold text-brand-cream text-sm">
                        Executive Producing Desk
                      </h3>
                      <a
                        href="mailto:Centuryimagery@gmail.com"
                        className="text-xs text-brand-muted hover:text-brand-gold transition-colors font-mono block mt-0.5"
                      >
                        Centuryimagery@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Phone & WhatsApp */}
                  <div className="flex items-start gap-3.5 pt-3 border-t border-brand-border/30">
                    <Phone className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                    <div>
                      <h3 className="font-display font-semibold text-brand-cream text-sm">
                        Direct Line &bull; WhatsApp
                      </h3>
                      <a
                        href="tel:+2348190041071"
                        className="text-xs text-brand-muted hover:text-brand-gold transition-colors font-mono block mt-0.5"
                      >
                        08190041071 &bull; +234 819 004 1071
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Concierge Button */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/2348190041071?text=Hello%20Century%20Imagery%2C%20I%20would%20like%20to%20inquire%20about%20a%20film%20commission."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-brand-gold/40 bg-brand-gold/10 hover:bg-brand-gold hover:text-brand-black text-brand-gold font-display font-semibold text-xs uppercase tracking-[0.16em] transition-all duration-300"
                  >
                    <span>DIRECT WHATSAPP CONCIERGE</span>
                  </a>
                </div>
              </div>

              {/* Production Assurances */}
              <div className="rounded-2xl border border-brand-border/50 bg-brand-surface/30 p-6 sm:p-7 space-y-4">
                <span className="text-xs font-mono uppercase tracking-[0.18em] text-brand-gold block font-semibold">
                  PRODUCTION ASSURANCES
                </span>
                <ul className="space-y-3 text-xs text-brand-muted leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-brand-cream font-medium">Strict NDA:</strong> All scripts, commercial treatments, and project briefs are held under strict confidentiality.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-brand-cream font-medium">Direct Auteur Oversight:</strong> Every commission receives creative oversight from Founder Akin Idowu.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Plane className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-brand-cream font-medium">Global Mobility:</strong> Turnkey Carnet flight packages enable rapid mobilization worldwide.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Studio FAQs */}
              <div className="space-y-4 pt-4 border-t border-brand-border/40">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.18em] text-brand-gold font-semibold">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>COMMISSION FAQS</span>
                </div>

                <div className="space-y-3">
                  {faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group rounded-xl border border-brand-border/40 bg-brand-surface/30 p-4 transition-colors open:border-brand-gold/40"
                    >
                      <summary className="font-display font-semibold text-xs sm:text-sm text-brand-cream cursor-pointer list-none flex items-center justify-between gap-3">
                        <span>{faq.q}</span>
                        <span className="text-brand-gold font-mono text-sm shrink-0 transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-xs text-brand-muted leading-relaxed font-sans font-normal pt-2 border-t border-brand-border/20">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </aside>

            {/* RIGHT COLUMN: Interactive Client Booking Form */}
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="w-full h-96 rounded-2xl border border-brand-border bg-brand-surface/40 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-3 text-brand-gold font-mono text-xs uppercase tracking-widest">
                      <div className="w-6 h-6 border-2 border-brand-gold border-t-transparent rounded-full animate-spin" />
                      <span>Loading Commission Protocol...</span>
                    </div>
                  </div>
                }
              >
                <BookingForm />
              </Suspense>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
