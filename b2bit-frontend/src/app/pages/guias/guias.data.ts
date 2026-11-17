// Guías PDF privadas (/g/<slug>). No hay listado público ni enlaces desde otras páginas.
//
// Para añadir una guía: copia el PDF a src/assets/guias/ y añade una línea aquí.
// El slug debe ser aleatorio y único (12 caracteres [a-z0-9]); generarlo con:
//   node -e "const c=require('crypto');console.log(Array.from(c.randomBytes(12),b=>'abcdefghijklmnopqrstuvwxyz0123456789'[b%36]).join(''))"
// Nunca uses palabras legibles en el slug.

export type EstadoGuia = 'lista' | 'preparacion';

export interface Guia {
  /** Parte secreta de la URL: /g/<slug> */
  slug: string;
  /** Uso interno (analítica). Nunca se muestra al visitante. */
  palabraClave: string;
  /** Publicación de origen, p. ej. 'Carrusel "..." (IG, mié 18 nov)' */
  publicacion: string;
  titulo: string;
  /** Nombre del PDF dentro de src/assets/guias/ */
  archivo: string;
  estado: EstadoGuia;
}

export const GUIAS_RUTA_ASSETS = '/assets/guias/';

export const GUIAS: Guia[] = [
  { slug: 'qki9mmbdbg58', palabraClave: 'EMPIEZA', publicacion: 'Carrusel "Primeros pasos con la IA" (IG, mié 18 nov)', titulo: 'Primeros pasos con la IA', archivo: '2026-11-18_GUIA_Primeros-pasos-con-la-IA.pdf', estado: 'lista' },
  { slug: '9r4l7q8zrcyc', palabraClave: 'MAPA', publicacion: 'Reel "Todas las IA se parecen" (IG + TikTok, mié 25 nov)', titulo: 'El mapa de la IA: las 4 zonas que se repiten en todas', archivo: '2026-11-23_GUIA_MAPA-las-4-zonas-de-la-IA.pdf', estado: 'lista' },
  { slug: 'uz4o7b9xdw30', palabraClave: 'GEMINI', publicacion: 'Clase 2 "Gemini, sin miedo" (lun 30 nov)', titulo: 'Gemini y Nano Banana, sin miedo', archivo: '2026-11-30_GUIA_Gemini-y-Nano-Banana-sin-miedo.pdf', estado: 'lista' },
  { slug: 'rs3kusj3pjc6', palabraClave: 'CHATGPT', publicacion: 'Clase 3 "ChatGPT, sin miedo" (lun 7 dic)', titulo: 'ChatGPT, sin miedo', archivo: '2026-12-07_GUIA_ChatGPT-sin-miedo.pdf', estado: 'lista' },
  { slug: '68c967jwm8jf', palabraClave: 'CLAUDE', publicacion: 'Clase 4 "Claude, sin miedo" (lun 14 dic)', titulo: 'Claude, sin miedo', archivo: '2026-12-14_GUIA_Claude-sin-miedo.pdf', estado: 'lista' },
  { slug: 'oz7fxbdspov1', palabraClave: 'PREGUNTA', publicacion: 'Carrusel y Reel "Pregunta bien" (mediados de dic)', titulo: 'Pregunta bien, responde bien', archivo: '2026-11-30_GUIA_Pregunta-bien-responde-bien.pdf', estado: 'lista' }
];
