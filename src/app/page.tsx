"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { RouteTrackLine } from "@/components/RouteTrackLine";
import { SplashIntro } from "@/components/SplashIntro";
import { Ignition } from "@/components/Ignition";
import { TheDriver } from "@/components/TheDriver";
import { UnderTheHood } from "@/components/UnderTheHood";
import { TrackRecord } from "@/components/TrackRecord";
import { TheGarage } from "@/components/TheGarage";
import { PitStop } from "@/components/PitStop";
import { Detour } from "@/components/Detour";
import { Footer } from "@/components/Footer";
import { RpmGaugeHUD } from "@/components/RpmGaugeHUD";
import { LiveryDivider } from "@/components/LiveryDivider";

export default function Home() {
  // Synchronous initial state check before first paint
  const [introActive, setIntroActive] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      try {
        if (sessionStorage.getItem("has_seen_intro") === "true") {
          return false;
        }
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          return false;
        }
      } catch {}
      return true;
    }
    return true;
  });

  useEffect(() => {
    const handleTrigger = () => {
      setIntroActive(true);
    };
    const handleComplete = () => {
      setIntroActive(false);
    };

    window.addEventListener("trigger-splash-intro", handleTrigger);
    window.addEventListener("splash-intro-complete", handleComplete);
    return () => {
      window.removeEventListener("trigger-splash-intro", handleTrigger);
      window.removeEventListener("splash-intro-complete", handleComplete);
    };
  }, []);

  return (
    <main className="min-h-screen bg-transparent text-[#e2e4ea] relative selection:bg-amber-burnt selection:text-white">
      {/* Automotive Splash / Intro Screen */}
      <SplashIntro />

      {/* Main site content wrapper — hidden by default if intro is active */}
      <div
        id="main-portfolio-content"
        className={`w-full transition-opacity duration-300 ${
          introActive
            ? "opacity-0 invisible pointer-events-none"
            : "opacity-100 visible pointer-events-auto"
        }`}
      >
        {/* Route / Track Line */}
        <RouteTrackLine />

        {/* Navigation with Rocker Switches */}
        <Navigation />

        {/* Fixed RPM Gauge — persistent HUD, visible on every section */}
        <RpmGaugeHUD />

        {/* 00 Ignition (Hero) */}
        <Ignition />

        {/* Racing Livery Stripe Band between major sections */}
        <LiveryDivider />

        {/* 01 The Driver (About) */}
        <TheDriver />

        {/* Racing Livery Stripe Band */}
        <LiveryDivider />

        {/* 02 Under the Hood (Engine-Bay Centerpiece) */}
        <UnderTheHood />

        {/* Racing Livery Stripe Band */}
        <LiveryDivider />

        {/* 03 Track Record (Experience) */}
        <TrackRecord />

        {/* Racing Livery Stripe Band */}
        <LiveryDivider />

        {/* 04 The Garage (Projects) */}
        <TheGarage />

        {/* Racing Livery Stripe Band */}
        <LiveryDivider />

        {/* 05 Pit Stop (Contact Me) */}
        <PitStop />

        {/* Racing Livery Stripe Band */}
        <LiveryDivider />

        {/* Detour (Photography Carousel) */}
        <Detour />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
