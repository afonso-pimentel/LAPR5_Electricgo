import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';

import IPathDTO from '../dto/IPathDTO';
import { Path } from '../domain/PathAggregate/Path';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import IPostPathDTO from '../dto/IPostPathDTO';
import { PathWarehouseId } from '../domain/PathAggregate/PathWarehouseId';

export class PathMap extends Mapper<Path> {
  public static toDTO(path: Path): IPathDTO {
    return ({
      id: path.id.toString(),
      startWarehouse: path.startWarehouse.toString(),
      endWarehouse: path.endWarehouse.toString(),
      distance: path.distance,
      pathTime: path.pathTime,
      spentEnergy: path.spentEnergy,
      extraChargeTime: path.extraChargeTime,
    } as unknown) as IPathDTO;
  }

  public static toEditDTO(path: Path): IPathDTO {
    return ({
      id: path.id.toString(),
      startWarehouse: path.startWarehouse.toString(),
      endWarehouse: path.endWarehouse.toString(),
      distance: path.distance,
      pathTime: path.pathTime,
      spentEnergy: path.spentEnergy,
      extraChargeTime: path.extraChargeTime,
    } as unknown) as IPathDTO;
  }

  public static toDomain(path: any | Model<IPathPersistence & Document>): Path {
    path.startWarehouse = new PathWarehouseId(path.startWarehouse.toString());
    path.endWarehouse = new PathWarehouseId(path.endWarehouse.toString());

    const pathOrError = Path.create(path, new UniqueEntityID(path.domainId));

    pathOrError.isFailure ? console.log(pathOrError.error) : '';

    return pathOrError.isSuccess ? pathOrError.getValue() : null;
  }

  public static persistenceToDomain(path: any | Model<IPathPersistence & Document>): Path {
    return {
      id: path.domainId.toString(),
      startWarehouse: path.startWarehouse,
      endWarehouse: path.endWarehouse,
      distance: path.distance,
      pathTime: path.pathTime,
      spentEnergy: path.spentEnergy,
      extraChargeTime: path.extraChargeTime,
    } as Path;
  }

  public static toPersistence(path: Path): any {
    return {
      domainId: path.id.toString(),
      startWarehouse: path.startWarehouse,
      endWarehouse: path.endWarehouse,
      distance: path.distance,
      pathTime: path.pathTime,
      spentEnergy: path.spentEnergy,
      extraChargeTime: path.extraChargeTime,
    };
  }
}
