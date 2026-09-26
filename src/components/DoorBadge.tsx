import React from "react";

interface DoorBadgeProps {
  number: string;
  withFlag?: boolean;
}

export function DoorBadge({ number, withFlag = false }: DoorBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 select-none flex-shrink-0">
      {/* Two-digit door-number badge in mono font, circled */}
      <span
        aria-label={`Section ${number}`}
        className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-amber-burnt/50 bg-[#14161c] font-mono text-[11px] font-bold text-amber-burnt shadow-[0_0_10px_rgba(255,107,53,0.25)] flex-shrink-0"
      >
        {number}
      </span>

      {/* One small checkered-flag accent (~24x24px), placed only at 00 Ignition */}
      {withFlag && (
        <span
          aria-hidden="true"
          className="inline-flex items-center justify-center w-6 h-6 text-telemetry-silver/90"
          title="Checkered Flag"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="overflow-visible"
          >
            {/* Flagpole */}
            <path
              d="M3 21V3"
              stroke="#8a90a2"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Flagpole top finial */}
            <circle cx="3" cy="2.5" r="1.5" fill="#ff6b35" />

            {/* Checkered flag waving polygon */}
            <g transform="translate(3.5, 3)">
              {/* Row 1 */}
              <rect x="0" y="0" width="3.5" height="3" fill="#ffffff" />
              <rect x="3.5" y="0" width="3.5" height="3" fill="#14161c" />
              <rect x="7" y="0" width="3.5" height="3" fill="#ffffff" />
              <rect x="10.5" y="0" width="3.5" height="3" fill="#14161c" />

              {/* Row 2 */}
              <rect x="0" y="3" width="3.5" height="3" fill="#14161c" />
              <rect x="3.5" y="3" width="3.5" height="3" fill="#ffffff" />
              <rect x="7" y="3" width="3.5" height="3" fill="#14161c" />
              <rect x="10.5" y="3" width="3.5" height="3" fill="#ffffff" />

              {/* Row 3 */}
              <rect x="0" y="6" width="3.5" height="3" fill="#ffffff" />
              <rect x="3.5" y="6" width="3.5" height="3" fill="#ff6b35" />
              <rect x="7" y="6" width="3.5" height="3" fill="#ffffff" />
              <rect x="10.5" y="6" width="3.5" height="3" fill="#14161c" />

              {/* Row 4 */}
              <rect x="0" y="9" width="3.5" height="3" fill="#14161c" />
              <rect x="3.5" y="9" width="3.5" height="3" fill="#ffffff" />
              <rect x="7" y="9" width="3.5" height="3" fill="#14161c" />
              <rect x="10.5" y="9" width="3.5" height="3" fill="#ffffff" />

              {/* Border outline */}
              <rect
                x="0"
                y="0"
                width="14"
                height="12"
                fill="none"
                stroke="#2b2f3d"
                strokeWidth="0.8"
              />
            </g>
          </svg>
        </span>
      )}
    </div>
  );
}
