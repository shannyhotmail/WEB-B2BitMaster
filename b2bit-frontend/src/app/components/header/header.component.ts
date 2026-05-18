import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

/**
 * Componente Header
 * Implementa la navegación principal de la aplicación con menú desplegable.
 * Altura fija: 100px
 * Ancho: 100% viewport, contenido: máximo 1200px centrado
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <header class="header">
      <nav class="header-content">
        <!-- Logo -->
        <div class="logo">
          <a routerLink="/home" class="logo-link" title="b2bit - Ir a inicio">
            <img src="assets/logob2bit.png" alt="b2bit Logo" class="logo-img" />
          </a>
        </div>

        <!-- Menú -->
        <ul class="menu">
          <!-- Menú Servicios con desplegable -->
          <li class="menu-item has-submenu">
            <a href="javascript:void(0)" class="menu-link" (click)="toggleSubmenu()">
              Servicios
              <i class="icon-chevron" [class.open]="servicesOpen()"></i>
            </a>
            <ul class="submenu" [class.open]="servicesOpen()">
              <li>
                <a routerLink="/intelligence" class="submenu-link" (click)="servicesOpen.set(false)">
                  Tech Adopción Intelligence (TAI)
                </a>
              </li>
              <li>
                <a routerLink="/strategy" class="submenu-link" (click)="servicesOpen.set(false)">
                  Tech Adoption Strategy (TAS)
                </a>
              </li>
            </ul>
          </li>

          <!-- Menú Contáctenos -->
          <li class="menu-item">
            <a routerLink="/contacto" class="menu-link">Contáctenos</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  /**
   * Control del estado del menú desplegable de servicios
   */
  servicesOpen = signal(false);

  /**
   * Alterna el estado del menú desplegable
   */
  toggleSubmenu(): void {
    this.servicesOpen.update(state => !state);
  }
}
