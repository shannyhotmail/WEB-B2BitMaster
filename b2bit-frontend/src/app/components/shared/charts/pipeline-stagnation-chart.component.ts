import { Component } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

const MUTED = '#5b6b74';

/**
 * Gráfico puramente ilustrativo/conceptual: transmite "pipeline estancado"
 * sin presentarse como dato estadístico. Sin ejes numerados, sin leyenda,
 * sin tooltip — ninguna cifra de esta serie se muestra en ningún punto.
 */
@Component({
  selector: 'app-pipeline-stagnation-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="chart-wrap" aria-hidden="true">
      <canvas baseChart [data]="chartData" [options]="chartOptions" type="line"></canvas>
      <p class="chart-caption">Contratos de desarrollo evolutivo, trimestre a trimestre (ilustrativo)</p>
    </div>
  `,
  styles: [`
    .chart-wrap {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 24px 20px 12px;
    }
    canvas {
      max-height: 200px;
    }
    .chart-caption {
      margin: 12px 0 0;
      font-size: 11px;
      line-height: 1.4;
      color: var(--color-text-muted);
      text-align: center;
      font-style: italic;
    }
  `]
})
export class PipelineStagnationChartComponent {
  readonly chartData: ChartData<'line'> = {
    labels: ['', '', '', '', '', '', ''],
    datasets: [
      {
        data: [3, 3.3, 2.9, 3.2, 2.8, 3.1, 2.9],
        borderColor: MUTED,
        backgroundColor: 'rgba(91, 107, 116, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.35,
        pointRadius: (ctx) => (ctx.dataIndex === 6 ? 5 : 0),
        pointBackgroundColor: MUTED,
        pointBorderColor: '#f8f6f2',
        pointBorderWidth: 2
      }
    ]
  };

  readonly chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 900 },
    interaction: { intersect: false, mode: undefined },
    scales: {
      x: { display: false },
      y: { display: false, min: 0, max: 5 }
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };
}
