import { GetPlanningResponseDto } from "../dtos/Planning/GetPlanningResponseDto";
import { Planning } from "../models/Planning";

function GetResponseToModel(response: GetPlanningResponseDto): Planning {
  return {
    listOrderDeliveries: response.listOrderDeliveries,
    listOrderWarehouses: response.listOrderWarehouses,
    listWarehousesToCharge: response.listWarehousesToCharge,
    listWarehousesQuantityToCharge: response.listWarehousesQuantityToCharge,
    listWarehousesTimeToCharge: response.listWarehousesTimeToCharge,
    planningCost: response.planningCost,
  } as Planning;
}

export { GetResponseToModel };
