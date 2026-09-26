import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-black">
      <div className="flex flex-col items-center gap-4 text-brand-gold">
        <Loader2 className="w-10 h-10 animate-spin" />
        <span className="text-xs font-mono tracking-[0.2em] uppercase animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
}
