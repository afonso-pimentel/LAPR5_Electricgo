import { Result } from '../../core/logic/Result';
import IPlanningByDayRequestDTO from '../../dto/IPlanningByDayRequestDTO';
import IPlanningByDayResponseDTO from '../../dto/IPlanningByDayResponseDTO';
import IPlanningRequestDTO from '../../dto/IPlanningRequestDTO';
import IPlanningResponseDTO from '../../dto/IPlanningResponseDTO';
import IPrologPlanningRequestDTO from '../../dto/IPrologPlanningRequestDTO';

/**
 * Service for planning operations.
 */
export default interface IPlanningService {
  getPlanning(planningDTO: IPlanningRequestDTO): Promise<Result<IPlanningResponseDTO>>;
  getPlanningByDay(planningDTO: IPlanningByDayRequestDTO): Promise<Result<IPlanningByDayResponseDTO[]>>;
}
