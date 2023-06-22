using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace EletricGo.Infrastructure.TypeConfigurations;

public class UserEntityTypeConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx
        
        builder.HasKey(b => b.Id);
        builder.OwnsOne(o => o.PhoneNumber);
        builder.OwnsOne(o => o.Email);
        builder.HasOne(o => o.Role)
            .WithMany()
            .HasForeignKey("RoleId")
            .IsRequired();
        builder.OwnsOne(o => o.GoogleId);
    }
}