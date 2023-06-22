using System.Diagnostics.CodeAnalysis;

namespace EletricGo.BackEnd.Configurations;

/// <summary>
/// Configuration class for the configuration of the appsettings files.
/// </summary>
[ExcludeFromCodeCoverage]
internal static class ConfigureAppSettings
{
    /// <summary>
    /// Configures app settings files.
    /// </summary>
    /// <param name="context">The host builder context.</param>
    /// <param name="config">The configuration builder.</param>
    public static void ConfigureAppConfiguration(HostBuilderContext context, IConfigurationBuilder config)
    {
        _ = context ?? throw new ArgumentNullException($"{nameof(context)} cannot be null.");
        _ = config ?? throw new ArgumentNullException($"{nameof(config)} cannot be null.");

        config.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .AddJsonFile($"appsettings.{context.HostingEnvironment.EnvironmentName}.json", optional: true, reloadOnChange: true);

        config.AddEnvironmentVariables();
    }
}

