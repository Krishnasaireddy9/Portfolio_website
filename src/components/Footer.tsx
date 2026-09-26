"use client";

import { personalInfo } from "@/data/resume";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-gunmetal-border/50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-heading font-semibold text-sm uppercase text-white tracking-wider">
            {personalInfo.name}
          </span>
          <span className="text-telemetry-dim">·</span>
          <span className="font-mono text-xs text-telemetry-muted">
            {personalInfo.location}
          </span>
        </div>

        <button
          onClick={scrollToTop}
          className="font-mono text-xs text-telemetry-muted hover:text-white transition-colors"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  );
}
