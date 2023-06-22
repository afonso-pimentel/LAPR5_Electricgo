export default interface IPathDTO {
  id: string;
  startWarehouse: string;
  endWarehouse: string;
  distance: number;
  pathTime: number;
  spentEnergy: number;
  extraChargeTime: number;
}
