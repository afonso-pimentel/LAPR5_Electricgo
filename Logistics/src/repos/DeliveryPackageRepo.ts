import { Service, Inject } from 'typedi';

import IDeliveryPackageRepo from '../services/IRepos/IDeliveryPackageRepo';
import { DeliveryPackageMap } from '../mappers/DeliveryPackageMap';
import { DeliveryPackage } from '../domain/DeliveryPackageAggregate/DeliveryPackage';
import { DeliveryPackageId } from '../domain/DeliveryPackageAggregate/DeliveryPackageId';

import { Document, FilterQuery, Model } from 'mongoose';
import { IDeliveryPackagePersistence } from '../dataschema/IDeliveryPackagePersistence';

@Service()
export default class DeliveryPackageRepo implements IDeliveryPackageRepo {
  private models: any;

  constructor(
    @Inject('deliveryPackageSchema') private deliveryPackageSchema: Model<IDeliveryPackagePersistence & Document>,
  ) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(deliveryPackage: DeliveryPackage): Promise<boolean> {
    // const idX = deliveryPackage.id instanceof DeliveryPackageId ? (<DeliveryPackageId>deliveryPackage.id).toValue() : deliveryPackage.id;

    // const query = { domainId: idX };
    // const deliveryPackageDocument = await this.deliveryPackageSchema.findOne(query as FilterQuery<IDeliveryPackagePersistence & Document>);

    // return !!deliveryPackageDocument === true;
    return false; // TODO: implement
  }

  public async save(deliveryPackage: DeliveryPackage): Promise<DeliveryPackage> {
    const query = { domainId: deliveryPackage.id.toString() };

    const deliveryPackageDocument = await this.deliveryPackageSchema.findOne(query);

    try {
      if (deliveryPackageDocument === null) {
        const rawDeliveryPackage: any = DeliveryPackageMap.toPersistence(deliveryPackage);

        const deliveryPackageCreated = await this.deliveryPackageSchema.create(rawDeliveryPackage);

        return deliveryPackage;
        // return DeliveryPackageMap.toDomain(deliveryPackageCreated);
      } else {
        deliveryPackageDocument.deliveryId = deliveryPackage.deliveryId.toString();
        deliveryPackageDocument.loadTime = deliveryPackage.loadTime;
        deliveryPackageDocument.unloadTime = deliveryPackage.unloadTime;
        deliveryPackageDocument.x = deliveryPackage.position.x;
        deliveryPackageDocument.y = deliveryPackage.position.y;
        deliveryPackageDocument.z = deliveryPackage.position.z;

        await deliveryPackageDocument.save();

        return deliveryPackage;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(deliveryPackageId: DeliveryPackageId | string): Promise<DeliveryPackage> {
    const query = { domainId: deliveryPackageId };
    const deliveryPackageRecord = await this.deliveryPackageSchema.findOne(
      query as FilterQuery<IDeliveryPackagePersistence & Document>,
    );

    if (deliveryPackageRecord != null) {
      return DeliveryPackageMap.persistenceToDomain(deliveryPackageRecord);
    } else return null;
  }

  public async findAll(): Promise<DeliveryPackage[]> {
    const deliveryPackageRecordList = await this.deliveryPackageSchema.find();

    if (deliveryPackageRecordList != null) {
      return DeliveryPackageMap.persistenceToDomainList(deliveryPackageRecordList);
    } else return null;
  }

  public async findByDeliveryId(deliveryId: string): Promise<DeliveryPackage>{
    const query = { deliveryId: deliveryId };
    const deliveryPackageRecord = await this.deliveryPackageSchema.findOne(
      query as FilterQuery<IDeliveryPackagePersistence & Document>,
    );

    if (deliveryPackageRecord != null) {
      return DeliveryPackageMap.persistenceToDomain(deliveryPackageRecord);
    } else return null;
  }
}
