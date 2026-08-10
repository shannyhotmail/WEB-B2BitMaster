import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Datos SEO configurables por página
 */
export interface SeoData {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
}

const JSON_LD_SCRIPT_ID = 'seo-jsonld';

/**
 * Servicio SEO
 * Permite a cada página establecer su propio title, meta description y JSON-LD,
 * sobrescribiendo los valores estáticos definidos en index.html.
 */
@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);

  setSeo(data: SeoData): void {
    this.titleService.setTitle(data.title);
    this.metaService.updateTag({ name: 'description', content: data.description });
    this.metaService.updateTag({ property: 'og:title', content: data.title });
    this.metaService.updateTag({ property: 'og:description', content: data.description });

    if (data.jsonLd) {
      this.setJsonLd(data.jsonLd);
    }
  }

  private setJsonLd(jsonLd: Record<string, unknown>): void {
    let script = document.getElementById(JSON_LD_SCRIPT_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = JSON_LD_SCRIPT_ID;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }
}
