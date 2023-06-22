import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import IPathService from '../services/IServices/IPathService';
import ITruckDTO from '../dto/ITruckDTO';
import { Result } from '../core/logic/Result';
import ISeedingController from './IControllers/ISeedingController';
import IPathDTO from '../dto/IPathDTO';
import IDeliveryPackageService from '../services/IServices/IDeliveryPackageService';
import IDeliveryPackageDTO from '../dto/IDeliveryPackageDTO';

/**
 * @implements { ISeedingController }
 */
@Service()
export default class SeedingController implements ISeedingController /* TODO: extends ../core/infra/BaseController */ {

  constructor(
    @Inject(config.services.path.name) private pathServiceInstance: IPathService,
    @Inject(config.services.deliveryPackage.name) private deliveryPackageInstance: IDeliveryPackageService) {}

  /**
   * Controller for creating a new path and returning the created path or an error message in the response, if an awful error occurs it gets returned in the next function
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async seedData(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = (await this.pathServiceInstance.createPaths(req.body as IPathDTO[])) as Result<IPathDTO[]>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.errorValue());
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

   /**
   * Controller for creating a new path and returning the created path or an error message in the response, if an awful error occurs it gets returned in the next function
   * @param req
   * @param res
   * @param next
   * @returns
   */
    public async seedDeliveryPackageData(req: Request, res: Response, next: NextFunction) {
      try {
        const pathOrError = (await this.deliveryPackageInstance.createDeliveryPackages(req.body as IDeliveryPackageDTO[])) as Result<IDeliveryPackageDTO[]>;
  
        if (pathOrError.isFailure) {
          return res.status(400).send(pathOrError.errorValue());
        }
  
        const pathDTO = pathOrError.getValue();
        return res.json(pathDTO).status(201);
      } catch (e) {
        return next(e);
      }
    }
}
