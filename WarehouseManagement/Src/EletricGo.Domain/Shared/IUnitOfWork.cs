namespace EletricGo.Domain.Shared;

public interface IUnitOfWork
{
    Task<int> CommitAsync();
}