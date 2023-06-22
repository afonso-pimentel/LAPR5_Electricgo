using EletricGo.Domain.Shared;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace EletricGo.Domain.Models.WarehouseAggregate;

public sealed class WarehouseCode : ValueObject
{
    /// <summary>
    /// Warehouse alphanumeric code
    /// </summary>
    public string Value { get; init; }

    private string _warehouseCodeRegex = @"^[A-Z]\d{2}";

    [JsonConstructor]
    public WarehouseCode(string value)
    {
        if (String.IsNullOrEmpty(value))
            throw new WarehouseException("The Warehouse Code can not be null.");

        //Validate if the warehouse code has the alphanumeric XYY format
        if (!Regex.Match(value, _warehouseCodeRegex).Success)
            throw new WarehouseException("The Warehouse Code must have a structure like XYY.");

        Value = value;
    }
    protected override IEnumerable<object> GetEqualityComponents()
    {
        // Using a yield return statement to return each element one at a time
        yield return Value;
    }
}
