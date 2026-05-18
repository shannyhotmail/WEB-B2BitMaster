# 👥 Guía de Contribución - b2bit

¡Gracias por tu interés en contribuir a b2bit! Por favor sigue estos pasos.

## 📋 Código de Conducta

- Sé respetuoso
- Sé inclusivo
- Sé constructivo
- Reporta comportamientos inapropiados a conduct@b2bit.com

## 🚀 Cómo Contribuir

### 1. Fork y Clonar

```bash
git clone https://github.com/tuusuario/b2bit.git
cd b2bit
git checkout -b feature/tu-feature-name
```

### 2. Configurar Entorno

#### Frontend
```bash
cd b2bit-frontend
npm install
npm start
```

#### Backend
```bash
cd b2bit-backend
dotnet restore
dotnet run
```

### 3. Hacer Cambios

#### Naming Conventions

**TypeScript (Frontend)**
```typescript
// Componentes: PascalCase
export class ContactFormComponent { }

// Servicios: PascalCase + Service
export class ContactService { }

// Variables: camelCase
let userName = '';
const maxLength = 100;

// Métodos: camelCase
handleSubmit() { }
validateEmail() { }
```

**C# (Backend)**
```csharp
// Clases: PascalCase
public class ContactMessage { }

// Métodos: PascalCase
public async Task<bool> SendMessageAsync() { }

// Variables: camelCase
var userName = "";
const int maxLength = 100;

// Privados: _camelCase
private readonly ILogger _logger;
```

### 4. Commits

```bash
git add .
git commit -m "feat: agregar validación de email

- Describe qué cambió
- Por qué cambió
- Relacionado con #123"
```

**Tipos de commits:**
- `feat:` Nueva feature
- `fix:` Bug fix
- `docs:` Cambios en documentación
- `style:` Formato, comillas, etc.
- `refactor:` Reorganizar código
- `perf:` Mejora de performance
- `test:` Agregar/actualizar tests
- `chore:` Cambios en build, deps, etc.

### 5. Testing

#### Frontend
```bash
cd b2bit-frontend

# Crear componente con test
ng generate component components/nuevo --skip-tests=false

# Ejecutar tests
npm test

# Coverage
npm test -- --code-coverage
```

#### Backend
```bash
cd b2bit-backend

# Ejecutar tests
dotnet test

# Con coverage
dotnet test /p:CollectCoverage=true
```

### 6. Documentación

Incluir comentarios:

**TypeScript**
```typescript
/**
 * Valida un correo electrónico
 * @param email Correo a validar
 * @returns true si es válido
 */
isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
```

**C#**
```csharp
/// <summary>
/// Valida un correo electrónico
/// </summary>
/// <param name="email">Correo a validar</param>
/// <returns>true si es válido</returns>
public bool IsValidEmail(string email)
{
  return System.Text.RegularExpressions.Regex.IsMatch(email, @"^[^\s@]+@[^\s@]+\.[^\s@]+$");
}
```

### 7. Style & Linting

#### Frontend
```bash
cd b2bit-frontend

# Verificar estilo
npm run lint

# Arreglar automático
npm run lint -- --fix
```

#### Backend
```bash
cd b2bit-backend

# Analizar código
dotnet build

# EditorConfig
# Instalar extensión en VS Code: EditorConfig for VS Code
```

### 8. Pull Request

1. Push a tu rama
```bash
git push origin feature/tu-feature-name
```

2. Crear PR en GitHub

3. Completar template:
```markdown
## Descripción
Qué cambió y por qué

## Tipo de Cambio
- [ ] Bug fix
- [ ] Nueva feature
- [ ] Breaking change
- [ ] Documentación

## Testing
- [ ] Tests pasando
- [ ] Nuevo test agregado
- [ ] Testeado manualmente

## Checklist
- [ ] Código sigue el style guide
- [ ] Auto-review completado
- [ ] Comentarios agregados
- [ ] Documentación actualizada
- [ ] Sin cambios en logs
- [ ] Tests relacionados actualizados
```

## 🎯 Areas para Contribuir

### Frontend
- [ ] Nuevo componente
- [ ] Nuevo servicio
- [ ] Mejora de UI/UX
- [ ] Optimización de performance
- [ ] Tests
- [ ] Documentación

### Backend
- [ ] Nuevo endpoint
- [ ] Nuevo servicio
- [ ] Optimización de BD
- [ ] Mejora de seguridad
- [ ] Tests
- [ ] Documentación

### Documentación
- [ ] Mejorar README
- [ ] Agregar ejemplos
- [ ] Traducción
- [ ] Guías tutoriales

## 🐛 Reportar Bugs

### Template
```markdown
## Descripción
Descripción clara del bug

## Pasos para Reproducir
1. Ir a...
2. Hacer click en...
3. Ver error...

## Comportamiento Esperado
Qué debería pasar

## Comportamiento Actual
Qué está pasando

## Entorno
- OS: Windows 10
- Node: v20.0.0
- Angular: v17.0.0
- .NET: 8.0

## Screenshots
Si aplica

## Logs
Si aplica
```

## 📦 Build & Release

### Versionado (Semantic Versioning)
- MAJOR.MINOR.PATCH (1.0.0)
- MAJOR: Breaking changes
- MINOR: Nueva feature, backward compatible
- PATCH: Bug fix

### Release Process
1. Actualizar version en `package.json` y `.csproj`
2. Actualizar `CHANGELOG.md`
3. Crear tag: `git tag v1.0.0`
4. Push: `git push origin v1.0.0`

## 🔗 Recursos

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [C# Coding Conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions)
- [Git Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows)
- [Semantic Versioning](https://semver.org/)

## 👥 Reconocimiento

Todos los contribuidores serán reconocidos en:
- [CONTRIBUTORS.md](./CONTRIBUTORS.md)
- Página de créditos

## 📞 Preguntas?

- Discord: [link]
- Email: dev@b2bit.com
- Issues: [GitHub Issues]

---

¡Gracias por contribuir a b2bit! 🙌
