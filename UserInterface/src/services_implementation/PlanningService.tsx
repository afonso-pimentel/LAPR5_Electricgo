import { AxiosError, AxiosResponse } from "axios";
import { injectable } from "inversify";
import { container } from "../container";
import { GetByDayResultDto } from "../dtos/Planning/GetByDayResultDto";
import { GetPlanningRequestDto } from "../dtos/Planning/GetPlanningRequestDto";
import { GetPlanningResponseDto } from "../dtos/Planning/GetPlanningResponseDto";
import { LogisticsHttpService } from "../http-services";
import { SERVICE_KEYS } from "../service-keys-const";
import { IAuthService } from "../services/IAuthService";
import { IPlanningService } from "../services/IPlanningService";

@injectable()
export class PlanningService implements IPlanningService {
  authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);

  async getByDay(date: string): Promise<AxiosResponse<GetByDayResultDto | null, any>> {
    return LogisticsHttpService.get<GetByDayResultDto>(
      "/planning/ByDay/" +
      date
      , { headers: { 'Authorization': this.authService.getToken() } }
    );
  }
  async get(
    request: GetPlanningRequestDto
  ): Promise<AxiosResponse<GetPlanningResponseDto | null>> {
    return LogisticsHttpService.get<GetPlanningResponseDto>(
      "/planning/" +
        request.truckId +
        "/" +
        request.date +
        "/" +
        request.heuristic
        , { headers: { 'Authorization': this.authService.getToken() } });
  }
}
