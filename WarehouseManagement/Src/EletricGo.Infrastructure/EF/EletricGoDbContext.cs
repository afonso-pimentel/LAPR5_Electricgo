using System.Reflection.Metadata;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Infrastructure.TypeConfigurations;
using Microsoft.EntityFrameworkCore;

namespace EletricGo.Infrastructure.EF;

/// <summary>
/// Database context for EletricGo database.
/// </summary>
public sealed class EletricGoDbContext : DbContext
{
    /// <summary>
    /// Delivery entities.
    /// </summary>
    public DbSet<Delivery> Deliveries { get; set; }

    /// <summary>
    /// Warehouse entities.
    /// </summary>
    public DbSet<Warehouse> Warehouses { get; set; }

    /// <summary>
    /// User entities.
    /// </summary>
    public DbSet<User> Users{ get; set; }

    /// <summary>
    /// Initializes a new instance of <see cref="EletricGoDbContext"/>
    /// </summary>
    /// <param name="options">The database context options.</param>
    public EletricGoDbContext(DbContextOptions options) : base(options) {
        this.Database.EnsureCreated();
    }

    /// <summary>
    /// Actions to be taken when model creation is being performed.
    /// </summary>
    /// <param name="modelBuilder">The model builder.</param>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new DeliveryEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new WarehouseEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new UserEntityTypeConfiguration());
        modelBuilder.ApplyConfiguration(new RoleEntityTypeConfiguration());
    }
}