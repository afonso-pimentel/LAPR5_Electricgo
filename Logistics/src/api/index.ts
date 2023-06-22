import { Router } from 'express';
import auth from './routes/authRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import path from './routes/pathRoute';
import truck from './routes/truckRoute';
import seed from './routes/seedRoute';
import planning from './routes/planningRoute';
import trip from './routes/tripRoute';

import deliveryPackage from './routes/deliveryPackageRoute';
import tripRoute from './routes/tripRoute';

export default () => {
  const app = Router();

  // TODO: don't forget to add the routes here it won't work otherwise
  auth(app);
  user(app);
  role(app);
  path(app);
  truck(app);
  seed(app);
  planning(app);
  deliveryPackage(app);
  trip(app);

  return app;
};
