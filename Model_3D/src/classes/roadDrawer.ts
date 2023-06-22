import { Warehouse } from "./warehouse";
import { ArcObj } from "../objects/roads/arcObj";
import * as THREE from "three";
import { VectorHelper } from "../utils/vectorHelper";

export class RoadDrawer {
  /**
   * Generate list of roads to draw
   * @param warehouses
   * @returns
   */
  public static generateRoads(warehouses: Warehouse[]) {
    const arcObjs: THREE.Mesh[] = [];

    // extract all routes from warehouses
    let routes: THREE.Vector3[][] = [];
    warehouses.forEach((warehouse) => {
      warehouse.paths.forEach((path) => {
        routes.push(path.route);
      });
    });

    // remove route if there is another route with same start and end position

    let newRoutes: THREE.Vector3[][] = [];
    routes.forEach((route) => {
      let isUnique = true;
      newRoutes.forEach((newRoute) => {
        if (VectorHelper.compareVector3Arrays(newRoute, route)) {
          isUnique = false;
        }
      });

      if (isUnique) {
        newRoutes.push(route);
      }
    });

    // create ramp for each route
    newRoutes.forEach((route) => {
      arcObjs.push(...ArcObj.createArcObjs(route));
    });

    return arcObjs;
  }
}
