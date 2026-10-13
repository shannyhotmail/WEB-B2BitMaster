import { Injectable, NgZone, inject } from '@angular/core';

const WIDGET_JS = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';
const CALENDLY_ORIGIN = 'https://calendly.com';

type CalendlyWindow = Window & {
  Calendly?: { initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void };
};

/**
 * Carga el widget inline de Calendly y escucha la reserva confirmada
 * (postMessage "calendly.event_scheduled"). No sabe nada de consentimiento ni
 * de tracking: quien lo use decide cuándo montarlo y qué hacer con el evento.
 */
@Injectable({ providedIn: 'root' })
export class CalendlyEmbedService {
  private zone = inject(NgZone);
  private assetsPromise: Promise<void> | null = null;

  /**
   * Monta el widget en `host` cuando su contenedor se acerca al viewport.
   * `onReady(true)` cuando el widget está inicializado; `onReady(false)` si no
   * pudo cargar (bloqueador, red) o tras desmontarlo.
   * Devuelve la función de limpieza (idempotente).
   */
  mount(
    host: HTMLElement,
    url: string,
    onScheduled: () => void,
    onReady: (ready: boolean) => void
  ): () => void {
    let destroyed = false;
    let observer: IntersectionObserver | null = null;
    // Una misma reserva puede notificarse más de una vez; una reserva nueva en
    // la misma visita es una conversión distinta y sí cuenta.
    const seen = new Set<string>();

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== CALENDLY_ORIGIN) return;
      if (e.data?.event !== 'calendly.event_scheduled') return;
      const id: string | undefined = e.data.payload?.invitee?.uri ?? e.data.payload?.event?.uri;
      if (id) {
        if (seen.has(id)) return;
        seen.add(id);
      }
      onScheduled();
    };
    this.zone.runOutsideAngular(() => window.addEventListener('message', onMessage));

    const init = () => {
      this.loadAssets().then(() => {
        if (destroyed) return;
        (window as unknown as CalendlyWindow).Calendly!.initInlineWidget({ url, parentElement: host });
        onReady(true);
      }).catch(() => {
        if (!destroyed) onReady(false);
      });
    };

    const target = host.parentElement ?? host;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer?.disconnect();
          observer = null;
          init();
        }
      }, { rootMargin: '300px' });
      observer.observe(target);
    } else {
      init();
    }

    return () => {
      if (destroyed) return;
      destroyed = true;
      observer?.disconnect();
      window.removeEventListener('message', onMessage);
      host.innerHTML = '';
      onReady(false);
    };
  }

  // widget.js/css se cargan una sola vez por sesión de página.
  private loadAssets(): Promise<void> {
    if (!this.assetsPromise) {
      this.assetsPromise = new Promise<void>((resolve, reject) => {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = WIDGET_CSS;
        document.head.appendChild(css);

        const script = document.createElement('script');
        script.src = WIDGET_JS;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => {
          script.remove();
          css.remove();
          this.assetsPromise = null;
          reject(new Error('No se pudo cargar el widget de Calendly'));
        };
        document.head.appendChild(script);
      });
    }
    return this.assetsPromise;
  }
}
