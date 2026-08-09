import { MarketingPage } from "../components/MarketingPage";

export default function VehicleLookupPage(){return <MarketingPage eyebrow="ACCESO MEDIANTE QR" title="La búsqueda pública todavía no está habilitada." intro="Para proteger la información, ningún vehículo será localizable escribiendo solamente su patente.">
  <section className="marketing-section"><div className="container lookup-safe"><span>▦</span><h2>El acceso se realizará mediante un enlace o QR temporal.</h2><p>Cuando esta función salga de la beta, el propietario generará un código de duración limitada y decidirá qué documentos mostrar. No existirá un directorio público de patentes.</p><label>Patente o código de acceso<input disabled placeholder="Función en preparación"/></label><button disabled>Buscar vehículo</button><small>Disponible después de completar las pruebas de seguridad y privacidad.</small></div></section>
  </MarketingPage>}
