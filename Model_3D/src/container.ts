import { Container } from "inversify";
import "reflect-metadata";
import { SERVICE_KEYS } from "./service-keys-const";
import { PathService } from "./services_implementation/PathService";
import { WarehouseService } from "./services_implementation/WarehouseService";
import { PathServiceDev } from "./servicesImpDev/PathServiceDev";
import { WarehouseServiceDev } from "./servicesImpDev/warehouseServiceDev";
import { CookieHelper } from "./utils/cookieHelper";
const _container = new Container();

let developmentCookie = CookieHelper.getCookie("development") ?? "true";

if (developmentCookie === "true") {
  _container
    .bind(SERVICE_KEYS.PATH_SERVICE)
    .to(PathServiceDev)
    .inSingletonScope();
  _container
    .bind(SERVICE_KEYS.WAREHOUSE_SERVICE)
    .to(WarehouseServiceDev)
    .inSingletonScope();
} else {
  _container.bind(SERVICE_KEYS.PATH_SERVICE).to(PathService).inSingletonScope();
  _container
    .bind(SERVICE_KEYS.WAREHOUSE_SERVICE)
    .to(WarehouseService)
    .inSingletonScope();
}
export const container = _container;
