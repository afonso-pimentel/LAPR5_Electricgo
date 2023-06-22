import IDeliveryDTO from "../../dto/IDeliveryDTO";

export default interface IDeliveryRepo{
    ifDeliveryExists(DeliveryId:string):Promise<boolean>;
    getDeliveriesForSpecificDate(DeliveryDate:string):Promise<IDeliveryDTO[]>;
}