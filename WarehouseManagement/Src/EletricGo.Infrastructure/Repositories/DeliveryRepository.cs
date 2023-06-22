using System;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;

namespace EletricGo.Infrastructure.Repositories;

public sealed class DeliveryRepository : BaseRepository<Delivery, DeliveryId>, IDeliveryRepository
{
    private readonly EletricGoDbContext _context;

    public DeliveryRepository(EletricGoDbContext context) : base(context.Deliveries)
    {
        _context = context;
    }

    public async Task<IList<Delivery>> GetAllByDateAsync(DateTime date)
    {
        var result = await _context.Deliveries.Where(x => x.DeliveryDate.Date.Date.Equals(date.Date)).ToListAsync();

        return result;
    }

    public async Task<IList<Delivery>> GetByWarehouseInFutureAsync(Guid Id)
    {
        return await _context.Deliveries.Where(x => x.DeliveryDate >= DateTime.Now && x.WarehouseId.Equals(new WarehouseId(Id))).ToListAsync();
    }

}
