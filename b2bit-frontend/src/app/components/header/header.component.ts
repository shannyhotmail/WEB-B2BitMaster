import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router, NavigationEnd } from '@angular/router';

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
            <img src="assets/Logo B2Bit2.png" alt="b2bit Logo" class="logo-img" />
          </a>
        </div>

        <!-- Menú -->
        <ul class="menu">
          <!-- Menú Servicios con desplegable -->
          <li class="menu-item has-submenu">
            <a href="javascript:void(0)" class="menu-link" (click)="toggleSubmenu()">
              <div class="services-label">
                <span>Servicios</span>
                <span class="service-name" *ngIf="currentServiceName()">{{ currentServiceName() }}</span>
              </div>
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
export class HeaderComponent implements OnInit {
  /**
   * Control del estado del menú desplegable de servicios
   */
  servicesOpen = signal(false);

  /**
   * Ruta actual
   */
  private currentRoute = signal('');

  /**
   * Nombre del servicio actual basado en la ruta
   */
  currentServiceName = computed(() => {
    const route = this.currentRoute();
    if (route.includes('/intelligence')) {
      return 'TECH ADOPTION INTELLIGENCE (TAI)';
    }
    if (route.includes('/strategy')) {
      return 'TECH ADOPTION STRATEGY (TAS)';
    }
    return '';
  });

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.set(this.router.url);
      }
    });
    this.currentRoute.set(this.router.url);
  }

  /**
   * Alterna el estado del menú desplegable
   */
  toggleSubmenu(): void {
    this.servicesOpen.update(state => !state);
  }
}
