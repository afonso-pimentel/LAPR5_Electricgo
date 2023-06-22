using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Shared;

namespace EletricGo.Domain.Repositories;

/// <summary>
/// User repository.
/// </summary>
public interface IUserRepository : IRepository<User, UserId>
{
    public Task<User?> FindByEmail(Email email);
    public Task<User?> FindByGoogle(GoogleId googleId);
}
