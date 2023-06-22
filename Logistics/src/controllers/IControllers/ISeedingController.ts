import { Request, Response, NextFunction } from 'express';

export default interface ISeedingController {
  seedData(req: Request, res: Response, next: NextFunction);
  seedDeliveryPackageData(req: Request, res: Response, next: NextFunction);
}
