import { Injectable } from '@angular/core';

type DataLayerWindow = Window & { dataLayer: unknown[] };
type CookiebotWindow = Window & { Cookiebot?: { renew: () => void; consent?: { marketing?: boolean } } };

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private lastTrackedPath: string | null = null;

  // Cookiebot gestiona el banner y el bloqueo de scripts (vía GTM); esto solo
  // reabre el panel de preferencias ya existente (usado desde el footer).
  showPreferences(): void {
    (window as unknown as CookiebotWindow).Cookiebot?.renew();
  }

  // GA4 no detecta de forma fiable los cambios de ruta del router de Angular,
  // así que se empuja un evento "page_view" a dataLayer en cada NavigationEnd
  // (ver app.component.ts), capturado en GTM por un trigger de evento
  // personalizado (no por el trigger de Initialization del tag base).
  trackPageView(path: string): void {
    if (path === this.lastTrackedPath) {
      return;
    }
    this.lastTrackedPath = path;
    this.push({ event: 'page_view', page_location: window.location.origin + path });
  }

  trackDiagnosticoIaFormConversion(): void {
    // Gate explícito por consentimiento de marketing, además del que GTM
    // aplica internamente en la propia tag de conversión de Ads.
    if (!(window as unknown as CookiebotWindow).Cookiebot?.consent?.marketing) {
      return;
    }
    this.push({ event: 'diagnostico_ia_conversion', value: 1.0, currency: 'EUR' });
  }

  private push(data: Record<string, unknown>): void {
    const win = window as unknown as DataLayerWindow;
    win.dataLayer = win.dataLayer || [];
    win.dataLayer.push(data);
  }
}
