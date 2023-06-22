using EletricGo.Domain.Shared;
using System.Text.Json.Serialization;

namespace EletricGo.Domain.Models.WarehouseAggregate;

public sealed class Coordinates : ValueObject
{
    /// <summary>
    /// Decimal Latitude
    /// </summary>
    public decimal Latitude { get; init; }
    /// <summary>
    /// Decimal Longitude
    /// </summary>
    public decimal Longitude { get; init; }
    /// <summary>
    /// Altitude in meters
    /// </summary>
    public int Altitude { get; init; }

    [JsonConstructor]
    public Coordinates(decimal latitude, decimal longitude, int altitude)
    {
        if (latitude < -90 || latitude > 90)
            throw new WarehouseException("The latitude has to be between -90 and 90.");
        if (isCoordinate(latitude))
            throw new WarehouseException("The latitude can not have over 4 decimal places.");
        if (longitude < -180 || longitude > 180)
            throw new WarehouseException("The longitude has to be between -180 and 180.");
        //if(isCoordinate(longitude))
        Latitude = latitude;
        Longitude = longitude;
        Altitude = altitude;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        // Using a yield return statement to return each element one at a time
        yield return Latitude;
        yield return Longitude;
        yield return Altitude;
    }

    private bool isCoordinate(decimal value)
    {
        return Decimal.Round(value, 4) != value;
    }
}
