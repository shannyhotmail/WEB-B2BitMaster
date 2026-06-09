import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Intelligence
 * Página de información sobre Tech Adopción Intelligence (TAI)
 */
@Component({
  selector: 'app-intelligence',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <section class="page-header">
        <h1>TECH ADOPTION INTELLIGENCE (TAI)</h1>
        <p class="tagline">ANÁLISIS INTELIGENTE PARA DECISIONES TECNOLÓGICAS</p>
      </section>

      <section class="section section-1">
        <div class="section-grid" [class.active]="section1Active">
          <div class="section-image image-frame">
            <img src="assets/problema-proveedor.jpg" alt="Problema Proveedor" />
          </div>
          <div class="section-panel">
            <details
              class="toggle-module"
              (mouseenter)="setActive('section1', true)"
              (mouseleave)="setActive('section1', false)"
            >
              <summary class="toggle-title">
                <span class="title-content">LA CEGUERA DEL PROVEEDOR DE SOFTWARE</span>
                <span class="toggle-icon">▤▤▾</span>
              </summary>
              <div class="toggle-content">
                <p>
                  Como Partner o proveedor de software, tu mayor activo es tu cartera de clientes, pero
                  también es tu mayor riesgo. Tras la implantación, pierdes visibilidad. No sabes si el
                  cliente está <span class="highlight-red">infrautilizando la solución</span>, no pide
                  evolutivos porque ni siquiera sabe qué más puede hacer la herramienta, probablemente
                  esté utilizando procesos manuales paralelos en Excel. El 100% de los proyectos corren
                  <span class="highlight-red">riesgo de churn silencioso</span> si el cliente no percibe
                  el valor tras la entrega.
                </p>
                <p class="closing-sentence">
                  La falta de feedback no es paz; es una señal de peligro
                </p>
              </div>
            </details>
          </div>
        </div>
      </section>

      <section class="section section-2">
        <details class="toggle-module">
          <summary class="toggle-title">
            <span class="title-content">¿QUÉ ES TAI?</span>
            <span class="toggle-icon">▤▤▾</span>
          </summary>
          <div class="toggle-content">
            <p class="intro-line">
              Tech Adoption Intelligence (TAI) es nuestra solución, un Máster con Propósito de Venta
              (Revenue-Driven Learning)
            </p>
            <p>
              Actuamos como tu brazo extendido de adopción de tu herramienta. Nuestra metodología de
              capacitación actúa como un sensor de calidad. Mientras capacitamos a tus usuarios,
              documentamos cada carencia y cada proceso manual que el software aún no cubre, entramos en
              el interior de las operaciones y extraemos la información que tu equipo comercial no puede ver.
              <span class="highlight-blue">¿QUÉ TE OFRECEMOS?</span>
            </p>
                    <div class="flip-grid">
              <div
                class="flip-card"
                *ngFor="let card of offerCards; index as i"
                [class.flipped]="offerFlipped[i]"
                (click)="toggleFlip('offer', i)"
              >
                <div class="flip-card-inner">
                  <div class="flip-card-face flip-card-front">
                    <img class="card-icon" [src]="card.icon" [alt]="card.title" />
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

      <section class="section section-3" [class.zoomed]="section3Zoomed" [class.opened]="section3Open" [class.center-zoomed]="section3CenterZoomed" [class.clicked-panel]="section3ClickedPanel" [class.clicked-image]="section3ClickedImage">
        <div class="section-grid reverse-grid" [class.active]="section3Active">
          <div class="section-panel" (click)="onPanelClick()">
            <details
              #section3Details
              class="toggle-module"
              (toggle)="setSection3Open(section3Details.open)"
              (mouseenter)="setActive('section3', true)"
              (mouseleave)="setActive('section3', false)"
            >
              <summary class="toggle-title">
                <span class="title-primary">RESULTADO</span>
                <span class="title-secondary">Un modelo circular de generación de negocio</span>
                <span class="title-tertiary">Pasas de una relación transaccional a ser un aliado imprescindible</span>
                <span class="toggle-icon">▤▤▾</span>
              </summary>
              <div class="toggle-content">
                <p>
                  Tu pipeline deja de depender sólo de captar nuevos logos y empieza a alimentarse del crecimiento
                  orgánico y masivo de tu base actual.
                </p>
                <p>
                  Imagina entrar a tu próxima reunión de cuenta no a preguntar <em>\"¿cómo va todo?\"</em>, sino a
                  presentar un plan de crecimiento basado en necesidades reales detectadas en sus propios empleados.
                  <span class=\"highlight-blue\">Eso es fidelización activa.</span>
                </p>
              </div>
            </details>
          </div>
          <div class="section-image image-frame zoom-image" (click)="onImageClick()">
            <img src="assets/diagrama-modelo-partners.jpg" alt="Diagrama modelo Partners" />
          </div>
        </div>
      </section>

      <section class="section section-4">
        <details class="toggle-module">
          <summary class="toggle-title">
            <span class="title-content">¿POR QUÉ DELEGAR ESTE SERVICIO POST VENTA EN NOSOTROS?</span>
            <span class="toggle-icon">▤▤▾</span>
          </summary>
          <div class="toggle-content">
            <p>
              Muchos Partners o proveedores de software intentan que sus propios consultores o comerciales hagan
              este trabajo, pero fracasan por tres razones críticas que nosotros resolvemos.
            </p>
            <div class="flip-grid">
              <div
                class="flip-card"
                *ngFor="let card of whyCards; index as i"
                [class.flipped]="whyFlipped[i]"
                (click)="toggleFlip('why', i)"
              >
                <div class="flip-card-inner">
                  <div class="flip-card-face flip-card-front">
                    <img class="card-icon" [src]="card.icon" [alt]="card.title" />
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
        <h2>Delega este servicio post venta en nosotros y conviértete en el socio estratégico de tus clientes</h2>
        <div class="button-group">
          <button class="btn-primary" (click)="navigateToContact()">Quiero blindar y expandir mis cuentas</button>
          <button class="btn-secondary-download" (click)="downloadBrochure()">Descargar Brochure TAI Services</button>
        </div>
      </section>
    </div>
  `,
  styleUrls: ['./intelligence.component.scss']
})
export class IntelligenceComponent implements AfterViewInit {
  offerCards = [
    {
      title: 'Detección de Brechas Evolutivas',
      icon: 'assets/Icono Brecha.png',
      back:
        'Identificamos requerimientos técnicos reales que el cliente aún no sabe que tiene. Te entregamos un informe con oportunidades de upselling y cross-selling masticadas y listas para cerrar.'
    },
    {
      title: 'Blindaje Estratégico',
      icon: 'assets/Icono Candado.png',
      back:
        'Al eliminar la fricción del usuario, aseguramos un cliente fiel, que integra tu software en su ADN operativo y por ende se vuelve indispensable. Un cliente que domina la herramienta no busca alternativas; pide más funciones.'
    },
    {
      title: 'Feedback de percepción del producto',
      icon: 'assets/Icono Diana.png',
      back:
        'Este no es un resumen de asistencia. Es una matriz de oportunidades de negocio y una auditoría de percepción que te permite corregir desviaciones antes de que se conviertan en una baja del servicio.'
    }
  ];

  whyCards = [
    {
      title: 'Liberación de Recursos Críticos',
      icon: 'assets/Icono Engranage.png',
      back:
        'Tus consultores senior deben estar implantando, no dando formación básica. Al contratarnos, liberas a tu equipo de mayor coste para tareas de alta facturación, mientras nosotros generamos el pipeline para sus próximos proyectos.'
    },
    {
      title: 'El Canal de Confianza',
      icon: 'assets/Icono Confianza.png',
      back:
        'El cliente suele ser reticente a pedir mejoras a su Partner por miedo a que "le quieran vender algo más". Al presentarnos como un auditor externo de adopción, el cliente baja la guardia y confiesa sus necesidades reales, que nosotros te entregamos listas para facturar.'
    },
    {
      title: 'Metodología de Extracción de Datos',
      icon: 'assets/Icono CargaCerebro.png',
      back:
        'Tu equipo enseña a usar el software; nosotros estamos entrenados para extraer inteligencia. Cada una de nuestras sesiones es una sesión de preventa encubierta que detecta oportunidades que un recurso sin este enfoque le es difícil alcanzar.'
    }
  ];

  offerFlipped: Record<number, boolean> = {};
  whyFlipped: Record<number, boolean> = {};
  section1Active = false;
  section3Active = false;
  section3Open = false;
  section3Visible = false;
  section3Zoomed = false;
  section3CenterZoomed = false;
  section3ClickedPanel = false;
  section3ClickedImage = false;

  ngAfterViewInit(): void {
    const resetOnLeave = (entry: IntersectionObserverEntry): void => {
      if (!entry.isIntersecting) {
        if ((entry.target as HTMLElement).classList.contains('section-2')) {
          this.offerFlipped = {};
        }
        if ((entry.target as HTMLElement).classList.contains('section-3')) {
          this.section3Visible = false;
          this.section3Zoomed = false;
        }
        if ((entry.target as HTMLElement).classList.contains('section-4')) {
          this.whyFlipped = {};
        }
      }
    };

    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if ((entry.target as HTMLElement).classList.contains('section-3')) {
        this.section3Visible = entry.isIntersecting;
        this.section3Zoomed = entry.isIntersecting && !this.section3Open;
        if (entry.isIntersecting) {
          this.section3CenterZoomed = true;
          setTimeout(() => this.section3CenterZoomed = false, 1000);
        } else {
          this.section3ClickedPanel = false;
          this.section3ClickedImage = false;
        }
      }
      resetOnLeave(entry);
    }), {
      threshold: 0.5
    });

    const section2 = document.querySelector('.section-2');
    const section3 = document.querySelector('.section-3');
    const section4 = document.querySelector('.section-4');
    if (section2) {
      observer.observe(section2);
    }
    if (section3) {
      observer.observe(section3);
    }
    if (section4) {
      observer.observe(section4);
    }
  }

  setActive(section: 'section1' | 'section3', active: boolean): void {
    if (section === 'section1') {
      this.section1Active = active;
    } else {
      this.section3Active = active;
    }
  }

  setSection3Open(open: boolean): void {
    this.section3Open = open;
    this.section3Zoomed = !open && this.section3Visible;
  }

  onPanelClick(): void {
    this.section3ClickedPanel = true;
  }

  onImageClick(): void {
    this.section3ClickedImage = true;
  }

  toggleFlip(section: 'offer' | 'why', index: number): void {
    if (section === 'offer') {
      this.offerFlipped[index] = !this.offerFlipped[index];
    } else {
      this.whyFlipped[index] = !this.whyFlipped[index];
    }
  }

  navigateToContact(): void {
    window.location.href = '/contacto';
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

