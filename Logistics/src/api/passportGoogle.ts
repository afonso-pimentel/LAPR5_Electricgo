import passport from "passport";
import { User } from "../domain/user";
import config from "../../config";
import AuthUserRepo from "../repos/AuthUserRepo";
import IAuthUserDTO from "../dto/IAuthUserDTO";
const jwt = require('jsonwebtoken');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

function initializePassport(app: any) {

  app.use(passport.initialize());

  passport.use(new GoogleStrategy({
    clientID: `${config.googleClientId}`,
    clientSecret: `${config.googleClientSecret}`,
    callbackURL: `${config.googleCallbackAddress}`
  },
    function (_: any, __: any, profile: any, cb: any) {
        var repo = new AuthUserRepo();
        repo.validateUser(profile.id, profile.email).then((user: IAuthUserDTO) => {
          if (user) {
            var token = jwt.sign({ userId: user.id, role: user.role }, config.tokenSecret, { expiresIn: '1h' });
            cb(null,   {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              token: token,
              expireDate: new Date(new Date().setTime(new Date().getTime()  + (1*60*60*1000)))
            });
          }
        }).catch((error: any) => {
          if(error.response.status == 500)
            cb(null, { error: 'Internal server error'});
          else
            cb(null, { error: error.response.data.error});
        });
    }));
}
export default initializePassport;