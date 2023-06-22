using AutoFixture;
using EletricGo.BackEnd.Dtos.Warehouse;
using EletricGo.BackEnd.Services;
using EletricGo.Domain.Models.DeliveryAggregate;
using EletricGo.Domain.Models.WarehouseAggregate;
using EletricGo.Domain.Repositories;
using EletricGo.Domain.Shared;
using FluentAssertions;
using MapsterMapper;
using Moq;

namespace EletricGo.BackEnd.UnitTests.Services;

public sealed class WarehouseServiceTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IWarehouseRepository> _mockWarehouseRepository;
    private readonly Mock<IDeliveryRepository> _mockDeliveryRepository;
    private readonly Mock<IMapper> _mockMapper;
    private readonly Fixture _fixture;
    private readonly WarehouseService _warehouseService;

    public WarehouseServiceTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockWarehouseRepository = new Mock<IWarehouseRepository>();
        _mockDeliveryRepository = new Mock<IDeliveryRepository>();
        _mockMapper = new Mock<IMapper>();
        _fixture = new Fixture();
        _warehouseService = new WarehouseService(_mockUnitOfWork.Object, _mockWarehouseRepository.Object, _mockMapper.Object, _mockDeliveryRepository.Object);
    }

    [Fact]
    public async Task UpdateAsync_WithWarehouseIdNotRegistered_ShouldReturnNullResponse()
    {
        // Arrange
        Warehouse? nullWarehouse = null;
        var requestDTO = _fixture.Create<PutWarehouseRequestDto>();

        _mockWarehouseRepository.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                                .ReturnsAsync(nullWarehouse);

        // Act
        PutWarehouseResponseDto? response = await _warehouseService.UpdateAsync(requestDTO, _fixture.Create<Guid>());

        // Assert
        response.Should().BeNull();
        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
    }

    [Fact]
    public async Task UpdateAsync_WithWarehouseIdRegistered_ShouldUpdateAndReturnValidPutResponse()
    {
        // Arrange
        Warehouse validWarehouse = GetValidWarehouse();
        var expected = _fixture.Create<PutWarehouseRequestDto>();

        var mappingResult = new PutWarehouseResponseDto()
        {
            Altitude = expected.Altitude,
            Latitude = expected.Latitude,
            Longitude = expected.Longitude,
            Designation = expected.Designation,
            StreetName = expected.StreetName,
            Number = expected.Number,
            Locality = expected.Locality,
            ZipCode = expected.ZipCode
        };

        _mockWarehouseRepository.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                                .ReturnsAsync(validWarehouse);

        _mockUnitOfWork.Setup(x => x.CommitAsync());

        _mockMapper.Setup(x => x.Map<PutWarehouseResponseDto>(It.IsAny<Warehouse>()))
            .Returns(mappingResult);

        // Act
        PutWarehouseResponseDto? response = await _warehouseService.UpdateAsync(expected, _fixture.Create<Guid>());

        // Assert
        response.Should().NotBeNull();
        response.Altitude.Should().Be(expected.Altitude);
        response.Latitude.Should().Be(expected.Latitude);
        response.Longitude.Should().Be(expected.Longitude);
        response.Designation.Should().Be(expected.Designation);
        response.StreetName.Should().Be(expected.StreetName);
        response.Number.Should().Be(expected.Number);
        response.Locality.Should().Be(expected.Locality);
        response.ZipCode.Should().BeEquivalentTo(expected.ZipCode);

        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
        _mockUnitOfWork.Verify(x => x.CommitAsync(), Times.Exactly(1));
        _mockMapper.Verify(x => x.Map<PutWarehouseResponseDto>(It.IsAny<Warehouse>()), Times.Exactly(1));
    }

    [Fact]
    public void UpdateAsync_WithExistentWarehouseButInvalidLatitudeArgument_ShouldThrowWarehouseException()
    {
        // Arrange
        Warehouse validWarehouse = GetValidWarehouse();

        var requestDTO = _fixture.Create<PutWarehouseRequestDto>();
        requestDTO.Latitude = 43.34433434333m;

        _mockWarehouseRepository.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                               .ReturnsAsync(validWarehouse);

        ///Act & Assert
        Assert.ThrowsAsync<WarehouseException>(() => _warehouseService.UpdateAsync(requestDTO, Guid.NewGuid()));
        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
    }

    [Fact]
    public async Task Get_WithWrongWarehouseIdFormatArgument_ShouldThrowFormatException()
    {
        // Arrange
        var invalidWarehouseId = "aaaaaaa";

        //Act & Assert
        Assert.ThrowsAsync<FormatException>(() => _warehouseService.GetByIdAsync(invalidWarehouseId));
    }

    [Fact]
    public async Task Get_WithWarehouseIdNotRegistered_ShouldReturnNullResponse()
    {
        // Arrange
        Warehouse? nullWarehouse = null;
        var validWarehouseId = "6b2dd6e5-5ae3-4d18-8e56-a24361fc33b4";

        // Act
        GetWarehouseRequestDTO? response = await _warehouseService.GetByIdAsync(validWarehouseId);

        // Assert
        response.Should().BeNull();
        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
    }

    [Fact]
    public async Task Get_WithWarehouseIdRegistered_ShouldReturnValidResponse()
    {
        // Arrange
        var expected = _fixture.Create<GetWarehouseRequestDTO>();
        var validWarehouse = GetValidWarehouse();
        var mappingResult = new GetWarehouseRequestDTO()
        {
            ID = expected.ID,
            Code = expected.Code,
            Description = expected.Description,
            StreetName = expected.StreetName,
            DoorNumber = expected.DoorNumber,
            Locality = expected.Locality
        };

        var validWarehouseId = "6b2dd6e5-5ae3-4d18-8e56-a24361fc33b3";
        _mockWarehouseRepository.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                                .ReturnsAsync(validWarehouse);
        _mockMapper.Setup(x => x.Map<GetWarehouseRequestDTO>(It.IsAny<Warehouse>())).Returns(mappingResult);

        // Act
        GetWarehouseRequestDTO? response = await _warehouseService.GetByIdAsync(validWarehouseId);

        // Assert
        response.Should().NotBeNull();
        response.ID.Should().Be(expected.ID);
        response.Code.Should().Be(expected.Code);
        response.Description.Should().Be(expected.Description);
        response.StreetName.Should().Be(expected.StreetName);
        response.DoorNumber.Should().Be(expected.DoorNumber);
        response.Locality.Should().Be(expected.Locality);

        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
        _mockMapper.Verify(x => x.Map<GetWarehouseRequestDTO>(It.IsAny<Warehouse>()), Times.Exactly(1));

    }

    [Fact]
    public async Task GetAll_ShouldReturnValidResponse()
    {
        // Arrange
        List<Warehouse> warehouses = new List<Warehouse>();

        var expected1 = _fixture.Create<GetWarehouseRequestDTO>();
        var expected2 = _fixture.Create<GetWarehouseRequestDTO>();

        var mappingResult = new List<GetWarehouseRequestDTO>();
        mappingResult.Add(expected1);
        mappingResult.Add(expected2);

        warehouses.Add(GetValidWarehouse());
        warehouses.Add(GetValidWarehouse());

        _mockWarehouseRepository.Setup(_ => _.GetAllAsync()).ReturnsAsync(warehouses);
        _mockMapper.Setup(x => x.Map<IList<GetWarehouseRequestDTO>>(It.IsAny<IList<Warehouse>>())).Returns(mappingResult);

        // Act
        IList<GetWarehouseRequestDTO>? response = await _warehouseService.GetAllAsync();

        // Assert
        response.Should().NotBeNull();
        response.Count.Should().Be(2);
        _mockWarehouseRepository.Verify(x => x.GetAllAsync(), Times.Exactly(1));
        _mockMapper.Verify(x => x.Map<IList<GetWarehouseRequestDTO>>(It.IsAny<IList<Warehouse>>()), Times.Exactly(1));

    }

    [Fact]
    public async Task Inactivate_WithInvalidId_ShouldThrowWarehouseException()
    {
        // Arrange
        var expected1 = _fixture.Create<GetWarehouseRequestDTO>();
        var warehouse = GetValidWarehouse();


        _mockWarehouseRepository.Setup(_ => _.GetByIdAsync(warehouse.Id)).ReturnsAsync(warehouse);
        _mockMapper.Setup(x => x.Map<GetWarehouseRequestDTO>(It.IsAny<Warehouse>())).Returns(expected1);

        var rndId = Guid.NewGuid();

        //Act & Assert
        await Assert.ThrowsAsync<WarehouseException>(() => _warehouseService.InactivateAsync(rndId));
        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(new WarehouseId(rndId)), Times.Exactly(1));
    }

    [Fact]
    public async Task Inactivate_WithDeliveriesForWarehouse_ShouldThrowWarehouseException()
    {
        // Arrange
        var expected1 = _fixture.Create<GetWarehouseRequestDTO>();
        var warehouse = GetValidWarehouse();

        var listDeliveries = new List<Delivery>() { new Delivery(DateTime.Now.AddDays(1), new Load(1), warehouse.Id) };

        _mockWarehouseRepository.Setup(_ => _.GetByIdAsync(warehouse.Id)).ReturnsAsync(warehouse);
        _mockDeliveryRepository.Setup(_ => _.GetByWarehouseInFutureAsync(warehouse.Id.AsGuid())).ReturnsAsync(listDeliveries);
        _mockMapper.Setup(x => x.Map<GetWarehouseRequestDTO>(It.IsAny<Warehouse>())).Returns(expected1);

        //Act & Assert
        await Assert.ThrowsAsync<WarehouseException>(() => _warehouseService.InactivateAsync(warehouse.Id.AsGuid()));
        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(warehouse.Id), Times.Exactly(1));
        _mockDeliveryRepository.Verify(x => x.GetByWarehouseInFutureAsync(warehouse.Id.AsGuid()), Times.Exactly(1));
    }

    [Fact]
    public async Task Inactivate_WithValidData_ShouldReturnDto()
    {
        // Arrange
        var expected1 = _fixture.Create<GetWarehouseRequestDTO>();
        var warehouse = GetValidWarehouse();

        var listDeliveries = new List<Delivery>();

        _mockWarehouseRepository.Setup(_ => _.GetByIdAsync(warehouse.Id)).ReturnsAsync(warehouse);
        _mockDeliveryRepository.Setup(_ => _.GetByWarehouseInFutureAsync(warehouse.Id.AsGuid())).ReturnsAsync(listDeliveries);
        _mockMapper.Setup(x => x.Map<GetWarehouseRequestDTO>(It.IsAny<Warehouse>())).Returns(expected1);

        //Act
        var result = await _warehouseService.InactivateAsync(warehouse.Id.AsGuid());

        //Act & Assert
        warehouse.IsActive.Should().BeFalse();
        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(warehouse.Id), Times.Exactly(1));
        _mockDeliveryRepository.Verify(x => x.GetByWarehouseInFutureAsync(warehouse.Id.AsGuid()), Times.Exactly(1)); 
    }


    private Warehouse GetValidWarehouse()
    {
        var addressOne = new Address("Mercantil António Vaz", "243", "4333-403", "Porto");
        var coordinatesOne = new Coordinates(41.1579m, -8.6291m, 33);
        var designationOne = new Designation("Armazém na rua do Mercantil no Porto");
        var warehouseCodeOne = new WarehouseCode("A12");

        return new Warehouse(addressOne, coordinatesOne, designationOne, warehouseCodeOne);
    }

}

