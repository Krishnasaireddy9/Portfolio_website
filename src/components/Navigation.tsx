"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "The Driver", href: "#the-driver" },
  { name: "Under the Hood", href: "#under-the-hood" },
  { name: "Track Record", href: "#track-record" },
  { name: "The Garage", href: "#the-garage" },
  { name: "Contact Me", href: "#contact-me" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("ignition");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sectionIds = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 180;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gunmetal-border py-3"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center relative">
          {/* Centered Desktop Nav with Rocker Switches */}
          <nav className="hidden md:flex items-center justify-center gap-5 lg:gap-7 flex-nowrap whitespace-nowrap">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group inline-flex items-center gap-2 font-heading font-semibold text-xs lg:text-sm tracking-wider uppercase transition-colors whitespace-nowrap py-1"
                >
                  {/* Driver's Seat Horizontal Rocker Switch */}
                  <span
                    aria-hidden="true"
                    className={`relative inline-flex items-center w-5 h-[11px] rounded-full transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? "bg-amber-burnt/25 border border-amber-burnt shadow-[0_0_8px_rgba(255,107,53,0.5)]"
                        : "bg-[#14161b] border border-[#2e323e] group-hover:border-[#454b5c]"
                    }`}
                  >
                    <span
                      className={`inline-block w-[7px] h-[7px] rounded-full transition-all duration-200 ${
                        isActive
                          ? "translate-x-[10.5px] bg-amber-burnt shadow-[0_0_6px_#ff6b35]"
                          : "translate-x-[1.5px] bg-[#535767] group-hover:bg-[#777e96]"
                      }`}
                    />
                  </span>

                  {/* Label */}
                  <span
                    className={
                      isActive
                        ? "text-white"
                        : "text-telemetry-muted group-hover:text-white transition-colors"
                    }
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center justify-between w-full">
            <span className="font-mono text-[10px] text-telemetry-dim uppercase tracking-widest">
              NAVIGATION
            </span>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-telemetry-muted hover:text-white transition-colors"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with Rocker Switches */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-md border-b border-gunmetal-border px-6 py-4">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center gap-2.5 py-1.5 font-heading font-semibold text-sm uppercase tracking-wider"
                >
                  <span
                    aria-hidden="true"
                    className={`relative inline-flex items-center w-5 h-[11px] rounded-full transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? "bg-amber-burnt/25 border border-amber-burnt shadow-[0_0_8px_rgba(255,107,53,0.5)]"
                        : "bg-[#14161b] border border-[#2e323e]"
                    }`}
                  >
                    <span
                      className={`inline-block w-[7px] h-[7px] rounded-full transition-all duration-200 ${
                        isActive
                          ? "translate-x-[10.5px] bg-amber-burnt shadow-[0_0_6px_#ff6b35]"
                          : "translate-x-[1.5px] bg-[#535767]"
                      }`}
                    />
                  </span>
                  <span
                    className={
                      isActive
                        ? "text-white"
                        : "text-telemetry-muted group-hover:text-white transition-colors"
                    }
                  >
                    {item.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
