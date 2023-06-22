/**
 * Prolog planning request DTO.
 */
 export default interface IPrologPlanningByDayResponseDTO {
    camiao: string;
    listaOrdemEntregas: string[];
    listaOrdemArmazens: string[];
    listaCarregamentosArmazem: string[];
    listaQuantidadesCarregamento: string[];
    listaTemposCarregamentoArmazem: string[];
    custo: number;
  }

