using EletricGo.Domain.Shared;
using System.Text.Json.Serialization;

namespace EletricGo.Domain.Models.WarehouseAggregate;

public sealed class Designation : ValueObject
{
    /// <summary>
    /// Warehouse Name
    /// </summary>
    public string Value { get; init; }

    private int _maxLength = 50;

    [JsonConstructor]
    public Designation(string value)
    {
        if (String.IsNullOrEmpty(value))
            throw new WarehouseException("The Designation can not be null.");

        //Validate if the designation is over the MAX LENGTH
        if (value.Length > _maxLength)
            throw new WarehouseException("The Designation can not be over the character limit of "+_maxLength+".");

        Value = value;
    }
    protected override IEnumerable<object> GetEqualityComponents()
    {
        // Using a yield return statement to return each element one at a time
        yield return Value;
    }
}
