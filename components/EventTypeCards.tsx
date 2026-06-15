"use client";

import Image from "next/image";
import { EVENT_TYPES } from "@/lib/catering-data";
import type { EventTypeId } from "@/types/catering";

interface EventTypeCardsProps {
  /** Aktuell aktiver Event-Typ (oder null, wenn noch keiner gewählt). */
  activeEvent: EventTypeId | null;
  /** Callback beim Anklicken einer Karte. */
  onSelect: (id: EventTypeId) => void;
}

/**
 * Event-Typen (#catering): vier anklickbare Karten. Die aktive Karte
 * wird rot hervorgehoben; darunter erscheint dann der Konfigurator.
 */
export default function EventTypeCards({
  activeEvent,
  onSelect,
}: EventTypeCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {EVENT_TYPES.map((event) => {
        const isActive = event.id === activeEvent;
        return (
          <button
            key={event.id}
            type="button"
            onClick={() => onSelect(event.id)}
            aria-pressed={isActive}
            className={`group flex flex-col overflow-hidden rounded-2xl bg-card text-left shadow-md shadow-brown/5 ring-2 transition-all hover:-translate-y-1 hover:shadow-lg ${
              isActive
                ? "ring-red"
                : "ring-transparent hover:ring-red/30"
            }`}
          >
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src={event.image}
                alt={`Platzhalter – ${event.title}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {isActive && (
                <span className="absolute right-3 top-3 rounded-full bg-red px-3 py-1 text-xs font-semibold text-white shadow">
                  Ausgewählt
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-serif text-xl font-bold text-brown">
                {event.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-brown/70">
                {event.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
