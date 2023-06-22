namespace EletricGo.BackEnd.Dtos.Delivery;

public class GetDeliveryResponseDto
{
    public string Id { get; set; }
    public string WarehouseId { get; set; }

    public string DeliveryDate { get; set; }

    public string Load { get; set; }
}