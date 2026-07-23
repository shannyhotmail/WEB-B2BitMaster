import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { SeoService } from '../../../services/seo.service';
import { IconComponent } from '../../shared/icon/icon.component';
import { RadarBlindspotComponent } from '../../shared/radar-blindspot/radar-blindspot.component';
import { QbrCycleDiagramComponent } from '../../shared/qbr-cycle-diagram/qbr-cycle-diagram.component';

/**
 * Tech Adoption Intelligence (TAI): servicio de inteligencia de retención
 * para Partners y proveedores de software sobre su cartera ya vendida.
 */
@Component({
  selector: 'app-intelligence',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent, RadarBlindspotComponent, QbrCycleDiagramComponent],
  template: `
    <div class="page tai-page">
      <section class="page-hero">
        <div class="hero-grid">
          <div class="hero-text">
            <a routerLink="/home" class="back-link">← Volver al inicio</a>
            <span class="eyebrow">Para partners y proveedores de software</span>
            <h1>
              <span class="hero-product-name">Tech Adoption Intelligence</span>
              <span class="hero-subtitle">De la oportunidad esperada a la venta orquestada</span>
            </h1>
            <p class="lead">
              Un motor externo que activa y sostiene el <strong>up-selling</strong> y el <strong>cross-selling</strong> de su cartera, para que cada cuenta se convierta en una fuente recurrente de nuevo negocio — y no en un contrato que solo se sostiene hasta la próxima renovación.
            </p>
            <p class="lead lead-emphasis">Tome el control estratégico del crecimiento de su negocio.</p>
            <button type="button" class="btn-primary" (click)="navigateToContact()">Quiero blindar y expandir mis cuentas</button>
          </div>
          <div class="hero-diagram">
            <div class="solution-card">
              <span class="eyebrow eyebrow--sm">Nuestra solución — TAI: el ciclo QBR</span>

              <div class="qbr-top-row">
                <div class="qbr-card qbr-card--1">
                  <div class="qbr-card-strip"></div>
                  <div class="qbr-card-body">
                    <span class="qbr-card-title">Activación</span>
                    <span class="qbr-card-tag">On boarding / Capacitación</span>
                  </div>
                </div>
                <div class="qbr-card qbr-card--2">
                  <div class="qbr-card-strip"></div>
                  <div class="qbr-card-body">
                    <span class="qbr-card-title">Diagnóstico</span>
                    <span class="qbr-card-tag">QC / Evolutivos</span>
                  </div>
                </div>
                <div class="qbr-card qbr-card--3">
                  <div class="qbr-card-strip"></div>
                  <div class="qbr-card-body">
                    <span class="qbr-card-title">Radar de Cuenta</span>
                    <span class="qbr-card-tag">Dossier de Oportunidades</span>
                  </div>
                </div>
                <div class="qbr-card qbr-card--4">
                  <div class="qbr-card-strip"></div>
                  <div class="qbr-card-body qbr-card-body--gold">
                    <span class="qbr-card-title">QBR</span>
                    <span class="qbr-card-tag">Quarterly Business Review</span>
                  </div>
                  <span class="qbr-arrow-down">↓</span>
                </div>
              </div>

              <div class="qbr-bottom-row">
                <div class="qbr-spacer"></div>
                <div class="qbr-cycle">
                  <div class="qbr-mini-row">
                    <div class="qbr-mini">
                      <div class="qbr-mini-card">
                        <div class="qbr-mini-strip"></div>
                        <span class="qbr-mini-label">QBR</span>
                      </div>
                      <span class="qbr-arrow-down qbr-arrow-down--mini">↓</span>
                    </div>
                    <div class="qbr-mini">
                      <div class="qbr-mini-card">
                        <div class="qbr-mini-strip"></div>
                        <span class="qbr-mini-label">QBR</span>
                      </div>
                      <span class="qbr-arrow-down qbr-arrow-down--mini">↓</span>
                    </div>
                    <div class="qbr-mini">
                      <div class="qbr-mini-card">
                        <div class="qbr-mini-strip"></div>
                        <span class="qbr-mini-label">QBR</span>
                      </div>
                      <span class="qbr-arrow-down qbr-arrow-down--mini">↓</span>
                    </div>
                  </div>
                  <div class="qbr-portfolio-bar">Radar de Cartera</div>
                </div>
              </div>

              <a href="#que-es-tai" (click)="scrollToSection($event, 'que-es-tai')" class="solution-card-link">Ver la solución completa →</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section blindspot-section">
        <div class="section-grid section-grid--balanced">
          <div class="section-copy">
            <h2>El punto ciego del proveedor de software</h2>
            <p class="section-intro">
              Como partner o proveedor de software, su cartera de clientes es su mayor activo — y su mayor riesgo. Tras la implantación, pierde visibilidad: no sabe si el cliente está infrautilizando la solución, si no pide evolutivos porque desconoce hasta dónde llega la herramienta, o si ya volvió a su Excel en paralelo. Ese silencio no es paz — es la primera señal de un churn que no verá venir.
            </p>
          </div>
          <div class="section-image blindspot-radar-col">
            <app-radar-blindspot></app-radar-blindspot>
          </div>
        </div>

        <div class="blindspot-kpis">
          <div class="blindspot-kpi">
            <span class="blindspot-kpi-label">Churn ligado a mal onboarding</span>
            <span class="blindspot-kpi-value">&gt;20%</span>
            <span class="blindspot-kpi-desc">del churn voluntario en B2B está ligado a un mal onboarding</span>
            <span class="blindspot-kpi-source">Recurly</span>
          </div>
          <div class="blindspot-kpi">
            <span class="blindspot-kpi-label">Retención media en B2B SaaS</span>
            <span class="blindspot-kpi-value">74%</span>
            <span class="blindspot-kpi-desc">de retención media en B2B SaaS, frente a &gt;120% en los mejores</span>
            <span class="blindspot-kpi-source">Benchmarkit</span>
          </div>
          <div class="blindspot-kpi">
            <span class="blindspot-kpi-label">Coste de adquirir vs retener</span>
            <span class="blindspot-kpi-value">5-25x</span>
            <span class="blindspot-kpi-desc">más caro adquirir un cliente nuevo que retener uno existente</span>
            <span class="blindspot-kpi-source">Harvard Business Review</span>
          </div>
        </div>
      </section>

      <section class="section section-alt" id="que-es-tai">
        <h2 class="section-title-centered">¿Qué es TAI?</h2>
        <p class="section-summary">
          TAI es el sistema que convierte cada implantación en un motor de expansión comercial. Activamos la adopción real del software, detectamos brechas y oportunidades que el cliente aún no verbaliza, y se las entregamos en un Radar de Cuenta accionable. Cuando ese ciclo se repite trimestre a trimestre con QBR y se consolida en un Radar de Cartera, usted deja de esperar oportunidades para empezar a orquestarlas.
        </p>

        <app-qbr-cycle-diagram></app-qbr-cycle-diagram>
      </section>

      <section class="section">
        <div class="section-grid reverse">
          <div class="section-copy">
            <span class="eyebrow eyebrow--sm">Resultado</span>
            <h2>Un modelo circular de generación de negocio</h2>
            <p class="closing closing--first">Pasa de una relación transaccional a ser un aliado imprescindible.</p>
            <p>
              Su pipeline deja de depender solo de captar nuevos logos y empieza a alimentarse del crecimiento orgánico de su cartera actual, ciclo QBR tras ciclo QBR.
            </p>
            <p>
              Cada vuelta de esta espiral no lo devuelve al punto de partida: el cliente que atraviesa Diagnóstico, Oportunidades y Expansión vuelve a Activación más blindado y con más negocio que en el ciclo anterior. Así es como una cartera que hoy solo renueva por inercia empieza, vuelta a vuelta, a crecer por decisión propia — no por casualidad, ni por la competencia.
            </p>
          </div>
          <div class="section-image section-image--loop-static">
            <img src="assets/espiral-blindaje-expansion-cartera.png" alt="Espiral de Blindaje y Expansión de Cartera: Diagnóstico, Oportunidades, Expansión y Activación conectados en sentido horario alrededor de un núcleo central" loading="lazy" />
          </div>
        </div>
      </section>

      <section class="section section-alt">
        <h2 class="section-title-centered">¿Por qué delegar este servicio post venta en nosotros?</h2>
        <p class="section-intro section-intro--full">
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
          Nuestro modelo de pago se adapta al tipo de valor generado: una cuota base cubre el diagnóstico y el ciclo QBR trimestral, y un componente adicional se activa únicamente cuando el informe se traduce en un contrato real de desarrollo evolutivo para usted. Así, <strong>nuestro incentivo queda alineado con el suyo desde el primer día</strong>.
        </p>
      </section>

      <section class="section section-faq">
        <h2 class="section-title-centered">Preguntas frecuentes sobre TAI</h2>
        <div class="faq-list">
          <details class="faq-item" *ngFor="let item of faqItems">
            <summary>{{ item.q }}</summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
      </section>

      <section class="section cta-section">
        <h2>Delegue este servicio post venta en nosotros y conviértase en el socio estratégico de sus clientes</h2>
        <p class="bridge-note">
          ¿Su cliente final necesita antes poner en orden su propia operación interna? Nuestro servicio hermano, <a routerLink="/strategy">Tech Adoption Strategy (TAS)</a>, hace ese diagnóstico directamente con la empresa usuaria, y puede alimentar de vuelta su propia Matriz de Oportunidades.
        </p>
        <div class="button-group">
          <button type="button" class="btn-primary" (click)="navigateToContact()">Quiero blindar y expandir mis cuentas</button>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./intelligence.component.scss']
})
export class IntelligenceComponent implements OnInit {
  private router = inject(Router);
  private seo = inject(SeoService);

  whyCards = [
    {
      title: 'Liberación de Recursos Críticos',
      icon: 'hand-coins',
      back:
        'Sus consultores senior deben estar implantando, no dando formación básica. Al contratarnos, <strong>libera a su equipo de mayor coste</strong> para tareas de alta facturación, mientras nosotros generamos el pipeline para sus próximos proyectos.'
    },
    {
      title: 'El Canal de Confianza',
      icon: 'shield-check',
      back:
        'El cliente suele ser reticente a pedir mejoras a su Partner por miedo a que "le quieran vender algo más". Al presentarnos como un auditor externo de adopción, <strong>el cliente baja la guardia y confiesa sus necesidades reales</strong>, que nosotros le entregamos listas para facturar.'
    },
    {
      title: 'Metodología de Extracción de Datos',
      icon: 'brain-circuit',
      back:
        'Su equipo enseña a usar el software; nosotros estamos entrenados para extraer inteligencia. Cada una de nuestras sesiones es una <strong>sesión de preventa encubierta</strong> que detecta oportunidades que un recurso sin este enfoque difícilmente alcanza.'
    },
    {
      title: 'Red de Especialistas Certificados por Plataforma',
      icon: 'network',
      back:
        'No depende de que un único perfil domine Salesforce, Atlassian, Microsoft y demás plataformas a la vez. Coordinamos una <strong>red de especialistas certificados por herramienta</strong>, manteniendo un único estándar de calidad y un único informe, sin importar quién ejecute la sesión.'
    }
  ];

  faqItems = [
    {
      q: '¿TAI reemplaza a mi equipo de Customer Success?',
      a: 'No. TAI es un servicio externo complementario enfocado en detectar oportunidades de negocio y riesgo de churn mediante un ciclo QBR trimestral; su equipo de Customer Success sigue gestionando la relación día a día.'
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
      description: 'TAI convierte su servicio post-venta en un ciclo QBR trimestral con Matriz de Oportunidades: detecta upselling, blinda cuentas y protege su Net Revenue Retention.',
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

  /**
   * Angular resuelve href="#id" contra el <base href> del documento
   * (navega a "/"), no contra la ruta actual. Interceptamos el clic para
   * hacer scroll manual y conservamos el href real por accesibilidad.
   */
  scrollToSection(event: MouseEvent, id: string): void {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
