/**
 * Datos del cierre de /autonomosypymes.
 * Copiados tal cual de la muestra aprobada (_referencia_cierre/index.html); no reescribir los textos.
 */

export interface CosteTarjeta {
  titulo: string;
  texto: string;
}

export interface DatoGrafico {
  /** Etiqueta de la barra y de la leyenda */
  etiqueta: string;
  /** Alto de la barra en % del área del gráfico */
  alto: number;
  texto: string;
  fuente: string;
  /** Color de la barra y del cuadradito de la leyenda */
  color: string;
  /** Color del número sobre la barra */
  colorNumero: string;
}

export const PREGUNTA = {
  eyebrow: 'La pregunta correcta sería…',
  titulo: '¿Cuánto te cuesta seguir trabajando como hasta ahora?',
  texto: 'Tareas manuales, herramientas a medias, información en pocas manos. En una sesión te mostramos dónde se pierde tiempo y dinero, y por dónde empezar a recuperarlo, con o sin IA.'
};

export const GRAFICO_TITULO = 'Dónde se pierde el tiempo y el dinero';
export const GRAFICO_ARIA = 'Tres barras: más del 80 %, 55 % y aproximadamente 50 %';

export const DATOS: DatoGrafico[] = [
  { etiqueta: '+80%', alto: 100, texto: 'de las pymes dedica de 2 a 5 días al mes a tareas de gestión', fuente: 'Qonto, 2025', color: 'var(--navy)', colorNumero: 'var(--navy)' },
  { etiqueta: '55%', alto: 68.75, texto: 'de las pymes ahorra 10 h o más a la semana automatizando', fuente: 'Qonto y Appinio, 2025', color: 'var(--gold)', colorNumero: 'var(--gold-ink)' },
  { etiqueta: '≈50%', alto: 62.5, texto: 'de las licencias de software se paga sin usar', fuente: 'Zylo, 2024 (estudio global)', color: 'var(--rust)', colorNumero: 'var(--rust)' }
];

export const COSTES_TITULO = 'Los costes que no ves son los que más pesan';

export const COSTES: CosteTarjeta[] = [
  { titulo: 'Tareas manuales', texto: 'Procesos que dependen de Excel, correos y copiar datos.' },
  { titulo: 'Herramientas infrautilizadas', texto: 'Se paga por licencias que casi nadie usa.' },
  { titulo: 'Información en pocas manos', texto: 'El conocimiento vive en dos o tres personas.' },
  { titulo: 'Decisiones sin datos', texto: 'Ventas, clientes y mercado, sin métricas.' }
];

export const CTA_CIERRE = 'Quiero empezar ya ↑';
