using EletricGo.BackEnd.Dtos.User;
using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using MapsterMapper;
using Newtonsoft.Json.Linq;

namespace EletricGo.BackEnd.Services;

/// <summary>
/// Implements the <see cref="UserService"/>
/// </summary>
public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserRepository _repo;
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of <see cref="UserService"/>
    /// </summary>
    /// <param name="unitOfWork">The unit of work.</param>
    /// <param name="repo">The repository.</param>
    /// <param name="mapper">The mapper.</param>
    public UserService(IUnitOfWork unitOfWork, IUserRepository repo, IMapper mapper)
    {
        _unitOfWork = unitOfWork ?? throw new ArgumentNullException($"{nameof(unitOfWork)} cannot be null");
        _repo = repo ?? throw new ArgumentNullException($"{nameof(repo)} cannot be null");
        _mapper = mapper ?? throw new ArgumentNullException($"{nameof(mapper)} cannot be null");
    }

    public async Task<IList<GetUserResponseDto>> GetAllAsync()
    {
        IList<User> list = await _repo.GetAllAsync();

        return _mapper.Map<IList<GetUserResponseDto>>(list);
    }

    public async Task<object> GetByIdAsync(object Id)
    {
        throw new NotImplementedException();
    }

    public async Task<PostUserResponseDto> AddAsync(PostUserRequestDto value)
    {
        var userByEmail = await _repo.FindByEmail(new Email(value.Email));
        if (userByEmail is not null) throw new UserException("Email already registered.");

        var User = _mapper.Map<User>(value);

        await _repo.AddAsync(User);

        try
        {
            await this._unitOfWork.CommitAsync();
        }
        catch { }

        return _mapper.Map<PostUserResponseDto>(User);
    }

    public async Task<object> UpdateAsync(object value)
    {
        throw new NotImplementedException();
    }

    public Task<object> InactivateAsync(object id)
    {
        throw new NotImplementedException();
    }

    public Task<object> DeleteAsync(object id)
    {
        throw new NotImplementedException();
    }




        /// <summary>
        /// Aonymizes a user by calling the domain function Anonymize and then persisting the data in the DB.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<GetUserResponseDto> AnonymizeAsync(string id)
    {
        if (id is null)
        {
            throw new ArgumentNullException(nameof(id));
        }

        User user = await _repo.GetByIdAsync(new UserId(Guid.Parse(id)));

        user.Anonymize();

        await this._unitOfWork.CommitAsync();

        return _mapper.Map<GetUserResponseDto>(user);
    }

    public async Task<GetUserResponseDto> ValidateUserAsync(ValidateUserDto userDto)
    {
        var userByGoogle = await _repo.FindByGoogle(new GoogleId(userDto.GoogleId));
        if (userByGoogle is not null)
            return _mapper.Map<GetUserResponseDto>(userByGoogle);

        var userByEmail = await _repo.FindByEmail(new Email(userDto.Email));
        if (userByEmail is null) throw new UserException("User does not exist.");

        userByEmail.BindGoogleId(new GoogleId(userDto.GoogleId));

        await this._unitOfWork.CommitAsync();

        return _mapper.Map<GetUserResponseDto>(userByEmail);

    }
}
