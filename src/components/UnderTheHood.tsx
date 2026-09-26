import { DoorBadge } from "./DoorBadge";
import { GearHeading } from "./GearHeading";
import { EngineBayDiagram } from "./EngineBayDiagram";

export function UnderTheHood() {
  return (
    <section id="under-the-hood" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Spec-sheet label + door badge + hairline */}
        <div className="flex items-center gap-3 sm:gap-4 mb-10">
          <DoorBadge number="02" />
          <span className="font-mono text-[10px] sm:text-xs text-telemetry-dim uppercase tracking-widest whitespace-nowrap">
            SPEC — SYSTEMS PIPELINE
          </span>
          <div className="editorial-hairline flex-1" />
        </div>

        {/* Section Heading with Gear Engage Transition */}
        <GearHeading className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-wide uppercase">
          Under the Hood
        </GearHeading>

        {/* Engine-Bay Diagram Centerpiece (only skills content) */}
        <div className="mt-10">
          <EngineBayDiagram />
        </div>
      </div>
    </section>
  );
}
