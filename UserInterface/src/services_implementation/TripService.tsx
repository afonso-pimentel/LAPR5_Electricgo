import { AxiosError, AxiosResponse } from "axios";
import { injectable } from "inversify";
import { container } from "../container";
import TripPagerDto from "../dtos/Trip/TripPagerDto";
import { LogisticsHttpService } from "../http-services";
import { SERVICE_KEYS } from "../service-keys-const";
import { IAuthService } from "../services/IAuthService";
import { ITripService } from "../services/ITripService";

@injectable()
export class TripService implements ITripService {
  authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
  async  getAllByPage(page:number, limit:number): Promise<AxiosResponse<TripPagerDto | null>> {
      return await LogisticsHttpService.get<TripPagerDto>(`/trips/ByPage?page=${page}&limit=${limit}`, { headers: { 'Authorization': this.authService.getToken() } });
  }
}