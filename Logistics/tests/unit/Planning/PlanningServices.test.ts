import 'reflect-metadata';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Container } from 'typedi';
import IPathRepo from '../../../src/services/IRepos/IPathRepo';
import IWarehouseRepo from '../../../src/services/IRepos/IWarehouseRepo';
import IPlanningRepo from '../../../src/services/IRepos/IPlanningRepo';
import IDeliveryRepo from '../../../src/services/IRepos/IDeliveryRepo';
import IDeliveryPackageRepo from '../../../src/services/IRepos/IDeliveryPackageRepo';
import IPlanningRequestDTO from '../../../src/dto/IPlanningRequestDTO';
import PlanningService from '../../../src/services/PlanningService';
import _ from 'lodash';
import IDeliveryDTO from '../../../src/dto/IDeliveryDTO';
import { IWarehouseDTO } from '../../../src/dto/IWarehouseDTO';
import { Path } from '../../../src/domain/PathAggregate/Path';
import { DeliveryPackage } from '../../../src/domain/DeliveryPackageAggregate/DeliveryPackage';
import IPlanningStrategy from '../../../src/strategies/IStrategies/IPlanningStrategy';
import config from '../../../config';
import ITruckRepo from '../../../src/services/IRepos/ITruckRepo';
import IPrologPlanningResponseDTO from '../../../src/dto/IPrologPlanningResponseDTO';
import IPrologPlanningByDayResponseDTO from '../../../src/dto/IPrologPlanningByDayResponseDTO';
import { TruckLicensePlate } from '../../../src/domain/TruckAggregate/TruckLicensePlate';
import { Truck } from '../../../src/domain/TruckAggregate/Truck';

describe('Planning service', function() {
  const sandbox = sinon.createSandbox();

  //Setup Dependency Injection
  beforeEach(function() {
    Container.reset();
    let PathSchemaInstance = require('../../../src/persistence/schemas/pathSchema').default;
    Container.set('pathSchema', PathSchemaInstance);

    let PathRepoClass = require('../../../src/repos/PathRepo').default;
    let PathRepoInstance = Container.get(PathRepoClass);
    Container.set('PathRepo', PathRepoInstance);

    let WarehouseRepoClass = require('../../../src/repos/WarehouseRepo').default;
    let WarehouseRepoInstance = Container.get(WarehouseRepoClass);
    Container.set('WarehouseRepo', WarehouseRepoInstance);

    let deliveryPackageSchemaInstance = require('../../../src/persistence/schemas/deliveryPackageSchema').default;
    Container.set('deliveryPackageSchema', deliveryPackageSchemaInstance);

    let deliveryPackageRepoClass = require('../../../src/repos/DeliveryPackageRepo').default;
    let deliveryPackageRepoInstance = Container.get(deliveryPackageRepoClass);

    let deliverRepoClass = require('../../../src/repos/DeliveryRepo').default;
    let deliverRepoInstance = Container.get(deliverRepoClass);

    Container.set('DeliveryPackageRepo', deliveryPackageRepoInstance);
    Container.set('DeliveryRepo', deliverRepoInstance);

    let PlanningRepoClass = require('../../../src/repos/PlanningRepo').default;
    let PlanningRepoInstance = Container.get(PlanningRepoClass);
    Container.set('PlanningRepo', PlanningRepoInstance);

    let TruckRepoClass = require('../../../src/repos/TruckRepo').default;
    let TruckRepoInstance = Container.get(TruckRepoClass);
    Container.set('TruckRepo', TruckRepoInstance);

    let PlanningServiceClass = require('../../../src/services/PathService').default;
    let PlanningServiceInstance = Container.get(PlanningServiceClass);
    Container.set('PlanningService', PlanningServiceInstance);

    let PlanningStrategyClass = require('../../../src/strategies/planning/PlanningStrategy').default;
    let PlanningStrategyInstance = Container.get(PlanningStrategyClass);
    Container.set('PlanningStrategy', PlanningStrategyInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  //Declare the tests
  //#region getPlanning
  it(
    'getPlanning With No Deliveries Found Should Return Failed Result',
    getPlanning_WithNoDeliveriesForTheSpecifiedDate_ShouldReturnResultFail,
  );
  it(
    'getPlanning with No Warehouses Found Should Return Result Fail',
    getPlanning_WithNoWarehousesFound_ShouldReturnResultFail,
  );
  it(
    'getPlanning with No Matosinhos Warehouse Found Should Return Result Fail',
    getPlanning_WithNoMatosinhosWarehouse_ShouldReturnResultFail,
  );
  it('getPlanning with No Paths Found Should Return Result Fail', getPlanning_WithNoPaths_ShouldReturnResultFail);
  it(
    'getPlanning with No Delivery Package Should Return Result Fail',
    getPlanning_WithNoDeliveryPackage_ShouldReturnResultFail,
  );
  it('getPlanning with Valid Data Should Return Result Success', getPlanning_WithValidInputs_ShouldReturnResultSuccess);
  //#endregion
  //#region getPaths
  //#endregion
  it('getPlanning with simulation config should return Success', getPlanning_WithSimulation_ShouldReturnResultSuccess);
  it('getPlanning with prolog config should return Success', getPlanning_WithProlog_ShouldReturnResultSuccess);
  ///#region getPlanningByDay
  it(
    'getPlanningByDay With No Deliveries Found Should Return Failed Result',
    getPlanningByDay_WithNoDeliveriesForTheSpecifiedDate_ShouldReturnResultFail,
  );
  it(
    'getPlanningByDay with No Warehouses Found Should Return Result Fail',
    getPlanningByDay_WithNoWarehousesFound_ShouldReturnResultFail,
  );
  it(
    'getPlanningByDay with No Matosinhos Warehouse Found Should Return Result Fail',
    getPlanningByDay_WithNoMatosinhosWarehouse_ShouldReturnResultFail,
  );
  it('getPlanningByDay with No Paths Found Should Return Result Fail', getPlanningByDay_WithNoPaths_ShouldReturnResultFail);
  it(
    'getPlanningByDay with No Delivery Package Should Return Result Fail',
    getPlanningByDay_WithNoDeliveryPackage_ShouldReturnResultFail,
  );
  it('getPlanningByDay with No Trucks Should Return Result Fail', getPlanningByDay_WithNoTrucks_ShouldReturnResultFail);
  it('getPlanningByDay with Valid Data Should Return Result Success', getPlanningByDay_WithValidInputs_ShouldReturnResultSuccess);
  //#endregion
});

const deliveries = [
  {
    id: '93621a5f-91e0-4922-a8c3-aa5bfd42ade2',
    warehouseId: '5088c74a-f2d2-4193-80d4-ea7b2c0ad1a6',
    deliveryDate: '29-11-2022',
    load: 300,
  },
  {
    id: '93621a5f-91e0-4922-a8c3-aa5bfd455de2',
    warehouseId: '5088c74a-f2d2-4193-80d4-ea788c0ad1a6',
    deliveryDate: '29-11-2022',
    load: 400,
  },
] as IDeliveryDTO[];

const deliveryPackages = ([
  {
    id: '5088c74a-f2d2-4193-80d4-ea788c0ad1a6',
    deliveryId: '93621a5f-91e0-4922-a8c3-aa5bfd42ade2',
    loadTime: 123123,
    unloadTime: 123123,
    x: 123,
    y: 123,
    z: 123,
  },
  {
    id: '5088c74a-f2d2-4193-80d4-ea788c0ad1a7',
    deliveryId: '93621a5f-91e0-4922-a8c3-aa5bfd455de2',
    loadTime: 123123,
    unloadTime: 123123,
    x: 123,
    y: 123,
    z: 123,
  },
] as unknown) as DeliveryPackage[];

const warehousesWithNoMatosinhosWarehouse = [
  {
    id: '93621a5f-91e0-4922-a8c3-aa5bfd42ade2',
    code: 'A01',
    description: 'Test warehouse',
    streetName: 'Street',
    doorNumber: '32',
    locality: 'Arouca',
  },
  {
    id: '93621a5f-91e0-4922-a8c3-aa5bfd42ade2',
    code: 'A02',
    description: 'Test warehouse 2',
    streetName: 'Street 2',
    doorNumber: '322',
    locality: 'Espinho',
  },
] as IWarehouseDTO[];

const warehouses = [
  {
    id: '93621a5f-91e0-4922-a8c3-aa5bfd42ade2',
    code: 'A01',
    description: 'Test warehouse',
    streetName: 'Street',
    doorNumber: '32',
    locality: 'Matosinhos',
  },
  {
    id: '93621a5f-91e0-4922-a8c3-aa5bfd42ade2',
    code: 'A02',
    description: 'Test warehouse 2',
    streetName: 'Street 2',
    doorNumber: '322',
    locality: 'Espinho',
  },
] as IWarehouseDTO[];

const paths = ([
  {
    id: '93621a5f-91e0-4922-a8c3-aa5bfd42ade2',
    startWarehouse: '5088c74a-f2d2-4193-80d4-ea7b2c0ad1a6',
    endWarehouse: '5088c74a-f2d2-4193-80d4-ea7b2c0ad155',
    distance: 10,
    pathTime: 10,
    spentEnergy: 10,
    extraChargeTime: 10,
  },
  {
    id: '93621a5f-91e0-4922-a8c3-aa5bfd42a552',
    startWarehouse: '5088c74a-f2d2-4193-80d4-ea7b2c0ad166',
    endWarehouse: '5088c74a-f2d2-4193-80d4-ea7b2c0ad175',
    distance: 10,
    pathTime: 10,
    spentEnergy: 10,
    extraChargeTime: 10,
  },
] as unknown) as Path[];

const trucks = ([
  {
    id: '93d1a5f-91e0-4922-a8c3-aa5bfs2ade2',
    tare: 1,
    loadCapacity: 1,
    fullLoadAutonomy: 1,
    battery: 1,
    licensePlate: 1,
    isActive: true
  },
] as unknown) as Truck[];

const prologByDayResponse = [{
  camiao: '1',
  listaOrdemEntregas: ['1'],
  listaOrdemArmazens: ['1'],
  listaCarregamentosArmazem: ['1'],
  listaQuantidadesCarregamento: ['1'],
  listaTemposCarregamentoArmazem: ['1'],
  custo: 33,
}] as IPrologPlanningByDayResponseDTO[];

const prologResponse = {
  listaOrdemEntregas: ['1'],
  listaOrdemArmazens: ['1'],
  listaCarregamentosArmazem: ['1'],
  listaQuantidadesCarregamento: ['1'],
  listaTemposCarregamentoArmazem: ['1'],
  custo: 33,
} as IPrologPlanningResponseDTO;

//#region getPlanning

async function getPlanning_WithNoDeliveriesForTheSpecifiedDate_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(null);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanning(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanning_WithNoWarehousesFound_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(null);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanning(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanning_WithNoMatosinhosWarehouse_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehousesWithNoMatosinhosWarehouse);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanning(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanning_WithNoPaths_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehouses);

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanning(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanning_WithNoDeliveryPackage_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehouses);

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findByDeliveryId')
    .expects('findByDeliveryId')
    .once()
    .withArgs(sinon.match(deliveries[0].id))
    .returns(null);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanning(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanning_WithValidInputs_ShouldReturnResultSuccess() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehouses);

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(paths);

  sinon
    .stub(deliveryPackageRepoInstance, 'findByDeliveryId')
    .withArgs(deliveries[0].id)
    .returns(deliveryPackages[0])
    .withArgs(deliveries[1].id)
    .returns(deliveryPackages[1]);

  const planningRepoMock = sinon
    .mock(planningStrategyInstance, 'getPlanning')
    .expects('getPlanning')
    .once()
    .returns(prologResponse);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanning(planningRequest);

  // Assert
  expect(result.isSuccess).to.equals(true);
}

//#endregion

async function getPlanning_WithSimulation_ShouldReturnResultSuccess() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  let currentPlanningStrategy = config.planningStrategy; // Save the current strategy

  config.planningStrategy = 'simulated'; // Set the strategy to simulated

  const expectedSimulationResponse = {
    listaOrdemEntregas: ['1'],
    listaOrdemArmazens: ['1'],
    listaCarregamentosArmazem: ['1'],
    listaQuantidadesCarregamento: ['1'],
    listaTemposCarregamentoArmazem: ['1'],
    custo: 33,
  };

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehouses);

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(paths);

  sinon
    .stub(deliveryPackageRepoInstance, 'findByDeliveryId')
    .withArgs(deliveries[0].id)
    .returns(deliveryPackages[0])
    .withArgs(deliveries[1].id)
    .returns(deliveryPackages[1]);

  const planningRepoMock = sinon
    .mock(planningStrategyInstance, 'getPlanning')
    .expects('getPlanning')
    .once()
    .returns(prologResponse);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanning(planningRequest);

  // assert if result.value is equal to expectedSimulationResponse
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).to.deep.equals(expectedSimulationResponse);

  config.planningStrategy = currentPlanningStrategy; // Restore the strategy
}

async function getPlanning_WithProlog_ShouldReturnResultSuccess() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  let currentPlanningStrategy = config.planningStrategy; // Save the current strategy

  config.planningStrategy = 'prolog'; // Set the strategy to simulated

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehouses);

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(paths);

  sinon
    .stub(deliveryPackageRepoInstance, 'findByDeliveryId')
    .withArgs(deliveries[0].id)
    .returns(deliveryPackages[0])
    .withArgs(deliveries[1].id)
    .returns(deliveryPackages[1]);

  const planningRepoMock = sinon
    .mock(planningStrategyInstance, 'getPlanning')
    .expects('getPlanning')
    .once()
    .returns(prologResponse);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanning(planningRequest);

  // assert if result.value is equal to expectedSimulationResponse
  expect(result.isSuccess).to.equals(true);

  config.planningStrategy = currentPlanningStrategy; // Restore the strategy
}

//#region getPlanningByDay

async function getPlanningByDay_WithNoDeliveriesForTheSpecifiedDate_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(null);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanningByDay(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanningByDay_WithNoWarehousesFound_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(null);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanningByDay(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanningByDay_WithNoMatosinhosWarehouse_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehousesWithNoMatosinhosWarehouse);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanning(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanningByDay_WithNoPaths_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehouses);

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  sinon
   .mock(truckRepoInstance, 'findAll')
   .expects('findAll')
   .once()
   .returns(null);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanningByDay(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanningByDay_WithNoDeliveryPackage_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehouses);

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  sinon
    .mock(truckRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findByDeliveryId')
    .expects('findByDeliveryId')
    .once()
    .withArgs(sinon.match(deliveries[0].id))
    .returns(null);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanningByDay(planningRequest);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanningByDay_WithNoTrucks_ShouldReturnResultFail() {
  // Arrange
 let pathRepoInstance = Container.get('PathRepo');
 let warehouseRepoInstance = Container.get('WarehouseRepo');
 let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
 let deliveryRepoInstance = Container.get('DeliveryRepo');
 let planningStrategyInstance = Container.get('PlanningStrategy');
 let truckRepoInstance = Container.get('TruckRepo');

 const planningRequest = {
   truckId: '',
   date: '28-11-2022',
 } as IPlanningRequestDTO;

 const deliveryRepoMock = sinon
   .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
   .expects('getDeliveriesForSpecificDate')
   .once()
   .withArgs(sinon.match(planningRequest.date))
   .returns(deliveries);

 const warehouseRepoMock = sinon
   .mock(warehouseRepoInstance, 'listOfWarehouses')
   .expects('listOfWarehouses')
   .once()
   .returns(warehouses);

 const pathRepoMock = sinon
   .mock(pathRepoInstance, 'findAll')
   .expects('findAll')
   .once()
   .returns(paths);

 sinon
   .stub(deliveryPackageRepoInstance, 'findByDeliveryId')
   .withArgs(deliveries[0].id)
   .returns(deliveryPackages[0])
   .withArgs(deliveries[1].id)
   .returns(deliveryPackages[1]);

  sinon
   .mock(truckRepoInstance, 'findAll')
   .expects('findAll')
   .once()
   .returns(null);

 const planningRepoMock = sinon
   .mock(planningStrategyInstance, 'getPlanningByDay')
   .expects('getPlanningByDay')
   .once()
   .returns(null);

 const serv = new PlanningService(
   planningStrategyInstance as IPlanningStrategy,
   pathRepoInstance as IPathRepo,
   warehouseRepoInstance as IWarehouseRepo,
   deliveryPackageRepoInstance as IDeliveryPackageRepo,
   deliveryRepoInstance as IDeliveryRepo,
   truckRepoInstance as ITruckRepo
 );

 // Act
 var result = await serv.getPlanningByDay(planningRequest);

 // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPlanningByDay_WithValidInputs_ShouldReturnResultSuccess() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');
  let planningStrategyInstance = Container.get('PlanningStrategy');
  let truckRepoInstance = Container.get('TruckRepo');

  const planningRequest = {
    truckId: '',
    date: '28-11-2022',
  } as IPlanningRequestDTO;

  const deliveryRepoMock = sinon
    .mock(deliveryRepoInstance, 'getDeliveriesForSpecificDate')
    .expects('getDeliveriesForSpecificDate')
    .once()
    .withArgs(sinon.match(planningRequest.date))
    .returns(deliveries);

  const warehouseRepoMock = sinon
    .mock(warehouseRepoInstance, 'listOfWarehouses')
    .expects('listOfWarehouses')
    .once()
    .returns(warehouses);

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(paths);

  sinon
    .stub(deliveryPackageRepoInstance, 'findByDeliveryId')
    .withArgs(deliveries[0].id)
    .returns(deliveryPackages[0])
    .withArgs(deliveries[1].id)
    .returns(deliveryPackages[1]);

  sinon
    .mock(truckRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(trucks);

  const planningRepoMock = sinon
    .mock(planningStrategyInstance, 'getPlanningByDay')
    .expects('getPlanningByDay')
    .once()
    .returns(prologByDayResponse);

  const serv = new PlanningService(
    planningStrategyInstance as IPlanningStrategy,
    pathRepoInstance as IPathRepo,
    warehouseRepoInstance as IWarehouseRepo,
    deliveryPackageRepoInstance as IDeliveryPackageRepo,
    deliveryRepoInstance as IDeliveryRepo,
    truckRepoInstance as ITruckRepo
  );

  // Act
  var result = await serv.getPlanningByDay(planningRequest);

  // Assert
  expect(result.isSuccess).to.equals(true);
}
//#endregion