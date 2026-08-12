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
  private gtagBaseInitialized = false;

  init(): void {
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
      onFirstConsent: () => this.applyConsent(CookieConsent),
      onConsent: () => this.applyConsent(CookieConsent),
      onChange: () => this.applyConsent(CookieConsent)
    }).catch(err => console.error('[CookieConsent] run() failed:', err));
  }

  private applyConsent(CookieConsent: CookieConsentApi): void {
    if (CookieConsent.acceptedCategory('analytics' satisfies ConsentCategory)) {
      this.enableAnalytics();
    }

    if (CookieConsent.acceptedCategory('marketing' satisfies ConsentCategory)) {
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

    this.ensureGtagBase();
    this.injectGtagScript(GOOGLE_ADS_ID);
    this.gtagWindow().gtag('config', GOOGLE_ADS_ID);
  }

  private loadGa4Tag(): void {
    if (this.analyticsLoaded) {
      return;
    }
    this.analyticsLoaded = true;

    this.ensureGtagBase();
    this.injectGtagScript(GA4_MEASUREMENT_ID);
    this.gtagWindow().gtag('config', GA4_MEASUREMENT_ID);
  }

  // window.dataLayer/gtag y la llamada gtag('js', ...) se comparten entre
  // Ads y GA4: solo deben inicializarse una vez, sin importar qué categoría
  // se acepte primero.
  private ensureGtagBase(): void {
    const win = this.gtagWindow();
    win.dataLayer = win.dataLayer || [];
    win.gtag = win.gtag || function gtag(...args: unknown[]) {
      win.dataLayer.push(args);
    };

    if (!this.gtagBaseInitialized) {
      this.gtagBaseInitialized = true;
      win.gtag('js', new Date());
    }
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
