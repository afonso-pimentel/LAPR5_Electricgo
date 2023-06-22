import { AxiosResponse } from "axios";
import { GetByDayResultDto } from "../dtos/Planning/GetByDayResultDto";
import { GetPlanningRequestDto } from "../dtos/Planning/GetPlanningRequestDto";
import { GetPlanningResponseDto } from "../dtos/Planning/GetPlanningResponseDto";

export interface IPlanningService {
  get(
    request: GetPlanningRequestDto
  ): Promise<AxiosResponse<GetPlanningResponseDto | null>>;
  getByDay(
    date: string
  ): Promise<AxiosResponse<GetByDayResultDto | null>>;
}
