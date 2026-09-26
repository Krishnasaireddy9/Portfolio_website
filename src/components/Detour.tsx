"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { GearHeading } from "./GearHeading";

// Direct imports for all 8 photos from @/data/photos/
import photo01 from "@/data/photos/photo-01.jpg";
import photo02 from "@/data/photos/photo-02.jpg";
import photo03 from "@/data/photos/photo-03.jpg";
import photo04 from "@/data/photos/photo-04.jpg";
import photo05 from "@/data/photos/photo-05.jpg";
import photo06 from "@/data/photos/photo-06.jpg";
import photo07 from "@/data/photos/photo-07.jpg";
import photo08 from "@/data/photos/photo-08.jpg";

const photos = [
  photo01,
  photo02,
  photo03,
  photo04,
  photo05,
  photo06,
  photo07,
  photo08,
];

export function Detour() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [tappingIndex, setTappingIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const prevPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === 0 ? photos.length - 1 : prev - 1) : null
    );
  }, []);

  const nextPhoto = useCallback(() => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev === photos.length - 1 ? 0 : prev + 1) : null
    );
  }, []);

  const handlePhotoClick = (index: number) => {
    setTappingIndex(index);
    // Brief zoom feedback on tap before modal opens
    setTimeout(() => {
      setLightboxIndex(index);
      setTappingIndex(null);
    }, 120);
  };

  // Keyboard navigation & body scroll lock for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxIndex, closeLightbox, prevPhoto, nextPhoto]);

  return (
    <section id="detour" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Spec-sheet label + hairline */}
        <div className="flex items-center gap-4 mb-10">
          <span className="font-mono text-[10px] sm:text-xs text-telemetry-dim uppercase tracking-widest whitespace-nowrap">
            OFF-ROUTE — FIELD PHOTOGRAPHY
          </span>
          <div className="editorial-hairline flex-1" />
        </div>

        {/* Section Heading with Gear Transition */}
        <GearHeading className="font-heading font-bold text-3xl sm:text-4xl text-white tracking-wide uppercase">
          Detour
        </GearHeading>

        {/* Clean Responsive Photo Grid: 4 cols on desktop, 2 cols on tablet, 1 col on mobile */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              onClick={() => handlePhotoClick(idx)}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden cursor-pointer bg-carbon-900/60 border border-gunmetal-border/50 hover:border-amber-burnt/80 transition-colors duration-300 select-none shadow-sm"
              role="button"
              tabIndex={0}
              aria-label={`Open photography ${idx + 1}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handlePhotoClick(idx);
                }
              }}
            >
              <Image
                src={photo}
                alt={`Photography ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className={`object-cover transition-transform duration-300 ease-out ${
                  tappingIndex === idx ? "scale-[1.07]" : "group-hover:scale-[1.07]"
                }`}
                priority={idx < 4}
              />
              {/* Subtle hover vignette overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* Full-size Photo Lightbox Overlay */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8 animate-fadeIn select-none"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 sm:top-7 sm:right-7 p-3 rounded-full bg-carbon-900/80 hover:bg-carbon-800 text-white/90 hover:text-white border border-gunmetal-border hover:border-amber-burnt transition-all z-20"
            aria-label="Close photo"
          >
            <X size={22} strokeWidth={2} />
          </button>

          {/* Previous photo button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-black/95 text-white/90 hover:text-white border border-white/10 hover:border-amber-burnt transition-all backdrop-blur-sm z-20"
            aria-label="Previous photo"
          >
            <ChevronLeft size={24} strokeWidth={2} />
          </button>

          {/* Centered Image Container */}
          <div
            className="relative w-full max-w-5xl h-[70vh] sm:h-[82vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[lightboxIndex]}
              alt={`Photography full view ${lightboxIndex + 1}`}
              fill
              className="object-contain drop-shadow-2xl"
              sizes="(max-width: 1280px) 95vw, 1200px"
              priority
            />
          </div>

          {/* Next photo button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/70 hover:bg-black/95 text-white/90 hover:text-white border border-white/10 hover:border-amber-burnt transition-all backdrop-blur-sm z-20"
            aria-label="Next photo"
          >
            <ChevronRight size={24} strokeWidth={2} />
          </button>
        </div>
      )}
    </section>
  );
}
