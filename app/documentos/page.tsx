import { FeatureCard, MarketingPage, PageCta } from "../components/MarketingPage";

const documents=[
  ["PC","Permiso de circulación","Fecha de vencimiento y copia legible."],
  ["RT","Revisión técnica","Certificado vigente o documento de homologación."],
  ["SO","SOAP","Seguro obligatorio asociado al vehículo."],
  ["PA","Padrón","Certificado de inscripción del vehículo."],
  ["EM","Emisiones","Certificado de emisiones cuando corresponda."],
  ["LC","Licencia de conducir","Documento personal del conductor autorizado."],
  ["HO","Homologación","Certificado para vehículos que corresponda."],
  ["+","Documento adicional","Antecedentes útiles definidos por la persona usuaria."],
];
export default function DocumentsPage(){return <MarketingPage eyebrow="CATÁLOGO DE DOCUMENTOS" title="Todo separado, identificable y fácil de actualizar." intro="La plataforma organiza copias aportadas por la persona usuaria. Cada documento conserva su categoría, vencimiento y relación con el vehículo.">
  <section className="marketing-section"><div className="container document-catalog">{documents.map(([icon,title,text])=><FeatureCard key={title} icon={icon} title={title}><p>{text}</p></FeatureCard>)}</div></section>
  <section className="marketing-section legal-source"><div className="container"><h2>Uso responsable durante una fiscalización</h2><p>La Ley N.º 19.799 regula los documentos electrónicos y reconoce la equivalencia del soporte electrónico y el papel bajo las condiciones que establece. Eso no significa que una fotografía o copia cargada por el usuario sustituya automáticamente todo documento original.</p><p>La aceptación depende del tipo de documento, su origen oficial, integridad, legibilidad y la normativa aplicable. Billetera Vehicular funciona como herramienta de organización y exhibición, no como entidad emisora ni certificadora.</p><div><a href="https://www.bcn.cl/leychile/Navegar?idNorma=196640" target="_blank" rel="noreferrer">Consultar Ley N.º 19.799 en BCN →</a><a href="https://www.sinim.gov.cl/archivos/home/770/Instrucciones_CGR%20P_Circ..pdf" target="_blank" rel="noreferrer">Consultar instrucciones CGR E71389/2021 →</a></div></div></section>
  <PageCta title="Ordena el primer documento." text="Podrás reemplazarlo cuando lo renueves sin reconstruir tu vehículo."/>
  </MarketingPage>}
