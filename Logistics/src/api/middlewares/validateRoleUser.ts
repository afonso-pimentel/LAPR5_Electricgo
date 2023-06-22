import jwt from 'express-jwt';
import config from '../../../config';
import {Roles} from '../../domain/roles';


const isUserExpected = async (req, res, next) => {
  try {

    if( !req.token || req.token == undefined )
      next( new Error("Token is not present!") );

      console.log(req)
    if( !req.token.role || req.token.role == undefined )
      next( new Error("Role is not present!") );
      console.log(req)

    if(availableRolesForEndpoint(req.baseUrl).indexOf(req.token.role) == -1)
      next( new Error("You don't have permission to use that resource!") );
      console.log(req)

    next();
  } catch (e) {
    return next(e);
  }
};

const availableRolesForEndpoint = (baseUrl : string) => {
  baseUrl = baseUrl.replace('/api','').toLowerCase();
  switch(baseUrl){
    case "/packages":
      return [Roles.ADMINISTRATOR, Roles.LOGISTICS_MANAGER];
    case "/paths":
      return [Roles.ADMINISTRATOR, Roles.LOGISTICS_MANAGER];
    case "/planning":
      return [Roles.ADMINISTRATOR, Roles.LOGISTICS_MANAGER, Roles.FLEET_MANAGER];
    case "/trips":
      return [Roles.ADMINISTRATOR, Roles.LOGISTICS_MANAGER, Roles.FLEET_MANAGER];
    case "/trucks":
      return [Roles.ADMINISTRATOR, Roles.LOGISTICS_MANAGER, Roles.FLEET_MANAGER];
    default:
      return [Roles.ADMINISTRATOR];
  }
}
export default isUserExpected;