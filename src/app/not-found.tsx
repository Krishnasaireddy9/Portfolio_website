import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#07080a] text-[#e2e4ea] flex items-center justify-center p-4">
      <div className="max-w-md w-full p-8 rounded-2xl bg-[#0f1117] border border-[#252b3a] text-center shadow-2xl">
        <div className="inline-flex p-3 rounded-xl bg-[#ff5e1e]/10 border border-[#ff5e1e]/30 text-[#ff5e1e] mb-4">
          <AlertTriangle size={32} />
        </div>
        <div className="font-mono text-xs text-[#ff5e1e] tracking-widest uppercase mb-1">
          ERROR 404 // TELEMETRY LOST
        </div>
        <h1 className="font-heading font-black text-3xl text-white uppercase mb-2">
          Off Course
        </h1>
        <p className="text-sm text-[#9ca3af] font-body mb-6">
          The requested trajectory does not exist in the active telemetry map. Return to base coordinates.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#ff5e1e] text-white font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#ff7a45] transition-colors shadow-lg shadow-[#ff5e1e]/20"
        >
          <ArrowLeft size={16} />
          <span>Return to Ignition</span>
        </Link>
      </div>
    </div>
  );
}
