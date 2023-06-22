import { injectable } from "inversify";
import { IWarehouseService } from "../services/IWarehouseService";
import { WarehouseDto } from "../dtos/warehouse";
import { WarehouseHttpService } from "../http-services";

@injectable()
export class WarehouseService implements IWarehouseService {
  constructor() {}

  async getAll(): Promise<Array<WarehouseDto>> {
    try {
      // use axios to get data from the api and then return the data as an array of WarehouseDto
      return await WarehouseHttpService.get("warehouse").then((response) => {
        return response.data;
      });
    } catch (error) {
      return [];
    }
  }
}
