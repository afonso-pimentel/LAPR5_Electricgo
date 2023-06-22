import { AxiosResponse } from "axios";
import { GetUserResponseDto } from "../dtos/User/GetUserResponseDto";
import { PostUserRequestDto } from "../dtos/User/PostUserRequestDto";

export interface IUserService {
  getAll(): Promise<AxiosResponse<Array<GetUserResponseDto> | null>>;
  post(
    data: PostUserRequestDto
  ): Promise<AxiosResponse<GetUserResponseDto | null>>;
  anonymize(id: string): Promise<AxiosResponse | null>;
}
