import { AxiosResponse } from "axios";
import { GetDeliveryResponseDto } from "../dtos/Delivery/GetDeliveryResponseDto";
import { PostDeliveryRequestDto } from "../dtos/Delivery/PostDeliveryRequestDto";

export interface IDeliveryService {
    get(id: String): Promise<AxiosResponse<GetDeliveryResponseDto> | null>;
    getAll(): Promise<AxiosResponse<Array<GetDeliveryResponseDto> | null>>;
    post(data: PostDeliveryRequestDto): Promise<AxiosResponse<GetDeliveryResponseDto | null>>;
}