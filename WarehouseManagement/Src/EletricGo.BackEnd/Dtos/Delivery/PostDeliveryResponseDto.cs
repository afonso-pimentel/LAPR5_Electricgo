using EletricGo.Domain.Models.DeliveryAggregate;

namespace EletricGo.BackEnd.Dtos.Delivery;

public class PostDeliveryResponseDto
{
    public Guid Id { get; set; }
    public DateTime DeliveryDate { get; private set; }
    public int Load { get; init; }
    public string WarehouseId { get; set; }
}
