import { injectable } from "inversify";
import { IPathService } from "../services/IPathService";
import { PathDto } from "../dtos/path";
import { LogisticsHttpService } from "../http-services";

@injectable()
export class PathService implements IPathService {
  constructor() {}

  async getAll(): Promise<Array<PathDto>> {
    try {
      // use axios to get data from the api and then return the data as an array of WarehouseDto
      return await LogisticsHttpService.get("paths").then((response) => {
        return response.data;
      });
    } catch (error) {
      return [];
    }
  }
}
