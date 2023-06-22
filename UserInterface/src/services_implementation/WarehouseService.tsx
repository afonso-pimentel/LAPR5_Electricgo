import { injectable } from "inversify";
import { IWarehouseService } from "../services/IWarehouseService";
import { AxiosError, AxiosResponse } from "axios";
import { GetWarehouseResponseDto } from "../dtos/Warehouse/GetWarehouseResponseDto";
import { PostWarehouseRequestDto } from "../dtos/Warehouse/PostWarehouseRequestDto";
import { WarehouseHttpService } from "../http-services";
import { container } from "../container";
import { IAuthService } from "../services/IAuthService";
import { SERVICE_KEYS } from "../service-keys-const";

@injectable()
export class WarehouseService implements IWarehouseService {
  authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);

  async post(
    data: PostWarehouseRequestDto
  ): Promise<AxiosResponse<GetWarehouseResponseDto | null, any>> {
    return WarehouseHttpService.post<GetWarehouseResponseDto>(
      "/Warehouse/",
      data, { headers: { 'Authorization': this.authService.getToken() } }
    );
  }
  async getAll(withInactiveRecords?: boolean): Promise<
    AxiosResponse<Array<GetWarehouseResponseDto> | null>
  > {
    let filter: boolean = false;

    if(withInactiveRecords != undefined)
      filter = withInactiveRecords;

    return WarehouseHttpService.get<Array<GetWarehouseResponseDto>>(
       `/Warehouse?all=${filter}`, { headers: { 'Authorization': this.authService.getToken() } }
    );
  }
  async get(
    id: string
  ): Promise<AxiosResponse<GetWarehouseResponseDto> | null> {
    return WarehouseHttpService.get<GetWarehouseResponseDto>(
      `/Warehouse/${id}`, { headers: { 'Authorization': this.authService.getToken() } }
    );
  }

  async inhibit(
    id: string
  ): Promise<AxiosResponse | null> {
    return WarehouseHttpService.patch(
      `/Warehouse/${id}` ,null
      , { headers: { 'Authorization': this.authService.getToken() } }
    );
  }
}
