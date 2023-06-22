import { AxiosError, AxiosResponse } from "axios";
import { injectable } from "inversify";
import { container } from "../container";
import { GetDeliveryPackageResponseDto } from "../dtos/DeliveryPackage/GetDeliveryPackageResponseDto";
import { PostDeliveryPackageRequestDto } from "../dtos/DeliveryPackage/PostDeliveryPackageRequestDto";
import { LogisticsHttpService } from "../http-services";
import { SERVICE_KEYS } from "../service-keys-const";
import { IAuthService } from "../services/IAuthService";
import { IDeliveryPackageService } from "../services/IDeliveryPackageService";

@injectable()
export class DeliveryPackageService implements IDeliveryPackageService {
  authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);

  async post(data: PostDeliveryPackageRequestDto): Promise<AxiosResponse<GetDeliveryPackageResponseDto | null, any>> {
    return LogisticsHttpService.post<GetDeliveryPackageResponseDto>(`/packages`, data, { headers: { 'Authorization': this.authService.getToken() } });
  }
  async get(id: string): Promise<AxiosResponse<GetDeliveryPackageResponseDto | null>> {
    return LogisticsHttpService.get<GetDeliveryPackageResponseDto>(`/packages/${id}`, { headers: { 'Authorization': this.authService.getToken() } });
  }
  async getAll(): Promise<AxiosResponse<Array<GetDeliveryPackageResponseDto> | null>> {
      return LogisticsHttpService.get<Array<GetDeliveryPackageResponseDto>>(`/packages`, { headers: { 'Authorization': this.authService.getToken() } });
  }
}