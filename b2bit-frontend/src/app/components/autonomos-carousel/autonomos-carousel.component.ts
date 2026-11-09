import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnDestroy, Output, QueryList, ViewChild, ViewChildren, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

// Milisegundos que se queda cada escena, ya colocada (la 4 no avanza)
const DWELL = [3000, 3500, 3500, 3500];
// Duración del deslizamiento entre escenas (debe coincidir con la transición del .scss)
const TRANS = 750;
// false: tras la última escena se queda ahí; true: vuelve a empezar
const LOOP: boolean = false;

const ESCENAS = [
  { video: 'assets/autonomosypymes/escena1.mp4', poster: 'assets/autonomosypymes/escena1.jpg', pre: '¿Te sientes abrumado por las tareas del día a día de tu negocio?', hi: '', post: '' },
  { video: 'assets/autonomosypymes/escena2.mp4', poster: 'assets/autonomosypymes/escena2.jpg', pre: 'Y cuando crees que ya has terminado, empieza el papeleo y los programas imposibles de entender.', hi: '', post: '' },
  { video: 'assets/autonomosypymes/escena3.mp4', poster: 'assets/autonomosypymes/escena3.jpg', pre: 'Dedica tu tiempo a lo que de verdad importa y pon la tecnología a trabajar para ti.', hi: '', post: '' },
  { video: 'assets/autonomosypymes/escena4.mp4', poster: 'assets/autonomosypymes/escena4.jpg', pre: '¡', hi: 'AUTOMATIZA', post: ' tu negocio ya y recupera tu vida!' }
];
const TEXTO_CTA = 'Quiero automatizar mi negocio';

/**
 * Carrusel inicial de /autonomosypymes: 4 escenas en vídeo que se deslizan solas.
 * El bucle de animación corre fuera de NgZone; todo cambio de estado visible
 * (escena, pausa) vuelve a entrar en la zona con inZone().
 */
@Component({
  selector: 'app-autonomos-carousel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="carousel"
      [class.is-paused]="paused()"
      role="region"
      aria-roledescription="carrusel"
      aria-label="Automatiza tu negocio"
      tabindex="0"
      (keydown)="onKeydown($event)">
      <div class="dots" role="group" aria-label="Escenas">
        <button
          *ngFor="let escena of escenas; let i = index"
          type="button"
          class="dot"
          [attr.aria-label]="'Ir a la escena ' + (i + 1) + ' de ' + escenas.length"
          [attr.aria-current]="current() === i ? 'true' : 'false'"
          (click)="onDot($event, i)"><span></span></button>
      </div>
      <button class="ctl prev" type="button" aria-label="Escena anterior" (click)="onStep($event, -1)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>
      </button>
      <button class="ctl next" type="button" aria-label="Escena siguiente" (click)="onStep($event, 1)">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
      </button>
      <div class="viewport" #viewport (click)="onViewportClick($event)">
        <div class="track" [style.transform]="'translateX(' + (-100 * current()) + '%)'" [class.no-anim]="reducedMotion">
          <article
            *ngFor="let escena of escenas; let i = index"
            class="slide"
            role="group"
            aria-roledescription="escena"
            [attr.aria-label]="'Escena ' + (i + 1) + ' de ' + escenas.length"
            [attr.aria-hidden]="current() === i ? 'false' : 'true'">
            <div class="media">
              <video #vid [muted]="true" [loop]="i === escenas.length - 1" playsinline preload="auto" [attr.poster]="escena.poster" [src]="escena.video" aria-hidden="true"></video>
              <span class="badge" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 4.5v15l12-7.5z"/></svg></span>
            </div>
            <div class="caption">
              <p>{{ escena.pre }}<em *ngIf="escena.hi">{{ escena.hi }}</em>{{ escena.post }}</p>
              <a *ngIf="i === escenas.length - 1" class="cta" href="#formulario" (click)="onCta($event)">{{ textoCta }}</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styleUrls: ['./autonomos-carousel.component.scss']
})
export class AutonomosCarouselComponent implements AfterViewInit, OnDestroy {
  private zone = inject(NgZone);

  @Output() ctaClick = new EventEmitter<Event>();
  @ViewChild('viewport') private viewport?: ElementRef<HTMLElement>;
  @ViewChildren('vid') private vids?: QueryList<ElementRef<HTMLVideoElement>>;

  escenas = ESCENAS;
  textoCta = TEXTO_CTA;
  current = signal(0);
  paused = signal(false);
  reducedMotion = false;

  private elapsed = 0;
  private last = 0;
  private ended = false;
  private raf = 0;
  private touchX: number | null = null;
  private timers = new Set<number>();
  private removeListeners: Array<() => void> = [];

  constructor() {
    try {
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch { /* sin matchMedia */ }
    this.paused.set(this.reducedMotion);
  }

  ngAfterViewInit(): void {
    const videos = this.videoList();
    videos.forEach(v => { v.muted = true; });

    // Listeners fuera de la zona (touchstart/touchend pasivos); los cambios de estado vuelven a entrar con inZone()
    this.zone.runOutsideAngular(() => {
      const vp = this.viewport?.nativeElement;
      if (vp) {
        const start = (e: TouchEvent) => { this.touchX = e.touches[0].clientX; };
        const end = (e: TouchEvent) => {
          if (this.touchX === null) { return; }
          const dx = e.changedTouches[0].clientX - this.touchX;
          this.touchX = null;
          if (Math.abs(dx) > 45) { this.go(dx < 0 ? this.current() + 1 : this.current() - 1); }
        };
        vp.addEventListener('touchstart', start, { passive: true });
        vp.addEventListener('touchend', end, { passive: true });
        this.removeListeners.push(() => {
          vp.removeEventListener('touchstart', start);
          vp.removeEventListener('touchend', end);
        });
      }
      const onVisibility = () => this.inZone(() => {
        if (document.hidden) {
          this.currentVideo()?.pause();
        } else {
          this.last = performance.now();
          this.playVideo(this.currentVideo());
        }
      });
      document.addEventListener('visibilitychange', onVisibility);
      this.removeListeners.push(() => document.removeEventListener('visibilitychange', onVisibility));

      this.last = performance.now();
      this.ensureLoop();
    });
    this.playVideo(this.currentVideo());
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
    this.timers.forEach(id => clearTimeout(id));
    this.timers.clear();
    this.removeListeners.forEach(fn => fn());
    this.removeListeners = [];
    this.videoList().forEach(v => v.pause());
  }

  onDot(event: Event, i: number): void {
    event.stopPropagation();
    this.go(i);
  }

  onStep(event: Event, delta: number): void {
    event.stopPropagation();
    this.go(this.current() + delta);
  }

  onCta(event: Event): void {
    event.stopPropagation();
    this.ctaClick.emit(event);
  }

  // Clic sobre la imagen: para el carrusel y los vídeos; otro clic reanuda
  onViewportClick(event: Event): void {
    if ((event.target as HTMLElement).closest('a, button')) { return; }
    this.setPaused(!this.paused());
  }

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.go(this.current() - 1);
    } else if (event.key === 'ArrowRight') {
      this.go(this.current() + 1);
    } else if (event.key === ' ' && event.target === event.currentTarget) {
      event.preventDefault();
      this.setPaused(!this.paused());
    }
  }

  private go(i: number): void {
    this.inZone(() => {
      const prev = this.current();
      const total = this.escenas.length;
      const next = LOOP && i >= total ? 0 : Math.max(0, Math.min(total - 1, i));
      this.current.set(next);
      // El tiempo de permanencia empieza cuando termina el deslizamiento
      this.elapsed = next === prev || this.reducedMotion ? 0 : -TRANS;
      this.ended = false;
      this.last = performance.now();
      if (next !== prev) {
        const videos = this.videoList();
        videos[next].currentTime = 0;
        this.playVideo(videos[next]);
        const id = window.setTimeout(() => {
          this.timers.delete(id);
          if (this.current() !== prev) { videos[prev].pause(); }
        }, this.reducedMotion ? 0 : TRANS + 80);
        this.timers.add(id);
      }
      this.ensureLoop();
    });
  }

  private setPaused(value: boolean): void {
    this.inZone(() => {
      this.paused.set(value);
      if (value) {
        this.videoList().forEach(v => v.pause());
      } else {
        this.last = performance.now();
        this.playVideo(this.currentVideo());
        this.ensureLoop();
      }
    });
  }

  private ensureLoop(): void {
    if (this.raf) { return; }
    this.zone.runOutsideAngular(() => {
      this.raf = requestAnimationFrame(this.tick);
    });
  }

  private tick = (now: number): void => {
    this.raf = 0;
    const dt = now - this.last;
    this.last = now;
    if (!this.paused() && !document.hidden && !this.ended) {
      this.elapsed += Math.min(dt, 100);
      const cur = this.current();
      if (this.elapsed >= DWELL[cur]) {
        if (cur < this.escenas.length - 1) {
          this.go(cur + 1);
        } else if (LOOP) {
          this.go(0);
        } else {
          this.elapsed = DWELL[cur];
          this.ended = true;
        }
      }
    }
    // Cuando ya no hay nada que avanzar el bucle se detiene; go() y reanudar lo reactivan
    if (!this.paused() && !this.ended) {
      this.raf = requestAnimationFrame(this.tick);
    }
  };

  private inZone(fn: () => void): void {
    if (NgZone.isInAngularZone()) {
      fn();
    } else {
      this.zone.run(fn);
    }
  }

  private videoList(): HTMLVideoElement[] {
    return this.vids ? this.vids.map(ref => ref.nativeElement) : [];
  }

  private currentVideo(): HTMLVideoElement | undefined {
    return this.videoList()[this.current()];
  }

  private playVideo(video?: HTMLVideoElement): void {
    if (!video || this.paused()) { return; }
    const p = video.play();
    if (p && p.catch) { p.catch(() => { /* autoplay bloqueado: el usuario puede pulsar la imagen */ }); }
  }
}
