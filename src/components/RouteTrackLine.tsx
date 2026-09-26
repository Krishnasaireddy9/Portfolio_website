"use client";

import { useEffect, useState } from "react";

export function RouteTrackLine() {
  const [carY, setCarY] = useState(60);

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      const winHeight = window.innerHeight;
      const scrollableHeight =
        document.documentElement.scrollHeight - winHeight;
      const fraction =
        scrollableHeight > 0
          ? Math.min(Math.max(window.scrollY / scrollableHeight, 0), 1)
          : 0;

      // Keep car within viewport: starts comfortably below nav, ends above bottom edge
      const startY = 64;
      const endY = winHeight - 56 - 64;
      const travel = Math.max(endY - startY, 0);
      setCarY(startY + fraction * travel);
    };

    const handleScrollOrResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    updatePosition();

    return () => {
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, []);

  return (
    <aside
      className="fixed top-0 bottom-0 w-14 select-none transition-opacity duration-300 left-1/2 -translate-x-1/2 z-0 opacity-20 pointer-events-none md:left-6 md:translate-x-0 md:z-30 md:opacity-100"
    >
      {/* Dark Asphalt Road Band (~56px wide, doubled from 28px) */}
      <div className="absolute inset-0 bg-[#121316] border-l border-r border-white/[0.07] shadow-[0_0_15px_rgba(0,0,0,0.8)]">
        {/* White Dashed Centerline Lane Marking */}
        <svg
          className="w-full h-full"
          viewBox="0 0 56 1000"
          preserveAspectRatio="none"
        >
          <line
            x1="28"
            y1="0"
            x2="28"
            y2="1000"
            stroke="rgba(255, 255, 255, 0.45)"
            strokeWidth="3"
            strokeDasharray="16 20"
          />
        </svg>
      </div>

      {/* Vintage 90s Japanese Sports Coupe Silhouette — Click to power off ignition and return to intro (doubled: 36x96) */}
      <div
        onClick={() => {
          window.dispatchEvent(new CustomEvent("trigger-splash-intro"));
        }}
        title="Power down ignition (Return to intro)"
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none md:pointer-events-auto cursor-pointer will-change-transform group transition-transform hover:scale-110 active:scale-95"
        style={{
          transform: `translate3d(-50%, ${carY}px, 0)`,
        }}
        role="button"
        tabIndex={0}
        aria-label="Power down ignition and return to intro"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            window.dispatchEvent(new CustomEvent("trigger-splash-intro"));
          }
        }}
      >
        <svg
          width="36"
          height="96"
          viewBox="0 0 18 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* LED Headlight Light Beams */}
            <linearGradient id="headlight-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#67e8f9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
            </linearGradient>

            {/* Glowing LED Headlight Effect */}
            <filter id="led-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#ffffff" floodOpacity="0.9" />
              <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.7" />
            </filter>
          </defs>

          {/* Forward Headlight Beams casting down the road */}
          <polygon points="3.5,33 5.5,33 8,47 1,47" fill="url(#headlight-beam)" />
          <polygon points="12.5,33 14.5,33 17,47 10,47" fill="url(#headlight-beam)" />

          {/* 90s Japanese Sports Coupe Body (Boxy, Low, Dark Blue) */}
          {/* Main Chassis Silhouette */}
          <path
            d="M 3.5 2
               L 14.5 2
               Q 16 2 16.2 3.5
               L 16.5 8
               Q 15.8 12 15.4 16
               Q 15.8 20 16.5 24
               L 16.2 30
               Q 15.8 33 14 33.5
               L 4 33.5
               Q 2.2 33 1.8 30
               L 1.5 24
               Q 2.2 20 2.6 16
               Q 2.2 12 1.5 8
               L 1.8 3.5
               Q 2 2 3.5 2 Z"
            fill="#12233c"
            stroke="#21487eff"
            strokeWidth="0.75"
          />

          {/* Boxy Rear Spoiler */}
          <rect x="2" y="1" width="14" height="2" rx="0.5" fill="#0d1829" stroke="#2a4c7e" strokeWidth="0.5" />

          {/* Rear Window */}
          <polygon points="4,5 14,5 13,10 5,10" fill="#070c14" />

          {/* Roof */}
          <rect x="4.5" y="10" width="9" height="7" rx="0.5" fill="#182c4a" />

          {/* Side Windows */}
          <polygon points="3.5,10.5 4.5,10.5 4.5,17 3,17" fill="#070c14" />
          <polygon points="13.5,10.5 14.5,10.5 15,17 13.5,17" fill="#070c14" />

          {/* Front Windshield */}
          <polygon points="4.5,17 13.5,17 14.2,22 3.8,22" fill="#070c14" stroke="#1d3454" strokeWidth="0.4" />

          {/* Aero Side Mirrors */}
          <rect x="0.5" y="18" width="1.5" height="1.2" rx="0.4" fill="#12233c" stroke="#223e66" strokeWidth="0.4" />
          <rect x="16" y="18" width="1.5" height="1.2" rx="0.4" fill="#12233c" stroke="#223e66" strokeWidth="0.4" />

          {/* Hood Crease Lines (Boxy 90s styling) */}
          <line x1="6" y1="23" x2="5.5" y2="30.5" stroke="#1e3557" strokeWidth="0.6" />
          <line x1="12" y1="23" x2="12.5" y2="30.5" stroke="#1e3557" strokeWidth="0.6" />

          {/* Front Bumper Chin */}
          <rect x="3.5" y="32.5" width="11" height="1.5" rx="0.5" fill="#0d1829" />

          {/* Glowing LED Headlight Dots at Leading Edge */}
          {/* Left Headlight */}
          <circle cx="4.5" cy="33" r="1.3" fill="#ffffff" filter="url(#led-glow)" />
          {/* Right Headlight */}
          <circle cx="13.5" cy="33" r="1.3" fill="#ffffff" filter="url(#led-glow)" />
        </svg>
      </div>
    </aside>
  );
}
