using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace EletricGo.Domain.Models.UserAggregate
{
    public sealed class PhoneNumber : ValueObject
    {
        public string Number { get; set; }

        [JsonConstructor]
        public PhoneNumber(string number)
        {
            if (string.IsNullOrEmpty(number))
                throw new UserException("The number is required.");
            if(number.Length != 9)
                throw new UserException("The number is 9 digits only.");

            Number = number;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return Number;
        }
    }
}
