import * as THREE from "three";
import { scene } from "../core/renderer";
import { MathHelper } from "../utils/mathHelper";

let positionArray: THREE.Vector3[]; // Array of points that the truck will follow (path)
let currentPositionIndex: number; // Index of the current position in the array
let stops: number[]; // Array of points that the truck will stop at
export function initTrips(trips: any) {
  positionArray = trips.routePoints;
  stops = trips.stops;
}

currentPositionIndex = 0;

export function animateAutoTruck(isRunning: boolean) {
  let cube = scene.getObjectByName("truckBox") as THREE.Mesh;

  if (!isRunning) {
    return;
  }

  // Check if we've reached the end of the array
  if (currentPositionIndex >= positionArray.length - 1) {
    currentPositionIndex = 0;
    return;
  }

  // Get the current position and the next position
  const currentPosition = positionArray[currentPositionIndex];
  const nextPosition = positionArray[currentPositionIndex + 1];

  // Calculate the distance between the two positionArray
  const distance = currentPosition.distanceTo(nextPosition);
  // console.log("distance", distance);

  let step = distance > 2 ? 0.6 : 0.2;

  let testposition = MathHelper.getPointAtDistance(
    cube.position,
    nextPosition,
    step
  );
  cube?.position.set(testposition.x, testposition.y, testposition.z);

  if (cube.position.distanceTo(nextPosition) < step) {
    currentPositionIndex++;
  }

  if (distance < 2) {
    let horizonLookAt = MathHelper.getPointAtDistance(
      currentPosition,
      nextPosition,
      300
    );
    cube.lookAt(horizonLookAt);
  } else {
    cube.lookAt(nextPosition);
  }

  // stop on every warehouse for 2 seconds
  if (stops.includes(currentPositionIndex)) {
    setTimeout(function () {
      requestAnimationFrame(() => animateAutoTruck(isRunning));
    }, 2000);
    return;
  } else {
    requestAnimationFrame(() => animateAutoTruck(isRunning));
  }
}
