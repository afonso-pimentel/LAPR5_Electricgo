import { Result } from '../../core/logic/Result';
import IPlanningByDayResponseDTO from '../../dto/IPlanningByDayResponseDTO';
import IPlanningRequestDTO from '../../dto/IPlanningRequestDTO';
import IPlanningResponseDTO from '../../dto/IPlanningResponseDTO';
import IPrologPlanningByDayRequestDTO from '../../dto/IPrologPlanningByDayRequestDTO';
import IPrologPlanningRequestDTO from '../../dto/IPrologPlanningRequestDTO';

/**
 * Strategy for planning operations.
 */
export default interface IPlanningStrategy {
  getPlanning(planningDTO: IPrologPlanningRequestDTO): Promise<IPlanningResponseDTO>;
  getPlanningByDay(planningDTO: IPrologPlanningByDayRequestDTO): Promise<IPlanningByDayResponseDTO[]>;
}
