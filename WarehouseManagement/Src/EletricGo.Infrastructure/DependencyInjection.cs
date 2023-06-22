using System.Diagnostics.CodeAnalysis;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using EletricGo.Infrastructure.EF;
using EletricGo.Infrastructure.Repositories;
using EletricGo.Infrastructure.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.DependencyInjection;

namespace EletricGo.Infrastructure;

/// <summary>
/// Dependency injection module for the infrastructure project.
/// </summary>
[ExcludeFromCodeCoverage]
public static class DependencyInjection
{
    public static IServiceCollection AddInfraestructure(this IServiceCollection services, string connetionString)
    {
        _ = services ?? throw new ArgumentNullException($"{nameof(services)} cannot be null");

#if !DEBUG
        if (string.IsNullOrEmpty(connetionString))
            throw new ArgumentException($"{nameof(connetionString)} cannot be null or empty");

#endif

        services.AddDbContext<EletricGoDbContext>(opt =>
#if DEBUG
               opt.UseInMemoryDatabase(SchemaNames.EletricGo)
#else
               opt.UseSqlServer(connetionString)
#endif
               .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>()); ;

        services.AddTransient<IUnitOfWork, UnitOfWork>();

        //Add Repository Dependencies Example:
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IDeliveryRepository, DeliveryRepository>();
        services.AddScoped<IWarehouseRepository, WarehouseRepository>();

        return services;
    }
}

/// <summary>
/// Database seed data inialization class.
/// </summary>
[ExcludeFromCodeCoverage]
public static class DbContextSeedData
{
    /// <summary>
    /// Seeds the database with initial data.
    /// </summary>
    /// <param name="context">The database context.</param>
    /// <returns>A task that is completed when the seed data has been added.</returns>
    public static Task SeedData(EletricGoDbContext context)
    {
        _ = context ?? throw new ArgumentNullException($"{nameof(context)} cannot be null.");

        foreach (Warehouse warehouse in GetSeedDataForWarehouses())
        {
            // only add warehouses that have not been registered yet
            if (context.Warehouses.SingleOrDefault(x => x.Code.Value.Equals(warehouse.Code.Value)) is null)
                context.Warehouses.Add(warehouse);
        }

        foreach (Delivery delivery in GetSeedDataForDeliveries())
        {
            if (context.Deliveries.SingleOrDefault(x => x.Id.Value.Equals(delivery.Id)) is null)
                context.Deliveries.Add(delivery);
        }

        foreach (User user in GetSeedDataForUsers())
        {
            if (context.Users.SingleOrDefault(x => x.Id.Value.Equals(user.Id)) is null)
                context.Users.Add(user);
        }

        return context.SaveChangesAsync();
    }

    private static IList<Delivery> GetSeedDataForDeliveries()
    {
        var seedDataDeliveries = new List<Delivery>();

        seedDataDeliveries.Add(new Delivery(new DeliveryId("8e412c75-e29e-4dde-8b5d-4993c9a0336d"), DateTime.Now.AddDays(1), new Load(2000), new WarehouseId("00e6e562-683e-4057-af59-24b35c6ce09a")));
        seedDataDeliveries.Add(new Delivery(new DeliveryId("f52f2735-caff-45ae-a210-54370a80800f"), DateTime.Now.AddDays(1), new Load(1500), new WarehouseId("c2b7777d-6ba1-40c4-9fbe-470ddc165393")));
        seedDataDeliveries.Add(new Delivery(new DeliveryId("d8408472-0758-4195-ad5d-41a55f4cd256"), DateTime.Now.AddDays(1), new Load(1000), new WarehouseId("fcdf630f-c87e-4c16-9ccf-b01632793549")));
        seedDataDeliveries.Add(new Delivery(new DeliveryId("47fb76c8-6a38-4742-a991-00d374221e7b"), DateTime.Now.AddDays(1), new Load(1200), new WarehouseId("ef6ff355-bdb1-4c10-b5ad-6d45bf1ab958")));
        seedDataDeliveries.Add(new Delivery(new DeliveryId("aeba6553-d915-42ef-82d0-a0a528b5ac54"), DateTime.Now.AddDays(1), new Load(300), new WarehouseId("68699020-a01e-4b50-bb19-8e041f6d1a75")));
        seedDataDeliveries.Add(new Delivery(new DeliveryId("10f1bcbb-a370-4040-9461-6ce184a918ce"), DateTime.Now.AddDays(1), new Load(300), new WarehouseId("bc6b0307-3531-42f2-864d-9f5d74b13789")));
        seedDataDeliveries.Add(new Delivery(new DeliveryId("872a025e-2d6f-4e06-b159-52f4757d7a06"), DateTime.Now.AddDays(1), new Load(300), new WarehouseId("ed904a97-3463-4b08-aea7-cb28d743f3c7")));

        return seedDataDeliveries;
    }

    private static IList<Warehouse> GetSeedDataForWarehouses()
    {
        var seedDataWarehouses = new List<Warehouse>
        {
            new Warehouse(new WarehouseId("00e6e562-683e-4057-af59-24b35c6ce09a"), new Address("PRAÇA DO MUNICÍPIO", "243", "4544-001", "Arouca"),
            new Coordinates(40.9321m, -8.2451m, 250), new Designation("Armazém em Arouca"), new WarehouseCode("A01"), true),

            new Warehouse(new WarehouseId("55f19d94-4793-44ff-9201-49368115f1fa"), new Address("LG. JOSÉ SALVADOR", "111", "4501-901", "Espinho"),
            new Coordinates(41.0072m, -8.641m, 550), new Designation("Armazém em Espinho"), new WarehouseCode("A02"), true),
            
            new Warehouse(new WarehouseId("fcdf630f-c87e-4c16-9ccf-b01632793549"), new Address("PRAÇA MANUEL GUEDES", "503", "4420-193", "Gondomar"),
            new Coordinates(42.1115m, -8.7613m, 200), new Designation("Armazém em Gondomar"), new WarehouseCode("A03"), true),
            
            new Warehouse(new WarehouseId("fcfc1999-16b0-4ee5-b4d3-17969680cee5"), new Address("PRAÇA DO MUNICÍPIO", "503", "4470-202", "Maia"),
            new Coordinates(41.2279m, -8.621m, 700), new Designation("Armazém em Maia"), new WarehouseCode("A04"), true),
            
            new Warehouse(new WarehouseId("ec5b7755-fb6d-4689-814f-061c94c3c92a"), new Address("AV. D. AFONSO HENRIQUES", "503", "4450-510", "Matosinhos"),
            new Coordinates(41.1844m, -8.6963m, 350), new Designation("Armazém em Matosinhos"), new WarehouseCode("A05"), true),
            
            new Warehouse(new WarehouseId("43c81b97-bcfa-42c3-81ba-300de00719b0"), new Address("PRAÇA DA REPÚBLICA", "503", "3720-240", "Oliveira de Azemeis"),
            new Coordinates(40.8387m, -8.477m, 750), new Designation("Armazém em Oliveira de Azemeis"), new WarehouseCode("A06"), true),
            
            new Warehouse(new WarehouseId("ceb40bc3-e183-4c38-9c0c-8da3d06b96f4"), new Address("PRAÇA JOSÉ GUILHERME", "503", "4580-229", "Paredes"),
            new Coordinates(41.252m, -8.3304m, 0), new Designation("Armazém em Paredes"), new WarehouseCode("A07"), true),
            
            new Warehouse(new WarehouseId("ef6ff355-bdb1-4c10-b5ad-6d45bf1ab958"), new Address("PRAÇA GENERAL HUMBERTO DELGADO", "503", "4049-001", "Porto"),
            new Coordinates(41.1579m, -8.6291m, 600), new Designation("Armazém em Porto"), new WarehouseCode("A08"), true),
            
            new Warehouse(new WarehouseId("c2b7777d-6ba1-40c4-9fbe-470ddc165393"), new Address("PRAÇA DO ALMADA", "503", "4490-438", "Povoa de Varzim"),
            new Coordinates(41.3804m, -8.7609m, 400), new Designation("Armazém em Povoa de Varzim"), new WarehouseCode("A09"), true),
            
            new Warehouse(new WarehouseId("7d27a83d-3669-4c19-be65-98e83ad8d2dc"), new Address("PRAÇA DA REPÚBLICA", "503", "4490-438", "Santa Maria da Feira"),
            new Coordinates(40.9268m, -8.5483m, 100), new Designation("Armazém em Santa Maria da Feira"), new WarehouseCode("A10"), true),
            
            new Warehouse(new WarehouseId("68699020-a01e-4b50-bb19-8e041f6d1a75"), new Address("PRAÇA 25 DE ABRIL", "503", "4780-373", "Santo Tirso"),
            new Coordinates(41.3431m, -8.4738m, 650), new Designation("Armazém em Santo Tirso"), new WarehouseCode("A11"), true),
            
            new Warehouse(new WarehouseId("cfcd1543-47f1-43e0-9981-ce009edaf720"), new Address("AV. DA LIBERDADE", "503", "3700-956", "Sao Joao da Madeira"),
            new Coordinates(40.905m, -8.4907m, 300), new Designation("Armazém em Sao Joao da Madeira"), new WarehouseCode("A12"), true),
            
            new Warehouse(new WarehouseId("ab949c29-557e-4e4d-9507-460280028f37"), new Address("RUA DAS INDUSTRIAS", "503", "4785-624", "Trofa"),
            new Coordinates(41.3391m, -8.56m, 450), new Designation("Armazém em Trofa"), new WarehouseCode("A13"), true),
            
            new Warehouse(new WarehouseId("abe30730-8acc-48d8-ab63-6c83190b8d81"), new Address("Av. CAMILO TAVARES DE MATOS", "503", "3730-901", "Vale de Cambra"),
            new Coordinates(40.8430m, -8.3956m, 50), new Designation("Armazém em Vale de Cambra"), new WarehouseCode("A14"), true),
            
            new Warehouse(new WarehouseId("ed904a97-3463-4b08-aea7-cb28d743f3c7"), new Address("AV. 5 DE OUTUBRO", "503", "4440-503", "Valongo"),
            new Coordinates(41.1887m, -8.4983m, 800), new Designation("Armazém em Valongo"), new WarehouseCode("A15"), true),
            
            new Warehouse(new WarehouseId("bc6b0307-3531-42f2-864d-9f5d74b13789"), new Address("R. DA IGREJA", "503", "4480-754", "Vila do Conde"),
            new Coordinates(41.3517m, -8.7479m, 150), new Designation("Armazém em Vila do Conde"), new WarehouseCode("A16"), true),
            
            new Warehouse(new WarehouseId("4a6a89a2-ccd8-4612-9bca-f95b74658099"), new Address("RUA ALVARES CABRAL", "503", "4400-017", "Vila Nova de Gaia"),
            new Coordinates(41.1239m, -8.6118m, 500), new Designation("Armazém em Vila Nova de Gaia"), new WarehouseCode("A17"), true)
        };

        return seedDataWarehouses;
    }

    private static IList<User> GetSeedDataForUsers()
    {
        var seedDataUsers = new List<User>
        {
            new User("Ricardo Ribeiro", new PhoneNumber("917988677"), Role.Admin, new Email("gamesevolve2016@gmail.com"), null),
            new User("Afonso Pimentel", new PhoneNumber("911092535"), Role.LogisticsManager, new Email("afonsopimentel69@gmail.com"), null),
            new User("Rui Rafael", new PhoneNumber("918887237"), Role.FleetManager, new Email("ronspwan11@gmail.com"), null),
            new User("José Pinto", new PhoneNumber("928056858"), Role.WarehouseManager, new Email("mr.soares.p@gmail.com"), null),
        };

        return seedDataUsers;
    }
}