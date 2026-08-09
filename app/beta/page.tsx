import type { Metadata } from "next";
import { BetaApp } from "../components/BetaApp";

export const metadata: Metadata = { title: "Mi billetera | Billetera Vehicular", description: "Beta privada para organizar vehículos, documentos y vencimientos.", robots: { index: false, follow: false } };

export default function BetaPage() { return <BetaApp />; }
