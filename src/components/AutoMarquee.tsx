"use client";

/**
 * AutoMarquee — a low-opacity horizontal marquee of simple line-art
 * automotive icons (gear, piston, tachometer needle, cylinder head,
 * crankshaft silhouette). Pure SVG, no brand logos, no external assets.
 * Renders behind hero content at ~5 % opacity.
 */
export function AutoMarquee() {
  /* Each icon is a 48×48 SVG path rendered in a muted telemetry color */
  const icons = [
    /* Gear */
    <svg key="gear" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="7" />
      <path d="M24 4v5M24 39v5M4 24h5M39 24h5M9.86 9.86l3.54 3.54M34.6 34.6l3.54 3.54M9.86 38.14l3.54-3.54M34.6 13.4l3.54-3.54" />
    </svg>,
    /* Piston */
    <svg key="piston" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="14" y="6" width="20" height="14" rx="2" />
      <line x1="24" y1="20" x2="24" y2="32" />
      <rect x="16" y="32" width="16" height="10" rx="2" />
    </svg>,
    /* Tachometer */
    <svg key="tach" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 38A20 20 0 1 1 40 38" />
      <line x1="24" y1="24" x2="16" y2="14" />
      <circle cx="24" cy="24" r="2" />
    </svg>,
    /* Spark Plug */
    <svg key="spark" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="24" y1="4" x2="24" y2="16" />
      <rect x="18" y="16" width="12" height="6" rx="1" />
      <line x1="24" y1="22" x2="24" y2="30" />
      <path d="M18 30l6 8 6-8" />
      <line x1="24" y1="38" x2="24" y2="44" />
    </svg>,
    /* Steering Wheel */
    <svg key="wheel" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="24" r="18" />
      <circle cx="24" cy="24" r="4" />
      <line x1="24" y1="6" x2="24" y2="20" />
      <line x1="7.2" y1="33" x2="20.5" y2="26" />
      <line x1="40.8" y1="33" x2="27.5" y2="26" />
    </svg>,
    /* Wrench */
    <svg key="wrench" width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 38L30 18" />
      <path d="M30 18c-2-4-1-9 3-12 1 3 3 5 6 6-3 4-8 5-12 3z" />
      <circle cx="10" cy="38" r="3" />
    </svg>,
  ];

  /* Duplicate 3× to guarantee seamless loop */
  const strip = [...icons, ...icons, ...icons];

  return (
    <div
      className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none"
      aria-hidden="true"
      style={{ opacity: 0.05 }}
    >
      <div className="marquee-track gap-16 text-telemetry-dim" style={{ width: "max-content" }}>
        {strip.map((icon, i) => (
          <div key={i} className="flex-shrink-0 w-12 h-12">
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}
