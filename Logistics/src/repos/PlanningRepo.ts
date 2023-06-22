import { Service, Inject } from 'typedi';
import axios from 'axios';
import config from '../../config';
import { Document, FilterQuery, Model } from 'mongoose';
import { IPathPersistence } from '../dataschema/IPathPersistence';
import { PathId } from '../domain/PathAggregate/PathId';
import IPlanningRepo from '../services/IRepos/IPlanningRepo';
import { Planning } from '../domain/PlanningAggregate/Planning';
import IPrologPlanningResponseDTO from '../dto/IPrologPlanningResponseDTO';
import IPrologPathPlanningRequestDTO from '../dto/IPrologPathPlanningRequestDTO';
import IPrologPlanningRequestDTO from '../dto/IPrologPlanningRequestDTO';
import IPrologPlanningByDayRequestDTO from '../dto/IPrologPlanningByDayRequestDTO';
import IPrologPlanningByDayResponseDTO from '../dto/IPrologPlanningByDayResponseDTO';
import IPrologGroupByDayResponseDTO from '../dto/IPrologGroupByDayResponseDTO';

@Service()
export default class PlanningRepo implements IPlanningRepo {
  private models: any;

  constructor(@Inject('pathSchema') private pathSchema: Model<IPathPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(path: Planning): Promise<boolean> {
    return false; // TODO: implement
  }

  public async save(path: Planning): Promise<Planning> {
    return null;
  }

  public async findAll(): Promise<Planning[]> {
    return null;
  }

  public async findByDomainId(pathId: PathId | string): Promise<Planning> {
    return null;
  }

  public async getPlanning(planningRequest: IPrologPlanningRequestDTO): Promise<IPrologPlanningResponseDTO> {
    return new Promise((resolve, reject) => {
      axios.post(`${config.prologApiUrl}planning`,planningRequest)
      .then((response) => {
        resolve(response.data as IPrologPlanningResponseDTO);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }

  public async getPlanningByDay(planningRequest: IPrologPlanningByDayRequestDTO): Promise<IPrologPlanningByDayResponseDTO[]> {
    return new Promise((resolve, reject) => {
      axios.post(`${config.prologApiUrl}fleetPlanning`,planningRequest)
      .then((response) => {
        resolve((response.data as IPrologGroupByDayResponseDTO).planeamentoFrota);
      })
      .catch((error) => {
        reject(error);
      });
    });
  }
}
