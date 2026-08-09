import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function getSupabase() {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://npzruonytmytsrzcrheq.supabase.co";
    const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "sb_publishable_4DNSRV0PcZadCTCRkZh7FA_cSHb7Jsf";
    if (!url || !key) throw new Error("La conexión segura de la beta no está configurada.");
    client = createBrowserClient(url, key);
  }
  return client;
}
