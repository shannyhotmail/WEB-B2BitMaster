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

    [Function("GetContactMessages")]
    public async Task<HttpResponseData> GetContactMessages(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "contact/messages")] HttpRequestData req)
    {
        try
        {
            var pageNumber = GetQueryInt(req, "pageNumber", 1);
            var pageSize = GetQueryInt(req, "pageSize", 10);
            var response = await _contactService.GetMessagesAsync(pageNumber, pageSize);
            var httpResponse = req.CreateResponse(HttpStatusCode.OK);
            await httpResponse.WriteAsJsonAsync(response);
            return httpResponse;
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Parámetros inválidos para GetContactMessages");
            return CreateErrorResponse(req, HttpStatusCode.BadRequest, "Parámetros inválidos", ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener mensajes de contacto");
            return CreateErrorResponse(req, HttpStatusCode.InternalServerError, "Error interno del servidor", "Ha ocurrido un error al procesar tu solicitud.");
        }
    }

    [Function("GetContactMessageById")]
    public async Task<HttpResponseData> GetContactMessageById(
        [HttpTrigger(AuthorizationLevel.Function, "get", Route = "contact/messages/{id}")] HttpRequestData req,
        int id)
    {
        try
        {
            var message = await _contactService.GetMessageByIdAsync(id);
            if (message == null)
                return CreateErrorResponse(req, HttpStatusCode.NotFound, "Mensaje no encontrado", "No existe un mensaje con el Id especificado.");

            var httpResponse = req.CreateResponse(HttpStatusCode.OK);
            await httpResponse.WriteAsJsonAsync(message);
            return httpResponse;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener mensaje por Id");
            return CreateErrorResponse(req, HttpStatusCode.InternalServerError, "Error interno del servidor", "Ha ocurrido un error al procesar tu solicitud.");
        }
    }

    [Function("UpdateMessageStatus")]
    public async Task<HttpResponseData> UpdateMessageStatus(
        [HttpTrigger(AuthorizationLevel.Function, "put", Route = "contact/messages/{id}/status")] HttpRequestData req,
        int id)
    {
        try
        {
            var dto = await req.ReadFromJsonAsync<UpdateStatusDto>();
            if (dto == null)
                return CreateErrorResponse(req, HttpStatusCode.BadRequest, "El cuerpo de la solicitud es inválido.", "No se pudo leer el payload JSON.");

            var updated = await _contactService.UpdateMessageStatusAsync(id, dto.Status);
            if (!updated)
                return CreateErrorResponse(req, HttpStatusCode.NotFound, "Mensaje no encontrado", "No existe un mensaje con el Id especificado.");

            var httpResponse = req.CreateResponse(HttpStatusCode.OK);
            await httpResponse.WriteAsJsonAsync(new SuccessResponseDto<bool>
            {
                Success = true,
                Message = "Estado actualizado exitosamente",
                Data = true
            });
            return httpResponse;
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning(ex, "Error de validación al actualizar estado");
            return CreateErrorResponse(req, HttpStatusCode.BadRequest, "Error de validación", ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al actualizar estado del mensaje");
            return CreateErrorResponse(req, HttpStatusCode.InternalServerError, "Error interno del servidor", "Ha ocurrido un error al procesar tu solicitud.");
        }
    }

    [Function("DeleteContactMessage")]
    public async Task<HttpResponseData> DeleteContactMessage(
        [HttpTrigger(AuthorizationLevel.Function, "delete", Route = "contact/messages/{id}")] HttpRequestData req,
        int id)
    {
        try
        {
            var deleted = await _contactService.DeleteMessageAsync(id);
            if (!deleted)
                return CreateErrorResponse(req, HttpStatusCode.NotFound, "Mensaje no encontrado", "No existe un mensaje con el Id especificado.");

            var httpResponse = req.CreateResponse(HttpStatusCode.OK);
            await httpResponse.WriteAsJsonAsync(new SuccessResponseDto<bool>
            {
                Success = true,
                Message = "Mensaje eliminado exitosamente",
                Data = true
            });
            return httpResponse;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al eliminar mensaje");
            return CreateErrorResponse(req, HttpStatusCode.InternalServerError, "Error interno del servidor", "Ha ocurrido un error al procesar tu solicitud.");
        }
    }

    private static string GetClientIp(HttpRequestData req)
    {
        if (req.Headers.TryGetValues("X-Forwarded-For", out var values) && values.FirstOrDefault() is { } forwardedIp)
            return forwardedIp.Split(',').FirstOrDefault()?.Trim() ?? "Unknown";

        return "Unknown";
    }

    private static int GetQueryInt(HttpRequestData req, string key, int defaultValue)
    {
        if (string.IsNullOrEmpty(req.Url.Query))
            return defaultValue;

        var queryText = req.Url.Query.TrimStart('?');
        var queryParts = queryText.Split('&', StringSplitOptions.RemoveEmptyEntries);
        foreach (var part in queryParts)
        {
            var pair = part.Split('=', 2);
            if (pair.Length != 2)
                continue;

            if (!string.Equals(pair[0], key, StringComparison.OrdinalIgnoreCase))
                continue;

            if (int.TryParse(Uri.UnescapeDataString(pair[1]), out var value))
                return value;
        }

        return defaultValue;
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
