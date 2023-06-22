/**
 * Data transfer object for a delivery.
 */
export default interface IDeliveryDTO {
    id: string;
    warehouseId: string;
    deliveryDate: string;
    load: number;
  }