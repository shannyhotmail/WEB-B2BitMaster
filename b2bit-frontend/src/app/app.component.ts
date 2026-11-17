import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WhatsappButtonComponent } from './components/whatsapp-button/whatsapp-button.component';
import { CookieConsentService } from './services/cookie-consent.service';

/**
 * Componente raíz de la aplicación.
 * Define la estructura general con cabecera, contenido principal y pie de página.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, WhatsappButtonComponent],
  template: `
    <div class="app-container">
      <app-header *ngIf="!guiaPrivada()" [minimal]="minimalHeader()"></app-header>
      <main class="main-content" [class.sin-cabecera]="guiaPrivada()">
        <router-outlet></router-outlet>
      </main>
      <app-footer *ngIf="!guiaPrivada()"></app-footer>
      <app-whatsapp-button *ngIf="!guiaPrivada()"></app-whatsapp-button>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'b2bit-frontend';

  // Header simplificado (solo logo) en landings de campaña como /diagnostico-ia, /optimizaprocesos y /autonomosypymes
  minimalHeader = signal(false);

  // Páginas privadas de guías (/g/<slug>): pantalla propia, sin header/footer/WhatsApp
  guiaPrivada = signal(false);

  constructor(private router: Router, private cookieConsent: CookieConsentService) {
    this.minimalHeader.set(this.isMinimalHeaderRoute(this.router.url));
    this.guiaPrivada.set(this.isGuiaRoute(this.router.url));

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      window.scrollTo(0, 0);
      this.minimalHeader.set(this.isMinimalHeaderRoute((event as NavigationEnd).urlAfterRedirects));
      const url = (event as NavigationEnd).urlAfterRedirects;
      this.guiaPrivada.set(this.isGuiaRoute(url));
      // No se envía page_view en /g/<slug>: el slug es secreto y no debe llegar a analítica
      // (la página emite guia_vista con la palabra clave).
      if (!this.isGuiaRoute(url)) {
        this.cookieConsent.trackPageView(url);
      }
    });
  }

  private isGuiaRoute(url: string): boolean {
    return url.startsWith('/g/');
  }

  private isMinimalHeaderRoute(url: string): boolean {
    return url.startsWith('/diagnostico-ia') || url.startsWith('/optimizaprocesos') || url.startsWith('/autonomosypymes');
  }
}
