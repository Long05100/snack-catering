"use client";

import { MessageCircle } from "lucide-react";
import { selectionToText } from "@/lib/catering-data";
import type { ConfiguratorSelection, EventType } from "@/types/catering";

/*
  PLATZHALTER-NUMMER: Bitte später durch die echte WhatsApp-Business-Nummer
  ersetzen. Format ohne "+" und ohne Leerzeichen, inkl. Ländervorwahl.
  Beispiel Deutschland: 49 + Nummer ohne führende 0.
*/
const WHATSAPP_NUMBER = "49123456789";

interface WhatsAppButtonProps {
  activeEvent: EventType | null;
  selection: ConfiguratorSelection;
}

/** Baut den vorausgefüllten WhatsApp-Nachrichtentext. */
function buildMessage(
  activeEvent: EventType | null,
  selection: ConfiguratorSelection,
): string {
  const lines: string[] = ["Hallo Hamo, ich interessiere mich für ein Catering."];

  if (activeEvent) {
    lines.push(`\nEvent-Typ: ${activeEvent.title}`);
  }

  const selectionText = selectionToText(selection);
  if (selectionText) {
    lines.push("\nMeine Auswahl:", selectionText);
  }

  lines.push("\nKönnt ihr mir ein Angebot machen?");
  return lines.join("\n");
}

/**
 * Öffnet WhatsApp mit vorausgefülltem Text (echter wa.me-Link).
 * Enthält Event-Typ und die gewählten Konfigurator-Optionen.
 */
export default function WhatsAppButton({
  activeEvent,
  selection,
}: WhatsAppButtonProps) {
  const message = buildMessage(activeEvent, selection);
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-brown/15 bg-card px-6 py-3 text-sm font-semibold text-brown transition-colors hover:border-red hover:text-red"
    >
      <MessageCircle size={18} />
      Via WhatsApp anfragen
    </a>
  );
}
