import { AxiosResponse } from "axios";
import { GetDeliveryPackageResponseDto } from "../dtos/DeliveryPackage/GetDeliveryPackageResponseDto";
import { PostDeliveryPackageRequestDto } from "../dtos/DeliveryPackage/PostDeliveryPackageRequestDto";

export interface IDeliveryPackageService {
    get(id: String): Promise<AxiosResponse<GetDeliveryPackageResponseDto | null>>;
    getAll(): Promise<AxiosResponse<Array<GetDeliveryPackageResponseDto> | null>>;
    post(data: PostDeliveryPackageRequestDto): Promise<AxiosResponse<GetDeliveryPackageResponseDto | null>>;
}