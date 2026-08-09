import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.111.0";

const allowedOrigin = "https://billetera-vehicular-chile.felipepardobarrera.chatgpt.site";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "content-type, x-client-info, apikey",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), {
  status,
  headers: { ...corsHeaders, "Content-Type": "application/json", "Cache-Control": "no-store" },
});

const sha256 = async (value: string) => {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
};

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "M\u00e9todo no permitido" }, 405);

  const origin = request.headers.get("origin");
  if (origin && origin !== allowedOrigin) return json({ error: "Origen no permitido" }, 403);

  try {
    const body = await request.json();
    const token = typeof body.token === "string" ? body.token : "";
    const action = body.action === "document" ? "document" : "view";
    if (!/^[A-Za-z0-9_-]{40,100}$/.test(token)) return json({ error: "Acceso inv\u00e1lido" }, 401);

    const secretKeys = Deno.env.get("SUPABASE_SECRET_KEYS");
    const serviceKey = secretKeys
      ? JSON.parse(secretKeys).default
      : Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!serviceKey) throw new Error("Missing server key");

    const admin = createClient(Deno.env.get("SUPABASE_URL")!, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const tokenHash = await sha256(token);
    const { data: vehicle, error: vehicleError } = await admin
      .from("vehicles")
      .select("id,plate,make,model,model_year,nickname,is_fleet,driver_name,inspection_expires_at")
      .eq("inspection_token", tokenHash)
      .eq("inspection_enabled", true)
      .gt("inspection_expires_at", new Date().toISOString())
      .maybeSingle();

    if (vehicleError) throw vehicleError;
    if (!vehicle) return json({ error: "La fiscalizaci\u00f3n venci\u00f3 o fue cancelada" }, 410);

    if (action === "document") {
      const documentId = typeof body.document_id === "string" ? body.document_id : "";
      const { data: document, error: documentError } = await admin
        .from("documents")
        .select("storage_path,original_filename,mime_type")
        .eq("id", documentId)
        .eq("vehicle_id", vehicle.id)
        .eq("visible_in_inspection", true)
        .maybeSingle();
      if (documentError) throw documentError;
      if (!document) return json({ error: "Documento no disponible" }, 404);

      const { data: file, error: fileError } = await admin.storage
        .from("vehicle-documents")
        .download(document.storage_path);
      if (fileError) throw fileError;

      const filename = document.original_filename.replace(/[\r\n"]/g, "-");
      return new Response(file, {
        headers: {
          ...corsHeaders,
          "Content-Type": document.mime_type,
          "Content-Disposition": `inline; filename="${filename}"`,
          "Cache-Control": "no-store, private",
          "X-Content-Type-Options": "nosniff",
        },
      });
    }

    const { data: documents, error: documentsError } = await admin
      .from("documents")
      .select("id,document_type,title,issuer,issued_on,expires_on,verification_status")
      .eq("vehicle_id", vehicle.id)
      .eq("visible_in_inspection", true)
      .order("document_type");
    if (documentsError) throw documentsError;

    return json({
      vehicle: {
        plate: vehicle.plate,
        make: vehicle.make,
        model: vehicle.model,
        model_year: vehicle.model_year,
        nickname: vehicle.nickname,
        responsible_driver: vehicle.is_fleet ? vehicle.driver_name : null,
      },
      documents: documents ?? [],
      expires_at: vehicle.inspection_expires_at,
      notice: "Copias digitales aportadas por la persona usuaria. No sustituyen la verificaci\u00f3n oficial de la autoridad.",
    });
  } catch (error) {
    console.error(error);
    return json({ error: "No pudimos abrir esta fiscalizaci\u00f3n" }, 500);
  }
});
