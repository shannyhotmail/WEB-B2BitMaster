import { Injectable, computed, signal } from '@angular/core';
import { CTA, Familia, LV, Negocio, Nivel, Solucion, Tarjeta, TYPES } from './autonomos-soluciones.data';

export interface Banda {
  nivel: Nivel;
  titulo: string;
  cta: string;
  tarjetas: Solucion[];
}

/**
 * Estado compartido entre las tarjetas grandes y la zona de soluciones de /autonomosypymes.
 * Se declara en providers de AutonomosYPymesComponent (no en root) para que se reinicie al salir de la landing.
 */
@Injectable()
export class AutonomosSolucionesState {
  readonly familia = signal<Familia>('G');
  readonly negocio = signal<Negocio | null>(null);
  readonly grupo = signal<Tarjeta | null>(null);
  readonly abierto = signal(false);

  /** Sin negocio ni grupo se ven las dos pestañas Gestión / Crecimiento. */
  readonly mostrarPestanas = computed(() => !this.grupo() && !this.negocio());

  readonly bandas = computed<Banda[]>(() => {
    const negocio = this.negocio();
    const grupo = this.grupo();
    const familia = this.familia();
    const bandas: Banda[] = [];
    for (const nivel of [1, 2, 3] as Nivel[]) {
      const tarjetas = TYPES.filter(
        (t) =>
          this.nivelDe(t, negocio) === nivel &&
          this.aplica(t, negocio) &&
          (grupo ? grupo.ids.includes(t.id) : negocio ? true : t.fam === familia)
      );
      if (tarjetas.length) {
        bandas.push({ nivel, titulo: LV[nivel], cta: CTA[nivel], tarjetas });
      }
    }
    return bandas;
  });

  abrirGrupo(grupo: Tarjeta | null): void {
    this.grupo.set(grupo);
    this.abierto.set(true);
    this.scrollA('soluciones');
  }

  alternarNegocio(negocio: Negocio): void {
    this.negocio.set(this.negocio() === negocio ? null : negocio);
    this.grupo.set(null);
    if (this.negocio()) {
      this.abierto.set(true);
      this.scrollA('soluciones');
    }
  }

  verTodo(): void {
    this.grupo.set(null);
    this.negocio.set(null);
  }

  /** Texto "Para tu negocio": rellena la plantilla con el vocabulario del negocio. */
  paraTuNegocio(t: Solucion): string | null {
    const negocio = this.negocio();
    if (!negocio || !t.tpl) {
      return null;
    }
    return t.tpl.replace(/\{(\w+)\}/g, (_, k: string) => (negocio as unknown as Record<string, string>)[k]);
  }

  scrollA(id: string): void {
    const reducir = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reducir ? 'auto' : 'smooth', block: 'start' });
  }

  private nivelDe(t: Solucion, negocio: Negocio | null): Nivel {
    return (negocio && t.secLvl && t.secLvl[negocio.code]) || t.lvl;
  }

  private aplica(t: Solucion, negocio: Negocio | null): boolean {
    return !negocio || (this.nivelDe(t, negocio) < 3 && (!t.sec || t.sec.includes(negocio.code)));
  }
}
