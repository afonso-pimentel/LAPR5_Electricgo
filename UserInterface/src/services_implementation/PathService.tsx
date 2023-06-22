import { injectable } from "inversify";
import { IPathService } from "../services/IPathService";
import { AxiosResponse } from "axios";
import { GetPathResponseDto } from "../dtos/Path/GetPathResponseDto";
import { PostPathRequestDto } from "../dtos/Path/PostPathRequestDto";
import { LogisticsHttpService } from "../http-services";
import { container } from "../container";
import { IAuthService } from "../services/IAuthService";
import { SERVICE_KEYS } from "../service-keys-const";

@injectable()
export class PathService implements IPathService {
  authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);

  async post(
    data: PostPathRequestDto
  ): Promise<AxiosResponse<GetPathResponseDto | null, any>> {
    return LogisticsHttpService.post<GetPathResponseDto>(`/paths`, data, { headers: { 'Authorization': this.authService.getToken() } });
  }
  async getAll(): Promise<AxiosResponse<Array<GetPathResponseDto> | null>> {
    return LogisticsHttpService.get<Array<GetPathResponseDto>>('/paths', { headers: { 'Authorization': this.authService.getToken() } });
  }
  async getByPage(page: number, limit: number): Promise<AxiosResponse<Array<GetPathResponseDto> | null>> {
    return LogisticsHttpService.get<Array<GetPathResponseDto>>(`/paths/ByPage?page=${page}&limit=${limit}`, { headers: { 'Authorization': this.authService.getToken() } });
  }
  async get(id: string): Promise<GetPathResponseDto | null> {
    throw new Error("Method not implemented.");
  }
}
