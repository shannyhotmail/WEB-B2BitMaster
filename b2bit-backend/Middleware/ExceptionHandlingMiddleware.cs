using B2BitBackend.DTOs;

namespace B2BitBackend.Middleware;

/// <summary>
/// Middleware para manejo centralizado de errores
/// Captura excepciones no manejadas y devuelve respuestas consistentes
/// </summary>
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    /// <summary>
    /// Invoca el middleware
    /// </summary>
    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Excepción no manejada");
            await HandleExceptionAsync(context, ex);
        }
    }

    /// <summary>
    /// Maneja las excepciones y devuelve una respuesta apropiada
    /// </summary>
    private static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = new ErrorResponseDto
        {
            Timestamp = DateTime.UtcNow,
            Message = "Error interno del servidor"
        };

        switch (exception)
        {
            case ArgumentException argEx:
                context.Response.StatusCode = StatusCodes.Status400BadRequest;
                response.StatusCode = 400;
                response.Message = "Solicitud inválida";
                response.Details = argEx.Message;
                break;

            case UnauthorizedAccessException:
                context.Response.StatusCode = StatusCodes.Status401Unauthorized;
                response.StatusCode = 401;
                response.Message = "No autorizado";
                break;

            case KeyNotFoundException:
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                response.StatusCode = 404;
                response.Message = "Recurso no encontrado";
                break;

            default:
                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                response.StatusCode = 500;
                response.Message = "Error interno del servidor";
                response.Details = "Por favor, intenta de nuevo más tarde";
                break;
        }

        return context.Response.WriteAsJsonAsync(response);
    }
}
