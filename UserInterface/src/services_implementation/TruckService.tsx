import { injectable } from "inversify";
import { ITruckService } from "../services/ITruckService";
import { AxiosResponse } from "axios";
import { GetTruckResponseDto } from "../dtos/Truck/GetTruckResponseDto";
import { PostTruckRequestDto } from "../dtos/Truck/PostTruckRequestDto";
import { LogisticsHttpService } from "../http-services";
import { container } from "../container";
import { IAuthService } from "../services/IAuthService";
import { SERVICE_KEYS } from "../service-keys-const";

@injectable()
export class TruckService implements ITruckService {
  authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);

  async post(data: PostTruckRequestDto): Promise<AxiosResponse<GetTruckResponseDto | null, any>> {
    return LogisticsHttpService.post<GetTruckResponseDto>(`/trucks`, data, { headers: { 'Authorization': this.authService.getToken() } });
  }
  async getAll(): Promise<AxiosResponse<Array<GetTruckResponseDto> | null>> {
    return LogisticsHttpService.get<Array<GetTruckResponseDto>>(`/trucks/`, {
      params: { all: true },
      headers: { 'Authorization': this.authService.getToken() }
    });
  }
  async get(id: string): Promise<AxiosResponse<GetTruckResponseDto | null>> {
    return LogisticsHttpService.get<GetTruckResponseDto>(`/trucks/${id}`, { headers: { 'Authorization': this.authService.getToken() } });
  }
  async getActives(): Promise<
    AxiosResponse<Array<GetTruckResponseDto> | null>
  > {
    return LogisticsHttpService.get<Array<GetTruckResponseDto>>(`/trucks`, { headers: { 'Authorization': this.authService.getToken() } });
  }
  async delete(id: string): Promise<AxiosResponse<GetTruckResponseDto | null>> {
    return LogisticsHttpService.patch<GetTruckResponseDto>(`/trucks/${id}`,null, { headers: { 'Authorization': this.authService.getToken() } });
  }
}
