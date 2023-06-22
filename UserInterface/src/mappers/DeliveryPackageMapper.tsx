import { GetDeliveryPackageResponseDto } from "../dtos/DeliveryPackage/GetDeliveryPackageResponseDto";
import { PostDeliveryPackageRequestDto } from "../dtos/DeliveryPackage/PostDeliveryPackageRequestDto";
import { DeliveryPackage } from "../models/DeliveryPackage";

function GetResponseToModel(response: GetDeliveryPackageResponseDto): DeliveryPackage {
    return {
        id: response.id,
        deliveryId: response.deliveryId,
        loadTime: response.loadTime,
        unloadTime: response.unloadTime,
        x: response.x,
        y: response.y,
        z: response.z,
    } as DeliveryPackage;
}

function GetResponseArrayToModelArray(response: GetDeliveryPackageResponseDto[]): DeliveryPackage[] {
    if(response == null || response == undefined || !response) return [];
    return response.map((item: GetDeliveryPackageResponseDto) => {
        return GetResponseToModel(item) as DeliveryPackage;
    });
}

function FormToPostRequest(data: any): PostDeliveryPackageRequestDto {
    return {
        deliveryId: data.deliveryId,
        loadTime: parseInt(data.loadTime?.toString() ?? "0"),
        unloadTime: parseInt(data.unloadTime?.toString() ?? "0"),
        x: parseInt(data.x?.toString() ?? "0"),
        y: parseInt(data.y?.toString() ?? "0"),
        z: parseInt(data.z?.toString() ?? "0"),
    };
}

export {
    GetResponseToModel,
    GetResponseArrayToModelArray,
    FormToPostRequest
}
