import Image from "next/image";

/**
 * Hero-Sektion (#home): großer Titel, Untertitel, zwei CTAs und
 * ein Platzhalterbild. Reine Präsentation – kein State nötig.
 */
export default function Hero() {
  return (
    <section id="home" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Textspalte */}
        <div className="text-center lg:text-left">
          <span className="inline-block rounded-full bg-red/10 px-4 py-1.5 text-sm font-semibold text-red">
            Imbiss &amp; Catering by Hamo
          </span>
          <h1 className="mt-5 font-serif text-4xl font-bold leading-tight text-brown sm:text-5xl lg:text-6xl">
            Gutes Essen. Echte Leidenschaft. Unvergessliche Events.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-brown/75 lg:mx-0">
            Wir bringen Geschmack und Atmosphäre zu Ihrem Event – von der
            kleinen Feier bis zum großen Festival. Frisch zubereitet, persönlich
            geplant, rundum sorglos.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
            <a
              href="#kontakt"
              className="w-full rounded-full bg-red px-7 py-3.5 text-center text-base font-semibold text-white shadow-md transition-transform hover:scale-105 hover:bg-red/90 sm:w-auto"
            >
              Jetzt Catering anfragen
            </a>
            <a
              href="#speisekarte"
              className="w-full rounded-full border-2 border-brown/20 bg-card px-7 py-3.5 text-center text-base font-semibold text-brown transition-colors hover:border-red hover:text-red sm:w-auto"
            >
              Speisekarte ansehen
            </a>
          </div>
        </div>

        {/* Bildspalte: Platzhalterbild */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl bg-card shadow-xl shadow-brown/10 ring-1 ring-brown/5">
            <Image
              src="/hero-titelbild3.jpg"
              alt="Platzhalter – Catering-Impression"
              width={1200}
              height={800}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
