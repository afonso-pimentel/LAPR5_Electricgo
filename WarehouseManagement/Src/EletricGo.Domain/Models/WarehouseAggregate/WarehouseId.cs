using EletricGo.Domain.Shared;
using System.Text.Json.Serialization;

namespace EletricGo.Domain.Models.WarehouseAggregate;

public sealed class WarehouseId : EntityId, IValueObject
{
    [JsonConstructor]
    public WarehouseId(Guid value) : base(value)
    {
    }
    [JsonConstructor]
    public WarehouseId(string value) : base(value)
    {
    }
    public Guid AsGuid() => (Guid)base.ObjValue;
    public override string AsString() => ((Guid)ObjValue).ToString();
    protected override object createFromString(string text) => Guid.Parse(text);
}