import { Request, Router } from 'express';
import { Container } from 'typedi';
import config from '../../../config';
import IPlanningController from '../../controllers/IControllers/IPlanningController';
import middlewares from '../middlewares';

const route = Router();

export default (app: Router) => {
  app.use('/planning', middlewares.isAuth, middlewares.isUserExpected, route);

  const ctrl = Container.get(config.controllers.planning.name) as IPlanningController;

  route.get(
    '/:truckId/:date/:heuristic',
    (req: Request<{ truckId: string; date: string; heuristic: string }>, res, next) => ctrl.getPlanning(req, res, next),
  );

  route.get(
    '/ByDay/:date',
    (req: Request<{ date: string; }>, res, next) => ctrl.getPlanningForDay(req, res, next),
  );
};
