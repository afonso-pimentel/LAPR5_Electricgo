using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;

namespace EletricGo.Infrastructure.Repositories
{
    /// <summary>
    /// Implements <see cref="IWarehouseRepository"/>
    /// </summary>
    public sealed class WarehouseRepository : BaseRepository<Warehouse, WarehouseId>, IWarehouseRepository
    {
        private readonly EletricGoDbContext _context;
        /// <summary>
        /// Initializes a new instance of <see cref="WarehouseRepository"/>
        /// </summary>
        /// <param name="context">The database context.</param>
        public WarehouseRepository(EletricGoDbContext context) : base(context.Warehouses)
        {
            _context = context ?? throw new ArgumentNullException($"{nameof(context)} cannot be null.");
        }


        public Task<Warehouse?> FindByWarehouseCodeAsync(WarehouseCode warehouseCode)
        {
            _ = warehouseCode ?? throw new ArgumentNullException($"{nameof(warehouseCode)} cannot be null");

            return _context.Warehouses.Where(x => x.Code.Value.Equals(warehouseCode.Value)).SingleOrDefaultAsync();
        }

        public async Task<IList<Warehouse>> GetAllActiveAsync()
        {
            return await _context.Warehouses.Where(x => x.IsActive).ToListAsync();
        }
    }
}
