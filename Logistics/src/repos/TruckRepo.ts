import { Service, Inject } from 'typedi';
import ITruckRepo from '../services/IRepos/ITruckRepo';
import { TruckMap } from '../mappers/TruckMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { Truck } from '../domain/TruckAggregate/Truck';
import { TruckId } from '../domain/TruckAggregate/TruckId';
import { TruckLicensePlate } from '../domain/TruckAggregate/TruckLicensePlate';

/**
 * @implements { ITruckRepo }
 */
@Service()
export default class TruckRepo implements ITruckRepo {
  private models: any;

  constructor(@Inject('truckSchema') private truckSchema: Model<ITruckPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  /**
   * @inheritDoc
   */
  public async save(truck: Truck): Promise<Truck> {
    const query = { domainId: truck.id.toString() };

    const truckDocument = await this.truckSchema.findOne(query);

    try {
      if (truckDocument === null) {
        const rawTruck: any = TruckMap.toPersistence(truck);

        const truckCreated = await this.truckSchema.create(rawTruck);

        return TruckMap.persistenceToDomain(truckCreated);
      } else {
        truckDocument.tare = truck.tare;
        truckDocument.loadCapacity = truck.loadCapacity;
        truckDocument.fullLoadAutonomy = truck.fullLoadAutonomy;
        truckDocument.capacity = truck.battery.capacity;
        truckDocument.fastChargeTime = truck.battery.fastChargeTime;
        truckDocument.slowChargeTime = truck.battery.slowChargeTime;
        truckDocument.licensePlate = truck.licensePlate.value;
        truckDocument.isActive = truck.isActive;

        await truckDocument.save();

        return truck;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * @inheritDoc
   */
  public async findByDomainId(truckId: TruckId | string): Promise<Truck> {
    const query = { domainId: truckId };
    const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    if (truckRecord != null) {
      return TruckMap.persistenceToDomain(truckRecord);
    } else return null;
  }

  /**
   * @inheritDoc
   */
  public async findByLicensePlate(licensePlate: TruckLicensePlate | string): Promise<Truck> {
    const query = { licensePlate: licensePlate };
    const truckRecord = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    if (truckRecord != null) {
      return TruckMap.persistenceToDomain(truckRecord);
    } else return null;
  }

  /**
   * @inheritDoc
   */
  public async findAll(): Promise<Truck[]> {
    const truckRecords = await this.truckSchema.find();

    if (truckRecords != null) {
      const trucks: Truck[] = [];
      truckRecords.forEach(truckRecord => {
        trucks.push(TruckMap.persistenceToDomain(truckRecord));
      });

      return trucks;
    } else return null;
  }

  public async findAllActive(): Promise<Truck[]> {
    const query = { isActive: true };
    const truckRecords = await this.truckSchema.find(query as FilterQuery<ITruckPersistence & Document>);

    if (truckRecords != null) {
      const trucks: Truck[] = [];
      truckRecords.forEach(truckRecord => {
        trucks.push(TruckMap.persistenceToDomain(truckRecord));
      });

      return trucks;
    } else return null;
  }

  /**
   * @inheritDoc
   */
  public async exists(truck: Truck): Promise<boolean> {
    // const idX = truck.id instanceof TruckId ? (<TruckId>truck.id).toValue() : truck.id;

    // const query = { domainId: idX };
    // const truckDocument = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);

    // return !!truckDocument === true;
    return false; // TODO: implement
  }

  public async softDeleteById(truckId: string): Promise<Truck> {
    const query = { domainId: truckId };
    const truckDocument = await this.truckSchema.findOne(query as FilterQuery<ITruckPersistence & Document>);
    truckDocument.isActive = false;
    await truckDocument.save();

    return TruckMap.persistenceToDomain(truckDocument);
  }
}
