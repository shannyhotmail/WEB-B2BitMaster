import { Injectable } from '@angular/core';

const DIAGNOSTICO_IA_FORM_CONVERSION_LABEL = 'AW-18385297761/6BncCOeKnOAcEOHC5b5E';

type GtagWindow = Window & { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
type CookiebotWindow = Window & { Cookiebot?: { renew: () => void } };

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private lastTrackedPath: string | null = null;

  // Cookiebot gestiona el banner y el bloqueo de scripts; esto solo reabre
  // el panel de preferencias ya existente (usado desde el footer).
  showPreferences(): void {
    (window as unknown as CookiebotWindow).Cookiebot?.renew();
  }

  // GA4 no detecta de forma fiable los cambios de ruta del router de
  // Angular (confirmado con Google Analytics Debugger: nunca procesa un
  // page_view). Se desactiva el automático (send_page_view: false en
  // index.html) y se dispara a mano en cada NavigationEnd (ver app.component.ts).
  trackPageView(path: string): void {
    if (path === this.lastTrackedPath) {
      return;
    }
    this.lastTrackedPath = path;
    this.gtagWindow().gtag('event', 'page_view', { page_path: path });
  }

  trackDiagnosticoIaFormConversion(): void {
    const win = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      Cookiebot?: { consent?: { marketing?: boolean } };
    };
    // Gate explícito por consentimiento de marketing: gtag puede existir por
    // haberse cargado vía Statistics, eso no autoriza el pixel de Ads.
    if (!win.Cookiebot?.consent?.marketing || typeof win.gtag !== 'function') {
      return;
    }
    win.gtag('event', 'conversion', {
      send_to: DIAGNOSTICO_IA_FORM_CONVERSION_LABEL,
      value: 1.0,
      currency: 'EUR'
    });
  }

  private gtagWindow(): GtagWindow {
    return window as unknown as GtagWindow;
  }
}
