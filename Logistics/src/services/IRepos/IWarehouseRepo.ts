import { IWarehouseDTO } from '../../dto/IWarehouseDTO';

export default interface IWarehouseRepo {
  ifWarehouseExists(warehouseId: string): Promise<boolean>;
  listOfWarehouses(): Promise<IWarehouseDTO[]>;
}
