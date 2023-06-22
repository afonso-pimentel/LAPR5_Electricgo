using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EletricGo.Infrastructure.TypeConfigurations;

/// <summary>
/// Implements the <see cref="IEntityTypeConfiguration"/>
/// </summary>
public sealed class WarehouseEntityTypeConfiguration : IEntityTypeConfiguration<Warehouse>
{
    /// <summary>
    /// Configures the current model builder.
    /// </summary>
    /// <param name="builder">The model builder.</param>
    public void Configure(EntityTypeBuilder<Warehouse> builder)
    {
        builder.HasKey(b => b.Id);

        builder.OwnsOne(o => o.Code);
        builder.OwnsOne(o => o.Address);
        builder.OwnsOne(o => o.Designation);
        builder.OwnsOne(o => o.Coordinates);
    }
}