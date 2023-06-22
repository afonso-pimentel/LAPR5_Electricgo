using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using EletricGo.Infrastructure.EF;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;

namespace EletricGo.Infrastructure.Repositories;

public sealed class UserRepository : BaseRepository<User, UserId>, IUserRepository
{
    private readonly EletricGoDbContext _context;

    public UserRepository(EletricGoDbContext context) : base(context.Users)
    {
        _context = context;
    }

    public override async Task<List<User>> GetAllAsync()
    {
        return await _context.Users.Include(u => u.Role).ToListAsync();
    }

    public override async Task<User?> GetByIdAsync(UserId id)
    {
        return await _context.Users.Include(u => u.Role)
            .Where(x => id.Equals(x.Id)).FirstOrDefaultAsync();
    }
    public override async Task<List<User>> GetByIdsAsync(List<UserId> ids)
    {
        return await _context.Users.Include(u => u.Role)
            .Where(x => ids.Contains(x.Id)).ToListAsync();
    }

    public async Task<User?> FindByEmail(Email email)
    {
        return await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.Email.EmailValue == email.EmailValue);
    }

    public async Task<User?> FindByGoogle(GoogleId googleId)
    {
        return await _context.Users.Include(u => u.Role).FirstOrDefaultAsync(u => u.GoogleId != null && u.GoogleId.IdGoogle == googleId.IdGoogle);
    }
}
