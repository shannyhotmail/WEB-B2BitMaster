import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { SeoService } from '../../../services/seo.service';
import { CookieConsentService } from '../../../services/cookie-consent.service';
import { CalendlyEmbedService } from '../../../services/calendly-embed.service';
import { environment } from '../../../../environments/environment';

const CALENDLY_URL = 'https://calendly.com/b2bitmaster-info/15min';

/**
 * Componente Optimiza Procesos (réplica de Diagnóstico IA)
 * Landing de campaña para el Diagnóstico Express de Preparación para IA (/optimizaprocesos)
 */
@Component({
  selector: 'app-optimizaprocesos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="diagnostico-ia">
      <!-- 1. HERO -->
      <section class="hero-section">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">Diagnóstico Express de Optimización Operativa</span>
            <h1>¿Cuánto le cuesta a su empresa seguir trabajando como hasta ahora?</h1>
            <p class="hero-subhead">
              Tareas manuales, herramientas a medias, información en pocas manos. En una sesión le mostramos dónde se
              pierde tiempo y dinero, y por dónde empezar a recuperarlo, con o sin IA.
            </p>
            <div class="hero-actions">
              <a href="#formulario" class="btn-primary" (click)="scrollToForm($event)">Solicitar Diagnóstico Express — 95€</a>
              <a [href]="calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-outline" (click)="trackAgendarLlamadaClick()">
                Prefiero agendar una llamada de 15 min
              </a>
            </div>
            <p class="hero-note">El coste del diagnóstico se descuenta al 100% si después contrata el Plan Estratégico.</p>
          </div>
          <div class="hero-stat-card">
            <span class="stat-label">Datos de clientes sin sistematizar</span>
            <span class="stat-number">33,9%</span>
            <p>Solo una de cada tres empresas españolas de 10 o más empleados usa un CRM.</p>
            <div class="stat-bars">
              <span class="stat-bar" style="height: 100%"></span>
              <span class="stat-bar" style="height: 78%"></span>
              <span class="stat-bar stat-bar--accent" style="height: 34%"></span>
            </div>
            <span class="stat-source">Fuente: INE, T1 2026</span>
          </div>
        </div>
      </section>

      <!-- 2. TRUST BAR -->
      <section class="trust-bar">
        <span class="trust-item"><span class="dot dot--red"></span>Opción "In situ" — si está ubicado en Valencia nos trasladamos a sus instalaciones</span>
        <span class="trust-item"><span class="dot dot--navy"></span>Personalización — No usamos recetas genéricas, le hacemos un "traje a medida"</span>
        <span class="trust-item"><span class="dot dot--gold"></span>Diagnóstico neutral — no vendemos ninguna herramienta ni software concreto</span>
      </section>

      <!-- 3. PROBLEMA -->
      <section class="problem-section">
        <h2>Los costes que no ve son los que más pesan</h2>
        <div class="card-grid card-grid--four">
          <div class="info-card info-card--red">
            <h4>Tareas manuales</h4>
            <p>Procesos que dependen de Excel, correos y copiar datos.</p>
          </div>
          <div class="info-card info-card--navy">
            <h4>Herramientas infrautilizadas</h4>
            <p>Se paga por licencias que casi nadie usa.</p>
          </div>
          <div class="info-card info-card--gold">
            <h4>Información en pocas manos</h4>
            <p>El conocimiento vive en dos o tres personas.</p>
          </div>
          <div class="info-card info-card--red">
            <h4>Decisiones sin datos</h4>
            <p>Ventas, clientes y mercado, sin métricas.</p>
          </div>
        </div>
        <p class="small-note">De media se usa solo la mitad de las licencias de software contratadas. Fuente: Zylo, 2024.</p>
      </section>

      <!-- 3b. IA -->
      <section class="ia-section">
        <h2>La IA rinde cuando se integra en lo que ya funciona</h2>
        <p class="ia-text">Por eso empezamos por ordenar lo que ya tiene y después decidimos dónde automatizar o aplicar IA suma de verdad.</p>
        <p class="problem-quote">"Meter IA donde antes había caos no elimina el caos. Lo acelera."</p>
        <p class="small-note">El 33,6% de las empresas españolas ya usa IA (INE, T1 2026), pero el 95% de las organizaciones no obtiene retorno medible de la IA generativa (MIT NANDA, 2025), entre otras causas por flujos de trabajo frágiles y poco alineados con la operación diaria.</p>
      </section>

      <div class="inline-cta">
        <a href="#formulario" class="btn-primary" (click)="scrollToForm($event)">Solicitar Diagnóstico Express</a>
      </div>

      <!-- 4. QUE ES EL DIAGNOSTICO -->
      <section class="diagnostic-section">
        <div class="section-inner">
          <h2>Una sesión, sin compromiso, con respuestas claras</h2>
          <div class="card-grid card-grid--two">
            <div class="info-card info-card--navy">
              <h4>Qué incluye</h4>
              <p>Una sesión, presencial o remota, para revisar sus procesos, herramientas, circulación de información y datos de ventas y clientes, con cifras concretas.</p>
            </div>
            <div class="info-card info-card--gold">
              <h4>Qué recibe</h4>
              <p>Un informe breve con los puntos donde más se pierde, priorizados, y cómo resolverlos: ordenar procesos, aprovechar lo que ya tiene, automatizar o usar IA. Sin presión.</p>
            </div>
          </div>
          <div class="honesty-note">
            <p>
              Puede que la IA no sea su prioridad. Se lo diremos igual: nuestro objetivo no es vender tecnología.
            </p>
          </div>
        </div>
      </section>

      <!-- 5. QUE PASA DESPUES -->
      <section class="process-section">
        <h2>Si decide seguir, así continúa el proceso</h2>
        <div class="process-steps">
          <div class="process-step">
            <div class="process-step-bar process-step-bar--red"></div>
            <div class="process-step-body">
              <span class="process-step-number process-step-number--red">01</span>
              <h4>Auditoría</h4>
              <p>Ya cubierta por el Diagnóstico Express.</p>
            </div>
          </div>
          <div class="process-step">
            <div class="process-step-bar process-step-bar--navy"></div>
            <div class="process-step-body">
              <span class="process-step-number process-step-number--navy">02</span>
              <h4>Plan Estratégico a Medida (PEM)</h4>
              <p>Hoja de ruta priorizada, con o sin IA según lo que su empresa realmente necesite.</p>
            </div>
          </div>
          <div class="process-step">
            <div class="process-step-bar process-step-bar--gold"></div>
            <div class="process-step-body">
              <span class="process-step-number process-step-number--gold">03</span>
              <h4>Implantación</h4>
              <p>Acompañamiento en la puesta en marcha, con garantía de resultados.</p>
            </div>
          </div>
        </div>
        <p class="process-reinforcement">
          El coste del Diagnóstico Express (95€) se descuenta íntegramente si contrata el Plan Estratégico. No paga dos veces.
        </p>
      </section>

      <!-- 6. POR QUE B2BITMASTER -->
      <section class="why-section">
        <div class="section-inner">
          <h2>Por qué b2bitmaster</h2>
          <div class="card-grid">
            <div class="info-card info-card--red">
              <h4>Neutralidad total</h4>
              <p>No vendemos herramientas de ningún proveedor.</p>
            </div>
            <div class="info-card info-card--navy">
              <h4>Partimos de lo que ya tiene</h4>
              <p>Integramos y aprovechamos sus sistemas antes de proponer nada nuevo.</p>
            </div>
            <div class="info-card info-card--gold">
              <h4>Sin promesas infladas</h4>
              <p>Nunca prometemos cifras de ROI exageradas.</p>
            </div>
          </div>
        </div>
      </section>

      <div class="inline-cta">
        <a href="#formulario" class="btn-primary" (click)="scrollToForm($event)">Solicitar Diagnóstico Express</a>
      </div>

      <!-- 7. CTA FINAL + FORM -->
      <section id="formulario" class="final-cta-section">
        <h2>Empecemos por entender su situación real</h2>
        <div class="final-cta-grid">
          <form class="diagnostic-form" [formGroup]="diagnosticForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Nombre completo *</label>
              <input type="text" id="name" formControlName="name" class="form-input" />
              <span class="error" *ngIf="diagnosticForm.get('name')?.invalid && diagnosticForm.get('name')?.touched">
                El nombre es requerido
              </span>
            </div>

            <div class="form-group">
              <label for="company">Empresa *</label>
              <input type="text" id="company" formControlName="company" class="form-input" />
              <span class="error" *ngIf="diagnosticForm.get('company')?.invalid && diagnosticForm.get('company')?.touched">
                La empresa es requerida
              </span>
            </div>

            <div class="form-group">
              <label for="email">Correo electrónico *</label>
              <input type="email" id="email" formControlName="email" class="form-input" />
              <span class="error" *ngIf="diagnosticForm.get('email')?.invalid && diagnosticForm.get('email')?.touched">
                Ingresa un correo válido
              </span>
            </div>

            <div class="form-group">
              <label for="phone">Teléfono</label>
              <input type="tel" id="phone" formControlName="phone" class="form-input" />
            </div>

            <div class="form-group">
              <label for="numeroEmpleados">Número aproximado de empleados</label>
              <select id="numeroEmpleados" formControlName="numeroEmpleados" class="form-input">
                <option *ngFor="let opcion of numeroEmpleadosOptions" [value]="opcion">{{ opcion }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="motivoContacto">¿Qué le trae por aquí?</label>
              <select id="motivoContacto" formControlName="motivoContacto" class="form-input">
                <option *ngFor="let opcion of motivoContactoOptions" [value]="opcion">{{ opcion }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="comentario">¿Algo más que quiera contarnos? (opcional)</label>
              <textarea id="comentario" formControlName="comentario" class="form-input" rows="3"></textarea>
            </div>

            <button type="submit" [disabled]="diagnosticForm.invalid || isSubmitting()" class="btn-submit">
              {{ isSubmitting() ? 'Enviando...' : 'Solicitar Diagnóstico Express' }}
            </button>

            <span class="form-sla">Le contactamos en menos de 24h laborables.</span>

            <div class="success-message" *ngIf="successMessage()">✓ {{ successMessage() }}</div>
            <div class="error-message" *ngIf="errorMessage()">✗ {{ errorMessage() }}</div>
          </form>

          <div class="call-panel">
            <h4>¿Prefiere hablar antes de decidir?</h4>
            <p>Agende una llamada breve, sin compromiso, antes de solicitar el diagnóstico.</p>
            <div *ngIf="calendlyEmbedEnabled" #calendlyHost class="calendly-host" [class.calendly-host--active]="calendlyWidgetActive()"></div>
            <a [href]="calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-outline btn-outline--block" (click)="trackAgendarLlamadaClick()">
              {{ calendlyWidgetActive() ? 'Prefiero abrirlo en una pestaña nueva' : 'Agendar llamada de 15 minutos, sin compromiso' }}
            </a>
          </div>
        </div>
      </section>

      <!-- 8. FAQ -->
      <section class="faq-section">
        <h2>Preguntas frecuentes</h2>
        <div class="faq-list">
          <details class="faq-item">
            <summary>¿Por qué cobran el diagnóstico si otros lo ofrecen gratis?</summary>
            <p>Preferimos ser honestas: un diagnóstico gratuito sin límites no es sostenible para una consultora pequeña, y termina siendo superficial. El coste simbólico de 95€ nos permite dedicarle el tiempo real que su empresa merece — y se descuenta al 100% si sigue adelante con el Plan Estratégico.</p>
          </details>
          <details class="faq-item">
            <summary>¿Necesito comprar herramientas nuevas o IA?</summary>
            <p>No necesariamente. Muchas veces el mayor retorno está en aprovechar mejor lo que ya tiene. Se lo diremos con claridad.</p>
          </details>
          <details class="faq-item">
            <summary>¿Tengo que comprometerme a contratar el Plan Estratégico después?</summary>
            <p>No. El diagnóstico es un servicio independiente. Si decide no continuar, no hay ninguna obligación.</p>
          </details>
          <details class="faq-item">
            <summary>¿Cuánto tiempo tardan en darme el resultado?</summary>
            <p>Recibirá el informe del diagnóstico en un máximo de una semana tras la sesión.</p>
          </details>
          <details class="faq-item">
            <summary>¿Trabajan fuera de Valencia?</summary>
            <p>Trabajamos con empresas de toda España. El diagnóstico es presencial en Valencia y su área metropolitana; fuera de Valencia lo realizamos en remoto y, según la valoración de cada caso, también podemos desplazarnos.</p>
          </details>
        </div>
      </section>

      <!-- 9. NOTA DE PIE DE PÁGINA (propia de esta landing) -->
      <p class="page-footer-note">
        ¿Ya tiene claro que su prioridad es una hoja de ruta estratégica, sin pasar primero por el diagnóstico?
        Conozca <a routerLink="/strategy">TAS — Transformación y Alineamiento Estratégico</a>.
      </p>
    </div>
  `,
  styleUrls: ['./optimizaprocesos.component.scss']
})
export class OptimizaProcesosComponent implements OnInit, AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private seoService = inject(SeoService);
  private cookieConsent = inject(CookieConsentService);
  private calendlyEmbed = inject(CalendlyEmbedService);

  @ViewChild('calendlyHost') private calendlyHost?: ElementRef<HTMLElement>;

  calendlyUrl = CALENDLY_URL;
  calendlyEmbedEnabled = environment.calendlyEmbedEnabled;
  calendlyWidgetActive = signal(false);
  private stopConsentWatch?: () => void;
  private unmountCalendly?: () => void;

  numeroEmpleadosOptions = ['1-5', '5-20', '20-50', 'más de 50'];
  motivoContactoOptions = [
    'Quiero reducir costes operativos',
    'Quiero aprovechar mejor las herramientas que ya tengo',
    'Sé que algo no funciona pero no sé qué',
    'Quiero explorar automatización o IA',
    'Otro'
  ];

  diagnosticForm: FormGroup;
  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor() {
    this.diagnosticForm = this.fb.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      numeroEmpleados: [this.numeroEmpleadosOptions[0]],
      motivoContacto: [this.motivoContactoOptions[0]],
      comentario: ['']
    });
  }

  ngOnInit(): void {
    this.seoService.apply({
      title: 'Diagnóstico de Optimización Operativa para su Empresa | b2bitmaster',
      description: 'Diagnóstico Express de Optimización Operativa para empresas de toda España: una sesión de 2 horas, 95€ (descontables del Plan Estratégico), con visita presencial en Valencia.',
      path: '/optimizaprocesos',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Diagnóstico Express de Optimización Operativa',
        provider: {
          '@type': 'LocalBusiness',
          name: 'b2bitmaster',
          areaServed: 'España'
        },
        description: 'Sesión de diagnóstico de 2 horas para identificar costes ocultos, aprovechar mejor las herramientas y decidir dónde automatizar o aplicar IA, para empresas de toda España, con visita presencial en Valencia.',
        offers: {
          '@type': 'Offer',
          price: '95',
          priceCurrency: 'EUR'
        }
      }
    });
  }

  // El widget solo se monta con consentimiento de Marketing; sin él (o si no
  // carga) el enlace externo sigue siendo la vía de reserva.
  ngAfterViewInit(): void {
    if (!this.calendlyEmbedEnabled) {
      return;
    }
    this.stopConsentWatch = this.cookieConsent.watchMarketingConsent(allowed => {
      if (allowed) {
        this.mountCalendly();
      } else {
        this.destroyCalendly();
      }
    });
  }

  ngOnDestroy(): void {
    this.stopConsentWatch?.();
    this.destroyCalendly();
  }

  private mountCalendly(): void {
    const host = this.calendlyHost?.nativeElement;
    if (this.unmountCalendly || !host) {
      return;
    }
    this.unmountCalendly = this.calendlyEmbed.mount(
      host,
      this.calendlyUrl,
      () => this.cookieConsent.trackAgendarLlamadaConfirmada(),
      ready => this.calendlyWidgetActive.set(ready)
    );
  }

  private destroyCalendly(): void {
    this.unmountCalendly?.();
    this.unmountCalendly = undefined;
  }

  scrollToForm(event: Event): void {
    event.preventDefault();
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  trackAgendarLlamadaClick(): void {
    this.cookieConsent.trackAgendarLlamadaClick();
  }

  onSubmit(): void {
    if (this.diagnosticForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const formValue = this.diagnosticForm.value;
    const comentario = (formValue.comentario || '').trim();
    const message = comentario
      ? `Solicitud de Diagnóstico Express desde /optimizaprocesos.\n\nComentario del usuario: ${comentario}`
      : 'Solicitud de Diagnóstico Express desde /optimizaprocesos.';

    this.contactService.sendContactMessage({
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone || undefined,
      company: formValue.company,
      subject: 'optimizaprocesos',
      message,
      numeroEmpleados: formValue.numeroEmpleados,
      motivoContacto: formValue.motivoContacto
    }).subscribe({
      next: () => {
        this.successMessage.set('¡Solicitud enviada! Le contactamos en menos de 24h laborables.');
        this.cookieConsent.trackDiagnosticoIaFormConversion();
        this.diagnosticForm.reset({
          numeroEmpleados: this.numeroEmpleadosOptions[0],
          motivoContacto: this.motivoContactoOptions[0]
        });
        this.isSubmitting.set(false);
        setTimeout(() => this.successMessage.set(''), 5000);
      },
      error: (err) => {
        console.error('Error al enviar solicitud de diagnóstico:', err);
        this.errorMessage.set('Ocurrió un error al enviar tu solicitud. Intenta de nuevo.');
        this.isSubmitting.set(false);
        setTimeout(() => this.errorMessage.set(''), 5000);
      }
    });
  }
}
