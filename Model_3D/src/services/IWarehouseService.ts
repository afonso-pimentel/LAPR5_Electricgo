import { WarehouseDto } from "../dtos/warehouse";

export interface IWarehouseService {
  getAll(): Promise<Array<WarehouseDto>>;
}
