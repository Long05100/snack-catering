"use client";

import { CONFIGURATOR_CATEGORIES } from "@/lib/catering-data";
import type {
  CategoryId,
  ConfiguratorSelection,
  EventType,
} from "@/types/catering";
import WhatsAppButton from "./WhatsAppButton";

interface ConfiguratorProps {
  /** Aktiver Event-Typ – nur für Überschrift & WhatsApp-Text. */
  activeEvent: EventType | null;
  /** Aktuelle Auswahl pro Kategorie. */
  selection: ConfiguratorSelection;
  /** Option in einer Kategorie wählen (genau eine pro Kategorie). */
  onSelect: (category: CategoryId, option: string) => void;
  /** Öffnet das Kontaktformular-Modal mit vorausgefüllten Werten. */
  onOpenForm: () => void;
}

/**
 * Konfigurator: erscheint, sobald ein Event-Typ gewählt wurde.
 * Fünf Kategorien mit je 3–4 Optionen als Chips. Pro Kategorie ist
 * genau EINE Option wählbar (aktiv = rot hervorgehoben).
 */
export default function Configurator({
  activeEvent,
  selection,
  onSelect,
  onOpenForm,
}: ConfiguratorProps) {
  // Wie viele der fünf Kategorien sind bereits belegt?
  const chosenCount = CONFIGURATOR_CATEGORIES.filter(
    (cat) => selection[cat.id],
  ).length;
  const totalCount = CONFIGURATOR_CATEGORIES.length;

  return (
    <div className="mt-10 rounded-2xl bg-card p-6 shadow-lg shadow-brown/10 ring-1 ring-brown/5 sm:p-8">
      <h3 className="font-serif text-2xl font-bold text-brown">
        Konfiguriere dein Event
        {activeEvent ? `: ${activeEvent.title}` : ""}
      </h3>
      <p className="mt-2 text-sm text-brown/70">
        Wähle pro Kategorie eine Option. Deine Auswahl wird automatisch in die
        Anfrage übernommen.
      </p>

      <div className="mt-8 space-y-7">
        {CONFIGURATOR_CATEGORIES.map((category) => (
          <fieldset key={category.id}>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wide text-brown/60">
              {category.label}
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {category.options.map((option) => {
                const isActive = selection[category.id] === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => onSelect(category.id, option)}
                    aria-pressed={isActive}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-red bg-red text-white"
                        : "border-brown/15 bg-wood/40 text-brown hover:border-red/50 hover:text-red"
                    }`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Fußleiste: Fortschritt + Aktionen */}
      <div className="mt-8 flex flex-col gap-4 border-t border-brown/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold text-brown">
          {chosenCount} von {totalCount} Kategorien gewählt
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onOpenForm}
            className="inline-flex items-center justify-center rounded-full bg-red px-6 py-3 text-sm font-semibold text-white shadow-sm transition-transform hover:scale-105 hover:bg-red/90"
          >
            Formular ausfüllen
          </button>
          <WhatsAppButton activeEvent={activeEvent} selection={selection} />
        </div>
      </div>
    </div>
  );
}
