import React from "react";

export function LiveryDivider() {
  return (
    <div
      aria-hidden="true"
      className="w-full h-5 sm:h-6 relative overflow-hidden select-none my-2 sm:my-3"
    >
      {/* Top Hairline Guide */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10" />

      {/* Static Diagonal Livery Stripe Band (Halved height, narrowed stripes) */}
      <svg
        className="w-full h-full block opacity-75"
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="livery-stripes-pattern"
            width="70"
            height="24"
            patternUnits="userSpaceOnUse"
            patternTransform="skewX(-28)"
          >
            {/* Dark Gunmetal Band (narrowed to ~half) */}
            <rect x="0" y="0" width="24" height="24" fill="#1e222d" opacity="0.65" />

            {/* Off-White Technical Stripe (narrowed to ~half) */}
            <rect x="28" y="0" width="2" height="24" fill="#e2e4ea" opacity="0.45" />

            {/* Amber Racing Stripe (narrowed to ~half) */}
            <rect x="33" y="0" width="4.5" height="24" fill="#ff6b35" opacity="0.85" />
          </pattern>
        </defs>

        {/* Full-width fill with narrowed diagonal livery pattern */}
        <rect width="100%" height="24" fill="url(#livery-stripes-pattern)" />
      </svg>

      {/* Bottom Hairline Guide */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent z-10" />
    </div>
  );
}
