import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";
export default function sitemap():MetadataRoute.Sitemap{return ["","/como-funciona","/productos","/documentos","/flotas","/fiscalizacion/guia","/buscar-vehiculo","/terminos","/privacidad","/eliminacion-de-datos","/aviso-legal"].map((path)=>({url:`${siteConfig.siteUrl}${path}`,lastModified:new Date(),changeFrequency:path?"monthly":"weekly",priority:path?.8:1}))}
