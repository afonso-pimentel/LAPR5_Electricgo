export interface GetTruckResponseDto {
  id: string;
  tare: number;
  loadCapacity: number;
  fullLoadAutonomy: number;
  capacity: number;
  fastChargeTime: number;
  slowChargeTime: number;
  licensePlate: string;
  isActive: boolean;
}
