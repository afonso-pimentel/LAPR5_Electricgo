import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IDeliveryPackagePersistence } from '../dataschema/IDeliveryPackagePersistence';

import IDeliveryPackageDTO from '../dto/IDeliveryPackageDTO';
import { DeliveryPackage } from '../domain/DeliveryPackageAggregate/DeliveryPackage';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { DeliveryPackagePosition } from '../domain/DeliveryPackageAggregate/DeliveryPackagePosition';
import { DeliveryId } from '../domain/DeliveryPackageAggregate/DeliveryId';

export class DeliveryPackageMap extends Mapper<DeliveryPackage> {
  public static toDTOList(deliveryPackages: DeliveryPackage[]): IDeliveryPackageDTO[] {
    return deliveryPackages.map(deliveryPackage => this.toDTO(deliveryPackage));
  }

  public static toDTO(deliveryPackage: DeliveryPackage): IDeliveryPackageDTO {
    return {
      id: deliveryPackage.id.toString(),
      deliveryId: deliveryPackage.deliveryId.toString(),
      loadTime: deliveryPackage.loadTime,
      unloadTime: deliveryPackage.unloadTime,
      x: deliveryPackage.position.x,
      y: deliveryPackage.position.y,
      z: deliveryPackage.position.z,
    } as IDeliveryPackageDTO;
  }

  public static dtoToDomain(deliveryPackage: IDeliveryPackageDTO): DeliveryPackage {
    return ({
      id: deliveryPackage.id,
      deliveryId: DeliveryId.create({value: deliveryPackage.deliveryId}).getValue(),
      loadTime: deliveryPackage.loadTime,
      unloadTime: deliveryPackage.unloadTime,
      position: DeliveryPackagePosition.create({
        x: deliveryPackage.x,
        y: deliveryPackage.y,
        z: deliveryPackage.z,
      }).getValue()
    } as unknown) as DeliveryPackage;
  }

  public static toDomain(deliveryPackage: any | Model<IDeliveryPackagePersistence & Document>): DeliveryPackage {
    const deliveryPackageOrError = DeliveryPackage.create(
      deliveryPackage,
      new UniqueEntityID(deliveryPackage.domainId),
    );

    deliveryPackageOrError.isFailure ? console.log(deliveryPackageOrError.error) : '';

    return deliveryPackageOrError.isSuccess ? deliveryPackageOrError.getValue() : null;
  }

  // persistence to domain list
  public static persistenceToDomainList(deliveryPackages: any[]): DeliveryPackage[] {
    return deliveryPackages.map(deliveryPackage => this.persistenceToDomain(deliveryPackage));
  }

  public static persistenceToDomain(
    deliveryPackage: any | Model<IDeliveryPackagePersistence & Document>,
  ): DeliveryPackage {
    const deliveryId = DeliveryId.create({
      value: deliveryPackage.deliveryId,
    });
    if (deliveryId.isFailure) {
      return null;
    }
    const position = DeliveryPackagePosition.create({
      x: deliveryPackage.x,
      y: deliveryPackage.y,
      z: deliveryPackage.z,
    });
    if (position.isFailure) {
      return null;
    }

    const deliveryPackageOrError = DeliveryPackage.create(
      {
        deliveryId: deliveryPackage.deliveryId,
        loadTime: deliveryPackage.loadTime,
        unloadTime: deliveryPackage.unloadTime,
        position: position.getValue(),
      },
      new UniqueEntityID(deliveryPackage.domainId),
    );

    return (deliveryPackageOrError.isFailure ? null : deliveryPackageOrError.getValue()) as DeliveryPackage;
  }

  public static toPersistence(deliveryPackage: DeliveryPackage): any {
    return {
      domainId: deliveryPackage.id.toString(),
      deliveryId: deliveryPackage.deliveryId,
      loadTime: deliveryPackage.loadTime,
      unloadTime: deliveryPackage.unloadTime,
      x: deliveryPackage.position.x,
      y: deliveryPackage.position.y,
      z: deliveryPackage.position.z,
    };
  }
}
