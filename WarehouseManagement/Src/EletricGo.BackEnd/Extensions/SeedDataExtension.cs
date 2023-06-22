using System.Diagnostics.CodeAnalysis;
using EletricGo.Infrastructure;
using EletricGo.Infrastructure.EF;

namespace EletricGo.BackEnd.Extensions;

/// <summary>
/// Extension class to seed data on database.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class SeedDataExtension
{
    /// <summary>
    /// Seeds the data for the database.
    /// </summary>
    /// <param name="app">The application builder.</param>
    /// <returns>The application builder.</returns>
    public static IApplicationBuilder SeedData(this IApplicationBuilder app)
    {
        _ = app ?? throw new ArgumentNullException($"{nameof(app)} cannot be null.");

        try
        {
            using var scope = app.ApplicationServices.CreateScope();
            var services = scope.ServiceProvider;

            var context = services.GetRequiredService<EletricGoDbContext>();
            DbContextSeedData.SeedData(context);
        }
        catch (Exception ex)
        {

        }

        return app;
    }
}
