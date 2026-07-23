import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RadarPoint {
  cx: number;
  cy: number;
  delay?: number;
}

interface RadarAngle {
  angle: number;
  radius: number;
}

const CENTER = 200;
const OUTER_RADIUS = 180;
const SWEEP_DURATION_S = 6;
const BLIND_SPAN_DEG = 65;
const BLIND_CENTER_DEG = 0;

const ACTIVE_ANGLES: RadarAngle[] = [
  { angle: 45, radius: 70 },
  { angle: 70, radius: 150 },
  { angle: 100, radius: 100 },
  { angle: 130, radius: 170 },
  { angle: 160, radius: 60 },
  { angle: 190, radius: 140 },
  { angle: 220, radius: 95 },
  { angle: 250, radius: 175 },
  { angle: 280, radius: 65 },
  { angle: 300, radius: 130 }
];

const BLIND_ANGLES: RadarAngle[] = [
  { angle: -20, radius: 100 },
  { angle: 0, radius: 150 },
  { angle: 20, radius: 65 }
];

function toPoint(angleDeg: number, radius: number): { cx: number; cy: number } {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    cx: CENTER + radius * Math.cos(rad),
    cy: CENTER + radius * Math.sin(rad)
  };
}

function normalizeAngle(angleDeg: number): number {
  return ((angleDeg % 360) + 360) % 360;
}

/**
 * Radar de cuentas: barrido continuo (360°, velocidad uniforme) que hace
 * parpadear cada punto activo justo cuando lo cruza (animation-delay
 * calculado por ángulo). Los puntos dentro del sector "zona ciega" son
 * estáticos y nunca reaccionan al barrido.
 */
@Component({
  selector: 'app-radar-blindspot',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="radar-wrap">
      <svg
        class="radar-svg"
        viewBox="0 0 400 400"
        role="img"
        aria-label="Radar de cuentas de cliente: un sector permanece en zona ciega, sin visibilidad del proveedor"
      >
        <circle class="radar-ring" cx="200" cy="200" r="60"></circle>
        <circle class="radar-ring" cx="200" cy="200" r="120"></circle>
        <circle class="radar-ring" cx="200" cy="200" r="180"></circle>

        <path class="radar-blindzone" [attr.d]="blindZonePath"></path>

        <circle
          *ngFor="let p of blindPoints"
          class="radar-point radar-point--blind"
          [attr.cx]="p.cx"
          [attr.cy]="p.cy"
          r="5"
        ></circle>

        <circle
          *ngFor="let p of activePoints"
          class="radar-point radar-point--active"
          [attr.cx]="p.cx"
          [attr.cy]="p.cy"
          r="4.5"
          [style.animation-delay.s]="p.delay"
          [style.animation-duration.s]="sweepDuration"
        ></circle>

        <line
          class="radar-sweep"
          x1="200"
          y1="200"
          [attr.x2]="200 + outerRadius"
          y2="200"
          [style.animation-duration.s]="sweepDuration"
        ></line>
      </svg>
    </div>
  `,
  styleUrls: ['./radar-blindspot.component.scss']
})
export class RadarBlindspotComponent {
  readonly sweepDuration = SWEEP_DURATION_S;
  readonly outerRadius = OUTER_RADIUS;

  readonly activePoints: RadarPoint[] = ACTIVE_ANGLES.map(({ angle, radius }) => ({
    ...toPoint(angle, radius),
    delay: (normalizeAngle(angle) / 360) * SWEEP_DURATION_S
  }));

  readonly blindPoints: RadarPoint[] = BLIND_ANGLES.map(({ angle, radius }) => toPoint(angle, radius));

  readonly blindZonePath = this.buildBlindZonePath();

  private buildBlindZonePath(): string {
    const half = BLIND_SPAN_DEG / 2;
    const start = toPoint(BLIND_CENTER_DEG - half, OUTER_RADIUS);
    const end = toPoint(BLIND_CENTER_DEG + half, OUTER_RADIUS);
    return `M 200 200 L ${start.cx} ${start.cy} A ${OUTER_RADIUS} ${OUTER_RADIUS} 0 0 1 ${end.cx} ${end.cy} Z`;
  }
}
