using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;

namespace EletricGo.Domain.UnitTests.Models.DeliveryAggregate;

public sealed class DeliveryTests
{
    [Fact]
    public void UpdateDeliveryDate_WithInvalidDate_ShouldThrowDeliveryException()
    {
        // Arrange
        Guid id = Guid.NewGuid();
        Load load = new(10);
        DeliveryId deliveryId = new(id);
        Delivery delivery = new(deliveryId, DateTime.Now.AddDays(2), load, new WarehouseId(Guid.NewGuid().ToString()));
        DateTime invalidDatetime = DateTime.Now;

        // Act & Assert
        Assert.Throws<DeliveryException>(() => delivery.ChangeDeliveryDate(invalidDatetime));
    }
}
