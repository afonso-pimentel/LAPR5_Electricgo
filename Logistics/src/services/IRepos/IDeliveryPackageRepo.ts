import { Repo } from '../../core/infra/Repo';
import { DeliveryPackage } from '../../domain/DeliveryPackageAggregate/DeliveryPackage';
import { DeliveryPackageId } from '../../domain/DeliveryPackageAggregate/DeliveryPackageId';

export default interface IDeliveryPackageRepo extends Repo<DeliveryPackage> {
  save(deliveryPackage: DeliveryPackage): Promise<DeliveryPackage>;
  findByDomainId(deliveryPackageId: DeliveryPackageId | string): Promise<DeliveryPackage>;
  findAll(): Promise<DeliveryPackage[]>;
  //saveCollection (deliveryPackages: DeliveryPackage[]): Promise<DeliveryPackage[]>;
  //removeByDeliveryPackageIds (deliveryPackages: DeliveryPackageId[]): Promise<any>
  findByDomainId(deliveryPackageId: DeliveryPackageId): Promise<DeliveryPackage>;
  findByDeliveryId(deliveryId: string): Promise<DeliveryPackage>;
}
