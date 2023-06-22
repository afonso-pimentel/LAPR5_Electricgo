import 'reflect-metadata';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IPathService from '../../../src/services/IServices/IPathService';
import PathController from '../../../src/controllers/PathController';
import IPathDTO from '../../../src/dto/IPathDTO';
import IPostPathDTO from '../../../src/dto/IPostPathDTO';
import { Path } from '../../../src/domain/PathAggregate/Path';

describe('path controller', function() {
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
    'createPath With Start Warehouse Not Existing Should Return Status 400',
    createPath_WithStartWarehouseNotExisting_ShouldReturnStatus400,
  );
  it(
    'createPath With End Warehouse Not Existing Should Return Status 400',
    createPath_WithEndWarehouseNotExisting_ShouldReturnStatus400,
  );
  it('createPath With Duplicated Path Should Return Status 400', createPath_WithDuplicatedPath_ShouldReturnStatus400);
  it('createPath With Success Should Return Path', createPath_WithValidData_ShouldReturnPath);
  //#endregion

  //#region getPaths
  it(
    'getPathById With Path Not Existing Should Return Status 400',
    getPathById_WithPathNotExisting_ShouldReturnStatus400,
  );
  it('getPathById With Existing Path Should Return Path Json', getPathById_WithExistingPath_ShouldReturnPathJson);
  it('getPathById With PathId Should Call Repo Once', getPathById_WithPathId_ShouldCallRepoOnce);
  it(
    'getAllPaths With No Paths Found Should Return Status 400',
    getAllPaths_WithPathsNonExisting_ShouldReturnStatus400,
  );
  it('getAllPaths With Existing Paths Should Return Paths Json', getAllPaths_WithExistingPaths_ShouldReturnPathsJson);
  it(
    'getPathsWithPagination With Existing Paths Should Return Paths Json',
    getPathsWithPagination_WithExistingPaths_ShouldReturnPathsJson,
  );
});

//Add some global variables to the test

const pathId = 'bebf8731-3e92-4860-b53f-2ba42478270a';
const PathId = '88e3dd2c-d80b-4984-8dd2-05ece83abb5b';
const PathId2 = 'd8a985d3-7475-4309-8d72-3e1cfa47cc4c';
const StartWarehouseId = 'f2586017-bb3b-49c5-8b21-1b4afa83962f';
const EndWarehouseId = 'f18f01ab-00fb-462e-87e5-7be48d45340a';

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

const pathPageArrayExpected = { paths: [PatchExpected1, PatchExpected2] as IPathDTO[], totalPageCount: 1 as number };

// Add all the test functions here

//#region createPath
async function createPath_WithStartWarehouseNotExisting_ShouldReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {};
  req.body = {
    startWarehouse: StartWarehouseId,
    endWarehouse: EndWarehouseId,
    distance: 10,
    pathTime: 10,
    spentEnergy: 10,
    extraChargeTime: 10,
  };

  let res: Partial<Response> = {};
  res.status = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let PathServiceInstance = Container.get('PathService');

  let PathRepoInstance = Container.get('PathRepo');
  const PathRepoMock = sinon
    .mock(PathRepoInstance, 'save')
    .expects('save')
    .once()
    .returns(null);

  let WarehouseRepoInstance = Container.get('WarehouseRepo');
  sinon
    .mock(WarehouseRepoInstance, 'ifWarehouseExists')
    .expects('ifWarehouseExists')
    .once()
    .withArgs(StartWarehouseId)
    .returns(false);

  const ctrl = new PathController(PathServiceInstance as IPathService);

  // Act
  await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function createPath_WithEndWarehouseNotExisting_ShouldReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {};
  req.body = {
    startWarehouse: StartWarehouseId,
    endWarehouse: EndWarehouseId,
    distance: 10,
    pathTime: 10,
    spentEnergy: 10,
    extraChargeTime: 10,
  };

  let res: Partial<Response> = {};
  res.status = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let PathServiceInstance = Container.get('PathService');

  let PathRepoInstance = Container.get('PathRepo');
  const PathRepoMock = sinon
    .mock(PathRepoInstance, 'save')
    .expects('save')
    .once()
    .returns(null);

  let WarehouseRepoInstance = Container.get('WarehouseRepo');
  sinon
    .stub(WarehouseRepoInstance, 'ifWarehouseExists')
    .withArgs(StartWarehouseId)
    .returns(true)
    .withArgs(EndWarehouseId)
    .returns(false);

  const ctrl = new PathController(PathServiceInstance as IPathService);

  // Act
  await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function createPath_WithDuplicatedPath_ShouldReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {};
  req.body = {
    startWarehouse: StartWarehouseId,
    endWarehouse: EndWarehouseId,
    distance: 10,
    pathTime: 10,
    spentEnergy: 10,
    extraChargeTime: 10,
  };

  let res: Partial<Response> = {};
  res.status = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let PathServiceInstance = Container.get('PathService');

  let WarehouseRepoInstance = Container.get('WarehouseRepo');
  sinon
    .stub(WarehouseRepoInstance, 'ifWarehouseExists')
    .withArgs(StartWarehouseId)
    .returns(true)
    .withArgs(EndWarehouseId)
    .returns(true);

  let PathRepoInstance = Container.get('PathRepo');
  var mockPathRepoInstance = sinon
    .mock(PathRepoInstance, 'getByStartEndWarehouseId')
    .expects('getByStartEndWarehouseId')
    .once()
    .withArgs(StartWarehouseId, EndWarehouseId)
    .returns([{}]);

  const ctrl = new PathController(PathServiceInstance as IPathService);

  // Act
  await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  mockPathRepoInstance.verify();
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function createPath_WithValidData_ShouldReturnPath() {
  // Arrange
  let req: Partial<Request> = {};
  req.body = {
    startWarehouse: StartWarehouseId,
    endWarehouse: EndWarehouseId,
    distance: 10,
    pathTime: 10,
    spentEnergy: 10,
    extraChargeTime: 10,
  };

  let res: Partial<Response> = {};
  res.json = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let PathServiceInstance = Container.get('PathService');

  let WarehouseRepoInstance = Container.get('WarehouseRepo');
  sinon
    .stub(WarehouseRepoInstance, 'ifWarehouseExists')
    .withArgs(StartWarehouseId)
    .returns(true)
    .withArgs(EndWarehouseId)
    .returns(true);

  let PathRepoInstance = Container.get('PathRepo');
  var mockPathRepoInstance = sinon
    .mock(PathRepoInstance, 'getByStartEndWarehouseId')
    .expects('getByStartEndWarehouseId')
    .once()
    .withArgs(StartWarehouseId, EndWarehouseId)
    .returns([]);

  var mockSavePathRepoInstance = sinon
    .mock(PathRepoInstance, 'save')
    .expects('save')
    .once();

  const ctrl = new PathController(PathServiceInstance as IPathService);

  // Act
  await ctrl.createPath(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  mockSavePathRepoInstance.verify();
  mockPathRepoInstance.verify();
  sinon.assert.called(res.json);
}
//#endregion

//#region getPaths
async function getPathById_WithPathNotExisting_ShouldReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {};
  req.params = {
    id: pathId,
  };

  let res: Partial<Response> = {};
  res.status = sinon.spy();

  let next: Partial<NextFunction> = () => {};

  let pathServiceInstance = Container.get('PathService');

  let pathRepoInstance = Container.get('PathRepo');
  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(pathId))
    .returns(null);

  const ctrl = new PathController(pathServiceInstance as IPathService);

  // Act
  await ctrl.getPathsById(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function getPathById_WithExistingPath_ShouldReturnPathJson() {
  // Arrange
  let req: Partial<Request> = {
    params: {
      id: pathId,
    },
  };

  let res: Partial<Response> = {
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let pathServiceInstance = Container.get('PathService');

  let pathRepoInstance = Container.get('PathRepo');
  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(pathId))
    .returns(PathToReturn);

  const ctrl = new PathController(pathServiceInstance as IPathService);

  // Act
  await ctrl.getPathsById(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.json, sinon.match(PathExpected));
}
async function getPathById_WithPathId_ShouldCallRepoOnce() {
  // Arrange
  let req: Partial<Request> = {
    params: {
      id: pathId,
    },
  };

  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let pathServiceInstance = Container.get('PathService');

  let pathRepoInstance = Container.get('PathRepo');
  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findByDomainId')
    .expects('findByDomainId')
    .once()
    .withArgs(sinon.match(pathId))
    .returns(null);

  const ctrl = new PathController(pathServiceInstance as IPathService);

  // Act
  await ctrl.getPathsById(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  pathRepoMock.verify();
}

async function getAllPaths_WithPathsNonExisting_ShouldReturnStatus400() {
  // Arrange
  let req: Partial<Request> = {};
  let res: Partial<Response> = {
    status: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let pathServiceInstance = Container.get('PathService');

  let pathRepoInstance = Container.get('PathRepo');
  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(null);

  const ctrl = new PathController(pathServiceInstance as IPathService);

  // Act
  await ctrl.getPaths(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.status, sinon.match(400));
}
async function getAllPaths_WithExistingPaths_ShouldReturnPathsJson() {
  // Arrange
  let req: Partial<Request> = {};

  let res: Partial<Response> = {
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let pathServiceInstance = Container.get('PathService');

  let pathRepoInstance = Container.get('PathRepo');
  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAll')
    .expects('findAll')
    .once()
    .returns(pathArrayToReturn);

  const ctrl = new PathController(pathServiceInstance as IPathService);

  // Act
  await ctrl.getPaths(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.json, sinon.match(pathArrayExpected));
}
async function getPathsWithPagination_WithExistingPaths_ShouldReturnPathsJson() {
  // Arrange
  let req: Partial<Request> = {
    query: {
      page: '0',
      limit: '10',
    },
  };

  let res: Partial<Response> = {
    json: sinon.spy(),
  };

  let next: Partial<NextFunction> = () => {};

  let pathServiceInstance = Container.get('PathService');

  let pathRepoInstance = Container.get('PathRepo');
  const pathRepoMock = sinon
    .mock(pathRepoInstance, 'findAllWithPagination')
    .expects('findAllWithPagination')
    .once()
    .returns(pathPageArrayToReturn);

  const ctrl = new PathController(pathServiceInstance as IPathService);

  // Act
  await ctrl.getPathsWithPagination(<Request>req, <Response>res, <NextFunction>next);

  // Assert
  sinon.assert.calledWith(res.json, sinon.match(pathPageArrayExpected));
}
//#endregion
