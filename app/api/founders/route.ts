import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const endpoint = process.env.GOOGLE_SHEETS_WEB_APP_URL;
  if (!endpoint) return NextResponse.json({ ok: false, code: "not_configured" }, { status: 503 });
  try {
    const body = await request.json();
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      redirect: "follow",
    });
    if (!response.ok) throw new Error(`Google Sheets respondió ${response.status}`);
    const result = (await response.json()) as { ok?: boolean; error?: string };
    if (!result.ok) return NextResponse.json({ ok: false, message: result.error || "Solicitud rechazada." }, { status: 422 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Founder form delivery failed", error);
    return NextResponse.json({ ok: false, message: "No fue posible guardar la postulación." }, { status: 502 });
  }
}
