"use client";

import React, { useState } from "react";
import { skillGroups } from "@/data/resume";

export function EngineBayDiagram() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Map category IDs to their schematic metadata
  const nodes = [
    {
      id: "languages",
      title: "Languages",
      code: "SYS-01",
      analog: "ECU & Ignition",
      point: { x: 260, y: 130 },
      elbow: { x: 170, y: 95 },
      labelPos: { x: 40, y: 95 },
      side: "left",
    },
    {
      id: "ml",
      title: "Machine Learning",
      code: "SYS-02",
      analog: "Turbo & Cylinder Block",
      point: { x: 280, y: 240 },
      elbow: { x: 170, y: 240 },
      labelPos: { x: 40, y: 240 },
      side: "left",
    },
    {
      id: "genai",
      title: "Generative AI & LLMs",
      code: "SYS-03",
      analog: "High-Flow Induction Plenum",
      point: { x: 300, y: 350 },
      elbow: { x: 180, y: 385 },
      labelPos: { x: 40, y: 385 },
      side: "left",
    },
    {
      id: "fullstack",
      title: "Full-Stack & APIs",
      code: "SYS-04",
      analog: "Drive Interface Unit",
      point: { x: 640, y: 130 },
      elbow: { x: 730, y: 95 },
      labelPos: { x: 860, y: 95 },
      side: "right",
    },
    {
      id: "databases",
      title: "Databases & Vector Search",
      code: "SYS-05",
      analog: "Fuel & Vector Reservoir",
      point: { x: 620, y: 240 },
      elbow: { x: 730, y: 240 },
      labelPos: { x: 860, y: 240 },
      side: "right",
    },
    {
      id: "cloud",
      title: "Cloud & Tools",
      code: "SYS-06",
      analog: "Exhaust & Thermal Core",
      point: { x: 600, y: 350 },
      elbow: { x: 720, y: 385 },
      labelPos: { x: 860, y: 385 },
      side: "right",
    },
  ];

  const activeGroup = skillGroups.find((g) => g.id === activeCategory);

  return (
    <div className="relative w-full select-none">
      {/* Interactive Status Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-telemetry-dim mb-4 px-2">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-burnt animate-pulse" />
          <span>DIAGNOSTIC SCHEMATIC — 6 SUBSYSTEMS</span>
        </span>
        <span className="hidden sm:inline text-telemetry-muted">
          [HOVER OR TAP NODES TO INSPECT]
        </span>
      </div>

      {/* Main Diagram Stage */}
      <div className="relative w-full rounded-xl border border-gunmetal-border/50 bg-[#0d0f14]/60 p-2 sm:p-4 overflow-hidden">
        {/* Responsive SVG Schematic */}
        <div className="w-full relative aspect-[900/500] max-h-[520px]">
          <svg
            viewBox="0 0 900 500"
            className="w-full h-full overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Radial gradient for active node glow */}
              <radialGradient id="node-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ff6b35" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
              </radialGradient>

              {/* Grid pattern for engine compartment floor */}
              <pattern
                id="engine-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.02)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            {/* ─── Engine Bay Compartment Architecture ─── */}
            {/* Bay floor */}
            <rect
              x="180"
              y="40"
              width="540"
              height="420"
              rx="18"
              fill="#0a0c10"
              stroke="#1e222d"
              strokeWidth="1.5"
            />
            <rect
              x="180"
              y="40"
              width="540"
              height="420"
              rx="18"
              fill="url(#engine-grid)"
            />

            {/* Strut Towers (Left & Right) */}
            <circle cx="210" cy="180" r="32" fill="#141720" stroke="#2b3142" strokeWidth="1.5" />
            <circle cx="210" cy="180" r="16" fill="#0d0f14" stroke="#ff6b35" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="690" cy="180" r="32" fill="#141720" stroke="#2b3142" strokeWidth="1.5" />
            <circle cx="690" cy="180" r="16" fill="#0d0f14" stroke="#ff6b35" strokeWidth="1" strokeDasharray="3 3" />

            {/* Strut Tower Brace Bar (Running across top) */}
            <path
              d="M 210 180 Q 450 110 690 180"
              stroke="#2d3548"
              strokeWidth="5"
              fill="none"
            />
            <path
              d="M 210 180 Q 450 110 690 180"
              stroke="#ff6b35"
              strokeWidth="1"
              strokeDasharray="8 6"
              fill="none"
              opacity="0.6"
            />

            {/* Front Radiator & Intercooler Core */}
            <rect
              x="260"
              y="410"
              width="380"
              height="40"
              rx="6"
              fill="#12151e"
              stroke="#2e3549"
              strokeWidth="1.5"
            />
            {/* Radiator Cooling Fins */}
            {Array.from({ length: 24 }).map((_, i) => (
              <line
                key={`fin-${i}`}
                x1={275 + i * 15}
                y1="416"
                x2={275 + i * 15}
                y2="444"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1"
              />
            ))}

            {/* Twin Radiator Electric Fans */}
            <circle cx="390" cy="430" r="14" fill="#0a0c10" stroke="#2e3549" strokeWidth="1" />
            <circle cx="510" cy="430" r="14" fill="#0a0c10" stroke="#2e3549" strokeWidth="1" />

            {/* ─── Central Engine Block (Cylinder Head & Valve Covers) ─── */}
            <rect
              x="340"
              y="140"
              width="220"
              height="240"
              rx="14"
              fill="#141822"
              stroke="#384055"
              strokeWidth="2"
            />

            {/* Twin Cam Valve Covers */}
            <rect x="355" y="160" width="85" height="200" rx="8" fill="#181c28" stroke="#2b3244" strokeWidth="1" />
            <rect x="460" y="160" width="85" height="200" rx="8" fill="#181c28" stroke="#2b3244" strokeWidth="1" />

            {/* Spark Plug & Coil Pack Galleries (4 cylinders) */}
            {[0, 1, 2, 3].map((cyl) => (
              <g key={`cyl-${cyl}`}>
                <circle cx="397" cy={185 + cyl * 48} r="8" fill="#0a0c10" stroke="#ff6b35" strokeWidth="1.2" />
                <circle cx="397" cy={185 + cyl * 48} r="3" fill="#ff6b35" />
                <circle cx="503" cy={185 + cyl * 48} r="8" fill="#0a0c10" stroke="#ff6b35" strokeWidth="1.2" />
                <circle cx="503" cy={185 + cyl * 48} r="3" fill="#ff6b35" />
              </g>
            ))}

            {/* Oil Filler Cap & Timing Belt Cover */}
            <rect x="380" y="142" width="140" height="14" rx="4" fill="#1c2130" stroke="#3d4760" strokeWidth="1" />
            <circle cx="450" cy="149" r="6" fill="#ff6b35" />

            {/* ─── Left Side: Turbocharger & Intake Plenum ─── */}
            {/* Turbo Compressor Housing */}
            <circle cx="280" cy="240" r="26" fill="#161b26" stroke="#404b66" strokeWidth="1.8" />
            <circle cx="280" cy="240" r="14" fill="#0d1017" stroke="#ff6b35" strokeWidth="1" />
            {/* Impeller Blades */}
            <line x1="280" y1="230" x2="280" y2="250" stroke="#ff6b35" strokeWidth="1.5" />
            <line x1="270" y1="240" x2="290" y2="240" stroke="#ff6b35" strokeWidth="1.5" />

            {/* Boost Charge Pipe from Turbo to Radiator */}
            <path
              d="M 280 266 L 280 390 L 330 410"
              stroke="#384058"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
            />

            {/* Intake Manifold Runners (Languages & Generative AI) */}
            <path
              d="M 340 200 C 310 200, 310 240, 290 240"
              stroke="#2e364a"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M 340 280 C 310 280, 310 320, 290 340"
              stroke="#2e364a"
              strokeWidth="3"
              fill="none"
            />

            {/* ECU Module Box (Languages) */}
            <rect
              x="230"
              y="90"
              width="60"
              height="50"
              rx="6"
              fill="#161a25"
              stroke="#3a445d"
              strokeWidth="1.5"
            />
            <rect x="238" y="98" width="44" height="6" fill="#ff6b35" opacity="0.8" />
            <line x1="238" y1="112" x2="282" y2="112" stroke="#4a5575" strokeWidth="1" strokeDasharray="3 2" />
            <line x1="238" y1="122" x2="282" y2="122" stroke="#4a5575" strokeWidth="1" strokeDasharray="3 2" />

            {/* ─── Right Side: Transmission, Fuel Rail & Exhaust ─── */}
            {/* Transmission Bellhousing Unit (Full-Stack & APIs) */}
            <path
              d="M 560 160 L 650 110 L 670 150 L 560 210 Z"
              fill="#161a25"
              stroke="#38425a"
              strokeWidth="1.5"
            />
            <circle cx="630" cy="140" r="10" fill="#0d1017" stroke="#ff6b35" strokeWidth="1" />

            {/* Fuel Rail & Vector Reservoir Sump (Databases & Vector Search) */}
            <rect
              x="575"
              y="215"
              width="70"
              height="45"
              rx="8"
              fill="#181c28"
              stroke="#3a445d"
              strokeWidth="1.5"
            />
            <line x1="585" y1="230" x2="635" y2="230" stroke="#ff6b35" strokeWidth="1.5" />
            <line x1="585" y1="242" x2="635" y2="242" stroke="#e2e4ea" strokeWidth="1" strokeDasharray="4 2" />

            {/* Thermal Exhaust Manifold / Cloud Infrastructure */}
            <path
              d="M 560 300 C 600 300, 620 330, 600 360 L 580 400"
              stroke="#434d67"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
            />

            {/* ─── Six Interactive Leader Lines & Hotspot Target Nodes ─── */}
            {nodes.map((node) => {
              const isActive = activeCategory === node.id;
              const isLeft = node.side === "left";

              return (
                <g key={node.id} className="cursor-pointer">
                  {/* Leader Line (technical drafting line with elbow) */}
                  <polyline
                    points={`${node.point.x},${node.point.y} ${node.elbow.x},${node.elbow.y} ${
                      isLeft ? node.elbow.x - 70 : node.elbow.x + 70
                    },${node.elbow.y}`}
                    stroke={isActive ? "#ff6b35" : "#3e485e"}
                    strokeWidth={isActive ? "2" : "1.2"}
                    strokeDasharray={isActive ? "none" : "3 3"}
                    className="transition-all duration-200"
                    fill="none"
                  />

                  {/* Hotspot Target Node on Engine */}
                  <g
                    transform={`translate(${node.point.x}, ${node.point.y})`}
                    onClick={() =>
                      setActiveCategory(activeCategory === node.id ? null : node.id)
                    }
                    onMouseEnter={() => setActiveCategory(node.id)}
                  >
                    {/* Outer Glow on hover */}
                    {isActive && (
                      <circle
                        cx="0"
                        cy="0"
                        r="18"
                        fill="url(#node-glow)"
                        className="animate-pulse"
                      />
                    )}

                    {/* Outer ring */}
                    <circle
                      cx="0"
                      cy="0"
                      r="9"
                      fill="#0d1017"
                      stroke={isActive ? "#ff6b35" : "#5d6783"}
                      strokeWidth={isActive ? "2" : "1.2"}
                      className="transition-all duration-200"
                    />

                    {/* Center Core dot */}
                    <circle
                      cx="0"
                      cy="0"
                      r="4"
                      fill={isActive ? "#ffffff" : "#ff6b35"}
                      className="transition-colors duration-200"
                    />
                  </g>
                </g>
              );
            })}
          </svg>

          {/* ─── HTML Overlay: 6 Interactive Labels positioned on flanks ─── */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Left 3 Labels */}
            <div className="absolute left-2 sm:left-4 top-0 bottom-0 flex flex-col justify-around py-4 w-44 sm:w-56 pointer-events-auto">
              {nodes.slice(0, 3).map((node) => {
                const isActive = activeCategory === node.id;
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setActiveCategory(node.id)}
                    onClick={() =>
                      setActiveCategory(activeCategory === node.id ? null : node.id)
                    }
                    className="relative cursor-pointer group text-left"
                  >
                    <div
                      className={`inline-block px-2.5 py-1.5 rounded-lg border transition-all duration-200 backdrop-blur-md ${
                        isActive
                          ? "bg-[#181c26] border-amber-burnt shadow-[0_0_12px_rgba(255,107,53,0.35)]"
                          : "bg-[#10131a]/85 border-gunmetal-border hover:border-amber-burnt/50"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-[9px] font-bold text-amber-burnt">
                          {node.code}
                        </span>
                        <span className="text-[10px] text-telemetry-dim hidden sm:inline">
                          · {node.analog}
                        </span>
                      </div>
                      <h4
                        className={`font-heading font-semibold text-xs sm:text-sm tracking-wide transition-colors ${
                          isActive ? "text-white" : "text-telemetry-silver group-hover:text-white"
                        }`}
                      >
                        {node.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 3 Labels */}
            <div className="absolute right-2 sm:right-4 top-0 bottom-0 flex flex-col justify-around py-4 w-44 sm:w-56 pointer-events-auto text-right">
              {nodes.slice(3, 6).map((node) => {
                const isActive = activeCategory === node.id;
                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setActiveCategory(node.id)}
                    onClick={() =>
                      setActiveCategory(activeCategory === node.id ? null : node.id)
                    }
                    className="relative cursor-pointer group text-right"
                  >
                    <div
                      className={`inline-block px-2.5 py-1.5 rounded-lg border transition-all duration-200 backdrop-blur-md ${
                        isActive
                          ? "bg-[#181c26] border-amber-burnt shadow-[0_0_12px_rgba(255,107,53,0.35)]"
                          : "bg-[#10131a]/85 border-gunmetal-border hover:border-amber-burnt/50"
                      }`}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-[10px] text-telemetry-dim hidden sm:inline">
                          {node.analog} ·
                        </span>
                        <span className="font-mono text-[9px] font-bold text-amber-burnt">
                          {node.code}
                        </span>
                      </div>
                      <h4
                        className={`font-heading font-semibold text-xs sm:text-sm tracking-wide transition-colors ${
                          isActive ? "text-white" : "text-telemetry-silver group-hover:text-white"
                        }`}
                      >
                        {node.title}
                      </h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── HUD Tooltip / Telemetry Expansion Card (reveals on hover/tap) ─── */}
        <div className="mt-3 pt-3 border-t border-gunmetal-border/50 min-h-[76px] flex items-center justify-center transition-all">
          {activeGroup ? (
            <div
              key={activeGroup.id}
              className="w-full max-w-3xl bg-[#141822]/90 border border-amber-burnt/60 rounded-lg p-3.5 sm:p-4 shadow-[0_4px_20px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 pb-2 mb-2 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-burnt">
                    {activeGroup.code}
                  </span>
                  <span className="font-heading font-bold text-sm sm:text-base text-white tracking-wide uppercase">
                    {activeGroup.category}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-telemetry-dim uppercase">
                  {nodes.find((n) => n.id === activeGroup.id)?.analog}
                </span>
              </div>

              {/* Exact skill items list */}
              <p className="font-body text-xs sm:text-sm text-telemetry-silver leading-relaxed">
                {activeGroup.items.join(", ")}
              </p>
            </div>
          ) : (
            <div className="text-center py-2 text-telemetry-dim font-mono text-xs tracking-wider">
              <span>HOVER OR TAP ANY SUBSYSTEM LABEL TO EXPAND TELEMETRY SPECIFICATIONS</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
