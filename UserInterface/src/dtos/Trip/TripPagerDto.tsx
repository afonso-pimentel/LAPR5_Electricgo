import TripDto from "./TripDto";

export default interface TripPagerDto {
    totalPageCount: number;
    trips: TripDto[];
}
