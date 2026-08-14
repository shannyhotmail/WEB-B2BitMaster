import { Component, DestroyRef, Input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ProcessStep {
  label: string;
  detail: string;
}

interface LoopNode {
  index: number;
  label: string;
  active: boolean;
  style: { left: string; top: string; transform: string; opacity: string; zIndex: string };
}

const BASE_ANGLES = [0, 90, 180, 270];
const ROTATION_STEP_MS = 3700;

/**
 * Diagrama circular animado y reutilizable (misma mecánica que el sistema
 * solar del home): 4 pasos de proceso orbitan un núcleo central, avanzando
 * 90° cada ~3.7s salvo que el usuario fije uno con click/toque.
 */
@Component({
  selector: 'app-process-loop',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loop" [class]="'loop--' + accent">
      <div class="loop-ring loop-ring--dashed"></div>
      <div class="loop-ring loop-ring--solid"></div>

      <svg class="loop-axes" viewBox="0 0 480 480">
        <line x1="240" y1="240" x2="240" y2="136"></line>
        <line x1="240" y1="240" x2="440" y2="240"></line>
        <line x1="240" y1="240" x2="240" y2="344"></line>
        <line x1="240" y1="240" x2="40" y2="240"></line>
      </svg>

      <div class="loop-sun">
        <p>{{ centerLabel }}</p>
      </div>

      <div
        class="loop-node"
        *ngFor="let node of nodes(); trackBy: trackByIndex"
        [class.active]="node.active"
        [ngStyle]="node.style"
      >
        <button type="button" (click)="select(node.index)">{{ node.label }}</button>
      </div>
    </div>

    <div class="loop-panel">
      <span class="loop-panel-label">{{ displayed().label }}</span>
      <p class="loop-panel-detail">{{ displayed().detail }}</p>
    </div>
  `,
  styleUrls: ['./process-loop.component.scss']
})
export class ProcessLoopComponent {
  @Input({ required: true }) steps!: ProcessStep[];
  @Input({ required: true }) centerLabel!: string;
  @Input() accent: 'gold' | 'terracotta' = 'gold';

  private readonly rotation = signal(0);
  private readonly paused = signal(false);
  private readonly selected = signal<number | null>(null);

  readonly nodes = computed<LoopNode[]>(() => {
    const rotation = this.rotation();
    const selected = this.selected();
    return this.steps.map((step, index) => ({
      index,
      label: step.label,
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

  readonly displayed = computed<ProcessStep>(() => {
    const selected = this.selected();
    const index = selected !== null ? selected : this.bottomIndex();
    return this.steps[index];
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

  private nodeStyle(index: number, baseAngle: number, rotation: number): LoopNode['style'] {
    const angle = (baseAngle + rotation) % 360;
    const rad = (angle * Math.PI) / 180;

    const squash = 0.52;
    let leftPct = 50 + 41.67 * Math.sin(rad);
    let topPct = 50 - 41.67 * squash * Math.cos(rad);

    const depth = (1 - Math.cos(rad)) / 2;
    const scale = 0.68 + 0.42 * depth;
    const opacity = 0.55 + 0.45 * depth;
    const zIndex = Math.round(depth * 100) + 400;

    const sunRadiusPct = 17.5;
    const nodeRadiusPct = 12 * scale;
    const minClearancePct = sunRadiusPct + nodeRadiusPct + 3;
    const dx = leftPct - 50;
    const dy = topPct - 50;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < minClearancePct && dist > 0.001) {
      const k = minClearancePct / dist;
      leftPct = 50 + dx * k;
      topPct = 50 + dy * k;
    } else if (dist <= 0.001) {
      topPct = 50 - minClearancePct;
    }

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
