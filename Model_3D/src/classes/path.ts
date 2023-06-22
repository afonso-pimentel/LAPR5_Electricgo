import { PathDto } from "../dtos/path";
import { Warehouse } from "./warehouse";

export class Path {
  public startWarehouseId: string;
  public endWarehouseId: string;
  public startPosition: THREE.Vector3;
  public endPosition: THREE.Vector3;
  public route: THREE.Vector3[];

  constructor(
    startWarehouseId: string,
    endWarehouseId: string,
    startPosition: THREE.Vector3,
    endPosition: THREE.Vector3,
    route: THREE.Vector3[]
  ) {
    this.startWarehouseId = startWarehouseId;
    this.endWarehouseId = endWarehouseId;
    this.startPosition = startPosition;
    this.endPosition = endPosition;
    this.route = route;
  }

  /**
   * returns true if start and end position of path are equal or mirrored
   * @param path
   * @returns
   */
  public isEqualOrInverted(path: Path): boolean {
    return (
      (this.startWarehouseId === path.startWarehouseId &&
        this.endWarehouseId === path.endWarehouseId) ||
      (this.startWarehouseId === path.endWarehouseId &&
        this.endWarehouseId === path.startWarehouseId)
    );
  }

  public getSecondPoint(): THREE.Vector3 {
    return this.route[1];
  }

  /**
   * return an array of Path objects from paths and warehouses data
   * @param pathsData
   * @param warehousesData
   * @returns
   */
  public static dataToPathList(
    pathsData: PathDto[],
    warehousesData: Warehouse[]
  ) {
    let pathList: Path[] = [];
    pathsData.forEach((pathData: PathDto) => {
      let startPosition = undefined;
      let endPosition = undefined;

      warehousesData.forEach((warehouseData: Warehouse) => {
        if (warehouseData.id === pathData.startWarehouse) {
          startPosition = warehouseData.position;
        }
        if (warehouseData.id === pathData.endWarehouse) {
          endPosition = warehouseData.position;
        }
      });

      if (startPosition && endPosition) {
        pathList.push(
          new Path(
            pathData.startWarehouse,
            pathData.endWarehouse,
            startPosition,
            endPosition,
            [startPosition, endPosition]
          )
        );
      }
    });

    return pathList;
  }

  /**
   * get all paths from warehouses with given id
   * @param warehouseId
   * @param pathList
   * @returns
   */
  public static pathByStartWarehouseId(
    warehouseId: string,
    pathList: Path[]
  ): Path[] {
    return pathList.filter(
      (path: Path) => path.startWarehouseId === warehouseId
    );
  }
}
