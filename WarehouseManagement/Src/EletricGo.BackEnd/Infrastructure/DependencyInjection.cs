using Mapster;
using MapsterMapper;
using System.Reflection;
using EletricGo.BackEnd.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Diagnostics.SymbolStore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace EletricGo.BackEnd.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddApi(this IServiceCollection services)
    {
        var configTA = TypeAdapterConfig.GlobalSettings;
        configTA.Scan(Assembly.GetExecutingAssembly());

        services.AddSingleton(configTA);
        services.AddScoped<IMapper, ServiceMapper>();

        //Add Services
        services.AddScoped<IDeliveryService, DeliveryService>();
        services.AddScoped<IWarehouseService, WarehouseService>();
        services.AddScoped<IUserService, UserService>();

        services.AddControllers().AddNewtonsoftJson();

        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        return services;
    }
}