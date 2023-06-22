import { Path } from "./path";
import { Warehouse } from "./warehouse";
import { MathHelper } from "../utils/mathHelper";
import { Config } from "../config/config";

export class PathBuilder {
  /**
   * Simple version of path builder that does not take path intersections into account
   * @param warehouses
   * @param paths
   * @returns
   */
  public static buildPathsForWarehouses(
    warehouses: Warehouse[],
    paths: Path[]
  ): Warehouse[] {
    warehouses.forEach((warehouse) => {
      // assign path to warehouse
      warehouse.paths = Path.pathByStartWarehouseId(warehouse.id, paths);
    });

    warehouses.forEach((warehouse) => {
      // filter all paths that are connected to warehouse
      let warehouseId = warehouse.id;
      let connectedPaths: Path[] = [];
      warehouses.forEach(() => {
        connectedPaths = paths.filter((path) => {
          return (
            path.startWarehouseId === warehouseId ||
            path.endWarehouseId === warehouseId
          );
        });
      });

      // remove duplicate paths with isEqualOrInverted
      connectedPaths = connectedPaths.filter((path, index, self) => {
        return self.findIndex((t) => t.isEqualOrInverted(path)) === index;
      });

      warehouse.numConnected = connectedPaths.length;
    });

    warehouses.forEach((warehouse) => {
      warehouse.paths.forEach((path) => {
        let firstConnect = MathHelper.getPointAtDistanceProjectedOnPlaneY(
          path.startPosition,
          path.endPosition,
          Config.connect.kOfConnect + Config.rotunda.kOfCircle
        );

        let secondConnect = MathHelper.getPointAtDistanceProjectedOnPlaneY(
          path.endPosition,
          path.startPosition,
          Config.connect.kOfConnect + Config.rotunda.kOfCircle
        );

        path.route = [
          path.startPosition,
          firstConnect,
          secondConnect,
          path.endPosition,
        ];
      });
    });

    warehouses.forEach((warehouse) => {
      warehouse.setConnectEndPoints(warehouses);
      warehouse.setDisplacedPosition();
    });

    return warehouses;
  }
}
