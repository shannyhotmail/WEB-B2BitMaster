import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { GUIAS, GUIAS_RUTA_ASSETS, Guia } from './guias.data';

// El worker se copia a /assets en el build (ver angular.json). La versión va en la ruta
// para que una actualización de pdfjs-dist no sirva un worker antiguo desde caché.
const PDF_WORKER_SRC = '/assets/pdfjs-3.11.174/pdf.worker.min.js';
const MAX_DPR = 2;

type Estado = 'cargando' | 'invalida' | 'preparacion' | 'visor' | 'error';

/**
 * Página privada de una guía PDF: /g/:slug. Sin listado ni enlaces desde otras páginas.
 * El visor (pdfjs-dist, build legacy) se carga con import() dinámico solo aquí.
 */
@Component({
  selector: 'app-guia',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="guia">
      <div class="aviso-ig" *ngIf="avisoInstagram()" role="note">
        <span>Para descargar la guía, toca ⋯ y elige «Abrir en el navegador».</span>
        <button type="button" (click)="avisoInstagram.set(false)" aria-label="Cerrar aviso">✕</button>
      </div>

      <ng-container *ngIf="estado() === 'invalida'">
        <header class="cabecera">
          <img src="assets/b2bit_logo_final.png" alt="b2bitmaster" class="logo" />
        </header>
        <main class="mensaje">
          <h1>Este enlace no es válido</h1>
        </main>
      </ng-container>

      <ng-container *ngIf="guia && estado() !== 'invalida'">
        <header class="cabecera">
          <img src="assets/b2bit_logo_final.png" alt="b2bitmaster" class="logo" />
          <div class="cab-texto">
            <h1>{{ guia.titulo }}</h1>
            <p *ngIf="estado() !== 'preparacion'">De la publicación: {{ guia.publicacion }}</p>
          </div>
        </header>

        <main class="mensaje" *ngIf="estado() === 'preparacion'">
          <p class="pronto">Esta guía estará disponible muy pronto</p>
        </main>

        <ng-container *ngIf="estado() !== 'preparacion'">
          <div class="visor" #visor [hidden]="estado() === 'error'">
            <div class="cargando" *ngIf="estado() === 'cargando'" role="status">
              <span class="spinner" aria-hidden="true"></span> Cargando la guía…
            </div>
            <div class="paginas" #paginas></div>
          </div>

          <div class="error" *ngIf="estado() === 'error'" role="alert">
            <p>No hemos podido mostrar la guía aquí.</p>
            <a class="enlace" [href]="pdfUrl" target="_blank" rel="noopener">Abrir la guía</a>
          </div>

          <div class="barra">
            <a class="btn-descargar" [href]="pdfUrl" [attr.download]="guia.archivo" (click)="onDescarga($event)">
              Descargar guía (PDF)
            </a>
            <p class="ayuda-ios" *ngIf="esIos">En iPhone: toca ⬆ y elige «Guardar en Archivos».</p>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [`
    :host { display: block; }
    .guia {
      display: flex; flex-direction: column;
      height: 100vh; height: 100dvh;
      background: #f8f6f2; color: #1c2b36;
    }
    .aviso-ig {
      display: flex; align-items: center; gap: 12px; justify-content: space-between;
      background: #fff6dd; border-bottom: 1px solid #f1a805;
      padding: 10px 14px; font-size: 0.9rem; line-height: 1.35; color: #4a3500;
    }
    .aviso-ig button {
      flex: none; min-width: 36px; min-height: 36px; border: 0; background: transparent;
      font-size: 1.1rem; color: #4a3500; cursor: pointer;
    }
    .cabecera {
      flex: none; display: flex; align-items: center; gap: 12px;
      padding: 10px 16px; background: #fff; border-bottom: 1px solid rgba(1, 61, 90, 0.12);
    }
    .logo { height: 28px; width: auto; flex: none; }
    .cab-texto { min-width: 0; }
    .cab-texto h1 {
      margin: 0; font-family: var(--font-heading); font-weight: 700; color: #14314d;
      font-size: 1.02rem; line-height: 1.2; letter-spacing: -0.01em;
    }
    .cab-texto p { margin: 2px 0 0; font-size: 0.75rem; color: #4a5c68; line-height: 1.3; }
    .mensaje { flex: 1; display: grid; place-content: center; text-align: center; padding: 24px; }
    .mensaje h1 { font-family: var(--font-heading); color: #14314d; font-size: 1.5rem; margin: 0; }
    .pronto { font-size: 1.15rem; color: #3b4856; margin: 0; }
    .visor { flex: 1; min-height: 0; overflow-y: auto; -webkit-overflow-scrolling: touch; background: #e9e6df; }
    .paginas { display: flex; flex-direction: column; gap: 10px; padding: 10px 0 16px; }
    :host ::ng-deep .pagina { position: relative; width: 100%; max-width: 900px; margin: 0 auto; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.15); }
    :host ::ng-deep .pagina canvas { display: block; width: 100%; height: 100%; }
    .cargando { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 28px; color: #3b4856; }
    .spinner {
      width: 20px; height: 20px; border-radius: 50%;
      border: 3px solid rgba(1, 61, 90, 0.2); border-top-color: #013d5a;
      animation: giro 0.8s linear infinite;
    }
    @keyframes giro { to { transform: rotate(360deg); } }
    .error { flex: 1; display: grid; place-content: center; justify-items: center; gap: 14px; text-align: center; padding: 24px; }
    .error p { margin: 0; color: #3b4856; }
    .enlace { color: #013d5a; font-weight: 700; text-decoration: underline; padding: 12px; }
    .barra {
      flex: none; padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
      background: #fff; border-top: 1px solid rgba(1, 61, 90, 0.12);
    }
    .btn-descargar {
      display: flex; align-items: center; justify-content: center;
      min-height: 52px; border-radius: 8px; background: #ff3131; color: #fff;
      font-weight: 700; font-size: 1rem; text-decoration: none;
    }
    .ayuda-ios { margin: 8px 0 0; text-align: center; font-size: 0.75rem; color: #4a5c68; }
    .btn-descargar:active { background: #d62828; }
    .btn-descargar:focus-visible, .enlace:focus-visible { outline: 3px solid #f1a805; outline-offset: 2px; }
    @media (min-width: 768px) {
      .barra { display: flex; justify-content: center; }
      .btn-descargar { min-width: 320px; }
      .cab-texto h1 { font-size: 1.2rem; }
    }
    @media (prefers-reduced-motion: reduce) { .spinner { animation-duration: 2.4s; } }
  `]
})
export class GuiaComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private meta = inject(Meta);
  private consent = inject(CookieConsentService);

  @ViewChild('visor') visorRef?: ElementRef<HTMLElement>;
  @ViewChild('paginas') paginasRef?: ElementRef<HTMLElement>;

  guia?: Guia;
  pdfUrl = '';
  estado = signal<Estado>('cargando');
  avisoInstagram = signal(false);
  // iOS: el PDF se precarga como File para poder llamar a navigator.share() justo tras el toque
  esIos = false;
  private archivoPdf?: File;

  private observer?: IntersectionObserver;
  private pdfDoc?: { destroy: () => Promise<void> };
  private destruido = false;

  ngOnInit(): void {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });

    const ua = navigator.userAgent;
    this.avisoInstagram.set(/Instagram/i.test(ua) && /FBAN|FBAV/.test(ua));
    // iPadOS se identifica como Macintosh, pero con pantalla táctil
    this.esIos = /iPhone|iPad|iPod/.test(ua) || (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1);

    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.guia = GUIAS.find(g => g.slug === slug);
    if (!this.guia) {
      this.estado.set('invalida');
      return;
    }
    this.pdfUrl = GUIAS_RUTA_ASSETS + encodeURIComponent(this.guia.archivo);
    this.consent.trackGuiaVista(this.guia.palabraClave);
    if (this.guia.estado !== 'lista') {
      this.estado.set('preparacion');
    } else if (this.esIos) {
      void this.precargarArchivo();
    }
  }

  ngAfterViewInit(): void {
    if (this.guia?.estado === 'lista') {
      void this.iniciarVisor();
    }
  }

  ngOnDestroy(): void {
    this.destruido = true;
    this.meta.removeTag("name='robots'");
    this.observer?.disconnect();
    void this.pdfDoc?.destroy();
  }

  onDescarga(event: Event): void {
    if (this.guia) {
      this.consent.trackGuiaDescarga(this.guia.palabraClave);
    }
    if (!this.esIos || !this.archivoPdf || !this.guia) { return; }
    const nav = navigator as Navigator & { canShare?: (d: ShareData) => boolean };
    const datos: ShareData = { files: [this.archivoPdf], title: this.guia.titulo };
    if (typeof nav.canShare !== 'function' || !nav.canShare(datos) || typeof nav.share !== 'function') { return; }
    // navigator.share() debe llamarse de inmediato tras el gesto: sin await antes.
    event.preventDefault();
    nav.share(datos).catch((err: unknown) => {
      if ((err as { name?: string })?.name === 'AbortError') { return; } // el usuario canceló
      window.location.href = this.pdfUrl; // fallo real: enlace normal (visor nativo)
    });
  }

  private async precargarArchivo(): Promise<void> {
    try {
      const res = await fetch(this.pdfUrl);
      if (!res.ok || this.destruido || !this.guia) { return; }
      const blob = await res.blob();
      this.archivoPdf = new File([blob], this.guia.archivo, { type: 'application/pdf' });
    } catch {
      // sin File listo, el botón actúa como enlace normal
    }
  }

  private async iniciarVisor(): Promise<void> {
    try {
      // Si el PDF aún no se ha copiado a assets, se trata como "en preparación".
      const head = await fetch(this.pdfUrl, { method: 'HEAD' }).catch(() => null);
      if (head && head.status === 404) {
        this.estado.set('preparacion');
        return;
      }

      const pdfjs = await import('pdfjs-dist/legacy/build/pdf');
      if (this.destruido) { return; }
      pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;

      const doc = await pdfjs.getDocument({ url: this.pdfUrl }).promise;
      this.pdfDoc = doc;
      if (this.destruido) { void doc.destroy(); return; }

      const contenedor = this.paginasRef!.nativeElement;
      const raiz = this.visorRef!.nativeElement;
      const paginas: { el: HTMLElement; n: number; hecha: boolean }[] = [];

      // Marcadores con la proporción real de cada página (evita saltos al renderizar)
      for (let n = 1; n <= doc.numPages; n++) {
        const vp = (await doc.getPage(n)).getViewport({ scale: 1 });
        const el = document.createElement('div');
        el.className = 'pagina';
        el.style.aspectRatio = `${vp.width} / ${vp.height}`;
        el.dataset['n'] = String(n);
        contenedor.appendChild(el);
        paginas.push({ el, n, hecha: false });
      }
      if (this.destruido) { return; }
      this.estado.set('visor');

      this.observer = new IntersectionObserver(entradas => {
        for (const e of entradas) {
          if (!e.isIntersecting) { continue; }
          const p = paginas[Number((e.target as HTMLElement).dataset['n']) - 1];
          if (p.hecha) { continue; }
          p.hecha = true;
          this.observer?.unobserve(e.target);
          void this.renderPagina(doc, p.n, p.el).catch(() => this.estado.set('error'));
        }
      }, { root: raiz, rootMargin: '800px 0px' });
      paginas.forEach(p => this.observer!.observe(p.el));
    } catch {
      if (!this.destruido) { this.estado.set('error'); }
    }
  }

  private async renderPagina(doc: any, n: number, el: HTMLElement): Promise<void> {
    const page = await doc.getPage(n);
    const base = page.getViewport({ scale: 1 });
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const escala = (el.clientWidth / base.width) * dpr;
    const vp = page.getViewport({ scale: escala });

    const canvas = document.createElement('canvas');
    canvas.width = Math.floor(vp.width);
    canvas.height = Math.floor(vp.height);
    const ctx = canvas.getContext('2d');
    if (!ctx || this.destruido) { return; }
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    if (!this.destruido) { el.appendChild(canvas); }
  }
}
