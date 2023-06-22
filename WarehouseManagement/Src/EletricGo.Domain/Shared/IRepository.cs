namespace EletricGo.Domain.Shared;

public interface IRepository<TEntity, TEntityId>
{
    Task<List<TEntity>> GetAllAsync();
    Task<TEntity?> GetByIdAsync(TEntityId id);
    Task<List<TEntity>> GetByIdsAsync(List<TEntityId> ids);
    Task<TEntity> AddAsync(TEntity obj);
    void Remove(TEntity obj);
}