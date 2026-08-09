"use client";

import QRCode from "qrcode";
import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";

type InspectionVehicle = {
  id: string;
  plate: string;
  make: string;
  model: string;
  is_fleet: boolean;
  driver_name: string | null;
};

type InspectionDocument = {
  id: string;
  vehicle_id: string;
  expires_on: string | null;
};

const encodeToken = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");

const hashToken = async (token: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
};

export function InspectionPanel({
  supabase,
  session,
  vehicle,
  documents,
  onNotice,
}: {
  supabase: SupabaseClient;
  session: Session;
  vehicle: InspectionVehicle;
  documents: InspectionDocument[];
  onNotice: (message: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [qr, setQr] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const createInspection = async () => {
    setBusy(true);
    const tokenBytes = new Uint8Array(32);
    crypto.getRandomValues(tokenBytes);
    const token = encodeToken(tokenBytes);
    const tokenHash = await hashToken(token);
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    const { error } = await supabase
      .from("vehicles")
      .update({ inspection_token: tokenHash, inspection_enabled: true, inspection_expires_at: expiry.toISOString() })
      .eq("id", vehicle.id)
      .eq("user_id", session.user.id);

    if (error) {
      setBusy(false);
      onNotice("No pudimos iniciar la fiscalizaci\u00f3n.");
      return;
    }

    const url = `${window.location.origin}/fiscalizacion#${token}`;
    setQr(await QRCode.toDataURL(url, { width: 260, margin: 1, color: { dark: "#071018", light: "#ffffff" } }));
    setShareUrl(url);
    setExpiresAt(expiry.toISOString());
    setBusy(false);
  };

  const revokeInspection = async () => {
    await supabase
      .from("vehicles")
      .update({ inspection_enabled: false, inspection_expires_at: new Date().toISOString() })
      .eq("id", vehicle.id)
      .eq("user_id", session.user.id);
    setQr("");
    setShareUrl("");
    setExpiresAt("");
    onNotice("Acceso de fiscalizaci\u00f3n finalizado.");
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    onNotice("Enlace temporal copiado.");
  };

  const vehicleDocuments = documents.filter(document => document.vehicle_id === vehicle.id);
  const expired = vehicleDocuments.filter(document => document.expires_on && document.expires_on < new Date().toISOString().slice(0, 10)).length;

  return (
    <section className="beta-panel inspection-owner-panel">
      <div className="inspection-owner-head">
        <div>
          <p className="beta-kicker">MODO FISCALIZACI\u00d3N BETA</p>
          <h2>Todos los documentos, en una sola vista.</h2>
          <p>Genera un acceso temporal de solo lectura para este veh\u00edculo.</p>
        </div>
        <div className="inspection-summary">
          <b>{vehicleDocuments.length}</b>
          <span>documentos</span>
          {expired > 0 && <em>{expired} vencido{expired === 1 ? "" : "s"}</em>}
        </div>
      </div>

      {vehicle.is_fleet && vehicle.driver_name && (
        <p className="inspection-driver"><b>Chofer responsable:</b> {vehicle.driver_name}</p>
      )}

      {!qr ? (
        <button className="inspection-primary" disabled={busy || vehicleDocuments.length === 0} onClick={() => void createInspection()}>
          {busy ? "Preparando acceso..." : "Iniciar fiscalizaci\u00f3n por 5 minutos"}
        </button>
      ) : (
        <div className="inspection-share">
          <img src={qr} alt="C\u00f3digo QR temporal para fiscalizaci\u00f3n" />
          <div>
            <b>Acceso temporal activo</b>
            <p>El fiscalizador puede escanear este QR. Vence a las {new Intl.DateTimeFormat("es-CL", { hour: "2-digit", minute: "2-digit" }).format(new Date(expiresAt))}.</p>
            <div>
              <button onClick={() => void copyLink()}>Copiar enlace</button>
              <button className="inspection-danger" onClick={() => void revokeInspection()}>Finalizar ahora</button>
            </div>
          </div>
        </div>
      )}

      <small>Esta funci\u00f3n muestra copias digitales aportadas por la persona usuaria y no reemplaza la verificaci\u00f3n oficial exigida por la autoridad.</small>
    </section>
  );
}
