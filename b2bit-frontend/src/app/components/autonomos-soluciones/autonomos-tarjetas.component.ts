import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BIG, Tarjeta } from './autonomos-soluciones.data';
import { AutonomosSolucionesState } from './autonomos-soluciones.state';

/**
 * Tarjetas grandes de /autonomosypymes (5 + "Y mucho más"). Cada una es un botón
 * que abre la zona de soluciones filtrada por ese grupo y baja hasta ella.
 */
@Component({
  selector: 'app-autonomos-tarjetas',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="tarjetas" aria-labelledby="tarjetas-h">
      <div class="wrap">
        <h2 id="tarjetas-h" class="sec-h">Lo que más te va a ayudar</h2>
        <div class="big">
          <button
            *ngFor="let t of tarjetas"
            type="button"
            class="bigcard"
            [attr.data-fam]="t.fam"
            [class.sel]="state.abierto() && state.grupo() === t"
            aria-controls="soluciones"
            (click)="state.abrirGrupo(t)">
            <span class="icon" [innerHTML]="iconos.get(t)"></span>
            <h3>{{ t.title }}</h3>
            <p>{{ t.text }}</p>
            <span class="go">Ver soluciones para mi tipo de negocio →</span>
          </button>
          <button
            type="button"
            class="bigcard more"
            [class.sel]="state.abierto() && !state.grupo()"
            aria-controls="soluciones"
            (click)="state.abrirGrupo(null)">
            <span class="plus" aria-hidden="true">+</span>
            <h3>Y mucho más</h3>
            <p>Todo lo que podemos hacer por tu negocio.</p>
            <span class="go">Ver todo →</span>
          </button>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./autonomos-tarjetas.component.scss']
})
export class AutonomosTarjetasComponent {
  readonly state = inject(AutonomosSolucionesState);
  readonly tarjetas = BIG;
  // Los SVG son datos propios del repo (no entrada de usuario): se marcan como de confianza
  private sanitizer = inject(DomSanitizer);
  readonly iconos = new Map<Tarjeta, SafeHtml>(BIG.map((t) => [t, this.sanitizer.bypassSecurityTrustHtml(t.icon)]));
}
