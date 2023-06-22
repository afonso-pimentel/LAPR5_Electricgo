import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import PlanningController from '../../../src/controllers/PlanningController';
import IPlanningRequestDTO from '../../../src/dto/IPlanningRequestDTO';
import IPlanningResponseDTO from '../../../src/dto/IPlanningResponseDTO';
import ITripService from '../../../src/services/IServices/ITripService';
import ITripDTO from '../../../src/dto/ITripDTO';
import IPlanningService from '../../../src/services/IServices/IPlanningService';

describe('planning controller', function() {
  const sandbox = sinon.createSandbox();

  //Setup Dependency Injection
  beforeEach(function() {
    Container.reset();
    
    let PlanningRepoClass = require('../../../src/repos/PlanningRepo').default;
    let PlanningRepoInstance = Container.get(PlanningRepoClass);
    Container.set('PlanningRepo', PlanningRepoInstance);

    let tripSchemaInstance = require('../../../src/persistence/schemas/tripSchema').default;
    Container.set('tripSchema', tripSchemaInstance);

    let PlanningStrategyClass = require('../../../src/strategies/planning/PlanningStrategy').default;
    let PlanningStrategyInstance = Container.get(PlanningStrategyClass);
    Container.set('PlanningStrategy', PlanningStrategyInstance);
    
    let deliveryPackageRepoClass = require('../../../src/repos/DeliveryPackageRepo').default;
    let deliveryPackageRepoInstance = Container.get(deliveryPackageRepoClass);

    let deliverRepoClass = require('../../../src/repos/DeliveryRepo').default;
    let deliverRepoInstance = Container.get(deliverRepoClass);

    Container.set('DeliveryPackageRepo', deliveryPackageRepoInstance);
    Container.set('DeliveryRepo', deliverRepoInstance);

    let PathRepoClass = require('../../../src/repos/PathRepo').default;
    let PathRepoInstance = Container.get(PathRepoClass);
    Container.set('PathRepo', PathRepoInstance);

    let WarehouseRepoClass = require('../../../src/repos/WarehouseRepo').default;
    let WarehouseRepoInstance = Container.get(WarehouseRepoClass);
    Container.set('WarehouseRepo', WarehouseRepoInstance);

    let TripRepoClass = require('../../../src/repos/TripRepo').default;
    let TripRepoInstance = Container.get(TripRepoClass);
    Container.set('TripRepo', TripRepoInstance);

    let PlanningServiceClass = require('../../../src/services/PlanningService').default;
    let PlanningServiceInstance = Container.get(PlanningServiceClass);
    Container.set('PlanningService', PlanningServiceInstance);

    let TripServiceClass = require('../../../src/services/TripService').default;
    let TripServiceInstance = Container.get(TripServiceClass);
    Container.set('TripService', TripServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  //Declare the tests
  //#region createPath
  it(
    'get planning with valid request should persist trip',
    getPlanning_WithValidRequest_ShouldPersistTrip,
  );

  it(
    'get planning with invalid request should not persist trip',
    getPlanning_WithValidRequest_ShouldNotPersistTrip,
  );
});

//Add some global variables to the test
const planningResponseDTO = {
    listOrderDeliveries: ["f52f2735-caff-45ae-a210-54370a80800f",
                          "10f1bcbb-a370-4040-9461-6ce184a918ce",
                          "aeba6553-d915-42ef-82d0-a0a528b5ac54",
                          "47fb76c8-6a38-4742-a991-00d374221e7b",
                          "872a025e-2d6f-4e06-b159-52f4757d7a06",
                          "d8408472-0758-4195-ad5d-41a55f4cd256",
                          "8e412c75-e29e-4dde-8b5d-4993c9a0336d"
                        ],
    listOrderWarehouses: [ "c2b7777d-6ba1-40c4-9fbe-470ddc165393",
                            "bc6b0307-3531-42f2-864d-9f5d74b13789",
                            "68699020-a01e-4b50-bb19-8e041f6d1a75",
                            "ef6ff355-bdb1-4c10-b5ad-6d45bf1ab958",
                            "ed904a97-3463-4b08-aea7-cb28d743f3c7",
                            "fcdf630f-c87e-4c16-9ccf-b01632793549",
                            "00e6e562-683e-4057-af59-24b35c6ce09a"
                        ],
    listWarehousesToCharge: [ "68699020-a01e-4b50-bb19-8e041f6d1a75", "00e6e562-683e-4057-af59-24b35c6ce09a"],
    listWarehousesQuantityToCharge: [ "40.72542372881355", "27.940677966101696"],
    listWarehousesTimeToCharge: ["50.90677966101694", "34.92584745762712"],
    planningCost: 477.70872881355933
  } as IPlanningResponseDTO;


// Add all the test functions here

//#region createPath
async function getPlanning_WithValidRequest_ShouldPersistTrip() {
  // Arrange
  let PlanningServiceInstance = Container.get('PlanningService');
  let TripServiceInstance = Container.get('TripService');

  let req: Partial<Request> = {};
  req.params = {
    truckId: "65-20-VA",
    date: "28-12-2022",
    heuristic: "1",
  };

  const planningRequestDTO = {
    truckId: req.params.truckId,
    date: req.params.date,
    heuristic: req.params.heuristic,
  } as IPlanningRequestDTO;

  let res: Partial<Response> = {};
  res.json = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let PlanningServiceMock = sinon
                            .mock(PlanningServiceInstance, 'getPlanning')
                            .expects('getPlanning')
                            .once()
                            .withArgs(sinon.match(planningRequestDTO))
                            .returns(Result.ok<IPlanningResponseDTO>(planningResponseDTO));

  let TripServiceMock = sinon
                        .mock(TripServiceInstance, 'createTrip')
                        .expects('createTrip')
                        .once()
                        .returns(Result.ok<ITripDTO>());

  const ctrl = new PlanningController(PlanningServiceInstance as IPlanningService, TripServiceInstance as ITripService);

  // Act
  await ctrl.getPlanning(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledOnce(PlanningServiceMock);
  sinon.assert.calledOnce(TripServiceMock);
  sinon.assert.called(res.json);
}

async function getPlanning_WithValidRequest_ShouldNotPersistTrip() {
    // Arrange
    let PlanningServiceInstance = Container.get('PlanningService');
    let TripServiceInstance = Container.get('TripService');
  
    let req: Partial<Request> = {};
    req.params = {
      truckId: "65-20-VA",
      date: "28-12-2022",
      heuristic: "1",
    };
  
    const planningRequestDTO = {
      truckId: req.params.truckId,
      date: req.params.date,
      heuristic: req.params.heuristic,
    } as IPlanningRequestDTO;
  
    let res: Partial<Response> = {};
    
    res.status = sinon.spy();
  
    let next: Partial<NextFunction> = () => {};
  
    let PlanningServiceMock = sinon
                              .mock(PlanningServiceInstance, 'getPlanning')
                              .expects('getPlanning')
                              .once()
                              .withArgs(sinon.match(planningRequestDTO))
                              .returns(Result.fail<IPlanningResponseDTO>(planningResponseDTO));
  
    let TripServiceMock = sinon
                          .mock(TripServiceInstance, 'createTrip')
                          .expects('createTrip')
                          .once()
                          .returns(Result.ok<ITripDTO>());
  
    const ctrl = new PlanningController(PlanningServiceInstance as IPlanningService, TripServiceInstance as ITripService);
  
    // Act
    await ctrl.getPlanning(<Request>req, <Response>res, <NextFunction>next);
  
    // Assert
    sinon.assert.calledOnce(PlanningServiceMock);
    sinon.assert.notCalled(TripServiceMock);
  }

//#endregion
