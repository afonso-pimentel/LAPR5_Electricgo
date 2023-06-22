using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace EletricGo.Domain.Models.UserAggregate
{
    public sealed class Email : ValueObject
    {
        public string EmailValue { get; set; }

        [JsonConstructor]
        public Email(string emailValue)
        {
            if (string.IsNullOrEmpty(emailValue))
                throw new UserException("The email is required.");

            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match = regex.Match(emailValue);
            if (!match.Success)
                throw new UserException("The email is invalid.");

            EmailValue = emailValue;
        }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            yield return EmailValue;
        }
    }
}
