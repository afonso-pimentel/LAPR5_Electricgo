import IPrologDeliveryRequestDTO from './IPrologDeliveryRequestDTO';
import IPrologPathPlanningRequestDTO from './IPrologPathPlanningRequestDTO';
import IPrologPrimaryWarehousePlanningRequestDTO from './IPrologPrimaryWarehousePlanningRequestDTO';
import IPrologWarehousePlanningRequestDTO from './IPrologWarehousePlanningRequestDTO';

/**
 * Prolog planning request DTO.
 */
export default interface IPrologPlanningRequestDTO {
  heuristic: string;
  warehouses: IPrologWarehousePlanningRequestDTO[];
  paths: IPrologPathPlanningRequestDTO[];
  deliveries: IPrologDeliveryRequestDTO[];
  primaryWarehouse: IPrologPrimaryWarehousePlanningRequestDTO;
}
