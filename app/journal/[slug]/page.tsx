import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getJournalPosts, getJournalPostBySlug } from "@/lib/api";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  User,
  Camera,
  Sparkles,
  BookOpen,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getJournalPosts();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getJournalPostBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found | Century Imagery LLC",
    };
  }

  return {
    title: `${article.title} | Century Imagery LLC`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage }],
    },
  };
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getJournalPostBySlug(slug);

  if (!article) {
    notFound();
  }

  const articles = await getJournalPosts();
  const currentIndex = articles.findIndex((a) => a.slug === slug);

  // Previous and Next articles
  const prevArticle =
    articles[(currentIndex - 1 + articles.length) % articles.length];
  const nextArticle = articles[(currentIndex + 1) % articles.length];

  // Related articles
  const relatedArticles = articles
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2);

  return (
    <main className="min-h-screen bg-brand-black text-brand-cream relative selection:bg-brand-gold selection:text-brand-black">
      {/* Global Navigation */}
      <Navbar />

      {/* Article Header with Top Clearance */}
      <article className="relative pt-32 sm:pt-40 lg:pt-44 pb-16 sm:pb-24 border-b border-brand-border/40 overflow-hidden">
        {/* Ambient background glow */}
        <div
          className="pointer-events-none absolute top-10 left-1/3 w-[600px] h-96 rounded-full bg-brand-purple-glow/20 blur-[140px]"
          aria-hidden="true"
        />

        <div className="w-full max-w-4xl mx-auto px-5 sm:px-8 space-y-6 relative z-10">
          {/* Back Link */}
          <div>
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-border/80 bg-brand-surface/80 hover:border-brand-gold hover:text-brand-gold text-xs font-mono uppercase tracking-wider text-brand-muted transition-all duration-300 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back To All Dispatches</span>
            </Link>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="px-3.5 py-1 rounded-full border border-brand-gold/40 bg-brand-surface text-brand-gold text-xs font-mono uppercase tracking-wider font-semibold">
              {article.category}
            </span>
            <span className="text-xs font-mono text-brand-muted flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-brand-gold" />
              <span>{article.date}</span>
            </span>
            <span className="text-xs font-mono text-brand-muted flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-brand-gold" />
              <span>{article.readTime}</span>
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold uppercase tracking-tight text-brand-cream leading-[1.05]">
            {article.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-xl text-brand-muted font-sans font-normal leading-relaxed border-l-2 border-brand-gold pl-4 sm:pl-6">
            {article.excerpt}
          </p>

          <div className="pt-2 text-xs font-mono text-brand-gold">
            BY {article.author.toUpperCase()} &bull; CENTURY IMAGERY LLC
          </div>
        </div>
      </article>

      {/* Main Cover Visual */}
      <section className="w-full max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="relative aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-brand-border bg-brand-surface shadow-2xl">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${article.coverImage})` }}
          />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        </div>
      </section>

      {/* Article Body Content & Technical Camera Breakdown */}
      <section className="w-full max-w-4xl mx-auto px-5 sm:px-8 pb-20 sm:pb-32 space-y-12">
        {/* Technical Optics Specs Box */}
        {article.cameraSpecs && article.cameraSpecs.length > 0 && (
          <div className="p-6 sm:p-8 rounded-2xl border border-brand-border bg-brand-surface space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-brand-gold uppercase tracking-widest font-bold">
              <Camera className="w-4 h-4" />
              <span>PRODUCTION OPTICS &bull; TECHNICAL SPECIFICATION</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {article.cameraSpecs.map((spec) => (
                <span
                  key={spec}
                  className="px-3 py-1.5 rounded-full border border-brand-border/80 bg-black/50 text-xs font-mono text-brand-cream/90"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Pull Quote */}
        {article.pullQuote && (
          <blockquote className="my-8 sm:my-12 p-8 sm:p-10 rounded-2xl border border-brand-gold/30 bg-gradient-to-r from-brand-surface to-brand-black text-xl sm:text-2xl lg:text-3xl font-display font-bold text-brand-cream italic leading-snug">
            &ldquo;{article.pullQuote}&rdquo;
          </blockquote>
        )}

        {/* Narrative Paragraphs */}
        <div className="space-y-6 text-base sm:text-lg text-brand-muted font-sans font-normal leading-relaxed">
          {article.content.map((paragraph, index) => (
            <p key={index} className={index === 0 ? "text-brand-cream font-normal text-lg sm:text-xl" : ""}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Author Bio Card for Founder Akin Idowu */}
        <div className="p-8 rounded-2xl border border-brand-border bg-brand-surface space-y-3 mt-12">
          <div className="text-xs font-mono text-brand-gold uppercase tracking-wider font-semibold">
            ABOUT THE AUTHOR
          </div>
          <h4 className="text-lg font-display font-bold text-brand-cream uppercase">
            Akin Idowu &bull; Executive Creative Director &amp; Founder
          </h4>
          <p className="text-xs sm:text-sm text-brand-muted leading-relaxed font-sans font-normal">
            Akin Idowu is a Nigerian motion picture director, cinematographer, and founder of Century Imagery LLC. He directs commercial films, luxury event cinema, and narrative visualizers with an emphasis on intentional lighting, West African cultural nuance, and master-tier post-production finish.
          </p>
        </div>
      </section>

      {/* Previous & Next Article Navigation */}
      <section className="w-full border-t border-b border-brand-border/60 bg-brand-dark">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-brand-border/60">
          <Link
            href={`/journal/${prevArticle.slug}`}
            className="group p-8 sm:p-12 flex flex-col justify-between hover:bg-brand-surface/40 transition-colors"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-brand-muted group-hover:text-brand-gold transition-colors uppercase tracking-wider">
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>PREVIOUS DISPATCH</span>
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-xs font-mono text-brand-gold">
                {prevArticle.category}
              </span>
              <h4 className="text-xl sm:text-2xl font-display font-bold text-brand-cream uppercase tracking-tight group-hover:text-brand-gold transition-colors line-clamp-2">
                {prevArticle.title}
              </h4>
            </div>
          </Link>

          <Link
            href={`/journal/${nextArticle.slug}`}
            className="group p-8 sm:p-12 flex flex-col justify-between text-left md:text-right hover:bg-brand-surface/40 transition-colors"
          >
            <div className="flex items-center md:justify-end gap-2 text-xs font-mono text-brand-muted group-hover:text-brand-gold transition-colors uppercase tracking-wider">
              <span>NEXT DISPATCH</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
            <div className="mt-4 space-y-1">
              <span className="text-xs font-mono text-brand-gold">
                {nextArticle.category}
              </span>
              <h4 className="text-xl sm:text-2xl font-display font-bold text-brand-cream uppercase tracking-tight group-hover:text-brand-gold transition-colors line-clamp-2">
                {nextArticle.title}
              </h4>
            </div>
          </Link>
        </div>
      </section>

      {/* Related Dispatches */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-20 sm:py-28 space-y-10">
        <div className="flex items-center justify-between pb-4 border-b border-brand-border/60">
          <div className="space-y-1">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-wider block">
              MORE FROM THE DISPATCH ARCHIVE
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold uppercase tracking-tight text-brand-cream">
              RELATED ESSAYS &amp; BREAKDOWNS
            </h3>
          </div>
          <Link
            href="/journal"
            className="text-xs font-mono uppercase tracking-wider text-brand-muted hover:text-brand-gold transition-colors hidden sm:inline-flex items-center gap-1"
          >
            <span>View All Dispatches</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {relatedArticles.map((rel) => (
            <article
              key={rel.slug}
              className="p-6 rounded-2xl border border-brand-border bg-brand-surface space-y-3 group hover:border-brand-gold/60 transition-colors"
            >
              <span className="text-[11px] font-mono text-brand-gold uppercase tracking-wider">
                {rel.category} &bull; {rel.date}
              </span>
              <h4 className="text-lg sm:text-xl font-display font-bold text-brand-cream group-hover:text-brand-gold transition-colors">
                <Link href={`/journal/${rel.slug}`}>{rel.title}</Link>
              </h4>
              <p className="text-xs text-brand-muted line-clamp-2 leading-relaxed">
                {rel.excerpt}
              </p>
              <div className="pt-2">
                <Link
                  href={`/journal/${rel.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono text-brand-gold hover:underline uppercase tracking-wider"
                >
                  <span>Read Breakdown</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Commission Callout Banner */}
      <section className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        <div className="rounded-3xl border border-brand-gold/30 bg-gradient-to-r from-brand-surface via-brand-surface-elevated to-brand-surface p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <span className="text-xs font-mono text-brand-gold uppercase tracking-widest font-bold block">
              COMMISSION CENTURY IMAGERY LLC
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-brand-cream">
              Have A Story That Demands Cinematic Craft?
            </h3>
            <p className="text-xs sm:text-sm text-brand-muted leading-relaxed">
              Connect with founder Akin Idowu and our production supervisors to begin developing your treatment.
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
