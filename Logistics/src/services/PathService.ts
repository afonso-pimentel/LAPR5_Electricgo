import { Service, Inject } from 'typedi';
import config from '../../config';
import IPathDTO from '../dto/IPathDTO';
import { Path } from '../domain/PathAggregate/Path';
import IPathRepo from './IRepos/IPathRepo';
import IWarehouseRepo from './IRepos/IWarehouseRepo';
import IPathService from './IServices/IPathService';
import { Result } from '../core/logic/Result';
import { PathMap } from '../mappers/PathMap';
import IEditPathDTO from '../dto/IEditPathDTO';
import { PathId } from '../domain/PathAggregate/PathId';
import IPostPathDTO from '../dto/IPostPathDTO';
import { PathWarehouseId } from '../domain/PathAggregate/PathWarehouseId';
import { TextUtil } from '../utils/TextUtil';
import { IWarehouseDTO } from '../dto/IWarehouseDTO';
import { start } from 'repl';

@Service()
export default class PathService implements IPathService {
  constructor(
    @Inject(config.repos.path.name) private pathRepo: IPathRepo,
    @Inject(config.repos.warehouse.name) private warehouseRepo: IWarehouseRepo,
  ) {}

  public async getPathsWithPagination(page: number, limit: number): Promise<Result<[IPathDTO[], number]>> {
    try {
      const [paths, totalPaths] = await this.pathRepo.findAllWithPagination(+page, +limit);

      if (paths === null) {
        return Result.fail<[IPathDTO[], number]>('Paths not found');
      } else {
        return Result.ok<[IPathDTO[], number]>([paths.map(pathRecord => PathMap.toDTO(pathRecord)), totalPaths]);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getPath(id: string): Promise<Result<IPathDTO>> {
    try {
      const path = (await this.pathRepo.findByDomainId(id)) as Path;

      if (path === null) {
        return Result.fail<IPathDTO>('Path not found');
      } else {
        const pathDTOResult = PathMap.toDTO(path) as IPathDTO;
        return Result.ok<IPathDTO>(pathDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }
  public async getPaths(): Promise<Result<IPathDTO[]>> {
    try {
      const paths = await this.pathRepo.findAll();

      if (paths === null) {
        return Result.fail<IPathDTO[]>('Paths not found');
      } else {
        return Result.ok<IPathDTO[]>(paths.map(pathRecord => PathMap.toDTO(pathRecord)));
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Creates a new path
   * @param pathDTO
   * @returns
   */
  public async createPath(pathDTO: IPostPathDTO): Promise<Result<IPathDTO>> {
    try {
      if (pathDTO.startWarehouse === pathDTO.endWarehouse) {
        return Result.fail<IPathDTO>('Start and end warehouse cannot be the same');
      }

      if (!TextUtil.isUUID(pathDTO.startWarehouse)) {
        return Result.fail<IPathDTO>('StartWarehouse needs to be a valid UUID');
      }

      if (!TextUtil.isUUID(pathDTO.endWarehouse)) {
        return Result.fail<IPathDTO>('EndWarehouse needs to be a valid UUID');
      }

      if (!(await this.warehouseRepo.ifWarehouseExists(pathDTO.startWarehouse))) {
        return Result.fail<IPathDTO>('StartWarehouse id does not exist');
      }

      if (!(await this.warehouseRepo.ifWarehouseExists(pathDTO.endWarehouse))) {
        return Result.fail<IPathDTO>('EndWarehouse id does not exist');
      }

      if (await this.ifPathExists(pathDTO.startWarehouse, pathDTO.endWarehouse)) {
        return Result.fail<IPathDTO>('Path with warehouse ids already exists');
      }

      const pathOrError = Path.create({
        startWarehouse: new PathWarehouseId(pathDTO.startWarehouse),
        endWarehouse: new PathWarehouseId(pathDTO.endWarehouse),
        distance: pathDTO.distance,
        pathTime: pathDTO.pathTime,
        spentEnergy: pathDTO.spentEnergy,
        extraChargeTime: pathDTO.extraChargeTime,
      });

      if (pathOrError.isFailure) {
        return Result.fail<IPathDTO>(pathOrError.errorValue());
      }

      // gets the created path object
      const pathResult = pathOrError.getValue();

      // saves the path object to the database
      await this.pathRepo.save(pathResult);

      const pathDTOResult = PathMap.toDTO(pathResult) as IPathDTO;
      return Result.ok<IPathDTO>(pathDTOResult);
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Creates a new path
   * @param pathDTO
   * @returns
   */
   public async createPaths(pathDTOs: IPostPathDTO[]): Promise<Result<IPathDTO[]>> {
    try {

      const listOfWarehouses = await this.warehouseRepo.listOfWarehouses();
      
      const pathDTOsToReturn: IPathDTO[] = [];

      for (const pathDTO of pathDTOs) {
        const pathOrError = Path.create({
          startWarehouse: new PathWarehouseId(pathDTO.startWarehouse),
          endWarehouse: new PathWarehouseId(pathDTO.endWarehouse),
          distance: pathDTO.distance,
          pathTime: pathDTO.pathTime,
          spentEnergy: pathDTO.spentEnergy,
          extraChargeTime: pathDTO.extraChargeTime,
        });
  
        if (pathOrError.isFailure) {
          return Result.fail<IPathDTO[]>(pathOrError.errorValue());
        }
  
        // gets the created path object
        const pathResult = pathOrError.getValue();
  
        // saves the path object to the database
        await this.pathRepo.save(pathResult);
  
        const pathDTOResult = PathMap.toDTO(pathResult) as IPathDTO;

        pathDTOsToReturn.push(pathDTOResult);
      }

      return Result.ok<IPathDTO[]>(pathDTOsToReturn);
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Edits a path
   * @param pathDTO
   * @returns
   */
  public async editPath(pathId: string, pathDTO: IEditPathDTO): Promise<Result<IEditPathDTO>> {
    try {
      // gets the path object
      const path = (await this.pathRepo.findByDomainId(pathId)) as Path;

      if (path === null) {
        return Result.fail<IEditPathDTO>('Path not found');
      }
      // updates the path object
      path.updatePath(pathDTO.distance, pathDTO.pathTime, pathDTO.spentEnergy, pathDTO.extraChargeTime);
      // saves the path object to the database
      await this.pathRepo.save(path);

      const pathDTOResult = PathMap.toEditDTO(path) as IPathDTO;
      return Result.ok<IPathDTO>(pathDTOResult);
    } catch (e) {
      throw e;
    }
  }
  /* check if there is a path with the same start and end warehouse ids
   * @param path
   * @returns
   */
  public async ifPathExists(startWarehouse: string, endWarehouse: string): Promise<boolean> {
    const paths = await this.pathRepo.getByStartEndWarehouseId(startWarehouse, endWarehouse);
    if (paths.length > 0) {
      return true;
    }
  }
}
