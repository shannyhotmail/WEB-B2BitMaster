# 🚀 Guía de Inicio Rápido - b2bit

Sigue estos pasos para tener la aplicación funcionando en minutos.

## ⚡ Quick Start (5 minutos)

### Paso 1: Instalar Node.js y .NET 8

#### macOS
```bash
# Con Homebrew
brew install node
brew install --cask dotnet-sdk

# O descarga de:
# - https://nodejs.org/
# - https://dotnet.microsoft.com/download
```

#### Windows
- Descargar Node.js desde https://nodejs.org/
- Descargar .NET 8 desde https://dotnet.microsoft.com/download

### Paso 2: Clonar y Navegar

```bash
git clone https://github.com/shannyvv-prog/WEB-B2BitMaster.git
cd WEB-B2BitMaster
```

### Paso 3: Ejecutar Frontend (Terminal 1)

```bash
cd b2bit-frontend
npm install
npm start

# 🎉 Abierto en http://localhost:4200
```

### Paso 4: Ejecutar Backend (Terminal 2)

```bash
cd b2bit-backend
dotnet restore
dotnet ef database update
dotnet run

# 🎉 API en http://localhost:5000
# 📚 Swagger UI en http://localhost:5000/swagger
```

> Nota: En macOS el backend requiere SQL Server. La configuración por defecto usa `Server=(localdb)\\mssqllocaldb;...`, que solo funciona en Windows. Si estás en macOS, usa un contenedor Docker de SQL Server o un servidor SQL accesible y actualiza `b2bit-backend/appsettings.json` con la cadena de conexión correcta.

## ✅ Verificar que Todo Funciona

1. **Frontend**: Abre http://localhost:4200 en el navegador
   - Deberías ver la página de inicio con el menú
   - Click en "Servicios" para ver el menú desplegable

2. **Backend**: Abre http://localhost:5000/api/contact/health
   - Deberías ver: `{"success":true,"message":"Servicio de contacto disponible"...}`

3. **Swagger**: Abre http://localhost:5000/swagger
   - Interfaz interactiva para probar endpoints

## 🧪 Prueba el Formulario de Contacto

1. Ir a http://localhost:4200 → "Contáctenos"
2. Llenar el formulario:
   - Nombre: Tu nombre
   - Email: tu@email.com
   - Asunto: Solicitar Consulta
   - Mensaje: Hola, me gustaría...
3. Hacer clic en "Enviar Mensaje"
4. Deberías ver: "¡Tu mensaje ha sido enviado exitosamente!"

## 📁 Estructura de Carpetas

```
WEB B2BitMaster/
├── b2bit-frontend/
│   ├── src/
│   │   ├── app/          ← Componentes Angular
│   │   ├── assets/       ← Imágenes, fuentes
│   │   └── styles.scss   ← Estilos globales
│   ├── package.json
│   └── angular.json
├── b2bit-backend/
│   ├── Controllers/      ← Endpoints API
│   ├── Services/         ← Lógica
│   ├── Models/           ← Entidades
│   ├── Program.cs
│   └── B2BitBackend.csproj
└── README.md
```

## 🛑 Solución de Problemas

### Error: "npm: command not found"
```bash
# Instalar Node.js primero
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs  # Linux
```

### Error: "dotnet: command not found"
```bash
# Instalar .NET 8
# macOS: brew install dotnet-sdk
# Windows: Descargar de https://dotnet.microsoft.com/download
```

### Puerto 4200 ya en uso
```bash
# Usar diferente puerto
ng serve --port 4300
```

### Puerto 5000 ya en uso
```bash
# Configurar diferente puerto en Program.cs
app.Run("http://localhost:5001");
```

### Error de base de datos
```bash
# Resetear base de datos
cd b2bit-backend
dotnet ef database drop
dotnet ef database update
```

## 📚 Documentación Completa

- [README Principal](./README.md)
- [Frontend README](./b2bit-frontend/README.md)
- [Backend README](./b2bit-backend/README.md)

## 🎓 Primeros Pasos en Desarrollo

### Agregar Componente Angular
```bash
cd b2bit-frontend
ng generate component components/mi-componente
```

### Agregar Servicio
```bash
ng generate service services/mi-servicio
```

### Crear Controlador .NET
```bash
cd b2bit-backend
# Crear archivo en Controllers/
# O usar extensión de Visual Studio
```

## 🚀 Pasos para Producción

### 1. Build Frontend
```bash
cd b2bit-frontend
npm run build
# Archivos en dist/
```

### 2. Build Backend
```bash
cd b2bit-backend
dotnet publish -c Release
# Archivos en bin/Release/net8.0/publish/
```

### 3. Deploy
- **Frontend**: Subir `dist/` a Vercel, Netlify o tu servidor
- **Backend**: Desplegar en Azure, AWS o tu servidor

## 📞 ¿Necesitas Ayuda?

- Email: support@b2bit.com
- Documentación: Revisa README.md en cada carpeta
- Swagger API: http://localhost:5000/swagger

---

**¡Listo! Ya puedes empezar a desarrollar.** 🎉
