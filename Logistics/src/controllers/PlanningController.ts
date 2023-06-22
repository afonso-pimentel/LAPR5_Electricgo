import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';
import IPlanningService from '../services/IServices/IPlanningService';
import ITripService from '../services/IServices/ITripService';
import { Result } from '../core/logic/Result';
import IPlanningController from './IControllers/IPlanningController';
import IPlanningRequestDTO from '../dto/IPlanningRequestDTO';
import IPlanningResponseDTO from '../dto/IPlanningResponseDTO';
import ITripDTO from '../dto/ITripDTO';
import IPlanningToTripDTO from '../dto/IPlanningToTripDTO';
import IPlanningByDayRequestDTO from '../dto/IPlanningByDayRequestDTO';
import IPlanningByDayResponseDTO from '../dto/IPlanningByDayResponseDTO';

/**
 * @implements { IPlanningController }
 */
@Service()
export default class PlanningController
  implements IPlanningController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.planning.name) private planningServiceInstance: IPlanningService,
    @Inject(config.services.trip.name) private tripServiceInstance: ITripService,
  ) {}

  /**
   * Controller for get the planning for a truck in a given day.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async getPlanning(req: Request, res: Response, next: NextFunction) {
    try {
      const planningRequestDTO = {
        truckId: req.params.truckId,
        date: req.params.date,
        heuristic: req.params.heuristic,
      } as IPlanningRequestDTO;

      const planningOrError = (await this.planningServiceInstance.getPlanning(planningRequestDTO)) as Result<
        IPlanningResponseDTO
      >;

      if (planningOrError.isFailure) {
        return res.status(400).send(planningOrError.errorValue());
      }

      const pathDTO = planningOrError.getValue();

      const planToTripDTO = {
        truckId: req.params.truckId,
        date: req.params.date,
        listOrderDeliveries: pathDTO.listOrderDeliveries,
        listOrderWarehouses: pathDTO.listOrderWarehouses,
        listWarehousesToCharge: pathDTO.listWarehousesToCharge,
        listWarehousesQuantityToCharge: pathDTO.listWarehousesQuantityToCharge,
        listWarehousesTimeToCharge: pathDTO.listWarehousesTimeToCharge,
        planningCost: pathDTO.planningCost,
        heuristic: req.params.heuristic,
      } as IPlanningToTripDTO;

      const tripOrError = (await this.tripServiceInstance.createTrip(planToTripDTO)) as Result<ITripDTO>;
      if (tripOrError.isFailure) {
        return res.status(400).send(tripOrError.errorValue());
      }
      return res.json(pathDTO).status(200);
    } catch (e) {
      return next(e);
    }
  }

  /**
   * Controller for get the planning for a truck in a given day.
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async getPlanningForDay(req: Request, res: Response, next: NextFunction) {
    try {
      const planningRequestDTO = {
        date: req.params.date,
      } as IPlanningByDayRequestDTO;

      const planningOrError = (await this.planningServiceInstance.getPlanningByDay(planningRequestDTO)) as Result<
      IPlanningByDayResponseDTO[]
      >;

      if (planningOrError.isFailure) {
        return res.status(400).send(planningOrError.errorValue());
      }

      const pathListDTO = planningOrError.getValue();
      var totalTrips = pathListDTO.length;
      pathListDTO.forEach(async element => {
          const planToTripDTO = {
            truckId: element.truck,
            date: req.params.date,
            listOrderDeliveries: element.listOrderDeliveries,
            listOrderWarehouses: element.listOrderWarehouses,
            listWarehousesToCharge: element.listWarehousesToCharge,
            listWarehousesQuantityToCharge: element.listWarehousesQuantityToCharge,
            listWarehousesTimeToCharge: element.listWarehousesTimeToCharge,
            planningCost: element.planningCost,
            heuristic: "5",
          } as IPlanningToTripDTO;

          const tripOrError = (await this.tripServiceInstance.createTrip(planToTripDTO)) as Result<ITripDTO>;
          if (tripOrError.isFailure) {
            console.log(tripOrError.errorValue());
            return;
          }
      });

      return res.json({ message: "Trips created " + totalTrips + ". Grid will reload to show new results."}).status(200);
    } catch (e) {
      return next(e);
    }
  }
}
