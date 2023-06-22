import { AxiosResponse } from "axios";
import { GetTruckResponseDto } from "../dtos/Truck/GetTruckResponseDto";
import { DeleteTruckRequestDto } from "../dtos/Truck/DeleteTruckRequestDto";
import { PostTruckRequestDto } from "../dtos/Truck/PostTruckRequestDto";

export interface ITruckService {
  get(id: String): Promise<AxiosResponse<GetTruckResponseDto | null>>;
  getAll(): Promise<AxiosResponse<Array<GetTruckResponseDto> | null>>;
  getActives(): Promise<AxiosResponse<Array<GetTruckResponseDto> | null>>;
  post(
    data: PostTruckRequestDto
  ): Promise<AxiosResponse<GetTruckResponseDto | null>>;
  delete(id: string): Promise<AxiosResponse<GetTruckResponseDto | null>>;
}
