import IPrologDeliveryRequestDTO from './IPrologDeliveryRequestDTO';
import IPrologPathPlanningRequestDTO from './IPrologPathPlanningRequestDTO';
import IPrologPrimaryWarehousePlanningRequestDTO from './IPrologPrimaryWarehousePlanningRequestDTO';
import IPrologTruckPlanningRequestDTO from './IPrologTruckPlanningRequestDTO';
import IPrologWarehousePlanningRequestDTO from './IPrologWarehousePlanningRequestDTO';

/**
 * Prolog planning request DTO.
 */
export default interface IPrologPlanningByDayRequestDTO {
  trucks: IPrologTruckPlanningRequestDTO[];
  warehouses: IPrologWarehousePlanningRequestDTO[];
  paths: IPrologPathPlanningRequestDTO[];
  deliveries: IPrologDeliveryRequestDTO[];
  primaryWarehouse: IPrologPrimaryWarehousePlanningRequestDTO;
}
