import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { COOKIES_POLICY_HTML } from './cookies-policy.content';
import { CookieConsentService } from '../../services/cookie-consent.service';

/**
 * Componente Footer
 * Pie de página con navegación, contacto y modal de documentos legales
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section footer-brand">
          <a routerLink="/home" class="footer-logo">b2bitmaster</a>
          <p>Rentabilidad y autonomía operativa para empresas que adoptan tecnología (TAS); blindaje y expansión de cartera para proveedores de software (TAI).</p>
        </div>

        <div class="footer-section">
          <h4>Navegación</h4>
          <a routerLink="/home">Inicio</a>
          <a routerLink="/intelligence">Tech Adoption Intelligence (TAI)</a>
          <a routerLink="/strategy">Tech Adoption Strategy (TAS)</a>
          <a routerLink="/contacto">Contáctenos</a>
        </div>

        <div class="footer-section">
          <h4>Contacto</h4>
          <a href="mailto:info&#64;b2bitmaster.com">info&#64;b2bitmaster.com</a>
          <a href="tel:+34960730151">+34 (960) 730-151</a>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 b2bitmaster. Todos los derechos reservados.</p>
        <p class="footer-legal">
          <a href="#" (click)="openLegalModal('privacy', $event)">Política de Privacidad</a>
          <span class="footer-separator">·</span>
          <a href="#" (click)="openLegalModal('legal', $event)">Aviso Legal y Términos de Servicio</a>
          <span class="footer-separator">·</span>
          <a href="#" (click)="openLegalModal('cookies', $event)">Política de Cookies</a>
          <span class="footer-separator">·</span>
          <a href="#" (click)="openCookiePreferences($event)">Configurar cookies</a>
        </p>
      </div>

      <div class="footer-modal-overlay" *ngIf="legalModalVisible" (click)="closeLegalModal()">
        <div class="footer-modal" (click)="$event.stopPropagation()">
          <div class="footer-modal-header">
            <h3>{{ legalModalTitle }}</h3>
            <button type="button" class="modal-close" (click)="closeLegalModal()">Cerrar</button>
          </div>
          <div class="footer-modal-body">
            <iframe *ngIf="pdfModalSrc" [src]="pdfModalSrc" title="{{ legalModalTitle }}" frameborder="0" allowfullscreen></iframe>
            <div *ngIf="cookiesModalHtml" class="footer-modal-html" [innerHTML]="cookiesModalHtml"></div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  legalModalVisible = false;
  legalModalTitle = '';
  pdfModalSrc: SafeResourceUrl | null = null;
  cookiesModalHtml: SafeHtml | null = null;

  constructor(private sanitizer: DomSanitizer, private cookieConsent: CookieConsentService) {}

  openCookiePreferences(event: MouseEvent): void {
    event.preventDefault();
    this.cookieConsent.showPreferences();
  }

  openLegalModal(type: 'privacy' | 'legal' | 'cookies', event: MouseEvent): void {
    event.preventDefault();

    this.pdfModalSrc = null;
    this.cookiesModalHtml = null;

    if (type === 'privacy') {
      this.legalModalTitle = 'Política de Privacidad y Seguridad';
      this.pdfModalSrc = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/politica-de-privacidad-seguridad.pdf');
    } else if (type === 'legal') {
      this.legalModalTitle = 'Aviso Legal y Términos de Servicio';
      this.pdfModalSrc = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/aviso-legal-terminos-servicio.pdf');
    } else {
      this.legalModalTitle = 'Política de Cookies';
      this.cookiesModalHtml = this.sanitizer.bypassSecurityTrustHtml(COOKIES_POLICY_HTML);
    }

    this.legalModalVisible = true;
  }

  closeLegalModal(): void {
    this.legalModalVisible = false;
    this.pdfModalSrc = null;
    this.cookiesModalHtml = null;
  }
}
