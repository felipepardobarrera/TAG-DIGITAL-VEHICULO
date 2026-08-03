import { LegalPage } from "../components/LegalPage";
import { siteConfig } from "../site-config";
export default function Page(){const mailto=`mailto:${siteConfig.contactEmail}?subject=Solicitud%20de%20derechos%20sobre%20datos`;return <LegalPage title="Eliminación y ejercicio de derechos" updated="3 de agosto de 2026">
<h2>Cómo solicitarlo</h2><p>Escribe gratuitamente a <a href={mailto}>{siteConfig.contactEmail}</a> desde el correo usado en tu postulación. Incluye nombre, derecho que deseas ejercer y una descripción breve.</p>
<h2>Derechos disponibles</h2><p>Puedes solicitar acceso, rectificación, supresión, oposición, bloqueo temporal, portabilidad o revocar tu consentimiento.</p>
<h2>Verificación y respuesta</h2><p>Podremos verificar razonablemente tu identidad. Acusaremos recibo y responderemos dentro de treinta días corridos; cuando la ley lo permita, el plazo podrá prorrogarse una vez.</p>
<h2>Eliminación y excepciones</h2><p>Eliminaremos los datos cuando dejen de ser necesarios o proceda una causal legal. Podrá conservarse información mínima por obligación legal o para reclamaciones, informando el fundamento.</p>
</LegalPage>}
