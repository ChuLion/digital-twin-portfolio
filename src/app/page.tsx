"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CareerJourney from "@/components/CareerJourney";
import Impact from "@/components/Impact";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import DigitalTwin from "@/components/DigitalTwin";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Career", href: "#career" },
  { label: "Impact", href: "#impact" },
  { label: "Portfolio", href: "#portfolio" },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-blue-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav className="fixed top-0 z-50 w-full border-b border-white/[0.08] bg-[#0b0d10]/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-mono text-sm font-semibold text-white">
            JDL<span className="text-blue-300">.</span>
          </span>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-white/42 transition-colors hover:text-white/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-md border border-blue-300/25 px-4 py-2 font-mono text-xs text-blue-200 transition-colors hover:border-blue-200/45 hover:bg-blue-300/10"
            >
              Contact
            </a>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="rounded-md border border-white/[0.08] p-2 text-white/70 transition-colors hover:text-white md:hidden"
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Mobile menu panel */}
        <div
          id="mobile-menu"
          className={`overflow-hidden border-t border-white/[0.08] bg-[#0b0d10]/95 backdrop-blur-xl transition-[max-height] duration-300 md:hidden ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1 px-6 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="rounded-md px-3 py-2 font-mono text-xs text-white/42 transition-colors hover:bg-white/[0.04] hover:text-white/80"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="mt-2 rounded-md border border-blue-300/25 px-4 py-2 text-center font-mono text-xs text-blue-200 transition-colors hover:border-blue-200/45 hover:bg-blue-300/10"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      <Hero />
      <About />
      <CareerJourney />
      <Impact />
      <Portfolio />
      <Contact />
      <DigitalTwin />
    </main>
  );
}
