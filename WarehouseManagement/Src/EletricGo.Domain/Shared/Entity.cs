using System.Text.Json.Serialization;

namespace EletricGo.Domain.Shared;

/// <summary>
/// Base class for entities.
/// </summary>
public abstract class Entity<TEntityId>
where TEntityId: EntityId
{
    public TEntityId Id { get;  set; }
}