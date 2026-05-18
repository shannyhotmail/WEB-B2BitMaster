import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

/**
 * Interceptor de errores HTTP
 * Maneja errores HTTP de forma centralizada para toda la aplicación
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Log del error en consola para debugging
      console.error('Error HTTP:', {
        status: error.status,
        message: error.message,
        url: error.url,
        timestamp: new Date().toISOString()
      });

      // Manejo específico de errores según el status code
      switch (error.status) {
        case 400:
          // Bad Request
          console.error('Solicitud inválida:', error.error?.message || 'Datos inválidos');
          break;
        case 401:
          // Unauthorized
          console.error('No autenticado. Redirigiendo...');
          break;
        case 403:
          // Forbidden
          console.error('No tiene permisos para acceder a este recurso');
          break;
        case 404:
          // Not Found
          console.error('Recurso no encontrado');
          break;
        case 500:
          // Server Error
          console.error('Error del servidor. Intenta de nuevo más tarde.');
          break;
        case 0:
          // Network error
          console.error('Error de conexión. Verifica tu conectividad.');
          break;
      }

      // Re-lanzar el error para que el componente lo capture
      return throwError(() => error);
    })
  );
};
