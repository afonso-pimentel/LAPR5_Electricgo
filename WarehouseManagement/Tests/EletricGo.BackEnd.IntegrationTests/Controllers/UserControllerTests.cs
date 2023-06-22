using AutoFixture;
using EletricGo.BackEnd.Controllers;
using EletricGo.BackEnd.Dtos.User;
using EletricGo.BackEnd.Services;
using EletricGo.Domain.Models.UserAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using FluentAssertions;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Net;

namespace EletricGo.BackEnd.IntegrationTests.Controllers;

public sealed class UserControllerTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IUserRepository> _mockUserRepository;
    private readonly Mock<IMapper> _mockMapper;
    private readonly UserService _serviceUnderTest;
    private readonly UserController _controllerUnderTest;
    private readonly Fixture _fixture;

    public UserControllerTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockUserRepository = new Mock<IUserRepository>();
        _mockMapper = new Mock<IMapper>();
        _fixture = new Fixture();
        _serviceUnderTest = new UserService(_mockUnitOfWork.Object, _mockUserRepository.Object, _mockMapper.Object);
        _controllerUnderTest = new UserController(_serviceUnderTest);
    }

    // Get
    [Fact]
    public async Task GetAll_WithNoRegisteredUsers_ShouldReturnNoContent()
    {
        // Arrange
        _mockUserRepository.Setup(x => x.GetAllAsync()).ReturnsAsync(Enumerable.Empty<User>().ToList());

        // Act
        ActionResult<IList<GetUserResponseDto>> response = await _controllerUnderTest.Get();

        // Assert
        response.Result.Should().BeOfType<NoContentResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.NoContent);

        _mockUserRepository.Verify(x => x.GetAllAsync(), Times.Exactly(1));
    }


    [Fact]
    public async void Test_ValidateUser_ShouldReturnUserWhenGoogleIdFound()
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
        ActionResult< GetUserResponseDto > response = await _controllerUnderTest.ValidateUser(userDto);

        // Assert
        response.Result.Should().BeOfType<OkObjectResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.OK);
        _mockUserRepository.Verify(repo => repo.FindByGoogle(It.IsAny<GoogleId>()), Times.Once());
        _mockUserRepository.Verify(repo => repo.FindByEmail(It.IsAny<Email>()), Times.Never());
        _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Never());
        _mockMapper.Verify(mapper => mapper.Map<GetUserResponseDto>(It.IsAny<User>()), Times.Once());
    }

    [Fact]
    public async void Test_ValidateUser_ShouldBindGoogleIdAndReturnUserWhenEmailFound()
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
        ActionResult<GetUserResponseDto> response = await _controllerUnderTest.ValidateUser(userDto);

        // Assert
        response.Result.Should().BeOfType<OkObjectResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.OK);
        _mockUserRepository.Verify(repo => repo.FindByGoogle(It.IsAny<GoogleId>()), Times.Once());
        _mockUserRepository.Verify(repo => repo.FindByEmail(It.IsAny<Email>()), Times.Once());
        _mockUnitOfWork.Verify(uow => uow.CommitAsync(), Times.Once());
        _mockMapper.Verify(mapper => mapper.Map<GetUserResponseDto>(It.IsAny<User>()), Times.Once());
    }

    [Fact]
    public async void Test_ValidateUser_ShouldThrowUserExceptionWhenEmailAndGoogleIdNotFound()
    {
        // Arrange
        var userDto = new ValidateUserDto { GoogleId = "google123", Email = "user@example.com" };

        _mockUserRepository.Setup(repo => repo.FindByGoogle(It.IsAny<GoogleId>()))
            .ReturnsAsync((User)null);
        _mockUserRepository.Setup(repo => repo.FindByEmail(It.IsAny<Email>()))
            .ReturnsAsync((User)null);
        ActionResult<GetUserResponseDto> response = await _controllerUnderTest.ValidateUser(userDto);
        // Act and Assert
        response.Result.Should().BeOfType<BadRequestObjectResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.BadRequest);
        _mockUserRepository.Verify(repo => repo.FindByGoogle(new GoogleId(userDto.GoogleId)), Times.Once());
        _mockUserRepository.Verify(repo => repo.FindByEmail(new Email(userDto.Email)), Times.Once());
    }

}
