import { PathDto } from "../dtos/path";

export interface IPathService {
  getAll(): Promise<Array<PathDto>>;
}
