import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard, IGuardArgument, IGuardResult } from '../../core/logic/Guard';

import { DeliveryPackageId } from './DeliveryPackageId';
import { DeliveryPackagePosition } from './DeliveryPackagePosition';
import { DeliveryId } from './DeliveryId';

interface DeliveryPackageProps {
  deliveryId: DeliveryId;
  loadTime: number;
  unloadTime: number;
  position: DeliveryPackagePosition;
}

export class DeliveryPackage extends AggregateRoot<DeliveryPackageProps> {
  x: number;
  y: number;
  z: number;
  get id(): UniqueEntityID {
    return this._id;
  }

  get deliveryId(): DeliveryId {
    return this.props.deliveryId;
  }

  get deliveryPackageId(): DeliveryPackageId {
    return DeliveryPackageId.caller(this.id);
  }

  get loadTime(): number {
    return this.props.loadTime;
  }

  get unloadTime(): number {
    return this.props.unloadTime;
  }

  get position(): DeliveryPackagePosition {
    return this.props.position;
  }

  private constructor(props: DeliveryPackageProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: DeliveryPackageProps, id?: DeliveryPackageId): Result<DeliveryPackage> {
    const guardedProps = [
      { argument: props.deliveryId, argumentName: 'deliveryId' },
      { argument: props.loadTime, argumentName: 'loadTime' },
      { argument: props.unloadTime, argumentName: 'unloadTime' },
      { argument: props.position, argumentName: 'position' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<DeliveryPackage>(guardResult.message);
    } else {
      const guardedResult = DeliveryPackage.ValidateProps(props);

      if(!guardedResult.succeeded){
        return Result.fail<DeliveryPackage>(guardedResult.message);
      }

      const deliveryPackage = new DeliveryPackage(
        {
          ...props,
        },
        id,
      );

      return Result.ok<DeliveryPackage>(deliveryPackage);
    }
  }

  public static ValidateProps(props:DeliveryPackageProps) : IGuardResult{

    const gloadtime={argument:props.loadTime,argumentname:'loadtime'};
   const gunloadtime={argument:props.unloadTime,argumentname:'unloadtime'};
   const gXcoordenate={argument:props.position.x,argumentname:'xcoordinate'};
   const gYcoordenate={argument:props.position.y,argumentname:'ycoordenate'};
   const gZcoordenate={argument:props.position.z,argumentname:'zcoordenate'};


   const guardCombinedResult=Guard.combine([
       Guard.inRange(gloadtime.argument,0,9999,gloadtime.argumentname),
       Guard.inRange(gunloadtime.argument,0,9999,gunloadtime.argumentname),
       Guard.inRange(gXcoordenate.argument,0,9999,gXcoordenate.argumentname),
       Guard.inRange(gYcoordenate.argument,0,9999,gYcoordenate.argumentname),
       Guard.inRange(gZcoordenate.argument,0,9999,gZcoordenate.argumentname),
       Guard.isGuid(props.deliveryId.toString(), 'DeliveryId')
   ]);
   return guardCombinedResult;
 }

 public updatePosition(position: DeliveryPackagePosition): Result<void> {
  this.props.position = position;
  return Result.ok<void>();
 }
}
