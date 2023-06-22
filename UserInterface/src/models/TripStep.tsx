import { Delivery } from "./Delivery";
import { Warehouse } from "./Warehouse";

export type TripStep = {
    order: number;
    warehouse: Warehouse;
    delivery: Delivery;
    isWarehousesToCharge: boolean;
    chargeQuantity: number;
    chargeTime: number;
  }
