"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Globe2,
  Film,
  PhoneCall,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  discipline: string;
  timeline: string;
  location: string;
  budget: string;
  projectBrief: string;
  referralSource: string;
  ndaConsent: boolean;
}

const initialFormData: FormData = {
  fullName: "",
  email: "",
  phone: "",
  company: "",
  discipline: "Film & Cinema Production",
  timeline: "",
  location: "",
  budget: "₦15,000,000 – ₦35,000,000 (Brand Film / Music Video)",
  projectBrief: "",
  referralSource: "Director / Colleague Referral",
  ndaConsent: true,
};

const disciplineOptions = [
  "Film & Cinema Production",
  "Commercial & Brand Production",
  "Luxury Event Cinema",
  "The Century Post Lab",
  "Aerial & Specialized",
  "Photography Division",
  "Production Support",
  "Full-Service Turnkey Production (Multi-Discipline)",
];

const budgetOptions = [
  "₦5,000,000 – ₦15,000,000 (Commercial / Post Lab)",
  "₦15,000,000 – ₦35,000,000 (Brand Film / Music Video)",
  "₦35,000,000 – ₦75,000,000 (Feature Unit / State Protocol)",
  "₦75,000,000+ (Turnkey Feature / Retainer)",
  "Flexible / Custom Treatment Workshop",
];

const referralOptions = [
  "Director / Colleague Referral",
  "Instagram / Social Media Showcase",
  "VisioReach Concepts",
  "Film Festival / Screening",
  "Press / Editorial Feature",
  "Previous Century Client",
];

export function BookingForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStep, setSubmissionStep] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  // Pre-fill discipline from search parameters if passed (?discipline=...)
  useEffect(() => {
    const disciplineParam = searchParams.get("discipline");
    if (disciplineParam) {
      const matched = disciplineOptions.find(
        (opt) =>
          opt.toLowerCase().includes(disciplineParam.toLowerCase()) ||
          disciplineParam.toLowerCase().includes(opt.toLowerCase().slice(0, 10))
      );
      if (matched) {
        setFormData((prev) => ({ ...prev, discipline: matched }));
      }
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      // Clear error for field on change
      if (errors[name as keyof FormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required for studio booking.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Contact phone / WhatsApp number is required.";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Primary shooting city or country is required.";
    }

    if (!formData.timeline.trim()) {
      newErrors.timeline = "Target shoot dates or timeline required.";
    }

    if (!formData.projectBrief.trim()) {
      newErrors.projectBrief = "Please provide an initial overview of your project.";
    } else if (formData.projectBrief.trim().length < 25) {
      newErrors.projectBrief =
        "Please provide a few more details (minimum 25 characters) regarding your narrative or deliverables.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to the first error
      const firstError = document.querySelector(".form-error-marker");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmissionStep("Encrypting Creative Brief & Attachments...");

    // Simulated cinematic multi-stage submission
    setTimeout(() => {
      setSubmissionStep("Calibrating Studio Timeline & Equipment Availability...");
    }, 900);

    setTimeout(() => {
      setSubmissionStep("Logging Transmission to Akin Idowu & Executive Producers...");
    }, 1800);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      const randomCode =
        "CI-" +
        new Date().getFullYear() +
        "-" +
        Math.floor(10000 + Math.random() * 90000);
      setConfirmationCode(randomCode);
    }, 2700);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
    setConfirmationCode("");
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          /* ================= SUCCESS STATE ================= */
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="rounded-3xl border border-brand-gold/40 bg-gradient-to-b from-brand-surface to-brand-black p-8 sm:p-12 lg:p-16 shadow-2xl shadow-brand-gold/10 relative overflow-hidden"
          >
            {/* Ambient gold glow */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-gold/15 blur-[120px]"
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-brand-purple-glow/20 blur-[120px]"
              aria-hidden="true"
            />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border border-brand-gold/50 bg-brand-gold/10 text-brand-gold mb-6 shadow-inner shadow-brand-gold/30">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              {/* Status Header */}
              <span className="block text-xs font-mono tracking-widest text-brand-gold uppercase mb-2">
                COMMISSION BRIEF TRANSMITTED &bull; CONFIRMED
              </span>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold uppercase text-brand-cream tracking-tight">
                WE HAVE RECEIVED YOUR PROJECT BRIEF.
              </h3>

              <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-border bg-brand-black/60 font-mono text-xs text-brand-muted">
                <span>COMMISSION REFERENCE:</span>
                <span className="text-brand-gold font-bold">{confirmationCode}</span>
              </div>

              <p className="mt-6 text-brand-muted text-base sm:text-lg leading-relaxed font-sans font-light">
                Thank you, <strong className="text-brand-cream">{formData.fullName}</strong>. Your inquiry regarding{" "}
                <span className="text-brand-gold">{formData.discipline}</span> for{" "}
                <span className="text-brand-cream">{formData.location}</span> has been dispatched to Executive Creative Director Akin Idowu and our production desk.
              </p>

              {/* 3-Step Next Roadmap */}
              <div className="mt-10 pt-8 border-t border-brand-border/60 text-left">
                <h4 className="text-xs font-mono uppercase tracking-widest text-brand-gold mb-5 text-center sm:text-left">
                  NEXT COMMISSION PROTOCOL STEPS:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-brand-border/60 bg-brand-black/40">
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-gold mb-2">
                      <Clock className="w-3.5 h-3.5" />
                      <span>STEP 01</span>
                    </div>
                    <h5 className="font-display font-semibold text-brand-cream text-sm mb-1">
                      24–48h Brief Review
                    </h5>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Our directors review technical requirements, crew availability, and camera packages.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-brand-border/60 bg-brand-black/40">
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-gold mb-2">
                      <Film className="w-3.5 h-3.5" />
                      <span>STEP 02</span>
                    </div>
                    <h5 className="font-display font-semibold text-brand-cream text-sm mb-1">
                      Creative Treatment Call
                    </h5>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      A private discovery session to refine visual language, storyboard beats, and shot lists.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-brand-border/60 bg-brand-black/40">
                    <div className="flex items-center gap-2 text-xs font-mono text-brand-gold mb-2">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>STEP 03</span>
                    </div>
                    <h5 className="font-display font-semibold text-brand-cream text-sm mb-1">
                      Contract & Logistics
                    </h5>
                    <p className="text-xs text-brand-muted leading-relaxed">
                      Formalized call sheets, flight insurance, Carnet clearance, and milestone agreements.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/work"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-lg shadow-brand-gold/20"
                >
                  <span>EXPLORE OUR RECENT WORK</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-brand-border bg-brand-surface hover:bg-brand-surface-card hover:border-brand-gold text-brand-cream hover:text-brand-gold font-display font-semibold text-xs uppercase tracking-widest transition-all duration-300"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>SUBMIT ANOTHER BRIEF</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* ================= ACTIVE FORM ================= */
          <motion.form
            key="booking-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            noValidate
            className="rounded-3xl border border-brand-border bg-brand-surface/90 backdrop-blur-xl p-6 sm:p-10 lg:p-14 shadow-2xl relative overflow-hidden"
          >
            {/* Header / Intro inside form */}
            <div className="border-b border-brand-border/60 pb-8 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-brand-gold block mb-2">
                PROJECT COMMISSION FORM &bull; SECURE TRANSMISSION
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-brand-cream">
                COMMISSION CENTURY IMAGERY
              </h3>
              <p className="mt-2 text-sm text-brand-muted max-w-2xl leading-relaxed">
                Provide as much context as possible. Required fields are marked with an asterisk (*). Our team treats all materials with strict confidentiality under our standard studio NDA.
              </p>
            </div>

            {/* Field Section 1: Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-mono flex items-center justify-center">
                  1
                </span>
                <h4 className="text-sm font-mono uppercase tracking-wider text-brand-cream font-bold">
                  PRIMARY CONTACT & PRODUCTION ENTITY
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Tunde Adeyemi"
                    className={`w-full px-4 py-3.5 rounded-xl border bg-brand-black/60 text-brand-cream placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors ${
                      errors.fullName
                        ? "border-red-500/80 form-error-marker"
                        : "border-brand-border hover:border-brand-border/90"
                    }`}
                  />
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. tunde@productioncompany.com"
                    className={`w-full px-4 py-3.5 rounded-xl border bg-brand-black/60 text-brand-cream placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors ${
                      errors.email
                        ? "border-red-500/80 form-error-marker"
                        : "border-brand-border hover:border-brand-border/90"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone / WhatsApp */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    PHONE / WHATSAPP NUMBER *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="08190041071 / +234 819 004 1071"
                    className={`w-full px-4 py-3.5 rounded-xl border bg-brand-black/60 text-brand-cream placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors ${
                      errors.phone
                        ? "border-red-500/80 form-error-marker"
                        : "border-brand-border hover:border-brand-border/90"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Organization / Company */}
                <div>
                  <label
                    htmlFor="company"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    ORGANIZATION / BRAND / ARTIST (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="e.g. Sony Music / Heineken / Independent"
                    className="w-full px-4 py-3.5 rounded-xl border border-brand-border hover:border-brand-border/90 bg-brand-black/60 text-brand-cream placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Field Section 2: Project Commission Parameters */}
            <div className="mt-10 pt-10 border-t border-brand-border/60 space-y-6">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-mono flex items-center justify-center">
                  2
                </span>
                <h4 className="text-sm font-mono uppercase tracking-wider text-brand-cream font-bold">
                  PROJECT SPECIFICATIONS & SCOPE
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Discipline Dropdown */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="discipline"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    PRIMARY SERVICE DIVISION *
                  </label>
                  <div className="relative">
                    <select
                      id="discipline"
                      name="discipline"
                      value={formData.discipline}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-brand-border bg-brand-black/60 text-brand-cream text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors appearance-none cursor-pointer truncate"
                    >
                      {disciplineOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-brand-surface text-brand-cream py-1">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gold text-[10px] font-mono select-none">
                      &#9660;
                    </div>
                  </div>
                </div>

                {/* Target Shoot Timeline */}
                <div>
                  <label
                    htmlFor="timeline"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    TARGET TIMELINE / PREFERRED DATES *
                  </label>
                  <input
                    type="text"
                    id="timeline"
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    placeholder="e.g. October 2026 / Immediate"
                    className={`w-full px-4 py-3.5 rounded-xl border bg-brand-black/60 text-brand-cream placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors text-xs sm:text-sm font-sans ${
                      errors.timeline
                        ? "border-red-500/80 form-error-marker"
                        : "border-brand-border hover:border-brand-border/90"
                    }`}
                  />
                  {errors.timeline && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.timeline}</span>
                    </p>
                  )}
                </div>

                {/* Shoot Location */}
                <div>
                  <label
                    htmlFor="location"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    SHOOT LOCATION / DESTINATION *
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g. Lagos, Nigeria / Atlanta, USA / Worldwide"
                    className={`w-full px-4 py-3.5 rounded-xl border bg-brand-black/60 text-brand-cream placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors text-xs sm:text-sm font-sans ${
                      errors.location
                        ? "border-red-500/80 form-error-marker"
                        : "border-brand-border hover:border-brand-border/90"
                    }`}
                  />
                  {errors.location && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.location}</span>
                    </p>
                  )}
                </div>

                {/* Estimated Budget Range */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="budget"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    ESTIMATED PRODUCTION BUDGET (NGN ₦ / EQUIVALENT)
                  </label>
                  <div className="relative">
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-brand-border bg-brand-black/60 text-brand-cream text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors appearance-none cursor-pointer truncate"
                    >
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-brand-surface text-brand-cream py-1">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gold text-[10px] font-mono select-none">
                      &#9660;
                    </div>
                  </div>
                </div>

                {/* Project Brief / Overview */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="projectBrief"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    PROJECT BRIEF, NARRATIVE & DELIVERABLES *
                  </label>
                  <textarea
                    id="projectBrief"
                    name="projectBrief"
                    rows={5}
                    value={formData.projectBrief}
                    onChange={handleChange}
                    placeholder="Outline your creative vision, narrative concept, key deliverables (e.g. 60s broadcast + 9:16 cutdowns), visual tone, references (Vimeo/YouTube links), and special technical demands (drone, high-speed, DaVinci Resolve color grade)..."
                    className={`w-full px-4 py-3.5 rounded-xl border bg-brand-black/60 text-brand-cream placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors resize-y text-xs sm:text-sm leading-relaxed font-sans ${
                      errors.projectBrief
                        ? "border-red-500/80 form-error-marker"
                        : "border-brand-border hover:border-brand-border/90"
                    }`}
                  />
                  {errors.projectBrief && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.projectBrief}</span>
                    </p>
                  )}
                </div>

                {/* Referral Source */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="referralSource"
                    className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2"
                  >
                    HOW DID YOU DISCOVER CENTURY IMAGERY?
                  </label>
                  <div className="relative">
                    <select
                      id="referralSource"
                      name="referralSource"
                      value={formData.referralSource}
                      onChange={handleChange}
                      className="w-full pl-4 pr-10 py-3.5 rounded-xl border border-brand-border bg-brand-black/60 text-brand-cream text-xs sm:text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-gold transition-colors appearance-none cursor-pointer truncate"
                    >
                      {referralOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-brand-surface text-brand-cream py-1">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-gold text-[10px] font-mono select-none">
                      &#9660;
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* NDA Consent & Terms */}
            <div className="mt-8 pt-8 border-t border-brand-border/60">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="ndaConsent"
                  checked={formData.ndaConsent}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded border-brand-border bg-brand-black text-brand-gold focus:ring-brand-gold accent-brand-gold cursor-pointer"
                />
                <span className="text-xs text-brand-muted leading-relaxed">
                  I agree to Century Imagery LLC&rsquo;s studio commission protocol and request standard{" "}
                  <strong className="text-brand-cream font-medium">
                    Mutual Non-Disclosure Agreement (NDA)
                  </strong>{" "}
                  protection for all submitted scripts, treatments, and intellectual assets.
                </span>
              </label>
            </div>

            {/* Submit Action */}
            <div className="mt-10 pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-brand-gold" />
                <span>256-BIT ENCRYPTED BRIEF &bull; 24-48H RESPONSE</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4.5 rounded-full bg-brand-gold hover:bg-brand-gold-light text-brand-black font-display font-semibold text-sm tracking-widest uppercase transition-all duration-300 shadow-xl shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full"
                    />
                    <span className="font-mono text-xs">{submissionStep}</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>TRANSMIT COMMISSION BRIEF</span>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
