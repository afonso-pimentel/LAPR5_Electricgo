import 'reflect-metadata';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Container } from 'typedi';
import PathService from '../../../src/services/PathService';
import IPathDTO from '../../../src/dto/IPathDTO';
import IPostPathDTO from '../../../src/dto/IPostPathDTO';
import { Path } from '../../../src/domain/PathAggregate/Path';
import IPathRepo from '../../../src/services/IRepos/IPathRepo';
import IWarehouseRepo from '../../../src/services/IRepos/IWarehouseRepo';
import _ from 'lodash';

describe('path service', function() {
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

    let PathServiceClass = require('../../../src/services/PathService').default;
    let PathServiceInstance = Container.get(PathServiceClass);
    Container.set('PathService', PathServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  //Declare the tests
  //#region createPath
  it(
    'createPath With Start Warehouse Not Existing Should Return Result Fail Status',
    createPath_WithStartWarehouseNotExisting_ShouldReturnResultFailStatus,
  );
  it(
    'createPath With End Warehouse Not Existing Should Return Result Fail Status',
    createPath_WithEndWarehouseNotExisting_ShouldReturnResultFailStatus,
  );
  it(
    'createPath With Duplicated Path Should Return Result Fail Status',
    createPath_WithDuplicatedPath_ShouldReturnResultFailStatus,
  );
  it(
    'createPath With Invalid Path Should Return Result Fail Status',
    createPath_WithInvalidPath_ShouldReturnResultFailStatus,
  );
  it('createPath With Success Should Result Success Status', createPath_WithValidData_ShouldReturnResultSuccessStatus);
  //#endregion
  //#region getPathById
  it(
    'getPathById With Path Id Not Existing Should Return Result Fail',
    getPathById_WithPathNotExisting_ShouldReturnResultFail,
  );
  it('getPathById With Existing Path Should Return IPathDTO', getPathById_WithExistingPath_ShouldReturnIPathDTO);
  it('getPathById With PathId Should Call Repo Once', getPathById_WithPathId_ShouldCallRepoOnce);
  it(
    'getPaths With existent Paths Should Return Expected List of Results',
    getPaths_WithExistingPaths_ShouldReturnExpectedListOfPaths,
  );
  it(
    'getPathsWithPagination With existent Paths Should Return Expected List of Results',
    getPathsWithPagination_WithExistingPaths_ShouldReturnExpectedListOfPaths,
  );
  //#endregion
  //#region getPaths
  //#endregion
});

//Add somo global variables to the test
const PathId = '87db38ce-2200-4e99-8e04-7cc4d1b8e0a7';
const pathId = 'f18f01ab-00fb-462e-87e5-7be48d45340a';
const PathId2 = 'd8a985d3-7475-4309-8d72-3e1cfa47cc4c';
const StartWarehouseId = 'bebf8731-3e92-4860-b53f-2ba42478270a';
const EndWarehouseId = '88e3dd2c-d80b-4984-8dd2-05ece83abb5b';

const PathToReturn = ({
  id: PathId,
  startWarehouse: StartWarehouseId,
  endWarehouse: EndWarehouseId,
  distance: 10,
  pathTime: 10,
  spentEnergy: 10,
  extraChargeTime: 10,
} as unknown) as Path;

const PathToReturn2 = ({
  id: PathId2,
  startWarehouse: EndWarehouseId,
  endWarehouse: StartWarehouseId,
  distance: 10,
  pathTime: 10,
  spentEnergy: 10,
  extraChargeTime: 10,
} as unknown) as Path;

const PostPath = ({
  startWarehouse: StartWarehouseId,
  endWarehouse: EndWarehouseId,
  distance: 10,
  pathTime: 10,
  spentEnergy: 10,
  extraChargeTime: 10,
} as unknown) as IPostPathDTO;

const PathExpected = ({
  startWarehouse: StartWarehouseId,
  endWarehouse: EndWarehouseId,
  distance: 10,
  pathTime: 10,
  spentEnergy: 10,
  extraChargeTime: 10,
} as unknown) as IPathDTO;

const PatchExpected1 = ({
  id: PathId,
  startWarehouse: StartWarehouseId,
  endWarehouse: EndWarehouseId,
  distance: 10,
  pathTime: 10,
  spentEnergy: 10,
  extraChargeTime: 10,
} as unknown) as IPathDTO;

const PatchExpected2 = ({
  id: PathId2,
  startWarehouse: EndWarehouseId,
  endWarehouse: StartWarehouseId,
  distance: 10,
  pathTime: 10,
  spentEnergy: 10,
  extraChargeTime: 10,
} as unknown) as IPathDTO;

const pathArrayToReturn = ([PathToReturn, PathToReturn2] as unknown[]) as Path[];

const pathPageArrayToReturn = ([[PathToReturn, PathToReturn2], 1] as unknown[]) as [Path[], number];

const pathArrayExpected = ([PatchExpected1, PatchExpected2] as unknown[]) as IPathDTO[];

const pathPageArrayExpected = ([[PatchExpected1, PatchExpected2], 1] as unknown[]) as [IPathDTO[], number];

//#region createPath
async function createPath_WithStartWarehouseNotExisting_ShouldReturnResultFailStatus() {
  // Arrange
  let PathRepoInstance = Container.get('PathRepo');

  let WarehouseRepoInstance = Container.get('WarehouseRepo');
  sinon
    .mock(WarehouseRepoInstance, 'ifWarehouseExists')
    .expects('ifWarehouseExists')
    .once()
    .withArgs(StartWarehouseId)
    .returns(false);

  const serv = new PathService(PathRepoInstance as IPathRepo, WarehouseRepoInstance as IWarehouseRepo);

  // Act
  const result = await serv.createPath(PostPath);

  // Assert
  expect(result.isFailure).to.equal(true);
}
async function createPath_WithEndWarehouseNotExisting_ShouldReturnResultFailStatus() {
  // Arrange
  let PathRepoInstance = Container.get('PathRepo');

  let WarehouseRepoInstance = Container.get('WarehouseRepo');
  sinon
    .stub(WarehouseRepoInstance, 'ifWarehouseExists')
    .withArgs(StartWarehouseId)
    .returns(true)
    .withArgs(EndWarehouseId)
    .returns(false);

  const serv = new PathService(PathRepoInstance as IPathRepo, WarehouseRepoInstance as IWarehouseRepo);

  // Act
  const result = await serv.createPath(PostPath);

  // Assert
  expect(result.isFailure).to.equal(true);
}
async function createPath_WithDuplicatedPath_ShouldReturnResultFailStatus() {
  // Arrange
  let PathRepoInstance = Container.get('PathRepo');
  var mockPathRepoInstance = sinon
    .mock(PathRepoInstance, 'getByStartEndWarehouseId')
    .expects('getByStartEndWarehouseId')
    .once()
    .withArgs(StartWarehouseId, EndWarehouseId)
    .returns([{}]);

  let WarehouseRepoInstance = Container.get('WarehouseRepo');
  var mockWarehouseRepoInstance = sinon
    .mock(WarehouseRepoInstance, 'ifWarehouseExists')
    .expects('ifWarehouseExists')
    .twice()
    .returns(true);

  const serv = new PathService(PathRepoInstance as IPathRepo, WarehouseRepoInstance as IWarehouseRepo);

  // Act
  const result = await serv.createPath(PostPath);

  // Assert
  mockWarehouseRepoInstance.verify();
  mockPathRepoInstance.verify();
  expect(result.isFailure).to.equal(true);
}
async function createPath_WithInvalidPath_ShouldReturnResultFailStatus() {
  // Arrange
  let PathRepoInstance = Container.get('PathRepo');
  sinon
    .mock(PathRepoInstance, 'getByStartEndWarehouseId')
    .expects('getByStartEndWarehouseId')
    .returns([]);

  let WarehouseRepoInstance = Container.get('WarehouseRepo');
  sinon
    .mock(WarehouseRepoInstance, 'ifWarehouseExists')
    .expects('ifWarehouseExists')
    .twice()
    .returns(true);

  const serv = new PathService(PathRepoInstance as IPathRepo, WarehouseRepoInstance as IWarehouseRepo);

  // Act
  const result = await serv.createPath(({} as unknown) as IPostPathDTO);

  // Assert
  expect(result.isFailure).to.equal(true);
}
async function createPath_WithValidData_ShouldReturnResultSuccessStatus() {
  // Arrange
  let PathRepoInstance = Container.get('PathRepo');
  sinon
    .mock(PathRepoInstance, 'getByStartEndWarehouseId')
    .expects('getByStartEndWarehouseId')
    .returns([]);

  let mockPathRepoInstance = sinon
    .mock(PathRepoInstance, 'save')
    .expects('save')
    .once()
    .returns(PathToReturn);

  let WarehouseRepoInstance = Container.get('WarehouseRepo');
  sinon
    .mock(WarehouseRepoInstance, 'ifWarehouseExists')
    .expects('ifWarehouseExists')
    .twice()
    .returns(true);

  const serv = new PathService(PathRepoInstance as IPathRepo, WarehouseRepoInstance as IWarehouseRepo);

  // Act
  const result = await serv.createPath(PostPath);

  // Assert
  mockPathRepoInstance.verify();
  expect(_.omit(result.getValue(), 'id')).to.deep.equal(PathExpected);
  expect(result.isSuccess).to.equal(true);
}
//#endregion

//#region getPath

async function getPathById_WithPathNotExisting_ShouldReturnResultFail() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');

  const truckRepoMock = sinon
    .mock(pathRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(pathId))
    .returns(null);

  const serv = new PathService(pathRepoInstance as IPathRepo, warehouseRepoInstance as IWarehouseRepo);

  // Act
  var result = await serv.getPath(pathId);

  // Assert
  expect(result.isFailure).to.equals(true);
}

async function getPathById_WithExistingPath_ShouldReturnIPathDTO() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(PathId))
    .returns(PathToReturn);

  const serv = new PathService(pathRepoInstance as IPathRepo, warehouseRepoInstance as IWarehouseRepo);

  // Act
  const result = await serv.getPath(PathId);

  // Assert
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).to.deep.equal(PatchExpected1);
}

async function getPathById_WithPathId_ShouldCallRepoOnce() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(pathId))
    .returns(null);

  const serv = new PathService(pathRepoInstance as IPathRepo, warehouseRepoInstance as IWarehouseRepo);

  // Act
  await serv.getPath(pathId);

  // Assert
  pathRepoMock.verify();
}

async function getPaths_WithExistingPaths_ShouldReturnExpectedListOfPaths() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findByDomainId')
    .expects('findAll')
    .once()
    .returns(pathArrayToReturn);

  const serv = new PathService(pathRepoInstance as IPathRepo, warehouseRepoInstance as IWarehouseRepo);

  // Act
  const result = await serv.getPaths();

  // Assert
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).deep.to.equal(pathArrayExpected);
}

async function getPathsWithPagination_WithExistingPaths_ShouldReturnExpectedListOfPaths() {
  // Arrange
  let pathRepoInstance = Container.get('PathRepo');
  let warehouseRepoInstance = Container.get('WarehouseRepo');

  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAllWithPagination')
    .expects('findAllWithPagination')
    .once()
    .withArgs(0, 10)
    .returns(pathPageArrayToReturn);

  const serv = new PathService(pathRepoInstance as IPathRepo, warehouseRepoInstance as IWarehouseRepo);

  // Act
  const result = await serv.getPathsWithPagination(0, 10);

  // Assert
  expect(result.isSuccess).to.equals(true);
  expect(result.getValue()).deep.to.equal(pathPageArrayExpected);
}

//#endregion
