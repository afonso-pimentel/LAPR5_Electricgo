/**
 * Interface for the planning to trip DTO
 */
export default interface IPlanningToTripDTO {
  truckId: string;
  date: string;
  listOrderDeliveries: string[];
  listOrderWarehouses: string[];
  listWarehousesToCharge: string[];
  listWarehousesQuantityToCharge: string[];
  listWarehousesTimeToCharge: string[];
  planningCost: number;
  heuristic: string;
}
