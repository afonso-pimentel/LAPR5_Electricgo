using EletricGo.BackEnd.Dtos.Warehouse;
using EletricGo.Domain.Models.WarehouseAggregate;
using Mapster;

namespace EletricGo.BackEnd.Mappers;

/// <summary>
/// Implements the <see cref="IRegister"/>
/// </summary>
public sealed class WarehouseMappingConfig : IRegister
{
    /// <summary>
    /// Register all of the mappings needed for the current assembly.
    /// </summary>
    /// <param name="config"></param>
    public void Register(TypeAdapterConfig config)
    {
        Get(config);
        Post(config);
        Put(config);
        Delete(config);
    }

    private void Delete(TypeAdapterConfig config)
    {
    }

    private void Put(TypeAdapterConfig config)
    {
        // maps request dto into the domain value objects
        config.NewConfig<PutWarehouseRequestDto, Address>()
            .MapToConstructor(true);

        config.NewConfig<PutWarehouseRequestDto, Coordinates>()
            .MapToConstructor(true);

        config.NewConfig<PutWarehouseRequestDto, Designation>()
            .Map(dest => dest.Value, src => src.Designation)
            .MapToConstructor(true);

        // maps newly updated object to the response dto
        config.NewConfig<Warehouse, PutWarehouseResponseDto>()
            .Map(dest => dest.Id, src => src.Id.AsGuid())
            .Map(dest => dest.StreetName, src => src.Address.StreetName)
            .Map(dest => dest.Number, src => src.Address.Number)
            .Map(dest => dest.ZipCode, src => src.Address.ZipCode)
            .Map(dest => dest.Locality, src => src.Address.Locality)
            .Map(dest => dest.Latitude, src => src.Coordinates.Latitude)
            .Map(dest => dest.Longitude, src => src.Coordinates.Longitude)
            .Map(dest => dest.Altitude, src => src.Coordinates.Altitude)
            .Map(dest => dest.Designation, src => src.Designation.Value)
            .Map(dest => dest.WarehouseCode, src => src.Code.Value)
            .MapToConstructor(true);
    }

    private void Post(TypeAdapterConfig config)
    {
        config.NewConfig<Warehouse, CreateWarehouseResponseDto>()
            .Map(dest => dest.Id, src => src.Id.AsGuid())
            .Map(dest => dest.StreetName, src => src.Address.StreetName)
            .Map(dest => dest.Number, src => src.Address.Number)
            .Map(dest => dest.ZipCode, src => src.Address.ZipCode)
            .Map(dest => dest.Locality, src => src.Address.Locality)
            .Map(dest => dest.Latitude, src => src.Coordinates.Latitude)
            .Map(dest => dest.Longitude, src => src.Coordinates.Longitude)
            .Map(dest => dest.Altitude, src => src.Coordinates.Altitude)
            .Map(dest => dest.Designation, src => src.Designation.Value)
            .Map(dest => dest.WarehouseCode, src => src.Code.Value)
            .MapToConstructor(true);

        config.NewConfig<CreateWarehouseRequestDto, Warehouse>()
            .Map(dest => dest.Address, src => new Address(src.StreetName, src.Number, src.ZipCode, src.Locality))
            .Map(dest => dest.Coordinates, src => new Coordinates(src.Latitude, src.Longitude, src.Altitude))
            .Map(dest => dest.Designation, src => new Designation(src.Designation))
            .Map(dest => dest.Code, src => new WarehouseCode(src.WarehouseCode))
            .MapToConstructor(true);

    }

    private void Get(TypeAdapterConfig config)
    {
        config
        .NewConfig<Warehouse, GetWarehouseRequestDTO>()
        .Map(dest => dest.Code, src => src.Code.Value)
        .Map(dest => dest.Description, src => src.Designation.Value)
        .Map(dest => dest.DoorNumber, src => src.Address.Number)
        .Map(dest => dest.ID, src => src.Id.Value)
        .Map(dest => dest.Locality, src => src.Address.Locality)
        .Map(dest => dest.StreetName, src => src.Address.StreetName)
        .Map(dest => dest.Latitude, src => src.Coordinates.Latitude)
        .Map(dest => dest.Longitude, src => src.Coordinates.Longitude)
        .Map(dest => dest.Altitude, src => src.Coordinates.Altitude);
    }
}
