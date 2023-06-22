import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

/**
 * Defines the properties that a Truck battery contains.
 */
interface TruckBatteryProps {
  /**
   * The capacity.
   */
  capacity: number;

  /**
   * The fast charging time.
   */
  fastChargeTime: number;

  /**
   * The slow charging time.
   */
  slowChargeTime: number;
}

/**
 * Truck Battery value object.
 */
export class TruckBattery extends ValueObject<TruckBatteryProps> {
  /**
   * The capacity.
   */
  get capacity(): number {
    return this.props.capacity;
  }

  /**
   * The fast charging time.
   */
  get fastChargeTime(): number {
    return this.props.fastChargeTime;
  }

   /**
   * The slow charging time.
   */
  get slowChargeTime(): number {
    return this.props.slowChargeTime;
  }

  private constructor(props: TruckBatteryProps) {
    super(props);
  }

  /**
   * Initializes a new instance of TruckBattery
   * @param capacityNumber The capacity.
   * @param fastChargeTimeNumber The fast charge time.
   * @param slowChargeTimeNumber The slow charge time.
   * @returns 
   */
  public static create(props: TruckBatteryProps): Result<TruckBattery> {
    const guardedProps = [
      { argument: props.capacity, argumentName: 'capacity' },
      { argument: props.fastChargeTime, argumentName: 'fastChargeTime' },
      { argument: props.slowChargeTime, argumentName: 'slowChargeTime' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<TruckBattery>(guardResult.message);
    } else {

      const guardedNumbers = [
        { argument: props.capacity, argumentName: 'capacity' },
        { argument: props.fastChargeTime, argumentName: 'fastChargeTime' },
        { argument: props.slowChargeTime, argumentName: 'slowChargeTime' },
      ];

      const guardPositiveNumber = Guard.againstPositiveNumberBulk(guardedNumbers);
      
      if(!guardPositiveNumber.succeeded){
        return Result.fail<TruckBattery>(guardPositiveNumber.message);
      }

      if(props.fastChargeTime > props.slowChargeTime){
        return Result.fail<TruckBattery>("The fast charging time cannot be greater than the slow charging time.");
      }

      if(props.slowChargeTime < props.fastChargeTime){
        return Result.fail<TruckBattery>("The slow charge time cannot be less than the fast charging time.");
      }
      
      return Result.ok<TruckBattery>(new TruckBattery({capacity: props.capacity, 
                                                       fastChargeTime: props.fastChargeTime, 
                                                       slowChargeTime: props.slowChargeTime}));
    }
  }
}
