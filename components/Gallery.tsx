"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

/*
  Galerie-Bilder zentral als Array definiert, damit sich Bilder leicht
  ergänzen oder ändern lassen. Pfade liegen unter /public/galerie/.
  (Aktuell Platzhalter – später durch echte Fotos austauschen.)
*/
const GALLERY_IMAGES: { src: string; alt: string }[] = [
  { src: "/galerie/galerie-1.jpg", alt: "Catering-Impression 1" },
  { src: "/galerie/galerie-2.jpg", alt: "Catering-Impression 2" },
  { src: "/galerie/galerie-3.jpg", alt: "Catering-Impression 3" },

];

/**
 * Bildergalerie (#galerie) mit Lightbox.
 * Klick auf ein Bild öffnet es groß im Overlay; Schließen per Klick auf
 * den Hintergrund, X-Button oder Escape-Taste.
 */
export default function Gallery() {
  // Index des aktuell geöffneten Bildes – null bedeutet: Lightbox geschlossen.
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
    <section id="galerie" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl font-bold text-brown sm:text-4xl">
          Galerie
        </h2>
        <p className="mt-3 text-brown/70">
          Eindrücke von unseren Gerichten und Events – ein Vorgeschmack auf das,
          was wir zu deiner Feier mitbringen.
        </p>
      </div>

      {/* Bildraster: 1 Spalte (Mobil), 2 (Tablet), 3 (Desktop) */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_IMAGES.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`${image.alt} vergrößern`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-card shadow-md shadow-brown/10 ring-1 ring-brown/5 transition-transform hover:-translate-y-1"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox-Overlay */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brown/80 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Bildansicht"
          onClick={closeLightbox}
        >
          {/* Schließen-Button */}
          <button
            type="button"
            aria-label="Bild schließen"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-card p-2 text-brown shadow-md transition-colors hover:text-red sm:right-6 sm:top-6"
          >
            <X size={24} />
          </button>

          {/* Bild zentriert, in Größe begrenzt. stopPropagation, damit ein
              Klick auf das Bild selbst die Lightbox nicht schließt. */}
          <div
            className="relative max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[openIndex].src}
              alt={GALLERY_IMAGES[openIndex].alt}
              width={1200}
              height={900}
              className="max-h-[85vh] w-auto rounded-2xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
