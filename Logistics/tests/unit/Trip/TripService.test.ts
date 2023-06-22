import 'reflect-metadata';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Container } from 'typedi';
import TripService from '../../../src/services/TripService';
import ITripDTO from '../../../src/dto/ITripDTO';
import { Trip } from '../../../src/domain/TripAggregate/Trip';
import ITripRepo from '../../../src/services/IRepos/ITripRepo';
import IWarehouseRepo from '../../../src/services/IRepos/IWarehouseRepo';
import _ from 'lodash';

describe('trip service', function() {
  const sandbox = sinon.createSandbox();

  //Setup Dependency Injection
  beforeEach(function() {
    Container.reset();
    let TripSchemaInstance = require('../../../src/persistence/schemas/tripSchema').default;
    Container.set('tripSchema', TripSchemaInstance);

    let TripRepoClass = require('../../../src/repos/TripRepo').default;
    let TripRepoInstance = Container.get(TripRepoClass);
    Container.set('TripRepo', TripRepoInstance);

    let WarehouseRepoClass = require('../../../src/repos/WarehouseRepo').default;
    let WarehouseRepoInstance = Container.get(WarehouseRepoClass);
    Container.set('WarehouseRepo', WarehouseRepoInstance);

    let TripServiceClass = require('../../../src/services/TripService').default;
    let TripServiceInstance = Container.get(TripServiceClass);
    Container.set('TripService', TripServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  //Declare the tests
  //#region getTripsWithPagination
  it(
    'getTripsWithPagination With Existing Trips Should Return Trips List Of Trips',
    getTripsWithPagination_WithExistingTrips_ShouldReturnExpectedListOfTrips,
  );
});

//#endregion

//Add some global variables to the test
const tripId1 = 'bebf8731-3e92-4860-b53f-2ba42478270a';
const tripId2 = '88e3dd2c-d80b-4984-8dd2-05ece83abb5b';
const tripId3 = 'd8a985d3-7475-4309-8d72-3e1cfa47cc4c';
const warehouseId1 = 'b5b5b5b5-b5b5-b5b5-b5b5-b5b5b5b5b5b5';
const warehouseId2 = 'c6c6c6c6-c6c6-c6c6-c6c6-c6c6c6c6c6c6';
const warehouseId3 = 'd7d7d7d7-d7d7-d7d7-d7d7-d7d7d7d7d7d7';
const warehouseId4 = 'e8e8e8e8-e8e8-e8e8-e8e8-e8e8e8e8e8e8';
const warehouseId5 = 'f9f9f9f9-f9f9-f9f9-f9f9-f9f9f9f9f9f9';
const warehouseId6 = 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0';
const warehouseId7 = 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1';
const warehouseId8 = 'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2';
const warehouseId9 = 'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3';
const deliveryId1 = 'e8e8e8e8-e8e8-e8e8-e8e8-e8e8e8e8e8e8';
const deliveryId2 = 'f9f9f9f9-f9f9-f9f9-f9f9-f9f9f9f9f9f9';
const deliveryId3 = 'a0a0a0a0-a0a0-a0a0-a0a0-a0a0a0a0a0a0';
const deliveryId4 = 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1';
const deliveryId5 = 'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2';
const deliveryId6 = 'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3';
const deliveryId7 = 'e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e4e4';
const deliveryId8 = 'f5f5f5f5-f5f5-f5f5-f5f5-f5f5f5f5f5f5';
const deliveryId9 = 'a6a6a6a6-a6a6-a6a6-a6a6-a6a6a6a6a6a6';
const truckId1 = 'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b1b1';
const truckId2 = 'c2c2c2c2-c2c2-c2c2-c2c2-c2c2c2c2c2c2';
const truckId3 = 'd3d3d3d3-d3d3-d3d3-d3d3-d3d3d3d3d3d3';

const TripExpected1 = ({
  id: tripId1,
  truckId: truckId1,
  date: '2022-01-01',
  warehouseIds: [warehouseId1, warehouseId2, warehouseId3],
  deliveryIds: [deliveryId1, deliveryId2, deliveryId3],
  areWarehousesToCharge: [true, false, true],
  chargeQuantities: [100, 0, 50],
  chargeTimes: [30, 0, 20],
  planningCost: 200,
  heuristic: '1',
} as unknown) as ITripDTO;

const TripExpected2 = ({
  id: tripId2,
  truckId: truckId2,
  date: '2022-02-01',
  warehouseIds: [warehouseId4, warehouseId5, warehouseId6],
  deliveryIds: [deliveryId4, deliveryId5, deliveryId6],
  areWarehousesToCharge: [false, true, false],
  chargeQuantities: [0, 75, 0],
  chargeTimes: [0, 15, 0],
  planningCost: 300,
  heuristic: '2',
} as unknown) as ITripDTO;

const TripExpected3 = ({
  id: tripId3,
  truckId: truckId3,
  date: '2022-03-01',
  warehouseIds: [warehouseId7, warehouseId8, warehouseId9],
  deliveryIds: [deliveryId7, deliveryId8, deliveryId9],
  areWarehousesToCharge: [true, false, true],
  chargeQuantities: [120, 0, 90],
  chargeTimes: [40, 0, 30],
  planningCost: 400,
  heuristic: '3',
} as unknown) as ITripDTO;

const TripToReturn1 = ({
  id: tripId1,
  truckId: truckId1,
  date: '2022-01-01',
  tripStops: [
    {
      warehouseId: warehouseId1,
      deliveryId: deliveryId1,
      isWarehouseToCharge: true,
      chargeQuantity: 100,
      chargeTime: 30,
    },
    {
      warehouseId: warehouseId2,
      deliveryId: deliveryId2,
      isWarehouseToCharge: false,
      chargeQuantity: 0,
      chargeTime: 0,
    },
    {
      warehouseId: warehouseId3,
      deliveryId: deliveryId3,
      isWarehouseToCharge: true,
      chargeQuantity: 50,
      chargeTime: 20,
    },
  ],
  planningCost: 200,
  heuristic: '1',
} as unknown) as Trip;

const TripToReturn2 = ({
  id: tripId2,
  truckId: truckId2,
  date: '2022-02-01',
  tripStops: [
    {
      warehouseId: warehouseId4,
      deliveryId: deliveryId4,
      isWarehouseToCharge: false,
      chargeQuantity: 0,
      chargeTime: 0,
    },
    {
      warehouseId: warehouseId5,
      deliveryId: deliveryId5,
      isWarehouseToCharge: true,
      chargeQuantity: 75,
      chargeTime: 15,
    },
    {
      warehouseId: warehouseId6,
      deliveryId: deliveryId6,
      isWarehouseToCharge: false,
      chargeQuantity: 0,
      chargeTime: 0,
    },
  ],
  planningCost: 300,
  heuristic: '2',
} as unknown) as Trip;

const TripToReturn3 = ({
  id: tripId3,
  truckId: truckId3,
  date: '2022-03-01',
  tripStops: [
    {
      warehouseId: warehouseId7,
      deliveryId: deliveryId7,
      isWarehouseToCharge: true,
      chargeQuantity: 120,
      chargeTime: 40,
    },
    {
      warehouseId: warehouseId8,
      deliveryId: deliveryId8,
      isWarehouseToCharge: false,
      chargeQuantity: 0,
      chargeTime: 0,
    },
    {
      warehouseId: warehouseId9,
      deliveryId: deliveryId9,
      isWarehouseToCharge: true,
      chargeQuantity: 90,
      chargeTime: 30,
    },
  ],
  planningCost: 400,
  heuristic: '3',
} as unknown) as Trip;

const tripPageArrayToReturn = ([[TripToReturn1, TripToReturn2, TripToReturn3], 1] as unknown) as [Trip[], number];

const tripPageArrayExpected = ([[TripExpected1, TripExpected2, TripExpected3], 1] as unknown) as [ITripDTO[], number];

//Implement the tests
//#region getTripsWithPagination
async function getTripsWithPagination_WithExistingTrips_ShouldReturnExpectedListOfTrips() {
  // Arrange
  let tripRepoInstance = Container.get('TripRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');

  const tripRepoMock = sinon
    .mock(tripRepoInstance, 'findAllWithPagination')
    .expects('findAllWithPagination')
    .once()
    .withArgs(0, 10)
    .returns(tripPageArrayToReturn);

  const serv = new TripService(tripRepoInstance as ITripRepo, warehouseRepoInstance as IWarehouseRepo);

  // Act
  const result = await serv.getTripsWithPagination(0, 10);

  // Assert
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).deep.to.equal(tripPageArrayExpected);
}
