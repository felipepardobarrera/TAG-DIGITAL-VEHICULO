import Link from "next/link";
import type { ReactNode } from "react";

export function MarketingPage({eyebrow,title,intro,children}:{eyebrow:string;title:string;intro:string;children:ReactNode}){
  return <>
    <header className="marketing-header"><div className="container"><Link className="marketing-brand" href="/"><span>BV</span><b>Billetera Vehicular</b></Link><nav><Link href="/como-funciona">Cómo funciona</Link><Link href="/productos">Productos</Link><Link href="/documentos">Documentos</Link><Link href="/flotas">Flotas</Link></nav><Link className="marketing-beta" href="/beta">Entrar a la beta</Link></div></header>
    <main className="marketing-page"><section className="marketing-hero"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>{children}</main>
    <footer className="marketing-footer"><div className="container"><div><Link className="marketing-brand" href="/"><span>BV</span><b>Billetera Vehicular</b></Link><p>Tu auto. Tus documentos. Todo bajo control.</p></div><div><b>Explorar</b><Link href="/fiscalizacion/guia">Guía de fiscalización</Link><Link href="/buscar-vehiculo">Buscar mi vehículo</Link><Link href="/privacidad">Privacidad</Link></div><Link className="marketing-beta" href="/beta">Crear cuenta beta</Link></div></footer>
  </>
}

export function FeatureCard({icon,title,children,badge}:{icon:string;title:string;children:ReactNode;badge?:string}){
  return <article className="marketing-card"><span>{icon}</span>{badge&&<small>{badge}</small>}<h2>{title}</h2><div>{children}</div></article>
}

export function PageCta({title,text}:{title:string;text:string}){
  return <section className="marketing-cta"><div className="container"><div><h2>{title}</h2><p>{text}</p></div><Link href="/beta">Comenzar en la beta →</Link></div></section>
}
