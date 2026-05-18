using B2BitBackend.Models;
using B2BitBackend.DTOs;

namespace B2BitBackend.Services;

/// <summary>
/// Interfaz para el servicio de contacto
/// Define las operaciones disponibles para mensajes de contacto
/// </summary>
public interface IContactService
{
    /// <summary>
    /// Crea un nuevo mensaje de contacto
    /// </summary>
    /// <param name="dto">DTO con los datos del mensaje</param>
    /// <param name="clientIp">IP del cliente</param>
    /// <returns>DTO con la respuesta</returns>
    Task<ContactMessageResponseDto> CreateMessageAsync(CreateContactMessageDto dto, string clientIp);

    /// <summary>
    /// Obtiene todos los mensajes de contacto
    /// </summary>
    /// <param name="pageNumber">Número de página</param>
    /// <param name="pageSize">Tamaño de página</param>
    /// <returns>Lista paginada de mensajes</returns>
    Task<PaginatedResponseDto<ContactMessageListDto>> GetMessagesAsync(int pageNumber, int pageSize);

    /// <summary>
    /// Obtiene un mensaje específico
    /// </summary>
    /// <param name="id">Id del mensaje</param>
    /// <returns>Detalles del mensaje</returns>
    Task<ContactMessage?> GetMessageByIdAsync(int id);

    /// <summary>
    /// Actualiza el estado de un mensaje
    /// </summary>
    /// <param name="id">Id del mensaje</param>
    /// <param name="status">Nuevo estado</param>
    /// <returns>True si fue actualizado exitosamente</returns>
    Task<bool> UpdateMessageStatusAsync(int id, string status);

    /// <summary>
    /// Elimina un mensaje
    /// </summary>
    /// <param name="id">Id del mensaje</param>
    /// <returns>True si fue eliminado exitosamente</returns>
    Task<bool> DeleteMessageAsync(int id);
}
