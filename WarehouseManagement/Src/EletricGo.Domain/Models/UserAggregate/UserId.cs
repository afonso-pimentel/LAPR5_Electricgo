using EletricGo.Domain.Shared;
using System.Text.Json.Serialization;

namespace EletricGo.Domain.Models.UserAggregate;

public sealed class UserId : EntityId, IValueObject
{
    [JsonConstructor]
    public UserId(Guid value) : base(value)
    {
    }
    [JsonConstructor]
    public UserId(string value) : base(value)
    {
    }

    public override string AsString() => ((Guid)ObjValue).ToString();
    protected override object createFromString(string text) => Guid.Parse(text);
    public Guid AsGuid() => (Guid)base.ObjValue;
}