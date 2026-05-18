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

/// <summary>
/// DTO para respuestas genéricas de éxito
/// </summary>
public class SuccessResponseDto<T>
{
    /// <summary>
    /// Indica si la operación fue exitosa
    /// </summary>
    public bool Success { get; set; } = true;

    /// <summary>
    /// Mensaje de éxito
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Datos de la respuesta
    /// </summary>
    public T? Data { get; set; }

    /// <summary>
    /// Timestamp de la respuesta
    /// </summary>
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}

/// <summary>
/// DTO para respuestas paginadas
/// </summary>
public class PaginatedResponseDto<T>
{
    /// <summary>
    /// Página actual
    /// </summary>
    public int PageNumber { get; set; }

    /// <summary>
    /// Tamaño de página
    /// </summary>
    public int PageSize { get; set; }

    /// <summary>
    /// Total de registros
    /// </summary>
    public int TotalCount { get; set; }

    /// <summary>
    /// Total de páginas
    /// </summary>
    public int TotalPages => (TotalCount + PageSize - 1) / PageSize;

    /// <summary>
    /// Datos de la página
    /// </summary>
    public List<T> Items { get; set; } = new();

    /// <summary>
    /// Indica si hay página siguiente
    /// </summary>
    public bool HasNextPage => PageNumber < TotalPages;

    /// <summary>
    /// Indica si hay página anterior
    /// </summary>
    public bool HasPreviousPage => PageNumber > 1;
}
