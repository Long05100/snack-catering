/**
 * Zentrale Typdefinitionen für die Catering-Konfiguration.
 * Werden von page.tsx (Lifted State), Konfigurator, Formular und
 * WhatsApp-Button gemeinsam genutzt.
 */

/** Eindeutige IDs der vier Event-Typen (Hero-Karten). */
export type EventTypeId =
  | "firmenevents"
  | "hochzeiten"
  | "geburtstage"
  | "festivals";

/** Eine anklickbare Event-Typ-Karte. */
export interface EventType {
  id: EventTypeId;
  title: string;
  description: string;
  /** Pfad zum Platzhalterbild unter /public. */
  image: string;
  /**
   * Passender Wert für das Dropdown "Event-Art" im Kontaktformular,
   * damit die Auswahl vorausgefüllt werden kann.
   */
  formValue: FormEventArt;
}

/** Schlüssel der fünf Konfigurator-Kategorien. */
export type CategoryId =
  | "location"
  | "essen"
  | "ausstattung"
  | "musik"
  | "zelt";

/** Eine Kategorie mit ihren auswählbaren Optionen. */
export interface ConfiguratorCategory {
  id: CategoryId;
  label: string;
  options: string[];
}

/**
 * Aktuelle Auswahl pro Kategorie.
 * `null` bedeutet: in dieser Kategorie wurde noch nichts gewählt.
 */
export type ConfiguratorSelection = Record<CategoryId, string | null>;

/** Mögliche Werte des Dropdowns "Event-Art" im Formular. */
export type FormEventArt =
  | "Hochzeit"
  | "Geburtstag"
  | "Firmenevent"
  | "Festival";
