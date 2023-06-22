import { AxiosResponse } from "axios";
import { GetPathResponseDto } from "../dtos/Path/GetPathResponseDto";
import { PostPathRequestDto } from "../dtos/Path/PostPathRequestDto";

export interface IPathService {
    get(id: String): Promise<GetPathResponseDto | null>;
    getAll(): Promise<AxiosResponse<Array<GetPathResponseDto> | null>>;
    getByPage(page: number, limit: number): Promise<AxiosResponse<Array<GetPathResponseDto> | null>>;
    post(data: PostPathRequestDto): Promise<AxiosResponse<GetPathResponseDto | null>>;
}