import { Repo } from '../../core/infra/Repo';
import { Path } from '../../domain/PathAggregate/Path';
import { PathId } from '../../domain/PathAggregate/PathId';

export default interface IPathRepo extends Repo<Path> {
  save(path: Path): Promise<Path>;
  findByDomainId(pathId: string): Promise<Path | null>;
  findAll(): Promise<Path[]>;
  findAllWithPagination(page: number, limit: number): Promise<[Path[], number]>;
  getByStartEndWarehouseId(startWarehouseId: string, endWarehouseId: string): Promise<Path[]>;
  //findByIds (pathsIds: PathId[]): Promise<Path[]>;
  //saveCollection (paths: Path[]): Promise<Path[]>;
  //removeByPathIds (paths: PathId[]): Promise<any>
}
