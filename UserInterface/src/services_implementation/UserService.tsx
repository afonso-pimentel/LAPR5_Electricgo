import { injectable } from "inversify";
import { IUserService } from "../services/IUserService";
import { AxiosError, AxiosResponse } from "axios";
import { GetUserResponseDto } from "../dtos/User/GetUserResponseDto";
import { PostUserRequestDto } from "../dtos/User/PostUserRequestDto";
import { WarehouseHttpService } from "../http-services";
import { container } from "../container";
import { IAuthService } from "../services/IAuthService";
import { SERVICE_KEYS } from "../service-keys-const";

@injectable()
export class UserService implements IUserService {
  authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);

  async post(
    data: PostUserRequestDto
  ): Promise<AxiosResponse<GetUserResponseDto | null, any>> {
    return WarehouseHttpService.post<GetUserResponseDto>(
      "/User/",
      data, { headers: { 'Authorization': this.authService.getToken() } }
    );
  }
  async getAll(): Promise<
    AxiosResponse<Array<GetUserResponseDto> | null>
  > {
    return WarehouseHttpService.get<Array<GetUserResponseDto>>(
      "/User", { headers: { 'Authorization': this.authService.getToken() } }
    );
  }

  async anonymize(id: string): Promise<AxiosResponse | null> {
    return WarehouseHttpService.delete(`/User/${id}`, { headers: { 'Authorization': this.authService.getToken() } });
  }
}
