namespace B2BitBackend.DTOs;

/// <summary>
/// DTO para crear un mensaje de contacto
/// Valida la entrada del cliente antes de procesarla
/// </summary>
public class CreateContactMessageDto
{
    /// <summary>
    /// Nombre completo del remitente
    /// </summary>
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Correo electrónico del remitente
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
    /// Asunto del mensaje
    /// </summary>
    public string Subject { get; set; } = string.Empty;

    /// <summary>
    /// Contenido del mensaje
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Número aproximado de empleados (opcional, usado por el formulario de /diagnostico-ia)
    /// </summary>
    public string? NumeroEmpleados { get; set; }

    /// <summary>
    /// Motivo de contacto (opcional, usado por el formulario de /diagnostico-ia)
    /// </summary>
    public string? MotivoContacto { get; set; }
}

/// <summary>
/// DTO para respuesta de creación de mensaje
/// </summary>
public class ContactMessageResponseDto
{
    /// <summary>
    /// Mensaje de éxito
    /// </summary>
    public string Message { get; set; } = "Mensaje enviado exitosamente";

    /// <summary>
    /// Correo del remitente
    /// </summary>
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// Fecha de creación
    /// </summary>
    public DateTime CreatedAt { get; set; }
}
