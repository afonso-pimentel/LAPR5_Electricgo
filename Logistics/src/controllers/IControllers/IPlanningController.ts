import { Request, Response, NextFunction } from 'express';

export default interface IPlanningController {
  getPlanning(req: Request<{ truckId: string; date: string; heuristic: string }>, res: Response, next: NextFunction);
  getPlanningForDay(req: Request<{ date: string; }>, res: Response, next: NextFunction);
}
