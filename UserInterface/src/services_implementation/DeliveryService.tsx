import { injectable } from "inversify";
import { IDeliveryService } from "../services/IDeliveryService";
import { WarehouseHttpService } from "../http-services";
import { AxiosError,AxiosResponse } from "axios";
import { GetDeliveryResponseDto } from "../dtos/Delivery/GetDeliveryResponseDto";
import { PostDeliveryRequestDto } from "../dtos/Delivery/PostDeliveryRequestDto";
import { container } from "../container";
import { IAuthService } from "../services/IAuthService";
import { SERVICE_KEYS } from "../service-keys-const";

@injectable()
export class DeliveryService implements IDeliveryService {
  authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
  
  async post(data: PostDeliveryRequestDto): Promise<AxiosResponse<GetDeliveryResponseDto | null, any>> {
    return WarehouseHttpService.post<GetDeliveryResponseDto>(`/delivery`, data, { headers: { 'Authorization': this.authService.getToken() } });
  }
  async getAll(): Promise<AxiosResponse<Array<GetDeliveryResponseDto> | null>> {
    return WarehouseHttpService.get<Array<GetDeliveryResponseDto>>(`/delivery`, { headers: { 'Authorization': this.authService.getToken() } });
  }
  async get(
    id: string
    ): Promise<AxiosResponse<GetDeliveryResponseDto> | null> {
    return WarehouseHttpService.get<GetDeliveryResponseDto>(
      '/Delivery/${id}', { headers: { 'Authorization': this.authService.getToken() } }
    );
  }
}