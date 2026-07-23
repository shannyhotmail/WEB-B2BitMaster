import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SeoService } from '../../../services/seo.service';
import { PerspectiveOrbitComponent } from './perspective-orbit/perspective-orbit.component';

/**
 * Home: hero con el sistema solar de perspectivas + 3 capas de información
 * (dolor universal, bifurcación TAI/TAS, CTA de contacto). El detalle
 * completo de cada servicio vive únicamente en /intelligence y /strategy.
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, PerspectiveOrbitComponent],
  template: `
    <section class="hero-section">
      <div class="hero-copy">
        <div class="hero-eyebrow">
          <span class="hero-eyebrow-line"></span>
          <span>De la implantación de software a la Maestría de Negocio</span>
        </div>
        <h1 class="hero-title">Master for Business to Business</h1>
        <p class="hero-description hero-description--tight">
          La <strong>adopción inoperante o inconclusa</strong> de la tecnología se traduce para los proveedores de software en <strong>cross-selling estancados</strong> y para los usuarios del software en una <strong>inversión de coste hundido</strong>.
        </p>
        <p class="hero-description">
          Sea usted proveedor o usuario de soluciones de software, en B2BitMaster tenemos la solución: somos la "Adopción tecnológica que se convierte en negocio".
        </p>
      </div>

      <div class="hero-visual">
        <app-perspective-orbit></app-perspective-orbit>
      </div>

      <div class="hero-actions">
        <button type="button" class="btn-primary" (click)="navigateToContact()">Solicitar diagnóstico</button>
        <a href="#capas" class="btn-link">Conocer soluciones →</a>
      </div>
    </section>

    <div class="page-container" id="capas">

      <section class="layer layer-pain">
        <div class="layer-pain-grid">
          <div class="layer-pain-copy">
            <span class="layer-eyebrow">El problema</span>
            <h2>Cuatro perspectivas, un mismo problema</h2>
            <p class="layer-lead">
              El usuario final que subutiliza las herramientas sin reportarlo, la empresa que acumula soluciones de software sin métricas centralizadas, el desarrollador que trabaja sin señales del cliente y el proveedor cuyo pipeline se estanca: son cuatro ángulos del mismo problema.
            </p>
            <p class="layer-lead">
              La falta de feedback estructurado post-implantación es uno de los factores de abandono de cliente (<em>churn</em>) más citados en el sector SaaS/B2B.
            </p>
          </div>
          <div class="layer-pain-image">
            <img src="assets/cuatro-perspectivas-cubo.png" alt="Ilustración isométrica de un cubo representando las cuatro perspectivas del problema: usuario final, empresa, desarrollador y proveedor" loading="lazy" />
          </div>
        </div>
      </section>

      <section class="layer layer-fork">
        <span class="layer-eyebrow">Dos caminos, una misma misión</span>
        <h2>¿Cuál es su caso?</h2>
        <div class="fork-grid">
          <article class="fork-card fork-card--tas">
            <span class="fork-tag">Para empresas cliente</span>
            <h3>Tech Adoption Strategy (TAS)</h3>
            <p>Consultoría de negocio y optimización de procesos, con <strong>la IA como palanca</strong> cuando el diagnóstico lo justifica. Aplicable a cualquier empresa, con cualquier stack tecnológico o sin él.</p>
            <a routerLink="/strategy" class="fork-link">Descubrir TAS →</a>
          </article>
          <article class="fork-card fork-card--tai">
            <span class="fork-tag">Para Partners y proveedores de software</span>
            <h3>Tech Adoption Intelligence (TAI)</h3>
            <p>Un motor externo que mueve el <strong>Net Revenue Retention</strong> de su cartera, trimestre a trimestre: recupere el control estratégico de las cuentas y active el upselling y cross-selling con datos, no con suposiciones.</p>
            <a routerLink="/intelligence" class="fork-link">Descubrir TAI →</a>
          </article>
        </div>
      </section>

      <section class="layer layer-cta">
        <h2>El primer paso es un diagnóstico claro</h2>
        <p>Cuéntenos su situación y le decimos, sin compromiso, si su caso encaja mejor en TAI o en TAS.</p>
        <button type="button" class="btn-primary" (click)="navigateToContact()">Hablar con b2bitmaster</button>
      </section>

    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.apply({
      title: 'b2bitmaster | Adopción tecnológica que se traduce en negocio',
      description: 'Dos servicios, una misma misión: TAI blinda y expande la cartera de proveedores de software; TAS optimiza procesos y rentabilidad en empresas cliente.',
      path: '/',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'b2bitmaster',
        url: 'https://www.b2bitmaster.com/',
        description: 'Retención de cartera para proveedores de software (TAI) y consultoría de optimización de procesos para empresas (TAS).'
      }
    });
  }

  navigateToContact(): void {
    this.router.navigate(['/contacto']);
  }
}
