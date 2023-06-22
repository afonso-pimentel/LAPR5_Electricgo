using AutoFixture;
using EletricGo.BackEnd.Dtos.Delivery;
using EletricGo.BackEnd.Services;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using FluentAssertions;
using MapsterMapper;
using Moq;

namespace EletricGo.BackEnd.UnitTests.Services;

public sealed class DeliveryServiceTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IDeliveryRepository> _mockDeliveryRepository;
    private readonly Mock<IMapper> _mockMapper;
    private readonly Mock<IWarehouseRepository> _mockWarehouseRepository;
    private readonly DeliveryService _serviceUnderTest;
    private readonly Fixture _fixture;


    public DeliveryServiceTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockDeliveryRepository = new Mock<IDeliveryRepository>();
        _mockMapper = new Mock<IMapper>();
        _mockWarehouseRepository = new Mock<IWarehouseRepository>();

        _fixture = new Fixture();
        _serviceUnderTest = new DeliveryService(_mockUnitOfWork.Object, _mockDeliveryRepository.Object, _mockMapper.Object, _mockWarehouseRepository.Object);
    }


    [Fact]
    public async Task Get_WithWrongDeliveryIdFormatArgument_ShouldThrowFormatException()
    {
        // Arrange
        var invalidDeliveryId = "aaaaaaa";

        //Act & Assert
        Assert.ThrowsAsync<FormatException>(() => _serviceUnderTest.GetByIdAsync(invalidDeliveryId));
    }

    [Fact]
    public async Task Get_WithDeliveryIdNotRegistered_ShouldReturnNullResponse()
    {
        // Arrange
        Delivery? nullDelivery = null;
        var validDeliveryId = "6b2dd6e5-5ae3-4d18-8e56-a24361fc33b4";

        // Act
        GetDeliveryResponseDto? response = await _serviceUnderTest.GetByIdAsync(validDeliveryId);

        // Assert
        response.Should().BeNull();
        _mockDeliveryRepository.Verify(x => x.GetByIdAsync(It.IsAny<DeliveryId>()), Times.Exactly(1));
    }

    [Fact]
    public async Task Get_WithDeliveryIdRegistered_ShouldReturnValidResponse()
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
        _mockMapper.Setup(x => x.Map<GetDeliveryResponseDto>(It.IsAny<Delivery>())).Returns(mappingResult);

        // Act
        GetDeliveryResponseDto? response = await _serviceUnderTest.GetByIdAsync(validDeliveryId);

        // Assert
        response.Should().NotBeNull();
        response.Id.Should().Be(expected.Id);
        response.Load.Should().Be(expected.Load);
        response.DeliveryDate.Should().Be(expected.DeliveryDate);

        _mockDeliveryRepository.Verify(x => x.GetByIdAsync(It.IsAny<DeliveryId>()), Times.Exactly(1));
        _mockMapper.Verify(x => x.Map<GetDeliveryResponseDto>(It.IsAny<Delivery>()), Times.Exactly(1));

    }

        [Fact]
    public async Task GetAll_ShouldReturnValidResponse()
    {
        // Arrange
        List<Delivery> deliverys = new List<Delivery>();

        var expected1 = _fixture.Create<GetDeliveryResponseDto>();
        var expected2 = _fixture.Create<GetDeliveryResponseDto>();

        var mappingResult = new List<GetDeliveryResponseDto>();
        mappingResult.Add(expected1);
        mappingResult.Add(expected2);

        deliverys.Add(GetValidDelivery());
        deliverys.Add(GetValidDelivery());

        _mockDeliveryRepository.Setup(_ => _.GetAllAsync()).ReturnsAsync(deliverys);
        _mockMapper.Setup(x => x.Map<IList<GetDeliveryResponseDto>>(It.IsAny<IList<Delivery>>())).Returns(mappingResult);

        // Act
        IList<GetDeliveryResponseDto>? response = await _serviceUnderTest.GetAllAsync();

        // Assert
        response.Should().NotBeNull();
        response.Count.Should().Be(2);
        _mockDeliveryRepository.Verify(x => x.GetAllAsync(), Times.Exactly(1));
        _mockMapper.Verify(x => x.Map<IList<GetDeliveryResponseDto>>(It.IsAny<IList<Delivery>>()), Times.Exactly(1));

    }

    private Delivery GetValidDelivery()
    {
        var deliveryDate = DateTime.Now.AddDays(2);
        var load = new Load(10);

        return new Delivery(deliveryDate, load, new WarehouseId(Guid.NewGuid().ToString()));
    }


    [Fact]
    public void UpdateAsync_WithDeliveryIdNotExistent_ShouldThrowDeliveryException()
    {
        // Arrange
        Delivery? returnNull = null;
        PatchDeliveryDateRequestDTO requestDTO = new() { Id = Guid.NewGuid(), NewDeliveryDate = DateTime.Now };

        _mockDeliveryRepository.Setup(x => x.GetByIdAsync(It.IsAny<DeliveryId>()))
                               .ReturnsAsync(returnNull);

        // Act & Assert
        Assert.ThrowsAsync<DeliveryException>(() => _serviceUnderTest.UpdateAsync(requestDTO));
        _mockDeliveryRepository.Verify(x => x.GetByIdAsync(It.IsAny<DeliveryId>()), Times.Once);
    }

    [Fact]
    public void UpdateAsync_WithInvalidDate_ShouldThrowDeliveryException()
    {
        // Arrange
        Guid id = Guid.NewGuid();
        Load load = new(10);
        DeliveryId deliveryId = new(id);
        Delivery delivery = new(deliveryId, DateTime.Now.AddDays(2), load, new WarehouseId(Guid.NewGuid().ToString()));
        PatchDeliveryDateRequestDTO requestDTO = new() { Id = Guid.NewGuid(), NewDeliveryDate = DateTime.Now };

        _mockDeliveryRepository.Setup(x => x.GetByIdAsync(deliveryId))
                               .ReturnsAsync(delivery);

        // Act & Assert
        Assert.ThrowsAsync<DeliveryException>(() => _serviceUnderTest.UpdateAsync(requestDTO));//chamar com os parametros
        _mockDeliveryRepository.Verify(x => x.GetByIdAsync(It.IsAny<DeliveryId>()), Times.Once);

    }

    [Fact]
    public async void UpdateAsync_WithValidDate_ShouldUpdateDateAndCallUnitOfWork()
    {
        // Arrange
        Guid id = Guid.NewGuid();
        Load load = new(10);
        DeliveryId deliveryId = new(id);
        Delivery delivery = new(deliveryId, DateTime.Now.AddDays(2), load, new WarehouseId(Guid.NewGuid()));
        DateTime newDateTime = DateTime.Now.AddDays(5);
        PatchDeliveryDateRequestDTO requestDTO = new() { Id = id, NewDeliveryDate = newDateTime };

        //adiconar dto com data valida

        _mockDeliveryRepository.Setup(x => x.GetByIdAsync(deliveryId))
                               .ReturnsAsync(delivery);
        _mockUnitOfWork.Setup(x => x.CommitAsync());

        //Act
        await _serviceUnderTest.UpdateAsync(requestDTO);

        // Assert
        Assert.True(delivery.DeliveryDate == newDateTime);
        _mockDeliveryRepository.Verify(x => x.GetByIdAsync(deliveryId), Times.Once);
        _mockUnitOfWork.Verify(x => x.CommitAsync(), Times.Once);
    }

}
