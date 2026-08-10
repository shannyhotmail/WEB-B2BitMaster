import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { IntelligenceComponent } from './components/pages/intelligence/intelligence.component';
import { StrategyComponent } from './components/pages/strategy/strategy.component';
import { ContactoComponent } from './components/pages/contacto/contacto.component';
import { DiagnosticoIaComponent } from './components/pages/diagnostico-ia/diagnostico-ia.component';

/**
 * Configuración de rutas de la aplicación.
 * Define las páginas accesibles y sus componentes asociados.
 */
// Nota de planificacion: /blog queda reservada para una fase futura.
// No agregar componente ni logica de generacion de contenido hasta que se decida explicitamente.
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'intelligence', component: IntelligenceComponent },
  { path: 'strategy', component: StrategyComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'diagnostico-ia', component: DiagnosticoIaComponent },
  { path: '**', redirectTo: '' }
];
