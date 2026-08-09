import { FeatureCard, MarketingPage, PageCta } from "../components/MarketingPage";

export default function ProductsPage(){return <MarketingPage eyebrow="QR Y ACCESORIOS" title="Elige cómo llevar el acceso a tu vehículo." intro="Todos los planes comienzan con una billetera digital. La tarjeta y el llavero NFC serán alternativas físicas cuando finalice su validación comercial.">
  <section className="marketing-section"><div className="container product-catalog">
    <FeatureCard icon="▦" title="Acceso QR" badge="DISPONIBLE EN BETA"><p>Genera desde tu sesión un código temporal para mostrar únicamente los documentos autorizados.</p><ul><li>Incluido en todos los planes</li><li>Acceso protegido y temporal</li><li>No requiere accesorio físico</li></ul><strong>Desde $5.990 al año</strong></FeatureCard>
    <FeatureCard icon="▣" title="Tarjeta NFC" badge="PRÓXIMAMENTE"><p>Formato tipo tarjeta para abrir el acceso acercándola a un celular compatible o mediante su QR impreso.</p><ul><li>No almacena documentos</li><li>Puede desactivarse si se pierde</li><li>Diseño resistente para uso diario</li></ul><strong>Plan estimado desde $10.990</strong></FeatureCard>
    <FeatureCard icon="●" title="Llavero NFC" badge="PRÓXIMAMENTE"><p>La misma experiencia de acceso físico en un formato compacto para acompañar las llaves del vehículo.</p><ul><li>NFC y respaldo QR</li><li>Vinculado a un vehículo</li><li>Reemplazable y desactivable</li></ul><strong>Precio por confirmar</strong></FeatureCard>
  </div><div className="container availability-note"><b>Transparencia beta</b><p>Actualmente no estamos cobrando ni despachando accesorios. Los precios son estimaciones de lanzamiento y se confirmarán antes de cualquier compra.</p></div></section>
  <PageCta title="Comienza hoy solo con QR." text="Podrás sumar un accesorio más adelante sin perder la información cargada."/>
  </MarketingPage>}
