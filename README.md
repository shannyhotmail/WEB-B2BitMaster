# b2bit - Soluciones de Adopción Tecnológica

Aplicación web completa para b2bit con servicios de Tech Adopción Intelligence (TAI) y Tech Adoption Strategy (TAS).

## 🚀 Descripción General

b2bit es una plataforma moderna que ofrece:
- **Tech Adopción Intelligence (TAI)**: Análisis inteligente de tendencias tecnológicas
- **Tech Adoption Strategy (TAS)**: Estrategia personalizada de transformación digital
- **Consultoría Integral**: Asesoría completa de implementación

## 📋 Requisitos Previos

### Frontend (Angular)
- **Node.js**: v18+ (recomendado v20+)
- **npm**: v8+
- **Angular CLI**: v17+

### Backend (.NET)
- **.NET 8 SDK**
- **SQL Server**: LocalDB o SQL Server Express
- **Visual Studio**: 2022+ o VS Code

## 📂 Estructura del Proyecto

```
WEB B2BitMaster/
├── b2bit-frontend/          # Aplicación Angular 17
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/  # Componentes reutilizables
│   │   │   ├── services/    # Servicios de negocio
│   │   │   ├── models/      # Interfaces y tipos
│   │   │   └── interceptors/# Interceptores HTTP
│   │   └── assets/          # Recursos estáticos
│   ├── package.json         # Dependencias npm
│   └── angular.json         # Configuración Angular
│
└── b2bit-backend/           # API REST en .NET 8
    ├── Controllers/         # Controladores de API
    ├── Services/            # Lógica de negocio
    ├── Models/              # Entidades de base de datos
    ├── Data/                # DbContext y migraciones
    ├── DTOs/                # Data Transfer Objects
    ├── Middleware/          # Middleware personalizado
    ├── Program.cs           # Configuración principal
    └── appsettings.json     # Configuración de ambiente
```

## 🔧 Instalación

### 1. Clonar el Repositorio

```bash
git clone <repository-url>
cd "WEB B2BitMaster"
```

### 2. Configurar Frontend (Angular)

```bash
cd b2bit-frontend

# Instalar dependencias
npm install

# Servir la aplicación en desarrollo
npm start

# Acceder en: http://localhost:4200
```

### 3. Configurar Backend (.NET)

```bash
cd b2bit-backend

# Restaurar paquetes NuGet
dotnet restore

# Crear la base de datos
dotnet ef database update

# Ejecutar la aplicación
dotnet run

# API disponible en: http://localhost:5000
```

## 🏗️ Arquitectura

### Frontend
- **Standalone Components**: Componentes Angular 17 independientes
- **Routing**: Enrutamiento basado en rutas compartidas
- **Reactive Forms**: Validación reactiva de formularios
- **RxJS**: Manejo de datos asíncronos con observables
- **SCSS**: Estilos modularizados

### Backend
- **ASP.NET Core 8**: Framework web moderno
- **Entity Framework Core**: ORM para acceso a datos
- **CORS**: Control de acceso entre dominios
- **Middleware**: Manejo centralizado de errores
- **Serilog**: Logging estructurado
- **Swagger**: Documentación automática de API

## 🔒 Seguridad

### Implementado
✅ Validación de entrada (prevención de inyecciones)  
✅ Sanitización XSS  
✅ CORS configurado  
✅ Manejo seguro de errores (sin información interna)  
✅ Logging de auditoría (IPs de clientes)  
✅ Validación de email  
✅ HTTPS recomendado  

### Recomendaciones Adicionales
- Implementar autenticación JWT en producción
- Usar certificados SSL/TLS
- Configurar rate limiting
- Implementar CSRF tokens
- Validación en lado del servidor

## 📚 API Endpoints

### Health Check
```bash
GET /api/contact/health
```

### Enviar Mensaje de Contacto
```bash
POST /api/contact/send-message
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+1234567890",
  "company": "Tech Corp",
  "subject": "tai",
  "message": "Me gustaría conocer más sobre vuestro servicio TAI..."
}
```

### Obtener Mensajes (Admin)
```bash
GET /api/contact/messages?pageNumber=1&pageSize=10
```

### Obtener Mensaje Específico
```bash
GET /api/contact/messages/{id}
```

### Actualizar Estado
```bash
PUT /api/contact/messages/{id}/status
Content-Type: application/json

{
  "status": "read"
}
```

### Eliminar Mensaje
```bash
DELETE /api/contact/messages/{id}
```

## 🎨 Paleta de Colores

- **Azul Oscuro**: #013d5a (Elementos principales)
- **Rojo**: #ff3131 (Acentos y acciones)
- **Amarillo/Naranja**: #f1a805 (Iconos destacados)
- **Blanco**: #ffffff (Fondo)
- **Negro**: #000000 (Texto)

## 📱 Responsividad

- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (480px - 767px)
- ✅ Small Mobile (< 480px)

## 🚢 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Subir carpeta dist/ al servicio de hosting
```

### Backend (Azure/AWS)
```bash
dotnet publish -c Release
# Desplegar carpeta bin/Release/net8.0/publish/
```

## 📝 Documentación

- **Frontend**: JSDoc en componentes y servicios
- **Backend**: XML comments en clases y métodos
- **Swagger UI**: http://localhost:5000/swagger (desarrollo)

## 🧪 Testing

### Frontend
```bash
npm test              # Ejecutar pruebas unitarias
npm run lint          # Verificar código
```

### Backend
```bash
dotnet test          # Ejecutar pruebas unitarias
```

## 📞 Soporte

Email: support@b2bit.com  
Teléfono: +1 (234) 567-890  
Web: https://www.b2bit.com

## 📄 Licencia

Todos los derechos reservados © 2026 b2bit Solutions

## 👥 Autores

- **Frontend**: Desarrollado con Angular 17
- **Backend**: Desarrollado con .NET 8
- **Design**: Inspirado en dinacode.com

---

**Última actualización**: Mayo 2026  
**Versión**: 1.0.0
