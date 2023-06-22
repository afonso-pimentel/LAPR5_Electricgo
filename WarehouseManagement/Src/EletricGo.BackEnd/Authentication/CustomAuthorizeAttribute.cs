using EletricGo.Domain.Models.UserAggregate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace EletricGo.BackEnd.Authentication
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class CustomAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        IList<int> _roles;
        public CustomAuthorizeAttribute(int[] roles)
        {
            _roles = roles;
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
            if (allowAnonymous)
                return;

            var claimList = (context.HttpContext.Items["Claims"] as IEnumerable<Claim>);

            if (!claimList?.Any() ?? true)
            {
                context.Result = new JsonResult("Unauthorized") { StatusCode = StatusCodes.Status401Unauthorized };
                return;
            }

            var userRole = Convert.ToInt32(claimList.FirstOrDefault(x => x.Type == "role")?.Value);

            if (_roles.Contains(userRole))
                return;

            context.Result = new JsonResult("Unauthorized") { StatusCode = StatusCodes.Status401Unauthorized };
        }
    }
}
