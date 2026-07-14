import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { SeoService } from '../../../services/seo.service';
import { IconComponent } from '../../shared/icon/icon.component';
import { ProcessLoopComponent, ProcessStep } from '../../shared/process-loop/process-loop.component';
import { PipelineStagnationChartComponent } from '../../shared/charts/pipeline-stagnation-chart.component';

/**
 * Tech Adoption Intelligence (TAI): servicio de inteligencia de retención
 * para Partners y proveedores de software sobre su cartera ya vendida.
 */
@Component({
  selector: 'app-intelligence',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent, ProcessLoopComponent, PipelineStagnationChartComponent],
  template: `
    <div class="page tai-page">
      <section class="page-hero">
        <a routerLink="/home" class="back-link">← Volver al inicio</a>
        <span class="eyebrow">Para Partners y proveedores de software</span>
        <h1>Tech Adoption Intelligence (TAI)</h1>
        <p class="lead">
          Un motor externo que mueve el <strong>Net Revenue Retention (NRR)</strong> de tu cartera, trimestre a trimestre: recuperas el control estratégico de la cuenta y activas upselling y cross-selling con datos, no con suposiciones.
        </p>
        <button type="button" class="btn-primary" (click)="navigateToContact()">Quiero blindar y expandir mis cuentas</button>
      </section>

      <section class="section">
        <div class="section-grid">
          <div class="section-image section-image--chart">
            <app-pipeline-stagnation-chart></app-pipeline-stagnation-chart>
          </div>
          <div class="section-copy">
            <h2>La ceguera del proveedor de software</h2>
            <p>
              Como Partner o proveedor de software, tu mayor activo es tu cartera de clientes, pero también es tu mayor punto ciego. Tras la implantación pierdes visibilidad: no sabes si el cliente está infrautilizando la solución, no pide evolutivos porque ni siquiera sabe qué más puede hacer la herramienta, y probablemente ya esté usando procesos manuales paralelos en Excel para cubrir lo que no domina.
            </p>
            <p>
              La falta de feedback estructurado post-venta es uno de los factores de <strong>churn</strong> más citados en el sector SaaS/B2B: cuando nadie audita la adopción real, el riesgo de churn silencioso no desaparece, simplemente deja de verse.
            </p>
            <p class="closing">La falta de feedback no es paz; es una señal de peligro.</p>
          </div>
        </div>
      </section>

      <section class="section section-alt" id="que-es-tai">
        <h2>¿Qué es TAI?</h2>
        <p class="section-intro">
          TAI es un servicio externalizado de inteligencia de retención sobre tu cartera ya vendida. Coordinamos el diagnóstico, la ejecución —propia o a través de nuestra red de especialistas certificados por plataforma— y el reporting, siempre bajo una única metodología. El resultado no es un curso: es una <strong>Matriz de Oportunidades</strong> entregada dentro de un ciclo <strong>QBR (Quarterly Business Review)</strong> trimestral.
        </p>
        <div class="card-grid card-grid--3">
          <article class="offer-card" *ngFor="let card of offerCards">
            <app-icon class="offer-card-icon" [name]="card.icon"></app-icon>
            <h3>{{ card.title }}</h3>
            <p [innerHTML]="card.back"></p>
          </article>
        </div>
      </section>

      <section class="section">
        <div class="section-grid reverse">
          <div class="section-copy">
            <span class="eyebrow eyebrow--sm">Resultado</span>
            <h2>Un modelo circular de generación de negocio</h2>
            <p class="closing closing--first">Pasas de una relación transaccional a ser un aliado imprescindible.</p>
            <p>
              Tu pipeline deja de depender solo de captar nuevos logos y empieza a alimentarse del crecimiento orgánico de tu cartera actual, ciclo QBR tras ciclo QBR.
            </p>
            <p>
              Imagina entrar a tu próxima reunión de cuenta no a preguntar "¿cómo va todo?", sino a presentar un plan de crecimiento basado en necesidades reales detectadas en sus propios empleados. Eso es <strong>fidelización activa</strong>.
            </p>
          </div>
          <div class="section-image section-image--loop">
            <app-process-loop [steps]="resultSteps" centerLabel="Revenue Driven Loop" accent="gold"></app-process-loop>
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <h2>¿Por qué delegar este servicio post venta en nosotros?</h2>
        <p class="section-intro">
          Muchos Partners o proveedores de software intentan que sus propios consultores o comerciales hagan este trabajo, pero fracasan por cuatro razones críticas que nosotros resolvemos.
        </p>
        <div class="card-grid card-grid--4">
          <article class="offer-card" *ngFor="let card of whyCards">
            <app-icon class="offer-card-icon" [name]="card.icon"></app-icon>
            <h3>{{ card.title }}</h3>
            <p [innerHTML]="card.back"></p>
          </article>
        </div>
      </section>

      <section class="section section-commercial">
        <h2>Modelo comercial</h2>
        <p>
          Nuestro modelo de pago se adapta al tipo de valor generado: una cuota base cubre el diagnóstico y el ciclo QBR trimestral, y un componente adicional se activa únicamente cuando el informe se traduce en un contrato real de desarrollo evolutivo para ti. Así, <strong>nuestro incentivo queda alineado con el tuyo desde el primer día</strong>.
        </p>
      </section>

      <section class="section section-faq">
        <h2>Preguntas frecuentes sobre TAI</h2>
        <div class="faq-list">
          <details class="faq-item" *ngFor="let item of faqItems">
            <summary>{{ item.q }}</summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
      </section>

      <section class="section cta-section">
        <h2>Delega este servicio post venta en nosotros y conviértete en el socio estratégico de tus clientes</h2>
        <p class="bridge-note">
          ¿Tu cliente final necesita antes poner en orden su propia operación interna? Nuestro servicio hermano, <a routerLink="/strategy">Tech Adoption Strategy (TAS)</a>, hace ese diagnóstico directamente con la empresa usuaria, y puede alimentar de vuelta tu propia Matriz de Oportunidades.
        </p>
        <div class="button-group">
          <button type="button" class="btn-primary" (click)="navigateToContact()">Quiero blindar y expandir mis cuentas</button>
          <button type="button" class="btn-secondary" (click)="downloadBrochure()">Descargar Brochure TAI Services</button>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./intelligence.component.scss']
})
export class IntelligenceComponent implements OnInit {
  private router = inject(Router);
  private seo = inject(SeoService);

  resultSteps: ProcessStep[] = [
    {
      label: 'Activación',
      detail: 'Arrancamos el ciclo con la formación técnica como punto de entrada a la operativa real del cliente.'
    },
    {
      label: 'Diagnóstico',
      detail: 'Documentamos cada carencia y proceso manual que el software aún no cubre, extrayendo la información que tu equipo comercial no puede ver por sí mismo.'
    },
    {
      label: 'Matriz de Oportunidades',
      detail: 'Entregamos el hallazgo dentro del ciclo QBR trimestral: upselling y cross-selling identificado y listo para cerrar.'
    },
    {
      label: 'Expansión (Pipeline)',
      detail: 'Tu pipeline se alimenta del crecimiento orgánico de la cartera actual, ciclo QBR tras ciclo QBR, y el proceso vuelve a activarse.'
    }
  ];

  offerCards = [
    {
      title: 'Detección de Brechas Evolutivas',
      icon: 'route-off',
      back:
        'Cada ciclo QBR trimestral incluye una Matriz de Oportunidades con los requerimientos técnicos reales que el cliente aún no sabe que tiene, con <strong>upselling y cross-selling identificado</strong> y listo para que tu equipo comercial lo cierre.'
    },
    {
      title: 'Blindaje Estratégico',
      icon: 'lock',
      back:
        'Al eliminar la fricción del usuario, el cliente integra tu software en su operativa diaria y se vuelve menos propenso a buscar alternativas. Un cliente que domina la herramienta <strong>no cambia de proveedor; pide más funciones</strong>.'
    },
    {
      title: 'Feedback de percepción del producto',
      icon: 'message-circle',
      back:
        'Dentro de cada QBR entregamos una auditoría de percepción que te permite corregir desviaciones antes de que se conviertan en una baja del servicio. No es un resumen de asistencia: es <strong>inteligencia de cuenta accionable</strong>.'
    }
  ];

  whyCards = [
    {
      title: 'Liberación de Recursos Críticos',
      icon: 'hand-coins',
      back:
        'Tus consultores senior deben estar implantando, no dando formación básica. Al contratarnos, <strong>liberas a tu equipo de mayor coste</strong> para tareas de alta facturación, mientras nosotros generamos el pipeline para sus próximos proyectos.'
    },
    {
      title: 'El Canal de Confianza',
      icon: 'shield-check',
      back:
        'El cliente suele ser reticente a pedir mejoras a su Partner por miedo a que "le quieran vender algo más". Al presentarnos como un auditor externo de adopción, <strong>el cliente baja la guardia y confiesa sus necesidades reales</strong>, que nosotros te entregamos listas para facturar.'
    },
    {
      title: 'Metodología de Extracción de Datos',
      icon: 'brain-circuit',
      back:
        'Tu equipo enseña a usar el software; nosotros estamos entrenados para extraer inteligencia. Cada una de nuestras sesiones es una <strong>sesión de preventa encubierta</strong> que detecta oportunidades que un recurso sin este enfoque difícilmente alcanza.'
    },
    {
      title: 'Red de Especialistas Certificados por Plataforma',
      icon: 'network',
      back:
        'No dependes de que un único perfil domine Salesforce, Atlassian, Microsoft y demás plataformas a la vez. Coordinamos una <strong>red de especialistas certificados por herramienta</strong>, manteniendo un único estándar de calidad y un único informe, sin importar quién ejecute la sesión.'
    }
  ];

  faqItems = [
    {
      q: '¿TAI reemplaza a mi equipo de Customer Success?',
      a: 'No. TAI es un servicio externo complementario enfocado en detectar oportunidades de negocio y riesgo de churn mediante un ciclo QBR trimestral; tu equipo de Customer Success sigue gestionando la relación día a día.'
    },
    {
      q: '¿Quién ejecuta la formación técnica si mi plataforma no es Salesforce, Atlassian o Microsoft?',
      a: 'Coordinamos una red de especialistas certificados por herramienta para cubrir la plataforma específica de cada cliente final, siempre bajo la misma metodología y el mismo formato de informe.'
    },
    {
      q: '¿Con qué frecuencia recibo resultados?',
      a: 'El ciclo QBR (Quarterly Business Review) entrega una Matriz de Oportunidades cada trimestre, de forma que el seguimiento de cada cuenta es continuo, no un informe puntual.'
    },
    {
      q: '¿Cómo se paga el servicio?',
      a: 'Con una cuota base por el diagnóstico y el ciclo QBR, más un componente ligado a resultados cuando el informe deriva en un contrato real de desarrollo evolutivo.'
    }
  ];

  ngOnInit(): void {
    this.seo.apply({
      title: 'Tech Adoption Intelligence (TAI) | Retención y expansión de cartera para partners',
      description: 'TAI convierte tu servicio post-venta en un ciclo QBR trimestral con Matriz de Oportunidades: detecta upselling, blinda cuentas y protege tu Net Revenue Retention.',
      path: '/intelligence',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Tech Adoption Intelligence (TAI)',
        provider: { '@type': 'Organization', name: 'b2bitmaster' },
        areaServed: 'ES',
        audience: { '@type': 'Audience', audienceType: 'Proveedores y partners de software' },
        description: 'Servicio externalizado de retención y expansión de ingresos sobre la cartera ya vendida de un Partner, mediante un ciclo QBR trimestral y una Matriz de Oportunidades.'
      }
    });
  }

  navigateToContact(): void {
    this.router.navigate(['/contacto']);
  }

  downloadBrochure(): void {
    const link = document.createElement('a');
    const brochurePath = '/assets/Brochure TAI Services.pdf';
    link.href = encodeURI(brochurePath);
    link.download = 'Brochure TAI Services.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
