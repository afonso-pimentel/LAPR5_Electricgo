using EletricGo.BackEnd.Dtos.Delivery;
using EletricGo.BackEnd.Dtos.User;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Shared;
using Mapster;

namespace EletricGo.BackEnd.Mappers
{
    public class UserMappingConfig : IRegister
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
            config.NewConfig<PostUserRequestDto, User>()
                .Map(dest => dest.Role, src => Role.From(src.Role))
                .Map(dest => dest.PhoneNumber, src => new PhoneNumber(src.PhoneNumber))
                .Map(dest => dest.Email, src => new Email(src.Email))
                .Map(dest => dest.GoogleId, src => (GoogleId?)null)
                .MapToConstructor(true);

            config.NewConfig<User, PostUserResponseDto>()
                .Map(dest => dest.Id, src => src.Id.AsGuid())
                .Map(dest => dest.Role, src => src.Role.Id)
                .Map(dest => dest.PhoneNumber, src => src.PhoneNumber.Number)
                .Map(dest => dest.Email, src => src.Email.EmailValue);
        }

        private void Get(TypeAdapterConfig config)
        {
            config.NewConfig<User, GetUserResponseDto>()
               .Map(dest => dest.Id, src => src.Id.AsGuid())
               .Map(dest => dest.Role, src => src.Role.Id)
               .Map(dest => dest.PhoneNumber, src => src.PhoneNumber.Number)
               .Map(dest => dest.Email, src => src.Email.EmailValue);
        }
    }
}
