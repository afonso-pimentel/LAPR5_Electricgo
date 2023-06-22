import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

/**
 * Defines the properties that a TripStop contains.
 * @param warehouseId The stop identifier.
 * @param deliveryId The delivery identifier.
 * @param isWarehouseToCharge If the stop is a warehouse to charge.
 * @param chargeQuantity The chargeQuantity to charge.
 * @param chargeTime The chargeTime to charge.
 */
interface TripStopProps {
  warehouseId: string;
  deliveryId: string;
  isWarehouseToCharge: boolean;
  chargeQuantity: number;
  chargeTime: number;
}

/**
 * TripStop value object.
 * @param warehouseId The stop identifier.
 * @param deliveryId The delivery identifier.
 * @param isWarehouseToCharge If the stop is a warehouse to charge.
 * @param chargeQuantity The chargeQuantity to charge.
 * @param chargeTime The chargeTime to charge.
 */
export class TripStop extends ValueObject<TripStopProps> {
  /**
   * The stop identifier.
   */
  get warehouseId(): string {
    return this.props.warehouseId;
  }

  /**
   * The delivery identifier.
   */
  get deliveryId(): string {
    return this.props.deliveryId;
  }

  /**
   * If the stop is a warehouse to charge.
   */
  get isWarehouseToCharge(): boolean {
    return this.props.isWarehouseToCharge;
  }

  /**
   * The chargeQuantity to charge.
   */
  get chargeQuantity(): number {
    return this.props.chargeQuantity;
  }

  /**
   * The chargeTime to charge.
   */
  get chargeTime(): number {
    return this.props.chargeTime;
  }

  private constructor(props: TripStopProps) {
    super(props);
  }

  /**
   * Initializes a new instance of TripStop
   * @param warehouseId The stop identifier.
   * @param isWarehouseToCharge If the stop is a warehouse to charge.
   * @param deliveryId The delivery identifier.
   * @param chargeQuantity The chargeQuantity to charge.
   * @param chargeTime The chargeTime to charge.
   * @returns
   */
  public static create(props: TripStopProps): Result<TripStop> {
    const guardedProps = [
      { argument: props.warehouseId, argumentName: 'warehouseId' },
      { argument: props.deliveryId, argumentName: 'deliveryId' },
      { argument: props.isWarehouseToCharge, argumentName: 'isWarehouseToCharge' },
      { argument: props.chargeQuantity, argumentName: 'chargeQuantity' },
      { argument: props.chargeTime, argumentName: 'chargeTime' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<TripStop>(guardResult.message);
    }

    return Result.ok<TripStop>(
      new TripStop({
        warehouseId: props.warehouseId,
        deliveryId: props.deliveryId,
        isWarehouseToCharge: props.isWarehouseToCharge,
        chargeQuantity: props.chargeQuantity,
        chargeTime: props.chargeTime,
      }),
    );
  }
}
