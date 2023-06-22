import { Service } from 'typedi';
import { Result } from '../../core/logic/Result';
import IPlanningByDayResponseDTO from '../../dto/IPlanningByDayResponseDTO';
import IPlanningRequestDTO from '../../dto/IPlanningRequestDTO';
import IPlanningResponseDTO from '../../dto/IPlanningResponseDTO';
import IPrologPlanningResponseDTO from '../../dto/IPrologPlanningResponseDTO';
import IPrologPlanningByDayRequestDTO from '../../dto/IPrologPlanningByDayRequestDTO';
import IPrologPlanningRequestDTO from '../../dto/IPrologPlanningRequestDTO';
import { PathPlanningMap } from '../../mappers/PathPlanningMap';
import IPlanningStrategy from '../IStrategies/IPlanningStrategy';
import IPrologPlanningByDayResponseDTO from '../../dto/IPrologPlanningByDayResponseDTO';

@Service()
export default class SimulatedPlanningStrategy implements IPlanningStrategy {
  public async getPlanningByDay(planningDTO: IPrologPlanningByDayRequestDTO): Promise<IPlanningByDayResponseDTO[]> {
    try {
      const planningResponseDTO = ([{
        truck: "truckX",
        listaOrdemEntregas: [
            "47fb76c8-6a38-4742-a991-00d374221e7b",
            "aeba6553-d915-42ef-82d0-a0a528b5ac54",
            "f52f2735-caff-45ae-a210-54370a80800f",
            "10f1bcbb-a370-4040-9461-6ce184a918ce",
            "872a025e-2d6f-4e06-b159-52f4757d7a06",
            "d8408472-0758-4195-ad5d-41a55f4cd256",
            "8e412c75-e29e-4dde-8b5d-4993c9a0336d"
        ],
        listaOrdemArmazens: [
            "ef6ff355-bdb1-4c10-b5ad-6d45bf1ab958",
            "68699020-a01e-4b50-bb19-8e041f6d1a75",
            "c2b7777d-6ba1-40c4-9fbe-470ddc165393",
            "bc6b0307-3531-42f2-864d-9f5d74b13789",
            "ed904a97-3463-4b08-aea7-cb28d743f3c7",
            "fcdf630f-c87e-4c16-9ccf-b01632793549",
            "00e6e562-683e-4057-af59-24b35c6ce09a"
        ],
        listaCarregamentosArmazem: [
            "68699020-a01e-4b50-bb19-8e041f6d1a75",
            "c2b7777d-6ba1-40c4-9fbe-470ddc165393",
            "ed904a97-3463-4b08-aea7-cb28d743f3c7",
            "fcdf630f-c87e-4c16-9ccf-b01632793549",
            "00e6e562-683e-4057-af59-24b35c6ce09a"
        ],
        listaQuantidadesCarregamento: [
            46.96610169491525,
            49.355932203389834,
            41.74576271186441,
            9.491525423728817,
            28.906779661016955
        ],
        listaTemposCarregamentoArmazem: [
            58.70762711864407,
            61.694915254237294,
            52.18220338983051,
            11.86440677966102,
            36.1334745762712
        ],
        custo: 887.5072033898304
    },
    {
      truck: "truckY",
      listaOrdemEntregas: [
          "47fb76c8-6a38-4742-a991-00d374221e7b",
          "aeba6553-d915-42ef-82d0-a0a528b5ac54",
          "f52f2735-caff-45ae-a210-54370a80800f",
          "10f1bcbb-a370-4040-9461-6ce184a918ce",
          "872a025e-2d6f-4e06-b159-52f4757d7a06",
      ],
      listaOrdemArmazens: [
          "ef6ff355-bdb1-4c10-b5ad-6d45bf1ab958",
          "68699020-a01e-4b50-bb19-8e041f6d1a75",
          "c2b7777d-6ba1-40c4-9fbe-470ddc165393",
          "bc6b0307-3531-42f2-864d-9f5d74b13789",
          "ed904a97-3463-4b08-aea7-cb28d743f3c7",
      ],
      listaCarregamentosArmazem: [
          "68699020-a01e-4b50-bb19-8e041f6d1a75",
          "c2b7777d-6ba1-40c4-9fbe-470ddc165393",
          "ed904a97-3463-4b08-aea7-cb28d743f3c7",
          "fcdf630f-c87e-4c16-9ccf-b01632793549",
          "00e6e562-683e-4057-af59-24b35c6ce09a"
      ],
      listaQuantidadesCarregamento: [
          46.96610169491525,
          49.355932203389834,
          41.74576271186441,
      ],
      listaTemposCarregamentoArmazem: [
          58.70762711864407,
          61.694915254237294,
          52.18220338983051,
      ],
      custo: 487.5072033898304
      }] as unknown) as IPrologPlanningByDayResponseDTO[];

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
      const planningResponseDTO = ({
        listaOrdemEntregas: ['1'],
        listaOrdemArmazens: ['1'],
        listaCarregamentosArmazem: ['1'],
        listaQuantidadesCarregamento: ['1'],
        listaTemposCarregamentoArmazem: ['1'],
        custo: 33,
      } as unknown) as IPrologPlanningResponseDTO;

      const response = PathPlanningMap.toPlanningResponse(planningResponseDTO);

      return response;
    } catch (e) {
      throw e;
    }
  }
}
