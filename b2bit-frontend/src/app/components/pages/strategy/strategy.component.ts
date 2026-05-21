import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Strategy
 * Página de información sobre Tech Adoption Strategy (TAS)
 */
@Component({
  selector: 'app-strategy',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <section class="page-header">
        <h1>TECH ADOPTION STRATEGY (TAS)</h1>
        <p class="tagline">De la Infrautilización a la Maestría Operativa</p>
      </section>

      <section class="section section-1">
        <div class="section-grid" [class.active]="section1Active">
          <div class="section-image image-frame">
            <img src="assets/Problema cliente.jpg" alt="Problema Cliente" />
          </div>
          <div class="section-panel">
            <details
              class="toggle-module"
              (mouseenter)="setActive('section1', true)"
              (mouseleave)="setActive('section1', false)"
            >
              <summary class="toggle-title">
                <span class="title-content">¿Su software es una inversión o un gasto ineficiente?</span>
                <span class="toggle-icon">▤▤▾</span>
              </summary>
              <div class="toggle-content">
                <p>
                  El "Efecto Iceberg": Tu empresa paga por el 100% de la tecnología, pero es muy probable que solo aproveches el 20% de su capacidad, porque su equipo probablemente solo utiliza la superficie visible.
                </p>
                <p>
                  El resto es el "Efecto Iceberg": dinero desperdiciado en funciones que nadie usa, mientras tu equipo sigue perdiendo horas en hojas de cálculo paralelas, procesos manuales lentos, errores por falta de dominio y una dependencia absoluta de consultores externos para tareas básicas.
                </p>
                <p class="closing-sentence">
                  Tu equipo ya tiene las herramientas. Es hora de que aprenda a ganar la batalla de la productividad con ellas.
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section class="section section-2">
        <details class="toggle-module">
          <summary class="toggle-title">
            <span class="title-content">El "Caos Post-Implantación"</span>
            <span class="toggle-icon">▤▤▾</span>
          </summary>
          <div class="toggle-content">
            <p>
              En el escenario actual, <span class="highlight-blue">la aceleración tecnológica ha superado la capacidad de asimilación de la fuerza laboral</span>.
            </p>
            <p>
              Esta <span class="highlight-blue">asimetría</span> genera un fenómeno crítico: empresas que adquieren soluciones de software de alto rendimiento, pero carecen de "operarios" capaces de explotar su potencial. El mayor desafío para una empresa que adquiere software de alto rendimiento es la <span class="highlight-blue">fuga de ROI</span> producida por una adopción deficiente. Tras la implantación, surgen tres problemas críticos.
            </p>
            <div class="flip-grid">
              <div
                class="flip-card"
                *ngFor="let card of chaosCards; index as i"
                [class.flipped]="chaosFlipped[i]"
                (click)="toggleFlip('chaos', i)"
              >
                <div class="flip-card-inner">
                  <div class="flip-card-face flip-card-front">
                    <img
                      *ngIf="card.icon"
                      class="card-icon"
                      [class.card-icon--large]="card.size === 'large'"
                      [class.card-icon--small]="card.size === 'small'"
                      [src]="card.icon"
                      [alt]="card.title"
                    />
                    <span class="card-title">{{ card.title }}</span>
                    <button class="btn-view-more">VER MÁS</button>
                  </div>
                  <div class="flip-card-face flip-card-back">
                    <span>{{ card.back }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
      </section>

      <section class="section section-3">
        <details class="toggle-module">
          <summary class="toggle-title">
            <span class="title-content">¿QUE ES TAS?</span>
            <span class="toggle-icon">▤▤▾</span>
          </summary>
          <div class="toggle-content">
            <p class="intro-line">
              Tech Adoption Strategy (TAS) es nuestra solución, una Maestría operativa y soberanía tecnológica.
            </p>
            <p>
              No impartimos formación genérica; realizamos una transferencia de soberanía tecnológica. Diseñamos una <span class="highlight-blue">Hoja de Ruta de Adopción y Evolución</span> basada en vuestros propios casos de negocio.
            </p>
            <div class="flip-grid">
              <div
                class="flip-card"
                *ngFor="let card of tasCards; index as i"
                [class.flipped]="tasFlipped[i]"
                (click)="toggleFlip('tas', i)"
              >
                <div class="flip-card-inner">
                  <div class="flip-card-face flip-card-front">
                    <img *ngIf="card.icon" class="card-icon" [src]="card.icon" [alt]="card.title" />
                    <span class="card-title">{{ card.title }}</span>
                    <button class="btn-view-more">VER MÁS</button>
                  </div>
                  <div class="flip-card-face flip-card-back">
                    <span>{{ card.back }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
      </section>

      <section class="section section-3 section-6" [class.zoomed]="section6Zoomed" [class.opened]="section6Open" [class.center-zoomed]="section6CenterZoomed" [class.clicked-panel]="section6ClickedPanel" [class.clicked-image]="section6ClickedImage">
        <div class="section-grid reverse-grid" [class.active]="section6Active">
          <div class="section-panel" (click)="onSection6PanelClick()">
            <details
              #section6Details
              class="toggle-module"
              (toggle)="setSection6Open(section6Details.open)"
              (mouseenter)="setActive('section6', true)"
              (mouseleave)="setActive('section6', false)"
            >
              <summary class="toggle-title">
                <span class="title-primary">RESULTADO</span>
                <span class="title-secondary">Transforme su fuerza laboral en un ACTIVO CIRCULAR de expansión y alto rendimiento.</span>
                <span class="toggle-icon">▤▤▾</span>
              </summary>
              <div class="toggle-content">
                <p>
                  Reduzca el estrés por brecha tecnológica y transforme un entorno de trabajo pesado en un ecosistema ágil donde la <span class="highlight-blue">herramienta trabaja para las personas, y no al revés</span>.
                </p>
              </div>
            </details>
          </div>
          <div class="section-image image-frame zoom-image" (click)="onSection6ImageClick()">
            <img src="assets/Diagrama circular Usuario.jpg" alt="Diagrama Cliente" />
          </div>
        </div>
      </section>

      <section class="section section-7">
        <details class="toggle-module">
          <summary class="toggle-title">
            <span class="title-content">¿POR QUÉ DELEGAR ESTA MISIÓN EN NOSOTROS</span>
            <span class="toggle-icon">▤▤▾</span>
          </summary>
          <div class="toggle-content">
            <p>
              Contratar una "formación genérica" o dejarlo en manos de IT es el camino más corto hacia la repetición de errores. He aquí por qué nuestra intervención es una inversión con retorno garantizado:
            </p>
            <div class="flip-grid">
              <div
                class="flip-card"
                *ngFor="let card of missionCards; index as i"
                [class.flipped]="missionFlipped[i]"
                (click)="toggleFlip('mission', i)"
              >
                <div class="flip-card-inner">
                  <div class="flip-card-face flip-card-front">
                    <img *ngIf="card.icon" class="card-icon" [src]="card.icon" [alt]="card.title" />
                    <span class="card-title">{{ card.title }}</span>
                    <button class="btn-view-more">VER MÁS</button>
                  </div>
                  <div class="flip-card-face flip-card-back">
                    <span>{{ card.back }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </details>
      </section>

      <section class="cta-section">
        <h2>¿Quiere dejar de "sobrevivir" a mi software y empezar a liderar con él?</h2>
        <div class="button-group">
          <button class="btn-primary" (click)="navigateToContact()">Solicitar Diagnóstico Estratégico</button>
          <button class="btn-secondary-download" (click)="downloadCatalog()">Descargue el catálogo de este servicio</button>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./strategy.component.scss']
})
export class StrategyComponent implements AfterViewInit {
  chaosCards = [
    {
      title: 'Subutilización Crónica',
      icon: 'assets/Icono Subuti.png',
      size: 'large',
      back:
        'La empresa paga por el 100% de una herramienta (Salesforce, Jira, SAP, etc.) pero su personal solo utiliza el 20% por desconocimiento. Esto convierte una inversión estratégica en un coste hundido.'
    },
    {
      title: 'Silos de Información y Estrés Laboral',
      icon: 'assets/Icono estres.png',
      size: 'small',
      back:
        'La falta de dominio técnico genera procesos manuales "paralelos" (Excel externos, cadenas de emails), aumentando la carga de trabajo, el error humano y el estrés de los empleados.'
    },
    {
      title: 'Dependencia Ciega del Proveedor',
      icon: 'assets/Icono ojo ciego.png',
      back:
        'Al no entender las capacidades reales de su software, el cliente no sabe qué pedirle a su Partner IT, aceptando presupuestos por soluciones que quizás ya tiene contratadas pero no sabe configurar.'
    }
  ];

  tasCards = [
    {
      title: 'Ingeniería Pedagógica "Learning by Doing"',
      icon: 'assets/Icono CerebroDigital.png',
      back:
        'Diseñamos rutas de aprendizaje basadas 100% en sus procesos de negocio. Los empleados no aprenden "software", aprenden a resolver sus problemas diarios con la herramienta.'
    },
    {
      title: 'Activos Digitales Permanentes',
      icon: 'assets/Icono BibliDig.png',
      back:
        'Creamos una biblioteca de micro-learning a medida. Píldoras de vídeo de menos de 2 minutos que resuelven dudas en el acto, aceleran el onboarding de nuevos empleados en un 60% y liberan a su departamento de IT de tickets repetitivos.'
    },
    {
      title: 'Informe o "Blueprint" Estratégico',
      icon: 'assets/Icono Diana.png',
      back:
        'Tras nuestra intervención, recibirán un mapa de ruta estratégica, para optimizar lo que tienen y marcar la ruta hacia lo que quieren tener: oportunidades de mejora, optimización de procesos, guía de buenas prácticas personalizada para su equipo y, por otro lado, un informe funcional-técnico de nuevos requerimientos, enmarcado dentro objetivos y factibilidad, que podrá presentar a su proveedor de software.'
    }
  ];

  missionCards = [
    {
      title: 'Neutralidad frente al Proveedor',
      icon: 'assets/Icono Externo.png',
      back:
        'Nosotros no queremos venderle más licencias. Queremos que use bien las que ya tiene. Esta independencia nos permite decirle la verdad sobre qué procesos sobran y cuáles deben automatizarse, ahorrándole miles de euros en consultoría innecesaria.'
    },
    {
      title: 'Aprovechamiento del "Costo de oportunidad"',
      icon: 'assets/Icono Horashombre.png',
      back:
        'Mientras su equipo pierde 30 minutos al día buscando cómo hacer una tarea, usted pierde meses de crecimiento al año. nuestra herramienta de microlearning optimizará el uso de las horas hombre en su empresa'
    },
    {
      title: 'Soberanía Tecnológica',
      icon: 'assets/Icono soberaniaIT.png',
      back:
        'Sin nuestro Blueprint de Futuro, usted es "rehén" de lo que su proveedor le diga. Con nosotros, usted recupera el criterio técnico para exigir resultados, optimizar contratos y liderar su propia transformación digital.'
    }
  ];

  chaosFlipped: Record<number, boolean> = {};
  tasFlipped: Record<number, boolean> = {};
  missionFlipped: Record<number, boolean> = {};
  section1Active = false;
  section6Active = false;
  section6Open = false;
  section6Visible = false;
  section6Zoomed = false;
  section6CenterZoomed = false;
  section6ClickedPanel = false;
  section6ClickedImage = false;

  ngAfterViewInit(): void {
    const resetOnLeave = (entry: IntersectionObserverEntry): void => {
      if (!entry.isIntersecting && (entry.target as HTMLElement).classList.contains('section-6')) {
        this.section6Visible = false;
        this.section6Zoomed = false;
        this.section6ClickedPanel = false;
        this.section6ClickedImage = false;
      }
    };

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if ((entry.target as HTMLElement).classList.contains('section-6')) {
        this.section6Visible = entry.isIntersecting;
        this.section6Zoomed = entry.isIntersecting && !this.section6Open;
        if (entry.isIntersecting) {
          this.section6CenterZoomed = true;
          setTimeout(() => this.section6CenterZoomed = false, 1000);
        }
      }
      resetOnLeave(entry);
    }), {
      threshold: 0.5
    });

    const section6 = document.querySelector('.section-6');
    if (section6) {
      observer.observe(section6);
    }
  }

  setActive(section: 'section1' | 'section6', active: boolean): void {
    if (section === 'section1') {
      this.section1Active = active;
    } else {
      this.section6Active = active;
    }
  }

  setSection6Open(open: boolean): void {
    this.section6Open = open;
    this.section6Zoomed = !open && this.section6Visible;
  }

  onSection6PanelClick(): void {
    this.section6ClickedPanel = true;
    setTimeout(() => this.section6ClickedPanel = false, 1000);
  }

  onSection6ImageClick(): void {
    this.section6ClickedImage = true;
    setTimeout(() => this.section6ClickedImage = false, 1000);
  }

  toggleFlip(section: 'chaos' | 'tas' | 'mission', index: number): void {
    if (section === 'chaos') {
      this.chaosFlipped[index] = !this.chaosFlipped[index];
    } else if (section === 'tas') {
      this.tasFlipped[index] = !this.tasFlipped[index];
    } else {
      this.missionFlipped[index] = !this.missionFlipped[index];
    }
  }

  navigateToContact(): void {
    window.location.href = '/contacto';
  }

  downloadCatalog(): void {
    const link = document.createElement('a');
    const brochurePath = '/assets/Brochure Usuario Software-Cliente final.pdf';
    link.href = encodeURI(brochurePath);
    link.download = 'Brochure Usuario Software-Cliente final.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
