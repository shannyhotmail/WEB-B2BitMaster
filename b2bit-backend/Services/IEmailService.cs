namespace B2BitBackend.Services;

/// <summary>
/// Datos saneados de un envío del formulario de contacto, listos para notificar por correo
/// </summary>
public record ContactNotification(
    string Name,
    string Email,
    string? Phone,
    string? Company,
    string Subject,
    string Message,
    string? NumeroEmpleados,
    string? MotivoContacto,
    string ClientIp);

/// <summary>
/// Servicio de envío de notificaciones por correo
/// </summary>
public interface IEmailService
{
    /// <summary>
    /// Envía una notificación por correo con los datos de un mensaje de contacto
    /// </summary>
    Task SendContactNotificationAsync(ContactNotification notification);
}
