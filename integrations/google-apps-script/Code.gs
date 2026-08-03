const SPREADSHEET_ID = "12tseO7HdZuE1gtYmvAcNel3B6aH4YZk-F-gFMc9iWVE";
const SHEET_NAME = "Postulaciones";
const CURRENT_POLICY_VERSION = "1.0 — 3 de agosto de 2026";
const RETENTION_MONTHS = 12;

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const validation = validatePayload_(payload);
    if (!validation.ok) return json_({ ok: false, error: validation.error });
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
      if (!sheet) throw new Error("No se encontró la pestaña de postulaciones.");
      sheet.appendRow([new Date(), clean_(payload.name,120), clean_(payload.email,180), clean_(payload.phone,30), clean_(payload.region,80), clean_(payload.vehicles,20), clean_(payload.type,80), clean_(payload.problem,1000), "Sí", "Nuevo", "Landing web", clean_(payload.policyVersion || CURRENT_POLICY_VERSION,120)]);
    } finally { lock.releaseLock(); }
    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: "No fue posible registrar la postulación." });
  }
}
function validatePayload_(p) {
  if (p.website) return {ok:false,error:"Solicitud inválida."};
  if (!p.name || !p.email || !p.phone || !p.region || !p.vehicles || !p.type || !p.problem || p.consent !== "on") return {ok:false,error:"Faltan campos obligatorios."};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(p.email))) return {ok:false,error:"Correo inválido."};
  if (String(p.problem).length < 10) return {ok:false,error:"La descripción es demasiado breve."};
  if ((p.policyVersion || CURRENT_POLICY_VERSION) !== CURRENT_POLICY_VERSION) return {ok:false,error:"Versión de aviso no válida."};
  return {ok:true};
}
function deleteExpiredApplications() {
  const sheet=SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  if (!sheet || sheet.getLastRow()<2) return;
  const cutoff=new Date(); cutoff.setMonth(cutoff.getMonth()-RETENTION_MONTHS);
  const dates=sheet.getRange(2,1,sheet.getLastRow()-1,1).getValues();
  for (let i=dates.length-1;i>=0;i--) if (dates[i][0] instanceof Date && dates[i][0]<cutoff) sheet.deleteRow(i+2);
}
function clean_(value,maxLength){const text=String(value||"").trim().slice(0,maxLength);return /^[=+\-@]/.test(text)?"'"+text:text;}
function json_(value){return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
