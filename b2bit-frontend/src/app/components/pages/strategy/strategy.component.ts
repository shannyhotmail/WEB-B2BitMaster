import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { SeoService } from '../../../services/seo.service';
import { IconComponent } from '../../shared/icon/icon.component';

/**
 * Tech Adoption Strategy (TAS): consultoría de negocio y optimización de
 * procesos, con la IA como palanca cuando el diagnóstico lo justifica.
 */
@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [CommonModule, RouterLink, IconComponent],
  template: `
    <div class="page tas-page">
      <section class="page-hero">
        <div class="hero-grid">
          <div class="hero-text">
            <a routerLink="/home" class="back-link">← Volver al inicio</a>
            <span class="eyebrow">Para empresas cliente de software, o sin software</span>
            <h1>
              <span class="hero-product-name">Tech Adoption Strategy</span>
              <span class="hero-subtitle">De la infrautilización a la Maestría Operativa</span>
            </h1>
            <p class="lead">
              Consultoría de negocio y optimización de procesos, con la IA como palanca de mejora, para cualquier empresa con cualquier stack tecnológico, o sin él.
            </p>
            <p class="lead">
              El objetivo es mejorar la facturación y la rentabilidad de su empresa.
            </p>
            <button type="button" class="btn-primary" (click)="navigateToContact()">Solicitar Diagnóstico Estratégico</button>
          </div>
          <div class="hero-diagram">
            <div class="solution-card">
              <span class="eyebrow eyebrow--sm">Nuestra solución — TAS</span>
              <div class="mini-stairs-cards">
                <div class="mini-stairs-card mini-stairs-card--1">
                  <div class="mini-stairs-card-strip"></div>
                  <div class="mini-stairs-card-body">
                    <span class="mini-stairs-card-title">Auditoría</span>
                    <span class="mini-stairs-card-tag">Diagnóstico</span>
                  </div>
                </div>
                <div class="mini-stairs-card mini-stairs-card--2">
                  <div class="mini-stairs-card-strip"></div>
                  <div class="mini-stairs-card-body">
                    <span class="mini-stairs-card-title">Plan Estratégico a Medida (PEM)</span>
                    <span class="mini-stairs-card-tag">Solución</span>
                  </div>
                </div>
                <div class="mini-stairs-card mini-stairs-card--3">
                  <div class="mini-stairs-card-strip"></div>
                  <div class="mini-stairs-card-body">
                    <span class="mini-stairs-card-title">Implantación</span>
                    <span class="mini-stairs-card-tag">Resultados</span>
                  </div>
                </div>
              </div>
              <a href="#que-es-tas" (click)="scrollToSection($event, 'que-es-tas')" class="solution-card-link">Ver la solución completa →</a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="el-problema">
        <span class="eyebrow">El problema</span>
        <h2 class="el-problema-title">Tres frentes penalizan el ROI de su operación</h2>

        <div class="tab-card">
          <div class="tab-row" role="tablist">
            <button type="button" class="tab-btn" role="tab" [class.active]="activeProblemTab === 0" [attr.aria-selected]="activeProblemTab === 0" (click)="setProblemTab(0)">01 · Coste Invisible</button>
            <button type="button" class="tab-btn" role="tab" [class.active]="activeProblemTab === 1" [attr.aria-selected]="activeProblemTab === 1" (click)="setProblemTab(1)">02 · Caos Post-Implantación</button>
            <button type="button" class="tab-btn" role="tab" [class.active]="activeProblemTab === 2" [attr.aria-selected]="activeProblemTab === 2" (click)="setProblemTab(2)">03 · Desafío u Oportunidad</button>
          </div>

          <div class="tab-panel tab-panel--full-width" *ngIf="activeProblemTab === 0">
            <h3 class="tab-title">¿Está obteniendo el máximo ROI de sus operaciones?</h3>
            <p>
              Por lo general <strong class="highlight-navy">el ROI de sus operaciones es penalizado por un </strong><strong>Coste Invisible</strong>: cada herramienta sin explotar, cada hoja de cálculo paralela, cada tarea manual que debería estar automatizada es dinero que ya pagó y no está recuperando.
            </p>
            <p>
              Como agravante está el hecho de que los <strong>costes laborales suben</strong> a un ritmo más acelerado que la productividad (*).
            </p>
            <div class="section-image tab-image-banner">
              <img src="assets/remeros-ilustracion.png" alt="Comparación entre un equipo remando de forma descoordinada y uno remando en sincronía, avanzando más rápido con el mismo número de remeros" loading="lazy" />
            </div>
            <div class="tab-quote-block">
              <p class="quote"><strong>El barco cada vez es más pesado, se necesita remar más rápido y más lejos, pero con el mismo número de remeros… La clave está entonces en analizar el "cómo" reman.</strong></p>
            </div>
            <p class="footnote">(*) Solo en España, entre el primer trimestre de 2021 y finales de 2025, los costes laborales subieron un 29% en microempresas y un 28,7% en pequeñas empresas, frente al 23,4% en medianas (CEPYME, Indicador CEPYME sobre la Situación de la Pyme, 2S 2025).</p>
          </div>

          <div class="tab-panel" *ngIf="activeProblemTab === 1">
            <div class="section-grid section-grid--balanced">
              <div class="section-copy">
                <h3 class="tab-title">El "Caos Post-Implantación"</h3>
                <p>
                  La aceleración tecnológica actual supera la capacidad de asimilación de la fuerza laboral, exista o no un software formal de por medio: <strong>se implementa más rápido de lo que se puede adoptar</strong>.
                </p>
                <p>
                  El mayor riesgo es <strong>la fuga de ROI</strong> que produce una <strong>adopción deficiente</strong>. De ahí surgen cuatro problemas críticos.
                </p>
              </div>
              <div class="section-image">
                <img src="assets/meta-inalcanzable.png" alt="Persona corriendo hacia una meta que se aleja y se multiplica, representando una adopción que nunca alcanza a la velocidad de implantación" loading="lazy" />
              </div>
            </div>
            <div class="card-grid card-grid--4">
              <details class="offer-card" *ngFor="let card of chaosCards">
                <summary class="offer-card-summary">
                  <app-icon class="offer-card-icon" [name]="card.icon"></app-icon>
                  <div class="offer-card-summary-row">
                    <h4>{{ card.title }}</h4>
                    <span class="offer-card-toggle" aria-hidden="true"></span>
                  </div>
                </summary>
                <p [innerHTML]="card.back"></p>
              </details>
            </div>
            <p class="chaos-closing">Trabajemos en la adopción, la usabilidad y la optimización estratégica, antes de seguir perdiendo dinero por el camino. <strong>Esto no es un lujo, es una necesidad.</strong></p>
          </div>

          <div class="tab-panel" *ngIf="activeProblemTab === 2">
            <div class="section-grid section-grid--balanced section-grid--stretch">
              <div class="section-copy">
                <h3 class="tab-title">¿Desafío o mas bien Oportunidad?</h3>
                <p>
                  La IA está cambiando las reglas del juego, y <strong>su adopción es tan desafiante como necesaria</strong> para empresas y empleados por igual. No se trata de eliminar posiciones sino de <strong>reformularlas</strong> para generar <strong>más negocio</strong>.
                </p>
              </div>
              <div class="section-image section-image--capped section-image--match-text">
                <img src="assets/ia-equipo-engranaje.png" alt="Una persona conectando un engranaje con una figura humana formada por nodos de datos, representando la colaboración entre el equipo humano y la IA" loading="lazy" />
              </div>
            </div>

            <div class="tab-copy-full">
              <p>
                Los datos muestran una <strong>adopción acelerada de la IA</strong> —casi el doble en solo dos años—, aunque la mayoría la usa en fase experimental y sin haber adaptado su estructura para sostenerla, lo que deriva en <strong>una inversión con poco retorno</strong>.
              </p>
            </div>

            <div class="data-panel">
              <div class="data-card">
                <span class="data-card-label">Adopción de IA en España</span>
                <span class="data-kpi-value">21,1%</span>
                <span class="data-kpi-subtitle">empresas usando IA, frente al 12,4% en 2023</span>
                <span class="data-card-footnote">casi se duplica en dos años · INE</span>
              </div>

              <div class="data-card">
                <span class="data-card-label">De las que ya usan IA</span>
                <span class="data-kpi-value">19,9%</span>
                <span class="data-kpi-subtitle">la usa hoy en su operación</span>
                <span class="data-card-footnote">60% aún experimental o en piloto · Banco de España</span>
              </div>

              <div class="data-card">
                <span class="data-card-label">Principales obstáculos</span>
                <span class="data-kpi-value">45,8%</span>
                <span class="data-kpi-subtitle">señala la falta de personal cualificado como principal freno</span>
                <span class="data-card-footnote">Banco de España, EBAE Q4 2024</span>
              </div>

              <div class="data-card">
                <span class="data-card-label">Dos cifras que resumen el reto</span>
                <div class="stat-split">
                  <div class="stat-split-item">
                    <span class="stat-split-value">84%</span>
                    <span class="stat-split-desc">no ha rediseñado los puestos para integrar la IA</span>
                    <span class="stat-split-source">Deloitte</span>
                  </div>
                  <div class="stat-split-item">
                    <span class="stat-split-value">23%</span>
                    <span class="stat-split-desc">de iniciativas de IA logra el ROI esperado</span>
                    <span class="stat-split-source">IT User, 2025</span>
                  </div>
                </div>
              </div>
            </div>

            <p class="chaos-closing">El mundo exige cada vez más, y <strong>no podemos quedar fuera de esta ola</strong>, pero hay que subirse bien, no de cualquier forma.</p>
          </div>

          <div class="dots">
            <button type="button" class="dot" [class.active]="activeProblemTab === 0" (click)="setProblemTab(0)" aria-label="Ir a Coste Invisible"></button>
            <button type="button" class="dot" [class.active]="activeProblemTab === 1" (click)="setProblemTab(1)" aria-label="Ir a Caos Post-Implantación"></button>
            <button type="button" class="dot" [class.active]="activeProblemTab === 2" (click)="setProblemTab(2)" aria-label="Ir a Desafío u Oportunidad"></button>
          </div>
        </div>
      </section>

      <section class="section stairs-section" id="que-es-tas">
        <span class="eyebrow">La solución</span>
        <h2>¿Qué es TAS?</h2>
        <p class="section-intro">
          Tech Adoption Strategy (TAS) es nuestra consultoría de negocio y optimización de procesos, con la IA como palanca cuando el diagnóstico lo justifica, no como punto de partida. No partimos de una plataforma ni de un curso genérico: partimos de una <strong>Auditoría Operativa completa</strong> de su empresa, tenga o no software, y diseñamos un plan de mejora a la medida de lo que encontramos.
        </p>

        <div class="stairs-cards">
          <div class="stairs-card stairs-card--1">
            <div class="stairs-card-strip"></div>
            <div class="stairs-card-body">
              <span class="stairs-card-number">01</span>
              <h3 class="stairs-card-title">Auditoría</h3>
              <p>Profundizamos en su problema real: procesos, herramientas, gestión de la información, seguridad y cómo detecta hoy oportunidades de negocio. Traducimos cada hallazgo a euros de ineficiencia o de oportunidad perdida.</p>
            </div>
          </div>
          <div class="stairs-card stairs-card--2">
            <div class="stairs-card-strip"></div>
            <div class="stairs-card-body">
              <span class="stairs-card-number">02</span>
              <h3 class="stairs-card-title">Plan Estratégico a Medida (PEM)</h3>
              <p>Definimos qué optimizar o estandarizar, qué herramientas escalar o sustituir, y qué automatizar con IA — nunca una hoja de ruta genérica, sino adaptada a la realidad de su negocio.</p>
            </div>
          </div>
          <div class="stairs-card stairs-card--3">
            <div class="stairs-card-strip"></div>
            <div class="stairs-card-body">
              <span class="stairs-card-number">03</span>
              <h3 class="stairs-card-title">Implantación</h3>
              <p>Le acompañamos en la puesta en marcha: implantación ordenada, progresiva y priorizada según sus necesidades y su matriz de riesgo, siempre con nuestro respaldo. Si hace falta, incluimos formación práctica no genérica, basada en sus casos de uso reales.</p>
            </div>
          </div>
        </div>

        <p class="stairs-closing"><strong>Nuestro objetivo no es vender tecnología -en algunos casos podría ser parte de la solución-. Nuestro objetivo es llevarlo de donde está a donde quiere estar, de forma ordenada y estratégica</strong></p>
      </section>

      <section class="section section-alt">
        <div class="section-grid reverse">
          <div class="section-copy">
            <span class="eyebrow eyebrow--sm">Resultado</span>
            <h2>Transforme su fuerza laboral en un activo circular de expansión y alto rendimiento</h2>
            <p>
              Reduzca el estrés por brecha tecnológica y transforme un entorno de trabajo pesado en un ecosistema ágil donde <strong>la herramienta trabaja para las personas, y no al revés</strong>.
            </p>
          </div>
          <div class="section-image section-image--loop-static">
            <img src="assets/diagrama_espiral_rentabilidad.png" alt="Diagrama circular de la Espiral de Rentabilidad y Autonomía: Auditoría Operativa, Plan de Mejora, Implementación y Mayor Rentabilidad conectados alrededor de un núcleo central mediante flechas curvas" loading="lazy" />
          </div>
        </div>
      </section>

      <section class="section">
        <h2>¿Por qué delegar esta misión en nosotros?</h2>
        <div class="card-grid card-grid--3">
          <article class="offer-card" *ngFor="let card of missionCards">
            <app-icon class="offer-card-icon" [name]="card.icon"></app-icon>
            <h3>{{ card.title }}</h3>
            <p [innerHTML]="card.back"></p>
          </article>
        </div>
      </section>

      <section class="section section-faq section-alt">
        <h2>Preguntas frecuentes sobre TAS</h2>
        <div class="faq-list">
          <details class="faq-item" *ngFor="let item of faqItems">
            <summary>{{ item.q }}</summary>
            <p>{{ item.a }}</p>
          </details>
        </div>
      </section>

      <section class="section cta-section">
        <h2>¿Quiere dejar de "sobrevivir" a su operación y empezar a liderarla?</h2>
        <p class="bridge-note">
          ¿Su optimización interna reveló una necesidad concreta de un proveedor de software? Nuestro servicio hermano, <a routerLink="/intelligence">Tech Adoption Intelligence (TAI)</a>, conecta ese tipo de necesidades con nuestro ecosistema de partners certificados.
        </p>
        <div class="button-group">
          <button type="button" class="btn-primary" (click)="navigateToContact()">Solicitar Diagnóstico Estratégico</button>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements OnInit {
  private router = inject(Router);
  private seo = inject(SeoService);

  activeProblemTab = 0;

  chaosCards = [
    {
      title: 'Subutilización Crónica',
      icon: 'sliders-vertical',
      back:
        'La empresa paga por el 100% de una herramienta o software, pero, por falta de dominio técnico, <strong>se explota la herramienta muy por debajo de su potencial</strong> y se siguen utilizando procesos manuales "paralelos" previamente adoptados. Así, una inversión estratégica se convierte en <strong>un coste hundido</strong>.'
    },
    {
      title: 'Silos de Información y Estrés Laboral',
      icon: 'columns-3',
      back:
        'La falta de adopción estandarizada de procesos y sistemas desorganiza y descentraliza la información, <strong>aumentando la carga de trabajo, el error humano y el estrés</strong> de los empleados.'
    },
    {
      title: 'Dependencia Ciega del Proveedor',
      icon: 'eye-off',
      back:
        'Al no entender las capacidades reales de su software —o su forma de operar—, <strong>el cliente queda a merced del proveedor</strong>, forzado a comprar bolsas de horas de soporte solo para resolver consultas operativas o de configuración.'
    },
    {
      title: 'Ecosistema Multiplataforma',
      icon: 'workflow',
      back:
        'Desconocer el alcance real de las soluciones ya adquiridas lleva a contratar otras nuevas pensando que se necesitan para sustituir o complementar lo que ya tienen. El resultado es un ecosistema cada vez más difícil de asimilar, donde cada solución nueva se convierte en un problema más — <strong>una bola de nieve que no deja de crecer</strong>.'
    }
  ];


  missionCards = [
    {
      title: 'Neutralidad Total',
      icon: 'refresh-cw',
      back:
        'No vendemos herramientas de ningún proveedor: solo recomendamos lo que su empresa realmente necesita, tenga o no software. Esta independencia nos permite decirle la verdad sobre qué procesos sobran y cuáles automatizar, <strong>sin conflicto de interés</strong>.'
    },
    {
      title: 'Resultados sin Promesas Infladas',
      icon: 'chart-line',
      back:
        'No prometemos cifras de ROI infladas. El proceso típico de optimización en una pyme <strong>se recupera en 2 a 4 meses</strong> cuando se elige bien el primer proceso a intervenir; nuestro trabajo es asegurarnos de que elegimos el correcto.'
    },
    {
      title: 'Soberanía Operativa',
      icon: 'flag',
      back:
        'Sin un diagnóstico propio, usted depende de lo que le diga su proveedor de turno. Con nosotros, <strong>recupera el criterio para decidir su propia transformación</strong>: qué automatizar, qué contratar y qué dejar como está.'
    }
  ];

  faqItems = [
    {
      q: '¿Necesito tener un software avanzado para trabajar con ustedes?',
      a: 'No. Trabajamos igual con empresas que usan Salesforce, SAP o Jira que con empresas que hoy operan con Excel o sin ningún sistema formal: el diagnóstico se adapta a lo que ya tiene.'
    },
    {
      q: '¿El servicio consiste en implementar inteligencia artificial?',
      a: 'No necesariamente. La IA es una palanca que proponemos solo cuando el diagnóstico la justifica; en muchos casos la mejora real está en optimizar procesos que ya existen, no en añadir tecnología nueva.'
    },
    {
      q: '¿Cómo miden el retorno de la inversión?',
      a: 'No prometemos porcentajes de ROI genéricos. Medimos en función del proceso concreto intervenido y de cuánto tiempo o dinero libera; los procesos bien elegidos suelen recuperarse en 2 a 4 meses.'
    },
    {
      q: '¿Qué pasa si mi equipo se resiste al cambio?',
      a: 'Por eso el plan siempre incluye acompañamiento en la implementación, y solo agregamos formación práctica cuando el diagnóstico muestra que es necesaria: no la imponemos como punto de partida.'
    }
  ];

  ngOnInit(): void {
    this.seo.apply({
      title: 'Tech Adoption Strategy (TAS) | Optimización de procesos y rentabilidad',
      description: 'TAS es una consultoría de negocio: auditoría operativa, plan de mejora e implementación con garantía, con IA solo cuando el diagnóstico lo justifica. Para empresas con o sin software.',
      path: '/strategy',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Tech Adoption Strategy (TAS)',
        provider: { '@type': 'Organization', name: 'b2bitmaster' },
        areaServed: 'ES',
        audience: { '@type': 'Audience', audienceType: 'Empresas usuarias de software o sin sistema formal' },
        description: 'Consultoría de negocio y optimización de procesos: auditoría operativa, plan de mejora personalizado e implementación con garantía, con la IA como palanca cuando el diagnóstico lo justifica.'
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

  setProblemTab(index: number): void {
    this.activeProblemTab = index;
  }
}
