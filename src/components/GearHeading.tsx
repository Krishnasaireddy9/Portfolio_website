"use client";

import React, { useEffect, useRef, useState } from "react";

interface GearHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function GearHeading({
  children,
  className = "",
  as: Component = "h2",
}: GearHeadingProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [engaged, setEngaged] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEngaged(true);
      return;
    }

    const node = headingRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEngaged(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={headingRef}
      className={`${engaged ? "gear-engage" : "opacity-90"} ${className}`}
    >
      {children}
    </Component>
  );
}
