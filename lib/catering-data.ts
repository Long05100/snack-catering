import type {
  CategoryId,
  ConfiguratorCategory,
  ConfiguratorSelection,
  EventType,
} from "@/types/catering";

/** Platzhalterbild – wird später durch echte Fotos ersetzt. */
const PLACEHOLDER = "/placeholder.jpg";

/** Die vier Event-Typen für die interaktiven Karten (#catering). */
export const EVENT_TYPES: EventType[] = [
  {
    id: "firmenevents",
    title: "Firmenevents",
    description:
      "Vom Sommerfest bis zur Weihnachtsfeier – professionelles Catering, das Ihre Kollegen begeistert.",
    image: "/events/event-firmenevents.jpg",
    formValue: "Firmenevent",
  },
  {
    id: "hochzeiten",
    title: "Hochzeiten",
    description:
      "Ihr schönster Tag verdient unvergessliches Essen. Von Fingerfood bis Festbankett.",
    image: "/events/event-hochzeiten.jpg",
    formValue: "Hochzeit",
  },
  {
    id: "geburtstage",
    title: "Geburtstage",
    description:
      "Ob klein und gemütlich oder große Sause – wir bringen den Geschmack zur Feier.",
    image: "/events/event-geburtstage-v3.jpg",
    formValue: "Geburtstag",
  },
  {
    id: "festivals",
    title: "Festivals",
    description:
      "Street-Food-Feeling für große Menschenmengen. Food Truck, Stationen und mehr.",
    image: "/events/event-festivals-v3.jpg",
    formValue: "Festival",
  },
];

/** Die fünf Konfigurator-Kategorien mit ihren Optionen. */
export const CONFIGURATOR_CATEGORIES: ConfiguratorCategory[] = [
  {
    id: "location",
    label: "Location",
    options: [
      "Eigene Location",
      "Eventhalle",
      "Outdoor-Gelände",
      "Restaurant/Saal",
    ],
  },
  {
    id: "essen",
    label: "Essen",
    options: [
      "Food Truck",
      "Buffet",
      "Food Truck + Buffet",
      "Fingerfood-Station",
    ],
  },
  {
    id: "ausstattung",
    label: "Deko, Besteck & Möblierung",
    options: [
      "Basis-Besteck & Tische",
      "Premium-Deko & Blumen",
      "Komplettausstattung",
      "Rustikal/Vintage",
    ],
  },
  {
    id: "musik",
    label: "Musik & Entertainment",
    options: ["DJ", "Live Band", "Saxophon + DJ", "Kein Musik-Service"],
  },
  {
    id: "zelt",
    label: "Zelt / Überdachung",
    options: [
      "Kein Zelt nötig",
      "Kleines Pagodenzelt",
      "Großes Eventzelt",
      "Stretch-Zelt/Design",
    ],
  },
];

/** Anzeige-Labels der Kategorien für Texte (Formular/WhatsApp). */
export const CATEGORY_LABELS: Record<CategoryId, string> =
  CONFIGURATOR_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = cat.label;
      return acc;
    },
    {} as Record<CategoryId, string>,
  );

/** Leere Anfangsauswahl: in keiner Kategorie ist etwas gewählt. */
export const EMPTY_SELECTION: ConfiguratorSelection = {
  location: null,
  essen: null,
  ausstattung: null,
  musik: null,
  zelt: null,
};

/**
 * Wandelt die Konfigurator-Auswahl in lesbaren Text um.
 * Wird für die Nachricht im Formular und den WhatsApp-Text genutzt.
 */
export function selectionToText(
  selection: ConfiguratorSelection,
): string {
  const lines = CONFIGURATOR_CATEGORIES.filter(
    (cat) => selection[cat.id],
  ).map((cat) => `- ${cat.label}: ${selection[cat.id]}`);

  return lines.length > 0 ? lines.join("\n") : "";
}
