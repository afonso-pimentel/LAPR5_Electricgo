namespace EletricGo.BackEnd.Dtos.Warehouse;

/// <summary>
/// Warehouse data transfer object.
/// </summary>
public record GetWarehouseRequestDTO
{
    /// <summary>
    /// The warehouse identifier.
    /// </summary>
    public string ID { get; init; } = Guid.NewGuid().ToString();

    /// <summary>
    /// The warehouse code.
    /// </summary>
    public string Code { get; init; } = "ARM-UNKNOWN";

    /// <summary>
    /// The warehouse description.
    /// </summary>
    public string Description { get; init; } = "Default warehouse description.";

    /// <summary>
    /// The warehouse street name.
    /// </summary>
    public string StreetName { get; init; } = "Unknown street name.";

    /// <summary>
    /// The warehouse door number.
    /// </summary>
    public string DoorNumber { get; init; } = "Unknown door number.";

    /// <summary>
    /// The warehouse locality.
    /// </summary>
    public string Locality { get; init; } = "Unknown locality for warehouse.";

    /// <summary>
    /// The warehouse Latitude.
    /// </summary>
    public decimal Latitude { get; init; }

    /// <summary>
    /// The warehouse Longitude.
    /// </summary>
    public decimal Longitude { get; init; }

    /// <summary>
    /// The warehouse Altitude.
    /// </summary>
    public int Altitude { get; init; }

    /// <summary>
    /// The warehouse active state
    /// </summary>
    public bool IsActive { get; set; }
}

