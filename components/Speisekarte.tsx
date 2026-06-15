"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

/*
  Speisekarten-Plakate zentral als Array definiert, damit sich Karten leicht
  ergänzen oder ändern lassen. Pfade liegen unter /public/speisekarte/.
  (Aktuell Platzhalter – später durch echte Karten-Grafiken austauschen.)
*/
const MENU_CARDS: { src: string; title: string; alt: string }[] = [
  {
    src: "/speisekarte/hauptgang.jpg",
    title: "Hauptgang-Menü",
    alt: "Speisekarte Hauptgang-Menü",
  },
  {
    src: "/speisekarte/buffet.jpg",
    title: "Buffet-Menü",
    alt: "Speisekarte Buffet-Menü",
  },
  {
    src: "/speisekarte/burger.jpg",
    title: "Burger & Imbiss",
    alt: "Speisekarte Burger & Imbiss",
  },
];

/**
 * Speisekarten-Sektion (#speisekarte) mit Lightbox.
 * Die Karten sind hochformatige Plakate (4:5) mit viel Text, daher
 * object-contain auf hellem Kachel-Hintergrund. Klick öffnet die große
 * Ansicht; Schließen per Hintergrund-Klick, X-Button oder Escape-Taste.
 */
export default function Speisekarte() {
  // Index der aktuell geöffneten Karte – null bedeutet: Lightbox geschlossen.
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const closeLightbox = () => setOpenIndex(null);

  // Lightbox per Escape-Taste schließen.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex]);

  return (
    <section id="speisekarte" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-bold text-brown sm:text-4xl">
          Speisekarte
        </h2>
        <p className="mt-3 text-brown/70">
          Unsere Menüs und Spezialitäten auf einen Blick. Tippe auf eine Karte,
          um sie zu vergrößern.
        </p>
      </div>

      {/* Karten-Raster: 1 Spalte (Mobil), 3 nebeneinander (Desktop) */}
      <div className="grid grid-cols-1 gap-8 sm:max-w-2xl sm:mx-auto md:max-w-none md:grid-cols-3">
        {MENU_CARDS.map((card, index) => (
          <figure key={card.src} className="flex flex-col">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`${card.title} vergrößern`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-card p-3 shadow-md shadow-brown/10 ring-1 ring-brown/5 transition-transform hover:-translate-y-1"
            >
              <Image
                src={card.src}
                alt={card.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </button>
            <figcaption className="mt-3 text-center text-sm font-semibold text-brown">
              {card.title}
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox-Overlay */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brown/80 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Speisekarten-Ansicht"
          onClick={closeLightbox}
        >
          {/* Schließen-Button */}
          <button
            type="button"
            aria-label="Karte schließen"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-card p-2 text-brown shadow-md transition-colors hover:text-red sm:right-6 sm:top-6"
          >
            <X size={24} />
          </button>

          {/* Karte zentriert, vollständig sichtbar (object-contain).
              stopPropagation, damit ein Klick auf das Bild nicht schließt. */}
          <div
            className="relative max-h-[90vh] max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={MENU_CARDS[openIndex].src}
              alt={MENU_CARDS[openIndex].alt}
              width={1000}
              height={1250}
              className="max-h-[90vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
