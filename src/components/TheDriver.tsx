import { UnfoldingProse } from "./UnfoldingProse";
import { DoorBadge } from "./DoorBadge";
import { GearHeading } from "./GearHeading";

export function TheDriver() {
  const driverClauses = [
    <>AI/ML engineer who also builds the full product around the model — </>,
    <>
      training and evaluation in{" "}
      <span className="font-mono font-medium text-amber-burnt">PyTorch</span> and{" "}
      <span className="font-mono font-medium text-amber-burnt">TensorFlow</span>,{" "}
    </>,
    <>
      then the APIs and interfaces in{" "}
      <span className="font-mono font-medium text-amber-burnt">FastAPI</span> and{" "}
      <span className="font-mono font-medium text-amber-burnt">Next.js</span> that put it in front of real users.{" "}
    </>,
    <>
      <span className="font-mono font-medium text-amber-burnt">Published researcher</span> in medical image classification.
    </>,
  ];

  return (
    <section id="the-driver" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Spec-sheet label + door badge + hairline */}
        <div className="flex items-center gap-3 sm:gap-4 mb-10">
          <DoorBadge number="01" />
          <span className="font-mono text-[10px] sm:text-xs text-telemetry-dim uppercase tracking-widest whitespace-nowrap">
            SPEC — DRIVER PROFILE
          </span>
          <div className="editorial-hairline flex-1" />
        </div>

        {/* Section Heading with Gear Engage Transition */}
        <GearHeading className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-wide uppercase">
          The Driver
        </GearHeading>

        {/* Capped at ~60-65ch with natural ragged right edge + clause reveal */}
        <div className="mt-8">
          <UnfoldingProse
            className="font-body text-base sm:text-lg text-telemetry-silver leading-relaxed max-w-[65ch] text-left"
            clauses={driverClauses}
          />
        </div>

        {/* Education tag */}
        <div className="mt-8 pt-6 border-t border-gunmetal-border/50 max-w-[65ch]">
          <span className="font-mono text-xs sm:text-sm text-telemetry-muted">
            B.Tech, Computer Science (AI &amp; ML) — Lovely Professional University, 2021–2025
          </span>
        </div>
      </div>
    </section>
  );
}
