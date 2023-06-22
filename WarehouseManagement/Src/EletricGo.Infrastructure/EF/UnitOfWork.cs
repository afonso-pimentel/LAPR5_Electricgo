using EletricGo.Domain.Shared;
using EletricGo.Infrastructure.EF;

namespace EletricGo.Infrastructure;

public class UnitOfWork : IUnitOfWork
{
    private readonly EletricGoDbContext _context;

    public UnitOfWork(EletricGoDbContext context)
    {
        this._context = context;
    }

    public async Task<int> CommitAsync()
    {
        return await this._context.SaveChangesAsync();
    }
}