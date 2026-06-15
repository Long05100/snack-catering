"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

/** Navigations-Links als Anchor-Links zu den Sektionen der Landingpage. */
const NAV_LINKS: { href: string; label: string }[] = [
  { href: "#home", label: "Home" },
  { href: "#catering", label: "Catering" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#galerie", label: "Galerie" },
  { href: "#ueber-uns", label: "Über uns" },
  { href: "#standorte", label: "Standorte" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function Navbar() {
  // Steuert das mobile Hamburger-Menü.
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-brown/10 bg-wood/90 backdrop-blur supports-[backdrop-filter]:bg-wood/75">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        {/* Logo links: Platzhalter-Bild + Schriftzug */}
        <a href="#home" className="flex items-center gap-3" onClick={closeMobile}>
          <Image
            src="/logo.jpg"
            alt="Logo Snack – Imbiss & Catering by Hamo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-contain"
            priority
          />
          <span className="font-serif text-base font-bold leading-tight text-brown sm:text-lg">
            Snack <span className="text-red">–</span> Imbiss &amp; Catering by
            Hamo
          </span>
        </a>

        {/* Desktop-Navigation */}
        <div className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brown/80 transition-colors hover:text-red"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-red/90"
          >
            Jetzt anfragen
          </a>
        </div>

        {/* Hamburger-Button (nur Mobil/Tablet) */}
        <button
          type="button"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-lg p-2 text-brown hover:bg-brown/5 lg:hidden"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobiles Menü */}
      {mobileOpen && (
        <div className="border-t border-brown/10 bg-wood/95 px-4 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="rounded-lg px-3 py-2 text-base font-medium text-brown/90 transition-colors hover:bg-brown/5 hover:text-red"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#kontakt"
              onClick={closeMobile}
              className="mt-2 rounded-full bg-red px-5 py-3 text-center text-base font-semibold text-white shadow-sm transition-colors hover:bg-red/90"
            >
              Jetzt anfragen
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
