import { Request, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ISeedingController from '../../controllers/IControllers/ISeedingController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
  app.use('/seed', route);

  const ctrl = Container.get(config.controllers.seed.name) as ISeedingController;

  // TODO: don't only validate here, but also in the model
  // TODO: uncomment below to test the path endpoint
  route.post(
    '',
    (req, res, next) => ctrl.seedData(req, res, next),
  );

  route.post(
    '/deliveryPackages',
    (req, res, next) => ctrl.seedDeliveryPackageData(req, res, next),
  );
};
