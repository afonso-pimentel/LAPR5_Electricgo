import { Service, Inject } from 'typedi';

import { Document, FilterQuery, Model } from 'mongoose';
import IPathRepo from '../services/IRepos/IPathRepo';
import { IPathPersistence } from '../dataschema/IPathPersistence';

import { PathMap } from '../mappers/PathMap';
import { Path } from '../domain/PathAggregate/Path';
import { PathId } from '../domain/PathAggregate/PathId';

@Service()
export default class PathRepo implements IPathRepo {
  private models: any;

  constructor(@Inject('pathSchema') private pathSchema: Model<IPathPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(path: Path): Promise<boolean> {
    // const idX = path.id instanceof PathId ? (<PathId>path.id).toValue() : path.id;

    // const query = { domainId: idX };
    // const pathDocument = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document>);

    // return !!pathDocument === true;
    return false; // TODO: implement
  }

  public async save(path: Path): Promise<Path> {
    const query = { domainId: path.id.toString() };

    const pathDocument = await this.pathSchema.findOne(query);

    try {
      if (pathDocument === null) {
        const rawPath: any = PathMap.toPersistence(path);

        const pathCreated = await this.pathSchema.create(rawPath);

        return path;
        // return PathMap.toDomain(pathCreated);
      } else {
        pathDocument.distance = path.distance;
        pathDocument.pathTime = path.pathTime;
        pathDocument.extraChargeTime = path.extraChargeTime;
        pathDocument.spentEnergy = path.spentEnergy;

        await pathDocument.save();

        return path;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findAll(): Promise<Path[]> {
    const pathRecords = await this.pathSchema.find();

    if (pathRecords != null) {
      return pathRecords.map(pathRecord => PathMap.persistenceToDomain(pathRecord));
    } else return null;
  }

  public async findAllWithPagination(page: number, limit: number): Promise<[Path[], number]> {
    const pathRecords = await this.pathSchema
      .find()
      .skip(page * limit)
      .limit(limit);

    const totalRecords = await this.pathSchema.countDocuments();

    if (pathRecords != null && totalRecords != null) {
      return [pathRecords.map(pathRecord => PathMap.persistenceToDomain(pathRecord)), totalRecords];
    } else return null;
  }

  public async findByDomainId(pathId: PathId | string): Promise<Path> {
    const query = { domainId: pathId.toString() };
    const pathRecord = await this.pathSchema.findOne(query as FilterQuery<IPathPersistence & Document>);

    if (pathRecord != null) {
      return PathMap.toDomain(pathRecord.toJSON());
    } else return null;
  }

  /**
   * get all paths with given start and end warehouse id
   * @param startWarehouseId
   * @param endWarehouseId
   * @returns
   */
  public async getByStartEndWarehouseId(startWarehouseId: string, endWarehouseId: string): Promise<Path[]> {
    const query = { startWarehouse: startWarehouseId, endWarehouse: endWarehouseId };
    const pathRecords = await this.pathSchema.find(query as FilterQuery<IPathPersistence & Document>);

    if (pathRecords != null) {
      return pathRecords.map(pathRecord => PathMap.persistenceToDomain(pathRecord));
    } else return null;
  }
}
