import { Service, Inject } from 'typedi';
import config from '../../../config';
import IPlanningResponseDTO from '../../dto/IPlanningResponseDTO';
import { PathPlanningMap } from '../../mappers/PathPlanningMap';
import IPlanningRepo from '../../services/IRepos/IPlanningRepo';
import IPlanningStrategy from '../IStrategies/IPlanningStrategy';
import IPrologPlanningRequestDTO from '../../dto/IPrologPlanningRequestDTO';
import IPlanningByDayResponseDTO from '../../dto/IPlanningByDayResponseDTO';
import IPrologPlanningByDayRequestDTO from '../../dto/IPrologPlanningByDayRequestDTO';

@Service()
export default class PrologPlanningStrategy implements IPlanningStrategy {
  constructor(
    @Inject(config.repos.planning.name) private planningRepo: IPlanningRepo
  ) {}

  public async getPlanningByDay(planningDTO: IPrologPlanningByDayRequestDTO): Promise<IPlanningByDayResponseDTO[]> {
    try {
      const planningResponseDTO = await this.planningRepo.getPlanningByDay(planningDTO);

      const response: IPlanningByDayResponseDTO[] = [];
      planningResponseDTO.forEach(element => {
        response.push(PathPlanningMap.toPlanningByDayResponse(element));
      });

      return response;
    } catch (e) {
      throw e;
    }
  }

  public async getPlanning(planningRequestDTO: IPrologPlanningRequestDTO): Promise<IPlanningResponseDTO> {
    try {
      const planningResponseDTO = await this.planningRepo.getPlanning(planningRequestDTO);

      const response = PathPlanningMap.toPlanningResponse(planningResponseDTO);

      return response;
    } catch (e) {
      throw e;
    }
  }
}
