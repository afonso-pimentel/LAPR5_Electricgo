using System.ComponentModel.DataAnnotations;

namespace EletricGo.BackEnd.Dtos.Delivery;

public class PostDeliveryRequestDto
{
    public DateTime DeliveryDate { get; set; }
    public int Load { get; set; }
    public string WarehouseId { get; set; }
}