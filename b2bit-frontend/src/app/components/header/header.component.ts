import { Component, Input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Header global: nav plana (Inicio, TAS, TAI, Contáctenos) sin degradado,
 * visible en las 4 páginas del sitio.
 * En modo `minimal` (usado en landings de campaña como /diagnostico-ia)
 * solo se muestra el logo, sin nav ni menú móvil.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header-content">
        <a routerLink="/home" class="logo-link" title="b2bitmaster - Ir a inicio">
          <img src="assets/b2bit_logo_final.png" alt="b2bitmaster" class="logo-img" />
        </a>

        <ng-container *ngIf="!minimal">
          <button
            type="button"
            class="menu-toggle"
            [class.open]="menuOpen()"
            (click)="menuOpen.set(!menuOpen())"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="primary-nav"
            aria-label="Abrir menú de navegación"
          >
            <span></span><span></span><span></span>
          </button>

          <nav id="primary-nav" class="menu" [class.open]="menuOpen()">
            <a routerLink="/home" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="menu-link" (click)="menuOpen.set(false)">Inicio</a>
            <a routerLink="/strategy" routerLinkActive="active" class="menu-link" (click)="menuOpen.set(false)">TAS</a>
            <a routerLink="/intelligence" routerLinkActive="active" class="menu-link" (click)="menuOpen.set(false)">TAI</a>
            <a routerLink="/contacto" routerLinkActive="active" class="menu-link menu-cta" (click)="menuOpen.set(false)">Contáctenos</a>
          </nav>
        </ng-container>
      </div>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() minimal = false;
  menuOpen = signal(false);
}
