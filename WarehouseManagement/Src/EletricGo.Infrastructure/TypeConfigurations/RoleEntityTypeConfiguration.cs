using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EletricGo.Infrastructure.TypeConfigurations;

public class RoleEntityTypeConfiguration : IEntityTypeConfiguration<Role>
{
    public void Configure(EntityTypeBuilder<Role> builder)
    {
        // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

        builder.HasKey(e => e.Id);

        builder.Property(e => e.Id)
            .ValueGeneratedNever() // generate manually
            .IsRequired();

        builder.Property(e => e.Name)
            .IsRequired();
    }
}