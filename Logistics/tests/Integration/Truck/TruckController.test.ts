import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import ITruckService from '../../../src/services/IServices/ITruckService';
import TruckController from '../../../src/controllers/TruckController';
import ITruckDTO from '../../../src/dto/ITruckDTO';
import { Truck } from '../../../src/domain/TruckAggregate/Truck';
import IEditTruckDTO from '../../../src/dto/IEditTruckDTO';

describe('truck controller', function() {
  const sandbox = sinon.createSandbox();

  //Setup Dependency Injection
  beforeEach(function() {
    Container.reset();
    let truckSchemaInstance = require('../../../src/persistence/schemas/truckSchema').default;
    Container.set('truckSchema', truckSchemaInstance);

    let truckRepoClass = require('../../../src/repos/TruckRepo').default;
    let truckRepoInstance = Container.get(truckRepoClass);
    Container.set('TruckRepo', truckRepoInstance);

    let truckServiceClass = require('../../../src/services/TruckService').default;
    let truckServiceInstance = Container.get(truckServiceClass);
    Container.set('TruckService', truckServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  //Declare the tests
  //#region getTruckById
  it(
    'getTruckById With Truck Not Existing Should Return Status 400',
    getTruckById_WithTruckNotExisting_ShouldReturnStatus400,
  );
  it('getTruckById With Existing Truck Should Return Truck Json', getTruckById_WithExistingTruck_ShouldReturnTruckJson);
  it('getTruckById With TruckId Should Call Repo Once', getTruckById_WithTruckId_ShouldCallRepoOnce);
  //#endregion

  //#region getAllTrucks
  it(
    'getAllTrucks With No Trucks Found Should Return Status 400',
    getAllTrucks_WithTruckNotExisting_ShouldReturnStatus400,
  );
  it('getAllTrucks With Existing Truck Should Return Truck Json', getAllTrucks_WithExistingTruck_ShouldReturnTruckJson);
  it('getAllTrucks With TruckId Should Call Repo Once', getAllTrucks_WithTruckId_ShouldCallRepoOnce);

  it(
    'getAllTrucks With Parameter All Equal To False Should Call Repo Once',
    getAllTrucks_WithParameterAllEqualFalse_ShouldCallRepoOnce,
  );

  //#endregion

  //#region createTruck
  it('creatTrucks With Existing License Plate Should Return Status 400', creatTruckDuplicateReturnStatus400);
  it('createTruck With Success Should Return Truck', createTruckValidReturnTruck);
  //#endregion

  //#region ediTruck
  it('editTrucks With Invalid Values Should Return Status 400', editTruckInvalidValuesReturnStatus400);
  it('editTrucks With Valid Values Success Should Return Truck', editTruckValidValuesShouldReturnTruck);
  //#endregion
});

//Add somo global variables to the test
const truckId1 = '12312-123123-123123-123123-1';
const truckId2 = '23423423-4-23-4-2-34-23-4-';

const truckToReturn = ({
  id: truckId1,
  tare: 10,
  loadCapacity: 10,
  fullLoadAutonomy: 10,
  battery: {
    capacity: 10,
    fastChargeTime: 10,
    slowChargeTime: 10,
  },
  licensePlate: { value: 'xx-xx-xx' },
  isActive: true,
} as unknown) as Truck;

const truckExpected = ({
  id: truckId1,
  tare: 10,
  loadCapacity: 10,
  fullLoadAutonomy: 10,
  capacity: 10,
  fastChargeTime: 10,
  slowChargeTime: 10,
  licensePlate: 'xx-xx-xx',
  isActive: true,
} as unknown) as ITruckDTO;

const truckToReturn2 = ({
  id: truckId2,
  tare: 10,
  loadCapacity: 10,
  fullLoadAutonomy: 10,
  battery: {
    capacity: 10,
    fastChargeTime: 10,
    slowChargeTime: 10,
  },
  licensePlate: { value: 'xx-xx-xx' },
  isActive: true,
} as unknown) as Truck;

const truckExpected2 = ({
  id: truckId2,
  tare: 10,
  loadCapacity: 10,
  fullLoadAutonomy: 10,
  capacity: 10,
  fastChargeTime: 10,
  slowChargeTime: 10,
  licensePlate: 'xx-xx-xx',
  isActive: true,
} as unknown) as ITruckDTO;

const PostTruck = ({
  id: truckId2,
  tare: 10,
  loadCapacity: 10,
  fullLoadAutonomy: 10,
  capacity: 10,
  fastChargeTime: 10,
  slowChargeTime: 10,
  licensePlate: 'xx-xx-xx',
  isActive: true,
} as unknown) as ITruckDTO;

const truckArrayToReturn = ([truckToReturn, truckToReturn2] as unknown[]) as Truck[];

const truckArrayExpected = ([truckExpected, truckExpected2] as unknown[]) as ITruckDTO[];

// Add all the test functions here

//#region getTruckById
async function getTruckById_WithTruckNotExisting_ShouldReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {};
  req.params = {
    id: truckId1,
  };

  let res: Partial<Response> = {};
  res.status = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(truckId1))
    .returns(null);

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.getTruckById(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function getTruckById_WithExistingTruck_ShouldReturnTruckJson() {
  // Arrange
  let req: Partial<Request> = {
    params: {
      id: truckId1,
    },
  };

  let res: Partial<Response> = {
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(truckId1))
    .returns(truckToReturn);

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.getTruckById(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.json, sinon.match(truckExpected));
}
async function getTruckById_WithTruckId_ShouldCallRepoOnce() {
  // Arrange
  let req: Partial<Request> = {
    params: {
      id: truckId1,
    },
  };

  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(truckId1))
    .returns(null);

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.getTruckById(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  truckRepoMock.verify();
}
//#endregion

//#region getAllTrucks
async function getAllTrucks_WithTruckNotExisting_ShouldReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {
    query: {
      all: 'true',
    },
  };
  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}

async function getAllTrucks_WithExistingTruck_ShouldReturnTruckJson() {
  // Arrange
  let req: Partial<Request> = {
    query: {
      all: 'true',
    },
  };

  let res: Partial<Response> = {
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(truckArrayToReturn);

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.json, sinon.match(truckArrayExpected));
}
async function getAllTrucks_WithTruckId_ShouldCallRepoOnce() {
  // Arrange
  let req: Partial<Request> = {
    query: {
      all: 'true',
    },
  };

  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  truckRepoMock.verify();
}
//#endregion

//#region createTruck

async function creatTruckDuplicateReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {};
  req.body = PostTruck;

  let res: Partial<Response> = {};
  res.status = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');

  sinon
    .mock(truckRepoInstance, 'findByLicensePlate')
    .expects('findByLicensePlate')
    .once()
    .returns(truckToReturn);

  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'save')
    .expects('save')
    .once()
    .returns(null);

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}

async function createTruckValidReturnTruck() {
  // Arrange
  let req: Partial<Request> = {};
  req.body = PostTruck;

  let res: Partial<Response> = {};
  res.json = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');

  sinon
    .mock(truckRepoInstance, 'findByLicensePlate')
    .expects('findByLicensePlate')
    .once()
    .returns(null);

  var mockSaveTruckRepoInstance = sinon
    .mock(truckRepoInstance, 'save')
    .expects('save')
    .once();

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  mockSaveTruckRepoInstance.verify();
  sinon.assert.called(res.json);
}
//#endregion

//#region editTruck
async function editTruckInvalidValuesReturnStatus400() {
  // Arrange
  const EditTruck = ({
    tare: 500,
    loadCapacity: 1000,
    fullLoadAutonomy: 200,
    capacity: 80,
    fastChargeTime: 60,
    slowChargeTime: 300,
  } as unknown) as IEditTruckDTO;

  const InvalidEditTruckId = 'aaaa';

  let req: Partial<Request> = {};
  req.body = EditTruck;
  req.params = {
    id: InvalidEditTruckId,
  };

  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  res.json = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');

  sinon
    .mock(truckRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .returns(null);

  var mockSaveTruckRepoInstance = sinon
    .mock(truckRepoInstance, 'save')
    .expects('save')
    .once();

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.editTruck(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}

async function editTruckValidValuesShouldReturnTruck() {
  // Arrange
  const EditTruckDTO = ({
    tare: 700,
    loadCapacity: 1230,
    fullLoadAutonomy: 210,
    capacity: 80,
    fastChargeTime: 65,
    slowChargeTime: 320,
  } as unknown) as IEditTruckDTO;

  const ValidEditTruckId = '09ec29e5-c996-4373-bcd5-302f577cd0ad';

  const FindByDomainReturn = ({
    id: ValidEditTruckId,
    tare: 500,
    loadCapacity: 1000,
    fullLoadAutonomy: 200,
    battery: {
      capacity: 80,
      fastChargeTime: 60,
      slowChargeTime: 300,
    },
    licensePlate: { value: 'tp-40-40' },
  } as unknown) as Truck;

  const SaveReturn = ({
    id: ValidEditTruckId,
    tare: 700,
    loadCapacity: 1230,
    fullLoadAutonomy: 210,
    battery: {
      capacity: 80,
      fastChargeTime: 65,
      slowChargeTime: 320,
    },
    licensePlate: { value: 'tp-40-40' },
  } as unknown) as Truck;

  const ExpectedReturnDTO = ({
    id: ValidEditTruckId,
    tare: 700,
    loadCapacity: 1230,
    fullLoadAutonomy: 210,
    capacity: 80,
    fastChargeTime: 65,
    slowChargeTime: 320,
    licensePlate: 'tp-40-40',
  } as unknown) as ITruckDTO;

  let req: Partial<Request> = {};
  req.body = EditTruckDTO;
  req.params = {
    id: ValidEditTruckId,
  };

  let res: Partial<Response> = {
    status: sinon.spy(),
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let TruckRepoInstance = Container.get('TruckRepo');

  let mockTruckRepoInstance = sinon
    .stub(TruckRepoInstance, 'findByDomainId')
    .onFirstCall()
    .returns(FindByDomainReturn);

  mockTruckRepoInstance = sinon
    .mock(TruckRepoInstance, 'save')
    .expects('save')
    .once()
    .returns(SaveReturn as Truck);

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.editTruck(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  mockTruckRepoInstance.verify();
  sinon.assert.calledWith(res.json, sinon.match(ExpectedReturnDTO));
}

async function getAllTrucks_WithParameterAllEqualFalse_ShouldCallRepoOnce() {
  // Arrange
  let req: Partial<Request> = {
    query: {
      all: 'false',
    },
  };

  let res: Partial<Response> = {
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let truckServiceInstance = Container.get('TruckService');

  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findAllActive')
    .expects('findAllActive')
    .once()
    .returns(truckArrayToReturn);

  const ctrl = new TruckController(truckServiceInstance as ITruckService);

  // Act
  await ctrl.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  truckRepoMock.verify();
  sinon.assert.calledWith(res.json, sinon.match(truckArrayExpected));
}

//#endregion
