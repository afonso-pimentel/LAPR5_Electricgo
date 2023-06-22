import 'reflect-metadata';
import * as sinon from 'sinon';
import { expect } from 'chai';
import { Container } from 'typedi';
import { TruckBattery } from '../../../src/domain/TruckAggregate/TruckBattery';
import { TruckLicensePlate } from '../../../src/domain/TruckAggregate/TruckLicensePlate';
import { TruckMap } from '../../../src/mappers/TruckMap';
import _ from 'lodash';

describe('truck class', function() {
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
  it('create With Invalid Tare Should Return Result Fail Status', createTruckInvalidTareReturnFailStatus);

  it(
    'create With Invalid loadCapacity Time Should Return Result Fail Status',
    createTruckInvalidLoadCapacityReturnFailStatus,
  );

  it(
    'create With Invalid fullLoadCapacity Time Should Return Result Fail Status',
    createTruckInvalidFullLoadAutonomyReturnFailStatus,
  );

  it(
    'create With Invalid battery capacity Time Should Return Result Fail Status',
    createTruckInvalidBatteryCapacityReturnFailStatus,
  );

  it(
    'create With Invalid battery SlowChargeTime Should Return Result Fail Status',
    createTruckInvalidBatterySlowChargeTimeReturnFailStatus,
  );

  it(
    'create With Invalid battery FastChargeTime Should Return Result Fail Status',
    createTruckInvalidBatteryFastChargeTimeReturnFailStatus,
  );

  it(
    'create With Invalid battery SlowChargeTime Less than FastChargeTime Should Return Result Fail Status',
    createTruckInvalidBatterySlowChargeTimeLessThanFastChargeTimeReturnFailStatus,
  );

  it(
    'create With Invalid license plate Should Return Result Fail Status',
    createTruckInvalidLicensePlateReturnFailStatus,
  );

  it('create With Valid Arguments Should Return Result Success Status', createValidTruckReturnSuccessStatus);
  //#endregion
});

//Add somo global variables to the test
const TruckId1 = '09ec29e5-c996-4373-bcd5-302f577cd0ad';

const TruckExpected = {
  tare: 500,
  loadCapacity: 1000,
  fullLoadAutonomy: 200,
  battery: ({
    capacity: 80,
    fastChargeTime: 60,
    slowChargeTime: 300,
  } as unknown) as TruckBattery,
  licensePlate: ({ value: 'TP-40-40' } as unknown) as TruckLicensePlate,
};

const ValidTruck = {
  id: TruckId1,
  tare: 500,
  loadCapacity: 1000,
  fullLoadAutonomy: 200,
  capacity: 80,
  fastChargeTime: 60,
  slowChargeTime: 300,
  licensePlate: 'tp-40-40',
};

// Add all the test functions here

//#region createTruck
async function createTruckInvalidTareReturnFailStatus() {
  // Arrange
  let invalidTruck = Object.assign({}, ValidTruck);
  invalidTruck.tare = -1;

  // Act
  const result = TruckMap.toDomain(invalidTruck);

  // Assert
  expect(result.isFailure).to.equal(true);
}
async function createTruckInvalidLoadCapacityReturnFailStatus() {
  // Arrange
  let invalidTruck = Object.assign({}, ValidTruck);
  invalidTruck.loadCapacity = -1;

  // Act
  const result = TruckMap.toDomain(invalidTruck);

  // Assert
  expect(result.isFailure).to.equal(true);
}

async function createTruckInvalidFullLoadAutonomyReturnFailStatus() {
  // Arrange
  let invalidTruck = Object.assign({}, ValidTruck);
  invalidTruck.fullLoadAutonomy = -1;

  // Act
  const result = TruckMap.toDomain(invalidTruck);

  // Assert
  expect(result.isFailure).to.equal(true);
}

async function createTruckInvalidBatteryCapacityReturnFailStatus() {
  // Arrange
  let invalidTruck = Object.assign({}, ValidTruck);
  invalidTruck.capacity = -1;

  // Act

  const result = TruckMap.toDomain(invalidTruck);

  // Assert
  expect(result.isFailure).to.equal(true);
}

async function createTruckInvalidBatteryFastChargeTimeReturnFailStatus() {
  // Arrange
  let invalidTruck = Object.assign({}, ValidTruck);
  invalidTruck.fastChargeTime = -1;

  // Act

  const result = TruckMap.toDomain(invalidTruck);

  // Assert
  expect(result.isFailure).to.equal(true);
}

async function createTruckInvalidBatterySlowChargeTimeReturnFailStatus() {
  // Arrange
  let invalidTruck = Object.assign({}, ValidTruck);
  invalidTruck.slowChargeTime = 1;

  // Act

  const result = TruckMap.toDomain(invalidTruck);

  // Assert
  expect(result.isFailure).to.equal(true);
}

async function createTruckInvalidBatterySlowChargeTimeLessThanFastChargeTimeReturnFailStatus() {
  // Arrange
  let invalidTruck = Object.assign({}, ValidTruck);
  invalidTruck.slowChargeTime = 40;
  invalidTruck.fastChargeTime = 50;

  // Act

  const result = TruckMap.toDomain(invalidTruck);

  // Assert
  expect(result.isFailure).to.equal(true);
}

async function createTruckInvalidLicensePlateReturnFailStatus() {
  // Arrange
  let invalidTruck = Object.assign({}, ValidTruck);
  invalidTruck.licensePlate = 'ty-40-40y';

  // Act

  const result = TruckMap.toDomain(invalidTruck);

  // Assert
  expect(result.isFailure).to.equal(true);
}

async function createValidTruckReturnSuccessStatus() {
  // Act

  const result = TruckMap.toDomain(ValidTruck);

  // Assert
  expect(result.isSuccess).to.equal(true);
}
//#endregion
