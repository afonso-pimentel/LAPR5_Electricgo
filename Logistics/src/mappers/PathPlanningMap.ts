import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IDeliveryPackagePersistence } from '../dataschema/IDeliveryPackagePersistence';
import IDeliveryPackageDTO from '../dto/IDeliveryPackageDTO';
import { DeliveryPackage } from '../domain/DeliveryPackageAggregate/DeliveryPackage';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { DeliveryPackagePosition } from '../domain/DeliveryPackageAggregate/DeliveryPackagePosition';
import { DeliveryId } from '../domain/DeliveryPackageAggregate/DeliveryId';
import { IWarehouseDTO } from '../dto/IWarehouseDTO';
import { Path } from '../domain/PathAggregate/Path';
import IPrologWarehousePlanningRequestDTO from '../dto/IPrologWarehousePlanningRequestDTO';
import IPrologPathPlanningRequestDTO from '../dto/IPrologPathPlanningRequestDTO';
import IPrologPlanningRequestDTO from '../dto/IPrologPlanningRequestDTO';
import IDeliveryDTO from '../dto/IDeliveryDTO';
import IPrologDeliveryRequestDTO from '../dto/IPrologDeliveryRequestDTO';
import IPrologPrimaryWarehousePlanningRequestDTO from '../dto/IPrologPrimaryWarehousePlanningRequestDTO';
import IPrologPlanningResponseDTO from '../dto/IPrologPlanningResponseDTO';
import IPlanningResponseDTO from '../dto/IPlanningResponseDTO';
import IPrologPlanningByDayRequestDTO from '../dto/IPrologPlanningByDayRequestDTO';
import { Truck } from '../domain/TruckAggregate/Truck';
import IPrologTruckPlanningRequestDTO from '../dto/IPrologTruckPlanningRequestDTO';
import IPrologPlanningByDayResponseDTO from '../dto/IPrologPlanningByDayResponseDTO';
import IPlanningByDayResponseDTO from '../dto/IPlanningByDayResponseDTO';

export class PathPlanningMap extends Mapper<DeliveryPackage> {
  public static toDTOList(deliveryPackages: DeliveryPackage[]): IDeliveryPackageDTO[] {
    return deliveryPackages.map(deliveryPackage => this.toDTO(deliveryPackage));
  }

  public static toDTO(deliveryPackage: DeliveryPackage): IDeliveryPackageDTO {
    return {
      id: deliveryPackage.id.toString(),
      deliveryId: deliveryPackage.deliveryId.toString(),
      loadTime: deliveryPackage.loadTime,
      unloadTime: deliveryPackage.unloadTime,
      x: deliveryPackage.position.x,
      y: deliveryPackage.position.y,
      z: deliveryPackage.position.z,
    } as IDeliveryPackageDTO;
  }

  public static dtoToDomain(deliveryPackage: IDeliveryPackageDTO): DeliveryPackage {
    return ({
      id: deliveryPackage.id,
      deliveryId: DeliveryId.create({ value: deliveryPackage.deliveryId }).getValue(),
      loadTime: deliveryPackage.loadTime,
      unloadTime: deliveryPackage.unloadTime,
      position: DeliveryPackagePosition.create({
        x: deliveryPackage.x,
        y: deliveryPackage.y,
        z: deliveryPackage.z,
      }).getValue(),
    } as unknown) as DeliveryPackage;
  }

  public static toDomain(deliveryPackage: any | Model<IDeliveryPackagePersistence & Document>): DeliveryPackage {
    const deliveryPackageOrError = DeliveryPackage.create(
      deliveryPackage,
      new UniqueEntityID(deliveryPackage.domainId),
    );

    deliveryPackageOrError.isFailure ? console.log(deliveryPackageOrError.error) : '';

    return deliveryPackageOrError.isSuccess ? deliveryPackageOrError.getValue() : null;
  }

  // persistence to domain list
  public static persistenceToDomainList(deliveryPackages: any[]): DeliveryPackage[] {
    return deliveryPackages.map(deliveryPackage => this.persistenceToDomain(deliveryPackage));
  }

  public static persistenceToDomain(
    deliveryPackage: any | Model<IDeliveryPackagePersistence & Document>,
  ): DeliveryPackage {
    const deliveryId = DeliveryId.create({
      value: deliveryPackage.deliveryId,
    });
    if (deliveryId.isFailure) {
      return null;
    }
    const position = DeliveryPackagePosition.create({
      x: deliveryPackage.x,
      y: deliveryPackage.y,
      z: deliveryPackage.z,
    });
    if (position.isFailure) {
      return null;
    }

    const deliveryPackageOrError = DeliveryPackage.create(
      {
        deliveryId: deliveryPackage.deliveryId,
        loadTime: deliveryPackage.loadTime,
        unloadTime: deliveryPackage.unloadTime,
        position: position.getValue(),
      },
      new UniqueEntityID(deliveryPackage.domainId),
    );

    return (deliveryPackageOrError.isFailure ? null : deliveryPackageOrError.getValue()) as DeliveryPackage;
  }

  public static toPrologWarehouseDTO(listOfWarehouseDTOs: IWarehouseDTO[]): IPrologWarehousePlanningRequestDTO[] {
    const prologWarehouseDTOsToReturn: IPrologWarehousePlanningRequestDTO[] = [];

    for (const warehouseDTO of listOfWarehouseDTOs) {
      const prologWarehouseDTO = {
        id: warehouseDTO.id,
        name: warehouseDTO.locality,
      } as IPrologWarehousePlanningRequestDTO;

      prologWarehouseDTOsToReturn.push(prologWarehouseDTO);
    }

    return prologWarehouseDTOsToReturn;
  }

  public static toPrologTruckDTO(trucks: Truck[]): IPrologTruckPlanningRequestDTO[] {
    const prologTruckDTOsToReturn: IPrologTruckPlanningRequestDTO[] = [];

    for (const truck of trucks) {
      const prologTruckDTO = {
        id: truck.id.toString(),
      } as IPrologTruckPlanningRequestDTO;

      prologTruckDTOsToReturn.push(prologTruckDTO);
    }

    return prologTruckDTOsToReturn;
  }

  public static toPrologPathDTO(listOfPaths: Path[]): IPrologPathPlanningRequestDTO[] {
    const prologPathDTOsToReturn: IPrologPathPlanningRequestDTO[] = [];

    for (const path of listOfPaths) {
      const prologPathDTO = {
        originId: path.startWarehouse.toString(),
        destinationId: path.endWarehouse.toString(),
        distance: path.distance,
        time: path.pathTime,
        energy: path.spentEnergy,
        extraTime: path.extraChargeTime,
      } as IPrologPathPlanningRequestDTO;

      prologPathDTOsToReturn.push(prologPathDTO);
    }

    return prologPathDTOsToReturn;
  }

  public static toPrologPlanningRequestDTO(
    heuristic: string,
    listOfWarehouseDTOs: IWarehouseDTO[],
    listOfPaths: Path[],
    prologDeliveryDTOs: IPrologDeliveryRequestDTO[],
    prologPrimaryWarehouse: IPrologPrimaryWarehousePlanningRequestDTO,
  ): IPrologPlanningRequestDTO {
    const prologWarehouseDTOs = this.toPrologWarehouseDTO(listOfWarehouseDTOs);
    const prologPathDTOs = this.toPrologPathDTO(listOfPaths);

    const prologPlanningRequestDTO = {
      heuristic: heuristic,
      warehouses: prologWarehouseDTOs,
      paths: prologPathDTOs,
      deliveries: prologDeliveryDTOs,
      primaryWarehouse: prologPrimaryWarehouse,
    } as IPrologPlanningRequestDTO;

    return prologPlanningRequestDTO;
  }

  public static toPrologPlanningByDayRequestDTO(
    listOfTrucks: Truck[],
    listOfWarehouseDTOs: IWarehouseDTO[],
    listOfPaths: Path[],
    prologDeliveryDTOs: IPrologDeliveryRequestDTO[],
    prologPrimaryWarehouse: IPrologPrimaryWarehousePlanningRequestDTO,
  ): IPrologPlanningByDayRequestDTO {
    const prologWarehouseDTOs = this.toPrologWarehouseDTO(listOfWarehouseDTOs);
    const prologPathDTOs = this.toPrologPathDTO(listOfPaths);
    const prologTrucks = this.toPrologTruckDTO(listOfTrucks);
    const prologPlanningRequestDTO = {
      trucks: prologTrucks,
      warehouses: prologWarehouseDTOs,
      paths: prologPathDTOs,
      deliveries: prologDeliveryDTOs,
      primaryWarehouse: prologPrimaryWarehouse,
    } as IPrologPlanningByDayRequestDTO;

    return prologPlanningRequestDTO;
  }


  public static toPrologDeliveryRequestDTO(
    delivery: IDeliveryDTO,
    deliveryPackage: DeliveryPackage,
  ): IPrologDeliveryRequestDTO {
    const prologDeliveryRequestDTO = {
      id: delivery.id,
      date: delivery.deliveryDate,
      load: delivery.load,
      warehouseId: delivery.warehouseId,
      loadTime: deliveryPackage.loadTime,
      unloadtime: deliveryPackage.unloadTime,
    } as IPrologDeliveryRequestDTO;

    return prologDeliveryRequestDTO;
  }

  public static toPlanningResponse(prologPlanningResponse: IPrologPlanningResponseDTO): IPlanningResponseDTO {
    return {
      listOrderDeliveries: prologPlanningResponse.listaOrdemEntregas,
      listOrderWarehouses: prologPlanningResponse.listaOrdemArmazens,
      listWarehousesToCharge: prologPlanningResponse.listaCarregamentosArmazem,
      listWarehousesQuantityToCharge: prologPlanningResponse.listaQuantidadesCarregamento,
      listWarehousesTimeToCharge: prologPlanningResponse.listaTemposCarregamentoArmazem,
      planningCost: prologPlanningResponse.custo,
    } as IPlanningResponseDTO;
  }

  public static toPlanningByDayResponse(prologPlanningResponse: IPrologPlanningByDayResponseDTO): IPlanningByDayResponseDTO {
    return {
      truck: prologPlanningResponse.camiao,
      listOrderDeliveries: prologPlanningResponse.listaOrdemEntregas,
      listOrderWarehouses: prologPlanningResponse.listaOrdemArmazens,
      listWarehousesToCharge: prologPlanningResponse.listaCarregamentosArmazem,
      listWarehousesQuantityToCharge: prologPlanningResponse.listaQuantidadesCarregamento,
      listWarehousesTimeToCharge: prologPlanningResponse.listaTemposCarregamentoArmazem,
      planningCost: prologPlanningResponse.custo,
    } as IPlanningByDayResponseDTO;
  }

  public static toPersistence(deliveryPackage: DeliveryPackage): any {
    return {
      domainId: deliveryPackage.id.toString(),
      deliveryId: deliveryPackage.deliveryId,
      loadTime: deliveryPackage.loadTime,
      unloadTime: deliveryPackage.unloadTime,
      x: deliveryPackage.position.x,
      y: deliveryPackage.position.y,
      z: deliveryPackage.position.z,
    };
  }
}
