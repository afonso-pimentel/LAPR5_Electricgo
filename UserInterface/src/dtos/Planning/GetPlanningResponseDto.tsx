export interface GetPlanningResponseDto {
  listOrderDeliveries: string[];
  listOrderWarehouses: string[];
  listWarehousesToCharge: string[];
  listWarehousesQuantityToCharge: string[];
  listWarehousesTimeToCharge: string[];
  planningCost: number;
}
