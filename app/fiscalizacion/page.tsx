"use client";

import { useEffect, useState } from "react";

const endpoint = "https://npzruonytmytsrzcrheq.supabase.co/functions/v1/inspection-access";
const labels: Record<string, string> = {
  permiso_circulacion: "Permiso de circulaci\u00f3n",
  soap: "SOAP",
  revision_tecnica: "Revisi\u00f3n t\u00e9cnica",
  emisiones: "Certificado de emisiones",
  padron: "Padr\u00f3n",
  homologacion: "Homologaci\u00f3n",
  licencia: "Licencia de conducir",
  otro: "Otro documento",
};

type InspectionData = {
  vehicle: { plate: string; make: string; model: string; model_year: number | null; nickname: string | null; responsible_driver: string | null };
  documents: Array<{ id: string; document_type: string; title: string; issuer: string | null; issued_on: string | null; expires_on: string | null; verification_status: string }>;
  expires_at: string;
  notice: string;
};

export default function InspectionPage() {
  const [token, setToken] = useState("");
  const [data, setData] = useState<InspectionData | null>(null);
  const [error, setError] = useState("");
  const [opening, setOpening] = useState("");

  useEffect(() => {
    const accessToken = window.location.hash.slice(1);
    setToken(accessToken);
    if (!accessToken) {
      setError("Este acceso de fiscalizaci\u00f3n no es v\u00e1lido.");
      return;
    }
    fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "view", token: accessToken }) })
      .then(async response => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "No pudimos abrir la fiscalizaci\u00f3n");
        setData(result);
      })
      .catch(reason => setError(reason.message));
  }, []);

  const openDocument = async (documentId: string) => {
    setOpening(documentId);
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "document", token, document_id: documentId }) });
    if (!response.ok) {
      const result = await response.json();
      setError(result.error || "No pudimos abrir el documento");
      setOpening("");
      return;
    }
    const fileUrl = URL.createObjectURL(await response.blob());
    window.open(fileUrl, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(fileUrl), 60000);
    setOpening("");
  };

  if (error) return <main className="inspection-public inspection-state"><div><span>BV</span><h1>Acceso no disponible</h1><p>{error}</p></div></main>;
  if (!data) return <main className="inspection-public inspection-state"><div><span>BV</span><h1>Preparando fiscalizaci\u00f3n...</h1></div></main>;

  return (
    <main className="inspection-public">
      <header><div className="inspection-public-brand"><span>BV</span><b>Billetera Vehicular</b></div><em>ACCESO TEMPORAL</em></header>
      <section className="inspection-vehicle">
        <p>FISCALIZACI\u00d3N VEHICULAR</p>
        <h1>{data.vehicle.plate}</h1>
        <h2>{data.vehicle.make} {data.vehicle.model} {data.vehicle.model_year || ""}</h2>
        {data.vehicle.responsible_driver && <span>Chofer responsable: <b>{data.vehicle.responsible_driver}</b></span>}
        <small>Acceso v\u00e1lido hasta las {new Intl.DateTimeFormat("es-CL", { hour: "2-digit", minute: "2-digit" }).format(new Date(data.expires_at))}</small>
      </section>
      <section className="inspection-documents">
        <h2>Documentos presentados</h2>
        {data.documents.map(document => {
          const expired = Boolean(document.expires_on && document.expires_on < new Date().toISOString().slice(0, 10));
          return <article key={document.id}><div><small>{labels[document.document_type] || "Documento"}</small><h3>{document.title}</h3><span>{document.expires_on ? `Vence el ${new Intl.DateTimeFormat("es-CL").format(new Date(`${document.expires_on}T12:00:00`))}` : "Sin vencimiento informado"}</span></div><em className={expired ? "expired" : "valid"}>{expired ? "Vencido" : "Vigente"}</em><button disabled={opening === document.id} onClick={() => void openDocument(document.id)}>{opening === document.id ? "Abriendo..." : "Ver documento"}</button></article>;
        })}
      </section>
      <aside>{data.notice}</aside>
    </main>
  );
}
