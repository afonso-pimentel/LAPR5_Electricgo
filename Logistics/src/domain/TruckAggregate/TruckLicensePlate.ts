import { ValueObject } from '../../core/domain/ValueObject';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';

/**
 * Defines the properties that a license plate contains.
 */
interface TruckLicenseProps {
  value: string;
}

/**
 * The truck license plate value object.
 */
export class TruckLicensePlate extends ValueObject<TruckLicenseProps> {
  /**
   * The license plate.
   */
  get value(): string {
    return this.props.value;
  }

  private constructor(props: TruckLicenseProps) {
    super(props);
  }

  /**
   * Initializes a new instance of the TruckLicensePlate.
   * @param license The license plate.
   * @returns TruckLicensePlate.
   */
  public static create(props: TruckLicenseProps): Result<TruckLicensePlate> {
    const guardResult = Guard.againstNullOrUndefined(props.value, 'license');
    if (!guardResult.succeeded) {
      return Result.fail<TruckLicensePlate>(guardResult.message);
    } else {
      const licensePlateRegex: RegExp =  new RegExp("^([a-zA-Z]|[0-9]){2}-([a-zA-Z]|[0-9]){2}-([a-zA-Z]|[0-9]){2}$");
      const validLicensePlate: Boolean = licensePlateRegex.test(props.value); 

      if(!validLicensePlate){
        return Result.fail<TruckLicensePlate>("Invalid license plate.");
      }

      return Result.ok<TruckLicensePlate>(new TruckLicensePlate({ value: props.value.toLocaleUpperCase() }));
    }
  }
}
