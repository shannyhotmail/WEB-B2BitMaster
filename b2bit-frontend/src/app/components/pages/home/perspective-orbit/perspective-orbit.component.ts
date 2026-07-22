import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Perspective {
  role: string;
  detail: string;
}

interface OrbitNode {
  index: number;
  role: string;
  active: boolean;
  style: { left: string; top: string; transform: string; opacity: string; zIndex: string };
}

const BASE_ANGLES = [0, 90, 180, 270];
const ROTATION_STEP_MS = 3700;

/**
 * Diagrama circular animado del hero: 4 perspectivas orbitan un núcleo central,
 * avanzando 90° cada ~3.7s salvo que el usuario fije una haciendo click.
 */
@Component({
  selector: 'app-perspective-orbit',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="orbit">
      <div class="orbit-ring orbit-ring--dashed-outer"></div>
      <div class="orbit-ring orbit-ring--dashed-inner"></div>
      <div class="orbit-ring orbit-ring--solid"></div>

      <svg class="orbit-axes" viewBox="0 0 1600 500" preserveAspectRatio="none">
        <line x1="800" y1="250" x2="800" y2="30"></line>
        <line x1="800" y1="250" x2="1560" y2="250"></line>
        <line x1="800" y1="250" x2="800" y2="470"></line>
        <line x1="800" y1="250" x2="40" y2="250"></line>
      </svg>

      <div class="orbit-sun">
        <p>La implantación no es el final.<br><span class="accent">Es el principio.</span></p>
      </div>

      <div
        class="orbit-node"
        *ngFor="let node of nodes(); trackBy: trackByIndex"
        [class.active]="node.active"
        [ngStyle]="node.style"
      >
        <button type="button" (click)="select(node.index)">{{ node.role }}</button>
      </div>
    </div>

    <div class="orbit-panel">
      <span class="orbit-panel-role">{{ displayed().role }}</span>
      <p class="orbit-panel-detail">{{ displayed().detail }}</p>
    </div>
  `,
  styleUrls: ['./perspective-orbit.component.scss']
})
export class PerspectiveOrbitComponent {
  private readonly perspectives: Perspective[] = [
    {
      role: 'Usuario final',
      detail: 'No sabe explotar el software: lo vive como una carga y nunca llega a reportar sus fricciones al proveedor.'
    },
    {
      role: 'Empresa',
      detail: 'El software queda subutilizado y sin métricas centralizadas: múltiples plataformas que podrían consolidarse en muchas menos.'
    },
    {
      role: 'Desarrollador del proveedor',
      detail: 'Trabaja a ciegas: sin señales tempranas del cliente acumula retrabajo y llega mal preparado a los nuevos desafíos.'
    },
    {
      role: 'Proveedor',
      detail: 'El cliente que no entiende la solución no pide evolutivos ni optimizaciones, y el pipeline deja de crecer.'
    }
  ];

  private readonly rotation = signal(0);
  private readonly paused = signal(false);
  private readonly selected = signal<number | null>(null);

  readonly nodes = computed<OrbitNode[]>(() => {
    const rotation = this.rotation();
    const selected = this.selected();
    return this.perspectives.map((perspective, index) => ({
      index,
      role: perspective.role,
      active: selected === index,
      style: this.nodeStyle(index, BASE_ANGLES[index], rotation)
    }));
  });

  private readonly bottomIndex = computed(() => {
    const rotation = this.rotation();
    let best = 0;
    let bestDistance = Infinity;
    BASE_ANGLES.forEach((base, index) => {
      const distance = this.angleDistance((base + rotation) % 360, 180);
      if (distance < bestDistance) {
        bestDistance = distance;
        best = index;
      }
    });
    return best;
  });

  readonly displayed = computed<Perspective>(() => {
    const selected = this.selected();
    const index = selected !== null ? selected : this.bottomIndex();
    return this.perspectives[index];
  });

  constructor() {
    const intervalId = setInterval(() => {
      if (!this.paused()) {
        this.rotation.update(r => (r + 90) % 360);
      }
    }, ROTATION_STEP_MS);

    inject(DestroyRef).onDestroy(() => clearInterval(intervalId));
  }

  trackByIndex(index: number): number {
    return index;
  }

  select(index: number): void {
    if (this.paused() && this.selected() === index) {
      this.paused.set(false);
      this.selected.set(null);
    } else {
      this.paused.set(true);
      this.selected.set(index);
    }
  }

  private nodeStyle(index: number, baseAngle: number, rotation: number): OrbitNode['style'] {
    const angle = (baseAngle + rotation) % 360;
    const rad = (angle * Math.PI) / 180;

    // rx/ry are percentages of the (rectangular) container itself, so the
    // ellipse shape falls out of the container's own aspect ratio.
    const rx = 46;
    const ry = 40;
    const leftPct = 50 + rx * Math.sin(rad);
    const topPct = 50 - ry * Math.cos(rad);

    // Depth: 0 = furthest (back of the ring), 1 = nearest (front).
    const depth = (1 - Math.cos(rad)) / 2;
    const scale = 0.6 + 0.5 * depth;
    const opacity = 0.55 + 0.45 * depth;
    const zIndex = Math.round(depth * 100) + 400;

    return {
      left: `${leftPct}%`,
      top: `${topPct}%`,
      transform: `translate(-50%, -50%) scale(${scale})`,
      opacity: `${opacity}`,
      zIndex: `${zIndex}`
    };
  }

  private angleDistance(a: number, b: number): number {
    const d = Math.abs(a - b) % 360;
    return d > 180 ? 360 - d : d;
  }
}
