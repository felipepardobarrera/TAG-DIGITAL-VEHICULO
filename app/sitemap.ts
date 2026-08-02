import type { MetadataRoute } from "next";
import { siteConfig } from "./site-config";
export default function sitemap():MetadataRoute.Sitemap{return ["","/terminos","/privacidad","/eliminacion-de-datos","/aviso-legal"].map((path)=>({url:`${siteConfig.siteUrl}${path}`,lastModified:new Date(),changeFrequency:path?"yearly":"weekly",priority:path?.8:1}))}
