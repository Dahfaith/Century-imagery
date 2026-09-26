import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="w-full h-[60vh] flex flex-col items-center justify-center gap-4 text-brand-muted">
      <Loader2 className="w-8 h-8 animate-spin text-brand-gold" />
      <p className="text-sm font-mono tracking-widest uppercase animate-pulse">
        Loading Data...
      </p>
    </div>
  );
}
