 /**
   * Path data structure for prolog planning request.
   */
  export default interface IPrologPathPlanningRequestDTO{
    originId: string,
    destinationId: string,
    distance: number,
    time: number,
    energy: number,
    extraTime: number
  }