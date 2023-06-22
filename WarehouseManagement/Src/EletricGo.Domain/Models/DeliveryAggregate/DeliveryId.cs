using EletricGo.Domain.Shared;
using System.Text.Json.Serialization;

namespace EletricGo.Domain.Models.DeliveryAggregate;

public sealed class DeliveryId : EntityId, IValueObject
{
    [JsonConstructor]
    public DeliveryId(Guid value) : base(value)
    {
    }
    [JsonConstructor]
    public DeliveryId(string value) : base(value)
    {
    }

    public override string AsString() => ((Guid)ObjValue).ToString();
    protected override object createFromString(string text) => Guid.Parse(text);
    public Guid AsGuid() => (Guid)base.ObjValue;
}