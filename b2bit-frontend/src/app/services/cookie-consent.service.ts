import { Injectable } from '@angular/core';

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

type CookieConsentApi = typeof import('vanilla-cookieconsent');

const GOOGLE_ADS_ID = 'AW-18385297761';
const GA4_MEASUREMENT_ID = 'G-PPS9NCBNKP';
const DIAGNOSTICO_IA_FORM_CONVERSION_LABEL = 'AW-18385297761/6BncCOeKnOAcEOHC5b5E';

type GtagWindow = Window & { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  private apiPromise: Promise<CookieConsentApi> | null = null;
  private marketingLoaded = false;
  private analyticsLoaded = false;
  private lastTrackedPath: string | null = null;

  init(): void {
    // dataLayer/gtag y el consentimiento por defecto (todo denegado) se
    // establecen de inmediato, antes de que el usuario decida nada y antes
    // de que se cargue ningún script de Ads/GA4 — así Google Consent Mode
    // tiene una señal explícita desde el primer momento en vez de asumirla.
    this.ensureGtagBase();
    this.loadApi().then(CookieConsent => this.run(CookieConsent));
  }

  async showPreferences(): Promise<void> {
    const CookieConsent = await this.loadApi();
    CookieConsent.showPreferences();
  }

  private loadApi(): Promise<CookieConsentApi> {
    // Carga perezosa: el JS de la librería (la parte más pesada) solo se
    // descarga cuando hace falta, para que no cuente en el bundle inicial.
    if (!this.apiPromise) {
      this.apiPromise = import('vanilla-cookieconsent');
    }
    return this.apiPromise;
  }

  private run(CookieConsent: CookieConsentApi): void {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: 'box',
          position: 'bottom right',
          equalWeightButtons: true,
          flipButtons: false
        },
        preferencesModal: {
          layout: 'box',
          equalWeightButtons: true,
          flipButtons: false
        }
      },
      categories: {
        necessary: {
          enabled: true,
          readOnly: true
        },
        analytics: {
          autoClear: {
            cookies: [{ name: /^_ga/ }, { name: '_gid' }]
          }
        },
        marketing: {}
      },
      language: {
        default: 'es',
        translations: {
          es: {
            consentModal: {
              title: 'Utilizamos cookies',
              description:
                'Usamos cookies necesarias para que el sitio funcione, y cookies analíticas y de marketing (previa tu autorización) para entender cómo se usa el sitio y medir nuestras campañas publicitarias. Puedes aceptar todas, rechazar las no necesarias o configurar tus preferencias.',
              acceptAllBtn: 'Aceptar todas',
              acceptNecessaryBtn: 'Rechazar',
              showPreferencesBtn: 'Configurar cookies'
            },
            preferencesModal: {
              title: 'Preferencias de privacidad',
              acceptAllBtn: 'Aceptar todas',
              acceptNecessaryBtn: 'Rechazar todas',
              savePreferencesBtn: 'Guardar preferencias',
              closeIconLabel: 'Cerrar',
              sections: [
                {
                  title: 'Uso de cookies',
                  description:
                    'Puedes activar o desactivar cada categoría de cookies, excepto las estrictamente necesarias. Más información en nuestra Política de Cookies.'
                },
                {
                  title: 'Cookies estrictamente necesarias',
                  description:
                    'Imprescindibles para que el sitio funcione correctamente (por ejemplo, para recordar tu elección sobre cookies). No requieren consentimiento.',
                  linkedCategory: 'necessary'
                },
                {
                  title: 'Cookies analíticas',
                  description:
                    'Nos permiten entender cómo se usa el sitio para poder mejorarlo (Google Analytics 4).',
                  linkedCategory: 'analytics'
                },
                {
                  title: 'Cookies de marketing',
                  description:
                    'Se usan para medir nuestras campañas publicitarias y mostrarte anuncios relevantes en otras webs (Google Ads, Meta Pixel, LinkedIn Insight Tag).',
                  linkedCategory: 'marketing'
                }
              ]
            }
          }
        }
      },
      // onConsent ya cubre la primera decisión y cada carga de página;
      // onFirstConsent sería redundante y duplicaba el gtag('consent','update').
      onConsent: () => this.applyConsent(CookieConsent),
      onChange: () => this.applyConsent(CookieConsent)
    }).catch(err => console.error('[CookieConsent] run() failed:', err));
  }

  private applyConsent(CookieConsent: CookieConsentApi): void {
    const analyticsAccepted = CookieConsent.acceptedCategory('analytics' satisfies ConsentCategory);
    const marketingAccepted = CookieConsent.acceptedCategory('marketing' satisfies ConsentCategory);

    // Se envía en cada decisión (inicial o posterior vía "Configurar cookies"),
    // para que Google refleje también las revocaciones, no solo las aceptaciones.
    this.gtagWindow().gtag('consent', 'update', {
      analytics_storage: analyticsAccepted ? 'granted' : 'denied',
      ad_storage: marketingAccepted ? 'granted' : 'denied',
      ad_user_data: marketingAccepted ? 'granted' : 'denied',
      ad_personalization: marketingAccepted ? 'granted' : 'denied'
    });

    if (analyticsAccepted) {
      this.enableAnalytics();
    }

    if (marketingAccepted) {
      this.enableMarketing();
    }
  }

  private enableAnalytics(): void {
    this.loadGa4Tag();
  }

  private enableMarketing(): void {
    // Meta Pixel y LinkedIn Insight Tag se añadirán aquí cuando estén disponibles.
    this.loadGoogleAdsTag();
  }

  private loadGoogleAdsTag(): void {
    if (this.marketingLoaded) {
      return;
    }
    this.marketingLoaded = true;

    this.injectGtagScript(GOOGLE_ADS_ID);
    this.gtagWindow().gtag('config', GOOGLE_ADS_ID);
  }

  private loadGa4Tag(): void {
    if (this.analyticsLoaded) {
      return;
    }
    this.analyticsLoaded = true;

    this.injectGtagScript(GA4_MEASUREMENT_ID);
    // GA4 no detecta de forma fiable los cambios de ruta del router de
    // Angular (confirmado con Google Analytics Debugger: nunca procesa un
    // page_view). Se desactiva el automático y se dispara a mano, aquí y
    // en cada NavigationEnd (ver trackPageView / app.component.ts).
    this.gtagWindow().gtag('config', GA4_MEASUREMENT_ID, { send_page_view: false });
    this.trackPageView(window.location.pathname + window.location.search);
  }

  trackPageView(path: string): void {
    if (!this.analyticsLoaded || path === this.lastTrackedPath) {
      return;
    }
    this.lastTrackedPath = path;
    this.gtagWindow().gtag('event', 'page_view', { page_path: path });
  }

  // dataLayer/gtag, gtag('js', ...) y el consentimiento por defecto se
  // establecen una sola vez, desde init(), antes de cualquier decisión del
  // usuario y antes de cargar ningún script de Ads/GA4.
  private ensureGtagBase(): void {
    const win = this.gtagWindow();
    win.dataLayer = win.dataLayer || [];
    win.gtag = win.gtag || function gtag(...args: unknown[]) {
      win.dataLayer.push(args);
    };

    win.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      wait_for_update: 500
    });
    win.gtag('js', new Date());
  }

  private injectGtagScript(id: string): void {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
  }

  private gtagWindow(): GtagWindow {
    return window as unknown as GtagWindow;
  }

  trackDiagnosticoIaFormConversion(): void {
    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    // Si el usuario no aceptó "marketing", gtag nunca se cargó: no hacer nada.
    if (typeof win.gtag !== 'function') {
      return;
    }
    win.gtag('event', 'conversion', {
      send_to: DIAGNOSTICO_IA_FORM_CONVERSION_LABEL,
      value: 1.0,
      currency: 'EUR'
    });
  }
}
