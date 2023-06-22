import { Service, Inject } from 'typedi';
import config from '../../config';
import ITripDTO from '../dto/ITripDTO';
import { Trip } from '../domain/TripAggregate/Trip';
import ITripRepo from './IRepos/ITripRepo';
import IWarehouseRepo from './IRepos/IWarehouseRepo';
import ITripService from './IServices/ITripService';
import { Result } from '../core/logic/Result';
import { TripMap } from '../mappers/TripMap';
import { TripStop } from '../domain/TripAggregate/TripStop';
import IPlanningToTripDTO from '../dto/IPlanningToTripDTO';

@Service()
export default class TripService implements ITripService {
  constructor(
    @Inject(config.repos.trip.name) private tripRepo: ITripRepo,
    @Inject(config.repos.warehouse.name) private warehouseRepo: IWarehouseRepo,
  ) {}
  /**
   * @inheritDoc
   */
  public async createTrip(planningToTripDTO: IPlanningToTripDTO): Promise<Result<ITripDTO>> {
    try {
      // creates empty array of trip stops
      const tripStops = [] as TripStop[];
      for (let i = 0; i < planningToTripDTO.listOrderDeliveries.length; i++) {
        const warehouseId = planningToTripDTO.listOrderWarehouses[i];
        const deliveryId = planningToTripDTO.listOrderDeliveries[i];
        const warehouseToChargeIndex = planningToTripDTO.listWarehousesToCharge.indexOf(warehouseId);
        const isWarehouseToCharge = warehouseToChargeIndex !== -1;
        let chargeQuantity = 0;
        let chargeTime = 0;
        if (isWarehouseToCharge) {
          chargeQuantity = +planningToTripDTO.listWarehousesQuantityToCharge[warehouseToChargeIndex];
          chargeTime = +planningToTripDTO.listWarehousesTimeToCharge[warehouseToChargeIndex];
        }
        const tripStopsOrError = TripStop.create({
          warehouseId,
          deliveryId,
          isWarehouseToCharge,
          chargeQuantity,
          chargeTime,
        });
        if (tripStopsOrError.isFailure) {
          return Result.fail<ITripDTO>(tripStopsOrError.errorValue());
        } else {
          tripStops.push(tripStopsOrError.getValue());
        }
      }

      // checks if the trip stops array has the same length as the tripDTO's warehouseIds array
      //  if it does, it creates a trip object
      if (tripStops.length === planningToTripDTO.listOrderDeliveries.length) {
        const tripOrError = Trip.create({
          truckId: planningToTripDTO.truckId,
          date: planningToTripDTO.date,
          tripStops: tripStops,
          planningCost: planningToTripDTO.planningCost,
          heuristic: planningToTripDTO.heuristic,
        });

        if (tripOrError.isFailure) {
          return Result.fail<ITripDTO>(tripOrError.errorValue());
        }

        // gets the created trip object
        const tripResult = tripOrError.getValue();

        // saves the trip object to the database
        await this.tripRepo.save(tripResult);

        const tripDTOResult = TripMap.toDTO(tripResult) as ITripDTO;
        return Result.ok<ITripDTO>(tripDTOResult);
      } else {
        return Result.fail<ITripDTO>('Error creating trip stops');
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * @inheritDoc
   */
  public async getTripsWithPagination(page: number, limit: number): Promise<Result<[ITripDTO[], number]>> {
    try {
      const [trips, totalTrips] = await this.tripRepo.findAllWithPagination(+page, +limit);

      if (trips === null) {
        return Result.fail<[ITripDTO[], number]>('Trips not found');
      } else {
        return Result.ok<[ITripDTO[], number]>([trips.map(tripRecord => TripMap.toDTO(tripRecord)), totalTrips]);
      }
    } catch (e) {
      throw e;
    }
  }
}
