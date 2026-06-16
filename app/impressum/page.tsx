import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Impressum – Snack – Imbiss & Catering by Hamo",
  description: "Impressum und Anbieterkennzeichnung.",
};

/**
 * Rechtliche Unterseite /impressum.
 * Nutzt dasselbe Layout-Gerüst wie die Hauptseite (Navbar + Footer),
 * damit die Navigation erhalten bleibt.
 *
 * Hinweis: Alle konkreten Angaben sind PLATZHALTER ([...]) und müssen
 * vor dem Live-Gang durch echte Daten ersetzt werden. Dies ist keine
 * Rechtsberatung.
 */
export default function ImpressumPage() {
  return (
    <>
      <Navbar />

      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="font-serif text-4xl font-bold text-brown">
            Impressum
          </h1>
          <div className="mt-3 h-1 w-16 rounded-full bg-red" />

          <div className="mt-8 space-y-8 leading-relaxed text-brown/80">
            <section>
              <h2 className="font-serif text-xl font-bold text-brown">
                Angaben gemäß § 5 DDG
              </h2>
              <p className="mt-3">
                [Snack – Imbiss & Catering]
                <br />
                [Hamo]
                <br />
                [Straße, Hausnummer]
                <br />
                [PLZ, Ort]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-brown">
                Kontakt
              </h2>
              <p className="mt-3">
                Telefon: [+49 ...]
                <br />
                E-Mail: [info@example.com]
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-brown">
                Umsatzsteuer-ID
              </h2>
              <p className="mt-3">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz:
                <br />
                [DE ...] <span className="text-brown/50">(optional)</span>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-brown">
                Verantwortlich für den Inhalt
              </h2>
              <p className="mt-3">
                [Name der verantwortlichen Person]
                <br />
                [Anschrift, falls abweichend von oben]
              </p>
            </section>

            <p className="rounded-2xl bg-card p-5 text-sm text-brown/60 shadow-sm ring-1 ring-brown/5">
              Hinweis: Sämtliche Angaben in eckigen Klammern sind Platzhalter
              und müssen durch die tatsächlichen Daten ersetzt werden.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
