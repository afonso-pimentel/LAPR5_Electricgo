import { GetUserResponseDto } from "../dtos/User/GetUserResponseDto";
import { PostUserRequestDto } from "../dtos/User/PostUserRequestDto";
import { User } from "../models/User";

function GetResponseToModel(response: GetUserResponseDto): User {
  return {
    id: response.id,
    name: response.name,
    phoneNumber: response.phoneNumber,
    role: response.role,
  } as User;
}

function GetResponseArrayToModelArray(
  response: GetUserResponseDto[]
): User[] {
  return response.map((item: GetUserResponseDto) => {
    return GetResponseToModel(item) as User;
  });
}

function FormToPostRequest(data: any): PostUserRequestDto {
  return {
    name: data.name,
    email: data.email,
    phoneNumber: data.phoneNumber,
    role: parseInt(data.role?.toString()),
  };
}

export { GetResponseToModel, GetResponseArrayToModelArray, FormToPostRequest };
