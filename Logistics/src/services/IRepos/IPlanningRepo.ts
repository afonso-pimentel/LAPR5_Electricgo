import { Repo } from '../../core/infra/Repo';
import { Planning } from '../../domain/PlanningAggregate/Planning';
import IPrologPlanningResponseDTO from '../../dto/IPrologPlanningResponseDTO';
import IPrologPathPlanningRequestDTO from '../../dto/IPrologPlanningRequestDTO';
import IPrologPlanningByDayResponseDTO from '../../dto/IPrologPlanningByDayResponseDTO';
import IPrologPlanningByDayRequestDTO from '../../dto/IPrologPlanningByDayRequestDTO';

export default interface IPlanningRepo extends Repo<Planning> {
  save(path: Planning): Promise<Planning>;
  findByDomainId(pathId: string): Promise<Planning | null>;
  findAll(): Promise<Planning[]>;
  getPlanning(planningRequest: IPrologPathPlanningRequestDTO): Promise<IPrologPlanningResponseDTO>;
  getPlanningByDay(planningRequest: IPrologPlanningByDayRequestDTO): Promise<IPrologPlanningByDayResponseDTO[]>;
}
