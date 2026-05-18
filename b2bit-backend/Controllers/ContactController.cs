using Microsoft.AspNetCore.Mvc;
using B2BitBackend.Services;
using B2BitBackend.DTOs;
using B2BitBackend.Models;

namespace B2BitBackend.Controllers;

/// <summary>
/// Controlador de Contacto
/// Maneja las peticiones relacionadas con mensajes de contacto
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactService _contactService;
    private readonly ILogger<ContactController> _logger;

    public ContactController(IContactService contactService, ILogger<ContactController> logger)
    {
        _contactService = contactService;
        _logger = logger;
    }

    /// <summary>
    /// Envía un nuevo mensaje de contacto
    /// POST: api/contact/send-message
    /// </summary>
    /// <param name="dto">Datos del mensaje de contacto</param>
    /// <returns>Respuesta con confirmación del envío</returns>
    [HttpPost("send-message")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ContactMessageResponseDto>> SendMessage([FromBody] CreateContactMessageDto dto)
    {
        try
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Obtiene la IP del cliente para auditoría
            var clientIp = HttpContext.Connection.RemoteIpAddress?.ToString() ?? "Unknown";

            var response = await _contactService.CreateMessageAsync(dto, clientIp);
            
            _logger.LogInformation($"Mensaje de contacto enviado desde {clientIp}");

            return Ok(response);
        }
        catch (ArgumentException ex)
        {
            _logger.LogWarning($"Error de validación: {ex.Message}");
            return BadRequest(new ErrorResponseDto
            {
                StatusCode = 400,
                Message = "Error de validación",
                Details = ex.Message
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al procesar mensaje de contacto");
            return StatusCode(500, new ErrorResponseDto
            {
                StatusCode = 500,
                Message = "Error interno del servidor",
                Details = "Ha ocurrido un error al procesar tu solicitud. Por favor, intenta de nuevo."
            });
        }
    }

    /// <summary>
    /// Obtiene la lista de mensajes de contacto (requiere autenticación de administrador)
    /// GET: api/contact/messages?pageNumber=1&pageSize=10
    /// </summary>
    /// <param name="pageNumber">Número de página</param>
    /// <param name="pageSize">Tamaño de página</param>
    /// <returns>Lista paginada de mensajes</returns>
    [HttpGet("messages")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<PaginatedResponseDto<ContactMessageListDto>>> GetMessages(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10)
    {
        try
        {
            var response = await _contactService.GetMessagesAsync(pageNumber, pageSize);
            return Ok(response);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ErrorResponseDto
            {
                StatusCode = 400,
                Message = "Parámetros inválidos",
                Details = ex.Message
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener mensajes");
            return StatusCode(500, new ErrorResponseDto
            {
                StatusCode = 500,
                Message = "Error interno del servidor"
            });
        }
    }

    /// <summary>
    /// Obtiene un mensaje específico
    /// GET: api/contact/messages/{id}
    /// </summary>
    /// <param name="id">Id del mensaje</param>
    /// <returns>Detalles del mensaje</returns>
    [HttpGet("messages/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ContactMessage>> GetMessageById(int id)
    {
        try
        {
            var message = await _contactService.GetMessageByIdAsync(id);
            if (message == null)
                return NotFound(new ErrorResponseDto
                {
                    StatusCode = 404,
                    Message = "Mensaje no encontrado"
                });

            return Ok(message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al obtener mensaje");
            return StatusCode(500, new ErrorResponseDto
            {
                StatusCode = 500,
                Message = "Error interno del servidor"
            });
        }
    }

    /// <summary>
    /// Actualiza el estado de un mensaje
    /// PUT: api/contact/messages/{id}/status
    /// </summary>
    /// <param name="id">Id del mensaje</param>
    /// <param name="status">Nuevo estado</param>
    /// <returns>Confirmación de actualización</returns>
    [HttpPut("messages/{id}/status")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<SuccessResponseDto<bool>>> UpdateMessageStatus(int id, [FromBody] UpdateStatusDto dto)
    {
        try
        {
            var updated = await _contactService.UpdateMessageStatusAsync(id, dto.Status);
            if (!updated)
                return NotFound(new ErrorResponseDto
                {
                    StatusCode = 404,
                    Message = "Mensaje no encontrado"
                });

            return Ok(new SuccessResponseDto<bool>
            {
                Success = true,
                Message = "Estado actualizado exitosamente",
                Data = true
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(new ErrorResponseDto
            {
                StatusCode = 400,
                Message = "Error de validación",
                Details = ex.Message
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al actualizar estado del mensaje");
            return StatusCode(500, new ErrorResponseDto
            {
                StatusCode = 500,
                Message = "Error interno del servidor"
            });
        }
    }

    /// <summary>
    /// Elimina un mensaje
    /// DELETE: api/contact/messages/{id}
    /// </summary>
    /// <param name="id">Id del mensaje</param>
    /// <returns>Confirmación de eliminación</returns>
    [HttpDelete("messages/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<SuccessResponseDto<bool>>> DeleteMessage(int id)
    {
        try
        {
            var deleted = await _contactService.DeleteMessageAsync(id);
            if (!deleted)
                return NotFound(new ErrorResponseDto
                {
                    StatusCode = 404,
                    Message = "Mensaje no encontrado"
                });

            return Ok(new SuccessResponseDto<bool>
            {
                Success = true,
                Message = "Mensaje eliminado exitosamente",
                Data = true
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error al eliminar mensaje");
            return StatusCode(500, new ErrorResponseDto
            {
                StatusCode = 500,
                Message = "Error interno del servidor"
            });
        }
    }

    /// <summary>
    /// Health check del endpoint de contacto
    /// GET: api/contact/health
    /// </summary>
    /// <returns>Estado del servicio</returns>
    [HttpGet("health")]
    public ActionResult<SuccessResponseDto<string>> Health()
    {
        return Ok(new SuccessResponseDto<string>
        {
            Success = true,
            Message = "Servicio de contacto disponible",
            Data = "OK"
        });
    }
}

/// <summary>
/// DTO para actualizar estado de mensaje
/// </summary>
public class UpdateStatusDto
{
    /// <summary>
    /// Nuevo estado
    /// </summary>
    public string Status { get; set; } = string.Empty;
}
