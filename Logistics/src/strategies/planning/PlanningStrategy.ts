import { Inject, Service } from "typedi";
import config from "../../../config";
import { Result } from "../../core/logic/Result";
import IPlanningByDayResponseDTO from "../../dto/IPlanningByDayResponseDTO";
import IPlanningResponseDTO from "../../dto/IPlanningResponseDTO";
import IPrologPlanningByDayRequestDTO from "../../dto/IPrologPlanningByDayRequestDTO";
import IPrologPlanningRequestDTO from "../../dto/IPrologPlanningRequestDTO";
import IPlanningRepo from "../../services/IRepos/IPlanningRepo";
import IPlanningStrategy from "../IStrategies/IPlanningStrategy";
import PrologPlanningStrategy from "./PrologPlanningStrategy";
import SimulatedPlanningStrategy from "./SimulatedPlanningStrategy";

@Service()
export default class PlanningStrategy implements IPlanningStrategy {
  constructor(
    @Inject(config.repos.planning.name) private planningRepo: IPlanningRepo,
  ) {}

  getPlanningByDay(planningDTO: IPrologPlanningByDayRequestDTO): Promise<IPlanningByDayResponseDTO[]> {
    switch (config.planningStrategy) {
      case 'simulated':
        return new SimulatedPlanningStrategy().getPlanningByDay(planningDTO);
      case 'prolog':
        return new PrologPlanningStrategy(this.planningRepo).getPlanningByDay(planningDTO);
      default:
        throw new Error('Invalid planning strategy');
    }
  }

  public async getPlanning(planningRequestDTO: IPrologPlanningRequestDTO): Promise<IPlanningResponseDTO> {
    switch (config.planningStrategy) {
        case 'simulated':
          return new SimulatedPlanningStrategy().getPlanning(planningRequestDTO);
        case 'prolog':
          return new PrologPlanningStrategy(this.planningRepo).getPlanning(planningRequestDTO);
        default:
          throw new Error('Invalid planning strategy');
      }
  }
}