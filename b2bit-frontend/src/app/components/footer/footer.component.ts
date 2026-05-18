import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
        <div class="footer-section">
          <h4>b2bit Solutions</h4>
          <p>Tech Adopción Intelligence y Strategy</p>
        </div>

        <div class="footer-section">
          <h4>Contacto</h4>
          <p>Email: <a href="mailto:info&#64;b2bit.com">info&#64;b2bit.com</a></p>
          <p>Teléfono: <a href="tel:+1234567890">+1 (234) 567-890</a></p>
        </div>

        <div class="footer-section">
          <h4>Síguenos</h4>
          <p>
            <a href="#" target="_blank" rel="noopener">LinkedIn</a> |
            <a href="#" target="_blank" rel="noopener">Twitter</a> |
            <a href="#" target="_blank" rel="noopener">Facebook</a>
          </p>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2026 b2bit Solutions. Todos los derechos reservados. | <a href="#">Política de Privacidad</a></p>
      </div>
    </footer>
  `,
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent { }
