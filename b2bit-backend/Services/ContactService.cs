using B2BitBackend.DTOs;
using Microsoft.Extensions.Logging;
using System.Text.RegularExpressions;

namespace B2BitBackend.Services;

/// <summary>
/// Implementación del servicio de contacto
/// Valida y sanea la entrada, y notifica por correo cada envío del formulario
/// </summary>
public class ContactService : IContactService
{
    private readonly IEmailService _emailService;
    private readonly ILogger<ContactService> _logger;

    public ContactService(IEmailService emailService, ILogger<ContactService> logger)
    {
        _emailService = emailService;
        _logger = logger;
    }

    /// <summary>
    /// Valida y sanea un nuevo mensaje de contacto, y envía la notificación por correo
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
        var notification = new ContactNotification(
            Name: SanitizeInput(dto.Name),
            Email: SanitizeInput(dto.Email),
            Phone: string.IsNullOrWhiteSpace(dto.Phone) ? null : SanitizeInput(dto.Phone),
            Company: string.IsNullOrWhiteSpace(dto.Company) ? null : SanitizeInput(dto.Company),
            Subject: SanitizeInput(dto.Subject),
            Message: SanitizeInput(dto.Message),
            NumeroEmpleados: string.IsNullOrWhiteSpace(dto.NumeroEmpleados) ? null : SanitizeInput(dto.NumeroEmpleados),
            MotivoContacto: string.IsNullOrWhiteSpace(dto.MotivoContacto) ? null : SanitizeInput(dto.MotivoContacto),
            ClientIp: clientIp);

        await _emailService.SendContactNotificationAsync(notification);

        _logger.LogInformation("Notificación de contacto enviada por correo desde {ClientIp} por {Email}", clientIp, notification.Email);

        return new ContactMessageResponseDto
        {
            Email = notification.Email,
            CreatedAt = DateTime.UtcNow,
            Message = "Mensaje enviado exitosamente. Nos pondremos en contacto pronto."
        };
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
