import { Repo } from '../../core/infra/Repo';
import { Trip } from '../../domain/TripAggregate/Trip';

export default interface ITripRepo extends Repo<Trip> {
  /**
   * Saves a trip into persistence.
   * @param trip The trip.
   */
  save(trip: Trip): Promise<Trip>;
  findByTruckId(truckId: string): Promise<Trip[] | null>;

  /**
   * Finds all trip records with pagination.
   * @param page The number of the page
   * @param limit The limit of the page.
   */
  findAllWithPagination(page: number, limit: number): Promise<[Trip[], number]>;
}
