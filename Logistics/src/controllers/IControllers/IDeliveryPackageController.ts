import { Request, Response, NextFunction } from 'express';

export default interface IDeliveryPackageController {
  createDeliveryPackage(req: Request, res: Response, next: NextFunction);
  updateDeliveryPackagePosition(req: Request, res: Response, next: NextFunction);
  getDeliveryPackageById(req: Request, res: Response, next: NextFunction);
  getAllDeliveryPackages(req: Request, res: Response, next: NextFunction);
}
