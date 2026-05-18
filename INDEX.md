# 📑 Índice de Referencia Rápida - b2bit

## 🎯 Encuentra lo que Necesitas

### 📘 Documentación Principal
| Documento | Propósito |
|-----------|----------|
| [README.md](./README.md) | Guía general del proyecto |
| [QUICK_START.md](./QUICK_START.md) | Inicio en 5 minutos ⚡ |
| [ENTREGABLES.md](./ENTREGABLES.md) | Resumen de qué se entregó ✅ |
| [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) | Árbol completo de carpetas 📂 |
| [SECURITY.md](./SECURITY.md) | Seguridad OWASP 🔒 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Checklist de deployment 🚀 |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Cómo contribuir 👥 |

### 🎨 Frontend (Angular 17)
| Carpeta | Contiene |
|---------|----------|
| [b2bit-frontend/](./b2bit-frontend/) | Aplicación Angular |
| [src/app/components/](./b2bit-frontend/src/app/components/) | Componentes UI |
| [src/app/components/header/](./b2bit-frontend/src/app/components/header/) | Navegación |
| [src/app/components/footer/](./b2bit-frontend/src/app/components/footer/) | Pie de página |
| [src/app/components/pages/](./b2bit-frontend/src/app/components/pages/) | Páginas (home, intelligence, strategy, contacto) |
| [src/app/services/](./b2bit-frontend/src/app/services/) | ContactService |
| [src/app/interceptors/](./b2bit-frontend/src/app/interceptors/) | HTTP error handling |
| [src/environments/](./b2bit-frontend/src/environments/) | Config dev/prod |
| [src/assets/](./b2bit-frontend/src/assets/) | Logo, imágenes |
| [src/styles.scss](./b2bit-frontend/src/styles.scss) | Estilos globales 🎨 |
| [package.json](./b2bit-frontend/package.json) | Dependencias npm |
| [angular.json](./b2bit-frontend/angular.json) | Config Angular |
| [b2bit-frontend/README.md](./b2bit-frontend/README.md) | Guía Frontend |

### 🔧 Backend (.NET 8)
| Carpeta | Contiene |
|---------|----------|
| [b2bit-backend/](./b2bit-backend/) | Aplicación .NET |
| [Controllers/](./b2bit-backend/Controllers/) | ContactController |
| [Services/](./b2bit-backend/Services/) | IContactService, ContactService |
| [Models/](./b2bit-backend/Models/) | ContactMessage entity |
| [Data/](./b2bit-backend/Data/) | B2BitDbContext |
| [DTOs/](./b2bit-backend/DTOs/) | ContactDtos, CommonDtos |
| [Middleware/](./b2bit-backend/Middleware/) | ExceptionHandlingMiddleware |
| [Program.cs](./b2bit-backend/Program.cs) | Configuración principal |
| [appsettings.json](./b2bit-backend/appsettings.json) | Config |
| [B2BitBackend.csproj](./b2bit-backend/B2BitBackend.csproj) | Proyecto C# |
| [b2bit-backend/README.md](./b2bit-backend/README.md) | Guía Backend |

## 🔍 Busca por Tarea

### Quiero...
- **Empezar rápido** → Ver [QUICK_START.md](./QUICK_START.md)
- **Entender la estructura** → Ver [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
- **Ver qué se entregó** → Ver [ENTREGABLES.md](./ENTREGABLES.md)
- **Implementar seguridad** → Ver [SECURITY.md](./SECURITY.md)
- **Desplegar a producción** → Ver [DEPLOYMENT.md](./DEPLOYMENT.md)
- **Contribuir código** → Ver [CONTRIBUTING.md](./CONTRIBUTING.md)

### Quiero modificar...
- **El menú** → [header.component.ts](./b2bit-frontend/src/app/components/header/header.component.ts)
- **Los colores** → [styles.scss](./b2bit-frontend/src/styles.scss)
- **El formulario** → [contacto.component.ts](./b2bit-frontend/src/app/components/pages/contacto/contacto.component.ts)
- **La API** → [ContactController.cs](./b2bit-backend/Controllers/ContactController.cs)
- **La base de datos** → [B2BitDbContext.cs](./b2bit-backend/Data/B2BitDbContext.cs)
- **La validación** → [ContactService.cs](./b2bit-backend/Services/ContactService.cs)

### Quiero agregar...
- **Nuevo componente** → Ver [b2bit-frontend/README.md](./b2bit-frontend/README.md#crear-componente)
- **Nuevo endpoint** → Ver [b2bit-backend/README.md](./b2bit-backend/README.md#agregar-endpoint)
- **Nueva página** → Copiar estructura en `components/pages/`
- **Nueva validación** → Actualizar [ContactService.cs](./b2bit-backend/Services/ContactService.cs)

## 📊 Archivos por Tipo

### Configuración
- `package.json` - NPM dependencies
- `angular.json` - Angular config
- `tsconfig.json` - TypeScript config
- `B2BitBackend.csproj` - .NET project
- `appsettings.json` - API config
- `.editorconfig` - Código style
- `.gitignore` - Git ignore

### Documentación
- `README.md` - General
- `QUICK_START.md` - Quick start
- `ENTREGABLES.md` - Resumen
- `PROJECT_STRUCTURE.md` - Estructura
- `SECURITY.md` - Seguridad
- `DEPLOYMENT.md` - Deploy
- `CONTRIBUTING.md` - Contribuir

### TypeScript (Frontend)
- `main.ts` - Punto entrada
- `app.component.ts` - Componente raíz
- `app.routes.ts` - Rutas
- `*.component.ts` - Componentes
- `*.service.ts` - Servicios
- `*.interceptor.ts` - Interceptadores

### C# (Backend)
- `Program.cs` - Configuración
- `Controllers/ContactController.cs` - API
- `Services/ContactService.cs` - Lógica
- `Models/ContactMessage.cs` - Entidad
- `Data/B2BitDbContext.cs` - BD
- `DTOs/*.cs` - Data Transfer Objects

### Estilos
- `styles.scss` - Estilos globales
- `*.component.scss` - Estilos componentes
- Variables de color (#013d5a, #ff3131, #f1a805)

## 🚀 Comandos Frecuentes

### Frontend
```bash
cd b2bit-frontend
npm install      # Instalar deps
npm start        # Dev server
npm run build    # Build prod
npm test         # Tests
npm run lint     # Linting
ng generate component components/nuevo  # Nuevo componente
ng generate service services/nuevo      # Nuevo servicio
```

### Backend
```bash
cd b2bit-backend
dotnet restore                      # Restaurar deps
dotnet run                         # Dev server
dotnet build -c Release            # Build prod
dotnet test                        # Tests
dotnet ef migrations list          # Ver migraciones
dotnet ef database update          # Aplicar migraciones
dotnet ef migrations add Initial   # Crear migración
```

## 📱 URLs Importantes

| URL | Descripción |
|-----|------------|
| http://localhost:4200 | Frontend (Angular) |
| http://localhost:5000 | Backend (API) |
| http://localhost:5000/swagger | Documentación API |
| http://localhost:5000/api/contact/health | Health check |

## 🎓 Rutas de Aprendizaje

1. **Entender el proyecto**
   - Leer [README.md](./README.md)
   - Ver [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

2. **Empezar localmente**
   - Seguir [QUICK_START.md](./QUICK_START.md)
   - Probar formulario de contacto

3. **Aprender el código**
   - Explorar [b2bit-frontend/src/app/](./b2bit-frontend/src/app/)
   - Explorar [b2bit-backend/Controllers/](./b2bit-backend/Controllers/)

4. **Hacer cambios**
   - Ver [CONTRIBUTING.md](./CONTRIBUTING.md)
   - Agregar un componente/endpoint

5. **Desplegar**
   - Leer [DEPLOYMENT.md](./DEPLOYMENT.md)
   - Seguir checklist

## 🔗 Enlaces Útiles

### Documentación Oficial
- [Angular Documentation](https://angular.io/docs)
- [.NET 8 Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

### Herramientas
- [VS Code](https://code.visualstudio.com/)
- [Visual Studio 2022](https://visualstudio.microsoft.com/)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/) - Para probar API

### Recursos
- [Angular Best Practices](https://angular.io/guide/styleguide)
- [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ❓ Preguntas Frecuentes

**P: ¿Por dónde empiezo?**  
R: Empieza con [QUICK_START.md](./QUICK_START.md) - te pone funcionando en 5 minutos

**P: ¿Cómo agregar un nuevo componente?**  
R: Ver instrucciones en [b2bit-frontend/README.md](./b2bit-frontend/README.md)

**P: ¿Cómo agregar un nuevo endpoint?**  
R: Ver instrucciones en [b2bit-backend/README.md](./b2bit-backend/README.md)

**P: ¿Cómo desplegar?**  
R: Seguir [DEPLOYMENT.md](./DEPLOYMENT.md) checklist

**P: ¿Cómo reportar un bug?**  
R: Ver template en [CONTRIBUTING.md](./CONTRIBUTING.md#reportar-bugs)

## 📞 Contacto

- Email: support@b2bit.com
- Documentación: Ver archivos README
- Issues: Usar GitHub Issues

---

**Última actualización**: Mayo 2026  
**Versión**: 1.0.0  
**¡Feliz coding! 🚀**
