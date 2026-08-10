using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace B2BitBackend.Services;

/// <summary>
/// Envía notificaciones de contacto por correo vía SMTP autenticado
/// contra el buzón de Microsoft 365 configurado en Smtp:Username.
/// </summary>
public class SmtpEmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<SmtpEmailService> _logger;

    public SmtpEmailService(IConfiguration configuration, ILogger<SmtpEmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public async Task SendContactNotificationAsync(ContactNotification notification)
    {
        var host = _configuration["Smtp:Host"];
        var portRaw = _configuration["Smtp:Port"];
        var username = _configuration["Smtp:Username"];
        var password = _configuration["Smtp:Password"];
        var fromAddress = _configuration["Smtp:FromAddress"];
        var recipientAddress = _configuration["Smtp:RecipientAddress"];

        if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(portRaw) ||
            string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password) ||
            string.IsNullOrWhiteSpace(fromAddress) || string.IsNullOrWhiteSpace(recipientAddress) ||
            !int.TryParse(portRaw, out var port))
        {
            throw new InvalidOperationException(
                "La configuración SMTP (Smtp:Host, Smtp:Port, Smtp:Username, Smtp:Password, " +
                "Smtp:FromAddress, Smtp:RecipientAddress) no está completa.");
        }

        var email = new MimeMessage();
        email.From.Add(MailboxAddress.Parse(fromAddress));
        email.To.Add(MailboxAddress.Parse(recipientAddress));
        email.ReplyTo.Add(MailboxAddress.Parse(notification.Email));
        email.Subject = $"Nuevo contacto web: {notification.Subject}";
        email.Body = new TextPart("plain") { Text = BuildEmailBody(notification) };

        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(host, port, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(username, password);
            await client.SendAsync(email);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Fallo al enviar correo vía SMTP ({Host}:{Port})", host, port);
            throw new InvalidOperationException("No se pudo enviar la notificación por correo.");
        }
        finally
        {
            if (client.IsConnected)
                await client.DisconnectAsync(true);
        }
    }

    private static string BuildEmailBody(ContactNotification n)
    {
        return $"""
            Nuevo mensaje de contacto recibido desde b2bitmaster.com

            Nombre: {n.Name}
            Email: {n.Email}
            Teléfono: {n.Phone ?? "-"}
            Empresa: {n.Company ?? "-"}
            Asunto: {n.Subject}
            Número de empleados: {n.NumeroEmpleados ?? "-"}
            Motivo de contacto: {n.MotivoContacto ?? "-"}

            Mensaje:
            {n.Message}

            IP del remitente: {n.ClientIp}
            """;
    }
}
