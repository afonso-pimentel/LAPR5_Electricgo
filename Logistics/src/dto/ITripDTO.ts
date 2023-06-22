export default interface ITripDTO {
  id: string;
  truckId: string;
  date: string;
  warehouseIds: string[];
  deliveryIds: string[];
  areWarehousesToCharge: boolean[];
  chargeQuantities: number[];
  chargeTimes: number[];
  planningCost: number;
  heuristic: string;
}
