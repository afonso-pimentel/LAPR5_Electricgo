import { Result } from '../../core/logic/Result';
import IDeliveryPackageDTO from '../../dto/IDeliveryPackageDTO';
import IDeliveryPackagePositionDTO from '../../dto/IDeliveryPackagePositionDTO';

export default interface IDeliveryPackageService {
  createDeliveryPackage(deliveryPackageDTO: IDeliveryPackageDTO): Promise<Result<IDeliveryPackageDTO>>;
  getDeliveryPackageById(deliveryPackageId: string): Promise<Result<IDeliveryPackageDTO>>;
  updateDeliveryPackagePosition(
    deliveryPackageId: string,
    deliveryPackagePosition: IDeliveryPackagePositionDTO,
  ): Promise<Result<IDeliveryPackageDTO>>;
  getAllDeliveryPackages(): Promise<Result<IDeliveryPackageDTO[]>>;
  createDeliveryPackages(deliveryPackageDTOs: IDeliveryPackageDTO[]): Promise<Result<IDeliveryPackageDTO[]>>;
}
