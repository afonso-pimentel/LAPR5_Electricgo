import { GetPathResponseDto } from "../dtos/Path/GetPathResponseDto";
import { PostPathRequestDto } from "../dtos/Path/PostPathRequestDto";
import { Path } from "../models/Path";

function GetResponseToModel(response: GetPathResponseDto): Path {
  return {
    id: response.id,
    startWarehouse: response.startWarehouse,
    endWarehouse: response.endWarehouse,
    distance: response.distance,
    pathTime: response.pathTime,
    spentEnergy: response.spentEnergy,
    extraChargeTime: response.extraChargeTime,
} as Path;
}

function GetResponseArrayToModelArray(response: GetPathResponseDto[]): Path[] {
  return response.map((item: GetPathResponseDto) => {
    return GetResponseToModel(item) as Path;
  });
}

function FormToPostRequest(data: any): PostPathRequestDto {
  return {
    startWarehouse: data.startWarehouse,
    endWarehouse: data.endWarehouse,
    distance: parseInt(data.distance?.toString() ?? "0"),
    pathTime: parseInt(data.pathTime?.toString() ?? "0"),
    spentEnergy: parseInt(data.spentEnergy?.toString() ?? "0"),
    extraChargeTime: parseInt(data.extraChargeTime?.toString() ?? "0"),
  };
}

export { GetResponseToModel, GetResponseArrayToModelArray, FormToPostRequest };
