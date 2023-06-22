import { Request, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IDeliveryPackageController from '../../controllers/IControllers/IDeliveryPackageController';

import config from '../../../config';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/packages', middlewares.isAuth, middlewares.isUserExpected, route);

  const ctrl = Container.get(config.controllers.deliveryPackage.name) as IDeliveryPackageController;

  // TODO: don't only validate here, but also in the model
  // TODO: uncomment below to test the createDeliveryPackage endpoint
  route.post(
    '',
    celebrate({
      body: Joi.object({
        deliveryId: Joi.string().required(),
        loadTime: Joi.number().required(),
        unloadTime: Joi.number().required(),
        x: Joi.number().required(),
        y: Joi.number().required(),
        z: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.createDeliveryPackage(req, res, next),
  );

  route.patch(
    '/:id',
    celebrate({
      body: Joi.object({
        x: Joi.number().required(),
        y: Joi.number().required(),
        z: Joi.number().required(),
      }),
    }),
    (req: Request<{ id: string }>, res, next) => ctrl.updateDeliveryPackagePosition(req, res, next),
  );
  route.get('', (req, res, next) => ctrl.getAllDeliveryPackages(req, res, next));
  route.get('/:id', (req, res, next) => ctrl.getDeliveryPackageById(req, res, next));
};
