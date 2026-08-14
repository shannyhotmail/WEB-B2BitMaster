/**
 * Configuración de ambiente para desarrollo
 */
export const environment = {
  production: false,
  // Requiere correr Azure Functions Core Tools en local (`func start`, puerto 7071 por defecto)
  functionsBaseUrl: 'http://localhost:7071/api',
  functionsKey: ''
};
