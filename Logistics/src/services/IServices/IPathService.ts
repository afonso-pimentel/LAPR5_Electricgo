import { Result } from '../../core/logic/Result';
import IEditPathDTO from '../../dto/IEditPathDTO';
import IPathDTO from '../../dto/IPathDTO';

export default interface IPathService {
  createPath(pathDTO: IPathDTO): Promise<Result<IPathDTO>>;
  createPaths(pathDTO: IPathDTO[]): Promise<Result<IPathDTO[]>>;
  editPath(pathId: string, pathDTO: IEditPathDTO): Promise<Result<IEditPathDTO>>;
  getPaths(): Promise<Result<IPathDTO[]>>;
  getPathsWithPagination(page: number, limit: number): Promise<Result<[IPathDTO[], number]>>;
  getPath(pathId: string): Promise<Result<IPathDTO>>;
}
