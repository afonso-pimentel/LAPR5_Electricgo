using AutoFixture;
using EletricGo.BackEnd.Controllers;
using EletricGo.BackEnd.Dtos.Warehouse;
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

/// <summary>
/// Warehouse controller integration tests.
/// </summary>
public class WarehouseControllerTests
{
    private readonly Mock<IUnitOfWork> _mockUnitOfWork;
    private readonly Mock<IWarehouseRepository> _mockWarehouseRepository;
    private readonly Mock<IDeliveryRepository> _mockDeliveryRepository;
    private readonly Mock<IMapper> _mockMapper;
    private readonly Fixture _fixture;
    private readonly WarehouseService _serviceUnderTest;
    private readonly WarehouseController _controllerUnderTest;

    public WarehouseControllerTests()
    {
        _mockUnitOfWork = new Mock<IUnitOfWork>();
        _mockWarehouseRepository = new Mock<IWarehouseRepository>();
        _mockDeliveryRepository = new Mock<IDeliveryRepository>();
        _mockMapper = new Mock<IMapper>();
        _fixture = new Fixture();
        _serviceUnderTest = new WarehouseService(_mockUnitOfWork.Object, _mockWarehouseRepository.Object, _mockMapper.Object, _mockDeliveryRepository.Object);
        _controllerUnderTest = new WarehouseController(_serviceUnderTest);
    }

    [Fact]
    public async Task Put_WithWarehouseIdNonExistent_ShouldRespondeWithBadRequest()
    {
        // Arrange
        Warehouse? returnNull = null;
        var requestDTO = _fixture.Create<PutWarehouseRequestDto>();

        _mockWarehouseRepository.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                               .ReturnsAsync(returnNull);

        ///Act
        ActionResult<PutWarehouseResponseDto> result = await _controllerUnderTest.Put(_fixture.Create<Guid>(), requestDTO);

        // Assert
        result.Result.Should().BeOfType<BadRequestResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.BadRequest);

        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
    }

    [Fact]
    public async Task Put_WithExistentWarehouseId_ShouldRespondeWithOkAndExpectedResponseObject()
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
        ActionResult<PutWarehouseResponseDto> response = await _controllerUnderTest.Put(_fixture.Create<Guid>(), expected);

        // Assert
        response.Result.Should().BeOfType<OkObjectResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.OK);

        response.Should().NotBeNull();

        var result = response.Result.As<OkObjectResult>().Value as PutWarehouseResponseDto;

        result.Altitude.Should().Be(expected.Altitude);
        result.Latitude.Should().Be(expected.Latitude);
        result.Longitude.Should().Be(expected.Longitude);
        result.Designation.Should().Be(expected.Designation);
        result.StreetName.Should().Be(expected.StreetName);
        result.Number.Should().Be(expected.Number);
        result.Locality.Should().Be(expected.Locality);
        result.ZipCode.Should().BeEquivalentTo(expected.ZipCode);

        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
        _mockUnitOfWork.Verify(x => x.CommitAsync(), Times.Exactly(1));
        _mockMapper.Verify(x => x.Map<PutWarehouseResponseDto>(It.IsAny<Warehouse>()), Times.Exactly(1));
    }


    [Fact]
    public async Task Put_WithExistentWarehouseIdButWithBadLatitudeArgument_ShouldRespondeWithBadRequest()
    {
        // Arrange
        Warehouse validWarehouse = GetValidWarehouse();

        var requestDTO = _fixture.Create<PutWarehouseRequestDto>();
        requestDTO.Latitude = 43.34433434333m;

        _mockWarehouseRepository.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                               .ReturnsAsync(validWarehouse);

        ///Act
        ActionResult<PutWarehouseResponseDto> result = await _controllerUnderTest.Put(_fixture.Create<Guid>(), requestDTO);

        // Assert
        result.Result.Should().BeOfType<BadRequestResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.BadRequest);

        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
    }

    [Fact]
    public async Task Get_WithExistentWarehouseId_ShouldRespondWithOkAndExpectedResponseObject()
    {
        // Arrange
        Warehouse validWarehouse = GetValidWarehouse();
        var expected = _fixture.Create<GetWarehouseRequestDTO>();
        var validWarehouseId = "6b2dd6e5-5ae3-4d18-8e56-a24361fc33b3";

        var mappingResult = new GetWarehouseRequestDTO()
        {
            ID = expected.ID,
            Code = expected.Code,
            Description = expected.Description,
            StreetName = expected.StreetName,
            DoorNumber = expected.DoorNumber,
            Locality = expected.Locality
        };

        _mockWarehouseRepository.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()))
                                .ReturnsAsync(validWarehouse);

        _mockMapper.Setup(x => x.Map<GetWarehouseRequestDTO>(It.IsAny<Warehouse>()))
            .Returns(mappingResult);

        // Act
        ActionResult<GetWarehouseRequestDTO> response = await _controllerUnderTest.Get(validWarehouseId);

        // Assert
        response.Result.Should().BeOfType<OkObjectResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.OK);

        response.Should().NotBeNull();

        var result = response.Result.As<OkObjectResult>().Value as GetWarehouseRequestDTO;

        result.ID.Should().Be(expected.ID);
        result.Code.Should().Be(expected.Code);
        result.Description.Should().Be(expected.Description);
        result.StreetName.Should().Be(expected.StreetName);
        result.DoorNumber.Should().Be(expected.DoorNumber);
        result.Locality.Should().Be(expected.Locality);

        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
        _mockMapper.Verify(x => x.Map<GetWarehouseRequestDTO>(It.IsAny<Warehouse>()), Times.Exactly(1));
    }

    [Fact]
    public async Task Get_WithNonExistentWarehouseId_ShouldRespondShouldRespondeWithBadRequest()
    {
        // Arrange
        var nonExistentWarehouseId = "6b2dd6e5-5ae3-4d18-8e56-a24361fc33b3";

        _mockWarehouseRepository.Setup(x => x.GetByIdAsync(It.IsAny<WarehouseId>()));

        // Act
        ActionResult<GetWarehouseRequestDTO> response = await _controllerUnderTest.Get(nonExistentWarehouseId);

        // Assert
        response.Result.Should().BeOfType<NotFoundResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.NotFound);

        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(It.IsAny<WarehouseId>()), Times.Exactly(1));
    }

    [Fact]
    public async Task GetAll_WithNoRegisteredWarehouses_ShouldReturnNoContent()
    {
        // Arrange
        _mockWarehouseRepository.Setup(x => x.GetAllAsync())
            .ReturnsAsync(Enumerable.Empty<Warehouse>().ToList());

        // Act
        ActionResult<GetWarehouseRequestDTO> response = await _controllerUnderTest.Get(true);

        // Assert
        response.Result.Should().BeOfType<NoContentResult>()
        .Which.StatusCode.Should().Be((int)HttpStatusCode.NoContent);

        _mockWarehouseRepository.Verify(x => x.GetAllAsync(), Times.Exactly(1));
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

        //Act 
        ActionResult<GetWarehouseRequestDTO> response = await _controllerUnderTest.Delete(rndId);

        //Assert
        response.Result.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be((int)HttpStatusCode.BadRequest);
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
        
        //Act 
        ActionResult<GetWarehouseRequestDTO> response = await _controllerUnderTest.Delete(warehouse.Id.AsGuid());

        //Assert
        response.Result.Should().BeOfType<BadRequestObjectResult>().Which.StatusCode.Should().Be((int)HttpStatusCode.BadRequest);
        _mockWarehouseRepository.Verify(x => x.GetByIdAsync(warehouse.Id), Times.Exactly(1));
        _mockDeliveryRepository.Verify(x => x.GetByWarehouseInFutureAsync(warehouse.Id.AsGuid()), Times.Exactly(1));
    }

    [Fact]
    public async Task Inactivate_WithValidData_ShouldReturnDto()
    {
        // Arrange
        var warehouse = GetValidWarehouse();
        var expected1 = new GetWarehouseRequestDTO() { ID = warehouse.Id.Value, Code = warehouse.Code.Value };

        var listDeliveries = new List<Delivery>();

        _mockWarehouseRepository.Setup(_ => _.GetByIdAsync(warehouse.Id)).ReturnsAsync(warehouse);
        _mockDeliveryRepository.Setup(_ => _.GetByWarehouseInFutureAsync(warehouse.Id.AsGuid())).ReturnsAsync(listDeliveries);
        _mockMapper.Setup(x => x.Map<GetWarehouseRequestDTO>(It.IsAny<Warehouse>())).Returns(expected1);

        //Act 
        ActionResult<GetWarehouseRequestDTO> response = await _controllerUnderTest.Delete(warehouse.Id.AsGuid());

        //Assert
        response.Result.Should().BeOfType<NoContentResult>().Which.StatusCode.Should().Be((int)HttpStatusCode.NoContent);
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

