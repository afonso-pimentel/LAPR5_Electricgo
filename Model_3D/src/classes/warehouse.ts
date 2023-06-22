import { Vector3 } from "three";
import { Config } from "../config/config";
import { WarehouseDto } from "../dtos/warehouse";
import { MathHelper } from "../utils/mathHelper";
import { Path } from "./path";
import * as THREE from "three";
import { VectorHelper } from "../utils/vectorHelper";

export interface RoutesMetadata {
  warehousePosition: THREE.Vector3;
  initialRoutePosition: THREE.Vector3;
  finalRoutePosition: THREE.Vector3;
  slope: number;
  inclination: number;
}

export class Warehouse {
  public id: string;
  public city: string;
  public position: THREE.Vector3;
  public rotundaPosition: THREE.Vector3 | undefined;
  public paths: Path[];
  public displacedPosition: THREE.Vector3 | undefined;
  public numConnected: number | undefined;
  public connectEnds: THREE.Vector3[] = [];

  constructor(
    id: string,
    city: string,
    position: THREE.Vector3,
    paths: Path[] = []
  ) {
    this.id = id;
    this.city = city;
    this.position = position;
    this.paths = paths;
  }

  public static extractWarehouseCitiesAndDisplacedPositions(
    warehouses: Warehouse[]
  ) {
    let cities: any = [];
    warehouses.forEach((warehouse) => {
      let vec1 = warehouse.displacedPosition?.clone() as THREE.Vector3;
      let vec2 = warehouse.position?.clone();
      vec2.setY(vec1.y);

      let cameraPosition = MathHelper.getPointAtDistance(vec1, vec2, 200);

      cameraPosition.setY(cameraPosition.y + 100);

      cities.push({
        city: warehouse.city,
        position: warehouse.displacedPosition,
        camera: cameraPosition,
      });
    });

    return cities;
  }

  /**
   * Get all routes and rotundas from warehouses processed data, remove duplicates
   * @param warehouses
   * @returns
   */
  public static extractRoutesAndRotundasFromWarehouses(
    warehouses: Warehouse[]
  ) {
    let routesWithDuplicates: THREE.Vector3[][] = [];
    let rotundas: THREE.Vector3[] = [];
    let listOfRoutesMetadata: RoutesMetadata[] = [];

    warehouses.forEach((warehouse) => {
      warehouse.paths.forEach((path) => {
        routesWithDuplicates.push(path.route);
      });

      if (warehouse.position) {
        rotundas.push(warehouse.position);
      }
    });

    let routes: THREE.Vector3[][] = [];
    routesWithDuplicates.forEach((route) => {
      let isUnique = true;
      routes.forEach((newRoute) => {
        if (VectorHelper.compareVector3Arrays(newRoute, route)) {
          isUnique = false;
        }
      });

      if (isUnique) {
        const slope = (route[2].y - route[1].y) / (route[2].z - route[1].z);
        const distanceBetweenBothPoints = route[2].distanceTo(route[1]);

        const heightBetweenTwoPoints = Math.abs(
          Math.abs(route[2].y) - Math.abs(route[1].y)
        );

        const soh = heightBetweenTwoPoints / distanceBetweenBothPoints;

        console.log(`Distance between points: ${distanceBetweenBothPoints}`);
        console.log(`Height between points: ${heightBetweenTwoPoints}`);
        console.log(`Angle: ${Math.asin(soh)}`);

        listOfRoutesMetadata.push({
          warehousePosition: route[0],
          initialRoutePosition: route[1],
          finalRoutePosition: route[2],
          slope: slope,
          inclination: Math.asin(soh),
        } as RoutesMetadata);
        routes.push(route);
      }
    });

    return { listOfRoutesMetadata, rotundas };
  }

  /**
   * return an array of Warehouse objects from warehouses data
   * @param warehouseData
   * @returns
   */
  public static dataToWarehouseList(warehouseData: WarehouseDto[]) {
    let warehouseList: Warehouse[] = [];

    //Math.max.apply(Math,warehouseData.map(function(o:WarehouseDto){return o.latitude;}))
    var MinLat = Math.min(...warehouseData.map((o) => o.latitude));
    var MaxLat = Math.max(...warehouseData.map((o) => o.latitude));

    var MinLong = Math.min(...warehouseData.map((o) => o.longitude));
    var MaxLong = Math.max(...warehouseData.map((o) => o.longitude));

    var MinAlt = Math.min(...warehouseData.map((o) => o.altitude));
    var MaxAlt = Math.max(...warehouseData.map((o) => o.altitude));

    warehouseData.forEach((warehouseItem: WarehouseDto) => {
      let warehouse = new Warehouse(
        warehouseItem.id,
        warehouseItem.locality,
        //to do change this to funct lat long to vector3
        new Vector3(
          MathHelper.LatitudeToVectorPosition(
            warehouseItem.latitude,
            MinLat,
            MaxLat
          ),
          MathHelper.AltitudeToVectorPosition(
            warehouseItem.altitude,
            MinAlt,
            MaxAlt
          ),
          MathHelper.LongitudeToVectorPosition(
            warehouseItem.longitude,
            MinLong,
            MaxLong
          )
        ).multiplyScalar(Config.scale),
        [] //Empty paths
      );

      warehouseList.push(warehouse);
    });

    return warehouseList;
  }

  /**
   * generates the displaced position of the warehouse based on the number of connected warehouses and assigns it to the displacedPosition property
   * @returns
   */
  public setDisplacedPosition() {
    // if warehouse is not connected to any other warehouse
    if (this.numConnected === 0) {
      this.displacedPosition = this.position;
      return;
    }

    // if warehouse is connected to only one other warehouse
    if (this.numConnected === 1) {
      this.displacedPosition = MathHelper.pointOnVector3WithDistanceAfterEnd(
        this.connectEnds[0],
        this.position,
        Config.displaceDistance
      );
      return;
    }

    // remaning case is when warehouse is connected to more than one other warehouse
    // add the first point to the end of the array to close the loop
    let points = this.connectEnds.map((vector) => vector.clone());
    points.push(points[0]);

    let largestTheta = 0;
    let positionData;
    for (let i = 0; i < points.length - 1; i++) {
      const areaAndTheta = MathHelper.calculateDataFromCircleSlice(
        this.position,
        points[i],
        points[i + 1]
      );

      if (areaAndTheta.theta > largestTheta) {
        largestTheta = areaAndTheta.theta;
        positionData = { ...areaAndTheta };
      }
    }

    let displacedPosition = new THREE.Vector3();
    let vectorLine: THREE.Vector3[] = [];

    if (positionData) {
      // get the mean point of the two points that form the largest angle
      let meanPoint = new Vector3(
        (positionData.start.x + positionData.end.x) / 2,
        this.position.y,
        (positionData.start.z + positionData.end.z) / 2
      );

      // create a vector line from the mean point to the warehouse position or vice versa
      if (positionData.theta > Math.PI) {
        vectorLine = [meanPoint, this.position];
      } else {
        vectorLine = [this.position, meanPoint];
      }

      // get the displaced position on the vector line by traveling the displace distance after the end of the vector line
      displacedPosition = MathHelper.pointOnVector3WithDistanceAfterEnd(
        vectorLine[0],
        vectorLine[1],
        Config.displaceDistance
      );
    }

    // assign the displaced position to the warehouse
    this.displacedPosition = displacedPosition;
  }

  /**
   * goes through all paths and sets the connectEnds in a clockwise order
   * this is used to calculate the displaced position later on
   * @param warehouses
   */
  public setConnectEndPoints(warehouses: Warehouse[]) {
    let connectedEnds: THREE.Vector3[] = [];
    let excludedWarehouseIds: string[] = [];
    warehouses.forEach((connectableWarehouse) => {
      if (this.id !== connectableWarehouse.id) {
        connectableWarehouse.paths.forEach((path) => {
          if (path.endWarehouseId === this.id) {
            connectedEnds.push(path.route[path.route.length - 2]);
            excludedWarehouseIds.push(connectableWarehouse.id);
          }
        });
      }
    });

    this.paths.forEach((path) => {
      if (!excludedWarehouseIds.includes(path.endWarehouseId)) {
        connectedEnds.push(path.route[1]);
      }
    });

    // order connectedEnds clockwise
    connectedEnds = MathHelper.orderClockwise(this.position, connectedEnds);

    this.connectEnds = connectedEnds;
  }
}
