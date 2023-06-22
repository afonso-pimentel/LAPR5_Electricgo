import 'reflect-metadata';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Container } from 'typedi';
import DeliveryPackageService from '../../../src/services/DeliveryPackageService';
import IDeliveryPackageRepo from '../../../src/services/IRepos/IDeliveryPackageRepo';
import IDeliveryPackageDTO from '../../../src/dto/IDeliveryPackageDTO';
import IDeliveryRepo from '../../../src/services/IRepos/IDeliveryRepo';
import { DeliveryPackage } from '../../../src/domain/DeliveryPackageAggregate/DeliveryPackage';
import IDeliveryPackagePositionDTO from '../../../src/dto/IDeliveryPackagePositionDTO';
import { DeliveryPackagePosition } from '../../../src/domain/DeliveryPackageAggregate/DeliveryPackagePosition';
import { DeliveryId } from '../../../src/domain/DeliveryPackageAggregate/DeliveryId';

describe('deliveryPackage service', function() {
  const sandbox = sinon.createSandbox();

  //Setup Dependency Injection
  beforeEach(function() {
    Container.reset();
    let deliveryPackageSchemaInstance = require('../../../src/persistence/schemas/deliveryPackageSchema').default;
    Container.set('deliveryPackageSchema', deliveryPackageSchemaInstance);

    let deliveryPackageRepoClass = require('../../../src/repos/DeliveryPackageRepo').default;
    let deliveryPackageRepoInstance = Container.get(deliveryPackageRepoClass);
    let deliverRepoClass = require('../../../src/repos/DeliveryRepo').default;
    let deliverRepoInstance = Container.get(deliverRepoClass);

    Container.set('DeliveryPackageRepo', deliveryPackageRepoInstance);
    Container.set('DeliveryRepo', deliverRepoInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  //Declare the tests
  //#region getDeliveryPackageById
  it(
    'getDeliveryPackageById With DeliveryPackage Not Existing Should Return Result Fail',
    getDeliveryPackageByIdNotExistingReturnResultFail,
  );
  it(
    'getDeliveryPackageById With Existing DeliveryPackage Should Return IDeliveryPackageDTO',
    getDeliveryPackageByIdExistingReturnIDeliveryPackageDTO,
  );
  it('getDeliveryPackageById With DeliveryPackageId Should Call Repo Once', getDeliveryPackageByIdCallRepoOnce);
  //#endregion

  //#region createDeliveryPackage
  it(
    'getAllDeliveryPackages With No DeliveryPackages Found Should Return Status 400',
    getAllDeliveryPackagesNotExistingReturnStatus400,
  );
  it(
    'getAllDeliveryPackages With Existing DeliveryPackage Should Return IDeliveryPackageDto[]',
    getAllDeliveryPackagesExistingReturnIDeliveryPackageDTOArray,
  );
  it('getAllDeliveryPackages With DeliveryPackageId Should Call Repo Once', getAllDeliveryPackagesShouldCallRepoOnce);
  //#endregion

  //#region editDeliveryPackage
  it(
    'editDeliveryPackage With Invalid Id Should Return Status 400',
    editDeliveryPackageWithInvalidIdShouldReturnStatus400,
  );
  it('editDeliveryPackage With Valid Id Should Return Status 200', editDeliveryPackageWithValidIdShouldReturnStatus200);
  //#endregion
  //#region create delivery
  it('create with invalid data should return failed result', create_WithInvalidData_ShouldReturnFailResult);
  it('create with valid data should return successful result', create_WithValidData_ShouldReturnSuccessResult);
  it('create with delivery non existent in warehouse managament', create_WithDeliveryNonExistentInWarehouseManagement_ShouldReturnFailResult);
  //#endregion
});

//Add some global variables to the test
const deliveryId = '12312';
const deliveryId2 = '12312';
const deliveryPackageId = '12312-123123-123123-123123-1';
const deliveryPackageId2 = '23423423-4-23-4-2-34-23-4-';

const deliveryPackageToReturn = ({
  id: deliveryId,
  deliveryId: deliveryPackageId,
  loadTime: 123123,
  unloadTime: 123123,
  position: {
    x: 123,
    y: 123,
    z: 123,
  },
} as unknown) as DeliveryPackage;

const deliveryPackageExpected = ({
  id: deliveryId,
  deliveryId: deliveryPackageId,
  loadTime: 123123,
  unloadTime: 123123,
  x: 123,
  y: 123,
  z: 123,
} as unknown) as IDeliveryPackageDTO;

const deliveryPackageToReturn2 = ({
  id: deliveryId2,
  deliveryId: deliveryPackageId2,
  loadTime: 123123,
  unloadTime: 123123,
  position: {
    x: 123,
    y: 123,
    z: 123,
  },
} as unknown) as DeliveryPackage;

const deliveryPackageExpected2 = ({
  id: deliveryId2,
  deliveryId: deliveryPackageId2,
  loadTime: 123123,
  unloadTime: 123123,
  x: 123,
  y: 123,
  z: 123,
} as unknown) as IDeliveryPackageDTO;

const deliveryPackageArrayToReturn = ([
  deliveryPackageToReturn,
  deliveryPackageToReturn2,
] as unknown[]) as DeliveryPackage[];

const deliveryPackageArrayExpected = ([
  deliveryPackageExpected,
  deliveryPackageExpected2,
] as unknown[]) as IDeliveryPackageDTO[];

const ValidDeliveryId = {
  value: '99387856-e7eb-4d05-a709-5a58a45cdd5e',
};

const initialPosition = {
  x: 4,
  y: 4,
  z: 4,
};

// Add all the test functions here

//#region getDeliveryPackageById
async function getDeliveryPackageByIdNotExistingReturnResultFail() {
  // Arrange
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(deliveryPackageId))
    .returns(null);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  var result = await serv.getDeliveryPackageById(deliveryPackageId);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getDeliveryPackageByIdExistingReturnIDeliveryPackageDTO() {
  // Arrange
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(deliveryPackageId))
    .returns(deliveryPackageToReturn);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  const result = await serv.getDeliveryPackageById(deliveryPackageId);

  // Assert
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).to.deep.equal(deliveryPackageExpected);
  expect(result.isSuccess).to.equals(true);
}
async function getDeliveryPackageByIdCallRepoOnce() {
  // Arrange
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(deliveryPackageId))
    .returns(null);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  await serv.getDeliveryPackageById(deliveryPackageId);

  // Assert
  deliveryPackageRepoMock.verify();
}
//#endregion

//#region getAllDeliveryPackages

async function getAllDeliveryPackagesNotExistingReturnStatus400() {
  // Arrange
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  const result = await serv.getAllDeliveryPackages();

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getAllDeliveryPackagesExistingReturnIDeliveryPackageDTOArray() {
  // Arrange
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(deliveryPackageArrayToReturn);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  const result = await serv.getAllDeliveryPackages();

  // Assert
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).to.deep.equal(deliveryPackageArrayExpected);
}

async function getAllDeliveryPackagesShouldCallRepoOnce() {
  // Arrange
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  await serv.getAllDeliveryPackages();

  // Assert
  deliveryPackageRepoMock.verify();
}


//#endregion

//#region createDelivery

async function create_WithInvalidData_ShouldReturnFailResult(){
  // Arrange
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');

  const deliveryPackage = {
      "deliveryId": "99387856-e7eb-405-a709-5a58a45cdd5e",
      "loadTime": -3,
      "unloadTime": -3,
      "x": -3,
      "y": -3,
      "z": -3
  } as IDeliveryPackageDTO;

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  const result = await serv.createDeliveryPackage(deliveryPackage);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function create_WithValidData_ShouldReturnSuccessResult(){
  // Arrange
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');

  const deliveryPackage = {
      "deliveryId": "99387856-e7eb-4d05-a709-5a58a45cdd5e",
      "loadTime": 3,
      "unloadTime": 3,
      "x": 3,
      "y": 3,
      "z": 3
  } as IDeliveryPackageDTO;

  const deliveryPackageRepoMock = sinon
    .mock(deliveryPackageRepoInstance, 'findAll')
    .expects('save')
    .once()
    .returns(null);

  let deliveryRepoInstance = Container.get('DeliveryRepo');
  sinon.mock(deliveryRepoInstance)
  .expects('ifDeliveryExists')
  .once()
  .returns(true);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  const result = await serv.createDeliveryPackage(deliveryPackage);

  // Assert
  expect(result.isSuccess).to.equals(true);
}

async function create_WithDeliveryNonExistentInWarehouseManagement_ShouldReturnFailResult(){
  // Arrange
  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');
  let deliveryRepoInstance = Container.get('DeliveryRepo');

  const deliveryPackage = {
      "deliveryId": "99387856-e7eb-4d05-a709-5a58a45cdd5e",
      "loadTime": 3,
      "unloadTime": 3,
      "x": 3,
      "y": 3,
      "z": 3
  } as IDeliveryPackageDTO;

  const deliveryRepositoryMock = sinon
  .mock(deliveryRepoInstance)
  .expects('ifDeliveryExists')
  .once()
  .returns(false);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  const result = await serv.createDeliveryPackage(deliveryPackage);

  // Assert
  expect(result.isSuccess).to.equals(false);
}

//#endregion

async function editDeliveryPackageWithInvalidIdShouldReturnStatus400() {
  // Arrange

  //Input Data for the Edit Request
  let deliveryPackageRequestId = 'aaaa';

  const editDeliveryPackageRequestDTO = ({
    x: 8,
    y: 9,
    z: 10,
  } as unknown) as IDeliveryPackagePositionDTO;

  //Output data for the mock methods

  //Expected valid result

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');

  const mockDeliveryPackageRepoInstance = sinon
    .mock(deliveryPackageRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .returns(null);

    let deliveryRepoInstance = Container.get('DeliveryRepo');
    const deliveryRepositoryMock = sinon
    .mock(deliveryRepoInstance)
    .expects('ifDeliveryExists')
    .once()
    .returns(false);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  const result = await serv.updateDeliveryPackagePosition(deliveryPackageRequestId, editDeliveryPackageRequestDTO);

  // Assert
  mockDeliveryPackageRepoInstance.verify();
  expect(result.isFailure).to.equals(true);
}

async function editDeliveryPackageWithValidIdShouldReturnStatus200() {
  // Arrange

  //Input Data for the Edit Request

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
  let deliveryPackageRequestId = findByDomainReturn.id.toString();

  const saveReturn = {
    domainId: deliveryPackageRequestId,
    deliveryId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    loadTime: 12,
    unloadTime: 12,
    position: {
      x: 8,
      y: 9,
      z: 10,
    },
  } as any;

  //Expected valid result
  const expectedReturn = ({
    id: deliveryPackageRequestId,
    deliveryId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    loadTime: 12,
    unloadTime: 12,
    x: 8,
    y: 9,
    z: 10,
  } as unknown) as IDeliveryPackageDTO;

  let deliveryPackageRepoInstance = Container.get('DeliveryPackageRepo');

  let mockDeliveryPackageRepoInstance = sinon
    .stub(deliveryPackageRepoInstance, 'findByDomainId')
    .onFirstCall()
    .returns(findByDomainReturn);

  mockDeliveryPackageRepoInstance = sinon
    .mock(deliveryPackageRepoInstance, 'save')
    .expects('save')
    .once()
    .returns(saveReturn as DeliveryPackage);

    let deliveryRepoInstance = Container.get('DeliveryRepo');
    const deliveryRepositoryMock = sinon
    .mock(deliveryRepoInstance)
    .expects('ifDeliveryExists')
    .once()
    .returns(false);

  const serv = new DeliveryPackageService(deliveryPackageRepoInstance as IDeliveryPackageRepo, deliveryRepoInstance as IDeliveryRepo);

  // Act
  const result = await serv.updateDeliveryPackagePosition(deliveryPackageRequestId, editDeliveryPackageRequestDTO);

  // Assert
  mockDeliveryPackageRepoInstance.verify();
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).to.deep.equal(expectedReturn);
}
//#endregion
