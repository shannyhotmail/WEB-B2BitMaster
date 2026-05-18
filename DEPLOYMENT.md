# 🚀 Deployment Checklist - b2bit

Utiliza este checklist antes de desplegar a producción.

## Pre-Deployment (1 Semana Antes)

### Código
- [ ] Code review completado
- [ ] Tests unitarios pasando
- [ ] No hay warnings de compilación
- [ ] Linting pasando
- [ ] Dependencies actualizadas
- [ ] No hay secrets en el código

### Frontend
```bash
npm audit fix
npm run build
npm test
```

### Backend
```bash
dotnet build -c Release
dotnet test
dotnet publish -c Release
```

## Security Checklist

- [ ] HTTPS configurado
- [ ] CORS restrictivo
- [ ] JWT secret actualizado
- [ ] Conexión DB segura
- [ ] Variables de ambiente configuradas
- [ ] Logs sanitizados
- [ ] Error messages no exponen detalles
- [ ] Rate limiting implementado
- [ ] SQL Injection prevenido
- [ ] XSS prevenido

## Database Checklist

### SQL Server
- [ ] Backup automatizado configurado
- [ ] Usuario BD con permisos mínimos
- [ ] Contraseña fuerte
- [ ] Conexión encriptada
- [ ] Migraciones aplicadas

### Migraciones
```bash
# Backup antes de migrar
dotnet ef database update -c Release
```

## Frontend Deployment

### Build
```bash
cd b2bit-frontend
npm run build --prod
```

### Archivos a Desplegar
```
dist/b2bit-frontend/
├── index.html
├── main.*.js
├── styles.*.css
└── assets/
```

### Opciones
1. **Vercel** (Recomendado)
   - Conectar GitHub
   - Build: `npm run build`
   - Output: `dist/b2bit-frontend`

2. **Netlify**
   - Conectar GitHub
   - Build: `npm run build`
   - Publish: `dist/b2bit-frontend`

3. **AWS S3 + CloudFront**
   - Crear bucket
   - Subir archivos de build
   - Configurar CloudFront

### Post-Deploy
- [ ] Health check: `/` carga
- [ ] API conecta: Probar formulario
- [ ] Assets cargan: Logo visible
- [ ] Console sin errores
- [ ] Performance: Lighthouse > 90

## Backend Deployment

### Build
```bash
cd b2bit-backend
dotnet publish -c Release -o ./publish
```

### Archivos a Desplegar
```
publish/
├── B2BitBackend.exe (Windows)
├── B2BitBackend (Linux)
├── appsettings.json
└── wwwroot/
```

### Opciones
1. **Azure App Service**
   - Crear App Service
   - Conectar GitHub
   - Build: `dotnet publish -c Release`
   - Runtime: `.NET 8`

2. **AWS Elastic Beanstalk**
   - Crear environment
   - Platform: `.NET 8`
   - Upload publish folder

3. **Docker** (Recomendado para escalabilidad)
```dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY publish .
ENTRYPOINT ["dotnet", "B2BitBackend.dll"]
```

```bash
docker build -t b2bit-api:latest .
docker push your-registry/b2bit-api:latest
```

### Configuración en Producción

#### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=prod-server;Database=B2BitDb;User Id=sa;..."
  },
  "Jwt": {
    "SecretKey": "YOUR_PRODUCTION_SECRET_KEY_MIN_32_CHARS",
    "ExpirationMinutes": 60
  },
  "CorsSettings": {
    "AllowedOrigins": [
      "https://www.b2bit.com"
    ]
  }
}
```

#### Variables de Ambiente
```bash
export ASPNETCORE_ENVIRONMENT=Production
export ASPNETCORE_URLS=https://+:443
```

### Post-Deploy
- [ ] Health check: GET `/api/contact/health`
- [ ] Swagger disponible: `https://api.b2bit.com/swagger`
- [ ] Formulario funciona
- [ ] BD conecta
- [ ] Logs se generan
- [ ] Performance testing

## Monitoring Post-Deploy

### Frontend
- [ ] Uptime monitoring (5 min interval)
- [ ] Error tracking (Sentry, etc.)
- [ ] Performance monitoring
- [ ] User analytics

### Backend
- [ ] Application Insights (Azure)
- [ ] CloudWatch (AWS)
- [ ] Datadog/NewRelic
- [ ] Custom alerts

## Rollback Plan

### Si Algo Sale Mal

#### Frontend
```bash
# Volver a versión anterior
git checkout previous-tag
npm run build
# Redeploy a hosting
```

#### Backend
```bash
# Restaurar BD desde backup
dotnet ef database update <previous-migration>

# Redeploy versión anterior
git checkout previous-tag
dotnet publish -c Release
# Redeploy a hosting
```

## DNS & SSL

- [ ] DNS pointing correcto
- [ ] SSL certificate válido
- [ ] Auto-renewal configurado
- [ ] HSTS headers
- [ ] Certificate pinning (opcional)

## Performance Optimization

### Frontend
- [ ] Minified JS/CSS
- [ ] Lazy loading
- [ ] Image optimization
- [ ] Caching headers

### Backend
- [ ] Response caching
- [ ] Database indexing
- [ ] Query optimization
- [ ] Connection pooling

## Post-Launch (24 Horas)

- [ ] Monitor logs
- [ ] Verificar métricas
- [ ] User feedback
- [ ] Performance metrics
- [ ] Error rates bajos

## Post-Launch (1 Semana)

- [ ] Análisis de performance
- [ ] Feedback usuarios
- [ ] Security audit
- [ ] Backup verification
- [ ] Documentation actualizada

## Comandos Útiles

### Ver logs
```bash
# Azure
az webapp log tail --resource-group mygroup --name myapp

# AWS
aws logs tail /aws/elasticbeanstalk/app --follow

# On-premise
tail -f logs/app-20260511.txt
```

### Diagnosticar problemas
```bash
# Frontend
npm run build --prod --configuration=production

# Backend
dotnet build -c Release
dotnet publish -c Release --no-build
```

## Contactos Importantes

- **DevOps Lead**: devops@b2bit.com
- **Security Team**: security@b2bit.com
- **Database Admin**: dba@b2bit.com
- **Product Owner**: product@b2bit.com

## Documentación Relacionada

- [README Principal](./README.md)
- [Seguridad](./SECURITY.md)
- [Backend README](./b2bit-backend/README.md)
- [Frontend README](./b2bit-frontend/README.md)

---

**Versión**: 1.0.0  
**Última actualización**: Mayo 2026
