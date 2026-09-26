"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const STORAGE_KEY = "has_seen_intro";

export function SplashIntro() {
  const [mounted, setMounted] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        if (sessionStorage.getItem(STORAGE_KEY) === "true") {
          return false;
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return false;
        }
      } catch { }
    }
    return true;
  });
  const [buttonVisible, setButtonVisible] = useState(true);
  const [headlightsOn, setHeadlightsOn] = useState(false);
  const [isEngineShaking, setIsEngineShaking] = useState(false);
  const [isAccelerating, setIsAccelerating] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isFadingOverlay, setIsFadingOverlay] = useState(false);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const ignitedRef = useRef(false);

  const handleSkip = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch { }
    document.body.style.overflow = "";
    document.documentElement.classList.remove("showing-intro");
    document.documentElement.classList.add("skip-intro");
    window.scrollTo({ top: 0, left: 0 });
    setMounted(false);
    window.dispatchEvent(new CustomEvent("splash-intro-complete"));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && mounted) {
      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("showing-intro");
      document.documentElement.classList.remove("skip-intro");
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mounted]);

  // Listen for trigger-splash-intro (e.g. when left side moving car is clicked)
  useEffect(() => {
    const handleTrigger = () => {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch { }
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      ignitedRef.current = false;
      setButtonVisible(true);
      setHeadlightsOn(false);
      setIsEngineShaking(false);
      setIsAccelerating(false);
      setIsFlashing(false);
      setIsFadingOverlay(false);
      setMounted(true);
      document.body.style.overflow = "hidden";
      document.documentElement.classList.remove("skip-intro");
      document.documentElement.classList.add("showing-intro");
      window.scrollTo({ top: 0, left: 0 });
    };

    window.addEventListener("trigger-splash-intro", handleTrigger);
    return () =>
      window.removeEventListener("trigger-splash-intro", handleTrigger);
  }, []);

  // Handle ESC key to skip
  useEffect(() => {
    if (!mounted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mounted, handleSkip]);

  const handleIgnition = () => {
    if (ignitedRef.current) return;
    ignitedRef.current = true;

    // 1. Button fades out (150ms)
    setButtonVisible(false);

    // 2. Headlights ignite: quick double-flicker (off→on→off→on, ~80ms each)
    // t = 150ms: 1st ON
    timeoutsRef.current.push(
      setTimeout(() => {
        setHeadlightsOn(true);
      }, 150)
    );

    // t = 230ms: 1st OFF
    timeoutsRef.current.push(
      setTimeout(() => {
        setHeadlightsOn(false);
      }, 230)
    );

    // t = 310ms: 2nd ON
    timeoutsRef.current.push(
      setTimeout(() => {
        setHeadlightsOn(true);
      }, 310)
    );

    // t = 390ms: 2nd OFF
    timeoutsRef.current.push(
      setTimeout(() => {
        setHeadlightsOn(false);
      }, 390)
    );

    // t = 470ms: Settles to steady bright glow!
    timeoutsRef.current.push(
      setTimeout(() => {
        setHeadlightsOn(true);
        // 3. Engine-idle effect: car shakes very slightly (300-400ms)
        setIsEngineShaking(true);
      }, 470)
    );

    // t = 850ms: Engine turns over, idle shake stops, accelerating zoom begins
    timeoutsRef.current.push(
      setTimeout(() => {
        setIsEngineShaking(false);
        // 4. Car scales up rapidly with accelerating ease-in curve over ~1.25s
        setHeadlightsOn(true);
        setIsAccelerating(true);
      }, 850)
    );

    // t = 2050ms: Peak of scale, full-screen white flash (<150ms)
    timeoutsRef.current.push(
      setTimeout(() => {
        setIsFlashing(true);
      }, 2050)
    );

    // t = 2150ms: Flash ends, overlay crossfade begins, scroll immediately to top & trigger RPM rev!
    timeoutsRef.current.push(
      setTimeout(() => {
        setIsFlashing(false);
        setIsFadingOverlay(true);
        try {
          sessionStorage.setItem(STORAGE_KEY, "true");
        } catch { }
        document.documentElement.classList.remove("showing-intro");
        document.documentElement.classList.add("skip-intro");
        document.body.style.overflow = "";
        window.scrollTo({ top: 0, left: 0 });
        // Automatically sweep RPM gauge needle to full redline as main page is revealed!
        window.dispatchEvent(new CustomEvent("trigger-rpm-rev"));
        window.dispatchEvent(new CustomEvent("splash-intro-complete"));
      }, 2150)
    );

    // t = 2450ms: Crossfade complete (under 2.5s total), unmount overlay
    timeoutsRef.current.push(
      setTimeout(() => {
        handleSkip();
      }, 2450)
    );
  };

  if (!mounted) return null;

  return (
    <div
      id="splash-intro-overlay"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] ${
        isFadingOverlay
          ? "transition-opacity duration-300 opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 3px),
          repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.02) 0px, rgba(255, 255, 255, 0.02) 1px, transparent 1px, transparent 3px)
        `,
        backgroundSize: "5px 5px",
      }}
      aria-label="Ignition intro screen"
    >
      {/* Skip button in top corner */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 sm:top-8 sm:right-8 font-mono text-xs text-telemetry-dim hover:text-white uppercase tracking-widest transition-colors py-2 px-3 z-30 cursor-pointer"
      >
        Skip [esc] →
      </button>

      {/* Main Centered Stage */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-lg px-4">
        {/* Car Container */}
        <div
          className={`relative will-change-transform ${isAccelerating
              ? "car-zooming-forward"
              : isEngineShaking
                ? "engine-shaking"
                : ""
            }`}
          style={{
            transformOrigin: "center 65%",
            transform:
              !isAccelerating && !isEngineShaking
                ? "scale(0.28) translateY(0px)"
                : undefined,
          }}
        >
          {/* Front-Facing Vintage 90s Japanese Sports Coupe Silhouette */}
          <svg
            width="340"
            height="180"
            viewBox="0 0 340 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            <defs>
              {/* Headlight bloom glow filter */}
              <filter
                id="intro-headlight-bloom"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="4" result="blur1" />
                <feGaussianBlur stdDeviation="10" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Conical Headlight Beams forward toward viewer */}
              <linearGradient
                id="intro-beam-left"
                x1="0.5"
                y1="0"
                x2="0.15"
                y2="1"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="25%" stopColor="#ffb055" stopOpacity="0.5" />
                <stop offset="65%" stopColor="#ff6b35" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
              </linearGradient>

              <linearGradient
                id="intro-beam-right"
                x1="0.5"
                y1="0"
                x2="0.85"
                y2="1"
              >
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="25%" stopColor="#ffb055" stopOpacity="0.5" />
                <stop offset="65%" stopColor="#ff6b35" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Projected Headlight Beams when on */}
            {headlightsOn && (
              <g className="transition-opacity duration-75">
                <polygon
                  points="82,92 98,92 180,260 0,260"
                  fill="url(#intro-beam-left)"
                />
                <polygon
                  points="242,92 258,92 340,260 160,260"
                  fill="url(#intro-beam-right)"
                />
              </g>
            )}

            {/* Tires (low-profile wide stance) */}
            <rect
              x="26"
              y="108"
              width="26"
              height="36"
              rx="4"
              fill="#080c12"
              stroke="#131e2e"
              strokeWidth="1"
            />
            <rect
              x="288"
              y="108"
              width="26"
              height="36"
              rx="4"
              fill="#080c12"
              stroke="#131e2e"
              strokeWidth="1"
            />

            {/* Roof & Greenhouse */}
            {/* Roof Top */}
            <path
              d="M 112 28 Q 170 23 228 28 L 225 32 Q 170 27 115 32 Z"
              fill="#162844"
              stroke="#21487eff"
              strokeWidth="0.75"
            />

            {/* Windshield */}
            <polygon
              points="114,31 226,31 254,72 86,72"
              fill="#070c14"
              stroke="#192c45"
              strokeWidth="1"
            />

            {/* Rearview mirror */}
            <rect
              x="164"
              y="37"
              width="12"
              height="6"
              rx="1.5"
              fill="#12233c"
              stroke="#21487eff"
              strokeWidth="0.75"
            />

            {/* Windshield glare reflection */}
            <polygon
              points="128,34 165,34 140,68 112,68"
              fill="rgba(255, 255, 255, 0.04)"
            />

            {/* Side Aero Mirrors */}
            <rect
              x="66"
              y="63"
              width="18"
              height="8"
              rx="2.5"
              fill="#12233c"
              stroke="#21487eff"
              strokeWidth="0.75"
            />
            <rect
              x="256"
              y="63"
              width="18"
              height="8"
              rx="2.5"
              fill="#12233c"
              stroke="#21487eff"
              strokeWidth="0.75"
            />

            {/* Main Front Body / Chassis */}
            <path
              d="M 86 72 
                 L 254 72 
                 L 284 86 
                 L 304 98 
                 L 304 136 
                 L 36 136 
                 L 36 98 
                 L 56 86 Z"
              fill="#12233c"
              stroke="#21487eff"
              strokeWidth="1"
            />

            {/* Hood Crease Strakes (90s Boxy Styling) */}
            <line
              x1="126"
              y1="73"
              x2="122"
              y2="98"
              stroke="#21487eff"
              strokeWidth="1"
            />
            <line
              x1="214"
              y1="73"
              x2="218"
              y2="98"
              stroke="#21487eff"
              strokeWidth="1"
            />

            {/* Front Bumper / Fascia Line */}
            <line
              x1="40"
              y1="116"
              x2="300"
              y2="116"
              stroke="#1b3457"
              strokeWidth="1"
            />

            {/* Center Radiator / Intercooler Grille */}
            <rect
              x="125"
              y="118"
              width="90"
              height="20"
              rx="2"
              fill="#06090e"
              stroke="#1c365b"
              strokeWidth="1"
            />
            {/* Grille Mesh Slats */}
            <line
              x1="128"
              y1="124"
              x2="212"
              y2="124"
              stroke="#13233a"
              strokeWidth="1"
            />
            <line
              x1="128"
              y1="131"
              x2="212"
              y2="131"
              stroke="#13233a"
              strokeWidth="1"
            />

            {/* Front Chin Spoiler / Splitter */}
            <rect
              x="30"
              y="138"
              width="280"
              height="7"
              rx="2"
              fill="#0d1829"
              stroke="#21487eff"
              strokeWidth="0.75"
            />

            {/* ─── HEADLIGHTS (LEFT & RIGHT) ─── */}
            {/* Left Housing */}
            <rect
              x="54"
              y="86"
              width="60"
              height="24"
              rx="2.5"
              fill="#080c14"
              stroke="#21487eff"
              strokeWidth="1"
            />
            {/* Left Corner Marker Light */}
            <rect
              x="56"
              y="88"
              width="9"
              height="20"
              rx="1.5"
              fill={headlightsOn ? "#ff9a40" : "#242e3b"}
              stroke={headlightsOn ? "#ffb66c" : "#19222c"}
              strokeWidth="0.5"
            />
            {/* Left Projector Bulb */}
            <circle
              cx="90"
              cy="98"
              r="8.5"
              fill={headlightsOn ? "#ffedd5" : "#1f2937"}
              stroke={headlightsOn ? "#ffffff" : "#324052"}
              strokeWidth="1.5"
              filter={headlightsOn ? "url(#intro-headlight-bloom)" : undefined}
            />
            <circle
              cx="90"
              cy="98"
              r="4.5"
              fill={headlightsOn ? "#ffffff" : "#151c26"}
            />

            {/* Right Housing */}
            <rect
              x="226"
              y="86"
              width="60"
              height="24"
              rx="2.5"
              fill="#080c14"
              stroke="#21487eff"
              strokeWidth="1"
            />
            {/* Right Projector Bulb */}
            <circle
              cx="250"
              cy="98"
              r="8.5"
              fill={headlightsOn ? "#ffedd5" : "#1f2937"}
              stroke={headlightsOn ? "#ffffff" : "#324052"}
              strokeWidth="1.5"
              filter={headlightsOn ? "url(#intro-headlight-bloom)" : undefined}
            />
            <circle
              cx="250"
              cy="98"
              r="4.5"
              fill={headlightsOn ? "#ffffff" : "#151c26"}
            />
            {/* Right Corner Marker Light */}
            <rect
              x="275"
              y="88"
              width="9"
              height="20"
              rx="1.5"
              fill={headlightsOn ? "#ff9a40" : "#242e3b"}
              stroke={headlightsOn ? "#ffb66c" : "#19222c"}
              strokeWidth="0.5"
            />
          </svg>
        </div>

        {/* CTA Button */}
        <div
          className={`mt-14 transition-opacity duration-150 ${buttonVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <button
            onClick={handleIgnition}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-lg bg-amber-burnt hover:bg-amber-burnt-light text-white font-heading font-semibold text-sm uppercase tracking-wider transition-all duration-150 shadow-[0_0_24px_rgba(255,107,53,0.35)] hover:shadow-[0_0_36px_rgba(255,107,53,0.6)] active:scale-95 cursor-pointer"
          >
            <span>TURN THE IGNITION ON</span>
          </button>
        </div>
      </div>

      {/* Brief Full-Screen White Flash at peak scale (<150ms) */}
      <div
        className={`fixed inset-0 z-50 bg-white pointer-events-none transition-opacity duration-75 ${isFlashing ? "opacity-95" : "opacity-0"
          }`}
        aria-hidden="true"
      />
    </div>
  );
}
