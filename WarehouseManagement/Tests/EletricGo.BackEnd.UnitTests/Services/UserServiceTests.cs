using AutoFixture;
using EletricGo.BackEnd.Dtos.Delivery;
using EletricGo.BackEnd.Dtos.User;
using EletricGo.BackEnd.Services;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using MapsterMapper;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EletricGo.BackEnd.UnitTests.Services;

public sealed class UserServiceTests
{

    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly Mock<IMapper> _mockMapper;
    private readonly UserService _serviceUnderTest;
    private readonly Fixture _fixture;

    public UserServiceTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockUserRepository = new Mock<IUserRepository>();
        _mockMapper = new Mock<IMapper>();

        _fixture = new Fixture();
        _serviceUnderTest = new UserService(_mockUnitOfWork.Object, _mockUserRepository.Object, _mockMapper.Object);
    }

    [Fact]
    public async void Test_GetAllAsync_Returns_Expected_Results()
    {
        // Arrange
        var listGuids = new List<Guid> { Guid.NewGuid(), Guid.NewGuid() };

        var users = new List<User>
        {
            new User(new UserId(listGuids[0]), "John Doe", new PhoneNumber("123456789"), Role.FleetManager, new Email("test@test.tes"), null),
            new User(new UserId(listGuids[1]), "Jane Doe", new PhoneNumber("987654321"), Role.Admin, new Email("test@test.tes"), null)
        };

        var usersMapp = new List<GetUserResponseDto>
        {
            new GetUserResponseDto() {Name = "John Doe", PhoneNumber = "123456789", Role = Role.FleetManager.Id, Id = listGuids[0].ToString() },
            new GetUserResponseDto() { Name = "Jane Doe", PhoneNumber = "987654321", Role = Role.Admin.Id, Id = listGuids[1].ToString() }
        };

        _mockUserRepository.Setup(r => r.GetAllAsync()).ReturnsAsync(users);

        _mockMapper.Setup(x => x.Map<IList<GetUserResponseDto>>(It.IsAny<IList<User>>())).Returns(usersMapp);

        // Act
        var result = await _serviceUnderTest.GetAllAsync();

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal(usersMapp[0], result[0]);
        Assert.Equal(usersMapp[1], result[1]);
    }

    [Fact]
    public async void Test_ValidateUserAsync_ShouldReturnUserWhenGoogleIdFound()
    {
        // Arrange
        var userDto = new ValidateUserDto { GoogleId = "google123", Email = "user@example.com" };
        var user = new User("Test", new PhoneNumber("123456789"), Role.Admin, new Email(userDto.Email), new GoogleId(userDto.GoogleId));

        _mockUserRepository.Setup(repo => repo.FindByGoogle(It.IsAny<GoogleId>()))
            .ReturnsAsync(user);
        _mockUserRepository.Setup(repo => repo.FindByEmail(It.IsAny<Email>()))
            .ReturnsAsync((User)null);


        _mockMapper.Setup(mapper => mapper.Map<GetUserResponseDto>(It.IsAny<User>()))
            .Returns(new GetUserResponseDto());

        // Act
        var result = await _serviceUnderTest.ValidateUserAsync(userDto);

        // Assert
        Assert.NotNull(result);
        _mockUserRepository.Verify(repo => repo.FindByGoogle(It.IsAny<GoogleId>()), Times.Once());
        _mockUserRepository.Verify(repo => repo.FindByEmail(It.IsAny<Email>()), Times.Never());
        _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Never());
        _mockMapper.Verify(mapper => mapper.Map<GetUserResponseDto>(It.IsAny<User>()), Times.Once());
    }

    [Fact]
    public async void Test_ValidateUserAsync_ShouldBindGoogleIdAndReturnUserWhenEmailFound()
    {
        // Arrange
        var userDto = new ValidateUserDto { GoogleId = "google123", Email = "user@example.com" };
        var user = new User("Test", new PhoneNumber("123456789"), Role.Admin, new Email(userDto.Email), null);

        _mockUserRepository.Setup(repo => repo.FindByGoogle(It.IsAny<GoogleId>()))
            .ReturnsAsync((User)null);
        _mockUserRepository.Setup(repo => repo.FindByEmail(It.IsAny<Email>()))
            .ReturnsAsync(user);

        _mockMapper.Setup(mapper => mapper.Map<GetUserResponseDto>(It.IsAny<User>()))
            .Returns(new GetUserResponseDto());

        // Act
        var result = await _serviceUnderTest.ValidateUserAsync(userDto);

        // Assert
        Assert.NotNull(result);
        _mockUserRepository.Verify(repo => repo.FindByGoogle(It.IsAny<GoogleId>()), Times.Once());
        _mockUserRepository.Verify(repo => repo.FindByEmail(It.IsAny<Email>()), Times.Once());
        _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once());
        _mockMapper.Verify(mapper => mapper.Map<GetUserResponseDto>(It.IsAny<User>()), Times.Once());
    }

    [Fact]
    public async void Test_ValidateUserAsync_ShouldThrowUserExceptionWhenEmailAndGoogleIdNotFound()
    {
        // Arrange
        var userDto = new ValidateUserDto { GoogleId = "google123", Email = "user@example.com" };

        _mockUserRepository.Setup(repo => repo.FindByGoogle(It.IsAny<GoogleId>()))
            .ReturnsAsync((User)null);
        _mockUserRepository.Setup(repo => repo.FindByEmail(It.IsAny<Email>()))
            .ReturnsAsync((User)null);

        // Act and Assert
        await Assert.ThrowsAsync<UserException>(() => _serviceUnderTest.ValidateUserAsync(userDto));
        _mockUserRepository.Verify(repo => repo.FindByGoogle(new GoogleId(userDto.GoogleId)), Times.Once());
        _mockUserRepository.Verify(repo => repo.FindByEmail(new Email(userDto.Email)), Times.Once());
    }

    [Fact]
    public async void Test_ValidateUserAsync_ShouldCallCommitAsyncWhenEmailFound()
    {
        // Arrange
        var userDto = new ValidateUserDto { GoogleId = "google123", Email = "user@example.com" };
        var user = new User("Test", new PhoneNumber("123456789"), Role.Admin, new Email(userDto.Email), null);

        _mockUserRepository.Setup(repo => repo.FindByGoogle(It.IsAny<GoogleId>()))
            .ReturnsAsync((User)null);
        _mockUserRepository.Setup(repo => repo.FindByEmail(It.IsAny<Email>()))
            .ReturnsAsync(user);

        // Act
        await _serviceUnderTest.ValidateUserAsync(userDto);

        // Assert
        _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once());
    }

    [Fact]
    public async void Test_ValidateUserAsync_ShouldMapUserToGetUserResponseDto()
    {
        // Arrange
        var userDto = new ValidateUserDto { GoogleId = "google123", Email = "user@example.com" };
        var user = new User("Test", new PhoneNumber("123456789"), Role.Admin, new Email(userDto.Email), null);

        _mockUserRepository.Setup(repo => repo.FindByGoogle(It.IsAny<GoogleId>()))
            .ReturnsAsync((User)null);
        _mockUserRepository.Setup(repo => repo.FindByEmail(It.IsAny<Email>()))
            .ReturnsAsync(user);

        // Act
        await _serviceUnderTest.ValidateUserAsync(userDto);

        // Assert
        _mockMapper.Verify(mapper => mapper.Map<GetUserResponseDto>(user), Times.Once());
    }
}
