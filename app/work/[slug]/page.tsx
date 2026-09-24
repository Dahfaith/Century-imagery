import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectVideoPlayer } from "@/components/ProjectVideoPlayer";
import { projects } from "@/data/projects";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Briefcase,
  Layers,
  Sparkles,
  Film,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Century Imagery LLC",
    };
  }

  return {
    title: `${project.title} (${project.year}) | Century Imagery LLC`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — ${project.category} Cinema | Century Imagery LLC`,
      description: project.shortDescription,
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const currentIndex = projects.findIndex((p) => p.slug === slug);

  if (currentIndex === -1) {
    notFound();
  }

  const project = projects[currentIndex];

  // Calculate Previous and Next projects
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  // Related projects (other projects in the archive)
  const relatedProjects = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-brand-black text-brand-cream relative selection:bg-brand-gold selection:text-brand-black">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section with Generous Top Offset to Clear Fixed Navbar */}
      <section className="relative pt-32 sm:pt-40 lg:pt-44 pb-12 sm:pb-16 border-b border-brand-border/40 overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/3 w-[600px] h-96 rounded-full bg-brand-purple-glow/20 blur-[140px]"
          aria-hidden="true"
        />

        <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10 space-y-6">
          {/* Breadcrumb / Back Link */}
          <div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border/80 bg-brand-surface/80 hover:border-brand-gold hover:text-brand-gold text-xs font-mono uppercase tracking-wider text-brand-muted transition-all duration-300 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back To All Archives</span>
            </Link>
          </div>

          {/* Badges & Meta */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="px-3.5 py-1 rounded-full border border-brand-gold/40 bg-brand-surface text-brand-gold text-xs font-mono uppercase tracking-wider font-semibold">
              {project.category}
            </span>
            <span className="text-xs font-mono text-brand-muted">
              {project.year} &bull; {project.location}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[0.96]">
            {project.title}
          </h1>

          <p className="text-lg sm:text-2xl text-brand-muted max-w-3xl font-sans font-normal leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </section>

      {/* Hero Visual / Video Player */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        {project.heroVideo ? (
          <ProjectVideoPlayer
            videoUrl={project.heroVideo}
            posterImage={project.heroImage}
            title={project.title}
            category={project.category}
          />
        ) : (
          <div className="relative aspect-[16/9] lg:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-border/80 bg-brand-surface shadow-2xl group">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{
                backgroundImage: `url(${project.heroImage}), url('/brand/hero-mockup-gold.png')`,
              }}
            />
            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        )}
      </section>

      {/* Project Metadata Grid */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 sm:p-10 rounded-2xl border border-brand-border bg-brand-surface/70 backdrop-blur-md">
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-brand-gold">
              <Briefcase className="w-3 h-3" />
              <span>CLIENT</span>
            </div>
            <div className="text-sm sm:text-base font-display font-semibold text-brand-cream">
              {project.client}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-brand-gold">
              <Calendar className="w-3 h-3" />
              <span>YEAR</span>
            </div>
            <div className="text-sm sm:text-base font-display font-semibold text-brand-cream">
              {project.year}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-brand-gold">
              <MapPin className="w-3 h-3" />
              <span>LOCATION</span>
            </div>
            <div className="text-sm sm:text-base font-display font-semibold text-brand-cream">
              {project.location}
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-brand-gold">
              <Layers className="w-3 h-3" />
              <span>DISCIPLINES</span>
            </div>
            <div className="text-xs sm:text-sm font-display font-medium text-brand-cream">
              {project.services.join(" • ")}
            </div>
          </div>
        </div>
      </section>

      {/* Narrative, Concept & Story */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-20 sm:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-gold font-bold">
              THE VISION &bull; SYNOPSIS
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tight text-brand-cream">
              CRAFTING THE NARRATIVE ARC
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-brand-muted font-sans font-normal leading-relaxed">
            <p className="text-brand-cream font-normal">
              {project.fullDescription}
            </p>
            {project.story && (
              <p>
                {project.story}
              </p>
            )}
            <p>
              Every lighting setup and camera move was choreographed to serve the emotional rhythm of the piece. Shot on cinema glass with bespoke color tuning developed in The Century Post Lab.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Gallery Showcase */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24 sm:pb-36 space-y-8">
          <div className="flex items-center justify-between pb-4 border-b border-brand-border/60">
            <div className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">
              FRAME STILLS &bull; VISUAL GALLERY
            </div>
            <div className="text-xs font-mono text-brand-muted">
              {project.gallery.length} PRODUCTION FRAMES
            </div>
          </div>

          {/* Uniform Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            {project.gallery.map((imgUrl, idx) => (
              <div
                key={idx}
                className="relative rounded-xl overflow-hidden border border-brand-border bg-brand-surface shadow-xl group aspect-[16/10]"
              >
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${imgUrl})` }}
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Production Credits */}
      {project.credits && project.credits.length > 0 && (
        <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24 sm:pb-32">
          <div className="p-8 sm:p-12 rounded-2xl border border-brand-border bg-brand-surface space-y-8">
            <div className="flex items-center gap-2 text-brand-gold text-xs font-mono tracking-widest uppercase font-bold">
              <Film className="w-3.5 h-3.5" />
              <span>PRODUCTION CREDITS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 pt-4 border-t border-brand-border/60">
              {project.credits.map((credit, idx) => (
                <div key={idx} className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-muted block">
                    {credit.role}
                  </span>
                  <span className="text-sm sm:text-base font-display font-semibold text-brand-cream">
                    {credit.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Previous & Next Project Navigation */}
      <section className="w-full border-t border-b border-brand-border/60 bg-brand-dark">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-border/60">
          {/* Previous Project */}
          <Link
            href={`/work/${prevProject.slug}`}
            className="group p-8 sm:p-12 lg:p-16 flex flex-col justify-between hover:bg-brand-surface/40 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-brand-muted group-hover:text-brand-gold transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS PROJECT</span>
            </div>
            <div className="mt-6 space-y-2">
              <span className="text-xs font-mono text-brand-gold">
                {prevProject.category}
              </span>
              <h4 className="text-2xl sm:text-3xl font-display font-bold text-brand-cream uppercase tracking-tight group-hover:text-brand-gold transition-colors">
                {prevProject.title}
              </h4>
            </div>
          </Link>

          {/* Next Project */}
          <Link
            href={`/work/${nextProject.slug}`}
            className="group p-8 sm:p-12 lg:p-16 flex flex-col justify-between text-left md:text-right hover:bg-brand-surface/40 transition-colors"
          >
            <div className="flex items-center md:justify-end gap-2 text-xs font-mono text-brand-muted group-hover:text-brand-gold transition-colors uppercase tracking-wider">
              <span>NEXT PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-6 space-y-2">
              <span className="text-xs font-mono text-brand-gold">
                {nextProject.category}
              </span>
              <h4 className="text-2xl sm:text-3xl font-display font-bold text-brand-cream uppercase tracking-tight group-hover:text-brand-gold transition-colors">
                {nextProject.title}
              </h4>
            </div>
          </Link>
        </div>
      </section>

      {/* Related Projects */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 space-y-12">
        <div className="flex items-center justify-between pb-4 border-b border-brand-border/60">
          <div className="space-y-1">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block">
              MORE FROM THE VAULT
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold uppercase tracking-tight text-brand-cream">
              RELATED WORKS
            </h3>
          </div>
          <Link
            href="/work"
            className="text-xs font-mono uppercase tracking-wider text-brand-muted hover:text-brand-gold transition-colors hidden sm:inline-flex items-center gap-1"
          >
            <span>View All Works</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {relatedProjects.map((p, idx) => (
            <ProjectCard key={p.slug} project={p} layout="standard" index={idx} />
          ))}
        </div>
      </section>

      {/* Booking CTA Banner */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-surface via-brand-surface-elevated to-brand-surface p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-bold block">
              COMMISSION CENTURY IMAGERY LLC
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-brand-cream">
              Ready To Architect Your Next Visual Legacy?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              We collaborate with premier brands, artists, and agencies across commercial campaigns, editorial films, and luxury cinema.
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
