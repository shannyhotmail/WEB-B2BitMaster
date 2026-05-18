# b2bit Frontend - Aplicación Angular 17

Interfaz web moderna y responsiva para b2bit desarrollada con Angular 17.

## 🚀 Características

- **Componentes Standalone**: Arquitectura moderna de Angular
- **Routing Dinámico**: Navegación fluida entre páginas
- **Formularios Reactivos**: Validación avanzada en tiempo real
- **Responsive Design**: Adaptable a todos los dispositivos
- **SCSS Modularizado**: Estilos organizados por componente
- **Interceptores HTTP**: Manejo centralizado de errores
- **Servicios Reutilizables**: Lógica de negocio separada

## 📋 Requisitos

- Node.js v18+ (recomendado v20+)
- npm v8+
- Angular CLI v17+

## 🔧 Instalación

```bash
cd b2bit-frontend

# Instalar dependencias
npm install

# Servir en desarrollo
npm start

# Acceder en http://localhost:4200
```

## 🏗️ Estructura

```
src/
├── app/
│   ├── components/
│   │   ├── header/           # Navegación principal
│   │   ├── footer/           # Pie de página
│   │   └── pages/            # Páginas de la aplicación
│   │       ├── home/         # Página de inicio
│   │       ├── intelligence/ # Página TAI
│   │       ├── strategy/     # Página TAS
│   │       └── contacto/     # Formulario de contacto
│   ├── services/
│   │   └── contact.service.ts
│   ├── interceptors/
│   │   └── http-error.interceptor.ts
│   ├── models/
│   │   └── contact.model.ts
│   └── app.component.ts      # Componente raíz
├── environments/             # Configuración de ambientes
├── styles.scss              # Estilos globales
└── index.html               # HTML principal
```

## 📝 Componentes Principales

### Header Component
- Menú de navegación fijo en la parte superior
- Logo clickeable que redirige a home
- Menú desplegable para servicios
- Altura: 100px
- Ancho máximo: 800px centrado

### Footer Component
- Información de contacto
- Enlaces a redes sociales
- Derechos de autor

### Páginas
- **Home**: Página de bienvenida con servicios destacados
- **Intelligence (TAI)**: Descripción del servicio de análisis
- **Strategy (TAS)**: Descripción del servicio de estrategia
- **Contacto**: Formulario para enviar mensajes

## 🎨 Estilos

### Variables de Color
```scss
$primary: #013d5a;      // Azul oscuro
$accent: #ff3131;       // Rojo
$highlight: #f1a805;    // Amarillo/Naranja
$bg: #ffffff;           // Blanco
$text: #000000;         // Negro
```

### Breakpoints Responsivos
- `1200px`: Desktop
- `768px`: Tablet
- `480px`: Mobile

## 🔌 Conectar con Backend

Configurar la URL de API en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000'
};
```

## 📦 Build para Producción

```bash
npm run build

# Archivos optimizados en: dist/b2bit-frontend/
```

## 🧪 Testing

```bash
# Pruebas unitarias
npm test

# Linting
npm run lint
```

## 📱 Responsividad Verificada

✅ Desktop (1920x1080)  
✅ Laptop (1366x768)  
✅ Tablet (768x1024)  
✅ Mobile (375x667)  
✅ Small Mobile (320x568)

## 🔒 Seguridad

- Validación reactiva de formularios
- Sanitización de entrada
- Prevención de XSS
- Headers segros

## 📚 Documentación

Cada componente incluye comentarios JSDoc:

```typescript
/**
 * Componente Header
 * Implementa la navegación principal de la aplicación
 */
@Component({...})
export class HeaderComponent { }
```

## 🐛 Debugging

Habilitar DevTools de Angular:

```bash
ng config cli.analytics false
```

## 📞 Contacto

Email: frontend@b2bit.com

---

**Versión**: 1.0.0  
**Última actualización**: Mayo 2026
