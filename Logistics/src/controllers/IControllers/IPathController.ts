import { Request, Response, NextFunction } from 'express';

export default interface IPathController {
  createPath(req: Request, res: Response, next: NextFunction);
  editPath(req: Request, res: Response, next: NextFunction);
  getPathsWithPagination(req: Request, res: Response, next: NextFunction);
  getPaths(req: Request, res: Response, next: NextFunction);
  getPathsById(req: Request, res: Response, next: NextFunction);
}
