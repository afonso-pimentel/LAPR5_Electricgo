import { Service, Inject } from 'typedi';
import config from '../../config';
import { Result } from '../core/logic/Result';
import IDeliveryPackageRepo from './IRepos/IDeliveryPackageRepo';
import IDeliveryPackageService from './IServices/IDeliveryPackageService';

import IDeliveryPackageDTO from '../dto/IDeliveryPackageDTO';
import { DeliveryPackageMap } from '../mappers/DeliveryPackageMap';
import { DeliveryPackage } from '../domain/DeliveryPackageAggregate/DeliveryPackage';
import IDeliveryRepo from './IRepos/IDeliveryRepo';
import IDeliveryPackagePositionDTO from '../dto/IDeliveryPackagePositionDTO';
import { DeliveryPackageId } from '../domain/DeliveryPackageAggregate/DeliveryPackageId';
import { DeliveryPackagePosition } from '../domain/DeliveryPackageAggregate/DeliveryPackagePosition';
import { TextUtil } from '../utils/TextUtil';

@Service()
export default class DeliveryPackageService implements IDeliveryPackageService {
  constructor(
    @Inject(config.repos.deliveryPackage.name) private deliveryPackageRepo: IDeliveryPackageRepo,
    @Inject(config.repos.delivery.name) private deliveryRepo: IDeliveryRepo,
  ) {}

  public async getDeliveryPackageById(deliveryPackageId: string): Promise<Result<IDeliveryPackageDTO>> {
    try {
      const deliveryPackage = await this.deliveryPackageRepo.findByDomainId(deliveryPackageId);

      if (deliveryPackage === null) {
        return Result.fail<IDeliveryPackageDTO>('DeliveryPackage not found');
      } else {
        const deliveryPackageDTOResult = DeliveryPackageMap.toDTO(deliveryPackage) as IDeliveryPackageDTO;
        return Result.ok<IDeliveryPackageDTO>(deliveryPackageDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllDeliveryPackages(): Promise<Result<IDeliveryPackageDTO[]>> {
    try {
      const deliveryPackage = await this.deliveryPackageRepo.findAll();

      if (deliveryPackage === null) {
        return Result.fail<IDeliveryPackageDTO[]>('DeliveryPackage not found');
      } else {
        const deliveryPackagesDTOResult = DeliveryPackageMap.toDTOList(deliveryPackage) as IDeliveryPackageDTO[];
        return Result.ok<IDeliveryPackageDTO[]>(deliveryPackagesDTOResult);
      }
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Creates a new deliveryPackage
   * @param deliveryPackageDTO
   * @returns
   */
  public async createDeliveryPackage(deliveryPackageDTO: IDeliveryPackageDTO): Promise<Result<IDeliveryPackageDTO>> {
    try {

      if(!TextUtil.isUUID(deliveryPackageDTO.deliveryId)){
        return Result.fail<IDeliveryPackageDTO>('DeliveryId is not a valid UUID');
      }

      if(!(await this.deliveryRepo.ifDeliveryExists(deliveryPackageDTO.deliveryId))){
        return Result.fail<IDeliveryPackageDTO>('Delivery does not exist');
      }

      // creates a new deliveryPackage object
      const deliveryPackageOrError = DeliveryPackage.create(DeliveryPackageMap.dtoToDomain(deliveryPackageDTO));

      if (deliveryPackageOrError.isFailure) {
        return Result.fail<IDeliveryPackageDTO>(deliveryPackageOrError.errorValue());
      }

      // gets the created deliveryPackage object
      const deliveryPackageResult = deliveryPackageOrError.getValue();

      // saves the deliveryPackage object to the database
      await this.deliveryPackageRepo.save(deliveryPackageResult);

      const deliveryPackageDTOResult = DeliveryPackageMap.toDTO(deliveryPackageResult) as IDeliveryPackageDTO;
      return Result.ok<IDeliveryPackageDTO>(deliveryPackageDTOResult);
    } catch (e) {
      throw e;
    }
  }

  public async updateDeliveryPackagePosition(deliveryPackageId: string, position: IDeliveryPackagePositionDTO): Promise<Result<IDeliveryPackageDTO>> {
    try {

      const deliveryPackage = (await this.deliveryPackageRepo.findByDomainId(new DeliveryPackageId(deliveryPackageId))) as DeliveryPackage;

      if (deliveryPackage === null) {
        return Result.fail<IDeliveryPackageDTO>('DeliveryPackage not found');
      }

      const deliveryPackagePosition = DeliveryPackagePosition.create(position);

      if (deliveryPackagePosition.isFailure) {
        return Result.fail<IDeliveryPackageDTO>(deliveryPackagePosition.errorValue());
      }

      deliveryPackage.updatePosition(deliveryPackagePosition.getValue());

      await this.deliveryPackageRepo.save(deliveryPackage);

      const deliveryPackageDTOResult = DeliveryPackageMap.toDTO(deliveryPackage) as IDeliveryPackageDTO;
      return Result.ok<IDeliveryPackageDTO>(deliveryPackageDTOResult);
    } catch (e) {
      throw e;
    }
  }

  /**
   * @description Creates a new path
   * @param pathDTO
   * @returns
   */
   public async createDeliveryPackages(deliveryPackageDTOs: IDeliveryPackageDTO[]): Promise<Result<IDeliveryPackageDTO[]>> {
    try {
      const deliveryPackageDTOsToReturn: IDeliveryPackageDTO[] = [];

      for (const deliveryPackageDTO of deliveryPackageDTOs) {
        
        if(!TextUtil.isUUID(deliveryPackageDTO.deliveryId)){
          return Result.fail<IDeliveryPackageDTO[]>('DeliveryId is not a valid UUID');
        }
  
        if(!(await this.deliveryRepo.ifDeliveryExists(deliveryPackageDTO.deliveryId))){
          return Result.fail<IDeliveryPackageDTO[]>('Delivery does not exist');
        }
  
        // creates a new deliveryPackage object
        const deliveryPackageOrError = DeliveryPackage.create(DeliveryPackageMap.dtoToDomain(deliveryPackageDTO));
  
        if (deliveryPackageOrError.isFailure) {
          return Result.fail<IDeliveryPackageDTO[]>(deliveryPackageOrError.errorValue());
        }
  
        // gets the created deliveryPackage object
        const deliveryPackageResult = deliveryPackageOrError.getValue();
  
        // saves the deliveryPackage object to the database
        await this.deliveryPackageRepo.save(deliveryPackageResult);
  
        const deliveryPackageDTOResult = DeliveryPackageMap.toDTO(deliveryPackageResult) as IDeliveryPackageDTO;
        
        deliveryPackageDTOsToReturn.push(deliveryPackageDTOResult);
      }

      return Result.ok<IDeliveryPackageDTO[]>(deliveryPackageDTOsToReturn);
    } catch (e) {
      throw e;
    }
  }
}
