using EletricGo.Domain.Shared;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;

namespace EletricGo.Domain.Models.WarehouseAggregate;

public sealed class Address : ValueObject
{
    /// <summary>
    /// Address streetname
    /// </summary>
    public string StreetName { get; init; }
    /// <summary>
    /// Address door number
    /// </summary>
    public string Number { get; init; }
    /// <summary>
    /// Address zip code
    /// </summary>
    public string ZipCode { get; set; }
    /// <summary>
    /// Address locality
    /// </summary>
    public string Locality { get; init; }

    private string _zipCodeRegex = @"^\d{4}-\d{3}";

    [JsonConstructor]
    public Address(string streetName, string number, string zipCode, string locality)
    {
        if (String.IsNullOrEmpty(streetName))
            throw new WarehouseException("The address street name can not be null.");

        if (String.IsNullOrEmpty(number))
            throw new WarehouseException("The address number can not be null.");

        //Validate if the house number is an integer
        if (!int.TryParse(number, out _))
            throw new WarehouseException("The address number has to be a valid integer.");

        if (String.IsNullOrEmpty(zipCode))
            throw new WarehouseException("The zip code can not be null.");

        //Validate if the zipCode is in the correct format
        if (!Regex.Match(zipCode, _zipCodeRegex).Success)
            throw new WarehouseException("The zip code is not in the correct Portuguese format YYYY-YYY");

        if (String.IsNullOrEmpty(locality))
            throw new WarehouseException("The address locality can not be null.");


        StreetName = streetName;
        Number = number;
        ZipCode = zipCode;
        Locality = locality;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        // Using a yield return statement to return each element one at a time
        yield return StreetName;
        yield return Number;
        yield return Locality;
    }
}
