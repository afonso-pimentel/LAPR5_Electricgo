import * as THREE from "three";
import { Config, WarehouseColors } from "../config/config";
import { ModelLoader } from "../core/modelLoader";
import { TextLoader } from "../core/textLoader";
import { Warehouse } from "./../classes/warehouse";

export class WarehousesObj {
  constructor() {}

  /**
   * Loads the warehouses city names for the given warehouses
   * @param warehouses
   */
  public static loadWarehousesName(warehouses: Warehouse[]) {
    const loader = new TextLoader();
    warehouses.forEach((warehouse) => {
      let displaced = warehouse.position;
      if (warehouse.displacedPosition) {
        displaced = warehouse.displacedPosition;
      }

      loader.text(displaced, warehouse.position, warehouse.city);
    });
  }

  /**
   * Loads the warehouses obj files for the given warehouses
   * @param warehouses
   */
  public static loadWarehousesObj(warehouses: Warehouse[]) {
    const loader = new ModelLoader();
    warehouses.forEach((warehouse) => {
      // get warehouse colors by warehouse.city

      let cityName = warehouse.city.replace(/\s/g, "_");

      let colors;
      if (!WarehouseColors[cityName]) {
        colors = WarehouseColors.default;
      } else {
        colors = WarehouseColors[cityName];
      }

      loader.warehouse(warehouse.position, warehouse.displacedPosition, colors);
    });
  }

  public static genRises(warehouses: Warehouse[]) {
    let rise: THREE.Mesh[] = [];
    warehouses.forEach((warehouse) => {
      if (warehouse.position.y > 0) {
        const geometry = new THREE.CylinderGeometry(
          Config.rotunda.kOfCircle + Config.connect.kOfConnect,
          Config.rotunda.kOfCircle + Config.connect.kOfConnect * 3,
          warehouse.position.y,
          32
        );

        const material = new THREE.MeshStandardMaterial({
          color: Config.color.hill,
        });

        const cone = new THREE.Mesh(geometry, material);
        cone.position.set(
          warehouse.position.x,
          warehouse.position.y / 2 - Config.InfinityNumber,
          warehouse.position.z
        );
        cone.receiveShadow = true;

        if (warehouse.displacedPosition) {
          const coneDisp = new THREE.Mesh(geometry, material);

          coneDisp.position.set(
            warehouse.displacedPosition.x,
            warehouse.displacedPosition.y / 2 - Config.InfinityNumber,
            warehouse.displacedPosition.z
          );
          coneDisp.receiveShadow = true;

          rise.push(coneDisp);
        }

        rise.push(cone);
      }
    });

    return rise;
  }
}
