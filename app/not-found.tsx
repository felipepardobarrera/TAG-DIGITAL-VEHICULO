import Link from "next/link";
export default function NotFound(){return <main className="not-found"><span>404</span><h1>Esta ruta no lleva a tu vehículo.</h1><p>La página que buscas no existe o cambió de dirección.</p><Link className="button" href="/">Volver al inicio →</Link></main>}
