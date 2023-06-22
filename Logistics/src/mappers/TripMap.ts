import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { ITripPersistence } from '../dataschema/ITripPersistence';

import ITripDTO from '../dto/ITripDTO';
import { Trip } from '../domain/TripAggregate/Trip';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { TripStop } from '../domain/TripAggregate/TripStop';
import { Result } from '../core/logic/Result';

export class TripMap extends Mapper<Trip> {
  public static toDTO(trip: Trip): ITripDTO {
    return ({
      id: trip.id.toString(),
      truckId: trip.truckId,
      date: trip.date,
      warehouseIds: trip.tripStops.map(tripStop => tripStop.warehouseId),
      deliveryIds: trip.tripStops.map(tripStop => tripStop.deliveryId),
      areWarehousesToCharge: trip.tripStops.map(tripStop => tripStop.isWarehouseToCharge),
      chargeQuantities: trip.tripStops.map(tripStop => tripStop.chargeQuantity),
      chargeTimes: trip.tripStops.map(tripStop => tripStop.chargeTime),
      planningCost: trip.planningCost,
      heuristic: trip.heuristic,
    } as unknown) as ITripDTO;
  }

  public static toDomain(trip: any | Model<ITripPersistence & Document>): Trip {
    const tripStops = [] as any;
    trip.id = trip.id.toString();
    trip.truckId = trip.truckId.toString();
    trip.date = trip.date;
    trip.planningCost = trip.planningCost;

    for (let i = 0; i < trip.warehouseIds.length; i++) {
      trip.warehouseIds[i] = trip.warehouseIds[i].toString();
      trip.deliveryIds[i] = trip.deliveryIds[i].toString();
      trip.areWarehousesToCharge[i] = trip.areWarehousesToCharge[i];
      trip.chargeQuantities[i] = trip.chargeQuantities[i];
      trip.chargeTimes[i] = trip.chargeTimes[i];
      const tripStop = TripStop.create({
        warehouseId: trip.warehouseIds[i],
        deliveryId: trip.deliveryIds[i],
        isWarehouseToCharge: trip.areWarehousesToCharge[i],
        chargeQuantity: trip.chargeQuantities[i],
        chargeTime: trip.chargeTimes[i],
      });
      if (tripStop.isFailure) {
        return null;
      }
      tripStops.push(tripStop.getValue());
    }

    const tripOrError = Trip.create(
      {
        truckId: trip.truckId,
        date: trip.date,
        tripStops: tripStops,
        planningCost: trip.planningCost,
        heuristic: trip.heuristic,
      },
      new UniqueEntityID(trip.id),
    );
    tripOrError.isFailure ? console.log(tripOrError.error) : '';

    return tripOrError.isSuccess ? tripOrError.getValue() : null;
  }

  public static toPersistence(trip: Trip): any {
    return {
      domainId: trip.id.toString(),
      date: trip.date,
      truckId: trip.truckId,
      warehouseIds: trip.tripStops.map(tripStop => tripStop.warehouseId),
      deliveryIds: trip.tripStops.map(tripStop => tripStop.deliveryId),
      areWarehousesToCharge: trip.tripStops.map(tripStop => tripStop.isWarehouseToCharge),
      chargeQuantities: trip.tripStops.map(tripStop => tripStop.chargeQuantity),
      chargeTimes: trip.tripStops.map(tripStop => tripStop.chargeTime),
      planningCost: trip.planningCost,
      heuristic: trip.heuristic,
    };
  }
}
