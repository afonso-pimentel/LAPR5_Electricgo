import { Service, Inject } from 'typedi';
import ITripRepo from '../services/IRepos/ITripRepo';
import { TripMap } from '../mappers/TripMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { ITripPersistence } from '../dataschema/ITripPersistence';
import { Trip } from '../domain/TripAggregate/Trip';
import { TripId } from '../domain/TripAggregate/TripId';
import { TripStop } from '../domain/TripAggregate/TripStop';
/**
 * @implements { ITripRepo }
 */
@Service()
export default class TripRepo implements ITripRepo {
  private models: any;

  constructor(@Inject('tripSchema') private tripSchema: Model<ITripPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  /**
   * @inheritDoc
   */
  public async save(trip: Trip): Promise<Trip> {
    const query = { domainId: trip.id.toString() };

    const tripDocument = await this.tripSchema.findOne(query);

    try {
      if (tripDocument === null) {
        const rawTrip: any = TripMap.toPersistence(trip);

        const tripCreated = await this.tripSchema.create(rawTrip);

        return TripMap.toDomain(tripCreated);
      } else {
        const auxTripStops = [] as any;
        tripDocument.truckId = trip.truckId;
        tripDocument.date = trip.date;
        tripDocument.planningCost = trip.planningCost;
        tripDocument.heuristic = trip.heuristic;
        for (let i = 0; i < trip.tripStops.length; i++) {
          const tripStop = TripStop.create({
            warehouseId: trip.tripStops[i].warehouseId,
            deliveryId: trip.tripStops[i].deliveryId,
            isWarehouseToCharge: trip.tripStops[i].isWarehouseToCharge,
            chargeQuantity: trip.tripStops[i].chargeQuantity,
            chargeTime: trip.tripStops[i].chargeTime,
          });
          auxTripStops.push(tripStop.getValue());
        }

        await tripDocument.save();

        return trip;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * get all trips for a given truckId on a date equal or greater than today
   * @param truckId
   * @returns {Promise<Trip[] | null>}
   */
  public async findByTruckId(truckId: string): Promise<Trip[] | null> {
    const query = { truckId: truckId, date: { $gte: new Date().toISOString().slice(0, 10) } };
    const tripRecords = await this.tripSchema.find(query as FilterQuery<ITripPersistence & Document>);
    if (tripRecords != null) {
      return tripRecords.map(tripRecord => TripMap.toDomain(tripRecord));
    } else return null;
  }

  /**
   * @inheritDoc
   */
  public async exists(trip: Trip): Promise<boolean> {
    // const idX = trip.id instanceof TripId ? (<TripId>trip.id).toValue() : trip.id;

    // const query = { domainId: idX };
    // const tripDocument = await this.tripSchema.findOne(query as FilterQuery<ITripPersistence & Document>);

    // return !!tripDocument === true;
    return false; // TODO: implement
  }

    /**
   * @inheritDoc
   */
  public async findAllWithPagination(page: number, limit: number): Promise<[Trip[], number]> {
    const tripRecords = await this.tripSchema
      .find()
      .skip(page * limit)
      .limit(limit);

    const totalRecords = await this.tripSchema.countDocuments();

    if (tripRecords != null && totalRecords != null) {
      return [tripRecords.map(tripRecord => TripMap.toDomain(tripRecord)), totalRecords];
    } else return null;
  }
}
