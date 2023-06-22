import { GetDeliveryResponseDto } from "../dtos/Delivery/GetDeliveryResponseDto";
import { PostDeliveryRequestDto } from "../dtos/Delivery/PostDeliveryRequestDto";
import { Delivery } from "../models/Delivery";

function GetResponseToModel(response: GetDeliveryResponseDto): Delivery {
    return {
        id: response.id,
        warehouseId: response.warehouseId,
        deliveryDate: response.deliveryDate,
        load: response.load,
    } as Delivery;
}

function GetResponseArrayToModelArray(response: GetDeliveryResponseDto[]): Delivery[] {
    if(response == null || response == undefined || !response) return [];
    return response.map((item: GetDeliveryResponseDto) => {
        return GetResponseToModel(item) as Delivery;
    });
}

function FormToPostRequest(data: any) : PostDeliveryRequestDto{
    return {
        id: data.id,
        warehouseId: data.warehouseId,
        deliveryDate: new Date(data.deliveryDate),
        load: parseInt(data.load?.toString() ?? "0"),
    } as any as PostDeliveryRequestDto;
}

export {
    GetResponseToModel,
    GetResponseArrayToModelArray,
    FormToPostRequest
}
