using B2BitBackend.DTOs;

namespace B2BitBackend.Services;

/// <summary>
/// Interfaz para el servicio de contacto
/// Define las operaciones disponibles para mensajes de contacto
/// </summary>
public interface IContactService
{
    /// <summary>
    /// Procesa un nuevo mensaje de contacto y notifica por correo
    /// </summary>
    /// <param name="dto">DTO con los datos del mensaje</param>
    /// <param name="clientIp">IP del cliente</param>
    /// <returns>DTO con la respuesta</returns>
    Task<ContactMessageResponseDto> CreateMessageAsync(CreateContactMessageDto dto, string clientIp);
}
