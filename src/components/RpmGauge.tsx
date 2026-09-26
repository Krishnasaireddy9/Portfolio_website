"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * RpmGauge — semi-circular tachometer (0–8 × 1000 RPM) with:
 *   • Tick marks labeled 0–8, "×1000 RPM"
 *   • Red-line zone from 6–8
 *   • Needle bound to scroll position (idle → redline as user scrolls)
 *   • One-time "ignition" boot animation on page load
 *   • onIgnitionComplete callback fires after boot so hero can fade in
 */

interface RpmGaugeProps {
  onIgnitionComplete?: () => void;
}

export function RpmGauge({ onIgnitionComplete }: RpmGaugeProps) {
  const [needleAngle, setNeedleAngle] = useState(-135); // idle = far left (-135° = 0 RPM)
  const [isBooting, setIsBooting] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  const runRevSweep = useCallback(() => {
    setIsBooting(true);
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    const startTime = performance.now();
    const bootDuration = 1400; // ms

    const animate = (now: number) => {
      const t = Math.min((now - startTime) / bootDuration, 1);

      // Sweep up to redline (+135°, full 8000 RPM) then back to idle (-135°)
      let angle: number;
      if (t < 0.45) {
        // Sweep up fast
        const p = t / 0.45;
        const ease = 1 - Math.pow(1 - p, 3);
        angle = -135 + ease * 270; // -135 → +135
      } else if (t < 0.55) {
        // Hold at redline (full)
        angle = 135;
      } else {
        // Rev down to idle
        const p = (t - 0.55) / 0.45;
        const ease = p * p * (3 - 2 * p); // smoothstep
        angle = 135 - ease * 270; // 135 → -135
      }

      setNeedleAngle(angle);

      if (t < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setNeedleAngle(-135);
        setIsBooting(false);
        onIgnitionComplete?.();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
  }, [onIgnitionComplete]);

  // Initial mount check: if intro is active, wait until ignition; otherwise rev immediately
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const seen = sessionStorage.getItem("has_seen_intro");
        const reduced = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;
        if (seen === "true" || reduced) {
          runRevSweep();
        } else {
          setNeedleAngle(-135);
          setIsBooting(true);
        }
      } catch {
        runRevSweep();
      }
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [runRevSweep]);

  // Listen for trigger-rpm-rev (when coming from SplashIntro) & power down
  useEffect(() => {
    const handleRev = () => {
      runRevSweep();
    };

    const handlePowerDown = () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      setNeedleAngle(-135);
      setIsBooting(true);
    };

    window.addEventListener("trigger-rpm-rev", handleRev);
    window.addEventListener("trigger-splash-intro", handlePowerDown);

    return () => {
      window.removeEventListener("trigger-rpm-rev", handleRev);
      window.removeEventListener("trigger-splash-intro", handlePowerDown);
    };
  }, [runRevSweep]);

  // Scroll-bound needle (only after boot finishes)
  useEffect(() => {
    if (isBooting) return;

    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0;
      // Map 0→1 progress to -135°→+135° needle sweep
      const angle = -135 + progress * 270;
      setNeedleAngle(angle);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set initial position
    return () => window.removeEventListener("scroll", onScroll);
  }, [isBooting]);

  /* ── SVG constants ── */
  const cx = 50;
  const cy = 52;
  const r = 38;
  // Arc runs from -135° to +135° (270° sweep), 0 at top-left, 8 at top-right
  const startAngle = -135;
  const totalSweep = 270;
  const tickCount = 9; // 0 through 8

  const polarToCart = (angleDeg: number, radius: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  };

  // Build arc path for background and redline
  const arcPath = (fromDeg: number, toDeg: number, radius: number) => {
    const start = polarToCart(fromDeg, radius);
    const end = polarToCart(toDeg, radius);
    const sweep = toDeg - fromDeg;
    const largeArc = sweep > 180 ? 1 : 0;
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`;
  };

  // Angles for the arc (SVG: 0° = right, rotated so -135° = bottom-left, +135° = bottom-right)
  // We rotate the conceptual gauge so 0 RPM is at bottom-left, 8 RPM is at bottom-right
  const arcStart = startAngle - 90; // In SVG coords
  const arcEnd = arcStart + totalSweep;

  // Redline zone: ticks 6–8 = 75%–100% of sweep
  const redlineStart = arcStart + (6 / 8) * totalSweep;
  const redlineEnd = arcEnd;

  return (
    <div className="w-[80px] h-[80px] sm:w-[88px] sm:h-[88px]">
      <svg viewBox="0 0 100 100" className="w-full h-full" aria-label="RPM tachometer gauge">
        {/* Background arc */}
        <path
          d={arcPath(arcStart, arcEnd, r)}
          fill="none"
          stroke="#232938"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Redline zone arc (6–8k RPM) */}
        <path
          d={arcPath(redlineStart, redlineEnd, r)}
          fill="none"
          stroke="#dc2626"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* Tick marks and labels */}
        {Array.from({ length: tickCount }).map((_, i) => {
          const frac = i / 8;
          const angleDeg = arcStart + frac * totalSweep;
          const outer = polarToCart(angleDeg, r - 1);
          const inner = polarToCart(angleDeg, r - (i % 2 === 0 ? 7 : 4));
          const label = polarToCart(angleDeg, r - 12);
          const isRedline = i >= 6;

          return (
            <g key={i}>
              <line
                x1={outer.x}
                y1={outer.y}
                x2={inner.x}
                y2={inner.y}
                stroke={isRedline ? "#dc2626" : i === 0 ? "#6B7280" : "#9ca3af"}
                strokeWidth={i % 2 === 0 ? "1.2" : "0.7"}
                strokeLinecap="round"
              />
              {i % 2 === 0 && (
                <text
                  x={label.x}
                  y={label.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill={isRedline ? "#dc2626" : "#9ca3af"}
                  fontSize="5.5"
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="500"
                >
                  {i}
                </text>
              )}
            </g>
          );
        })}

        {/* ×1000 RPM label */}
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          fill="#6B7280"
          fontSize="4"
          fontFamily="'JetBrains Mono', monospace"
          fontWeight="500"
        >
          ×1000 RPM
        </text>

        {/* Center hub */}
        <circle cx={cx} cy={cy} r="3" fill="#1f2434" stroke="#ff6b35" strokeWidth="1" />

        {/* Needle */}
        <line
          x1={cx}
          y1={cy}
          x2={cx}
          y2={cy - (r - 10)}
          stroke="#ff6b35"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{
            transformOrigin: `${cx}px ${cy}px`,
            transform: `rotate(${needleAngle}deg)`,
            transition: isBooting ? "none" : "transform 0.15s ease-out",
          }}
        />

        {/* Needle cap dot */}
        <circle cx={cx} cy={cy} r="1.5" fill="#ff6b35" />
      </svg>
    </div>
  );
}
