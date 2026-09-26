import { personalInfo } from "@/data/resume";
import { Mail, Phone, Github, Linkedin, ExternalLink } from "lucide-react";
import { DoorBadge } from "./DoorBadge";
import { GearHeading } from "./GearHeading";

export function PitStop() {
  return (
    <section id="contact-me" className="py-24 px-4 sm:px-6 lg:px-8">
      {/* Anchor for backward compatibility if needed */}
      <div id="pit-stop" className="sr-only" />
      <div className="max-w-4xl mx-auto">
        {/* Spec-sheet label + door badge + hairline */}
        <div className="flex items-center gap-3 sm:gap-4 mb-10">
          <DoorBadge number="05" />
          <span className="font-mono text-[10px] sm:text-xs text-telemetry-dim uppercase tracking-widest whitespace-nowrap">
            COMMS — CONTACT
          </span>
          <div className="editorial-hairline flex-1" />
        </div>

        {/* Section Heading with Gear Engage Transition */}
        <GearHeading className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-wide uppercase">
          Contact Me
        </GearHeading>

        <div className="mt-8">
          <p className="font-body text-sm sm:text-base text-telemetry-silver mb-8 max-w-[65ch]">
            Reach out — email or phone, both work.
          </p>

          {/* Email and Phone */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 text-sm font-mono">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2.5 text-telemetry-silver hover:text-white transition-colors"
            >
              <Mail size={16} strokeWidth={1.5} className="text-amber-burnt" />
              <span className="underline underline-offset-4 decoration-gunmetal-highlight hover:decoration-amber-burnt transition-colors">
                {personalInfo.email}
              </span>
            </a>

            <a
              href={`tel:${personalInfo.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2.5 text-telemetry-silver hover:text-white transition-colors"
            >
              <Phone size={16} strokeWidth={1.5} className="text-amber-burnt" />
              <span className="underline underline-offset-4 decoration-gunmetal-highlight hover:decoration-amber-burnt transition-colors">
                {personalInfo.phone}
              </span>
            </a>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-8 border-t border-gunmetal-border/50 flex flex-wrap items-center gap-6 text-xs font-mono">
            {personalInfo.githubUrl && (
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-telemetry-silver hover:text-white transition-colors"
              >
                <Github size={14} strokeWidth={1.5} />
                <span>GitHub</span>
                <ExternalLink size={10} strokeWidth={1.5} />
              </a>
            )}

            {personalInfo.linkedinUrl && (
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-telemetry-silver hover:text-white transition-colors"
              >
                <Linkedin size={14} strokeWidth={1.5} />
                <span>LinkedIn</span>
                <ExternalLink size={10} strokeWidth={1.5} />
              </a>
            )}

            {personalInfo.huggingfaceUrl && (
              <a
                href={personalInfo.huggingfaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-telemetry-silver hover:text-white transition-colors"
              >
                <span className="text-sm leading-none">🤗</span>
                <span>Hugging Face</span>
                <ExternalLink size={10} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
