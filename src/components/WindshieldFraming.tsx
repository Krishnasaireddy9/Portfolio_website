export function WindshieldFraming() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-20 overflow-hidden"
    >
      {/* Subtle Windshield Vignette */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 68%, rgba(0, 0, 0, 0.42) 100%)",
        }}
      />

      {/* Top Windshield Sun-Strip Tint */}
      <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Left A-Pillar (thin darkened windshield pillar frame) */}
      <div className="absolute top-0 bottom-0 left-0 w-4 sm:w-6 bg-gradient-to-r from-black/50 via-black/20 to-transparent border-r border-white/[0.02]" />

      {/* Right A-Pillar (thin darkened windshield pillar frame) */}
      <div className="absolute top-0 bottom-0 right-0 w-4 sm:w-6 bg-gradient-to-l from-black/50 via-black/20 to-transparent border-l border-white/[0.02]" />
    </div>
  );
}
