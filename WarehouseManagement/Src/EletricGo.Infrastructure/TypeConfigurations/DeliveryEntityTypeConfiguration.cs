using EletricGo.Domain.Models.DeliveryAggregate;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EletricGo.Infrastructure.TypeConfigurations;

public class DeliveryEntityTypeConfiguration : IEntityTypeConfiguration<Delivery>
{
    public void Configure(EntityTypeBuilder<Delivery> builder)
    {
        // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

        builder.HasKey(b => b.Id);
        builder.OwnsOne(o => o.Load);
    }
}