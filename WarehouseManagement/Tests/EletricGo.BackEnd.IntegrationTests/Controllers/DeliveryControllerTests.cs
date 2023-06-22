using AutoFixture;
using EletricGo.BackEnd.Controllers;
using EletricGo.BackEnd.Dtos.Delivery;
using EletricGo.BackEnd.Services;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using FluentAssertions;
using MapsterMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Net;

namespace EletricGo.BackEnd.IntegrationTests.Controllers;

public sealed class DeliveryControllerTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IDeliveryRepository> _mockDeliveryRepository;
    private readonly Mock<IMapper> _mockMapper;
    private readonly Mock<IWarehouseRepository> _mockWarehouseRepository;
    private readonly DeliveryService _serviceUnderTest;
    private readonly DeliveryController _controllerUnderTest;
    private readonly Fixture _fixture;


    public DeliveryControllerTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockDeliveryRepository = new Mock<IDeliveryRepository>();
        _mockMapper = new Mock<IMapper>();
        _mockWarehouseRepository = new Mock<IWarehouseRepository>();

        _fixture = new Fixture();
        _serviceUnderTest = new DeliveryService(_mockUnitOfWork.Object, _mockDeliveryRepository.Object, _mockMapper.Object, _mockWarehouseRepository.Object);
        _controllerUnderTest = new DeliveryController(_serviceUnderTest);
    }

    // Get
    [Fact]
    public async Task GetAll_WithNoRegisteredDelivers_ShouldReturnNoContent()
    {
        // Arrange
        _mockDeliveryRepository.Setup(x => x.GetAllAsync())
            .ReturnsAsync(Enumerable.Empty<Delivery>().ToList());

        // Act
        ActionResult<IList<GetDeliveryResponseDto>> response = await _controllerUnderTest.Get();

        // Assert
        response.Result.Should().BeOfType<NoContentResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.NoContent);

        _mockDeliveryRepository.Verify(x => x.GetAllAsync(), Times.Exactly(1));
    }

        [Fact]
    public async Task Get_WithNonExistentDeliveryId_RespondWithBadRequest()
    {
        // Arrange
        var nonExistentDeliveryId = "6b2dd6e5-5ae3-4d18-8e56-a24361fc33b3";

        _mockDeliveryRepository.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()));

        // Act
        ActionResult<GetDeliveryResponseDto> response = await _controllerUnderTest.Get(nonExistentDeliveryId);

        // Assert
        response.Result.Should().BeOfType<NotFoundResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.NotFound);

        _mockDeliveryRepository.Verify(x => x.GetByIdAsync(It.IsAny<DeliveryId>()), Times.Exactly(1));
    }

    [Fact]
    public async Task Get_by_id_respond_object()
    {
        // Arrange
        var expected = _fixture.Create<GetDeliveryResponseDto>();
        var validDelivery = GetValidDelivery();
        var mappingResult = new GetDeliveryResponseDto()
        {
            Id = expected.Id,
            Load = expected.Load,
            DeliveryDate = expected.DeliveryDate
        };
        var validDeliveryId = "6b2dd6e5-5ae3-4d18-8e56-a24361fc33b3";
        _mockDeliveryRepository.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                                .ReturnsAsync(validDelivery);

        _mockMapper.Setup(x => x.Map<GetDeliveryResponseDto>(It.IsAny<Delivery>()))
            .Returns(mappingResult);

        // Act
        ActionResult<GetDeliveryResponseDto> response = await _controllerUnderTest.Get(validDeliveryId);

        // Assert
        response.Result.Should().BeOfType<OkObjectResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.OK);

        response.Should().NotBeNull();

        var result = response.Result.As<OkObjectResult>().Value as GetDeliveryResponseDto;

        result.Id.Should().Be(expected.Id);
        result.Load.Should().Be(expected.Load);
        result.DeliveryDate.Should().Be(expected.DeliveryDate);

        _mockDeliveryRepository.Verify(x => x.GetByIdAsync(It.IsAny<DeliveryId>()), Times.Exactly(1));
        _mockMapper.Verify(x => x.Map<GetDeliveryResponseDto>(It.IsAny<Delivery>()), Times.Exactly(1));
    }


    private Delivery GetValidDelivery()
    {
        var deliveryDate = DateTime.Now.AddDays(2);
        var load = new Load(10);

        return new Delivery(deliveryDate, load, new WarehouseId(Guid.NewGuid().ToString()));
    }

    [Fact]
    public void Patch_WithDeliveryIdNotExistent_ShouldRespondeWithBadRequest()
    {
        // Arrange
        Delivery? returnNull = null;
        PatchDeliveryDateRequestDTO requestDTO = new() { Id = Guid.NewGuid(), NewDeliveryDate = DateTime.Now };

        _mockDeliveryRepository.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                               .ReturnsAsync(returnNull);

        ///Act
        var result = _controllerUnderTest.Patch(requestDTO);

        // Assert
        Assert.True(result.Result is BadRequestObjectResult);
        Assert.True(((BadRequestObjectResult)result.Result).StatusCode == 400);
        _mockDeliveryRepository.Verify(x => x.GetByIdAsync(It.IsAny<DeliveryId>()), Times.Once);
    }

    [Fact]
    public void voidPatch_WithValidDate_ShouldUpdateDateAndRespondeWithOk()
    {
        // Arrange
        Guid id = Guid.NewGuid();
        Load load = new(10);
        DeliveryId deliveryId = new(id);
        Delivery delivery = new(deliveryId, DateTime.Now.AddDays(2), load, new WarehouseId(Guid.NewGuid().ToString()));
        DateTime newDateTime = DateTime.Now.AddDays(5);
        PatchDeliveryDateRequestDTO requestDTO = new() { Id = id, NewDeliveryDate = newDateTime };

        _mockDeliveryRepository.Setup(x => x.GetByIdAsync(deliveryId))
                               .ReturnsAsync(delivery);
        _mockUnitOfWork.Setup(x => x.CommitAsync());

        //Act
        var result = _controllerUnderTest.Patch(requestDTO);

        // Assert
        Assert.True(result.Result is OkResult);
        Assert.True(((OkResult)result.Result).StatusCode == 200);
        Assert.True(delivery.DeliveryDate == newDateTime);
    }
}
