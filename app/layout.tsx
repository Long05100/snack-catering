import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

/*
  Schriften via next/font (self-hosted, kein externer Request):
  - Playfair Display (Serif) für Überschriften
  - Inter (Sans) für Fließtext
  Beide werden als CSS-Variablen bereitgestellt und in globals.css
  über --font-serif / --font-sans den Tailwind-Tokens zugeordnet.
*/
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snack – Imbiss & Catering by Hamo",
  description:
    "Gutes Essen. Echte Leidenschaft. Unvergessliche Events. Catering für Firmenevents, Hochzeiten, Geburtstage und Festivals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      data-scroll-behavior="smooth"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-brown">{children}</body>
    </html>
  );
}
