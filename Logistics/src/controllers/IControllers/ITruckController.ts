import { Request, Response, NextFunction } from 'express';

/**
 * The available operations for the truck controller.
 */
export default interface ITruckController {
  /**
   * Creates a truck
   * @param req The request.
   * @param res The response.
   * @param next The next function on the HTTP pipeline.
   */
  createTruck(req: Request, res: Response, next: NextFunction);

  /**
   * Gets all the available trucks.
   * @param req The request.
   * @param res The response.
   * @param next The next function on the HTTP pipeline.
   */
  getAllTrucks(req: Request, res: Response, next: NextFunction);

  /**
   * Gets a truck based on its identifier.
   * @param req The request.
   * @param res The response.
   * @param next The next function on the HTTP pipeline.
   */
  getTruckById(req: Request, res: Response, next: NextFunction);

  editTruck(req: Request, res: Response, next: NextFunction);

  softDeleteTruckById(req: Request, res: Response, next: NextFunction);
}
