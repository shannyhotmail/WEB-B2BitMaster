import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ContactService } from '../../../services/contact.service';
import { SeoService } from '../../../services/seo.service';
import { CookieConsentService } from '../../../services/cookie-consent.service';

const CALENDLY_URL = 'https://calendly.com/b2bitmaster-info/15min';

/**
 * Componente Diagnóstico IA
 * Landing de campaña para el Diagnóstico Express de Preparación para IA (/diagnostico-ia)
 */
@Component({
  selector: 'app-diagnostico-ia',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="diagnostico-ia">
      <!-- 1. HERO -->
      <section class="hero-section">
        <div class="hero-grid">
          <div class="hero-copy">
            <span class="eyebrow">Diagnóstico Express de Preparación para IA</span>
            <h1>¿Su empresa necesita Inteligencia Artificial, o necesita antes poner en orden sus procesos?</h1>
            <p class="hero-subhead">
              Solo el 23% de las iniciativas de IA en empresas españolas logra el retorno esperado (IT User, 2025).
              La diferencia no está en la tecnología — está en el diagnóstico previo. Antes de invertir en IA, sepa
              con certeza qué necesita realmente su empresa.
            </p>
            <div class="hero-actions">
              <a href="#formulario" class="btn-primary" (click)="scrollToForm($event)">Solicitar Diagnóstico Express — 95€</a>
              <a [href]="calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-outline">
                Prefiero agendar una llamada de 15 min
              </a>
            </div>
            <p class="hero-note">El coste del diagnóstico se descuenta al 100% si después contrata el Plan Estratégico.</p>
          </div>
          <div class="hero-stat-card">
            <span class="stat-label">Retorno real de la IA en España</span>
            <span class="stat-number">23%</span>
            <p>de las iniciativas de IA logran el retorno esperado. El resto se pierde por falta de diagnóstico previo.</p>
            <div class="stat-bars">
              <span class="stat-bar" style="height: 100%"></span>
              <span class="stat-bar" style="height: 78%"></span>
              <span class="stat-bar stat-bar--accent" style="height: 23%"></span>
            </div>
            <span class="stat-source">Fuente: IT User, 2025</span>
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
        <h2>La IA está de moda. La adopción real, no tanto.</h2>
        <div class="problem-grid">
          <p>
            El 21,1% de las empresas españolas de 10+ empleados ya usa IA (frente al 12,4% en 2023) — casi el doble
            en solo dos años (INE). Pero de las que la usan, el 60% sigue en fase experimental o piloto (Banco de
            España, EBAE Q4 2024), y el motivo más común para adoptarla no es "automatizar algo nuevo": es optimizar
            procesos que <strong>ya estaban automatizados</strong> y no funcionaban bien.
          </p>
          <div class="problem-donut-wrap">
            <div class="problem-donut">
              <div class="problem-donut-inner">60%</div>
            </div>
            <span class="problem-donut-label">sigue en fase experimental o piloto</span>
          </div>
        </div>
        <p class="problem-quote">"Meter IA donde antes había caos no elimina el caos. Lo acelera."</p>
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
              <p>Una sesión especializada, presencial o remota para la revisión de sus procesos actuales, herramientas en uso, y los puntos donde probablemente esté perdiendo tiempo o dinero — traducido a cifras concretas, no en jerga técnica.</p>
            </div>
            <div class="info-card info-card--gold">
              <h4>Qué recibe</h4>
              <p>Un informe breve con el diagnóstico de su situación real: si su prioridad es IA, es ordenar procesos primero, o ambas cosas — sin presión para contratar nada más.</p>
            </div>
          </div>
          <div class="honesty-note">
            <p>
              Puede que el diagnóstico concluya que la IA no es su prioridad ahora mismo. Se lo diremos igual.
              Nuestro objetivo no es vender tecnología — es que usted tome la decisión correcta con información real.
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
              <h4>Soberanía Tecnológica</h4>
              <p>Usted recupera el criterio para decidir su propia transformación, sin depender de lo que le diga su proveedor de turno.</p>
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
            <a [href]="calendlyUrl" target="_blank" rel="noopener noreferrer" class="btn-outline btn-outline--block">
              Agendar llamada de 15 minutos, sin compromiso
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
            <summary>¿Y si el diagnóstico dice que no necesito IA?</summary>
            <p>Se lo diremos con la misma claridad. El objetivo del diagnóstico es que usted tenga información real, no que le vendamos algo que no necesita.</p>
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
            <p>Nuestro enfoque actual es presencial en Valencia y su área metropolitana, aunque también podemos trabajar de forma remota si su empresa está fuera de esta zona.</p>
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
  styleUrls: ['./diagnostico-ia.component.scss']
})
export class DiagnosticoIaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private seoService = inject(SeoService);
  private cookieConsent = inject(CookieConsentService);

  calendlyUrl = CALENDLY_URL;

  numeroEmpleadosOptions = ['1-5', '5-20', '20-50', 'más de 50'];
  motivoContactoOptions = [
    'Quiero explorar IA',
    'Sé que algo no funciona bien pero no sé qué',
    'Quiero optimizar procesos ya existentes',
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
      motivoContacto: [this.motivoContactoOptions[0]]
    });
  }

  ngOnInit(): void {
    this.seoService.apply({
      title: 'Diagnóstico de Preparación para IA en su Empresa | b2bitmaster Valencia',
      description: 'Diagnóstico Express de Preparación para IA en Valencia. Una sesión de 2 horas, 95€ (descontables del Plan Estratégico), para saber si su empresa necesita IA o antes ordenar sus procesos.',
      path: '/diagnostico-ia',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'Diagnóstico Express de Preparación para IA',
        provider: {
          '@type': 'LocalBusiness',
          name: 'b2bitmaster',
          areaServed: 'Valencia, España'
        },
        description: 'Sesión de diagnóstico de 2 horas sobre preparación de procesos y adopción de IA para empresas de Valencia y su área metropolitana.',
        offers: {
          '@type': 'Offer',
          price: '95',
          priceCurrency: 'EUR'
        }
      }
    });
  }

  scrollToForm(event: Event): void {
    event.preventDefault();
    document.getElementById('formulario')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  onSubmit(): void {
    if (this.diagnosticForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const formValue = this.diagnosticForm.value;
    this.contactService.sendContactMessage({
      name: formValue.name,
      email: formValue.email,
      phone: formValue.phone || undefined,
      company: formValue.company,
      subject: 'diagnostico-ia',
      message: 'Solicitud de Diagnóstico Express desde /diagnostico-ia.',
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
