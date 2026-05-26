/**
 * Configuración de ambiente para producción
 */
export const environment = {
  production: true,
  apiUrl: 'https://api.b2bit.com',
  // Azure Functions configuration for production
  useAzureFunctions: true,
  azureFunctionBaseUrl: 'https://<your-function-app>.azurewebsites.net/api',
  azureFunctionKey: ''
};
