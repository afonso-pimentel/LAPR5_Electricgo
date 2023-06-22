using EletricGo.BackEnd.Authentication;
using EletricGo.BackEnd.Configurations;
using EletricGo.BackEnd.Extensions;
using EletricGo.BackEnd.Infrastructure;
using EletricGo.Infrastructure;
using Hellang.Middleware.ProblemDetails;

var builder = WebApplication.CreateBuilder(args);
{
    // Add services to the container.
    builder.Services.AddApi()
                    .AddInfraestructure(builder.Configuration.GetConnectionString("EletricGoDB"));

    builder.Services.AddProblemDetails();

    builder.Host.ConfigureAppConfiguration(ConfigureAppSettings.ConfigureAppConfiguration);
}

var app = builder.Build();
{
    app.SeedData();

    app.UseProblemDetails();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();

    app.UseMiddleware<JwtMiddleware>();

    app.MapControllers();

    app.UseCors(builder => builder
     .AllowAnyOrigin()
     .AllowAnyMethod()
     .AllowAnyHeader());

    app.Run();
}

