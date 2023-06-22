using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Repositories;

public interface IDeliveryRepository : IRepository<Delivery, DeliveryId>
{
    Task<IList<Delivery>> GetAllByDateAsync(DateTime date);
    Task<IList<Delivery>> GetByWarehouseInFutureAsync(Guid Id);
}
