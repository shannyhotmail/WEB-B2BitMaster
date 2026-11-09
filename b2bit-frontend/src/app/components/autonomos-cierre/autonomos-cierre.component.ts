import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COSTES, COSTES_TITULO, CTA_CIERRE, DATOS, GRAFICO_ARIA, GRAFICO_TITULO, PREGUNTA } from './autonomos-cierre.data';

/**
 * Cierre de /autonomosypymes: la pregunta con el gráfico, los costes ocultos y un único
 * botón que sube (solo scroll) a #formulario.
 */
@Component({
  selector: 'app-autonomos-cierre',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cierre">
      <div class="wrap">
        <section class="diag" aria-labelledby="diag-h">
          <div>
            <p class="eyebrow">{{ pregunta.eyebrow }}</p>
            <h2 id="diag-h">{{ pregunta.titulo }}</h2>
            <p class="lead">{{ pregunta.texto }}</p>
          </div>
          <figure class="chart" aria-labelledby="chart-t">
            <h3 id="chart-t">{{ graficoTitulo }}</h3>
            <div class="bars" role="img" [attr.aria-label]="graficoAria">
              <div class="bar" *ngFor="let d of datos">
                <b [style.color]="d.colorNumero">{{ d.etiqueta }}</b>
                <i [style.height]="'calc(var(--area) * ' + d.alto / 100 + ')'" [style.background]="d.color"></i>
              </div>
            </div>
            <ul class="legend">
              <li *ngFor="let d of datos">
                <span class="sw" [style.background]="d.color"></span>
                <span><b>{{ d.etiqueta }}</b> {{ d.texto }}</span>
                <span class="src">{{ d.fuente }}</span>
              </li>
            </ul>
          </figure>
        </section>

        <section class="costes" aria-labelledby="costes-h">
          <h2 id="costes-h">{{ costesTitulo }}</h2>
          <div class="cards">
            <article class="c" *ngFor="let c of costes">
              <h3>{{ c.titulo }}</h3>
              <p>{{ c.texto }}</p>
            </article>
          </div>
          <p class="end"><button class="btn" type="button" (click)="irAlFormulario()">{{ cta }}</button></p>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['./autonomos-cierre.component.scss']
})
export class AutonomosCierreComponent {
  readonly pregunta = PREGUNTA;
  readonly graficoTitulo = GRAFICO_TITULO;
  readonly graficoAria = GRAFICO_ARIA;
  readonly datos = DATOS;
  readonly costesTitulo = COSTES_TITULO;
  readonly costes = COSTES;
  readonly cta = CTA_CIERRE;

  irAlFormulario(): void {
    const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('formulario')?.scrollIntoView({ behavior: reducir ? 'auto' : 'smooth', block: 'start' });
  }
}
