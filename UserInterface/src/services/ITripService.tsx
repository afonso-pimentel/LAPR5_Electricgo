import { AxiosResponse } from "axios";
import TripPagerDto from "../dtos/Trip/TripPagerDto";

export interface ITripService {
    getAllByPage(page:number, limit:number): Promise<AxiosResponse<TripPagerDto | null>>;
}