# b2bit Backend - API REST .NET 8

Servidor backend robusto desarrollado con ASP.NET Core 8 y Entity Framework Core.

## 🚀 Características

- **ASP.NET Core 8**: Framework web moderno
- **Entity Framework Core**: ORM para base de datos
- **Swagger**: Documentación automática interactiva
- **CORS**: Control de acceso entre dominios
- **Middleware Personalizado**: Manejo centralizado de errores
- **Logging**: Auditoría con Serilog
- **Validación**: Input sanitization y validación de datos

## 📋 Requisitos

- .NET 8 SDK
- SQL Server (LocalDB o Express Edition)
- Visual Studio 2022+ o VS Code

## 🔧 Instalación

```bash
cd b2bit-backend

# Restaurar dependencias NuGet
dotnet restore

# Crear la base de datos
dotnet ef database update

# Ejecutar la aplicación
dotnet run

# API disponible en: http://localhost:5000
# Swagger UI: http://localhost:5000/swagger
```

## 🏗️ Estructura

```
b2bit-backend/
├── Controllers/           # Controladores de API
│   └── ContactController.cs
├── Services/              # Lógica de negocio
│   ├── IContactService.cs
│   └── ContactService.cs
├── Models/                # Entidades de base de datos
│   └── ContactMessage.cs
├── Data/                  # Contexto de base de datos
│   └── B2BitDbContext.cs
├── DTOs/                  # Data Transfer Objects
│   ├── ContactDtos.cs
│   └── CommonDtos.cs
├── Middleware/            # Middleware personalizado
│   └── ExceptionHandlingMiddleware.cs
├── Program.cs             # Configuración principal
├── appsettings.json       # Configuración
└── appsettings.Development.json
```

## 🔌 Endpoints API

### Health Check
```bash
GET /api/contact/health
```

### Enviar Mensaje
```bash
POST /api/contact/send-message
Content-Type: application/json

{
  "name": "Juan",
  "email": "juan@example.com",
  "phone": "+1234567890",
  "company": "TechCorp",
  "subject": "tai",
  "message": "Mensaje..."
}
```

**Respuesta (200)**:
```json
{
  "id": 1,
  "email": "juan@example.com",
  "createdAt": "2026-05-11T10:30:00Z",
  "message": "Mensaje enviado exitosamente..."
}
```

### Obtener Mensajes (Admin)
```bash
GET /api/contact/messages?pageNumber=1&pageSize=10
```

### Obtener Mensaje
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

Valores válidos: `new`, `read`, `responded`, `closed`

### Eliminar Mensaje
```bash
DELETE /api/contact/messages/{id}
```

## 📊 Modelos de Datos

### ContactMessage
```csharp
public class ContactMessage
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string? Phone { get; set; }
    public string? Company { get; set; }
    public string Subject { get; set; }
    public string Message { get; set; }
    public string Status { get; set; } = "new";
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public string? ClientIp { get; set; }
}
```

## 🔒 Seguridad Implementada

✅ **Validación de Entrada**
- Email válido
- Longitud máxima de campos
- Mensaje entre 10-5000 caracteres

✅ **Sanitización**
- Eliminación de caracteres peligrosos
- Prevención de XSS

✅ **Logging de Auditoría**
- Registro de IP del cliente
- Timestamps en UTC

✅ **CORS Configurado**
- Orígenes permitidos: localhost:4200, www.b2bit.com

✅ **Manejo de Errores**
- Sin exposición de información interna
- Respuestas consistentes

## 📝 Configuración

### appsettings.json
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=(localdb)\\mssqllocaldb;Database=B2BitDb;..."
  },
  "CorsSettings": {
    "AllowedOrigins": [
      "http://localhost:4200",
      "https://www.b2bit.com"
    ]
  }
}
```

### Cambiar Puerto
En `Program.cs`:
```csharp
app.Run("http://localhost:YOUR_PORT");
```

## 🗄️ Base de Datos

### Crear Migración
```bash
dotnet ef migrations add InitialCreate
```

### Aplicar Migración
```bash
dotnet ef database update
```

### Ver Migraciones
```bash
dotnet ef migrations list
```

## 📦 Build para Producción

```bash
dotnet publish -c Release

# Archivos en: bin/Release/net8.0/publish/
```

## 🚀 Deployment

### En Azure
```bash
dotnet publish -c Release -o ./publish
# Desplegar carpeta publish/ en Azure App Service
```

### En Docker
```bash
docker build -t b2bit-api .
docker run -p 5000:80 b2bit-api
```

## 🧪 Testing

```bash
dotnet test
```

## 📚 Documentación

### Swagger UI
Accede a `http://localhost:5000/swagger` durante desarrollo

### XML Documentation
Los comentarios en el código se generan automáticamente en Swagger

## 📊 Logging

Los logs se guardan en `logs/` carpeta con rotación diaria

```csharp
Log.Information("Mensaje de información");
Log.Warning("Advertencia");
Log.Error(ex, "Error");
```

## 🐛 Debugging

### Visual Studio
- Presiona F5 para iniciar en modo debug
- Establece breakpoints y inspecciona variables

### VS Code
```bash
dotnet run --configuration Debug
```

## 🔄 CORS Errores

Si ves error CORS, verifica:
1. Frontend URL en `CorsSettings.AllowedOrigins`
2. `UseCors()` está antes de `MapControllers()`
3. Cliente envía las cabeceras correctas

## 📞 Contacto

Email: backend@b2bit.com

---

**Versión**: 1.0.0  
**Última actualización**: Mayo 2026
