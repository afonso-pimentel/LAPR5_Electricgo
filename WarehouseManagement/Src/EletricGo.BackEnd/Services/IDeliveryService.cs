using EletricGo.BackEnd.Dtos.Delivery;

namespace EletricGo.BackEnd.Services
{
    /// <summary>
    /// The delivery service.
    /// </summary>
    public interface IDeliveryService
    {
        public Task<IList<GetDeliveryResponseDto>> GetAllAsync();

        public Task<IList<GetDeliveryResponseDto>> GetAllByDateAsync(DateTime date);

        public Task<GetDeliveryResponseDto> GetByIdAsync(string id);

        public Task<PostDeliveryResponseDto> AddAsync(PostDeliveryRequestDto value);

        public Task<object> UpdateAsync(object value);

        public Task<object> InactivateAsync(object id);

        public Task<object> DeleteAsync(object id);

        /// <summary>
        /// Updates the delivery date for a specific delivery.
        /// </summary>
        /// <param name="requestDTO">The patch delivery date request DTO.</param>
        /// <returns>A task that completes when the delivery date has been updated.</returns>
        public Task<PatchDeliveryDateResponseDTO> UpdateAsync(PatchDeliveryDateRequestDTO requestDTO);
    }
}
