import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITripController from '../../controllers/IControllers/ITripController';

import config from '../../../config';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/trips', middlewares.isAuth, middlewares.isUserExpected, route);

  const ctrl = Container.get(config.controllers.trip.name) as ITripController;

  // TODO: don't only validate here, but also in the model
  // TODO: uncomment below to test the createTrip endpoint
  route.post(
    '',
    celebrate({
      body: Joi.object({
        truckId: Joi.string().required(),
        date: Joi.string().required(),
        listOrderDeliveries: Joi.array()
          .items(Joi.string())
          .required(),
        listOrderWarehouses: Joi.array()
          .items(Joi.string())
          .required(),
        listWarehousesToCharge: Joi.array()
          .items(Joi.string())
          .required(),
        listWarehousesQuantityToCharge: Joi.array()
          .items(Joi.string())
          .required(),
        listWarehousesTimeToCharge: Joi.array()
          .items(Joi.string())
          .required(),
        planningCost: Joi.number().required(),
        heuristic: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createTrip(req, res, next),
  );

  route.get('/ByPage', (req, res, next) => ctrl.getTripsWithPagination(req, res, next));
};
