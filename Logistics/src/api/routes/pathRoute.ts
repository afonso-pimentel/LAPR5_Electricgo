import { Request, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPathController from '../../controllers/IControllers/IPathController';

import config from '../../../config';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/paths', middlewares.isAuth, middlewares.isUserExpected, route);

  const ctrl = Container.get(config.controllers.path.name) as IPathController;

  // TODO: don't only validate here, but also in the model
  // TODO: uncomment below to test the path endpoint
  route.post(
    '',
    celebrate({
      body: Joi.object({
        startWarehouse: Joi.string().required(),
        endWarehouse: Joi.string().required(),
        distance: Joi.number().required(),
        pathTime: Joi.number().required(),
        spentEnergy: Joi.number().required(),
        extraChargeTime: Joi.number().required(),
      }),
    }),
    (req, res, next) => ctrl.createPath(req, res, next),
  );

  route.put(
    '/:id',
    celebrate({
      body: Joi.object({
        startWarehouse: Joi.string(),
        endWarehouse: Joi.string(),
        distance: Joi.number(),
        pathTime: Joi.number(),
        spentEnergy: Joi.number(),
        extraChargeTime: Joi.number(),
      }),
    }),
    (req: Request<{ id: string }>, res, next) => ctrl.editPath(req, res, next),
  );
  route.get('/ByPage', (req, res, next) => ctrl.getPathsWithPagination(req, res, next));
  route.get('', (req, res, next) => ctrl.getPaths(req, res, next));
  route.get('/:id', (req: Request<{ id: string }>, res, next) => ctrl.getPathsById(req, res, next));
};
