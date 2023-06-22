import 'reflect-metadata';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Container } from 'typedi';
import { Path } from '../../../src/domain/PathAggregate/Path';
import { PathWarehouseId } from '../../../src/domain/PathAggregate/PathWarehouseId';

describe('path class', function() {
  const sandbox = sinon.createSandbox();

  //Setup Dependency Injection
  beforeEach(function() {
    Container.reset();

  });

  afterEach(function() {
    sandbox.restore();
  });

  //Declare the tests
  //#region create
  it('create With Invalid Distance Should Return Result Fail Status', createPath_WithInvalidDistance_ShouldReturnResultFailStatus);
  it('create With Invalid Path Time Should Return Result Fail Status', createPath_WithInvalidPathTime_ShouldReturnResultFailStatus);
  it('create With Invalid Spent Energy Should Return Result Fail Status', createPath_WithInvalidSpentEnergy_ShouldReturnResultFailStatus);
  it('create With Invalid Extra Charge Time Should Return Result Fail Status', createPath_WithInvalidExtraChargeTime_ShouldReturnResultFailStatus);
  it('create With Valid Path Success Should Result Success Status', createPath_WithValidData_ShouldReturnResultSuccessStatus);
  //#endregion
});

//Add somo global variables to the test
const StartWarehouseId = '86e6501c-bf1f-441b-88b2-f28fe6f61a2a';
const EndWarehouseId = 'bb7746d3-9300-4906-9d42-6fe4ebf32176';

const PathExpected = {
  startWarehouse: new PathWarehouseId(StartWarehouseId),
  endWarehouse: new PathWarehouseId(EndWarehouseId),
  distance: 10,
  pathTime: 10,
  spentEnergy: 10,
  extraChargeTime: 10,
} as unknown as Path;

const ValidPath = {
  startWarehouse: new PathWarehouseId(StartWarehouseId),
  endWarehouse: new PathWarehouseId(EndWarehouseId),
  distance: 10,
  pathTime: 10,
  spentEnergy: 10,
  extraChargeTime: 10,
};

// Add all the test functions here

//#region createPath
async function createPath_WithInvalidDistance_ShouldReturnResultFailStatus() {
  // Arrange
  let invalidPath = Object.assign({}, ValidPath);
  invalidPath.distance = -1;

  // Act
  const result = Path.create(invalidPath);

  // Assert
  expect(result.isFailure).to.equal(true);
}
async function createPath_WithInvalidPathTime_ShouldReturnResultFailStatus() {
  // Arrange
  let invalidPath = Object.assign({}, ValidPath);
  invalidPath.pathTime = -1;

  // Act
  const result = Path.create(invalidPath);

  // Assert
  expect(result.isFailure).to.equal(true);
}
async function createPath_WithInvalidSpentEnergy_ShouldReturnResultFailStatus() {
  // Arrange
  let invalidPath =  Object.assign({}, ValidPath);
  invalidPath.spentEnergy = -1;

  // Act
  const result = Path.create(invalidPath);

  // Assert
  expect(result.isFailure).to.equal(true);
}
async function createPath_WithInvalidExtraChargeTime_ShouldReturnResultFailStatus() {
  // Arrange
  let invalidPath =  Object.assign({}, ValidPath);
  invalidPath.extraChargeTime = -1;

  // Act
  const result = Path.create(invalidPath);

  // Assert
  expect(result.isFailure).to.equal(true);
}
async function createPath_WithValidData_ShouldReturnResultSuccessStatus() {
  // Act
  const result = Path.create(ValidPath);

  // Assert
  expect(result.isSuccess).to.equal(true);
  expect(result.getValue().props).to.deep.equal(PathExpected);
}

//#endregion