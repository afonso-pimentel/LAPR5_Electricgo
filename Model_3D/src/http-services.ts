import axios from "axios";
import { Config } from "./config/config";

const WarehouseHttpService = axios.create({
  baseURL: Config.warehouseApiUrl as string,
});

const LogisticsHttpService = axios.create({
  baseURL: Config.logisticsApiUrl as string,
});

export { WarehouseHttpService, LogisticsHttpService };
