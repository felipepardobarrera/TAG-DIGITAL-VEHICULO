export type SiteEvent =
  | "hero_primary_cta_clicked" | "hero_demo_clicked" | "founder_form_started"
  | "founder_form_submitted" | "founder_form_error" | "vehicle_profile_selected"
  | "security_section_viewed" | "faq_opened" | "final_cta_clicked";

export function trackEvent(event: SiteEvent, detail?: Record<string, string>) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("vehicle-wallet:event", { detail: { event, ...detail } }));
  // Conecta aquí tu proveedor de analítica autorizado. No se envían datos a terceros actualmente.
}
