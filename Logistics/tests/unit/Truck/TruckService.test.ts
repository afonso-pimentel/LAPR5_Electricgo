import 'reflect-metadata';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import { expect } from 'chai';
import TruckService from '../../../src/services/TruckService';
import ITruckDTO from '../../../src/dto/ITruckDTO';
import IPostTruckDTO from '../../../src/dto/IPostTruckDTO';
import { Truck } from '../../../src/domain/TruckAggregate/Truck';
import ITruckRepo from '../../../src/services/IRepos/ITruckRepo';
import _ from 'lodash';
import IEditTruckDTO from '../../../src/dto/IEditTruckDTO';

describe('truck service', function() {
  const sandbox = sinon.createSandbox();

  //Setup Dependency Injection
  beforeEach(function() {
    Container.reset();
    let TruckSchemaInstance = require('../../../src/persistence/schemas/truckSchema').default;
    Container.set('truckSchema', TruckSchemaInstance);

    let TruckRepoClass = require('../../../src/repos/TruckRepo').default;
    let TruckRepoInstance = Container.get(TruckRepoClass);
    Container.set('TruckRepo', TruckRepoInstance);

    let TruckServiceClass = require('../../../src/services/TruckService').default;
    let TruckServiceInstance = Container.get(TruckServiceClass);
    Container.set('TruckService', TruckServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  //Declare the tests
  //#region createTruck

  it(
    'createTruck With Duplicated Truck Should Return Result Fail Status',
    createTruckExistingLicensePlateTruckReturnFailStatus,
  );

  it('createTruck With Invalid Truck Should Return Result Fail Status', createTruckInvalidReturnResultFailStatus);

  it('createTruck With Valid Truck Should Return Result Success Status', createTruckValidReturnResultSuccessStatus);

  //#endregion

  //#region editTruck

  it('editTruck with Valid Values Should Return Result Success', editTruckValidValuesShouldReturnResultSuccess);

  it('editTruck with invalid id Should Return Result fail status', editTruckInvalidValuesShouldReturnResultFailStatus);
  //#endregion

  //#region getTruckById
  it(
    'getTruckById With Truck Not Existing Should Return Result Fail',
    getTruckById_WithTruckNotExisting_ShouldReturnResultFail,
  );
  it('getTruckById With Existing Truck Should Return ITruckDTO', getTruckById_WithExistingTruck_ShouldReturnITruckDTO);
  it('getTruckById With TruckId Should Call Repo Once', getTruckById_WithTruckId_ShouldCallRepoOnce);
  //#endregion

  //#region getAllTruck
  it(
    'getAllTrucks With No Trucks Found Should Return Status 400',
    getAllTrucks_WithTruckNotExisting_ShouldReturnStatus400,
  );
  it(
    'getAllTrucks With Existing Truck Should Return ITruckDto[]',
    getAllTrucks_WithExistingTruck_ShouldReturnITruckDTOArray,
  );
  it('getAllTrucks With TruckId Should Call Repo Once', getAllTrucks_WithTruckId_ShouldCallRepoOnce);

  it(
    'getAllTrucks With parameter all equals false Should return Status 400',
    getAllTrucks_WithAllEqualsFalse_ShouldReturnStatus400,
  );
  it(
    'getAllTrucks With parameter all equals false Should return Object with isActive equals true',
    getAllTrucks_WithAllEqualFalse_shouldReturnObject_WithIsactiveEqualsTrue,
  );

  //#endregion
});

//Add somo global variables to the test
const truckId1 = '09ec29e5-c996-4373-bcd5-302f577cd0ad';
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
  licensePlate: { value: 'XX-XX-XX' },
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
  licensePlate: 'XX-XX-XX',
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
  licensePlate: { value: 'XX-XX-XX' },
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
  licensePlate: 'XX-XX-XX',
  isActive: true,
} as unknown) as ITruckDTO;

const PostTruck = ({
  tare: 10,
  loadCapacity: 10,
  fullLoadAutonomy: 10,
  capacity: 10,
  fastChargeTime: 10,
  slowChargeTime: 10,
  licensePlate: 'XX-XX-XX',
} as unknown) as IPostTruckDTO;

const truckArrayToReturn = ([truckToReturn, truckToReturn2] as unknown[]) as Truck[];

const truckArrayExpected = ([truckExpected, truckExpected2] as unknown[]) as ITruckDTO[];

// Add all the test functions here

//#region createTruck

async function createTruckExistingLicensePlateTruckReturnFailStatus() {
  // Arrange
  let TruckRepoInstance = Container.get('TruckRepo');

  var mockTruckRepoInstance = sinon
    .mock(TruckRepoInstance, 'findByLicensePlate')
    .expects('findByLicensePlate')
    .once()
    .withArgs(PostTruck.licensePlate.toLocaleUpperCase())
    .returns(truckToReturn);

  const serv = new TruckService(TruckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.createTruck(PostTruck);

  // Assert
  mockTruckRepoInstance.verify();
  expect(result.isFailure).to.equal(true);
}

async function createTruckInvalidReturnResultFailStatus() {
  // Arrange

  // set invalid fullLoadAutonomy
  let invalidTruck = Object.assign({}, PostTruck);
  invalidTruck.fullLoadAutonomy = -1;

  let TruckRepoInstance = Container.get('TruckRepo');

  // simulate findByLicensePlate return null (meaning no truck with the same license plate exists)
  let mockTruckRepoInstance = sinon
    .mock(TruckRepoInstance, 'findByLicensePlate')
    .expects('findByLicensePlate')
    .once()
    .returns(null);

  const serv = new TruckService(TruckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.createTruck(invalidTruck);

  // Assert
  mockTruckRepoInstance.verify();
  expect(result.isFailure).to.equal(true);
}

async function createTruckValidReturnResultSuccessStatus() {
  // Arrange

  let TruckRepoInstance = Container.get('TruckRepo');

  // simulate findByLicensePlate return null (meaning no truck with the same license plate exists)
  sinon
    .mock(TruckRepoInstance, 'findByLicensePlate')
    .expects('findByLicensePlate')
    .once()
    .returns(null);

  let mockTruckRepoInstance = sinon
    .mock(TruckRepoInstance, 'save')
    .expects('save')
    .once();

  const serv = new TruckService(TruckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.createTruck(PostTruck);

  // Assert
  mockTruckRepoInstance.verify();
  expect(_.omit(result.getValue(), 'id')).to.deep.equal(_.omit(truckExpected, 'id'));
  expect(result.isSuccess).to.equal(true);
}

//#endregion

//#region editTruck

async function editTruckValidValuesShouldReturnResultSuccess() {
  // Arrange
  const EditTruckDTO = ({
    tare: 700,
    loadCapacity: 1230,
    fullLoadAutonomy: 210,
    capacity: 80,
    fastChargeTime: 65,
    slowChargeTime: 320,
    isActive: true,
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
    isActive: true,
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
    isActive: true,
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
    isActive: true,
  } as unknown) as ITruckDTO;

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

  const serv = new TruckService(TruckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.editTruck(EditTruckDTO, ValidEditTruckId);

  // Assert
  mockTruckRepoInstance.verify();
  expect(result.isSuccess).to.equal(true);
  expect(result.getValue()).to.deep.equal(ExpectedReturnDTO);
}

async function editTruckInvalidValuesShouldReturnResultFailStatus() {
  // Arrange
  const EditTruck = ({
    tare: 500,
    loadCapacity: 1000,
    fullLoadAutonomy: 200,
    capacity: 80,
    fastChargeTime: 60,
    slowChargeTime: 300,
  } as unknown) as IEditTruckDTO;

  let TruckRepoInstance = Container.get('TruckRepo');

  const InvalidEditTruckId = 'aaaa';

  var mockTruckRepoInstance = sinon
    .mock(TruckRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .withArgs(InvalidEditTruckId)
    .returns(null);

  const serv = new TruckService(TruckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.editTruck(EditTruck, InvalidEditTruckId);

  // Assert
  mockTruckRepoInstance.verify();
  expect(result.isFailure).to.equal(true);
}
//#endregion

//#region getTruckById
async function getTruckById_WithTruckNotExisting_ShouldReturnResultFail() {
  // Arrange
  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(truckId1))
    .returns(null);

  const serv = new TruckService(truckRepoInstance as ITruckRepo);

  // Act
  var result = await serv.getTruckById(truckId1);

  // Assert
  expect(result.isFailure).to.equals(true);
}
async function getTruckById_WithExistingTruck_ShouldReturnITruckDTO() {
  // Arrange
  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(truckId1))
    .returns(truckToReturn);

  const serv = new TruckService(truckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.getTruckById(truckId1);

  // Assert
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).to.deep.equal(truckExpected);
}
async function getTruckById_WithTruckId_ShouldCallRepoOnce() {
  // Arrange
  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(truckId1))
    .returns(null);

  const serv = new TruckService(truckRepoInstance as ITruckRepo);

  // Act
  await serv.getTruckById(truckId1);

  // Assert
  truckRepoMock.verify();
}
//#endregion

//#region getAllTrucks
async function getAllTrucks_WithTruckNotExisting_ShouldReturnStatus400() {
  // Arrange
  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const serv = new TruckService(truckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.getAllTrucks();

  // Assert
  expect(result.isFailure).to.equals(true);
}

// Add all the test functions here
async function getAllTrucks_WithExistingTruck_ShouldReturnITruckDTOArray() {
  // Arrange
  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(truckArrayToReturn);

  const serv = new TruckService(truckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.getAllTrucks();

  // Assert
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).to.deep.equal(truckArrayExpected);
}

async function getAllTrucks_WithTruckId_ShouldCallRepoOnce() {
  // Arrange
  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const serv = new TruckService(truckRepoInstance as ITruckRepo);

  // Act
  await serv.getAllTrucks();

  // Assert
  truckRepoMock.verify();
}

async function getAllTrucks_WithAllEqualsFalse_ShouldReturnStatus400() {
  // Arrange
  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findAllActive')
    .expects('findAllActive')
    .once()
    .returns(null);

  const serv = new TruckService(truckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.getAllActiveTrucks();

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getAllTrucks_WithAllEqualFalse_shouldReturnObject_WithIsactiveEqualsTrue() {
  // Arrange
  let truckRepoInstance = Container.get('TruckRepo');
  const truckRepoMock = sinon
    .mock(truckRepoInstance, 'findAllActive')
    .expects('findAllActive')
    .once()
    .returns(truckArrayToReturn);

  const serv = new TruckService(truckRepoInstance as ITruckRepo);

  // Act
  const result = await serv.getAllActiveTrucks();

  // Assert
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).to.deep.equal(truckArrayExpected);
}
//#endregion
