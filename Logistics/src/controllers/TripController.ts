import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import ITripController from './IControllers/ITripController';
import ITripService from '../services/IServices/ITripService';
import ITripDTO from '../dto/ITripDTO';
import IPlanningToTripDTO from '../dto/IPlanningToTripDTO';

import { Result } from '../core/logic/Result';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class TripController implements ITripController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.trip.name) private tripServiceInstance: ITripService) {}

  /**
   * @inheritDoc
   */

  public async createTrip(req: Request, res: Response, next: NextFunction) {
    try {
      const tripOrError = (await this.tripServiceInstance.createTrip(req.body as IPlanningToTripDTO)) as Result<
        ITripDTO
      >;

      if (tripOrError.isFailure) {
        return res.status(400).send(tripOrError.errorValue());
      }

      const tripDTO = tripOrError.getValue();
      return res.json(tripDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  /**
   * @inheritDoc
   */
  public async getTripsWithPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const page = ((req.query.page as unknown) as number) || 0;
      const limit = ((req.query.limit as unknown) as number) || 10;
      const tripOrError = (await this.tripServiceInstance.getTripsWithPagination(page, limit)) as Result<
        [ITripDTO[], number]
      >;

      if (tripOrError.isFailure) {
        return res.status(400).send();
      }

      const [trips, totalTrips] = tripOrError.getValue();
      const totalPageCount = Math.ceil(totalTrips / limit);
      return res
        .json({
          trips: trips,
          totalPageCount,
        })
        .status(200);
    } catch (e) {
      return next(e);
    }
  }
}
