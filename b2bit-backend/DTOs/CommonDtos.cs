namespace B2BitBackend.DTOs;

/// <summary>
/// DTO para respuestas de error API
/// </summary>
public class ErrorResponseDto
{
    /// <summary>
    /// Código de estado HTTP
    /// </summary>
    public int StatusCode { get; set; }

    /// <summary>
    /// Mensaje de error
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Detalles adicionales del error
    /// </summary>
    public string? Details { get; set; }

    /// <summary>
    /// Timestamp del error
    /// </summary>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

