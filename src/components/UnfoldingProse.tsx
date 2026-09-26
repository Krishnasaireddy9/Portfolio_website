"use client";

import React, { useEffect, useRef, useState } from "react";

interface UnfoldingProseProps {
  clauses: React.ReactNode[];
  as?: React.ElementType;
  className?: string;
  staggerMs?: number;
}

export function UnfoldingProse({
  clauses,
  as: Component = "p",
  className = "",
  staggerMs = 100,
}: UnfoldingProseProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // If user prefers reduced motion, reveal immediately with no animation
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsRevealed(true);
      return;
    }

    const node = containerRef.current;
    if (!node) return;

    // Use IntersectionObserver to trigger the unfolding reveal once when scrolled into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Component
      ref={containerRef}
      className={`unfolding-prose ${isRevealed ? "is-revealed" : ""} ${className}`}
    >
      {clauses.map((clause, idx) => (
        <span
          key={idx}
          className="unfolding-clause inline"
          style={
            {
              "--clause-idx": idx,
              "--stagger-ms": `${staggerMs}ms`,
            } as React.CSSProperties
          }
        >
          {clause}
        </span>
      ))}
    </Component>
  );
}
