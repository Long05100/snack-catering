import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Datenschutzerklärung – Snack – Imbiss & Catering by Hamo",
  description: "Informationen zur Verarbeitung personenbezogener Daten.",
};

/**
 * Rechtliche Unterseite /datenschutz.
 * Gleiches Layout-Gerüst wie die Hauptseite (Navbar + Footer).
 *
 * Hinweis: Alle konkreten Angaben sind PLATZHALTER ([...]) und müssen
 * vor dem Live-Gang durch echte Daten ersetzt werden. Dies ist keine
 * Rechtsberatung.
 */
export default function DatenschutzPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-serif text-4xl font-bold text-brown">
            Datenschutzerklärung
          </h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-red" />

          <div className="mt-8 space-y-8 leading-relaxed text-brown/80">
            <section>
              <h2 className="font-serif text-xl font-bold text-brown">
                1. Verantwortlicher
              </h2>
              <p className="mt-3">
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                <br />
                [Firmenname]
                <br />
                [Straße, Hausnummer]
                <br />
                [PLZ, Ort]
                <br />
                E-Mail: [info@example.com]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-brown">
                2. Erhebung und Verarbeitung beim Kontaktformular
              </h2>
              <p className="mt-3">
                Wenn du uns über das Anfrageformular kontaktierst, verarbeiten
                wir die von dir angegebenen Daten (z. B. Name, Firma, E-Mail,
                Telefon, Event-Art, Personenanzahl, Datum, Ort sowie deine
                Nachricht), um deine Anfrage zu bearbeiten und mit dir in Kontakt
                zu treten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b und f DSGVO.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-brown">
                3. Einsatz von Web3Forms
              </h2>
              <p className="mt-3">
                Zur Verarbeitung und Zustellung der Formulardaten nutzen wir den
                externen Dienst <strong>Web3Forms</strong> ([Anbieter / Betreiber,
                Anschrift]). Beim Absenden des Formulars werden die eingegebenen
                Daten an die Server von Web3Forms übermittelt und von dort als
                E-Mail an uns weitergeleitet. Es gilt die Datenschutzerklärung des
                Anbieters: [Link zur Datenschutzerklärung von Web3Forms].
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an einer zuverlässigen Zustellung von Anfragen).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-brown">
                4. Speicherdauer
              </h2>
              <p className="mt-3">
                Wir speichern deine Anfragedaten nur so lange, wie es zur
                Bearbeitung deines Anliegens erforderlich ist bzw. solange
                gesetzliche Aufbewahrungsfristen bestehen. Danach werden die
                Daten gelöscht. [Konkrete Fristen ergänzen.]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-brown">
                5. Rechte der betroffenen Personen
              </h2>
              <p className="mt-3">
                Du hast das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung
                (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung
                (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch
                (Art. 21). Außerdem besteht ein Beschwerderecht bei einer
                Datenschutz-Aufsichtsbehörde. Wende dich für die Ausübung deiner
                Rechte an: [info@example.com].
              </p>
            </section>

            <p className="rounded-2xl bg-card p-5 text-sm text-brown/60 shadow-sm ring-1 ring-brown/5">
              Hinweis: Sämtliche Angaben in eckigen Klammern sind Platzhalter und
              müssen durch die tatsächlichen Daten ersetzt werden. Dieser Text
              stellt keine Rechtsberatung dar.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
