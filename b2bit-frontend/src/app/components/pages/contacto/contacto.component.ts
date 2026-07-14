import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../../services/contact.service';
import { SeoService } from '../../../services/seo.service';

/**
 * Componente Contacto
 * Página de contacto con formulario reactivo
 */
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="page">
      <section class="page-hero">
        <a routerLink="/home" class="back-link">← Volver al inicio</a>
        <span class="eyebrow">Diagnóstico inicial sin compromiso</span>
        <h1>Contáctenos</h1>
        <p class="lead">
          Ya sea que necesite blindar su cartera de clientes como Partner o Proveedor, o que busque exprimir cada gota de valor de su software de empresa, el primer paso es un diagnóstico claro. Cuéntenos su situación y diseñaremos la estrategia de adopción que su negocio necesita.
        </p>
      </section>

      <div class="contact-wrapper">
        <section class="contact-form-section">
          <h2>Envíanos un Mensaje</h2>
          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
            <div class="form-group">
              <label for="name">Nombre Completo *</label>
              <input
                type="text"
                id="name"
                formControlName="name"
                placeholder="Tu nombre"
                class="form-input"
              />
              <span class="error" *ngIf="contactForm.get('name')?.invalid && contactForm.get('name')?.touched">
                El nombre es requerido
              </span>
            </div>

            <div class="form-group">
              <label for="email">Correo Electrónico *</label>
              <input
                type="email"
                id="email"
                formControlName="email"
                placeholder="tu@email.com"
                class="form-input"
              />
              <span class="error" *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched">
                Ingresa un correo válido
              </span>
            </div>

            <div class="form-group">
              <label for="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                formControlName="phone"
                placeholder="+1 (123) 456-7890"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="company">Empresa</label>
              <input
                type="text"
                id="company"
                formControlName="company"
                placeholder="Nombre de tu empresa"
                class="form-input"
              />
            </div>

            <div class="form-group">
              <label for="subject">¿Con cuál escenario te identificas? *</label>
              <select id="subject" formControlName="subject" class="form-input">
                <option value="">Selecciona una opción</option>
                <option value="partner">Soy un Partner o Proveedor de soluciones IT y necesito detectar nuevas oportunidades de negocio en mis clientes actuales.</option>
                <option value="empresa">Soy una Empresa y siento que mi equipo está subutilizando el software que pagamos.</option>
                <option value="auditoria">Necesito una Auditoría de Adopción para entender dónde están mis cuellos de botella.</option>
                <option value="otro">Otro</option>
              </select>
              <span class="error" *ngIf="contactForm.get('subject')?.invalid && contactForm.get('subject')?.touched">
                Selecciona una opción
              </span>
            </div>

            <div class="form-group">
              <label for="message">Cuéntenos su caso. Un consultor experto analizará su situación y le contactará *</label>
              <textarea
                id="message"
                formControlName="message"
                placeholder="Cuéntanos sobre tu proyecto..."
                class="form-textarea"
                rows="6"
              ></textarea>
              <span class="error" *ngIf="contactForm.get('message')?.invalid && contactForm.get('message')?.touched">
                El mensaje es requerido
              </span>
            </div>

            <button
              type="submit"
              [disabled]="contactForm.invalid || isSubmitting()"
              class="btn-primary btn-submit"
            >
              {{ isSubmitting() ? 'Enviando...' : 'Enviar Mensaje' }}
            </button>

            <div class="success-message" *ngIf="successMessage()">
              ✓ {{ successMessage() }}
            </div>

            <div class="error-message" *ngIf="errorMessage()">
              ✗ {{ errorMessage() }}
            </div>
          </form>
        </section>

        <section class="contact-info-section">
          <h2>Información de Contacto</h2>

          <div class="info-item">
            <h3>Correo Electrónico</h3>
            <p>
              <a href="mailto:info&#64;b2bitmaster.com">info&#64;b2bitmaster.com</a>
            </p>
          </div>

          <div class="info-item">
            <h3>Teléfono</h3>
            <p>
              <a href="tel:+34960730151">+34 (960) 730-151</a>
            </p>
          </div>

          <div class="info-item">
            <h3>¿No sabe por dónde empezar?</h3>
            <p class="info-links">
              <a routerLink="/intelligence">Vea Tech Adoption Intelligence (TAI)</a>
              <a routerLink="/strategy">Vea Tech Adoption Strategy (TAS)</a>
            </p>
          </div>
        </section>
      </div>
    </div>
  `,
  styleUrls: ['./contacto.component.scss']
})
export class ContactoComponent implements OnInit {
  private fb = inject(FormBuilder);
  private contactService = inject(ContactService);
  private seo = inject(SeoService);

  contactForm: FormGroup;
  isSubmitting = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.seo.apply({
      title: 'Contacto | b2bitmaster',
      description: 'Hable con b2bitmaster sobre Tech Adoption Intelligence (TAI) o Tech Adoption Strategy (TAS). Diagnóstico inicial sin compromiso.',
      path: '/contacto'
    });
  }

  /**
   * Maneja el envío del formulario de contacto
   */
  onSubmit(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.isSubmitting.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    this.contactService.sendContactMessage(this.contactForm.value).subscribe({
      next: () => {
        this.successMessage.set('¡Tu mensaje ha sido enviado exitosamente! Te contactaremos pronto.');
        this.contactForm.reset();
        this.isSubmitting.set(false);
        setTimeout(() => this.successMessage.set(''), 5000);
      },
      error: (err) => {
        console.error('Error al enviar mensaje:', err);
        this.errorMessage.set('Ocurrió un error al enviar tu mensaje. Intenta de nuevo.');
        this.isSubmitting.set(false);
        setTimeout(() => this.errorMessage.set(''), 5000);
      }
    });
  }
}
