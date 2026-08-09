import { FeatureCard, MarketingPage, PageCta } from "../components/MarketingPage";

export default function HowItWorksPage(){return <MarketingPage eyebrow="GUÍA COMPLETA" title="Desde el registro hasta una fiscalización, sin perderte." intro="Conoce el recorrido completo de Billetera Vehicular y qué funciones están disponibles durante la prueba beta.">
  <section className="marketing-section"><div className="container marketing-steps">
    <FeatureCard icon="01" title="Crea y confirma tu cuenta"><p>Regístrate con un correo al que tengas acceso. Recibirás un enlace para confirmar tu identidad antes de ingresar.</p></FeatureCard>
    <FeatureCard icon="02" title="Registra tu vehículo"><p>Agrega patente, marca, modelo, año y un nombre de referencia. En flotas también puedes asignar un conductor responsable.</p></FeatureCard>
    <FeatureCard icon="03" title="Carga documentos"><p>Selecciona el tipo de documento, informa su vencimiento y sube una fotografía o PDF legible.</p></FeatureCard>
    <FeatureCard icon="04" title="Configura los avisos"><p>El correo será el primer canal. WhatsApp aparecerá deshabilitado hasta completar su integración empresarial.</p></FeatureCard>
    <FeatureCard icon="05" title="Genera un acceso temporal"><p>Cuando necesites mostrar información, crea un QR de solo lectura válido durante cinco minutos.</p></FeatureCard>
    <FeatureCard icon="06" title="Actualiza y continúa"><p>Cuando renueves un documento, reemplázalo para actualizar su estado y detener los avisos de vencimiento.</p></FeatureCard>
  </div></section>
  <section className="marketing-section dark"><div className="container marketing-video-grid"><article><h2>Tutorial rápido</h2><p>Un resumen directo para conocer todo el recorrido.</p><video controls playsInline preload="metadata"><source src="/videos/01-tutorial-rapido-billetera-vehicular.mp4" type="video/mp4"/></video></article><article><h2>Registro en tiempo real</h2><p>Observa cada campo y acción con datos de demostración.</p><video controls playsInline preload="metadata"><source src="/videos/02-registro-interactivo-billetera-vehicular.mp4" type="video/mp4"/></video></article></div></section>
  <PageCta title="Ahora puedes probarlo tú." text="Crea tu cuenta beta y organiza tu primer vehículo."/>
  </MarketingPage>}
