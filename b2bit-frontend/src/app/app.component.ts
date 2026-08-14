import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CookieConsentService } from './services/cookie-consent.service';

/**
 * Componente raíz de la aplicación.
 * Define la estructura general con cabecera, contenido principal y pie de página.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-header [minimal]="minimalHeader()"></app-header>
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'b2bit-frontend';

  // Header simplificado (solo logo) en landings de campaña como /diagnostico-ia
  minimalHeader = signal(false);

  constructor(private router: Router, private cookieConsent: CookieConsentService) {
    this.minimalHeader.set(this.isMinimalHeaderRoute(this.router.url));

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event) => {
      window.scrollTo(0, 0);
      this.minimalHeader.set(this.isMinimalHeaderRoute((event as NavigationEnd).urlAfterRedirects));
      this.cookieConsent.trackPageView((event as NavigationEnd).urlAfterRedirects);
    });

    this.cookieConsent.init();
  }

  private isMinimalHeaderRoute(url: string): boolean {
    return url.startsWith('/diagnostico-ia');
  }
}
