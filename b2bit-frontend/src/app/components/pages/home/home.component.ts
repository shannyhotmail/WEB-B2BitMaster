import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Componente Home
 * Página de inicio de la aplicación
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">

      <!-- Sección 1: Hero con imagen de fondo y 3 textos -->
      <section class="hero-section">
        <div class="hero-overlay">
          <p class="hero-subtitle">De la implantación de software a la Maestría de Negocio</p>
          <h1 class="hero-title">Master for Business to Business</h1>
          <p class="hero-italic">Transformamos el servicio post-venta en inteligencia de negocio para maximizar el ROI tecnológico y reactivar el pipeline de ventas</p>
        </div>
      </section>

      <!-- Sección 2 -->
      <section class="section">
        <div class="section-title-box half-height">
          <h2>Abismo Post-Implantación…</h2>
        </div>
        <div class="section-2-grid">
          <div class="image-card yellow-shadow">
            <img src="assets/Perdida cliente.jpg" alt="Pérdida cliente">
          </div>

          <div class="section-text centered-text">
            <p>Muchas empresas creen que el éxito termina cuando el software se instala.</p>
            <p>La realidad es más cruda e incómoda: tras las implantaciones las herramientas de software terminan siendo <span class="yellow-highlight">lastres tecnológicos</span> y comienza un <span class="yellow-highlight">Abismo Post-Implantación</span>: un espacio vacío donde el Partner pierde el contacto estratégico y el cliente final empieza a ver la factura del software como un gasto que debe recortar, en lugar de una herramienta que le hace ganar dinero.</p>
          </div>

          <div class="image-card yellow-shadow">
            <img src="assets/Problema cliente 2.jpg" alt="Problema cliente 2">
          </div>
        </div>
        <p class="section-final-red">Sin una estrategia de adopción, el software no es una inversión; es un coste hundido.</p>
      </section>

      <!-- Sección 3 -->
      <section class="section">
        <div class="section-title-box half-height">
          <h2>¿Quiénes Somos?</h2>
        </div>
        <div class="section-text blue-justified">
          <p>Somos un equipo de técnicos y pedagogos, con amplia experiencia en empresas tanto proveedoras como clientes de soluciones de software, que hemos experimentado las graves consecuencias y el <span class="red-highlight italic">impacto financiero que conlleva la incorrecta o insuficiente adopción de la tecnología</span> en el mundo empresarial. Hemos llegado al fondo del problema y hemos diseñado una solución no sólo que de respuesta al problema en sí, sino que además se traduzca en una herramienta de negocio para las empresas.</p>

          <div class="image-card yellow-shadow section-inline-image">
            <img src="assets/Costo Beneficio 2.jpg" alt="Costo Beneficio 2">
          </div>

          <p>En B2B IT Master, ofrecemos un servicio post-venta donde no solo aumentamos la <span class="red-highlight italic">“usabilidad”</span> de las herramientas; sino que, generamos un <span class="red-highlight italic">modelo circular de generación de negocio</span> y la <span class="red-highlight italic">maximización del ROI</span> de la adquisición de soluciones de software; cerrando la brecha entre la adopción de la tecnología y el rendimiento financiero.</p>
          <p>Actuamos en el "Abismo", ese punto crítico donde la falta de adopción se convierte en pérdida de dinero y dependencia operativa y evolutiva para las empresas cliente y, adicionalmente, estancamiento del pipeline para los proveedores.</p>
        </div>
      </section>

      <!-- Sección 4 -->
      <section class="section">
        <div class="section-title-box half-height yellow-subtitle">
          <h2>Nuestra misión</h2>
          <p class="subtitle-yellow">Nuestra misión en doble</p>
        </div>

        <div class="flip-section flip-section-4">
          <div class="flip-grid two-col">
            <div class="flip-card-container">
              <div class="flip-card">
                <div class="flip-card-inner" [class.flipped]="flip4[0]">
                  <div class="flip-card-face flip-card-front">
                    <img class="card-icon" src="assets/Grafico icono.png" alt="Grafico icono">
                    <span class="card-title">GENERACIÓN DE NEGOCIO PARA PROVEEDORES DE SOFTWARE</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(4,0)">Ver más</button>
                  </div>
                  <div class="flip-card-face flip-card-back">
                    <span>Asegurar que los proveedores de IT recuperen el control estratégico de sus cuentas, activen su Up-selling y Cross-selling de forma recurrente con datos, no con suposiciones, fidelizando sus clientes y pasando de ser un proveedor a un aliado de negocio. Para ello hemos diseñado la solución TECH ADOPTION INTELLIGENCE (TAI)</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(4,0)">Cerrar</button>
                  </div>
                </div>
              </div>
              <div class="card-action"><button class="btn-primary" (click)="navigateTo('/intelligence')">Conocer sobre TAI</button></div>
            </div>

            <div class="flip-card-container">
              <div class="flip-card">
                <div class="flip-card-inner" [class.flipped]="flip4[1]">
                  <div class="flip-card-face flip-card-front">
                    <img class="card-icon" src="assets/Lista icono.png" alt="Lista icono">
                    <span class="card-title">CONSULTORIA/AUTONOMÍA PARA CLIENTES DE SOFTWARE</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(4,1)">Ver más</button>
                  </div>
                  <div class="flip-card-face flip-card-back">
                    <span>Garantizar que las empresas cliente conviertan su software en un activo de alto rendimiento y sean autónomos en el camino de mejora continua mediante el dominio estratégico de su plataforma tecnológica. Para ello hemos diseñado la solución TECH ADOPTION STRATEGY (TAS)</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(4,1)">Cerrar</button>
                  </div>
                </div>
              </div>
              <div class="card-action"><button class="btn-primary" (click)="navigateTo('/strategy')">Conocer sobre TAS</button></div>
            </div>
          </div>

          <p class="closing-quote section4-quote">“La tecnología no falla por su código, sino por su adopción”</p>
        </div>
      </section>

      <!-- Sección 5 -->
      <section class="section">
        <div class="section-title-box half-height">
          <h2>Por qué confiar en B2B IT Master</h2>
        </div>

        <div class="section-text">
          <p>Muchas organizaciones intentan gestionar la adopción de forma interna, pero se encuentran con un <span class="red-highlight italic">muro invisible</span>, en B2BitMaster tenemos las herramientas para traspasar ese muro: <span class="red-highlight italic">"Utilizamos la capacitación técnica como un "Caballo de Troya"</span> para entrar en la operativa, detectar fricciones ocultas, oportunidades de negocio que están ocultas bajo la frustración del usuario, y las transformarlas en oportunidades de crecimiento y eficiencia”. Destinamos el servicio posventa y la capacitación como un <span class="red-highlight italic">sensor avanzado de Business Intelligence</span>.</p>

          <p class="big-bridge">Somos el puente que reconecta el potencial del software con los objetivos financieros de la organización</p>
        </div>

        <div class="image-card yellow-shadow section-inline-image">
          <img src="assets/Cliente satisfecho.jpg" alt="Cliente satisfecho">
        </div>

        <div class="flip-section flip-section-5">
          <div class="flip-grid">
            <div class="flip-card-container">
              <div class="flip-card">
                <div class="flip-card-inner" [class.flipped]="flip5[0]">
                  <div class="flip-card-face flip-card-front">
                    <img class="card-icon" src="assets/Ojo ciego icono.png" alt="Ojo ciego icono">
                    <span class="card-title">El "Sesgo del Constructor"</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(5,0)">Ver más</button>
                  </div>
                  <div class="flip-card-face flip-card-back">
                    <span>Un Partner o un departamento interno de IT no puede auditar su propio trabajo con objetividad.</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(5,0)">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flip-card-container">
              <div class="flip-card">
                <div class="flip-card-inner" [class.flipped]="flip5[1]">
                  <div class="flip-card-face flip-card-front">
                    <img class="card-icon" src="assets/Fricción icono.png" alt="Fricción icono">
                    <span class="card-title">Nosotros detectamos fricciones</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(5,1)">Ver más</button>
                  </div>
                  <div class="flip-card-face flip-card-back">
                    <span>Nosotros detectamos fricciones que los usuarios no se atreven a contar al "dueño" del sistema.</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(5,1)">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="flip-card-container">
              <div class="flip-card">
                <div class="flip-card-inner" [class.flipped]="flip5[2]">
                  <div class="flip-card-face flip-card-front">
                    <img class="card-icon" src="assets/Cerebro icono.png" alt="Cerebro icono">
                    <span class="card-title">Ingeniería Pedagógica vs. Manuales Técnicos</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(5,2)">Ver más</button>
                  </div>
                  <div class="flip-card-face flip-card-back">
                    <span>La mayoría falla porque intenta enseñar "funciones". Nosotros enseñamos "procesos" bajo técnicas de Neuroeducación que garantizan que el conocimiento se convierta en hábito productivo.</span>
                    <button type="button" class="btn-secondary card-front-action" (click)="toggleFlip(5,2)">Cerrar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p class="closing-red section5-closing">Deje este tarea en nuestras manos, tenemos el enfoque y la experiencia necesaria para garantizar un servicio posventa que impuse su negocio</p>

          <div class="actions-row">
            <button class="btn-primary" (click)="navigateTo('/intelligence')"><span>Conocer solución</span><span>para Proveedores y Partners</span></button>
            <button class="btn-primary" (click)="navigateTo('/strategy')"><span>Conocer soluciones</span><span>para usuarios de Software</span></button>
            <button class="btn-primary" (click)="navigateToContact()"><span>Solicitar más información</span></button>
          </div>
        </div>
      </section>

    </div>
  `,
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  flip4: Record<number, boolean> = {};
  flip5: Record<number, boolean> = {};

  toggleFlip(section: number, index: number): void {
    if (section === 4) {
      this.flip4[index] = !this.flip4[index];
    } else {
      this.flip5[index] = !this.flip5[index];
    }
  }

  navigateTo(path: string): void {
    window.location.href = path;
  }

  navigateToContact(): void {
    window.location.href = '/contacto';
  }
}
