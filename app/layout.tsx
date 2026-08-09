import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteConfig } from "./site-config";
import "./globals.css";
import "./overrides.css";
import "./beta.css";
import "./reminders.css";
import "./founders.css";
import "./beta-responsive.css";
import "./inspection.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: "Billetera digital vehicular | Todo tu vehículo, siempre contigo",
  description: "Organiza documentos, vencimientos y mantenciones de tu auto. Accede desde tu celular mediante QR o NFC y comparte solo lo que tú decidas.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Todo lo importante de tu vehículo, siempre contigo",
    description: "Menos papeles, menos olvidos y más control para conductores en Chile.",
    type: "website",
    locale: "es_CL",
    images: [{ url: "/billetera-vehicular-hero.png", width: 1731, height: 909, alt: "Billetera Vehicular con automóvil, teléfono, QR y tarjeta NFC" }],
  },
  twitter: { card: "summary_large_image", title: "Billetera vehicular", description: "Tus documentos, vencimientos y mantenciones en un solo lugar.", images: ["/billetera-vehicular-hero.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-CL"><body className={geist.variable}>{children}</body></html>;
}
