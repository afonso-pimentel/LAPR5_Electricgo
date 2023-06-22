using EletricGo.Domain.Shared;
using System.Text.Json.Serialization;

namespace EletricGo.Domain.Models.DeliveryAggregate;

public sealed class Load : ValueObject
{
    /// <summary>
    /// Weight of the cargo in Kilograms
    /// </summary>
    public int Value { get; init; }

    [JsonConstructor]
    public Load(int value)
    {
        if (value <= 0)
            throw new DeliveryException("The load can't be less or equal to 0.");

        Value = value;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        // Using a yield return statement to return each element one at a time
        yield return Value;
    }
}

