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
  title: "Commission The Studio | Century Imagery LLC",
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
        {/* Ambient atmospheric glows */}
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[550px] rounded-full bg-brand-purple-glow/20 blur-[180px]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-[30%] right-0 w-[450px] h-[450px] rounded-full bg-brand-gold/10 blur-[150px]"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          {/* Header Section */}
          <div className="max-w-3xl mb-14 sm:mb-18 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-gold/30 bg-brand-surface text-brand-gold text-xs font-mono uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMISSION & INQUIRY PROTOCOL</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[0.98]">
              INITIATE A <br />
              <span className="text-brand-gold">COMMISSION.</span>
            </h1>

            <p className="mt-6 text-base sm:text-xl text-brand-muted font-sans font-light leading-relaxed">
              Whether you require an auteur feature film cinematography unit, a global brand commercial campaign, luxury celebration cinema, or film-grade DaVinci color grading, share your vision. Direct reviews are conducted within 24–48 hours.
            </p>
          </div>

          {/* Main Grid: Form (2 cols on lg) + Studio Protocol Sidebar (1 col on lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Interactive Client Form */}
            <div className="lg:col-span-7 xl:col-span-8">
              <Suspense
                fallback={
                  <div className="w-full h-96 rounded-3xl border border-brand-border bg-brand-surface/40 flex items-center justify-center">
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

            {/* Right: Studio Direct Desks, Guarantees & FAQ */}
            <aside className="lg:col-span-5 xl:col-span-4 space-y-8">
              {/* Studio Contact Desks Card */}
              <div className="rounded-3xl border border-brand-border bg-brand-surface/70 backdrop-blur-md p-6 sm:p-8">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold block mb-2">
                  STUDIO DESKS & DIRECT CHANNELS
                </span>
                <h2 className="text-xl font-display font-bold uppercase tracking-tight text-brand-cream mb-6">
                  CENTURY PRODUCTION HUBS
                </h2>

                <div className="space-y-5 text-sm">
                  {/* Studio Headquarters */}
                  <div className="flex items-start gap-3.5">
                    <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-semibold text-brand-cream text-sm">
                        Century Studio Headquarters
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed mt-0.5">
                        No 6 Zone A, Road 3, Olonde, Ologuneru, Ibadan, Nigeria
                      </p>
                      <span className="text-[11px] font-mono text-brand-gold/80 block mt-1">
                        Ibadan Headquarters &bull; Lagos Deployments &bull; Worldwide
                      </span>
                    </div>
                  </div>

                  {/* Direct Producer Email */}
                  <div className="flex items-start gap-3.5 pt-2 border-t border-brand-border/40">
                    <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
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

                  {/* Private Line */}
                  <div className="flex items-start gap-3.5">
                    <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-semibold text-brand-cream text-sm">
                        Studio Direct Line &bull; WhatsApp
                      </h3>
                      <a
                        href="tel:+2348190041071"
                        className="text-xs text-brand-muted hover:text-brand-gold transition-colors font-mono block mt-0.5"
                      >
                        08190041071 &bull; +234 819 004 1071
                      </a>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3.5">
                    <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-display font-semibold text-brand-cream text-sm">
                        Production Desk Hours
                      </h3>
                      <p className="text-xs text-brand-muted mt-0.5">
                        Mon – Fri: 08:00 – 19:00 WAT <br />
                        Weekend Set Production by Appointment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick WhatsApp Action */}
                <div className="mt-6 pt-5 border-t border-brand-border/60">
                  <a
                    href="https://wa.me/2348190041071?text=Hello%20Century%20Imagery%2C%20I%20would%20like%20to%20inquire%20about%20a%20film%20commission."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-brand-gold/40 bg-brand-gold/10 hover:bg-brand-gold hover:text-brand-black text-brand-gold font-display font-bold text-xs uppercase tracking-wider transition-all duration-300"
                  >
                    <span>DIRECT WHATSAPP CONCIERGE</span>
                  </a>
                </div>
              </div>

              {/* Commission Standards */}
              <div className="rounded-3xl border border-brand-border bg-brand-surface/40 p-6 sm:p-8 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-brand-gold block mb-1">
                  THE CENTURY STANDARD
                </span>
                <h2 className="text-lg font-display font-bold uppercase text-brand-cream">
                  PRODUCTION ASSURANCES
                </h2>

                <ul className="space-y-3.5 text-xs text-brand-muted leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-brand-cream">Mutual NDA Protocol:</strong> All scripts, commercial treatments, and raw footage are held under strict non-disclosure.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-brand-cream">Direct Auteur Oversight:</strong> Every commissioned production receives creative oversight from Founder Akin Idowu.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Plane className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-brand-cream">Global Mobility:</strong> Turnkey Carnet and equipment insurance allow rapid mobilization across continents.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Layers className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-brand-cream">Master Color Lab:</strong> Native DaVinci Resolve grading and multi-format mastering included in all turnkey cinema packages.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Studio FAQs */}
              <div className="rounded-3xl border border-brand-border bg-brand-surface/40 p-6 sm:p-8 space-y-5">
                <div className="flex items-center gap-2 text-brand-gold">
                  <HelpCircle className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase tracking-widest">
                    COMMISSION ADVISORY & FAQ
                  </span>
                </div>

                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border-b border-brand-border/40 pb-4 last:border-0 last:pb-0"
                    >
                      <h3 className="text-xs font-display font-bold uppercase tracking-wider text-brand-cream mb-1.5">
                        {faq.q}
                      </h3>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
