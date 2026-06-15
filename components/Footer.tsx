import { MapPin, Phone, Mail, Clock } from "lucide-react";

/**
 * Footer mit Kontaktdaten-Platzhaltern.
 * Echte Daten (Adresse, Telefon, E-Mail, Öffnungszeiten) später eintragen.
 */
export default function Footer() {
  return (
    <footer className="mt-20 border-t border-brown/10 bg-brown text-wood">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="font-serif text-xl font-bold">
              Snack <span className="text-red">–</span> Imbiss &amp; Catering by
              Hamo
            </h4>
            <p className="mt-3 text-sm text-wood/70">
              Gutes Essen. Echte Leidenschaft. Unvergessliche Events.
            </p>
          </div>

          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wide text-wood/60">
              Kontakt
            </h5>
            <ul className="mt-3 space-y-2 text-sm text-wood/80">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-red" /> +49 123 456789
                (Platzhalter)
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-red" /> info@example.com
                (Platzhalter)
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wide text-wood/60">
              Standort
            </h5>
            <ul className="mt-3 space-y-2 text-sm text-wood/80">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-red" /> Musterstraße 1, 12345
                Musterstadt
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-red" /> Mo–Sa, nach
                Vereinbarung
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold uppercase tracking-wide text-wood/60">
              Navigation
            </h5>
            <ul className="mt-3 space-y-2 text-sm text-wood/80">
              <li>
                <a href="#catering" className="hover:text-red">
                  Catering
                </a>
              </li>
              <li>
                <a href="#speisekarte" className="hover:text-red">
                  Speisekarte
                </a>
              </li>
              <li>
                <a href="#kontakt" className="hover:text-red">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-wood/10 pt-6 text-center text-xs text-wood/50">
          © {new Date().getFullYear()} Snack – Imbiss &amp; Catering by Hamo.
          Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}
