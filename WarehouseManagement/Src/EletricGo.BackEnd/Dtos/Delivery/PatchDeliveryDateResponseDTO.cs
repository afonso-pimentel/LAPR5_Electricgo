using System;

namespace EletricGo.BackEnd.Dtos.Delivery;

/// <summary>
/// Patch delivery date response data transfer object.
/// </summary>
public record PatchDeliveryDateResponseDTO
{
    /// <summary>
    /// Identifies if the patch was successful.
    /// </summary>
    public bool Success { get; init; } = true;

    /// <summary>
    /// Error message in case of a failed patch operation.
    /// </summary>
    public string ErrorMessage { get; init; } = string.Empty;
}

