"use client";

import { useEffect, useRef, useState } from "react";

export function TachometerCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (typeof window === "undefined") return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("tach-cursor-active");

    let mouseX = -100;
    let mouseY = -100;
    let prevX = -100;
    let prevY = -100;
    let currentAngle = 0;
    let targetAngle = 0;
    let isVisible = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (cursorRef.current) cursorRef.current.style.opacity = "1";
      }

      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      const speed = Math.min(Math.hypot(dx, dy), 60);

      // Deflection based on mouse speed and direction:
      // When moving quickly, tachometer needle deflects dynamically up to 25 degrees
      const moveAngle = Math.atan2(dy, dx) * (180 / Math.PI);
      const speedDeflection = (speed / 60) * 25;
      targetAngle = (moveAngle * 0.1) + speedDeflection;

      prevX = mouseX;
      prevY = mouseY;
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (cursorRef.current) cursorRef.current.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (cursorRef.current) cursorRef.current.style.opacity = "1";
    };

    const updateFrame = () => {
      // Smoothly interpolate angle back to rest
      currentAngle += (targetAngle - currentAngle) * 0.2;
      targetAngle *= 0.9; // decay when motionless

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) rotate(${currentAngle}deg)`;
      }

      rafId = requestAnimationFrame(updateFrame);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove("tach-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none select-none z-[9999] will-change-transform opacity-0 transition-opacity duration-150"
      style={{
        transformOrigin: "3px 3px",
      }}
    >
      {/* Precision Tachometer Needle SVG (hotspot calibrated exactly at tip 3,3) */}
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
      >
        {/* Needle Blade */}
        <polygon
          points="3,3 20,13 14,15 3,3"
          fill="#ff6b35"
        />
        {/* Needle Luminous Core */}
        <polygon
          points="3,3 15,11 11,13 3,3"
          fill="#ff8f5a"
        />
        {/* Hotspot Precision Tip Accent */}
        <circle cx="3" cy="3" r="2.2" fill="#ffffff" />
        <circle cx="3" cy="3" r="1.2" fill="#ff6b35" />

        {/* Pivot Counterweight Ring */}
        <circle cx="15.5" cy="14.5" r="3.5" fill="#181a20" stroke="#3b3f4f" strokeWidth="1" />
        <circle cx="15.5" cy="14.5" r="1.5" fill="#ff6b35" />
      </svg>
    </div>
  );
}
