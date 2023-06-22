import 'reflect-metadata';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Container } from 'typedi';
import { DeliveryPackage } from '../../../src/domain/DeliveryPackageAggregate/DeliveryPackage';
import { DeliveryPackagePosition } from '../../../src/domain/DeliveryPackageAggregate/DeliveryPackagePosition';
import { DeliveryId } from '../../../src/domain/DeliveryPackageAggregate/DeliveryId';
describe('delivery package class', function() {
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

  // it(
  //   'update With Invalid Position Should Return Result Fail Status',
  //   updateDeliveryPackage_WithInvalidPosition_ShouldReturnResultFailStatus,
  // );

  it(
    'update With Valid Position Should Result Success Status',
    updateDeliveryPackage_WithValidPosition_ShouldReturnResultSuccessStatus,
  );
  //#endregion
  //#region create DeliveryPacakge
  it('create with invalid load time should return fail status', create_WithInvalidLoadTime_ShouldReturnFailureResult);
  it('create with invalid unload time should return fail status', create_WithInvalidUnLoadTime_ShouldReturnFailureResult);
  it('create with invalid position argument should return fail status', create_WithUndefinedPositionArgument_ShouldReturnFailureResult);
  it('create with negative position X should return fail status', create_WithNegativeXPositionArgument_ShouldReturnFailureResult);
  it('create with negative position Y should return fail status', create_WithNegativeYPositionArgument_ShouldReturnFailureResult);
  it('create with negative position Z should return fail status', create_WithNegativeZPositionArgument_ShouldReturnFailureResult);
  it('create with valid arguments should return expected delivery package object', create_WithValidArguments_ShouldReturnExpectedDeliveryPackage);
  it('create with invalid delivery id should return fail status', create_WithInvalidDeliveryId_ShouldReturnExpectedDeliveryPackage);
  //#endregion
});

const ValidDeliveryId = ({
  value: '99387856-e7eb-4d05-a709-5a58a45cdd5e',
} as unknown) as DeliveryId;

const initialPosition = ({
  x: 4,
  y: 4,
  z: 4,
} as unknown) as DeliveryPackagePosition;

// async function updateDeliveryPackage_WithInvalidPosition_ShouldReturnResultFailStatus() {
//   //Arrange

//   const validDeliveryPackage = {
//     packageId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
//     deliveryId: ValidDeliveryId,
//     loadTime: 20,
//     unloadTime: 10,
//     position: initialPosition,
//   } as any;
//   //Act
//   let validDeliveryPackageCreated = await DeliveryPackage.create(validDeliveryPackage);

//   const InvalidPosition = {};

//   //Act
//   const result = validDeliveryPackageCreated.getValue().updatePosition(null);

//   //Assert
//   expect(result.isFailure).to.equal(true);
// }

async function updateDeliveryPackage_WithValidPosition_ShouldReturnResultSuccessStatus() {
  //Arrange

  const validDeliveryPackage = {
    packageId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    deliveryId: '99387856-e7eb-4d05-a709-5a58a45cdd5e',
    loadTime: 20,
    unloadTime: 10,
    position: initialPosition,
  } as any;

  let validDeliveryPackageCreated = await DeliveryPackage.create(validDeliveryPackage);

  //Act
  const ValidPosition = ({
    x: 10,
    y: 10,
    z: 10,
  } as unknown) as DeliveryPackagePosition;

  //Act
  const result = validDeliveryPackageCreated.getValue().updatePosition(ValidPosition);

  //Assert
  expect(result.isSuccess).to.equal(true);
}

//#endregion

//#region createDeliveryPackage

function create_WithInvalidDeliveryId_ShouldReturnExpectedDeliveryPackage(){
  // Arrange
  const expectedDelivery = ({
    deliveryId: 'INVALID-DELIVERY-ID',
    loadTime: 10,
    unloadTime: 1,
    position: {
      x: 4,
      y: 4,
      z: 4,
    }
  } as unknown) as DeliveryPackage;

  // Act
  const result = DeliveryPackage.create(expectedDelivery);

  // Assert
  expect(result.isSuccess).to.equal(false);
}


//#endregion

//#region createDeliveryPackage
function create_WithInvalidLoadTime_ShouldReturnFailureResult(){
  // Arrange
  const deliveryPackage = ({
    packageId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    deliveryId: ValidDeliveryId,
    loadTime: -1,
    unloadTime: 10,
    position: initialPosition,
  } as unknown) as DeliveryPackage;

  // Act
  const result = DeliveryPackage.create(deliveryPackage);

  // Assert
  expect(result.isFailure).to.equal(true);
}

function create_WithInvalidUnLoadTime_ShouldReturnFailureResult(){
  // Arrange
  const deliveryPackage = ({
    packageId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    deliveryId: ValidDeliveryId,
    loadTime: 10,
    unloadTime: -1,
    position: initialPosition,
  } as unknown) as DeliveryPackage;

  // Act
  const result = DeliveryPackage.create(deliveryPackage);

  // Assert
  expect(result.isFailure).to.equal(true);
}

function create_WithUndefinedPositionArgument_ShouldReturnFailureResult(){
  // Arrange
  const deliveryPackage = ({
    packageId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    deliveryId: ValidDeliveryId,
    loadTime: 10,
    unloadTime: -1
  } as unknown) as DeliveryPackage;

  // Act
  const result = DeliveryPackage.create(deliveryPackage);

  // Assert
  expect(result.isFailure).to.equal(true);
}

function create_WithNegativeXPositionArgument_ShouldReturnFailureResult(){
  // Arrange
  const deliveryPackage = ({
    packageId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    deliveryId: ValidDeliveryId,
    loadTime: 10,
    unloadTime: 1,
    position: {
      x: -4,
      y: 4,
      z: 4,
    }
  } as unknown) as DeliveryPackage;

  // Act
  const result = DeliveryPackage.create(deliveryPackage);

  // Assert
  expect(result.isFailure).to.equal(true);
}

function create_WithNegativeYPositionArgument_ShouldReturnFailureResult(){
  // Arrange
  const deliveryPackage = ({
    packageId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    deliveryId: ValidDeliveryId,
    loadTime: 10,
    unloadTime: 1,
    position: {
      x: 4,
      y: -4,
      z: 4,
    }
  } as unknown) as DeliveryPackage;

  // Act
  const result = DeliveryPackage.create(deliveryPackage);

  // Assert
  expect(result.isFailure).to.equal(true);
}

function create_WithNegativeZPositionArgument_ShouldReturnFailureResult(){
  // Arrange
  const deliveryPackage = ({
    packageId: 'ad9cd9e1-5945-4353-9002-8221a6d3d3f3',
    deliveryId: ValidDeliveryId,
    loadTime: 10,
    unloadTime: 1,
    position: {
      x: 4,
      y: 4,
      z: -4,
    }
  } as unknown) as DeliveryPackage;

  // Act
  const result = DeliveryPackage.create(deliveryPackage);

  // Assert
  expect(result.isFailure).to.equal(true);
}

function create_WithValidArguments_ShouldReturnExpectedDeliveryPackage(){
  // Arrange
  const expectedDelivery = ({
    deliveryId: '99387856-e7eb-4d05-a709-5a58a45cdd5e',
    loadTime: 10,
    unloadTime: 1,
    position: {
      x: 4,
      y: 4,
      z: 4,
    }
  } as unknown) as DeliveryPackage;

  // Act
  const result = DeliveryPackage.create(expectedDelivery);

  // Assert
  expect(result.isSuccess).to.equal(true);
  expect(result.getValue().deliveryId).to.equals(expectedDelivery.deliveryId);
  expect(result.getValue().loadTime).to.equals(expectedDelivery.loadTime);
  expect(result.getValue().unloadTime).to.equals(expectedDelivery.unloadTime);
  expect(result.getValue().position).to.equals(expectedDelivery.position);
}

//#endregion
