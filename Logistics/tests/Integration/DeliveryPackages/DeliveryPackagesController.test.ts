import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import IDeliveryPackageService from '../../../src/services/IServices/IDeliveryPackageService';
import DeliveryPackageController from '../../../src/controllers/DeliveryPackageController';
import IDeliveryPackageDTO from '../../../src/dto/IDeliveryPackageDTO';
import { DeliveryPackage } from '../../../src/domain/DeliveryPackageAggregate/DeliveryPackage';
import IDeliveryPackagePositionDTO from '../../../src/dto/IDeliveryPackagePositionDTO';
import { DeliveryPackagePosition } from '../../../src/domain/DeliveryPackageAggregate/DeliveryPackagePosition';
import { DeliveryId } from '../../../src/domain/DeliveryPackageAggregate/DeliveryId';

describe('deliveryPackage controller', function() {
  const sandbox = sinon.createSandbox();

  //Setup Dependency Injection
  beforeEach(function() {
    Container.reset();
    let deliveryPackageSchemaInstance = require('../../../src/persistence/schemas/deliveryPackageSchema').default;
    Container.set('deliveryPackageSchema', deliveryPackageSchemaInstance);

    let deliveryPackageRepoClass = require('../../../src/repos/DeliveryPackageRepo').default;
    let deliveryPackageRepoInstance = Container.get(deliveryPackageRepoClass);
    Container.set('DeliveryPackageRepo', deliveryPackageRepoInstance);

    let deliveryRepoClass = require('../../../src/repos/DeliveryRepo').default;
    let deliverRepoInstance = Container.get(deliveryRepoClass);
    Container.set("DeliveryRepo", deliverRepoInstance);

    let deliveryPackageServiceClass = require('../../../src/services/DeliveryPackageService').default;
    let deliveryPackageServiceInstance = Container.get(deliveryPackageServiceClass);
    Container.set('DeliveryPackageService', deliveryPackageServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  //Declare the tests
  //#region getDeliveryPackageById
  it(
    'getDeliveryPackageById With DeliveryPackage Not Existing Should Return Status 400',
    getDeliveryPackageByIdNotExistingReturnStatus400,
  );
  it(
    'getDeliveryPackageById With Existing DeliveryPackage Should Return DeliveryPackage Json',
    getDeliveryPackageByIdExistingReturnDeliveryPackageJson,
  );
  it('getDeliveryPackageById With DeliveryPackageId Should Call Repo Once', getDeliveryPackageByIdCallRepoOnce);
  //#endregion

  //#region getAllDeliveryPackages
  it(
    'getAllDeliveryPackages With No DeliveryPackages Found Should Return Status 400',
    getAllDeliveryPackagesNotExistingReturnStatus400,
  );
  it(
    'getAllDeliveryPackages With Existing DeliveryPackage Should Return DeliveryPackage Json',
    getAllDeliveryPackagesExistingReturnDeliveryPackageJson,
  );
  it('getAllDeliveryPackages With DeliveryPackageId Should Call Repo Once', getAllDeliveryPackagesCallRepoOnce);
  //#endregion

  //#region create delivery package
  it('create delivery package with valid data should return expected json response', createDeliveryPackage_WithValidData_ShouldReturnExpectedData);
  it('create delivery package with invalid data should return failed response', createDeliveryPackage_WithoutValidData_ShouldReturnBadRequest);
  it('create delivery with delivery id non existent in warehouse management should return bad request', createDeliveryPackage_WithDeliveryIdNonExistentInWarehouseManager_ShouldReturnBadRequest);
  //#endregion

  //#region EditDeliveryPackage
  it(
    'editDeliveryPackage With Invalid Id Should Return Status 400',
    editDeliveryPackageWithInvalidIdShouldReturnStatus400,
  );
  it(
    'editDeliveryPackage With Valid Id Should Return DeliveryPackage Json',
    editDeliveryPackageWithValidIdShouldReturnDeliveryPackageJson,
  );
  //#endregion
});

//Add some global variables to the test
const deliveryId = 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3';
const deliveryId2 = '2081d214-ea15-4ddc-b1c7-497f50e0dc96';
const deliveryPackageId = '94d8db54-5b4c-4522-a1ff-4944d3f75933';
const deliveryPackageId2 = '11193185-0629-4414-b1d8-5e082630328b';

const deliveryPackageToReturn = ({
  id: deliveryId,
  deliveryId: deliveryPackageId,
  loadTime: 60,
  unloadTime: 60,
  position: {
    x: 1,
    y: 2,
    z: 3,
  },
} as unknown) as DeliveryPackage;

const deliveryPackageExpected = ({
  id: deliveryId,
  deliveryId: deliveryPackageId,
  loadTime: 60,
  unloadTime: 60,
  x: 1,
  y: 2,
  z: 3,
} as unknown) as IDeliveryPackageDTO;

const deliveryPackageToReturn2 = ({
  id: deliveryId2,
  deliveryId: deliveryPackageId2,
  loadTime: 60,
  unloadTime: 60,
  position: {
    x: 1,
    y: 2,
    z: 3,
  },
} as unknown) as DeliveryPackage;

const deliveryPackageExpected2 = ({
  id: deliveryId2,
  deliveryId: deliveryPackageId2,
  loadTime: 60,
  unloadTime: 60,
  x: 1,
  y: 2,
  z: 3,
} as unknown) as IDeliveryPackageDTO;

const deliveryPackageArrayToReturn = ([
  deliveryPackageToReturn,
  deliveryPackageToReturn2,
] as unknown[]) as DeliveryPackage[];

const deliveryPackageArrayExpected = ([
  deliveryPackageExpected,
  deliveryPackageExpected2,
] as unknown[]) as IDeliveryPackageDTO[];

// Add all the test functions here

//#region getDeliveryPackageById
async function getDeliveryPackageByIdNotExistingReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {};
  req.params = {
    id: deliveryPackageId,
  };

  let res: Partial<Response> = {};
  res.status = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let deliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(deliveryPackageId))
    .returns(null);

  const ctrl = new DeliveryPackageController(deliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.getDeliveryPackageById(req as Request, res as Response, next as NextFunction);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function getDeliveryPackageByIdExistingReturnDeliveryPackageJson() {
  // Arrange
  let req: Partial<Request> = {
    params: {
      id: deliveryPackageId,
    },
  };

  let res: Partial<Response> = {
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let deliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(deliveryPackageId))
    .returns(deliveryPackageToReturn);

  const ctrl = new DeliveryPackageController(deliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.getDeliveryPackageById(req as Request, res as Response, next as NextFunction);

  // Assert
  sinon.assert.calledWith(res.json, sinon.match(deliveryPackageExpected));
}
async function getDeliveryPackageByIdCallRepoOnce() {
  // Arrange
  let req: Partial<Request> = {
    params: {
      id: deliveryPackageId,
    },
  };

  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let deliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(deliveryPackageId))
    .returns(null);

  const ctrl = new DeliveryPackageController(deliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.getDeliveryPackageById(req as Request, res as Response, next as NextFunction);

  // Assert
  deliveryPackageRepoMock.verify();
}
//#endregion

//#region getAllDeliveryPackages
async function getAllDeliveryPackagesNotExistingReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {};
  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let deliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const ctrl = new DeliveryPackageController(deliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.getAllDeliveryPackages(req as Request, res as Response, next as NextFunction);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function getAllDeliveryPackagesExistingReturnDeliveryPackageJson() {
  // Arrange
  let req: Partial<Request> = {};

  let res: Partial<Response> = {
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let deliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(deliveryPackageArrayToReturn);

  const ctrl = new DeliveryPackageController(deliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.getAllDeliveryPackages(req as Request, res as Response, next as NextFunction);

  // Assert
  sinon.assert.calledWith(res.json, sinon.match(deliveryPackageArrayExpected));
}
async function getAllDeliveryPackagesCallRepoOnce() {
  // Arrange
  let req: Partial<Request> = {};

  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let deliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const ctrl = new DeliveryPackageController(deliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.getAllDeliveryPackages(req as Request, res as Response, next as NextFunction);

  // Assert
  deliveryPackageRepoMock.verify();
}
//#endregion

//#region EditDeliveryPackage
async function editDeliveryPackageWithInvalidIdShouldReturnStatus400() {
  // Arrange
  //Input Data for the Edit Request
  let deliveryPackageRequestId = 'aaaa';

  const editDeliveryPackageRequestDTO = ({
    x: 8,
    y: 9,
    z: 10,
  } as unknown) as IDeliveryPackagePositionDTO;

  let req: Partial<Request> = {};
  req.params = {
    id: deliveryPackageRequestId,
  };

  req.body = editDeliveryPackageRequestDTO;

  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let deliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .returns(null);

  const ctrl = new DeliveryPackageController(deliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.updateDeliveryPackagePosition(req as Request, res as Response, next as NextFunction);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function editDeliveryPackageWithValidIdShouldReturnDeliveryPackageJson() {
  // Arrange
  //Input Data for the Edit Request

  //Request params
  let deliveryPackageRequestId = 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3';

  //Request Body
  const editDeliveryPackageRequestDTO = ({
    x: 8,
    y: 9,
    z: 10,
  } as unknown) as IDeliveryPackagePositionDTO;

  //Output data for the mock methods
   const findByDomainReturn = DeliveryPackage.create({
    deliveryId: DeliveryId.create({ value: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3'}).getValue(),
    loadTime: 12,
    unloadTime: 12,
    position: DeliveryPackagePosition.create({
      x: 6,
      y: 7,
      z: 9,
    }).getValue(),
  }).getValue();
  let deliveryPackageResponseId = findByDomainReturn.id.toString();

  //Expected valid result
  const expectedReturn = ({
    id: deliveryPackageResponseId,
    deliveryId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    loadTime: 12,
    unloadTime: 12,
    x: 8,
    y: 9,
    z: 10,
  } as unknown) as IDeliveryPackageDTO;

  const saveReturn = {
    domainId: deliveryPackageResponseId,
    deliveryId: 'asdasd',
    loadTime: 12,
    unloadTime: 12,
    position: {
      x: 8,
      y: 9,
      z: 10,
    },
  } as any;

  let req: Partial<Request> = {};

  req.params = {
    id: deliveryPackageRequestId,
  };

  req.body = editDeliveryPackageRequestDTO;

  let res: Partial<Response> = {
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let deliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');

  let deliveryPackageRepoMock = sinon
    .stub(deliveryPackageRepoInstance, 'findByDomainId')
    .onFirstCall()
    .returns(findByDomainReturn);

  deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'save')
    .expects('save')
    .once()
    .returns(saveReturn as DeliveryPackage);

  const ctrl = new DeliveryPackageController(deliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.updateDeliveryPackagePosition(req as Request, res as Response, next as NextFunction);

  // Assert
  deliveryPackageRepoMock.verify();
  sinon.assert.calledWith(res.json, sinon.match(expectedReturn));
}
//#endregion

//#region createDeliveryPackage
async function createDeliveryPackage_WithValidData_ShouldReturnExpectedData() {
  // Arrange
  let req: Partial<Request> = {
  };

  req.body =  {
    "deliveryId": "99387856-e7eb-4d05-a709-5a58a45cdd5e",
    "loadTime": 3,
    "unloadTime": 3,
    "x": 3,
    "y": 3,
    "z": 3
  };

  let res: Partial<Response> = {};
  res.json = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let deliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'save')
    .expects('save')
    .once()
    .returns(null);

  let deliveryRepoInstance = Container.get('DeliveryRepo');
  sinon.mock(deliveryRepoInstance)
  .expects('ifDeliveryExists')
  .once()
  .returns(true);

  const ctrl = new DeliveryPackageController(deliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.createDeliveryPackage(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  deliveryPackageRepoMock.verify();
  sinon.assert.called(res.json);
}
async function createDeliveryPackage_WithoutValidData_ShouldReturnBadRequest() {
  // Arrange
  let req: Partial<Request> = {
  };
  req.body =  {
    "deliveryId": "99387856-e7eb-4d05-a709-5a58a45cdd5e",
    "loadTime": -3,
    "unloadTime": -3,
    "x": -3,
    "y": -3,
    "z": -3
  };

  let res: Partial<Response> = {};
  res.status = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let DeliveryPackageServiceInstance = Container.get('DeliveryPackageService');

  let DeliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  const DeliveryPackageRepoMock = sinon.mock(DeliveryPackageRepoInstance, 'save')
  .expects('save')
  .once()
  .returns(null);

  let deliveryRepoInstance = Container.get('DeliveryRepo');
  sinon.mock(deliveryRepoInstance)
  .expects('ifDeliveryExists')
  .once()
  .returns(true);

  const ctrl = new DeliveryPackageController(DeliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.createDeliveryPackage(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function createDeliveryPackage_WithDeliveryIdNonExistentInWarehouseManager_ShouldReturnBadRequest() {
  // Arrange
  let req: Partial<Request> = {
  };
  req.body =  {
    "deliveryId": "99387856-e7eb-4d05-a709-5a58a45cdd5e",
    "loadTime": -3,
    "unloadTime": -3,
    "x": -3,
    "y": -3,
    "z": -3
  };

  let res: Partial<Response> = {};
  res.status = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let DeliveryPackageServiceInstance = Container.get('DeliveryPackageService');
  let deliveryRepoInstance = Container.get('DeliveryRepo');

  const deliveryRepositoryMock = sinon
  .mock(deliveryRepoInstance)
  .expects('ifDeliveryExists')
  .once()
  .returns(false);

  const ctrl = new DeliveryPackageController(DeliveryPackageServiceInstance as IDeliveryPackageService);

  // Act
  await ctrl.createDeliveryPackage(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
//#endregion

