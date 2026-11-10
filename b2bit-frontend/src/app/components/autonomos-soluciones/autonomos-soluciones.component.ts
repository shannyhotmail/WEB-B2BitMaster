import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Familia, SEC } from './autonomos-soluciones.data';
import { AutonomosSolucionesState } from './autonomos-soluciones.state';

/**
 * Zona de soluciones de /autonomosypymes (#soluciones): selector de negocio siempre visible
 * y catálogo por niveles. Los botones dorados de cada nivel suben (solo scroll) a #formulario.
 */
@Component({
  selector: 'app-autonomos-soluciones',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div id="soluciones" class="soluciones">
      <div class="wrap">
        <section class="you" aria-labelledby="you-h">
          <h3 id="you-h">Dinos qué negocio tienes y te mostramos <em>cómo sería para ti</em></h3>
          <p>Elige el tuyo y verás cada solución aplicada a tu día a día.</p>
          <div class="chips2" role="group" aria-label="Tipo de negocio">
            <button
              *ngFor="let s of negocios"
              type="button"
              class="chipbtn"
              [attr.aria-pressed]="state.negocio() === s ? 'true' : 'false'"
              (click)="state.alternarNegocio(s)">{{ s.name }}</button>
          </div>
        </section>

        <section id="catalogo" aria-live="polite" [hidden]="!state.abierto()">
          <div class="filt" *ngIf="state.grupo() || state.negocio()">
            <span>
              <ng-container *ngIf="state.negocio() as n">Para <b>{{ n.name }}</b></ng-container>
              <ng-container *ngIf="state.negocio() && state.grupo()"> · </ng-container>
              <ng-container *ngIf="state.grupo() as g"><b>{{ g.title }}</b></ng-container>
            </span>
            <button type="button" class="clear" (click)="state.verTodo()">Ver todo</button>
          </div>

          <div class="fam" role="tablist" aria-label="Familia de soluciones" *ngIf="state.mostrarPestanas()">
            <button
              *ngFor="let f of familias"
              type="button"
              role="tab"
              [attr.data-fam]="f.id"
              [attr.aria-selected]="state.familia() === f.id ? 'true' : 'false'"
              (click)="state.familia.set(f.id)"><span class="t">{{ f.nombre }}</span></button>
          </div>

          <section class="band" *ngFor="let b of state.bandas()">
            <div class="band-h"><h2>{{ b.titulo }}</h2></div>
            <div class="grid">
              <article class="card" *ngFor="let t of b.tarjetas" [class.hit]="state.negocio()" [attr.data-fam]="t.fam">
                <h3>{{ t.title }}</h3>
                <p class="short">{{ t.short }}</p>
                <p class="for" *ngIf="state.paraTuNegocio(t) as texto"><b>Para tu negocio</b>{{ texto }}</p>
              </article>
            </div>
            <button type="button" class="cta" (click)="state.scrollA('formulario')">{{ b.cta }} ↑</button>
          </section>
          <p class="short vacio" *ngIf="!state.bandas().length">Para este negocio no hay nada en este grupo. Pulsa «Ver todo».</p>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['./autonomos-soluciones.component.scss']
})
export class AutonomosSolucionesComponent {
  readonly state = inject(AutonomosSolucionesState);
  readonly negocios = SEC;
  readonly familias: { id: Familia; nombre: string }[] = [
    { id: 'G', nombre: 'Gestión' },
    { id: 'C', nombre: 'Crecimiento' }
  ];
}
