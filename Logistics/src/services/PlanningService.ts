import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IPlanningService from './IServices/IPlanningService';
import IPlanningRequestDTO from '../dto/IPlanningRequestDTO';
import IPlanningResponseDTO from '../dto/IPlanningResponseDTO';
import IPathRepo from './IRepos/IPathRepo';
import IWarehouseRepo from './IRepos/IWarehouseRepo';
import IDeliveryPackageRepo from './IRepos/IDeliveryPackageRepo';
import IDeliveryRepo from './IRepos/IDeliveryRepo';
import { IWarehouseDTO } from '../dto/IWarehouseDTO';
import IPrologDeliveryRequestDTO from '../dto/IPrologDeliveryRequestDTO';
import { PathPlanningMap } from '../mappers/PathPlanningMap';
import IPlanningStrategy from '../strategies/IStrategies/IPlanningStrategy';
import IPlanningByDayRequestDTO from '../dto/IPlanningByDayRequestDTO';
import IPlanningByDayResponseDTO from '../dto/IPlanningByDayResponseDTO';
import ITruckRepo from './IRepos/ITruckRepo';

@Service()
export default class PlanningService implements IPlanningService {
  constructor(
    @Inject(config.strategies.planningStrategy.name) private planningStrategy: IPlanningStrategy,
    @Inject(config.repos.path.name) private pathRepo: IPathRepo,
    @Inject(config.repos.warehouse.name) private warehouseRepo: IWarehouseRepo,
    @Inject(config.repos.deliveryPackage.name) private deliveryPackageRepo: IDeliveryPackageRepo,
    @Inject(config.repos.delivery.name) private deliveryRepo: IDeliveryRepo,
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo,
  ) {}
  public async getPlanningByDay(planningDTO: IPlanningByDayRequestDTO): Promise<Result<IPlanningByDayResponseDTO[]>> {
    try {

      const deliveryDTOs = await this.deliveryRepo.getDeliveriesForSpecificDate(planningDTO.date);

      if (deliveryDTOs === null || deliveryDTOs.length === 0) {
        return Result.fail<IPlanningByDayResponseDTO[]>('No deliveries for the specified date.');
      }

      const listOfWarehouses = await this.warehouseRepo.listOfWarehouses();

      if (listOfWarehouses === null || listOfWarehouses.length === 0) {
        return Result.fail<IPlanningByDayResponseDTO[]>('No warehouses registered for the planning.');
      }

      const primaryWarehouse: IWarehouseDTO = listOfWarehouses.find(x => x.locality === 'Matosinhos');

      if (primaryWarehouse === undefined) {
        return Result.fail<IPlanningByDayResponseDTO[]>(
          `Primary warehouse in 'Matosinhos' was not found in list of warehouses.`,
        );
      }

      const listOfPaths = await this.pathRepo.findAll();

      if (listOfPaths === null || listOfPaths.length === 0) {
        return Result.fail<IPlanningByDayResponseDTO[]>('No list of paths registered for the planning.');
      }

      const prologDeliveriesDTO: IPrologDeliveryRequestDTO[] = [];

      for (const deliveryDTO of deliveryDTOs) {
        const deliveryPackage = await this.deliveryPackageRepo.findByDeliveryId(deliveryDTO.id);

        if (deliveryPackage === null) {
          return Result.fail<IPlanningByDayResponseDTO[]>(
            `Delivery package for delivery with ID ${deliveryDTO.id}. not found.`,
          );
        }

        const prologDeliveryDTO = PathPlanningMap.toPrologDeliveryRequestDTO(deliveryDTO, deliveryPackage);

        prologDeliveriesDTO.push(prologDeliveryDTO);
      }

      const listOfTrucks = await this.truckRepo.findAll();

      if (listOfTrucks === null || listOfTrucks.length === 0) {
        return Result.fail<IPlanningByDayResponseDTO[]>('No trucks registered for the planning.');
      }


      const prologPrimaryWarehouse = {
        id: primaryWarehouse.id,
        name: primaryWarehouse.locality,
      };

      const planningRequestDTO = PathPlanningMap.toPrologPlanningByDayRequestDTO(
        listOfTrucks,
        listOfWarehouses,
        listOfPaths,
        prologDeliveriesDTO,
        prologPrimaryWarehouse,
      );

      const planningResponse = await this.planningStrategy.getPlanningByDay(planningRequestDTO);

      return Result.ok<IPlanningByDayResponseDTO[]>(planningResponse);
    } catch (e) {
      throw e;
    }
  }

  public async getPlanning(planningDTO: IPlanningRequestDTO): Promise<Result<IPlanningResponseDTO>> {
    try {

      const deliveryDTOs = await this.deliveryRepo.getDeliveriesForSpecificDate(planningDTO.date);

      if (deliveryDTOs === null || deliveryDTOs.length === 0) {
        return Result.fail<IPlanningResponseDTO>('No deliveries for the specified date.');
      }

      const listOfWarehouses = await this.warehouseRepo.listOfWarehouses();

      if (listOfWarehouses === null || listOfWarehouses.length === 0) {
        return Result.fail<IPlanningResponseDTO>('No warehouses registered for the planning.');
      }

      const primaryWarehouse: IWarehouseDTO = listOfWarehouses.find(x => x.locality === 'Matosinhos');

      if (primaryWarehouse === undefined) {
        return Result.fail<IPlanningResponseDTO>(
          `Primary warehouse in 'Matosinhos' was not found in list of warehouses.`,
        );
      }

      const listOfPaths = await this.pathRepo.findAll();

      if (listOfPaths === null || listOfPaths.length === 0) {
        return Result.fail<IPlanningResponseDTO>('No list of paths registered for the planning.');
      }

      const prologDeliveriesDTO: IPrologDeliveryRequestDTO[] = [];

      for (const deliveryDTO of deliveryDTOs) {
        const deliveryPackage = await this.deliveryPackageRepo.findByDeliveryId(deliveryDTO.id);

        if (deliveryPackage === null) {
          return Result.fail<IPlanningResponseDTO>(
            `Delivery package for delivery with ID ${deliveryDTO.id}. not found.`,
          );
        }

        const prologDeliveryDTO = PathPlanningMap.toPrologDeliveryRequestDTO(deliveryDTO, deliveryPackage);

        prologDeliveriesDTO.push(prologDeliveryDTO);
      }

      const prologPrimaryWarehouse = {
        id: primaryWarehouse.id,
        name: primaryWarehouse.locality,
      };

      const planningRequestDTO = PathPlanningMap.toPrologPlanningRequestDTO(
        planningDTO.heuristic,
        listOfWarehouses,
        listOfPaths,
        prologDeliveriesDTO,
        prologPrimaryWarehouse,
      );

      const planningResponse = await this.planningStrategy.getPlanning(planningRequestDTO);

      return Result.ok<IPlanningResponseDTO>(planningResponse);
    } catch (e) {
      throw e;
    }
  }
}
