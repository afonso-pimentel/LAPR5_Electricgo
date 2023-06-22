/**
 * Request DTO to obtain the planning for a given truck in a given day.
 */
export default interface IPlanningRequestDTO {
  truckId: string;
  date: string;
  heuristic: string;
}
