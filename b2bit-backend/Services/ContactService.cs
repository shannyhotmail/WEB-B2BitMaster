using B2BitBackend.Models;
using B2BitBackend.DTOs;
using B2BitBackend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Text.RegularExpressions;

namespace B2BitBackend.Services;

/// <summary>
/// Implementación del servicio de contacto
/// Gestiona la creación, lectura y gestión de mensajes de contacto
/// Incluye validación y sanitización de entrada
/// </summary>
public class ContactService : IContactService
{
    private readonly B2BitDbContext _context;
    private readonly ILogger<ContactService> _logger;

    public ContactService(B2BitDbContext context, ILogger<ContactService> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Crea un nuevo mensaje de contacto con validación
    /// Previene inyecciones XSS sanitizando la entrada
    /// </summary>
    public async Task<ContactMessageResponseDto> CreateMessageAsync(CreateContactMessageDto dto, string clientIp)
    {
        // Validación de entrada
        if (string.IsNullOrWhiteSpace(dto.Name) || dto.Name.Length > 100)
            throw new ArgumentException("El nombre es requerido y debe tener máximo 100 caracteres");

        if (string.IsNullOrWhiteSpace(dto.Email) || !IsValidEmail(dto.Email))
            throw new ArgumentException("El correo electrónico es inválido");

        if (string.IsNullOrWhiteSpace(dto.Subject) || dto.Subject.Length > 100)
            throw new ArgumentException("El asunto es requerido y debe tener máximo 100 caracteres");

        if (string.IsNullOrWhiteSpace(dto.Message) || dto.Message.Length < 10 || dto.Message.Length > 5000)
            throw new ArgumentException("El mensaje debe tener entre 10 y 5000 caracteres");

        // Sanitización de entrada (prevención de XSS)
        var sanitizedMessage = new ContactMessage
        {
            Name = SanitizeInput(dto.Name),
            Email = SanitizeInput(dto.Email),
            Phone = string.IsNullOrWhiteSpace(dto.Phone) ? null : SanitizeInput(dto.Phone),
            Company = string.IsNullOrWhiteSpace(dto.Company) ? null : SanitizeInput(dto.Company),
            Subject = SanitizeInput(dto.Subject),
            Message = SanitizeInput(dto.Message),
            ClientIp = clientIp,
            Status = "new",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.ContactMessages.Add(sanitizedMessage);
        await _context.SaveChangesAsync();

        _logger.LogInformation($"Nuevo mensaje de contacto creado desde {clientIp} por {sanitizedMessage.Email}");

        return new ContactMessageResponseDto
        {
            Id = sanitizedMessage.Id,
            Email = sanitizedMessage.Email,
            CreatedAt = sanitizedMessage.CreatedAt,
            Message = "Mensaje enviado exitosamente. Nos pondremos en contacto pronto."
        };
    }

    /// <summary>
    /// Obtiene todos los mensajes con paginación
    /// </summary>
    public async Task<PaginatedResponseDto<ContactMessageListDto>> GetMessagesAsync(int pageNumber, int pageSize)
    {
        if (pageNumber < 1 || pageSize < 1)
            throw new ArgumentException("Page number y page size deben ser mayores a 0");

        var totalCount = await _context.ContactMessages.CountAsync();
        
        var messages = await _context.ContactMessages
            .OrderByDescending(m => m.CreatedAt)
            .Skip((pageNumber - 1) * pageSize)
            .Take(pageSize)
            .Select(m => new ContactMessageListDto
            {
                Id = m.Id,
                Name = m.Name,
                Email = m.Email,
                Subject = m.Subject,
                Status = m.Status,
                CreatedAt = m.CreatedAt
            })
            .ToListAsync();

        return new PaginatedResponseDto<ContactMessageListDto>
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = totalCount,
            Items = messages
        };
    }

    /// <summary>
    /// Obtiene un mensaje específico
    /// </summary>
    public async Task<ContactMessage?> GetMessageByIdAsync(int id)
    {
        return await _context.ContactMessages.FirstOrDefaultAsync(m => m.Id == id);
    }

    /// <summary>
    /// Actualiza el estado de un mensaje
    /// </summary>
    public async Task<bool> UpdateMessageStatusAsync(int id, string status)
    {
        var validStatuses = new[] { "new", "read", "responded", "closed" };
        if (!validStatuses.Contains(status))
            throw new ArgumentException("Estado inválido");

        var message = await _context.ContactMessages.FindAsync(id);
        if (message == null)
            return false;

        message.Status = status;
        message.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return true;
    }

    /// <summary>
    /// Elimina un mensaje
    /// </summary>
    public async Task<bool> DeleteMessageAsync(int id)
    {
        var message = await _context.ContactMessages.FindAsync(id);
        if (message == null)
            return false;

        _context.ContactMessages.Remove(message);
        await _context.SaveChangesAsync();

        return true;
    }

    /// <summary>
    /// Valida un correo electrónico
    /// </summary>
    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email && email.Length <= 100;
        }
        catch
        {
            return false;
        }
    }

    /// <summary>
    /// Sanitiza la entrada para prevenir inyecciones XSS
    /// </summary>
    private string SanitizeInput(string input)
    {
        if (string.IsNullOrWhiteSpace(input))
            return input;

        // Remueve caracteres peligrosos
        input = Regex.Replace(input, @"[<>""']", "");
        return input.Trim();
    }
}
