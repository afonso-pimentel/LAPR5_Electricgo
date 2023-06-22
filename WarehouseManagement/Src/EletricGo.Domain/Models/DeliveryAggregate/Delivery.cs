using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Models.DeliveryAggregate;

/// <summary>
/// Delivery entity.
/// </summary>
public sealed class Delivery : Entity<DeliveryId>, IAggregateRoot
{
    /// <summary>
    /// The delivery date.
    /// </summary>
    public DateTime DeliveryDate { get; private set; }

    /// <summary>
    /// The delivery load.
    /// </summary>
    public Load Load { get; private set; }

    /// <summary>
    /// The delivery Destination Warehouse.
    /// </summary>
    public WarehouseId WarehouseId { get; private set; }

    /// <summary>
    /// For ORM ONLY
    /// </summary>
    protected Delivery() { }

    /// <summary>
    /// Initializes a new instance of <see cref="Delivery"/>
    /// </summary>
    /// <param name="deliveryDate">The delivery date.</param>
    /// <param name="load">The delivery load.</param>
    public Delivery(DateTime deliveryDate, Load load, WarehouseId warehouseId)
    {
        Id = new DeliveryId(Guid.NewGuid());
        DeliveryDate = ValidateDeliveryDate(deliveryDate);
        Load = load;
        WarehouseId = warehouseId;
    }

    /// <summary>
    /// Initializes a new instance of <see cref="Delivery"/>
    /// </summary>
    /// <param name="deliveryId">The delivery id.</param>
    /// <param name="deliveryDate">The delivery date.</param>
    /// <param name="load">The delivery load.</param>
    public Delivery(DeliveryId deliveryId, DateTime deliveryDate, Load load, WarehouseId warehouseId)
    {
        Id = deliveryId;
        DeliveryDate = ValidateDeliveryDate(deliveryDate);
        Load = load;
        WarehouseId = warehouseId;
    }

    /// <summary>
    /// Change the current delivery date.
    /// </summary>
    /// <param name="newDate">The new delivery date.</param>
    public void ChangeDeliveryDate(DateTime newDate)
    {
        DeliveryDate = ValidateDeliveryDate(newDate);
    }

    private DateTime ValidateDeliveryDate(DateTime deliveryDate)
    {
        if (deliveryDate.Date <= DateTime.Today)
            throw new DeliveryException("The date of the delivery can´t be in the past or today.");

        return deliveryDate;
    }
}
