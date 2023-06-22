import { Service } from 'typedi';
import IWarehouseRepo from '../services/IRepos/IWarehouseRepo';
import axios from 'axios';
import config from '../../config';
import { IWarehouseDTO } from '../dto/IWarehouseDTO';
@Service()
export default class WarehouseRepo implements IWarehouseRepo {
  constructor() {}

  ifWarehouseExists(warehouseId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      axios.get(`${config.warehouseApiUrl}Warehouse/${warehouseId}`)
      .then((response) => {
        resolve(true);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          resolve(false);
        } else {
          reject(error);
        }
      });
    });
  }

  listOfWarehouses(): Promise<IWarehouseDTO[]> {
    return new Promise((resolve, reject) => {
      axios.get(`${config.warehouseApiUrl}Warehouse/`)
      .then((response) => {
        resolve(response.data as IWarehouseDTO[]);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
