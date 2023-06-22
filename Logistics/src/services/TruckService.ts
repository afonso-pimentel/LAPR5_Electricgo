import { Service, Inject } from 'typedi';
import config from '../../config';
import ITruckDTO from '../dto/ITruckDTO';
import ITruckRepo from './IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from '../core/logic/Result';
import { TruckMap } from '../mappers/TruckMap';
import IPostTruckDTO from '../dto/IPostTruckDTO';
import IEditTruckDTO from '../dto/IEditTruckDTO';
import { TruckBattery } from '../domain/TruckAggregate/TruckBattery';
import { update } from 'lodash';
import { Truck } from '../domain/TruckAggregate/Truck';
import { Guard } from '../core/logic/Guard';
import ITripRepo from './IRepos/ITripRepo';

/**
 * @implements { ITruckService }
 */
@Service()
export default class TruckService implements ITruckService {
  constructor(
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo,
    @Inject(config.repos.trip.name) private tripRepo: ITripRepo,
  ) {}

  /**
   * @inheritDoc
   */
  public async getTruckById(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>('Truck not found');
      } else {
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * @inheritDoc
   */
  public async getAllTrucks(): Promise<Result<ITruckDTO[]>> {
    try {
      const truck = await this.truckRepo.findAll();

      if (truck === null) {
        return Result.fail<ITruckDTO[]>('Truck not found');
      } else {
        const trucksDTOResult = TruckMap.toDTOList(truck) as ITruckDTO[];
        return Result.ok<ITruckDTO[]>(trucksDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllActiveTrucks(): Promise<Result<ITruckDTO[]>> {
    try {
      const truck = await this.truckRepo.findAllActive();

      if (truck === null) {
        return Result.fail<ITruckDTO[]>('Truck not found');
      } else {
        const trucksDTOResult = TruckMap.toDTOList(truck) as ITruckDTO[];
        return Result.ok<ITruckDTO[]>(trucksDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * @inheritDoc
   */
  public async createTruck(truckDTO: IPostTruckDTO): Promise<Result<ITruckDTO>> {
    try {
      const truckWithSameLicensePlateExists =
        (await this.truckRepo.findByLicensePlate(truckDTO.licensePlate.toLocaleUpperCase())) != null;

      if (truckWithSameLicensePlateExists) {
        return Result.fail<ITruckDTO>('A truck with the same license plate already exists.');
      }

      // creates a new truck object
      const truckOrError = TruckMap.toDomain(truckDTO);

      if (truckOrError.isFailure) {
        return Result.fail<ITruckDTO>(truckOrError.errorValue());
      }

      // gets the created truck object
      const truckResult = truckOrError.getValue();

      // saves the truck object to the database
      await this.truckRepo.save(truckResult);

      const truckDTOResult = TruckMap.toDTO(truckResult) as ITruckDTO;
      return Result.ok<ITruckDTO>(truckDTOResult);
    } catch (e) {
      throw e;
    }
  }

  /**
   * @inheritDoc
   */
  public async editTruck(truckDTO: IEditTruckDTO, truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const guardedNumbers = [
        { argument: truckDTO.tare, argumentName: 'tare' },
        { argument: truckDTO.loadCapacity, argumentName: 'loadCapacity' },
        { argument: truckDTO.fullLoadAutonomy, argumentName: 'fullLoadAutonomy' },
        { argument: truckDTO.capacity, argumentName: 'capacity' },
        { argument: truckDTO.fastChargeTime, argumentName: 'fastChargeTime' },
        { argument: truckDTO.slowChargeTime, argumentName: 'slowChargeTime' },
      ];

      const guardPositiveNumber = Guard.againstPositiveNumberBulk(guardedNumbers);

      if (!guardPositiveNumber.succeeded) {
        return Result.fail<ITruckDTO>(guardPositiveNumber.message);
      }

      let truck = await this.truckRepo.findByDomainId(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>('truck not found');
      } else {
        const truckBattery = TruckBattery.create({
          capacity: truckDTO.capacity,
          fastChargeTime: truckDTO.fastChargeTime,
          slowChargeTime: truckDTO.slowChargeTime,
        });

        if (truckBattery.isFailure) {
          return Result.fail<ITruckDTO>(truckBattery.errorValue());
        }

        truck.battery = truckBattery.getValue();
        truck.tare = truckDTO.tare;
        truck.loadCapacity = truckDTO.loadCapacity;
        truck.fullLoadAutonomy = truckDTO.fullLoadAutonomy;

        await this.truckRepo.save(truck);
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async softDeleteTruckById(truckId: string): Promise<Result<ITruckDTO>> {
    try {
      const truck = await this.truckRepo.findByDomainId(truckId);

      if (truck === null) {
        return Result.fail<ITruckDTO>('Truck not found');
      } else {
        if (!truck.isActive) {
          return Result.fail<ITruckDTO>('Truck is already inactive');
        }
        const truckTrips = await this.tripRepo.findByTruckId(truckId);
        if (truckTrips.length != 0) {
          return Result.fail<ITruckDTO>('This truck has present or future trips associated with it.');
        }
        truck.isActive = false;
        await this.truckRepo.save(truck);
        const truckDTOResult = TruckMap.toDTO(truck) as ITruckDTO;
        return Result.ok<ITruckDTO>(truckDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
}
