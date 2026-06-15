"use client";

import { useEffect, useMemo, useState } from "react";
import { X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventTypeCards from "@/components/EventTypeCards";
import Configurator from "@/components/Configurator";
import ContactForm from "@/components/ContactForm";
import Gallery from "@/components/Gallery";
import Speisekarte from "@/components/Speisekarte";
import Footer from "@/components/Footer";
import { EVENT_TYPES, EMPTY_SELECTION } from "@/lib/catering-data";
import type {
  CategoryId,
  ConfiguratorSelection,
  EventTypeId,
} from "@/types/catering";

export default function Home() {
  /*
    Lifted State: Der gewählte Event-Typ und die Konfigurator-Auswahl leben
    hier in der page.tsx und werden an Konfigurator, Formular und
    WhatsApp-Button durchgereicht.
  */
  const [activeEventId, setActiveEventId] = useState<EventTypeId | null>(null);
  const [selection, setSelection] =
    useState<ConfiguratorSelection>(EMPTY_SELECTION);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Aktives Event-Objekt aus der ID ableiten (stabile Referenz via useMemo).
  const activeEvent = useMemo(
    () => EVENT_TYPES.find((e) => e.id === activeEventId) ?? null,
    [activeEventId],
  );

  // Event-Typ-Karte wählen.
  const handleSelectEvent = (id: EventTypeId) => {
    setActiveEventId(id);
  };

  // Option in einer Kategorie wählen (erneuter Klick hebt die Auswahl auf).
  const handleSelectOption = (category: CategoryId, option: string) => {
    setSelection((prev) => ({
      ...prev,
      [category]: prev[category] === option ? null : option,
    }));
  };

  // Modal schließen per Escape-Taste.
  useEffect(() => {
    if (!isFormOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsFormOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isFormOpen]);

  return (
    <>
      <Navbar />

      <main className="flex-1">
        <Hero />

        {/* Event-Typen + Konfigurator */}
        <section id="catering" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2 className="font-serif text-3xl font-bold text-brown sm:text-4xl">
              Welches Event planst du?
            </h2>
            <p className="mt-3 text-brown/70">
              Wähle einen Event-Typ und stelle dir dein Catering im
              Konfigurator zusammen.
            </p>
          </div>

          <EventTypeCards
            activeEvent={activeEventId}
            onSelect={handleSelectEvent}
          />

          {/* Konfigurator erscheint erst nach Auswahl eines Event-Typs */}
          {activeEvent && (
            <Configurator
              activeEvent={activeEvent}
              selection={selection}
              onSelect={handleSelectOption}
              onOpenForm={() => setIsFormOpen(true)}
            />
          )}
        </section>

        {/* Einfache Platzhalter-Sektionen – Inhalt folgt später */}
        <Speisekarte />
        <Gallery />
        <PlaceholderSection
          id="ueber-uns"
          title="Über uns"
          text="Die Geschichte hinter Snack – Imbiss & Catering by Hamo: Leidenschaft, Qualität und echtes Handwerk. Text folgt."
        />
        <PlaceholderSection
          id="standorte"
          title="Standorte"
          text="Wo du uns findest und in welchen Regionen wir Catering anbieten. Standort-Infos folgen."
        />

        {/* Kontakt + Formular (inline) */}
        <section id="kontakt" className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl font-bold text-brown sm:text-4xl">
              Event planen. Angebot erhalten.
            </h2>
            <p className="mt-3 text-brown/70">
              Erzähl uns von deinem Event – wir melden uns mit einem
              unverbindlichen Angebot.
            </p>
          </div>
          <ContactForm activeEvent={activeEvent} selection={selection} />
        </section>
      </main>

      <Footer />

      {/* Kontaktformular-Modal (geöffnet aus dem Konfigurator) */}
      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-brown/60 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Kontaktformular"
          onClick={() => setIsFormOpen(false)}
        >
          <div
            className="relative my-auto w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Formular schließen"
              onClick={() => setIsFormOpen(false)}
              className="absolute -top-2 right-0 z-10 -translate-y-full rounded-full bg-card p-2 text-brown shadow-md transition-colors hover:text-red sm:-right-2"
            >
              <X size={22} />
            </button>
            <ContactForm activeEvent={activeEvent} selection={selection} />
          </div>
        </div>
      )}
    </>
  );
}

/** Wiederverwendbare Platzhalter-Sektion (Titel + Text). */
function PlaceholderSection({
  id,
  title,
  text,
}: {
  id: string;
  title: string;
  text: string;
}) {
  return (
    <section id={id} className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-2xl bg-card p-8 shadow-md shadow-brown/5 ring-1 ring-brown/5 sm:p-12">
        <h2 className="font-serif text-3xl font-bold text-brown sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-brown/70">{text}</p>
      </div>
    </section>
  );
}
