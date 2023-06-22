import { ValueObject } from '../../core/domain/ValueObject';
import { Guard } from '../../core/logic/Guard';
import { Result } from '../../core/logic/Result';

interface DeliveryIdProps {
  value: string;
}

export class DeliveryId extends ValueObject<DeliveryIdProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DeliveryIdProps) {
    super(props);
  }

  public static create(props: DeliveryIdProps): Result<DeliveryId> {
    const guardedProps = [{ argument: props.value, argumentName: 'value' }];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<DeliveryId>(guardResult.message);
    } else {
      return Result.ok<DeliveryId>(new DeliveryId({ ...props }));
    }
  }

  public toString(): string {
    return this.value;
  }
}
