/**
 * Data transfer object for a prolog delivery request.
 */
 export default interface IPrologDeliveryRequestDTO {
    id: string;
    date: string;
    load: number;
    warehouseId: string;
    loadTime: number;
    unloadtime: number;
  }