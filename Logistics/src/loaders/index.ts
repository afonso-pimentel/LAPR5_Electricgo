import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import WarehouseRepo from '../repos/WarehouseRepo';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  // TODO: this is where you do dependenciy injection

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path,
  };

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path,
  };

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path,
  };

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path,
  };

  // Path dependency injection variables
  const pathSchema = {
    name: 'pathSchema',
    schema: '../persistence/schemas/pathSchema',
  };

  const pathRepo = {
    name: config.repos.path.name,
    path: config.repos.path.path,
  };

  const pathService = {
    name: config.services.path.name,
    path: config.services.path.path,
  };

  const pathController = {
    name: config.controllers.path.name,
    path: config.controllers.path.path,
  };

  // Truck dependency injection variables
  const truckSchema = {
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path,
  };

  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path,
  };

  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path,
  };

  // DeliveryPackage dependency injection variables
  const deliveryPackageSchema = {
    name: 'deliveryPackageSchema',
    schema: '../persistence/schemas/deliveryPackageSchema',
  };

  const deliveryPackageRepo = {
    name: config.repos.deliveryPackage.name,
    path: config.repos.deliveryPackage.path,
  };

  const deliveryPackageService = {
    name: config.services.deliveryPackage.name,
    path: config.services.deliveryPackage.path,
  };

  const deliveryPackageController = {
    name: config.controllers.deliveryPackage.name,
    path: config.controllers.deliveryPackage.path,
  };

  const deliveryRepo = {
    name: config.repos.delivery.name,
    path: config.repos.delivery.path,
  };

  const warehouseRepo = {
    name: config.repos.warehouse.name,
    path: config.repos.warehouse.path,
  };

  const seedingController = {
    name: config.controllers.seed.name,
    path: config.controllers.seed.path,
  };

  // planning dependency injection variables

  const planningController = {
    name: config.controllers.planning.name,
    path: config.controllers.planning.path,
  };

  const planningService = {
    name: config.services.planning.name,
    path: config.services.planning.path,
  };

  const planningRepo = {
    name: config.repos.planning.name,
    path: config.repos.planning.path,
  };

  const planningStrategy = {
    name: config.strategies.planningStrategy.name,
    path: config.strategies.planningStrategy.path,
  };

  // trip dependency injection variables

  const tripSchema = {
    name: 'tripSchema',
    schema: '../persistence/schemas/tripSchema',
  };

  const tripController = {
    name: config.controllers.trip.name,
    path: config.controllers.trip.path,
  };

  const tripService = {
    name: config.services.trip.name,
    path: config.services.trip.path,
  };

  const tripRepo = {
    name: config.repos.trip.name,
    path: config.repos.trip.path,
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [userSchema, roleSchema, pathSchema, truckSchema, deliveryPackageSchema, tripSchema],
    controllers: [
      roleController,
      pathController,
      truckController,
      deliveryPackageController,
      seedingController,
      planningController,
      tripController,
    ],
    repos: [
      roleRepo,
      userRepo,
      pathRepo,
      truckRepo,
      deliveryPackageRepo,
      deliveryRepo,
      warehouseRepo,
      planningRepo,
      tripRepo,
    ],
    services: [roleService, pathService, truckService, deliveryPackageService, planningService, tripService],
    strategies: [planningStrategy],
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
