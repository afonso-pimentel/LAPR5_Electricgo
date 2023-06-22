import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IDeliveryPackageController from './IControllers/IDeliveryPackageController';
import IDeliveryPackageService from '../services/IServices/IDeliveryPackageService';
import IDeliveryPackageDTO from '../dto/IDeliveryPackageDTO';

import { Result } from '../core/logic/Result';
import IDeliveryPackagePositionDTO from '../dto/IDeliveryPackagePositionDTO';

@Service()
export default class DeliveryPackageController
  implements IDeliveryPackageController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.deliveryPackage.name) private deliveryPackageServiceInstance: IDeliveryPackageService,
  ) {}

  public async createDeliveryPackage(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveryPackageOrError = (await this.deliveryPackageServiceInstance.createDeliveryPackage(
        req.body as IDeliveryPackageDTO,
      )) as Result<IDeliveryPackageDTO>;

      if (deliveryPackageOrError.isFailure) {
        return res.status(400).send(deliveryPackageOrError.errorValue());
      }

      const deliveryPackageDTO = deliveryPackageOrError.getValue();
      return res.json(deliveryPackageDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updateDeliveryPackagePosition(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveryPackageOrError = (await this.deliveryPackageServiceInstance.updateDeliveryPackagePosition(
        req.params.id,
        req.body as IDeliveryPackagePositionDTO,
      )) as Result<IDeliveryPackageDTO>;

      if (deliveryPackageOrError.isFailure) {
        return res.status(400).send();
      }

      const deliveryPackageDTO = deliveryPackageOrError.getValue();
      return res.json(deliveryPackageDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }
  public async getDeliveryPackageById(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveryPackageOrError = (await this.deliveryPackageServiceInstance.getDeliveryPackageById(
        req.params.id as string,
      )) as Result<IDeliveryPackageDTO>;

      if (deliveryPackageOrError.isFailure) {
        return res.status(400).send(deliveryPackageOrError.errorValue());
      }

      const deliveryPackageDTO = deliveryPackageOrError.getValue();
      return res.json(deliveryPackageDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getAllDeliveryPackages(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveryPackageOrError = (await this.deliveryPackageServiceInstance.getAllDeliveryPackages()) as Result<
        IDeliveryPackageDTO[]
      >;

      if (deliveryPackageOrError.isFailure) {
        return res.status(400).send(deliveryPackageOrError.errorValue());
      }

      const deliveryPackageDTOList = deliveryPackageOrError.getValue();
      return res.json(deliveryPackageDTOList).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
