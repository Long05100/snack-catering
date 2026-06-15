"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { selectionToText } from "@/lib/catering-data";
import type {
  ConfiguratorSelection,
  EventType,
  FormEventArt,
} from "@/types/catering";

/** Auswahlmöglichkeiten der Dropdowns. */
const EVENT_ART_OPTIONS: FormEventArt[] = [
  "Hochzeit",
  "Geburtstag",
  "Firmenevent",
  "Festival",
];
const PERSONEN_OPTIONS = ["bis 50", "50–100", "100–200", "200+"];

interface ContactFormProps {
  activeEvent: EventType | null;
  selection: ConfiguratorSelection;
}

/** Struktur der Formulardaten. */
interface FormData {
  name: string;
  firma: string;
  email: string;
  telefon: string;
  eventArt: string;
  personen: string;
  datum: string;
  ort: string;
  nachricht: string;
  datenschutz: boolean;
}

const EMPTY_FORM: FormData = {
  name: "",
  firma: "",
  email: "",
  telefon: "",
  eventArt: "",
  personen: "",
  datum: "",
  ort: "",
  nachricht: "",
  datenschutz: false,
};

/** Baut den vorbefüllten Nachrichtentext aus der Konfigurator-Auswahl. */
function buildPrefillMessage(
  activeEvent: EventType | null,
  selection: ConfiguratorSelection,
): string {
  const selectionText = selectionToText(selection);
  if (!activeEvent && !selectionText) return "";

  const parts: string[] = [];
  if (activeEvent) parts.push(`Event-Typ: ${activeEvent.title}`);
  if (selectionText) parts.push(`\nMeine Auswahl:\n${selectionText}`);
  return parts.join("\n");
}

/** Einfache E-Mail-Format-Prüfung. */
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Kontaktformular mit rein clientseitiger Validierung.
 * Wird sowohl inline (#kontakt) als auch im Modal genutzt.
 */
export default function ContactForm({
  activeEvent,
  selection,
}: ContactFormProps) {
  const [form, setForm] = useState<FormData>(() => ({
    ...EMPTY_FORM,
    eventArt: activeEvent?.formValue ?? "",
    nachricht: buildPrefillMessage(activeEvent, selection),
  }));
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [success, setSuccess] = useState(false);

  /*
    Vorausfüllen synchronisieren: Wenn sich der gewählte Event-Typ oder die
    Konfigurator-Auswahl ändert (z. B. weil das Modal nach einer Auswahl
    geöffnet wird), aktualisieren wir Event-Art und Nachricht automatisch.
  */
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      eventArt: activeEvent?.formValue ?? prev.eventArt,
      nachricht: buildPrefillMessage(activeEvent, selection) || prev.nachricht,
    }));
  }, [activeEvent, selection]);

  // Generischer Change-Handler für alle Felder.
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const fieldValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value;
    setForm((prev) => ({ ...prev, [name]: fieldValue }));
  };

  // Clientseitige Validierung der Pflichtfelder.
  const validate = (): boolean => {
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!form.name.trim()) next.name = "Bitte gib deinen Namen an.";
    if (!form.email.trim()) {
      next.email = "Bitte gib deine E-Mail-Adresse an.";
    } else if (!isValidEmail(form.email)) {
      next.email = "Bitte gib eine gültige E-Mail-Adresse an.";
    }
    if (!form.datenschutz) {
      next.datenschutz = "Bitte stimme der Datenschutzerklärung zu.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  /**
   * Zentrale Submit-Logik. Aktuell rein clientseitig (kein echter Versand).
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    // TODO(Backend): Hier später den echten Versand einbauen.
    // Optionen z. B.:
    //   - Resend: fetch("/api/contact", { method: "POST", body: JSON.stringify(form) })
    //   - Supabase: await supabase.from("anfragen").insert(form)
    // Aktuell: keine Daten verlassen den Browser.
    console.log("Anfrage (nur clientseitig):", form);

    setSuccess(true);
    setForm(EMPTY_FORM);
    setErrors({});
  };

  // Erfolgsmeldung nach dem Absenden.
  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-card p-8 text-center shadow-lg shadow-brown/10 ring-1 ring-brown/5">
        <CheckCircle2 size={56} className="text-red" />
        <h3 className="font-serif text-2xl font-bold text-brown">
          Vielen Dank, wir melden uns!
        </h3>
        <p className="max-w-md text-brown/70">
          Deine Anfrage ist bei uns eingegangen. Wir setzen uns so schnell wie
          möglich mit dir in Verbindung.
        </p>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="mt-2 rounded-full border-2 border-brown/15 px-6 py-2.5 text-sm font-semibold text-brown transition-colors hover:border-red hover:text-red"
        >
          Weitere Anfrage stellen
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border-2 border-brown/15 bg-wood/30 px-4 py-2.5 text-brown outline-none transition-colors focus:border-red focus:bg-card";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl bg-card p-6 shadow-lg shadow-brown/10 ring-1 ring-brown/5 sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red">{errors.name}</p>
          )}
        </div>

        {/* Firma */}
        <div>
          <label htmlFor="firma" className="mb-1.5 block text-sm font-semibold">
            Firma
          </label>
          <input
            id="firma"
            name="firma"
            type="text"
            value={form.firma}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* E-Mail */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
            E-Mail *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red">{errors.email}</p>
          )}
        </div>

        {/* Telefon */}
        <div>
          <label
            htmlFor="telefon"
            className="mb-1.5 block text-sm font-semibold"
          >
            Telefon
          </label>
          <input
            id="telefon"
            name="telefon"
            type="tel"
            value={form.telefon}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Event-Art (vorausgefüllt aus Event-Typ) */}
        <div>
          <label
            htmlFor="eventArt"
            className="mb-1.5 block text-sm font-semibold"
          >
            Event-Art
          </label>
          <select
            id="eventArt"
            name="eventArt"
            value={form.eventArt}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Bitte wählen …</option>
            {EVENT_ART_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Personenanzahl */}
        <div>
          <label
            htmlFor="personen"
            className="mb-1.5 block text-sm font-semibold"
          >
            Personenanzahl
          </label>
          <select
            id="personen"
            name="personen"
            value={form.personen}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Bitte wählen …</option>
            {PERSONEN_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Datum */}
        <div>
          <label htmlFor="datum" className="mb-1.5 block text-sm font-semibold">
            Datum
          </label>
          <input
            id="datum"
            name="datum"
            type="date"
            value={form.datum}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Ort */}
        <div>
          <label htmlFor="ort" className="mb-1.5 block text-sm font-semibold">
            Ort
          </label>
          <input
            id="ort"
            name="ort"
            type="text"
            value={form.ort}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Nachricht (vorbefüllt mit Konfigurator-Auswahl) */}
        <div className="sm:col-span-2">
          <label
            htmlFor="nachricht"
            className="mb-1.5 block text-sm font-semibold"
          >
            Nachricht
          </label>
          <textarea
            id="nachricht"
            name="nachricht"
            rows={5}
            value={form.nachricht}
            onChange={handleChange}
            className={`${inputClass} resize-y`}
          />
        </div>

        {/* Datenschutz-Zustimmung (Pflicht) */}
        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-brown/80">
            <input
              name="datenschutz"
              type="checkbox"
              checked={form.datenschutz}
              onChange={handleChange}
              className="mt-0.5 h-5 w-5 shrink-0 accent-red"
              aria-invalid={!!errors.datenschutz}
            />
            <span>
              Ich habe die Datenschutzerklärung gelesen und stimme der
              Verarbeitung meiner Daten zur Bearbeitung der Anfrage zu. *
            </span>
          </label>
          {errors.datenschutz && (
            <p className="mt-1 text-sm text-red">{errors.datenschutz}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 w-full rounded-full bg-red px-7 py-3.5 text-base font-semibold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-red/90 sm:w-auto"
      >
        Anfrage senden
      </button>
    </form>
  );
}
