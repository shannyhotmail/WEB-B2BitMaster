import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
          <p>Inteligencia de retención para proveedores de software (TAI) y consultoría de optimización de procesos para empresas (TAS).</p>
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
          <a href="#" (click)="openPdfModal('privacy', $event)">Política de Privacidad</a>
          <span class="footer-separator">·</span>
          <a href="#" (click)="openPdfModal('legal', $event)">Aviso Legal y Términos de Servicio</a>
        </p>
      </div>

      <div class="footer-modal-overlay" *ngIf="pdfModalVisible" (click)="closePdfModal()">
        <div class="footer-modal" (click)="$event.stopPropagation()">
          <div class="footer-modal-header">
            <h3>{{ pdfModalTitle }}</h3>
            <button type="button" class="modal-close" (click)="closePdfModal()">Cerrar</button>
          </div>
          <div class="footer-modal-body">
            <iframe [src]="pdfModalSrc" title="{{ pdfModalTitle }}" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  pdfModalVisible = false;
  pdfModalTitle = '';
  pdfModalSrc: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) {}

  openPdfModal(type: 'privacy' | 'legal', event: MouseEvent): void {
    event.preventDefault();

    if (type === 'privacy') {
      this.pdfModalTitle = 'Política de Privacidad y Seguridad';
      this.pdfModalSrc = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/politica-de-privacidad-seguridad.pdf');
    } else {
      this.pdfModalTitle = 'Aviso Legal y Términos de Servicio';
      this.pdfModalSrc = this.sanitizer.bypassSecurityTrustResourceUrl('/assets/aviso-legal-terminos-servicio.pdf');
    }

    this.pdfModalVisible = true;
  }

  closePdfModal(): void {
    this.pdfModalVisible = false;
    this.pdfModalSrc = null;
  }
}
