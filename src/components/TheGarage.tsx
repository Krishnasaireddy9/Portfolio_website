"use client";

import React from "react";
import { projects } from "@/data/resume";
import { UnfoldingProse } from "./UnfoldingProse";
import { DoorBadge } from "./DoorBadge";
import { GearHeading } from "./GearHeading";

const PROJECT_CLAUSES: Record<string, React.ReactNode[]> = {
  "klerk-ai": [
    <>Turns a WhatsApp message into a filed invoice </>,
    <>— no human required.</>,
  ],
  "jobjutsu-ai": [
    <>Reads your resume, </>,
    <>checks it against the job, </>,
    <>tells you what&apos;s missing.</>,
  ],
  "diabetic-retinopathy": [
    <>Trained to read retinal scans the way a specialist would — </>,
    <>
      <span className="font-mono font-medium text-amber-burnt">
        82% validation accuracy
      </span>
      ,{" "}
    </>,
    <>published in IRJET.</>,
  ],
};

function getProjectClauses(project: { id: string; description: string }): React.ReactNode[] {
  if (PROJECT_CLAUSES[project.id]) {
    return PROJECT_CLAUSES[project.id];
  }
  const parts = project.description.split(/(?<=[—,;])\s+/);
  return parts.map((part, i) => (
    <React.Fragment key={i}>
      {part}{i < parts.length - 1 ? " " : ""}
    </React.Fragment>
  ));
}

export function TheGarage() {
  return (
    <section id="the-garage" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Spec-sheet label + door badge + hairline */}
        <div className="flex items-center gap-3 sm:gap-4 mb-10">
          <DoorBadge number="04" />
          <span className="font-mono text-[10px] sm:text-xs text-telemetry-dim uppercase tracking-widest whitespace-nowrap">
            SPEC — BUILDS
          </span>
          <div className="editorial-hairline flex-1" />
        </div>

        {/* Section Heading with Gear Engage Transition */}
        <GearHeading className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-wide uppercase">
          The Garage
        </GearHeading>

        <div className="mt-10">
          {projects.map((project, idx) => (
            <div key={project.id}>
              <article className="py-8">
                {/* Build number tag */}
                <span className="font-mono text-[10px] sm:text-xs text-amber-burnt uppercase tracking-[0.2em] font-medium">
                  BUILD {String(idx + 1).padStart(3, "0")}
                </span>

                {/* Project name */}
                <h3 className="mt-3 font-heading font-bold text-xl sm:text-2xl text-white tracking-wide uppercase">
                  {project.title}
                </h3>

                {/* One punchy line with 65ch cap, standout figure highlight, and clause reveal */}
                <UnfoldingProse
                  className="mt-3 font-body text-sm sm:text-base text-telemetry-silver leading-relaxed max-w-[65ch] text-left"
                  clauses={getProjectClauses(project)}
                />

                {/* Tech stack as dot-separated inline text */}
                <p className="mt-4 font-mono text-xs text-telemetry-muted leading-relaxed max-w-[65ch]">
                  {project.stack.map((tech, i) => (
                    <span key={tech}>
                      {tech}
                      {i < project.stack.length - 1 && (
                        <span className="mx-1.5 text-telemetry-dim">·</span>
                      )}
                    </span>
                  ))}
                </p>

                {/* Plain underlined links */}
                <div className="mt-4 flex flex-wrap items-center gap-5 text-xs font-mono">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target={project.liveUrl !== "#" ? "_blank" : undefined}
                      rel={project.liveUrl !== "#" ? "noopener noreferrer" : undefined}
                      className="text-telemetry-silver hover:text-white underline underline-offset-4 decoration-gunmetal-highlight hover:decoration-amber-burnt transition-colors"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target={project.githubUrl !== "#" ? "_blank" : undefined}
                      rel={project.githubUrl !== "#" ? "noopener noreferrer" : undefined}
                      className="text-telemetry-silver hover:text-white underline underline-offset-4 decoration-gunmetal-highlight hover:decoration-amber-burnt transition-colors"
                    >
                      GitHub
                    </a>
                  )}
                  {project.publicationUrl && (
                    <a
                      href={project.publicationUrl}
                      target={project.publicationUrl !== "#" ? "_blank" : undefined}
                      rel={project.publicationUrl !== "#" ? "noopener noreferrer" : undefined}
                      className="text-telemetry-silver hover:text-white underline underline-offset-4 decoration-gunmetal-highlight hover:decoration-amber-burnt transition-colors"
                    >
                      Paper (IRJET)
                    </a>
                  )}
                </div>
              </article>

              {/* Hairline between entries */}
              {idx < projects.length - 1 && (
                <div className="editorial-hairline" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
