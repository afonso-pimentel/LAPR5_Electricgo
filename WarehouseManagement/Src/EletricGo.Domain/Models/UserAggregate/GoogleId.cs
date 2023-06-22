using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;

namespace EletricGo.Domain.Models.UserAggregate;

public sealed class GoogleId : ValueObject
{
    public string IdGoogle { get; set; }

    [JsonConstructor]
    public GoogleId(string idGoogle)
    {
        if (string.IsNullOrEmpty(idGoogle))
            throw new UserException("GoogleId cannot be empty.");

        IdGoogle = idGoogle;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
        yield return IdGoogle;
    }
}
