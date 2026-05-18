using Microsoft.EntityFrameworkCore;
using B2BitBackend.Models;

namespace B2BitBackend.Data;

/// <summary>
/// Contexto de base de datos para la aplicación b2bit
/// Gestiona las entidades y la configuración de Entity Framework Core
/// </summary>
public class B2BitDbContext : DbContext
{
    /// <summary>
    /// Constructor que recibe las opciones de DbContext
    /// </summary>
    /// <param name="options">Opciones de configuración del DbContext</param>
    public B2BitDbContext(DbContextOptions<B2BitDbContext> options)
        : base(options)
    {
    }

    /// <summary>
    /// DbSet para los mensajes de contacto
    /// </summary>
    public DbSet<ContactMessage> ContactMessages { get; set; } = null!;

    /// <summary>
    /// Configuración del modelo
    /// </summary>
    /// <param name="modelBuilder">Constructor del modelo</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configuración de la entidad ContactMessage
        modelBuilder.Entity<ContactMessage>(entity =>
        {
            entity.HasKey(e => e.Id);

            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(e => e.Phone)
                .HasMaxLength(20);

            entity.Property(e => e.Company)
                .HasMaxLength(100);

            entity.Property(e => e.Subject)
                .IsRequired()
                .HasMaxLength(100);

            entity.Property(e => e.Message)
                .IsRequired()
                .HasMaxLength(5000);

            entity.Property(e => e.Status)
                .IsRequired()
                .HasMaxLength(20)
                .HasDefaultValue("new");

            entity.Property(e => e.ClientIp)
                .HasMaxLength(45);

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("GETUTCDATE()");

            // Índices para búsquedas comunes
            entity.HasIndex(e => e.Email);
            entity.HasIndex(e => e.CreatedAt);
            entity.HasIndex(e => e.Status);
        });
    }
}
