import { Container } from "inversify";
import "reflect-metadata";
import { DeliveryPackageService } from "./services_implementation/DeliveryPackageService";
import { DeliveryService } from "./services_implementation/DeliveryService";
import { SERVICE_KEYS } from "./service-keys-const";
import { PathService } from "./services_implementation/PathService";
import { WarehouseService } from "./services_implementation/WarehouseService";
import { TruckService } from "./services_implementation/TruckService";
import { PlanningService } from "./services_implementation/PlanningService";
import { UserService } from "./services_implementation/UserService";
import { TripService } from "./services_implementation/TripService";
import { AuthService } from "./services_implementation/AuthService";

const _container = new Container();

_container
  .bind(SERVICE_KEYS.DELIVERY_SERVICE)
  .to(DeliveryService)
  .inSingletonScope();
_container
  .bind(SERVICE_KEYS.DELIVERY_PACKAGE_SERVICE)
  .to(DeliveryPackageService)
  .inSingletonScope();
_container
  .bind(SERVICE_KEYS.WAREHOUSE_SERVICE)
  .to(WarehouseService)
  .inSingletonScope();
_container
  .bind(SERVICE_KEYS.PLANNING_SERVICE)
  .to(PlanningService)
  .inSingletonScope();
_container.bind(SERVICE_KEYS.PATH_SERVICE).to(PathService).inSingletonScope();
_container.bind(SERVICE_KEYS.TRUCK_SERVICE).to(TruckService).inSingletonScope();
_container.bind(SERVICE_KEYS.USER_SERVICE).to(UserService).inSingletonScope();
_container.bind(SERVICE_KEYS.AUTH_SERVICE).to(AuthService).inSingletonScope();
_container.bind(SERVICE_KEYS.TRIP_SERVICE).to(TripService).inSingletonScope();


export const container = _container;
