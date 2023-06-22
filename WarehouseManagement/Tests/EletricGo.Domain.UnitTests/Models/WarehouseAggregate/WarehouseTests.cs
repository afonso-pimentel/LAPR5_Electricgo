using System;
using EletricGo.Domain.Models.WarehouseAggregate;
using FluentAssertions;

namespace EletricGo.Domain.UnitTests.Models.WarehouseAggregate;

/// <summary>
/// WarehouseAggregate unit tests.
/// </summary>
public sealed class WarehouseTests
{
    private readonly Warehouse _warehouse;

    public WarehouseTests()
    {
        var address = new Address("Mercantil António Vaz", "243", "4333-403", "Porto");
        var coordinates = new Coordinates(41.1579m, -8.6291053m, 33);
        var designation = new Designation("Armazém na rua do Mercantil no Porto");
        var warehouse = new WarehouseCode("A11");

        _warehouse = new Warehouse(address, coordinates, designation, warehouse);
    }

    [Fact]
    public void Update_WithValidArguments_ShouldReturnExpectedUpdatedValues()
    {
        // Arrange
        var expectedAddress = new Address("Joaquim Almeida Portuário", "111", "4333-403", "Porto");
        var expectedCoordinates = new Coordinates(40.6412m, -8.65362m, 55);
        var expectedDesignation = new Designation("Armazém na rua de Joaquim Almeida no Porto");

        // Act
        _warehouse.UpdateWarehouse(expectedAddress, expectedCoordinates, expectedDesignation);
        Address resultAddress = _warehouse.Address;
        Coordinates resultCoordinates = _warehouse.Coordinates;
        Designation resultDesignation = _warehouse.Designation;

        // Assert
        resultAddress.Should().BeEquivalentTo(expectedAddress);
        resultCoordinates.Should().BeEquivalentTo(expectedCoordinates);
        resultDesignation.Should().BeEquivalentTo(expectedDesignation);
    }

    [Fact]
    public void Deactivate_WithValidArguments_ShouldReturnExpectedValue()
    {
        // Act
        _warehouse.DeactivateWarehouse();

        // Assert
        _warehouse.IsActive.Should().BeFalse();
    }
}
