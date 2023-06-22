import { GetTruckResponseDto } from "../dtos/Truck/GetTruckResponseDto";
import { PostTruckRequestDto } from "../dtos/Truck/PostTruckRequestDto";
import { Truck } from "../models/Truck";

function GetResponseToModel(response: GetTruckResponseDto): Truck {
  return {
    id: response.id,
    tare: response.tare,
    loadCapacity: response.loadCapacity,
    fullLoadAutonomy: response.fullLoadAutonomy,
    capacity: response.capacity,
    fastChargeTime: response.fastChargeTime,
    slowChargeTime: response.slowChargeTime,
    licensePlate: response.licensePlate,
    isActive: response.isActive,
  } as Truck;
}

function GetResponseArrayToModelArray(
  response: GetTruckResponseDto[]
): Truck[] {
  return response.map((item: GetTruckResponseDto) => {
    return GetResponseToModel(item) as Truck;
  });
}

function FormToPostRequest(data: any): PostTruckRequestDto {
  return {
    tare: parseInt(data.tare?.toString() ?? "0"),
    loadCapacity: parseInt(data.loadCapacity?.toString() ?? "0"),
    fullLoadAutonomy: parseInt(data.fullLoadAutonomy?.toString() ?? "0"),
    capacity: parseInt(data.capacity?.toString() ?? "0"),
    fastChargeTime: parseInt(data.fastChargeTime?.toString() ?? "0"),
    slowChargeTime: parseInt(data.slowChargeTime?.toString() ?? "0"),
    licensePlate: data.licensePlate,
  };
}

export { GetResponseToModel, GetResponseArrayToModelArray, FormToPostRequest };
