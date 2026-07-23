import { Component, Input, Type } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import {
  LucideRouteOff,
  LucideLock,
  LucideMessageCircle,
  LucideHandCoins,
  LucideShieldCheck,
  LucideBrainCircuit,
  LucideNetwork,
  LucideSlidersVertical,
  LucideColumns3,
  LucideEyeOff,
  LucideCpu,
  LucideGoal,
  LucideListChecks,
  LucideRefreshCw,
  LucideChartLine,
  LucideFlag,
  LucideWorkflow
} from '@lucide/angular';

const ICON_MAP: Record<string, Type<unknown>> = {
  'route-off': LucideRouteOff,
  lock: LucideLock,
  'message-circle': LucideMessageCircle,
  'hand-coins': LucideHandCoins,
  'shield-check': LucideShieldCheck,
  'brain-circuit': LucideBrainCircuit,
  network: LucideNetwork,
  'sliders-vertical': LucideSlidersVertical,
  'columns-3': LucideColumns3,
  'eye-off': LucideEyeOff,
  cpu: LucideCpu,
  goal: LucideGoal,
  'list-checks': LucideListChecks,
  'refresh-cw': LucideRefreshCw,
  'chart-line': LucideChartLine,
  flag: LucideFlag,
  workflow: LucideWorkflow
};

/**
 * Envoltorio del sistema único de iconos del sitio (Lucide). `name` es el
 * nombre kebab-case oficial de Lucide (ej. 'lock', 'hand-coins'), mapeado
 * a su componente concreto en ICON_MAP.
 */
@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `<ng-container [ngComponentOutlet]="component"></ng-container>`,
  styles: [`
    :host {
      display: inline-flex;
    }
    :host ::ng-deep svg {
      width: auto;
      height: 100%;
      stroke-width: 1.7;
    }
  `]
})
export class IconComponent {
  component: Type<unknown> | null = null;

  @Input({ required: true }) set name(value: string) {
    this.component = ICON_MAP[value] ?? null;
  }
}
