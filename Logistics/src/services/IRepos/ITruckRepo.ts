import { Repo } from '../../core/infra/Repo';
import { Truck } from '../../domain/TruckAggregate/Truck';

/**
 * The Truck repository operations.
 */
export default interface ITruckRepo extends Repo<Truck> {
  /**
   * Saves a Truck.
   * @param truck The truck.
   */
  save(truck: Truck): Promise<Truck>;

  /**
   * Finds a truck based on its domain identifier.
   * @param truckId
   */
  findByDomainId(truckId: string): Promise<Truck>;

  /**
   * Finds all the currently available trucks.
   */
  findAll(): Promise<Truck[]>;

  findAllActive(): Promise<Truck[]>;
  /**
   * Finds a truck based on its license plate.
   * @param licensePlate The license plate.
   */
  findByLicensePlate(licensePlate: string): Promise<Truck>;

  /**
   * disables a truck based on its domain identifier.
   * @param truckId
   */
  softDeleteById(truckId: string): Promise<Truck>;
}
