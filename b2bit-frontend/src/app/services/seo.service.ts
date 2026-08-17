import { Injectable, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  jsonLd?: object;
}

/**
 * Aplica title, meta description, Open Graph, canonical y JSON-LD por ruta.
 * Angular no ofrece esto por ruta de fábrica, así que cada página llama a
 * apply() en su ngOnInit con sus propios datos.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly baseUrl = 'https://b2bitmaster.com';

  private titleService = inject(Title);
  private meta = inject(Meta);
  private document = inject(DOCUMENT);
  private jsonLdScript: HTMLScriptElement | null = null;

  apply(config: SeoConfig): void {
    const url = `${this.baseUrl}${config.path}`;

    this.titleService.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });

    this.setCanonical(url);

    if (config.jsonLd) {
      this.setJsonLd(config.jsonLd);
    }
  }

  private setCanonical(url: string): void {
    let link = this.document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private setJsonLd(data: object): void {
    if (this.jsonLdScript) {
      this.jsonLdScript.remove();
    }
    this.jsonLdScript = this.document.createElement('script');
    this.jsonLdScript.type = 'application/ld+json';
    this.jsonLdScript.text = JSON.stringify(data);
    this.document.head.appendChild(this.jsonLdScript);
  }
}
