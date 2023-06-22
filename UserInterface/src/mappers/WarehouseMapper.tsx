import { GetWarehouseResponseDto } from "../dtos/Warehouse/GetWarehouseResponseDto";
import { PostWarehouseRequestDto } from "../dtos/Warehouse/PostWarehouseRequestDto";
import { Warehouse } from "../models/Warehouse";

function GetResponseToModel(response: GetWarehouseResponseDto): Warehouse {
  return {
    id: response.id,
    code: response.code,
    description: response.description,
    streetName: response.streetName,
    doorNumber: response.doorNumber,
    locality: response.locality,
    latitude: response.latitude,
    longitude: response.longitude,
    altitude: response.altitude,
    isActive: response.isActive
  } as Warehouse;
}

function GetResponseArrayToModelArray(
  response: GetWarehouseResponseDto[]
): Warehouse[] {
  return response.map((item: GetWarehouseResponseDto) => {
    return GetResponseToModel(item) as Warehouse;
  });
}

function FormToPostRequest(data: any): PostWarehouseRequestDto {
  return {
    warehouseCode: data.code,
    designation: data.description,
    streetName: data.streetName,
    number: data.doorNumber,
    zipCode: data.zipCode,
    locality: data.locality,
    latitude: parseFloat(data.latitude?.toString() ?? "0.0000"),
    longitude: parseFloat(data.longitude?.toString() ?? "0.0000"),
    altitude: parseInt(data.altitude?.toString() ?? "0"),
  };
}

export { GetResponseToModel, GetResponseArrayToModelArray, FormToPostRequest };
