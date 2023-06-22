using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Repositories;

/// <summary>
/// Warehouse repository.
/// </summary>
public interface IWarehouseRepository : IRepository<Warehouse, WarehouseId>
{
    /// <summary>
    /// Finds a warehouse based on its warehouse code.
    /// </summary>
    /// <param name="warehouseCode">The warehouse code.</param>
    /// <returns>A Warehouse if found and null if not.</returns>
    Task<Warehouse?> FindByWarehouseCodeAsync(WarehouseCode warehouseCode);

    /// <summary>
    /// Returns all the active warehouses.
    /// </summary>
    /// <returns>All the active warehouses.</returns>
    Task<IList<Warehouse>> GetAllActiveAsync();
}
