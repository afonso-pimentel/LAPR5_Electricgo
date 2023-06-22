using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace EletricGo.BackEnd.Authentication;

public class JwtMiddleware
{
    readonly RequestDelegate _next;
    private IConfiguration _config;
    public JwtMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context, IConfiguration config)
    {
        _config = config;


        var Authorization = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ");

        if (Authorization == null)
        {
            await _next(context);
            return;
        }

        var token = Authorization.Last();
        var claims = ValidateToken(token);

        if (claims != null && claims.Any())
        {
            context.Items["Claims"] = claims;
        }

        await _next(context);
    }

    private IEnumerable<Claim> ValidateToken(string token)
    {
        if (string.IsNullOrEmpty(token))
            return Enumerable.Empty<Claim>();

        var tokenHandler = new JwtSecurityTokenHandler();
        try
        {
            var jwtSecret = Encoding.ASCII.GetBytes(_config.GetValue<string>("JsonSecret"));

      
            tokenHandler.ValidateToken(token, new TokenValidationParameters()
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(jwtSecret),
                    ValidateIssuer = false,
                    ValidateAudience = false
                }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            return jwtToken.Claims;
        }
        catch(Exception ex)
        {
            return Enumerable.Empty<Claim>();
        }
    }
}
