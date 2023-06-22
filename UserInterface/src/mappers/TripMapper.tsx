import TripDto from "../dtos/Trip/TripDto";
import { Delivery } from "../models/Delivery";
import { Trip } from "../models/Trip";
import { TripStep } from "../models/TripStep";
import { Truck } from "../models/Truck";
import { Warehouse } from "../models/Warehouse";

function GetResponseToModel(response: TripDto, warehouses: Array<Warehouse>, deliveries: Array<Delivery>, trucks: Array<Truck>): Trip {
    var steps: Array<TripStep> = [];
    for (let index = 0; index < response.warehouseIds.length; index++) {
        steps.push({
            order: index+1,
            warehouse: warehouses.find((item: Warehouse) => item.id == response.warehouseIds[index]) as Warehouse,
            delivery: deliveries.find((item: Delivery) => item.id == response.deliveryIds[index]) as Delivery,
            isWarehousesToCharge: response.areWarehousesToCharge[index] as boolean,
            chargeQuantity: response.chargeQuantities[index],
            chargeTime: response.chargeTimes[index],
        } as TripStep);
    }
    return {
        id: response.id,
        truck: trucks.find((item: Truck) => item.id == response.truckId) as Truck,
        date: response.date,
        steps: steps,
    } as Trip;
}

function GetResponseArrayToModelArray(response: TripDto[], warehouses: Array<Warehouse>, deliveries: Array<Delivery>, trucks: Array<Truck>): Trip[] {
    if(response == null || response == undefined || !response) return [];
    return response.map((item: TripDto) => {
        return GetResponseToModel(item, warehouses, deliveries, trucks) as Trip;
    });
}

/*
function FormToPostRequest(data: any) : PostTripRequestDto{
    return {
        id: data.id,
        warehouseId: data.warehouseId,
        TripDate: new Date(data.TripDate),
        load: parseInt(data.load?.toString() ?? "0"),
    } as any as PostTripRequestDto;
}*/

export {
    GetResponseToModel,
    GetResponseArrayToModelArray,
}
