/**
 * Configuración de ambiente para desarrollo
 */
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000',
  // Azure Functions configuration (leave `azureFunctionKey` empty locally)
  useAzureFunctions: false,
  azureFunctionBaseUrl: 'https://<your-function-app>.azurewebsites.net/api',
  azureFunctionKey: ''
};
