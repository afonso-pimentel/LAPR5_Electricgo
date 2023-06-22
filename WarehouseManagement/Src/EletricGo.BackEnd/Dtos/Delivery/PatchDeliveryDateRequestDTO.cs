using System;

namespace EletricGo.BackEnd.Dtos.Delivery;

/// <summary>
/// Update delivery date request data transfer object.
/// </summary>
public record PatchDeliveryDateRequestDTO
{
    /// <summary>
    /// The delivery identifier.
    /// </summary>
    public Guid Id { get; init; } = Guid.NewGuid();

    /// <summary>
    /// The new delivery date.
    /// </summary>
    public DateTime NewDeliveryDate { get; init; } = DateTime.Now;
}
