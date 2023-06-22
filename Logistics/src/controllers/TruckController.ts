import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import ITruckController from './IControllers/ITruckController';
import ITruckService from '../services/IServices/ITruckService';
import ITruckDTO from '../dto/ITruckDTO';
import { Result } from '../core/logic/Result';
import IEditTruckDTO from '../dto/IEditTruckDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

/**
 * @implements { ITruckController }
 */
@Service()
export default class TruckController implements ITruckController /* TODO: extends ../core/infra/BaseController */ {
  /**
   * Initializes a new instance of TruckController.
   * @param truckServiceInstance The truck service.
   */
  constructor(@Inject(config.services.truck.name) private truckServiceInstance: ITruckService) {}

  /**
   * @inheritDoc
   */
  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = (await this.truckServiceInstance.createTruck(req.body as ITruckDTO)) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(400).send(truckOrError.errorValue());
      }

      const truckDTO = truckOrError.getValue();
      return res.json(truckDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  /**
   * @inheritDoc
   */
  public async getAllTrucks(req: Request, res: Response, next: NextFunction) {
    try {
      let truckOrError;
      if (req.query.all === undefined || req.query.all === 'false') {
        truckOrError = (await this.truckServiceInstance.getAllActiveTrucks()) as Result<ITruckDTO[]>;
      } else {
        truckOrError = (await this.truckServiceInstance.getAllTrucks()) as Result<ITruckDTO[]>;
      }

      if (truckOrError.isFailure) {
        return res.status(400).send(truckOrError.errorValue());
      }

      const truckDTOList = truckOrError.getValue();

      return res.json(truckDTOList).status(201);
    } catch (e) {
      return next(e);
    }
  }

  /**
   * @inheritDoc
   */
  public async getTruckById(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = (await this.truckServiceInstance.getTruckById(req.params.id as string)) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(400).send(truckOrError.errorValue());
      }

      const truckDTO = truckOrError.getValue();
      return res.json(truckDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async editTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = (await this.truckServiceInstance.editTruck(
        req.body as IEditTruckDTO,
        req.params.id as string,
      )) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(400).send(truckOrError.errorValue());
      }

      const truckDTO = truckOrError.getValue();
      return res.json(truckDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async softDeleteTruckById(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = (await this.truckServiceInstance.softDeleteTruckById(req.params.id as string)) as Result<
        ITruckDTO
      >;

      if (truckOrError.isFailure) {
        return res.status(400).send(truckOrError.errorValue());
      }

      const truckDTO = truckOrError.getValue();
      return res.json(truckDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
