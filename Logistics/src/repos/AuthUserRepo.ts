import axios from "axios";
import { reject } from "lodash";
import { Promise } from "mongoose";
import { resolve } from "path";
import { Service } from "typedi";
import config from "../../config";
import IAuthUserDTO from "../dto/IAuthUserDTO";
import IAuthUserRepo from "../services/IRepos/IAuthUserRepo";

@Service()
export default class AuthUserRepo implements IAuthUserRepo{
    constructor() {}
  validateUser(googleId: string, email: string): Promise<IAuthUserDTO> {
    return new Promise((resolve, reject) => {
      axios.post(`${config.warehouseApiUrl}user/ValidateUser`, { googleId, email })
        .then((response) => {
          resolve(response.data as IAuthUserDTO);
        })
        .catch((error) => {
            reject(error);
        });
    });
  }
}