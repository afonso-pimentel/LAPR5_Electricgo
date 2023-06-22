import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController';

import config from '../../../config';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/trucks', middlewares.isAuth, middlewares.isUserExpected, route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  // TODO: don't only validate here, but also in the model
  // TODO: uncomment below to test the createTruck endpoint
  route.post(
    '',
    celebrate({
      body: Joi.object({
        tare: Joi.number().required(),
        loadCapacity: Joi.number().required(),
        fullLoadAutonomy: Joi.number().required(),
        capacity: Joi.number().required(),
        fastChargeTime: Joi.number().required(),
        slowChargeTime: Joi.number().required(),
        licensePlate: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.createTruck(req, res, next),
  );

  route.put(
    '/:id',
    celebrate({
      body: Joi.object({
        tare: Joi.number(),
        loadCapacity: Joi.number(),
        fullLoadAutonomy: Joi.number(),
        capacity: Joi.number(),
        fastChargeTime: Joi.number(),
        slowChargeTime: Joi.number(),
      }),
    }),
    (req, res, next) => ctrl.editTruck(req, res, next),
  );

  route.get('', (req, res, next) => ctrl.getAllTrucks(req, res, next));
  route.get('/:id', (req, res, next) => ctrl.getTruckById(req, res, next));
  route.patch('/:id', (req, res, next) => ctrl.softDeleteTruckById(req, res, next));
};
