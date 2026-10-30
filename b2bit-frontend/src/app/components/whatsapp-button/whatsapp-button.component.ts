import { Component } from '@angular/core';

/**
 * Botón flotante de WhatsApp, visible en todas las páginas.
 * Icono: Simple Icons v13.0.0 (CC0), src/assets/icons/whatsapp.svg.
 */
@Component({
  selector: 'app-whatsapp-button',
  standalone: true,
  template: `
    <a
      class="whatsapp-button"
      href="https://wa.me/34960730151?text=Hola%2C%20me%20gustar%C3%ADa%20informaci%C3%B3n%20sobre%20el%20diagn%C3%B3stico%20de%20b2bitmaster"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp">
      <img src="assets/icons/whatsapp.svg" alt="" width="28" height="28" aria-hidden="true">
    </a>
  `,
  styles: [`
    .whatsapp-button {
      position: fixed;
      right: 20px;
      bottom: 20px;
      z-index: 900;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: #25D366;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
      transition: transform 0.15s ease;
    }
    .whatsapp-button img {
      width: 28px;
      height: 28px;
      filter: brightness(0) invert(1);
    }
    .whatsapp-button:hover {
      transform: scale(1.06);
    }
    .whatsapp-button:focus-visible {
      outline: 3px solid #14314D;
      outline-offset: 3px;
      box-shadow: 0 0 0 3px #fff, 0 4px 12px rgba(0, 0, 0, 0.25);
    }
    @media (max-width: 600px) {
      .whatsapp-button {
        right: 16px;
        bottom: 16px;
        width: 48px;
        height: 48px;
      }
      .whatsapp-button img {
        width: 24px;
        height: 24px;
      }
    }
  `]
})
export class WhatsappButtonComponent {}
