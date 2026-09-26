import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Film } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-brand-black text-brand-cream relative selection:bg-brand-gold selection:text-brand-black">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 relative z-10 py-32">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center">
          <Film className="w-[40vw] h-[40vw] text-brand-surface-elevated/50 mix-blend-screen" />
        </div>
        
        <div className="relative z-10 max-w-lg mx-auto">
          <h1 className="text-8xl md:text-9xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-brand-gold via-brand-gold/80 to-brand-gold/30 mb-6">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-display font-medium text-brand-cream mb-4">
            Scene Not Found
          </h2>
          <p className="text-brand-muted text-lg mb-8 leading-relaxed max-w-md mx-auto">
            The reel you are looking for has been moved, deleted, or never existed in this cut.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-brand-gold text-brand-black font-medium tracking-wide uppercase text-sm rounded-full hover:bg-brand-gold/90 transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
