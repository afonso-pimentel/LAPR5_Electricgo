import { Mapper } from '../core/infra/Mapper';
import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import ITruckDTO from '../dto/ITruckDTO';
import { Truck } from '../domain/TruckAggregate/Truck';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { TruckLicensePlate } from '../domain/TruckAggregate/TruckLicensePlate';
import { TruckBattery } from '../domain/TruckAggregate/TruckBattery';
import { Result } from '../core/logic/Result';

/**
 * Mapping class operations for a Truck.
 */
export class TruckMap extends Mapper<Truck> {
  /**
   * Maps a list of truck entities into a list of dto's.
   * @param trucks The list of truck entities.
   * @returns The list of truck dto's.
   */
  public static toDTOList(trucks: Truck[]): ITruckDTO[] {
    return trucks.map(truck => this.toDTO(truck));
  }

  /**
   * Maps a Truck entity into a dto
   * @param truck The truck entity.
   * @returns The truck dto.
   */
  public static toDTO(truck: Truck): ITruckDTO {
    return ({
      id: truck.id.toString(),
      tare: truck.tare,
      loadCapacity: truck.loadCapacity,
      fullLoadAutonomy: truck.fullLoadAutonomy,
      capacity: truck.battery.capacity,
      fastChargeTime: truck.battery.fastChargeTime,
      slowChargeTime: truck.battery.slowChargeTime,
      licensePlate: truck.licensePlate.value,
      isActive: truck.isActive,
    } as unknown) as ITruckDTO;
  }

  /**
   * maps dto to domain entity
   * @param dto
   * @returns
   */
  public static dtoToDomain(dto: ITruckDTO): Truck {
    return ({
      tare: dto.tare,
      loadCapacity: dto.loadCapacity,
      fullLoadAutonomy: dto.fullLoadAutonomy,
      battery: {
        capacity: dto.capacity,
        fastChargeTime: dto.fastChargeTime,
        slowChargeTime: dto.slowChargeTime,
      },
      licensePlate: dto.licensePlate,
    } as unknown) as Truck;
  }

  /**
   * Maps a DTO to a Domain entity and result.
   * @param truck The truck dto.
   * @returns The domain entity result.
   */
  public static toDomain(truck: any | Model<ITruckPersistence & Document>): Result<Truck> {
    const truckLicensePlate = TruckLicensePlate.create({ value: truck.licensePlate });

    if (truckLicensePlate.isFailure) {
      return Result.fail<Truck>(truckLicensePlate.errorValue());
    }
    const truckBattery = TruckBattery.create({
      capacity: truck.capacity,
      fastChargeTime: truck.fastChargeTime,
      slowChargeTime: truck.slowChargeTime,
    });

    if (truckBattery.isFailure) {
      return Result.fail<Truck>(truckBattery.errorValue());
    }

    const truckOrError = Truck.create({
      tare: truck.tare,
      loadCapacity: truck.loadCapacity,
      fullLoadAutonomy: truck.fullLoadAutonomy,
      battery: truckBattery.getValue(),
      licensePlate: truckLicensePlate.getValue(),
      isActive: truck.isActive,
    });

    truckOrError.isFailure ? console.log(truckOrError.error) : '';

    return truckOrError;
  }

  /**
   * Maps a persistence truck model to a domain entity.
   * @param truck The persistence truck model.
   * @returns The truck entity.
   */
  public static persistenceToDomain(truck: any | Model<ITruckPersistence & Document>): Truck {
    return ({
      id: truck.domainId.toString(),
      tare: truck.tare,
      loadCapacity: truck.loadCapacity,
      fullLoadAutonomy: truck.fullLoadAutonomy,
      battery: {
        capacity: truck.capacity,
        fastChargeTime: truck.fastChargeTime,
        slowChargeTime: truck.slowChargeTime,
      },
      licensePlate: { value: truck.licensePlate },
      isActive: truck.isActive,
    } as unknown) as Truck;
  }

  /**
   * Maps a truck entity into it's persistence model.
   * @param truck The truck entity.
   * @returns The truck persistence model.
   */
  public static toPersistence(truck: Truck): any {
    return {
      domainId: truck.id.toString(),
      tare: truck.tare,
      loadCapacity: truck.loadCapacity,
      fullLoadAutonomy: truck.fullLoadAutonomy,
      capacity: truck.battery.capacity,
      fastChargeTime: truck.battery.fastChargeTime,
      slowChargeTime: truck.battery.slowChargeTime,
      licensePlate: truck.licensePlate.value,
      isActive: truck.isActive,
    };
  }
}
