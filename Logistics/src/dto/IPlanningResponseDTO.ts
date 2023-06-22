/**
 * Response DTO to obtain the planning for a given truck in a given day.
 */
 export default interface IPlanningResponseDTO {
    listOrderDeliveries: string[];
    listOrderWarehouses: string[];
    listWarehousesToCharge: string[];
    listWarehousesQuantityToCharge: string[];
    listWarehousesTimeToCharge: string[];
    planningCost: number;
  }
  