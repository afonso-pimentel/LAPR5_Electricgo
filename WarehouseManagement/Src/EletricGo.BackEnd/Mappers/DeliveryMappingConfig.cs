using EletricGo.BackEnd.Dtos.Delivery;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;
using Mapster;

namespace EletricGo.BackEnd.Mappers
{
    public class DeliveryMappingConfig : IRegister
    {
        public void Register(TypeAdapterConfig config)
        {
            Get(config);
            Post(config);
            Put(config);
            Delete(config);
        }

        private void Delete(TypeAdapterConfig config)
        {
        }

        private void Put(TypeAdapterConfig config)
        {
        }

        private void Post(TypeAdapterConfig config)
        {
            config.NewConfig<PostDeliveryRequestDto, Delivery>()
                .Map(dest => dest.Load, src => new Load(src.Load))
                .Map(dest => dest.WarehouseId, src => new WarehouseId(src.WarehouseId))
                .MapToConstructor(true);

            config.NewConfig<Delivery, PostDeliveryResponseDto>()
                .Map(dest => dest.Id, src => src.Id.AsGuid())
                .Map(dest => dest.Load, src => src.Load.Value)
                .Map(dest => dest.WarehouseId, src => src.WarehouseId.Value);
        }

        private void Get(TypeAdapterConfig config)
        {
            config.NewConfig<Delivery, GetDeliveryResponseDto>()
            .Map(dest => dest.Id, src => src.Id.Value)
            .Map(dest => dest.Load, src => src.Load.Value)
            .Map(dest => dest.DeliveryDate, src => src.DeliveryDate)
            .Map(dest => dest.WarehouseId, src => src.WarehouseId.Value);
        }
    }
}
