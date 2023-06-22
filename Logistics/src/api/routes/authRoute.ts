import { Request, Router } from 'express';

import config from '../../../config';
import passport from 'passport';

export default (app: Router) => {
  //const ctrl = Container.get(config.controllers.deliveryPackage.name) as IDeliveryPackageController;
  app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: config.frontendFailLogin, session: false }),
    function (req, res) {
      if((req.user as any).error)
      {
        res.redirect(config.frontendFailLogin + `?error=${encodeURI((req.user as any).error)}`);
        return;
      }
      res.redirect(config.frontendSuccessLogin + `?info=${encodeURI(JSON.stringify(req.user))}`);
    });
};
