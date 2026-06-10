import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

/**
 * Componente Footer
 * Pie de página con información de contacto y derechos de autor
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section footer-left">
          <h4>b2bit Solutions</h4>
          <p>Tech Adopción Intelligence</p>
          <p>Tech Adopción Strategy</p>
        </div>

        <div class="footer-section footer-right">
          <h4>Contacto</h4>
          <p>Email: <a href="mailto:info&#64;b2bitmaster.com">info&#64;b2bitmaster.com</a></p>
          <p>Teléfono: <a href="tel:+34960730151">+34 (960) 730-151</a></p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 b2bit Solutions. Todos los derechos reservados. | 
          <a href="#" (click)="openPdfModal('privacy', $event)">Política de Privacidad</a>
          <span class="footer-separator">|</span>
          <a href="#" (click)="openPdfModal('legal', $event)">Aviso Legal y Términos de Servicio</a>
        </p>
      </div>

      <div class="footer-modal-overlay" *ngIf="pdfModalVisible">
        <div class="footer-modal">
          <div class="footer-modal-header">
            <h3>{{ pdfModalTitle }}</h3>
            <button type="button" class="modal-close" (click)="closePdfModal()">Cerrar</button>
          </div>
          <div class="footer-modal-body">
            <iframe [src]="pdfModalSrc" frameborder="0" allowfullscreen></iframe>
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
