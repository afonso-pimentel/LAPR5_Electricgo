import axios from "axios";

const WarehouseHttpService = axios.create({
  baseURL: (process.env.REACT_APP_WAREHOUSE_API_URL as string),
});

const LogisticsHttpService = axios.create({
  baseURL: (process.env.REACT_APP_LOGISTICS_API_URL as string),
});

export {WarehouseHttpService, LogisticsHttpService};