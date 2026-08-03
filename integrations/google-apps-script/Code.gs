const SPREADSHEET_ID = "12tseO7HdZuE1gtYmvAcNel3B6aH4YZk-F-gFMc9iWVE";
const SHEET_NAME = "Postulaciones";
const CURRENT_POLICY_VERSION = "1.0 — 3 de agosto de 2026";
const RETENTION_MONTHS = 12;
const CONFIRMATION_STATUS_COLUMN = 13;
const CONTACT_EMAIL = "felipepardobarrera@gmail.com";
const SITE_URL = "https://billetera-vehicular-chile.felipepardobarrera.chatgpt.site";

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents || "{}");
    const validation = validatePayload_(payload);
    if (!validation.ok) return json_({ ok: false, error: validation.error });
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    let sheet;
    let row;
    try {
      sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
      if (!sheet) throw new Error("No se encontró la pestaña de postulaciones.");
      sheet.appendRow([
        new Date(), clean_(payload.name,120), clean_(payload.email,180), clean_(payload.phone,30),
        clean_(payload.region,80), clean_(payload.vehicles,20), clean_(payload.type,80),
        clean_(payload.problem,1000), "Sí", "Nuevo", "Landing web",
        clean_(payload.policyVersion || CURRENT_POLICY_VERSION,120), "Pendiente"
      ]);
      row = sheet.getLastRow();
    } finally {
      lock.releaseLock();
    }

    let emailStatus = "Enviado";
    try {
      sendConfirmationEmail_(payload);
    } catch (emailError) {
      console.error("No se pudo enviar la confirmación:", emailError);
      emailStatus = String(emailError).indexOf("CUOTA_AGOTADA") !== -1 ? "Sin cuota" : "Error";
    }
    sheet.getRange(row, CONFIRMATION_STATUS_COLUMN).setValue(emailStatus);
    return json_({ok:true,emailSent:emailStatus === "Enviado"});
  } catch (error) {
    console.error(error);
    return json_({ok:false,error:"No fue posible registrar la postulación."});
  }
}

function sendConfirmationEmail_(payload) {
  if (MailApp.getRemainingDailyQuota() < 1) throw new Error("CUOTA_AGOTADA");
  const fullName = String(payload.name || "").trim();
  const firstName = fullName.split(/\s+/)[0] || "Hola";
  const recipient = String(payload.email || "").trim();
  const subject = "Recibimos tu postulación — Billetera vehicular";
  const body = [
    "Hola " + firstName + ",", "",
    "Recibimos correctamente tu postulación al programa de usuarios fundadores de Billetera vehicular.", "",
    "Revisaremos la información y te contactaremos si avanzas a la siguiente etapa. Este correo confirma la recepción, pero no garantiza la selección.", "",
    "Si no realizaste esta solicitud o quieres ejercer tus derechos sobre tus datos personales, responde a este correo.", "",
    "Billetera vehicular", SITE_URL
  ].join("\n");
  const safeName = escapeHtml_(firstName);
  const htmlBody = "<p>Hola " + safeName + ",</p>" +
    "<p>Recibimos correctamente tu postulación al programa de usuarios fundadores de <strong>Billetera vehicular</strong>.</p>" +
    "<p>Revisaremos la información y te contactaremos si avanzas a la siguiente etapa. Este correo confirma la recepción, pero no garantiza la selección.</p>" +
    "<p>Si no realizaste esta solicitud o quieres ejercer tus derechos sobre tus datos personales, responde a este correo.</p>" +
    "<p><strong>Billetera vehicular</strong><br><a href=\"" + SITE_URL + "\">" + SITE_URL + "</a></p>";
  MailApp.sendEmail({
    to: recipient, subject: subject, body: body, htmlBody: htmlBody,
    name: "Billetera vehicular", replyTo: CONTACT_EMAIL
  });
}

// Ejecuta esta función una vez desde el editor para autorizar el envío de correos.
function authorizeEmail() {
  Logger.log("Cuota diaria restante: " + MailApp.getRemainingDailyQuota());
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
function escapeHtml_(value){return String(value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");}
function json_(value){return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);}
