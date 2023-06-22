/**
 * Prolog planning request DTO.
 */
 export default interface IPrologPlanningResponseDTO {
    listaOrdemEntregas: string[];
    listaOrdemArmazens: string[];
    listaCarregamentosArmazem: string[];
    listaQuantidadesCarregamento: string[];
    listaTemposCarregamentoArmazem: string[];
    custo: number;
  }
  
  