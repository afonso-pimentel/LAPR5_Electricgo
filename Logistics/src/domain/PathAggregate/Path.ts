import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

import { PathId } from './PathId';
import { PathWarehouseId } from './PathWarehouseId';

interface PathProps {
  startWarehouse: PathWarehouseId;
  endWarehouse: PathWarehouseId;
  distance: number;
  pathTime: number;
  spentEnergy: number;
  extraChargeTime: number;
}

export class Path extends AggregateRoot<PathProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get pathId(): PathId {
    return PathId.caller(this.id);
  }

  get startWarehouse(): PathWarehouseId {
    return this.props.startWarehouse;
  }

  get endWarehouse(): PathWarehouseId {
    return this.props.endWarehouse;
  }

  get distance(): number {
    return this.props.distance;
  }

  get pathTime(): number {
    return this.props.pathTime;
  }

  get spentEnergy(): number {
    return this.props.spentEnergy;
  }

  get extraChargeTime(): number {
    return this.props.extraChargeTime;
  }

  private constructor(props: PathProps, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * Creates a new path with the given properties and returns a Result<Path> object with the path or an error message
   * @param props
   * @param id
   * @returns
   */
  public static create(props: PathProps, id?: UniqueEntityID): Result<Path> {
    const guardResult = Path.validateProps(props);

    if (!guardResult.succeeded) {
      return Result.fail<Path>(guardResult.message);
    } else {
      const path = new Path(
        {
          ...props,
        },
        id,
      );

      return Result.ok<Path>(path);
    }
  }

  public updatePath(distance: number, pathTime: number, spentEnergy: number, extraChargeTime: number): Result<void> {
    this.props.distance = distance;
    this.props.pathTime = pathTime;
    this.props.spentEnergy = spentEnergy;
    this.props.extraChargeTime = extraChargeTime;
    return Result.ok<void>();
  }

  public updateDistance(distance: number): Result<void> {
    this.props.distance = distance;
    return Result.ok<void>();
  }

  public updatePathTime(pathTime: number): Result<void> {
    this.props.pathTime = pathTime;
    return Result.ok<void>();
  }

  public updateSpentEnergy(spentEnergy: number): Result<void> {
    this.props.spentEnergy = spentEnergy;
    return Result.ok<void>();
  }

  public updateExtraChargeTime(extraChargeTime: number): Result<void> {
    this.props.extraChargeTime = extraChargeTime;
    return Result.ok<void>();
  }
  /**
   * Validates the path properties and returns a GuardResult
   * A design choice was made to validate the properties of the value objects startWarehouse and endWarehouse in the Path model instead of the PathWarehouseId model, in order to keep the argument name in the error message.
   * @param props
   * @returns
   */
  private static validateProps(props: PathProps) {
    const gStartWarehouse = { argument: props.startWarehouse, argumentName: 'startWarehouse' };
    const gEndWarehouse = { argument: props.endWarehouse, argumentName: 'endWarehouse' };
    const gDistance = { argument: props.distance, argumentName: 'distance' };
    const gPathTime = { argument: props.pathTime, argumentName: 'pathTime' };
    const gSpentEnergy = { argument: props.spentEnergy, argumentName: 'spentEnergy' };
    const gExtraChargeTime = { argument: props.extraChargeTime, argumentName: 'extraChargeTime' };

    const guardNull = [gStartWarehouse, gEndWarehouse, gDistance, gPathTime, gSpentEnergy, gExtraChargeTime];

    const guardIfNotNumber = [gDistance, gPathTime, gSpentEnergy, gExtraChargeTime];

    const guardIfNegative = [gDistance, gPathTime, gSpentEnergy, gExtraChargeTime];

    const guardCombinedResult = Guard.combine([
      Guard.againstNullOrUndefinedBulk(guardNull),
      Guard.isOfTypeBulk(guardIfNotNumber, 'number'),
      Guard.InRangeBulk(guardIfNegative, 0, 99999999),
    ]);
    return guardCombinedResult;
  }
}
