import axios from "axios";
import { reject } from "lodash";
import { Promise } from "mongoose";
import { resolve } from "path";
import { Service } from "typedi";
import config from "../../config";
import IDeliveryDTO from "../dto/IDeliveryDTO";
import IDeliveryRepo from "../services/IRepos/IDeliveryRepo";

@Service()
export default class DeliveryRepo implements IDeliveryRepo{
    constructor() {}

    ifDeliveryExists(DeliveryId: string): Promise<boolean> {
      return new Promise((resolve, reject) => {
        axios.get(`${config.warehouseApiUrl}delivery/${DeliveryId}`)
        .then((response) => {
          resolve(true);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            resolve(false);
          } else {
            resolve(false);
          }
        });
      });
    }

    public async getDeliveriesForSpecificDate(DeliveryDate:string):Promise<IDeliveryDTO[]>{
      return new Promise((resolve, reject) => {
        axios.get(`${config.warehouseApiUrl}delivery/date/${DeliveryDate}`)
        .then((response) => {
          resolve(response.data as IDeliveryDTO[]);
        })
        .catch((error) => {
          reject(error);
        });
      });
    }
}