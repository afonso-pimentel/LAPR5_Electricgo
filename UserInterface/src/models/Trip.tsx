import { TripStep } from "./TripStep";
import { Truck } from "./Truck";
import { Warehouse } from "./Warehouse";

export type Trip = {
    id: string;
    truck: Truck;
    date: string;
    steps: TripStep[];
  }
