import * as THREE from "three";
import { Config } from "../config/config";
import { gui } from "../core/gui";
import { scene } from "../core/renderer";
import { MathHelper } from "../utils/mathHelper";
import { Warehouse } from "./warehouse";

export class Trip {
  public truckId: string;
  public warehouseIds: string[];
  public route: THREE.Vector3[];

  constructor(truckId: string, warehouseIds: string[], route: THREE.Vector3[]) {
    this.truckId = truckId;
    this.warehouseIds = warehouseIds;
    this.route = route;
  }

  public static tripBuilder(
    warehouseIdList: string[],
    processedWarehouseList: Warehouse[]
  ) {
    let tempStops: THREE.Vector3[] = [];
    let tempTrip2: THREE.Vector3[][] = [];

    for (let i = 0; i < warehouseIdList.length - 1; i++) {
      // get warehouse with id of warehouseIdList[i] from processedWarehouseList
      let warehouse = processedWarehouseList.find(
        (warehouse) => warehouse.id === warehouseIdList[i]
      );

      if (warehouse !== undefined) {
        let tempTrip: THREE.Vector3[] = [];

        // get path from warehouse with endWarehouseId of warehouseIdList[i+1]
        let path = warehouse.paths.find(
          (path) => path.endWarehouseId === warehouseIdList[i + 1]
        );

        if (path !== undefined) {
          // find the displaced point
          let currentWarehouseDisplaced =
            warehouse.displacedPosition as THREE.Vector3;

          let CurrentStopPoint = MathHelper.getPointAtDistance(
            path.route[0],
            currentWarehouseDisplaced,
            Config.connect.kOfConnect + Config.rotunda.kOfCircle
          );

          tempTrip.push(CurrentStopPoint);

          tempTrip.push(path.route[0]);
          tempTrip.push(path.route[1]);
          tempTrip.push(path.route[2]);
          tempTrip.push(path.route[3]);

          let nextWarehouse = processedWarehouseList.find(
            (warehouse) => warehouse.id === path?.endWarehouseId
          );
          if (nextWarehouse) {
            let nextWarehouseDisplaced =
              nextWarehouse?.displacedPosition as THREE.Vector3;

            let nextStopPoint = MathHelper.getPointAtDistance(
              path.route[3],
              nextWarehouseDisplaced,
              Config.connect.kOfConnect + Config.rotunda.kOfCircle
            );
            tempTrip.push(nextStopPoint);
          }
        }
        tempTrip2.push(tempTrip);
      }
    }

    let trip: THREE.Vector3[] = [];

    // let numberOfSegmentsToRemove = Math.floor(
    //   Config.autoTruck.largeCurveSegments / 10
    // );

    tempTrip2.forEach((points) => {
      // first large curve
      let firstPartialCirclePoints = Trip.generatePartialCirclePoints(
        points[0],
        points[2],
        points[1]
      );

      // store the last point of the first large curve
      let lastPtFirstLargeCurve =
        firstPartialCirclePoints[firstPartialCirclePoints.length - 1];

      let dist = firstPartialCirclePoints[0].distanceTo(
        firstPartialCirclePoints[1]
      );

      // let numberOfSegmentsToRemove = Math.floor(
      //   Config.autoTruck.largeCurveSegments / dist
      // );

      let numberOfSegmentsToRemove = Math.floor(3 / dist);

      // cut off the last 5 Elements of the array
      firstPartialCirclePoints.splice(
        firstPartialCirclePoints.length - numberOfSegmentsToRemove,
        numberOfSegmentsToRemove
      );

      trip.push(...firstPartialCirclePoints);

      // first small curve
      let fpt1 = firstPartialCirclePoints[firstPartialCirclePoints.length - 1];
      let fpt2 = lastPtFirstLargeCurve;
      let fdistanceFromPt1ToPt2 = Math.floor(fpt1.distanceTo(fpt2));

      let fpt3 = MathHelper.getPointAtDistance(
        fpt2,
        points[2],
        fdistanceFromPt1ToPt2
      );

      let firstSmallCurvePoints = this.smallerCurve(fpt1, fpt2, fpt3);

      trip.push(...firstSmallCurvePoints);

      trip.push(points[2]);

      // second Large curve
      let secondPartialCirclePoints = Trip.generatePartialCirclePoints(
        points[3],
        points[5],
        points[4]
      );
      // store the last point of the first large curve
      let lastPtSecondLargeCurve = secondPartialCirclePoints[0];
      tempStops.push(
        secondPartialCirclePoints[secondPartialCirclePoints.length - 1]
      );

      secondPartialCirclePoints.splice(0, numberOfSegmentsToRemove);

      // second small curve
      let spt1 = secondPartialCirclePoints[0];
      let spt2 = lastPtSecondLargeCurve;
      let sdistanceFromPt1ToPt2 = Math.floor(spt1.distanceTo(spt2));

      let spt3 = MathHelper.getPointAtDistance(
        spt2,
        points[3],
        sdistanceFromPt1ToPt2
      );

      let secondSmallCurvePoints = this.smallerCurve(spt3, spt2, spt1);

      trip.push(points[3]);

      trip.push(...secondSmallCurvePoints);
      trip.push(...secondPartialCirclePoints);
    });

    // remove duplicates from tempTrip if next position is the same as current position
    let routePoints: THREE.Vector3[] = [];
    for (let i = 0; i < trip.length - 1; i++) {
      if (!trip[i].equals(trip[i + 1])) {
        routePoints.push(trip[i]);
      }
    }

    // filter routePoints where position is equal to stops
    let stops: number[] = [];
    for (let i = 0; i < routePoints.length; i++) {
      tempStops.forEach((stp) => {
        if (routePoints[i].equals(stp)) {
          stops.push(i);
        }
      });
    }

    // let tripGuides = Trip.genHelperLines(routePoints);

    Trip.tripGuides(routePoints);

    return { routePoints, stops };
  }

  public static tripGuides(trip: THREE.Vector3[]) {
    let line = Trip.genHelperLines(trip);
    scene.add(line);

    // Add a boolean property to the GUI for toggling the visibility of the line
    let visibilityControl = gui
      .add(line, "visible", "false")
      .name("Toggle Trip Guides");

    // Add an event listener to the visibility control to update the line when the visibility changes
    visibilityControl.onChange(function (value) {
      line.visible = value;
    });

    visibilityControl.setValue(false);
  }

  public static generatePartialCircle(
    center: any,
    radius: any,
    startAngle: any,
    endAngle: any,
    numPoints: any
  ) {
    const arc = new THREE.ArcCurve(
      center.x,
      center.z,
      radius,
      startAngle,
      endAngle,
      true
    );

    const points = arc.getPoints(numPoints);

    const points3: THREE.Vector3[] = [];
    points.forEach((point) => {
      points3.push(new THREE.Vector3(point.x, center.y, point.y));
    });

    return points3;
  }

  public static getStartEndAngles(center: any, pt1: any, pt2: any) {
    let startAngle = Math.atan2(pt1.z - center.z, pt1.x - center.x);
    let endAngle = Math.atan2(pt2.z - center.z, pt2.x - center.x);
    if (endAngle < startAngle) {
      endAngle += 2 * Math.PI;
    }
    if (startAngle > endAngle) {
      [startAngle, endAngle] = [endAngle, startAngle];
    }
    return { startAngle, endAngle };
  }

  public static generatePartialCirclePoints(
    pt1: any,
    pt2: any,
    center: any,
    radius: any = Config.rotunda.kOfCircle,
    numPoints: any = Config.autoTruck.largeCurveSegments
  ) {
    const { startAngle, endAngle } = Trip.getStartEndAngles(center, pt1, pt2);
    const points = Trip.generatePartialCircle(
      center,
      radius,
      startAngle,
      endAngle,
      numPoints
    );

    return points;
  }

  public static smallerCurve(
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    p3: THREE.Vector3,
    segments: number = Config.autoTruck.smallCurveSegments
  ) {
    let curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);
    let points = curve.getPoints(segments);
    return points;
  }

  public static genHelperLines(points: THREE.Vector3[]) {
    // Create a buffer geometry to hold the points
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Create a line material
    const material = new THREE.LineBasicMaterial({
      color: "#ff05ac",
      linewidth: 2,
    });

    // Create a line and add it to the scene
    const line = new THREE.Line(geometry, material);
    line.position.setY(line.position.y + 0.1);
    return line;
  }

  public static sphereHelper(
    points: THREE.Vector3,
    color: string = "#ff05ac",
    size: number = 0.3
  ) {
    let geo = new THREE.SphereGeometry(size, 32, 32);
    let mat = new THREE.MeshBasicMaterial({ color: color });
    let sphere = new THREE.Mesh(geo, mat);
    sphere.position.copy(points);
    scene.add(sphere);
  }
}
