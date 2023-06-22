using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EletricGo.Domain.Models.DeliveryAggregate;

public class DeliveryException : Exception
{
    public DeliveryException()
    {
    }

    public DeliveryException(string message)
        : base(message)
    {
    }

    public DeliveryException(string message, Exception inner) : base(message, inner)
    {
    }
}
