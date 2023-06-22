import { Result } from '../../core/logic/Result';
import IEditTruckDTO from '../../dto/IEditTruckDTO';
import ITruckDTO from '../../dto/ITruckDTO';

/**
 * The service operations for the Truck.
 */
export default interface ITruckService {
  /**
   * Gets a truck based on its identifier.
   * @param truckId The truck identifier.
   * @returns The truck.
   */
  createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;

  /**
   * Gets all the currently stored trucks.
   * @returns The list of trucks.
   */
  getAllTrucks(): Promise<Result<ITruckDTO[]>>;

  getAllActiveTrucks(): Promise<Result<ITruckDTO[]>>;

  /**
   * Creates a truck.
   * @param truckDTO The truck.
   * @returns The result object with the inserted truck if the operation was successful.
   */
  getTruckById(truckId: string): Promise<Result<ITruckDTO>>;

  /**
   * Edits the information of a truck.
   * @param truckDTO The truck DTO.
   * @param truckId The truck ID.
   */
  editTruck(truckDTO: IEditTruckDTO, truckId: string): Promise<Result<ITruckDTO>>;

  /**
   * disables a truck based on its domain identifier.
   * @param truckId
   */
  softDeleteTruckById(truckId: string): Promise<Result<ITruckDTO>>;
}
