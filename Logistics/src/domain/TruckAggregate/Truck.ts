import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { TruckId } from './TruckId';
import { TruckBattery } from './TruckBattery';
import { TruckLicensePlate } from './TruckLicensePlate';

/**
 * Defines the properties that a Truck contains.
 */
interface TruckProps {
  /**
   * The tare.
   */
  tare: number;

  /**
   * The load capacity.
   */
  loadCapacity: number;

  /**
   * The full load autonomy.
   */
  fullLoadAutonomy: number;

  /**
   * The battery.
   */
  battery: TruckBattery;

  /**
   * The license plate.
   */
  licensePlate: TruckLicensePlate;

  /**
   * The active status.
   */
  isActive: boolean;
}

/**
 * Truck entity.
 */
export class Truck extends AggregateRoot<TruckProps> {
  /**
   * The identifier.
   */
  get id(): UniqueEntityID {
    return this._id;
  }

  /**
   * The identifier.
   */
  get truckId(): TruckId {
    return TruckId.caller(this.id);
  }

  /**
   * The tare.
   */
  get tare(): number {
    return this.props.tare;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }
  set isActive(value: boolean) {
    this.props.isActive = value;
  }

  set tare(value: number) {
    this.props.tare = value;
  }

  set loadCapacity(value: number) {
    this.props.loadCapacity = value;
  }

  set fullLoadAutonomy(value: number) {
    this.props.fullLoadAutonomy = value;
  }

  set battery(value: TruckBattery) {
    this.props.battery = value;
  }

  /**
   * The load capacity.
   */
  get loadCapacity(): number {
    return this.props.loadCapacity;
  }

  /**
   * The full load autonomy.
   */
  get fullLoadAutonomy(): number {
    return this.props.fullLoadAutonomy;
  }

  /**
   * The battery.
   */
  get battery(): TruckBattery {
    return this.props.battery;
  }

  /**
   * The license plate.
   */
  get licensePlate(): TruckLicensePlate {
    return this.props.licensePlate;
  }

  private constructor(props: TruckProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * Initializes a new instance of a Truck.
   * @param tare The tare.
   * @param loadCapacity The load capacituy.
   * @param fullLoadAutonomy  The full load autonomy.
   * @param battery The battery.
   * @param licensePlate The license plate.
   * @param id The identifier.
   * @returns Truck.
   */
  public static create(props: TruckProps, id?: UniqueEntityID): Result<Truck> {
    const guardedProps = [
      { argument: props.tare, argumentName: 'tare' },
      { argument: props.loadCapacity, argumentName: 'loadCapacity' },
      { argument: props.fullLoadAutonomy, argumentName: 'fullLoadAutonomy' },
      { argument: props.battery.capacity, argumentName: 'capacity' },
      { argument: props.battery.fastChargeTime, argumentName: 'fastChargeTime' },
      { argument: props.battery.slowChargeTime, argumentName: 'slowChargeTime' },
      { argument: props.licensePlate, argumentName: 'licensePlate' },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Truck>(guardResult.message);
    } else {
      const guardedNumbers = [
        { argument: props.tare, argumentName: 'tare' },
        { argument: props.loadCapacity, argumentName: 'loadCapacity' },
        { argument: props.fullLoadAutonomy, argumentName: 'fullLoadAutonomy' },
      ];

      const guardPositiveNumber = Guard.againstPositiveNumberBulk(guardedNumbers);

      if (!guardPositiveNumber.succeeded) {
        return Result.fail<Truck>(guardPositiveNumber.message);
      }

      const truck = new Truck(
        {
          tare: props.tare,
          loadCapacity: props.loadCapacity,
          fullLoadAutonomy: props.fullLoadAutonomy,
          battery: props.battery,
          licensePlate: props.licensePlate,
          isActive: true,
        },
        id,
      );

      return Result.ok<Truck>(truck);
    }
  }
}
