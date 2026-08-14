using System.Net;
using System.Text;
using B2BitBackend.DTOs;
using B2BitBackend.Services;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace B2BitBackend;

public class ContactFunctions
{
    private readonly IContactService _contactService;
    private readonly ILogger<ContactFunctions> _logger;

    public ContactFunctions(IContactService contactService, ILogger<ContactFunctions> logger)
    {
        _contactService = contactService;
        _logger = logger;
    }

    [Function("SendContactMessage")]
    public async Task<HttpResponseData> SendContactMessage(
        [HttpTrigger(AuthorizationLevel.Function, "post", Route = "contact/send-message")] HttpRequestData req)
    {
        try
        {
            var dto = await req.ReadFromJsonAsync<CreateContactMessageDto>();
            if (dto == null)
                return CreateErrorResponse(req, HttpStatusCode.BadRequest, "El cuerpo de la solicitud es inválido.", "No se pudo leer el payload JSON.");

            var clientIp = GetClientIp(req);
            var response = await _contactService.CreateMessageAsync(dto, clientIp);
            var httpResponse = req.CreateResponse(HttpStatusCode.OK);
            await httpResponse.WriteAsJsonAsync(response);
            return httpResponse;
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Error de validación de mensaje de contacto");
            return CreateErrorResponse(req, HttpStatusCode.BadRequest, "Error de validación", ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al enviar mensaje de contacto");
            return CreateErrorResponse(req, HttpStatusCode.InternalServerError, "Error interno del servidor", "Ha ocurrido un error al procesar tu solicitud.");
        }
    }

    private static string GetClientIp(HttpRequestData req)
    {
        if (req.Headers.TryGetValues("X-Forwarded-For", out var values) && values.FirstOrDefault() is { } forwardedIp)
            return forwardedIp.Split(',').FirstOrDefault()?.Trim() ?? "Unknown";

        return "Unknown";
    }

    private static HttpResponseData CreateErrorResponse(HttpRequestData req, HttpStatusCode statusCode, string message, string? details = null)
    {
        var response = req.CreateResponse(statusCode);
        response.Headers.Add("Content-Type", "application/json; charset=utf-8");
        response.WriteString(System.Text.Json.JsonSerializer.Serialize(new ErrorResponseDto
        {
            StatusCode = (int)statusCode,
            Message = message,
            Details = details,
            Timestamp = DateTime.UtcNow
        }), Encoding.UTF8);
        return response;
    }
}
