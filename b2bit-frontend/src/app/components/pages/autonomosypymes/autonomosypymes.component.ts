import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { SeoService } from '../../../services/seo.service';
import { CookieConsentService } from '../../../services/cookie-consent.service';
import { CalendlyEmbedService } from '../../../services/calendly-embed.service';
import { AutonomosCarouselComponent } from '../../autonomos-carousel/autonomos-carousel.component';
import { AutonomosTarjetasComponent } from '../../autonomos-soluciones/autonomos-tarjetas.component';
import { AutonomosSolucionesComponent } from '../../autonomos-soluciones/autonomos-soluciones.component';
import { AutonomosSolucionesState } from '../../autonomos-soluciones/autonomos-soluciones.state';
import { AutonomosCierreComponent } from '../../autonomos-cierre/autonomos-cierre.component';
import { environment } from '../../../../environments/environment';

const CALENDLY_URL = 'https://calendly.com/b2bitmaster-info/15min';

// TEXTOS PROVISIONALES: idénticos a /optimizaprocesos hasta que se definan los de esta landing.
// Los textos del carrusel están en autonomos-carousel.component.ts.
const TEXTOS = {
  formTitulo: 'Empecemos por entender su situación real',
  labelNombre: 'Nombre completo *',
  errorNombre: 'El nombre es requerido',
  labelEmpresa: 'Empresa *',
  errorEmpresa: 'La empresa es requerida',
  labelEmail: 'Correo electrónico *',
  errorEmail: 'Ingresa un correo válido',
  labelTelefono: 'Teléfono',
  labelEmpleados: 'Número aproximado de empleados',
  labelMotivo: '¿Qué le preocupa o qué necesita mejorar?',
  labelComentario: '¿Algo más que quiera contarnos? (opcional)',
  botonEnviar: 'Solicitar Diagnóstico Express',
  botonEnviando: 'Enviando...',
  sla: 'Le contactamos en menos de 24h laborables.',
  panelTitulo: '¿Prefiere hablar antes de decidir?',
  panelTexto: 'Agende una llamada breve, sin compromiso, antes de solicitar el diagnóstico.',
  calendlyAgendar: 'Agendar llamada de 15 minutos, sin compromiso',
  calendlyAbrirPestana: 'Prefiero abrirlo en una pestaña nueva',
  mensajeExito: '¡Solicitud enviada! Le contactamos en menos de 24h laborables.',
  mensajeError: 'Ocurrió un error al enviar tu solicitud. Intenta de nuevo.',
  numeroEmpleadosOptions: ['1-5', '5-20', '20-50', 'más de 50'],
  motivoContactoOptions: [
    'Quiero reducir costes operativos',
    'Quiero aprovechar mejor las herramientas que ya tengo',
    'Sé que algo no funciona pero no sé qué',
    'Quiero explorar automatización o IA',
    'Otro'
  ]
};

/**
 * Componente Autónomos y Pymes (réplica de /optimizaprocesos en comportamiento)
 * Landing de campaña (/autonomosypymes): carrusel inicial + formulario y Calendly.
 */
@Component({
  selector: 'app-autonomosypymes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AutonomosCarouselComponent, AutonomosTarjetasComponent, AutonomosSolucionesComponent, AutonomosCierreComponent],
  providers: [AutonomosSolucionesState],
  template: `
    <div class="diagnostico-ia">
      <!-- 0. PRESENTACIÓN (único h1 de la página) -->
      <section class="intro" aria-labelledby="intro-h">
        <p class="eyebrow">Para autónomos y pymes</p>
        <h1 id="intro-h">Menos gestión, <em>más operación</em></h1>
        <p class="sub">Automatiza lo repetitivo y dedica tu tiempo a lo que hace crecer tu negocio.</p>
      </section>

      <!-- 1. CARRUSEL -->
      <app-autonomos-carousel (ctaClick)="scrollToForm($event)"></app-autonomos-carousel>

      <!-- 2. TARJETAS GRANDES -->
      <app-autonomos-tarjetas></app-autonomos-tarjetas>

      <!-- FORMULARIO + CALENDLY -->
      <section id="formulario" class="final-cta-section">
        <h2>{{ textos.formTitulo }}</h2>
        <div class="final-cta-grid">
          <form class="diagnostic-form" [formGroup]="diagnosticForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">{{ textos.labelNombre }}</label>
              <input type="text" id="name" formControlName="name" class="form-input" />
              <span class="error" *ngIf="diagnosticForm.get('name')?.invalid && diagnosticForm.get('name')?.touched">
                {{ textos.errorNombre }}
              </span>
            </div>

            <div class="form-group">
              <label for="company">{{ textos.labelEmpresa }}</label>
              <input type="text" id="company" formControlName="company" class="form-input" />
              <span class="error" *ngIf="diagnosticForm.get('company')?.invalid && diagnosticForm.get('company')?.touched">
                {{ textos.errorEmpresa }}
              </span>
            </div>

            <div class="form-group">
              <label for="email">{{ textos.labelEmail }}</label>
              <input type="email" id="email" formControlName="email" class="form-input" />
              <span class="error" *ngIf="diagnosticForm.get('email')?.invalid && diagnosticForm.get('email')?.touched">
                {{ textos.errorEmail }}
              </span>
            </div>

            <div class="form-group">
              <label for="phone">{{ textos.labelTelefono }}</label>
              <input type="tel" id="phone" formControlName="phone" class="form-input" />
            </div>

            <div class="form-group">
              <label for="numeroEmpleados">{{ textos.labelEmpleados }}</label>
              <select id="numeroEmpleados" formControlName="numeroEmpleados" class="form-input">
                <option *ngFor="let opcion of textos.numeroEmpleadosOptions" [value]="opcion">{{ opcion }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="motivoContacto">{{ textos.labelMotivo }}</label>
              <select id="motivoContacto" formControlName="motivoContacto" class="form-input">
                <option *ngFor="let opcion of textos.motivoContactoOptions" [value]="opcion">{{ opcion }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="comentario">{{ textos.labelComentario }}</label>
              <textarea id="comentario" formControlName="comentario" class="form-input" rows="3"></textarea>
            </div>

            <button type="submit" [disabled]="diagnosticForm.invalid || isSubmitting()" class="btn-submit">
              {{ isSubmitting() ? textos.botonEnviando : textos.botonEnviar }}
            </button>

            <span class="form-sla">{{ textos.sla }}</span>

            <div class="success-message" *ngIf="successMessage()">✓ {{ successMessage() }}</div>
            <div class="error-message" *ngIf="errorMessage()">✗ {{ errorMessage() }}</div>
          </form>

          <div class="call-panel">
            <h4>{{ textos.panelTitulo }}</h4>
            <p>{{ textos.panelTexto }}</p>
            <div *ngIf="calendlyEmbedEnabled" #calendlyHost class="calendly-host" [class.calendly-host--active]="calendlyWidgetActive()"></div>
            <a [href]="calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-outline btn-outline--block" (click)="trackAgendarLlamadaClick()">
              {{ calendlyWidgetActive() ? textos.calendlyAbrirPestana : textos.calendlyAgendar }}
            </a>
          </div>
        </div>
      </section>

      <!-- 3. ZONA DE SOLUCIONES -->
      <app-autonomos-soluciones></app-autonomos-soluciones>

      <!-- 4. CIERRE -->
      <app-autonomos-cierre></app-autonomos-cierre>
    </div>
  `,
  styleUrls: ['./autonomosypymes.component.scss']
})
export class AutonomosYPymesComponent implements OnInit, AfterViewInit, OnDestroy {
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

  textos = TEXTOS;

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
      numeroEmpleados: [TEXTOS.numeroEmpleadosOptions[0]],
      motivoContacto: [TEXTOS.motivoContactoOptions[0]],
      comentario: ['']
    });
  }

  ngOnInit(): void {
    // Título y descripción provisionales
    this.seoService.apply({
      title: 'Automatiza tu negocio: diagnóstico para autónomos y pymes | b2bitmaster',
      description: 'Sesión de diagnóstico para autónomos y pymes que quieren ahorrar tiempo en tareas y papeleo y automatizar su negocio. Solicítela o agende una llamada.',
      path: '/autonomosypymes'
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
      ? `Solicitud de Diagnóstico Express desde /autonomosypymes.\n\nComentario del usuario: ${comentario}`
      : 'Solicitud de Diagnóstico Express desde /autonomosypymes.';

    this.contactService.sendContactMessage({
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone || undefined,
      company: formValue.company,
      subject: 'autonomosypymes',
      message,
      numeroEmpleados: formValue.numeroEmpleados,
      motivoContacto: formValue.motivoContacto
    }).subscribe({
      next: () => {
        this.successMessage.set(TEXTOS.mensajeExito);
        this.cookieConsent.trackDiagnosticoIaFormConversion();
        this.diagnosticForm.reset({
          numeroEmpleados: TEXTOS.numeroEmpleadosOptions[0],
          motivoContacto: TEXTOS.motivoContactoOptions[0]
        });
        this.isSubmitting.set(false);
        setTimeout(() => this.successMessage.set(''), 5000);
      },
      error: (err) => {
        console.error('Error al enviar solicitud de diagnóstico:', err);
        this.errorMessage.set(TEXTOS.mensajeError);
        this.isSubmitting.set(false);
        setTimeout(() => this.errorMessage.set(''), 5000);
      }
    });
  }
}
