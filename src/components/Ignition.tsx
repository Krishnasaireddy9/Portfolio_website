"use client";

import Link from "next/link";
import { ArrowDownRight, Download } from "lucide-react";
import { personalInfo } from "@/data/resume";
import { AutoMarquee } from "./AutoMarquee";
import { DoorBadge } from "./DoorBadge";

export function Ignition() {
  return (
    <section
      id="ignition"
      className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Automotive marquee strip — behind all content */}
      <AutoMarquee />

      <div className="relative max-w-4xl mx-auto w-full text-center z-10">
        {/* Eyebrow with 00 Door Badge + Checkered Flag Accent */}
        <div
          className="hero-stagger flex items-center justify-center gap-3 mb-6"
          style={{ animationDelay: "0.05s" }}
        >
          <DoorBadge number="00" withFlag={true} />
          <span className="font-mono text-[10px] sm:text-xs text-telemetry-dim uppercase tracking-widest">
            SPEC — IGNITION
          </span>
        </div>

        {/* Name — Clash Display, stagger delay 0 */}
        <h1
          className="hero-stagger font-heading font-bold text-5xl sm:text-7xl md:text-8xl text-white tracking-wide uppercase"
          style={{ animationDelay: "0.1s" }}
        >
          {personalInfo.name}
        </h1>

        {/* Title Line — JetBrains Mono, stagger delay 80ms */}
        <p
          className="hero-stagger mt-4 font-mono text-xs sm:text-sm md:text-base text-telemetry-silver max-w-2xl mx-auto tracking-normal"
          style={{ animationDelay: "0.18s" }}
        >
          {personalInfo.roleTitle}
        </p>

        {/* Punch line — large, General Sans */}
        <p
          className="hero-stagger mt-6 font-body text-base sm:text-lg md:text-xl text-telemetry-silver/90 max-w-2xl mx-auto leading-relaxed font-normal"
          style={{ animationDelay: "0.26s" }}
        >
          I don&apos;t just train models — I ship the products they live in.
        </p>

        {/* CTAs — Clash Display */}
        <div
          className="hero-stagger mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ animationDelay: "0.34s" }}
        >
          <Link
            href="#the-garage"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-amber-burnt hover:bg-amber-burnt-light text-white font-heading font-semibold text-sm uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>The Garage</span>
            <ArrowDownRight size={16} strokeWidth={1.5} />
          </Link>

          <Link
            href="#contact-me"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-carbon-900/90 border border-gunmetal-border hover:border-amber-burnt text-telemetry-silver hover:text-white font-heading font-semibold text-sm uppercase tracking-wider transition-colors"
          >
            <span>Contact Me</span>
            <ArrowDownRight size={16} strokeWidth={1.5} />
          </Link>

          <a
            href={personalInfo.resumeUrl || "/resume.pdf"}
            download="Alla_Krishna_Sai_Reddy_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-carbon-900/90 border border-gunmetal-border hover:border-amber-burnt text-telemetry-silver hover:text-white font-heading font-semibold text-sm uppercase tracking-wider transition-colors group"
          >
            <span>Resume [PDF]</span>
            <Download size={16} strokeWidth={1.5} className="text-amber-burnt group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
