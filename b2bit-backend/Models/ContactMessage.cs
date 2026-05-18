namespace B2BitBackend.Models;

/// <summary>
/// Modelo de Mensaje de Contacto
/// Almacena información de contacto enviada desde el formulario de la aplicación
/// </summary>
public class ContactMessage
{
    /// <summary>
    /// Id único del mensaje
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Nombre completo del remitente
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Correo electrónico del remitente (campo obligatorio, validado)
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Teléfono del remitente (opcional)
    /// </summary>
    public string? Phone { get; set; }

    /// <summary>
    /// Empresa del remitente (opcional)
    /// </summary>
    public string? Company { get; set; }

    /// <summary>
    /// Asunto del mensaje (puede ser: tai, tas, consultation, partnership, other)
    /// </summary>
    public string Subject { get; set; } = string.Empty;

    /// <summary>
    /// Contenido del mensaje
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Estado del mensaje (new, read, responded, closed)
    /// </summary>
    public string Status { get; set; } = "new";

    /// <summary>
    /// Fecha y hora de creación del mensaje
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Fecha y hora de la última actualización
    /// </summary>
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// IP del cliente que envió el mensaje (para auditoría y seguridad)
    /// </summary>
    public string? ClientIp { get; set; }
}
