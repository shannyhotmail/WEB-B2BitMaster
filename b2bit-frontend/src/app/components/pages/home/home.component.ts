import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Home
 * Página de inicio de la aplicación
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <section class="hero-section">
        <div class="hero-content">
          <h1>Bienvenido a b2bit</h1>
          <p class="subtitle">Soluciones de Adopción Tecnológica Inteligente</p>
          <p class="description">
            En b2bit, transformamos la manera en que las organizaciones adoptan la tecnología.
            Combinamos inteligencia de mercado con estrategia empresarial para asegurar que
            tu empresa esté siempre un paso adelante.
          </p>
        </div>
      </section>

      <section class="services-preview">
        <h2>Nuestros Servicios</h2>
        <div class="services-grid">
          <article class="service-card">
            <i class="icon">🎯</i>
            <h3>Tech Adopción Intelligence (TAI)</h3>
            <p>Análisis profundo de tendencias tecnológicas y evaluación de soluciones adaptadas a tu negocio.</p>
          </article>

          <article class="service-card">
            <i class="icon">📊</i>
            <h3>Tech Adoption Strategy (TAS)</h3>
            <p>Estrategia personalizada para implementar tecnología de forma efectiva y rentable.</p>
          </article>

          <article class="service-card">
            <i class="icon">💡</i>
            <h3>Consultoría Integral</h3>
            <p>Asesoría completa desde la evaluación inicial hasta la implementación y optimización.</p>
          </article>
        </div>
      </section>

      <section class="cta-section">
        <h2>¿Listo para transformar tu negocio?</h2>
        <p>Contáctanos hoy para una consulta inicial sin costo.</p>
        <button class="btn-primary" (click)="navigateToContact()">Solicitar Consulta</button>
      </section>
    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  /**
   * Navega a la página de contacto
   */
  navigateToContact(): void {
    window.location.href = '/contacto';
  }
}
