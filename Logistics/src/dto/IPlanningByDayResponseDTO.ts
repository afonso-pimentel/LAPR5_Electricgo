/**
 * Response DTO to obtain the planning for a given truck in a given day.
 */
 export default interface IPlanningByDayResponseDTO {
    listOrderDeliveries: string[];
    listOrderWarehouses: string[];
    listWarehousesToCharge: string[];
    listWarehousesQuantityToCharge: string[];
    listWarehousesTimeToCharge: string[];
    planningCost: number;
    truck: string;
  }
