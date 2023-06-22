using EletricGo.BackEnd.Dtos.Delivery;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using MapsterMapper;
using System.Linq;

namespace EletricGo.BackEnd.Services;

/// <summary>
/// Implements the <see cref="DeliveryService"/>
/// </summary>
public class DeliveryService : IDeliveryService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IDeliveryRepository _repo;
    private readonly IWarehouseRepository _repoWarehouse;
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of <see cref="DeliveryService"/>
    /// </summary>
    /// <param name="unitOfWork">The unit of work.</param>
    /// <param name="repo">The repository.</param>
    /// <param name="mapper">The mapper.</param>
    public DeliveryService(IUnitOfWork unitOfWork, IDeliveryRepository repo, IMapper mapper, IWarehouseRepository warehouseRepo)
    {
        _unitOfWork = unitOfWork ?? throw new ArgumentNullException($"{nameof(unitOfWork)} cannot be null");
        _repo = repo ?? throw new ArgumentNullException($"{nameof(repo)} cannot be null");
        _mapper = mapper ?? throw new ArgumentNullException($"{nameof(mapper)} cannot be null");
        _repoWarehouse = warehouseRepo ?? throw new ArgumentNullException($"{nameof(warehouseRepo)} cannot be null");
    }

    /// IMPORTANT NOTE TO EVERY DEVELOPER 
    /// YOU SHOULD CHANGE FROM OBJECT TO AN DTO HERE AND IN THE INTERFACE

    public async Task<IList<GetDeliveryResponseDto>> GetAllAsync()
    {
        IList<Delivery> list = await _repo.GetAllAsync();

        return _mapper.Map<IList<GetDeliveryResponseDto>>(list);
    }

    public async Task<GetDeliveryResponseDto> GetByIdAsync(string Id)
    {
        var truck = await _repo.GetByIdAsync(new DeliveryId(Id));

        if (truck == null)
            return null;

        return _mapper.Map<GetDeliveryResponseDto>(truck);
    }

    public async Task<PostDeliveryResponseDto> AddAsync(PostDeliveryRequestDto value)
    {

        if ((await _repoWarehouse.GetByIdAsync(new WarehouseId(value.WarehouseId))) == null)
            throw new DeliveryException("Warehouse does not exist.");

        var delivery = _mapper.Map<Delivery>(value);

        await _repo.AddAsync(delivery);

        await this._unitOfWork.CommitAsync();

        return _mapper.Map<PostDeliveryResponseDto>(delivery);
    }

    public async Task<object> UpdateAsync(object value)
    {
        throw new NotImplementedException();
    }

    /// <inheritdoc />
    public async Task<PatchDeliveryDateResponseDTO> UpdateAsync(PatchDeliveryDateRequestDTO requestDTO)
    {
        _ = requestDTO ?? throw new ArgumentNullException($"{nameof(requestDTO)} cannot be null.");

        Delivery delivery = await _repo.GetByIdAsync(new DeliveryId(requestDTO.Id));

        if (delivery is null)
            return new PatchDeliveryDateResponseDTO()
            {
                Success = false,
                ErrorMessage = $"Delivery with ID {requestDTO.Id.ToString()} does not exist."
            };

        delivery.ChangeDeliveryDate(requestDTO.NewDeliveryDate);

        await _unitOfWork.CommitAsync();

        return new PatchDeliveryDateResponseDTO()
        {
            Success = true
        };
    }

    public Task<object> InactivateAsync(object id)
    {
        throw new NotImplementedException();
    }

    public Task<object> DeleteAsync(object id)
    {
        throw new NotImplementedException();
    }

    public async Task<IList<GetDeliveryResponseDto>> GetAllByDateAsync(DateTime date)
    {
        var results = await _repo.GetAllByDateAsync(date);

        return _mapper.Map<IList<GetDeliveryResponseDto>>(results);
    }
}
