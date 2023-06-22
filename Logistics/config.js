import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  // databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/test",
  // TODO: add the database password as an environment variable secret
  databaseURL:
    process.env.MONGODB_URI ||
    'mongodb+srv://isep2022:isep2022@eletricgo.n82cej9.mongodb.net/?retryWrites=true&w=majority',

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || 'my sakdfho2390asjod$%jl)!sdjas0i secret',

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: 'RoleController',
      path: '../controllers/roleController',
    },
    path: {
      name: 'PathController',
      path: '../controllers/PathController',
    },
    truck: {
      name: 'TruckController',
      path: '../controllers/TruckController',
    },
    deliveryPackage: {
      name: 'DeliveryPackageController',
      path: '../controllers/DeliveryPackageController',
    },
    seed: {
      name: 'SeedingController',
      path: '../controllers/SeedingController',
    },
    planning: {
      name: 'PlanningController',
      path: '../controllers/PlanningController',
    },
    trip: {
      name: 'TripController',
      path: '../controllers/TripController',
    },
  },

  repos: {
    warehouse: {
      name: 'WarehouseRepo',
      path: '../repos/WarehouseRepo',
    },
    role: {
      name: 'RoleRepo',
      path: '../repos/roleRepo',
    },
    user: {
      name: 'UserRepo',
      path: '../repos/userRepo',
    },
    path: {
      name: 'PathRepo',
      path: '../repos/PathRepo',
    },
    truck: {
      name: 'TruckRepo',
      path: '../repos/TruckRepo',
    },
    deliveryPackage: {
      name: 'DeliveryPackageRepo',
      path: '../repos/DeliveryPackageRepo',
    },
    delivery: {
      name: 'DeliveryRepo',
      path: '../repos/DeliveryRepo',
    },
    planning: {
      name: 'PlanningRepo',
      path: '../repos/PlanningRepo',
    },
    trip: {
      name: 'TripRepo',
      path: '../repos/TripRepo',
    },
  },
  services: {
    role: {
      name: 'RoleService',
      path: '../services/roleService',
    },
    path: {
      name: 'PathService',
      path: '../services/PathService',
    },
    truck: {
      name: 'TruckService',
      path: '../services/TruckService',
    },
    deliveryPackage: {
      name: 'DeliveryPackageService',
      path: '../services/DeliveryPackageService',
    },
    planning: {
      name: 'PlanningService',
      path: '../services/PlanningService',
    },
    trip: {
      name: 'TripService',
      path: '../services/TripService',
    },
  },
  strategies: {
    planningStrategy: {
      name: 'PlanningStrategy',
      path: '../strategies/planning/PlanningStrategy',
    },
  },

  // planningStrategy: 'simulated',
  planningStrategy: 'prolog',

  //ExternalApiAddress
  warehouseApiUrl: 'http://localhost:54847/api/',
  prologApiUrl: 'http://127.0.0.1:8080/',

  //Google Oauth
  googleClientId: '781342548826-mot9e525ugltga1geccu5ctq8d21pekd.apps.googleusercontent.com',
  googleClientSecret: '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',
  googleCallbackAddress: '/logistics/api/auth/google/callback',

  //FrontEnd Url
  frontendSuccessLogin: 'http://ec2-13-36-46-38.eu-west-3.compute.amazonaws.com/logged-in',
  frontendFailLogin: 'http://ec2-13-36-46-38.eu-west-3.compute.amazonaws.com/logged-in',

  //Token
  tokenSecret: 'MenosDe20DesistoDaVida',
};
