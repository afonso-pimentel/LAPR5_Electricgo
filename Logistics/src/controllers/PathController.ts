import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IPathController from './IControllers/IPathController';
import IPathService from '../services/IServices/IPathService';
import IPathDTO from '../dto/IPathDTO';

import { Result } from '../core/logic/Result';
import IEditPathDTO from '../dto/IEditPathDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class PathController implements IPathController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.path.name) private pathServiceInstance: IPathService) {}

  /**
   * Controller for creating a new path and returning the created path or an error message in the response, if an awful error occurs it gets returned in the next function
   * @param req
   * @param res
   * @param next
   * @returns
   */
  public async createPath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = (await this.pathServiceInstance.createPath(req.body as IPathDTO)) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(400).send(pathOrError.errorValue());
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getPathsWithPagination(req: Request, res: Response, next: NextFunction) {
    try {
      const page = ((req.query.page as unknown) as number) || 0;
      const limit = ((req.query.limit as unknown) as number) || 10;
      const pathOrError = (await this.pathServiceInstance.getPathsWithPagination(page, limit)) as Result<
        [IPathDTO[], number]
      >;

      if (pathOrError.isFailure) {
        return res.status(400).send();
      }

      const [paths, totalPaths] = pathOrError.getValue();
      const totalPageCount = Math.ceil(totalPaths / limit);
      return res
        .json({
          paths,
          totalPageCount,
        })
        .status(200);
    } catch (e) {
      return next(e);
    }
  }

  public async getPaths(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = (await this.pathServiceInstance.getPaths()) as Result<IPathDTO[]>;

      if (pathOrError.isFailure) {
        return res.status(400).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async getPathsById(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = (await this.pathServiceInstance.getPath(req.params.id)) as Result<IPathDTO>;

      if (pathOrError.isFailure) {
        return res.status(400).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async editPath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = (await this.pathServiceInstance.editPath(req.params.id, req.body as IEditPathDTO)) as Result<
        IPathDTO
      >;

      if (pathOrError.isFailure) {
        return res.status(404).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.json(pathDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }
}
