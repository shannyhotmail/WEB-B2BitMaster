import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

type QbrBoxId = 'activacion' | 'diagnostico' | 'radar-cuenta' | 'qbr' | 'radar-cartera';

/**
 * Diagrama grande del ciclo QBR (sección "¿Qué es TAI?"), réplica del diseño
 * importado desde Claude Design a escala completa. Cada una de las 5 cajas
 * se expande de forma independiente (estado propio por id, no compartido).
 */
@Component({
  selector: 'app-qbr-cycle-diagram',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qbrd">
      <div class="qbrd-top-row">
        <div class="qbrd-card qbrd-card--1">
          <button
            type="button"
            class="qbrd-card-trigger"
            (click)="toggle('activacion')"
            [attr.aria-expanded]="isExpanded('activacion')"
          >
            <div class="qbrd-card-strip"></div>
            <div class="qbrd-card-body">
              <span class="qbrd-card-title">Activación</span>
              <span class="qbrd-card-tag">On boarding / Capacitación</span>
            </div>
          </button>
          <span class="qbrd-chevron" [class.qbrd-chevron--open]="isExpanded('activacion')" aria-hidden="true">▾</span>
          <div class="qbrd-detail" *ngIf="isExpanded('activacion')">
            <p>
              Nos convertimos en su mejor aliado para lograr un <strong>blindaje estratégico</strong> de sus cuentas. Al eliminar la fricción del usuario, el cliente integra su software en su operativa diaria y se vuelve menos propenso a buscar alternativas. <strong>Un cliente que domina la herramienta no cambia de proveedor: pide más funciones.</strong>
            </p>
          </div>
        </div>

        <div class="qbrd-card qbrd-card--2">
          <button
            type="button"
            class="qbrd-card-trigger"
            (click)="toggle('diagnostico')"
            [attr.aria-expanded]="isExpanded('diagnostico')"
          >
            <div class="qbrd-card-strip"></div>
            <div class="qbrd-card-body">
              <span class="qbrd-card-title">Diagnóstico</span>
              <span class="qbrd-card-tag">QC / Evolutivos</span>
            </div>
          </button>
          <span class="qbrd-chevron" [class.qbrd-chevron--open]="isExpanded('diagnostico')" aria-hidden="true">▾</span>
          <div class="qbrd-detail" *ngIf="isExpanded('diagnostico')">
            <p>
              Convertimos cada sesión de on-boarding en un punto de escucha — un auténtico <strong>"caballo de Troya"</strong>. <strong>Detectamos</strong> la percepción real sobre la calidad de la implantación y las brechas evolutivas que han surgido desde el go-live, susceptibles de convertirse en <strong>nuevas oportunidades de negocio</strong>.
            </p>
          </div>
        </div>

        <div class="qbrd-card qbrd-card--3">
          <button
            type="button"
            class="qbrd-card-trigger"
            (click)="toggle('radar-cuenta')"
            [attr.aria-expanded]="isExpanded('radar-cuenta')"
          >
            <div class="qbrd-card-strip"></div>
            <div class="qbrd-card-body">
              <span class="qbrd-card-title">Radar de Cuenta</span>
              <span class="qbrd-card-tag">Dossier de Oportunidades</span>
            </div>
          </button>
          <span class="qbrd-chevron" [class.qbrd-chevron--open]="isExpanded('radar-cuenta')" aria-hidden="true">▾</span>
          <div class="qbrd-detail" *ngIf="isExpanded('radar-cuenta')">
            <p>
              Una <strong>matriz de oportunidades</strong> de negocio y una <strong>auditoría de percepción</strong> que le permite corregir desviaciones antes de que se conviertan en una baja del servicio. Imagine llegar a su próxima reunión sin esperar requerimientos, sino presentando un plan de crecimiento basado en información de primera mano, la de los propios usuarios. <strong>Esto es creación activa de oportunidades.</strong>
            </p>
          </div>
        </div>

        <div class="qbrd-card qbrd-card--4">
          <button
            type="button"
            class="qbrd-card-trigger"
            (click)="toggle('qbr')"
            [attr.aria-expanded]="isExpanded('qbr')"
          >
            <div class="qbrd-card-strip"></div>
            <div class="qbrd-card-body qbrd-card-body--gold">
              <span class="qbrd-card-title-row">
                <span class="qbrd-card-title">QBR</span>
                <span class="qbrd-badge">Servicio adicional</span>
              </span>
              <span class="qbrd-card-tag">Quarterly Business Review</span>
            </div>
          </button>
          <span class="qbrd-chevron" [class.qbrd-chevron--open]="isExpanded('qbr')" aria-hidden="true">▾</span>
          <span class="qbrd-arrow-down">↓</span>
          <div class="qbrd-detail" *ngIf="isExpanded('qbr')">
            <p>
              Las sesiones de feedback con el cliente no terminan en un evento: las convertimos en una cadencia trimestral, generando una actualización recurrente del Radar de Cuenta. <strong>Cada trimestre refuerza su papel de socio estratégico ante ese cliente</strong>, no el de proveedor sustituible entre una renovación y la siguiente.
            </p>
          </div>
        </div>
      </div>

      <div class="qbrd-bottom-row">
        <div class="qbrd-spacer"></div>
        <div class="qbrd-cycle">
          <div class="qbrd-mini-row">
            <div class="qbrd-mini">
              <div class="qbrd-mini-card">
                <div class="qbrd-mini-strip"></div>
                <span class="qbrd-mini-label">QBR</span>
              </div>
              <span class="qbrd-arrow-down qbrd-arrow-down--mini">↓</span>
            </div>
            <div class="qbrd-mini">
              <div class="qbrd-mini-card">
                <div class="qbrd-mini-strip"></div>
                <span class="qbrd-mini-label">QBR</span>
              </div>
              <span class="qbrd-arrow-down qbrd-arrow-down--mini">↓</span>
            </div>
            <div class="qbrd-mini">
              <div class="qbrd-mini-card">
                <div class="qbrd-mini-strip"></div>
                <span class="qbrd-mini-label">QBR</span>
              </div>
              <span class="qbrd-arrow-down qbrd-arrow-down--mini">↓</span>
            </div>
          </div>

          <button
            type="button"
            class="qbrd-portfolio-bar"
            (click)="toggle('radar-cartera')"
            [attr.aria-expanded]="isExpanded('radar-cartera')"
          >
            <span class="qbrd-portfolio-title-row">
              <span>Radar de Cartera</span>
              <span class="qbrd-badge qbrd-badge--on-dark">Servicio adicional</span>
              <span class="qbrd-chevron qbrd-chevron--on-dark" [class.qbrd-chevron--open]="isExpanded('radar-cartera')" aria-hidden="true">▾</span>
            </span>
          </button>
          <div class="qbrd-detail" *ngIf="isExpanded('radar-cartera')">
            <p>
              El agregado de todos los clientes que ya están en el ciclo QBR. Detrás de cada diagnóstico hay una metodología propia de extracción y estructuración de datos que convierte percepciones sueltas en una <strong>matriz de oportunidades comparable y accionable</strong>. Cuando ya tiene varios clientes corriendo en el ciclo, se lo entregamos también consolidado: un informe de cartera trimestral para su dirección comercial, con el <strong>mapa completo de expansión de toda su base instalada</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./qbr-cycle-diagram.component.scss']
})
export class QbrCycleDiagramComponent {
  private expanded = new Set<QbrBoxId>();

  isExpanded(id: QbrBoxId): boolean {
    return this.expanded.has(id);
  }

  toggle(id: QbrBoxId): void {
    if (this.expanded.has(id)) {
      this.expanded.delete(id);
    } else {
      this.expanded.add(id);
    }
  }
}
