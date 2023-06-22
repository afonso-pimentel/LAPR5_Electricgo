import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

interface DeliveryPackagePositionProps {
  x: number;
  y: number;
  z: number;
}

export class DeliveryPackagePosition extends ValueObject<DeliveryPackagePositionProps> {
  get x(): number {
    return this.props.x;
  }

  get y(): number {
    return this.props.y;
  }

  get z(): number {
    return this.props.z;
  }

  private constructor(props: DeliveryPackagePositionProps) {
    super(props);
  }

  public static create(props: DeliveryPackagePositionProps): Result<DeliveryPackagePosition> {
    const guardedProps = [
      { argument: props.x, argumentName: 'x' },
      { argument: props.y, argumentName: 'y' },
      { argument: props.z, argumentName: 'z' },
    ];
    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<DeliveryPackagePosition>(guardResult.message);
    } else {
      return Result.ok<DeliveryPackagePosition>(new DeliveryPackagePosition({ ...props }));
    }
  }
}
