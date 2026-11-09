/**
 * Datos de la zona de soluciones de /autonomosypymes.
 * Copiados tal cual de la muestra aprobada (_referencia_seccion/index.html); no reescribir los textos.
 */

export type Familia = 'G' | 'C';
export type Nivel = 1 | 2 | 3;

/** Solución del catálogo. sec: negocios a los que aplica (null = a todos); secLvl: nivel distinto para un negocio. */
export interface Solucion {
  id: string;
  fam: Familia;
  lvl: Nivel;
  title: string;
  short: string;
  tpl: string | null;
  sec: string[] | null;
  secLvl?: Record<string, Nivel>;
}

/** Tipo de negocio, con el vocabulario que rellena la plantilla tpl. */
export interface Negocio {
  code: string;
  name: string;
  cli: string;
  cita: string;
  doc: string;
  vuelve: string;
  duda: string;
}

/** Tarjeta grande: agrupa soluciones por ids. */
export interface Tarjeta {
  fam: Familia;
  icon: string;
  title: string;
  text: string;
  ids: string[];
}

export const CTA: Record<Nivel, string> = { 1: 'Quiero empezar ya', 2: 'Quiero esto con IA y datos', 3: 'Quiero hablar de mi empresa' };
export const LV: Record<Nivel, string> = { 1: 'Para empezar ya', 2: 'Con IA y datos', 3: 'Para empresas más grandes' };

export const TYPES: Solucion[] = [
  { id: 'G3', fam: 'G', lvl: 1, title: 'Respuestas rápidas en WhatsApp', short: 'Saludo y respuesta a las preguntas de siempre.', tpl: 'Si preguntan por {duda}, reciben respuesta al momento.', sec: ['T', 'AC', 'AU', 'GY', 'HO', 'RE', 'ES', 'FI', 'FA', 'OP', 'SE', 'GE', 'IN', 'VI'] },
  { id: 'G1', fam: 'G', lvl: 1, title: 'Recordatorios de cita', short: 'Aviso automático antes de cada cita.', tpl: 'Cada {cli} recibe un aviso antes de su {cita} y confirma con un toque.', sec: ['AU', 'RE', 'ES', 'FI', 'DE', 'VE', 'PS', 'AB', 'IN'] },
  { id: 'G4', fam: 'G', lvl: 1, title: 'Presupuestos y facturas con plantilla', short: 'Listos en minutos, con tus tarifas.', tpl: 'Tu {doc} sale en minutos, con las tarifas ya puestas.', sec: ['T', 'AC', 'AU', 'RE', 'CA', 'FI', 'VE', 'PS', 'FN', 'AB', 'VI'] },
  { id: 'G5', fam: 'G', lvl: 1, title: 'Reservas online', short: 'El cliente elige su hueco sin llamar.', tpl: 'El {cli} reserva su {cita} online, sin llamarte.', sec: ['AC', 'RE', 'CA', 'ES', 'VE', 'PS', 'FN', 'IN'] },
  { id: 'G2', fam: 'G', lvl: 1, title: 'Cobros pendientes', short: 'Mensaje amable para reclamar lo que falta.', tpl: 'Cada {cli} recibe un recordatorio amable de lo que tiene pendiente.', sec: ['AC', 'GY', 'FI', 'FN', 'SE', 'AB', 'GE', 'VI'] },
  { id: 'G6', fam: 'G', lvl: 1, title: 'Calendario de vencimientos', short: 'Avisos para que nada caduque.', tpl: 'Una hoja con fechas y avisos: nada vence sin que lo sepas.', sec: ['ES', 'FI', 'FA', 'FN', 'SE', 'GE'] },
  { id: 'G12', fam: 'G', lvl: 1, title: 'Número de empresa virtual', short: 'Saludo y buzón desde tu propio móvil.', tpl: 'Un número de empresa con saludo y buzón, sin cambiar de móvil.', sec: null },
  { id: 'G11', fam: 'G', lvl: 1, title: 'Carpetas y manual breve', short: 'Todo en su sitio y cada cosa explicada.', tpl: 'Carpetas ordenadas y un manual de una página para tu equipo.', sec: null },
  { id: 'G8', fam: 'G', lvl: 2, title: 'Asistente que contesta', short: 'Responde las dudas; tú apruebas.', tpl: 'Un asistente responde sobre {duda}; tú solo apruebas.', sec: ['T', 'AC', 'AU', 'GY', 'HO', 'FI', 'DE', 'FA', 'OP', 'FN', 'SE', 'AB', 'GE', 'IN', 'VI'] },
  { id: 'G10', fam: 'G', lvl: 2, title: 'Del pedido al presupuesto', short: 'Llega el pedido y el presupuesto sale solo.', tpl: 'Llega el pedido de un {cli} y el {doc} se genera y se envía solo.', sec: ['T', 'AC', 'AU', 'RE', 'VE', 'FN', 'AB', 'IN', 'VI'] },
  { id: 'G7', fam: 'G', lvl: 2, title: 'Lectura de facturas y albaranes', short: 'La IA los lee y rellena tus hojas.', tpl: 'La IA lee las facturas de tus proveedores y rellena tu hoja.', sec: ['T', 'RE', 'CA', 'VE', 'FA', 'OP', 'FN', 'SE', 'GE'] },
  { id: 'G13', fam: 'G', lvl: 2, title: 'Facturas desde el móvil', short: 'Una foto y queda ordenada para tu gestor.', tpl: 'Haces una foto a la factura y queda en el registro, lista para tu gestor.', sec: null },
  { id: 'G14', fam: 'G', lvl: 2, title: 'Cruce de facturas y pagos', short: 'Ves al instante lo que no cuadra.', tpl: 'Facturas frente a cobros: ves al instante lo que no cuadra.', sec: null },
  { id: 'P1', fam: 'G', lvl: 3, title: 'Programas conectados', short: 'El dato se escribe una sola vez.', tpl: null, sec: null },
  { id: 'P2', fam: 'G', lvl: 3, title: 'Revisión de herramientas', short: 'Te quedas solo con lo que usas.', tpl: null, sec: null },
  { id: 'P3', fam: 'G', lvl: 3, title: 'Formación y procesos', short: 'Cada puesto sabe qué hacer.', tpl: null, sec: null },
  { id: 'P5', fam: 'G', lvl: 3, title: 'Documentación ordenada', short: 'Cualquier documento, al momento.', tpl: null, sec: null },
  { id: 'C3', fam: 'C', lvl: 1, title: 'Clientes que vuelven', short: 'Aviso cuando toca volver.', tpl: 'Aviso al {cli} cuando toca {vuelve}.', sec: ['T', 'GY', 'ES', 'DE', 'VE', 'OP', 'SE'] },
  { id: 'C1', fam: 'C', lvl: 1, title: 'Seguimiento de presupuestos', short: 'Retoma a quien no contestó.', tpl: 'Quien pidió un {doc} y no contestó recibe un mensaje para retomarlo.', sec: ['AC', 'AU', 'GY', 'CA', 'DE', 'IN'] },
  { id: 'C2', fam: 'C', lvl: 1, title: 'Reseñas', short: 'Pide opiniones y responde con borradores.', tpl: 'Tras cada {cita}, un mensaje pide la reseña al {cli}.', sec: ['HO', 'ES', 'FA', 'VI'] },
  { id: 'C7', fam: 'C', lvl: 1, title: 'Huecos con lista de espera', short: 'Si cancelan, otro ocupa el hueco.', tpl: 'Si cancelan una {cita}, avisamos a quien espera hueco.', sec: ['AU', 'RE', 'DE'] },
  { id: 'C4', fam: 'C', lvl: 2, title: 'Panel de ventas', short: 'Qué te deja más y cómo va tu agenda.', tpl: 'Un panel con lo que más margen te deja y cómo va tu agenda.', sec: ['T', 'AC', 'AU', 'GY', 'HO', 'RE', 'CA', 'ES', 'FI', 'DE', 'VE', 'FA', 'PS', 'OP', 'FN', 'SE', 'AB', 'GE', 'IN', 'VI'] },
  { id: 'C6', fam: 'C', lvl: 2, title: 'Previsión de ventas', short: 'Una mirada orientativa a los próximos meses.', tpl: 'Una previsión orientativa de tus próximos meses.', sec: ['AC', 'AU', 'GY', 'HO', 'RE', 'ES', 'FI', 'DE', 'VE', 'FA', 'PS', 'OP', 'SE', 'AB', 'IN', 'VI'] },
  { id: 'C5', fam: 'C', lvl: 2, title: 'Estudio de tu zona', short: 'Competencia, precios y demanda cerca.', tpl: 'Qué ofrece tu competencia cerca y qué demanda hay.', sec: ['AC', 'AU', 'HO', 'DE', 'VE', 'PS', 'AB', 'IN', 'VI'] },
  { id: 'P6', fam: 'C', lvl: 3, title: 'RAG (Base de conocimiento interna)', short: 'Pregunta y responde con tu propia información.', tpl: 'Pregunta a tus expedientes, informes y contratos y recibe la respuesta con el documento de origen.', sec: ['AB'], secLvl: { AB: 2 } },
  { id: 'P7', fam: 'C', lvl: 3, title: 'Cuadros de mando de dirección', short: 'Todos los datos en una pantalla.', tpl: null, sec: null },
  { id: 'P8', fam: 'C', lvl: 3, title: 'Control de herramientas y costes', short: 'Qué pagas y qué se usa de verdad.', tpl: null, sec: null }
];

export const SEC: Negocio[] = [
  { code: 'T', name: 'Talleres de coche', cli: 'cliente', cita: 'cita en el taller', doc: 'presupuesto de reparación', vuelve: 'la revisión o el cambio de aceite', duda: 'precio y plazo de una reparación' },
  { code: 'AC', name: 'Academias', cli: 'alumno', cita: 'clase', doc: 'presupuesto de curso', vuelve: 'renovar la matrícula', duda: 'horarios y precios de los cursos' },
  { code: 'AU', name: 'Autoescuelas', cli: 'alumno', cita: 'clase práctica', doc: 'presupuesto de matrícula', vuelve: 'el examen o la renovación', duda: 'precio del carné y horarios' },
  { code: 'GY', name: 'Gimnasios', cli: 'socio', cita: 'clase', doc: 'presupuesto de cuota', vuelve: 'retomar el entrenamiento', duda: 'horarios y cuotas' },
  { code: 'HO', name: 'Hoteles', cli: 'huésped', cita: 'reserva', doc: 'presupuesto para grupos', vuelve: 'volver a reservar', duda: 'disponibilidad y tarifas' },
  { code: 'RE', name: 'Restaurantes', cli: 'cliente', cita: 'reserva de mesa', doc: 'presupuesto de evento', vuelve: 'volver a visitarte', duda: 'la carta y las reservas' },
  { code: 'CA', name: 'Carpintería y aluminio', cli: 'cliente', cita: 'visita de medición', doc: 'presupuesto de ventanas', vuelve: 'renovar o ampliar', duda: 'plazos y precio de una ventana' },
  { code: 'ES', name: 'Centros de estética', cli: 'cliente', cita: 'cita', doc: 'presupuesto de tratamiento', vuelve: 'la próxima sesión', duda: 'precios y tratamientos' },
  { code: 'FI', name: 'Fisioterapia', cli: 'paciente', cita: 'sesión', doc: 'presupuesto de bono de sesiones', vuelve: 'la próxima revisión', duda: 'horarios y bonos' },
  { code: 'DE', name: 'Clínicas dentales', cli: 'paciente', cita: 'cita', doc: 'presupuesto de tratamiento', vuelve: 'la revisión anual', duda: 'precios y citas' },
  { code: 'VE', name: 'Veterinarias', cli: 'dueño', cita: 'cita', doc: 'presupuesto de tratamiento', vuelve: 'las vacunas y revisiones', duda: 'horarios y urgencias' },
  { code: 'FA', name: 'Farmacias', cli: 'cliente', cita: 'encargo', doc: 'pedido a proveedor', vuelve: 'renovar su tratamiento habitual', duda: 'stock y horarios' },
  { code: 'PS', name: 'Psicología', cli: 'paciente', cita: 'sesión', doc: 'presupuesto de sesiones', vuelve: 'retomar las sesiones', duda: 'horarios y tarifas' },
  { code: 'OP', name: 'Ópticas', cli: 'cliente', cita: 'revisión', doc: 'presupuesto de gafas', vuelve: 'la próxima revisión', duda: 'precios y plazos' },
  { code: 'FN', name: 'Administración de fincas', cli: 'vecino', cita: 'incidencia', doc: 'presupuesto de mantenimiento', vuelve: 'renovar el contrato', duda: 'incidencias y actas' },
  { code: 'SE', name: 'Seguros', cli: 'asegurado', cita: 'cita', doc: 'presupuesto de póliza', vuelve: 'renovar la póliza', duda: 'coberturas y precio' },
  { code: 'AB', name: 'Despachos', cli: 'cliente', cita: 'consulta', doc: 'propuesta de honorarios', vuelve: 'revisar su caso', duda: 'honorarios y plazos' },
  { code: 'GE', name: 'Gestorías y asesorías', cli: 'cliente', cita: 'reunión', doc: 'propuesta de honorarios', vuelve: 'la declaración trimestral', duda: 'plazos y documentos' },
  { code: 'IN', name: 'Inmobiliarias', cli: 'cliente', cita: 'visita', doc: 'propuesta de venta o alquiler', vuelve: 'una nueva compra o alquiler', duda: 'precio y disponibilidad' },
  { code: 'VI', name: 'Agencias de viajes', cli: 'viajero', cita: 'consulta', doc: 'presupuesto de viaje', vuelve: 'planear su próximo viaje', duda: 'destinos y precios' }
];

export const BIG: Tarjeta[] = [
  { fam: 'G', icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 10h32a2 2 0 0 1 2 2v18a2 2 0 0 1-2 2H22l-9 8v-8H8a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2z"/><path d="M14 18h20M14 25h12"/></svg>', title: 'Que alguien conteste por ti', text: 'WhatsApp y correo respondidos al momento.', ids: ['G3', 'G8', 'G12'] },
  { fam: 'G', icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="9" width="36" height="32" rx="3"/><path d="M6 19h36M15 5v8M33 5v8"/><path d="M17 29l5 5 9-9"/></svg>', title: 'Citas y avisos en automático', text: 'Reservas, recordatorios y renovaciones solos.', ids: ['G5', 'G1', 'G2', 'C3'] },
  { fam: 'G', icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 5h24v38l-4-3-4 3-4-3-4 3-4-3-4 3z"/><path d="M18 15h12M18 22h12M18 29h7"/></svg>', title: 'Facturas y presupuestos al instante', text: 'Hazlos en un minuto y déjalos listos para tu gestor.', ids: ['G4', 'G13', 'G14', 'G6'] },
  { fam: 'G', icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 5h16l8 8v30H13z"/><path d="M29 5v8h8"/><path d="M19 24h12M19 31h8"/></svg>', title: 'Del pedido al presupuesto', text: 'Llega un pedido y el presupuesto se crea y se envía solo.', ids: ['G10', 'G7'] },
  { fam: 'C', icon: '<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 40h36"/><path d="M10 32l9-9 7 6 12-15"/><path d="M30 14h8v8"/></svg>', title: 'Vender más con tus datos', text: 'Qué clientes vuelven y cuáles se te escapan.', ids: ['C3', 'C1', 'C4', 'C6', 'C2'] }
];
