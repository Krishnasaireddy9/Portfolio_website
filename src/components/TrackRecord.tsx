"use client";

import React from "react";
import { experience } from "@/data/resume";
import { ExternalLink } from "lucide-react";
import { UnfoldingProse } from "./UnfoldingProse";
import { DoorBadge } from "./DoorBadge";
import { GearHeading } from "./GearHeading";

const HIGHLIGHT_CLAUSES: Record<string, React.ReactNode[]> = {
  // Manohar Organic Spices
  "Built and deployed a responsive multi-page static site with reusable components, shared layouts, and a centralized data layer for product management.": [
    <>Built and deployed a responsive multi-page static site with reusable components, shared layouts, </>,
    <>and a centralized data layer for product management.</>,
  ],
  "Implemented technical SEO (JSON-LD, XML sitemap, meta tags), validated with Google Rich Results Test.": [
    <>Implemented technical SEO (JSON-LD, XML sitemap, meta tags), </>,
    <>validated with Google Rich Results Test.</>,
  ],
  "Deployed on Cloudflare Workers with a custom domain, environment variables, and image optimization.": [
    <>Deployed on Cloudflare Workers with a custom domain, </>,
    <>environment variables, and image optimization.</>,
  ],

  // Sai Manikanta Tours & Travels
  "Built and launched a trilingual (English, Telugu, Hindi) website with tour package listings, fleet pages, and a WhatsApp deep-link inquiry flow to capture leads.": [
    <>Built and launched a trilingual (English, Telugu, Hindi) website with tour package listings and fleet pages, </>,
    <>and a WhatsApp deep-link inquiry flow to capture leads.</>,
  ],
  "Developed the React and TypeScript frontend and an admin CMS portal on Supabase (PostgreSQL, Auth, Storage, Edge Functions) so the owner updates content without code changes.": [
    <>Developed the React and TypeScript frontend and an admin CMS portal on Supabase (PostgreSQL, Auth, Storage, Edge Functions) </>,
    <>so the owner updates content without code changes.</>,
  ],
  "Implemented SEO infrastructure (sitemap.xml, robots.txt, hreflang, JSON-LD) and a rule-based travel assistant widget; deployed on Cloudflare Pages.": [
    <>Implemented SEO infrastructure (sitemap.xml, robots.txt, hreflang, JSON-LD) </>,
    <>and a rule-based travel assistant widget; </>,
    <>deployed on Cloudflare Pages.</>,
  ],
};

function getClauses(highlight: string): React.ReactNode[] {
  if (HIGHLIGHT_CLAUSES[highlight]) {
    return HIGHLIGHT_CLAUSES[highlight];
  }
  const parts = highlight.split(/(?<=[,;])\s+(?=and\b|so\b|with\b|deployed\b)|(?<=[;])\s+/);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}{i < parts.length - 1 ? " " : ""}
    </React.Fragment>
  ));
}

export function TrackRecord() {
  return (
    <section id="track-record" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Spec-sheet label + door badge + hairline */}
        <div className="flex items-center gap-3 sm:gap-4 mb-10">
          <DoorBadge number="03" />
          <span className="font-mono text-[10px] sm:text-xs text-telemetry-dim uppercase tracking-widest whitespace-nowrap">
            STATUS: IN SERVICE — Aug 2025 → Present
          </span>
          <div className="editorial-hairline flex-1" />
        </div>

        {/* Section Heading with Gear Engage Transition */}
        <GearHeading className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-wide uppercase">
          Track Record
        </GearHeading>

        <div className="mt-8">
          {/* Role line */}
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-wide uppercase">
            Freelance Full Stack Developer
          </h3>
          <p className="mt-1 font-body text-sm text-telemetry-muted">
            Self-Employed — Vijayawada, India
          </p>

          {/* Client Projects list */}
          <div className="mt-8 space-y-10">
            {experience.clientProjects.map((project, pIdx) => {
              const displayUrl = project.url.replace(/^https?:\/\//, "");

              return (
                <div key={project.name}>
                  {pIdx > 0 && <div className="editorial-hairline mb-8" />}

                  {/* Client line with amber mono highlights for client name & live URL, capped at 65ch */}
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-telemetry-silver max-w-[65ch] text-left">
                    <span className="font-mono text-xs text-telemetry-dim uppercase tracking-wider">Client:</span>
                    <span className="font-mono font-medium text-amber-burnt">
                      {project.name}
                    </span>
                    <span className="text-telemetry-dim">—</span>
                    <span className="font-body text-xs text-telemetry-muted">live at</span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono font-medium text-amber-burnt underline underline-offset-4 decoration-amber-burnt/40 hover:decoration-amber-burnt transition-colors text-xs sm:text-sm"
                    >
                      <span>{displayUrl}</span>
                      <ExternalLink size={12} strokeWidth={1.5} />
                    </a>
                  </div>

                  {/* Editorial hairline before bullets */}
                  <div className="editorial-hairline mt-5 mb-5 max-w-[65ch]" />

                  {/* Project highlights with 65ch cap and clause-by-clause reveal */}
                  <ul className="space-y-3 font-body text-sm text-telemetry-silver leading-relaxed">
                    {project.highlights.map((highlight, index) => (
                      <li key={index} className="flex gap-3 max-w-[65ch] text-left">
                        <span className="text-amber-burnt mt-1 flex-shrink-0 select-none">—</span>
                        <UnfoldingProse
                          as="span"
                          className="flex-1 font-body text-sm text-telemetry-silver leading-relaxed"
                          clauses={getClauses(highlight)}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
