using EletricGo.BackEnd.Dtos.Warehouse;
using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using MapsterMapper;

namespace EletricGo.BackEnd.Services;

/// <summary>
/// Implements the <see cref="IWarehouseService"/>
/// </summary>
public sealed class WarehouseService : IWarehouseService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IWarehouseRepository _repo;
    private readonly IDeliveryRepository _repoDelivery;
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of <see cref="WarehouseService"/>
    /// </summary>
    /// <param name="unitOfWork">The unit of work.</param>
    /// <param name="repo">The repository.</param>
    /// <param name="mapper">The mapper.</param>
    public WarehouseService(IUnitOfWork unitOfWork, IWarehouseRepository repo, IMapper mapper, IDeliveryRepository repoDelivery)
    {
        _unitOfWork = unitOfWork ?? throw new ArgumentNullException($"{nameof(unitOfWork)} cannot be null:");
        _repo = repo ?? throw new ArgumentNullException($"{nameof(repo)} cannot be null:");
        _mapper = mapper ?? throw new ArgumentNullException($"{nameof(mapper)} cannot be null:");
        _repoDelivery = repoDelivery;
    }

    /// <inheritdoc />

    public async Task<IList<GetWarehouseRequestDTO>> GetAllAsync()
    {
        IList<Warehouse> allAvailableWarehouses = await _repo.GetAllAsync();

        return _mapper.Map<IList<GetWarehouseRequestDTO>>(allAvailableWarehouses);
    }

    /// <inheritdoc />
    public async Task<GetWarehouseRequestDTO> GetByIdAsync(string id)
    {
        Warehouse warehouse = await _repo.GetByIdAsync(new WarehouseId(Guid.Parse(id)));

        return _mapper.Map<GetWarehouseRequestDTO>(warehouse);
    }

    public async Task<CreateWarehouseResponseDto> AddAsync(CreateWarehouseRequestDto value)
    {
        Warehouse? warehouseWithSameCode = await _repo.FindByWarehouseCodeAsync(new WarehouseCode(value.WarehouseCode));

        if (warehouseWithSameCode is not null)
            throw new WarehouseException($"A warehouse with the same code already exists.");

        var warehouse = _mapper.Map<Warehouse>(value);

        await _repo.AddAsync(warehouse);

        await this._unitOfWork.CommitAsync();

        return _mapper.Map<CreateWarehouseResponseDto>(warehouse);
    }

    /// <inheritdoc />
    public async Task<PutWarehouseResponseDto?> UpdateAsync(PutWarehouseRequestDto value, Guid id)
    {
        var warehouse = await _repo.GetByIdAsync(new WarehouseId(id));

        if (warehouse is null)
            return null;

        var address = _mapper.Map<Address>(value);
        var coordinates = _mapper.Map<Coordinates>(value);
        var designation = _mapper.Map<Designation>(value);

        warehouse.UpdateWarehouse(address, coordinates, designation);

        await _unitOfWork.CommitAsync();

        return _mapper.Map<PutWarehouseResponseDto>(warehouse);
    }

    public async Task<GetWarehouseRequestDTO> InactivateAsync(Guid id)
    {
        var warehouse = await _repo.GetByIdAsync(new WarehouseId(id));

        if (warehouse is null)
            throw new WarehouseException("Id does not exist in database.");

        var deliveries = await _repoDelivery.GetByWarehouseInFutureAsync(id);

        if ((deliveries?.Count ?? 0) > 0)
            throw new WarehouseException("Warehouse has deliveries.");

        warehouse.DeactivateWarehouse();

        await _unitOfWork.CommitAsync();

        return _mapper.Map<GetWarehouseRequestDTO>(warehouse);
    }

    public async Task<IList<GetWarehouseRequestDTO>> GetAllActiveAsync()
    {
        IList<Warehouse> allAvailableWarehouses = await _repo.GetAllActiveAsync();

        return _mapper.Map<IList<GetWarehouseRequestDTO>>(allAvailableWarehouses);
    }

    public Task<object> DeleteAsync(object id)
    {
        throw new NotImplementedException();
    }

    
}
