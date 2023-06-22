import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { TripId } from './TripId';
import { TripStop } from './TripStop';

/**
 * Defines the properties that a Trip contains.
 */
interface TripProps {
  /**
   * The truck's identifier.
   */
  truckId: string;

  /**
   * Date of the trip.
   */
  date: string;

  /**
   * list of stops.
   */
  tripStops: TripStop[];

  /**
   * Cost of this trip.
   */
  planningCost: number;

  /**
   * Heuristic used to generate this trip.
   */
  heuristic: string;
}

/**
 * Trip entity.
 */
export class Trip extends AggregateRoot<TripProps> {
  /**
   * The identifier.
   * @returns UniqueEntityID.
   */
  get id(): UniqueEntityID {
    return this._id;
  }

  /**
   * The identifier.
   * @returns TripId.
   */
  get tripId(): TripId {
    return TripId.caller(this.id);
  }

  /**
   * The truck's identifier.
   * @returns string.
   */
  get truckId(): string {
    return this.props.truckId;
  }

  /**
   * Date of the trip.
   */
  get date(): string {
    return this.props.date;
  }

  /**
   *
   */
  get tripStops(): TripStop[] {
    return this.props.tripStops;
  }

  /**
   *
   * Cost of this trip.
   * @returns number.
   */
  get planningCost(): number {
    return this.props.planningCost;
  }

  /**
   * Heuristic used to generate this trip.
   * @returns string.
   */
  get heuristic(): string {
    return this.props.heuristic;
  }

  private constructor(props: TripProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * Initializes a new instance of a Trip.
   * @param truckId The truck's identifier.
   * @param date Date of the trip.
   * @param tripStops list of stops.
   * @param planningCost Cost of this trip.
   * @param heuristic Heuristic used to generate this trip.
   * @param id The identifier.
   * @returns Trip.
   */
  public static create(props: TripProps, id?: UniqueEntityID): Result<Trip> {
    const guardedProps = [
      { argument: props.truckId, argumentName: 'truckId' },
      { argument: props.date, argumentName: 'date' },
      { argument: props.tripStops, argumentName: 'tripStops' },
      { argument: props.planningCost, argumentName: 'planningCost' },
      { argument: props.heuristic, argumentName: 'heuristic' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Trip>(guardResult.message);
    } else {
      const trip = new Trip(
        {
          truckId: props.truckId,
          date: props.date,
          tripStops: props.tripStops,
          planningCost: props.planningCost,
          heuristic: props.heuristic,
        },
        id,
      );

      return Result.ok<Trip>(trip);
    }
  }
}
