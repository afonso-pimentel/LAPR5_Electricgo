using EletricGo.BackEnd.Dtos.User;

namespace EletricGo.BackEnd.Services;

/// <summary>
/// The User service
/// </summary>
public interface IUserService
{
    public Task<PostUserResponseDto> AddAsync(PostUserRequestDto value);
    public Task<IList<GetUserResponseDto>> GetAllAsync();
    public Task<GetUserResponseDto?> AnonymizeAsync(string id);
    public Task<GetUserResponseDto> ValidateUserAsync(ValidateUserDto user);
}
