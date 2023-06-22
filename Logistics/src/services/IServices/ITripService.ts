import { Result } from '../../core/logic/Result';
import IPlanningToTripDTO from '../../dto/IPlanningToTripDTO';
import ITripDTO from '../../dto/ITripDTO';

export default interface ITripService {
   /**
   * Creates a new trip.
   * @param IPlanningToTripDTO 
   */
  createTrip(planningDTO: IPlanningToTripDTO): Promise<Result<ITripDTO>>;
    /**
   * Gets all trips with pagination.
   * @param page The page number of the result.
   * @param limit The page limit of the result.
   */
    getTripsWithPagination(page: number, limit: number): Promise<Result<[ITripDTO[], number]>>;

  //   createTrips(tripDTO: ITripDTO[]): Promise<Result<ITripDTO[]>>;
  //   editTrip(tripId: string, tripDTO: IEditTripDTO): Promise<Result<IEditTripDTO>>;
  //   getTrips(): Promise<Result<ITripDTO[]>>;
  //   getTrip(tripId: string): Promise<Result<ITripDTO>>;
}
