import { Request, Response, NextFunction } from 'express';

export default interface ITripController {
  /**
   * Creates a trip.
   * @param req The request.
   * @param res The response.
   * @param next The next function call in the middleware.
   */
  createTrip(req: Request, res: Response, next: NextFunction);

  /**
   * Gets all trips in a paginated manner.
   * @param req The request.
   * @param res The response.
   * @param next The next function call in the middleware.
   */
  getTripsWithPagination(req: Request, res: Response, next: NextFunction);
  //   editTrip(req: Request, res: Response, next: NextFunction);
  //   getTrips(req: Request, res: Response, next: NextFunction);
  //   getTripsById(req: Request, res: Response, next: NextFunction);
}
