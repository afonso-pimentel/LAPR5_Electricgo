export interface ITruckPersistence {
  domainId: string;
  tare: number;
  loadCapacity: number;
  fullLoadAutonomy: number;
  capacity: number;
  fastChargeTime: number;
  slowChargeTime: number;
  licensePlate: string;
  isActive: boolean;
}
