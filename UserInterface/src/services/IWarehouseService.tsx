import { AxiosResponse } from "axios";
import { GetWarehouseResponseDto } from "../dtos/Warehouse/GetWarehouseResponseDto";
import { PostWarehouseRequestDto } from "../dtos/Warehouse/PostWarehouseRequestDto";

export interface IWarehouseService {
  get(id: String): Promise<AxiosResponse<GetWarehouseResponseDto> | null>;
  getAll(withInactiveRecords?: boolean): Promise<AxiosResponse<Array<GetWarehouseResponseDto> | null>>;
  post(
    data: PostWarehouseRequestDto
  ): Promise<AxiosResponse<GetWarehouseResponseDto | null>>;
 inhibit(
    id: string
  ): Promise<AxiosResponse | null>;
}
