"use client";

import { RpmGauge } from "./RpmGauge";

/**
 * Fixed-position wrapper for the RPM gauge.
 * Renders in the top-right corner of the viewport,
 * always visible — the site's only persistent chrome besides the nav.
 */
export function RpmGaugeHUD() {
  return (
    <div
      className="fixed top-[72px] right-3 sm:right-5 z-30 pointer-events-none"
      aria-hidden="true"
    >
      <RpmGauge />
    </div>
  );
}
