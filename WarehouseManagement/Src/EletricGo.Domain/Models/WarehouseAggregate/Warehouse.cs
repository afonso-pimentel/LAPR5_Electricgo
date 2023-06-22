using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Models.WarehouseAggregate;

/// <summary>
/// Warehouse entity.
/// </summary>
public sealed class Warehouse : Entity<WarehouseId>, IAggregateRoot
{
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Address Address { get; private set; }
    /// <summary>
    /// <inheritdoc/>
    /// </summary>public Coordinates Coordinates { get; private set; }
    public Designation Designation { get; private set; }
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public Coordinates Coordinates { get; private set; }
    /// <summary>
    /// <inheritdoc/>
    /// </summary>
    public WarehouseCode Code { get; private set; }

    public bool IsActive { get; private set; }

    /// <summary>
    /// FOR ORM ONLY
    /// </summary>
    protected Warehouse() { }
    
    public Warehouse(Address address, Coordinates coordinates, Designation designation, WarehouseCode code)
    {
        Id = new WarehouseId(Guid.NewGuid());
        Address = address;
        Coordinates = coordinates;
        Designation = designation;
        Code = code;
        IsActive = true;
    }

    // update warehouse without id and code
    public Warehouse(Address address, Coordinates coordinates, Designation designation)
    {
        Address = address;
        Coordinates = coordinates;
        Designation = designation;
        IsActive = true;
    }

    public Warehouse(WarehouseId id, Address address, Coordinates coordinates, Designation designation, WarehouseCode code, bool isActive)
    {
        Id = id;
        Address = address;
        Coordinates = coordinates;
        Designation = designation;
        Code = code;
        IsActive = isActive;
    }

    /// <summary>
    /// Update warehouse without id and code 
    /// </summary>
    /// <param name="address"></param>
    /// <param name="coordinates"></param>
    /// <param name="designation"></param>
    public void UpdateWarehouse(Address address, Coordinates coordinates, Designation designation)
    {
        Address = address;
        Coordinates = coordinates;
        Designation = designation;
    }

    public void DeactivateWarehouse()
    {
        IsActive = false;
    }
}

