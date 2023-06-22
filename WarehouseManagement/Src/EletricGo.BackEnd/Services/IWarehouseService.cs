using EletricGo.BackEnd.Dtos.Warehouse;

namespace EletricGo.BackEnd.Services
{
    /// <summary>
    /// The warehouse service.
    /// </summary>
    public interface IWarehouseService
    {
        /// <summary>
        /// Gets all of the available warehouses.
        /// </summary>
        /// <returns>A task that contains all of the available warehouses.</returns>
        public Task<IList<GetWarehouseRequestDTO>> GetAllAsync();

        /// <summary>
        /// Gets a specified warehouse.
        /// </summary>
        /// <param name="id">The identifier of the warehouse.</param>
        /// <returns>The warehouse if it exists and null if not.</returns>
        public Task<GetWarehouseRequestDTO?> GetByIdAsync(string id);

        public Task<CreateWarehouseResponseDto> AddAsync(CreateWarehouseRequestDto value);

        /// <summary>
        /// Updates a specific warehouse.
        /// </summary>
        /// <param name="value">The new warehouse values.</param>
        /// <param name="id">The warehouse identifier.</param>
        /// <returns>The update response.</returns>
        public Task<PutWarehouseResponseDto?> UpdateAsync(PutWarehouseRequestDto value, Guid id);

        /// <summary>
        /// Change warehouse to inactive
        /// </summary>
        /// <param name="id">The warehouse identifier</param>
        /// <returns></returns>
        public Task<GetWarehouseRequestDTO> InactivateAsync(Guid id);

        /// <summary>
        /// Gets all of the active warehouses.
        /// </summary>
        /// <returns>A task that contains all of the active warehouses.</returns>
        public Task<IList<GetWarehouseRequestDTO>> GetAllActiveAsync();

        public Task<object> DeleteAsync(object id);
    }
}
