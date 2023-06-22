import * as THREE from "three";
import { RoutesMetadata } from "../classes/warehouse";
import { Config } from "../config/config";
import { TruckSettings } from "../player/truck";
import { TruckMovimentTypes } from "../player/truckMovementTypes";

export interface TruckNextPosition {
  x: number;
  y: number;
  z: number;
  currentRoadIdentifier: string;
  currentRoadInclination: number;
}

export class TruckMovementHelper {
  public static sideToSideOffSet = 0.9;
  public static depthOffSet = 2.9;

  /**
   * Calculations based on the tutorial from SGRAI.
   * This is the mapping between our axis and the tutorial axis:
   * OUR AXIS | TUTORIAL AXIS
   * -------------------------
   *    X     |  Y
   *    Y     |  Z
   *    Z     |  X
   * @param truckHeight
   * @param currentTruckPosition
   * @param velocity
   * @param currentTruckDirection
   * @param movementType
   * @returns
   */
  public static calculateNextCoordinates(
    truckSettings: TruckSettings,
    currentTruckPosition: THREE.Vector3,
    currentTruckDirection: number,
    movementType: TruckMovimentTypes,
    roundabouts: THREE.Vector3[],
    routes: RoutesMetadata[]
  ): TruckNextPosition | undefined {
    const truckVelocity = this.getTruckActualVelocity(
      truckSettings.speed,
      movementType
    );
    const nextSideToSidePosition = this.calculateNextYCoordinate(
      currentTruckPosition.x,
      truckVelocity,
      currentTruckDirection
    );
    const nextDepthPosition = this.calculateNextXCoordinate(
      currentTruckPosition.z,
      truckVelocity,
      currentTruckDirection
    );

    if (
      this.colisionWithRoundAboutCenter(
        roundabouts,
        nextSideToSidePosition,
        nextDepthPosition
      )
    )
      return undefined;

    let nextTruckPosition = this.getRoundAboutNextCoordinates(
      roundabouts,
      nextSideToSidePosition,
      nextDepthPosition
    );

    /**
     * if != undefined it means that the next
     * coordinates belong to a roundabout
     */
    if (nextTruckPosition != undefined) return nextTruckPosition;

    nextTruckPosition = this.getConnectionLinkNextCoordinates(
      routes,
      nextSideToSidePosition,
      nextDepthPosition,
      currentTruckPosition,
      movementType
    );

    /**
     * if != undefined it means that the next
     * coordinates belong to a connection link
     */
    if (nextTruckPosition != undefined) return nextTruckPosition;

    return undefined;
  }

  public static colisionWithRoundAboutCenter(
    roundabouts: THREE.Vector3[],
    sideToSidePosition: number,
    depthPosition: number
  ): boolean {
    const numberOfRoundabouts = roundabouts.length;
    const roundaboutRadius = Config.rotunda.kOfCircle;
    let roundaboutsIndex = 0;

    while (roundaboutsIndex != numberOfRoundabouts) {
      let roundabout = roundabouts[roundaboutsIndex];
      const colisionWithCenterOfRoundabout =
        TruckMovementHelper.belongsToACircle(
          roundaboutRadius,
          roundabout,
          new THREE.Vector3(sideToSidePosition, 0, depthPosition)
        );

      if (colisionWithCenterOfRoundabout) {
        return true;
      }

      roundaboutsIndex++;
    }

    return false;
  }

  public static getConnectionLinkNextCoordinates(
    routes: RoutesMetadata[],
    sideToSidePosition: number,
    depthPosition: number,
    currentTruckPosition: THREE.Vector3,
    movementType: TruckMovimentTypes
  ): TruckNextPosition | undefined {
    const numberOfRoutes = routes.length;
    let routesIndex = 0;

    while (routesIndex != numberOfRoutes) {
      let route = routes[routesIndex];

      const belongsToRoute1 = TruckMovementHelper.belongsToConnectionLink(
        route,
        new THREE.Vector3(
          sideToSidePosition + TruckMovementHelper.sideToSideOffSet,
          0,
          depthPosition + TruckMovementHelper.depthOffSet
        )
      );
      const belongsToRoute2 = TruckMovementHelper.belongsToConnectionLink(
        route,
        new THREE.Vector3(
          sideToSidePosition - TruckMovementHelper.sideToSideOffSet,
          0,
          depthPosition - TruckMovementHelper.depthOffSet
        )
      );
      const belongsToRoute3 = TruckMovementHelper.belongsToConnectionLink(
        route,
        new THREE.Vector3(
          sideToSidePosition + TruckMovementHelper.sideToSideOffSet,
          0,
          depthPosition - TruckMovementHelper.depthOffSet
        )
      );
      const belongsToRoute4 = TruckMovementHelper.belongsToConnectionLink(
        route,
        new THREE.Vector3(
          sideToSidePosition - TruckMovementHelper.sideToSideOffSet,
          0,
          depthPosition + TruckMovementHelper.depthOffSet
        )
      );

      if (
        belongsToRoute1 &&
        belongsToRoute2 &&
        belongsToRoute3 &&
        belongsToRoute4
      ) {
        const calculatedInclinationIncrement = this.calculateInclination(
          route,
          currentTruckPosition,
          movementType
        );

        const testNewHeightPosition = this.calculateConnectionLinkHeight(
          route,
          currentTruckPosition.y,
          depthPosition,
          sideToSidePosition
        );

        const currentPointIdentifier = this.getCurrentPointUniqueIdentifier(
          route.finalRoutePosition
        );

        return {
          x: sideToSidePosition,
          y: testNewHeightPosition,
          z: depthPosition,
          currentRoadInclination: calculatedInclinationIncrement,
          currentRoadIdentifier: currentPointIdentifier,
        } as TruckNextPosition;
      }

      routesIndex++;
    }
    return undefined;
  }
  private static getRoundAboutNextCoordinates(
    roundabouts: THREE.Vector3[],
    sideToSidePosition: number,
    depthPosition: number
  ): TruckNextPosition | undefined {
    const numberOfRoundabouts = roundabouts.length;
    const roundaboutRadius = Config.rotunda.kOfCircle + Config.road.width * 0.5;
    let roundaboutsIndex = 0;

    while (roundaboutsIndex != numberOfRoundabouts) {
      let roundabout = roundabouts[roundaboutsIndex];

      const belongsToRoundabout1 = TruckMovementHelper.belongsToACircle(
        roundaboutRadius,
        roundabout,
        new THREE.Vector3(
          sideToSidePosition + TruckMovementHelper.sideToSideOffSet,
          0,
          depthPosition + TruckMovementHelper.depthOffSet
        )
      );
      const belongsToRoundabout2 = TruckMovementHelper.belongsToACircle(
        roundaboutRadius,
        roundabout,
        new THREE.Vector3(
          sideToSidePosition - TruckMovementHelper.sideToSideOffSet,
          0,
          depthPosition - TruckMovementHelper.depthOffSet
        )
      );
      const belongsToRoundabout3 = TruckMovementHelper.belongsToACircle(
        roundaboutRadius,
        roundabout,
        new THREE.Vector3(
          sideToSidePosition + TruckMovementHelper.sideToSideOffSet,
          0,
          depthPosition - TruckMovementHelper.depthOffSet
        )
      );
      const belongsToRoundabout4 = TruckMovementHelper.belongsToACircle(
        roundaboutRadius,
        roundabout,
        new THREE.Vector3(
          sideToSidePosition - TruckMovementHelper.sideToSideOffSet,
          0,
          depthPosition + TruckMovementHelper.depthOffSet
        )
      );

      if (
        belongsToRoundabout1 ||
        belongsToRoundabout2 ||
        belongsToRoundabout3 ||
        belongsToRoundabout4
      ) {
        let testNewHeightPosition = this.calculateNextZCoordinate(roundabout.y);

        const currentPointIdentifier =
          this.getCurrentPointUniqueIdentifier(roundabout);

        return {
          x: sideToSidePosition,
          y: testNewHeightPosition,
          z: depthPosition,
          currentRoadInclination: 0,
          currentRoadIdentifier: currentPointIdentifier,
        } as TruckNextPosition;
      }
      roundaboutsIndex++;
    }
    return undefined;
  }

  private static getCurrentPointUniqueIdentifier(
    position: THREE.Vector3
  ): string {
    return position.x + "|" + position.y + "|" + position.z;
  }

  private static calculateInclination(
    route: RoutesMetadata,
    currentTruckPosition: THREE.Vector3,
    movementType: TruckMovimentTypes
  ) {
    const distanceToInitialPoint =
      route.initialRoutePosition.distanceTo(currentTruckPosition);
    const distanceToEndPoint =
      route.finalRoutePosition.distanceTo(currentTruckPosition);

    const distantPoint =
      distanceToInitialPoint > distanceToEndPoint
        ? route.initialRoutePosition
        : route.finalRoutePosition;
    const closestPoint =
      distanceToInitialPoint < distanceToEndPoint
        ? route.initialRoutePosition
        : route.finalRoutePosition;

    const distanceBetweenBothPoints = distantPoint.distanceTo(closestPoint);

    const heightBetweenTwoPoints = distantPoint.y - closestPoint.y;

    const soh = heightBetweenTwoPoints / distanceBetweenBothPoints;
    let inclination = Math.asin(soh);

    if (movementType === TruckMovimentTypes.FORWARD) {
      inclination *= -1;
    }
    return inclination;
  }

  private static calculateConnectionLinkHeight(
    route: RoutesMetadata,
    previousPositionTruckHeight: number,
    currentTruckDepthPosition: number,
    currentTruckSideToSidePosition: number
  ): number {
    const line = new THREE.Line3(
      route.initialRoutePosition,
      route.finalRoutePosition
    );

    let position = new THREE.Vector3();

    line.at(
      line.closestPointToPointParameter(
        new THREE.Vector3(
          currentTruckSideToSidePosition,
          previousPositionTruckHeight,
          currentTruckDepthPosition
        ),
        false
      ),
      position
    );

    return position.y;
  }

  public static belongsToACircle(
    circleRadius: number,
    circlePosition: THREE.Vector3,
    newPosition: THREE.Vector3
  ): boolean {
    const ourAxisXCoordinateForNewPosition = newPosition.z;
    const ourAxisYCoordinateForNewPosition = newPosition.x;

    const ourAxisXCoordinateForRoundabout = circlePosition.z;
    const ourAxisYCoordinateForRoundabout = circlePosition.x;

    const xToPowerOf2 = Math.pow(
      ourAxisXCoordinateForNewPosition - ourAxisXCoordinateForRoundabout,
      2
    );
    const yToPowerOf2 = Math.pow(
      ourAxisYCoordinateForNewPosition - ourAxisYCoordinateForRoundabout,
      2
    );

    const radiusToPowerOf2 = Math.pow(circleRadius, 2);

    const distanceToRadius = xToPowerOf2 + yToPowerOf2;

    if (distanceToRadius <= radiusToPowerOf2) return true;

    return false;
  }

  public static belongsToConnectionLink(
    route: RoutesMetadata,
    newPosition: THREE.Vector3
  ): boolean {
    const currentRouteRoundAbout = route.warehousePosition;

    const ourAxisXCoordinateForConnectionLinkPosition =
      currentRouteRoundAbout.z;
    const ourAxisYCoordinateForConnectionLinkPosition =
      currentRouteRoundAbout.x;

    const ourAxisXCoordinateForNewPosition = newPosition.z;
    const ourAxisYCoordinateForNewPosition = newPosition.x;

    // (yj - yi)
    const differenceInY =
      route.finalRoutePosition.x - route.initialRoutePosition.x;

    // (xj - xi)
    const differenceInX =
      route.finalRoutePosition.z - route.initialRoutePosition.z;

    const angleToOrientation = Math.atan2(differenceInY, differenceInX);

    // x''P = (x'P - xi) * cos(αij) + (y'P - yi) * sin(αij);
    const xDiffWithCosForX =
      (ourAxisXCoordinateForNewPosition -
        ourAxisXCoordinateForConnectionLinkPosition) *
      Math.cos(angleToOrientation);
    const yDiffWithSinForX =
      (ourAxisYCoordinateForNewPosition -
        ourAxisYCoordinateForConnectionLinkPosition) *
      Math.sin(angleToOrientation);
    const xCoordinate = xDiffWithCosForX + yDiffWithSinForX;

    // y''P = (y'P - yi) * cos(αij) - (x'P - xi) * sin(αij).
    const yDiffWithCosForY =
      (ourAxisYCoordinateForNewPosition -
        ourAxisYCoordinateForConnectionLinkPosition) *
      Math.cos(angleToOrientation);
    const xDiffWithSinForY =
      (ourAxisXCoordinateForNewPosition -
        ourAxisXCoordinateForConnectionLinkPosition) *
      Math.sin(angleToOrientation);
    const yCoordinate = yDiffWithCosForY - xDiffWithSinForY;

    //const sI = Config.connect.kOfConnect * radius;

    //const sI = connectionLinkData[1].distanceTo(connectionLinkData[2]) + 18;

    const distanceBetweenCircleAndInitialRoadStart =
      route.warehousePosition.distanceTo(route.initialRoutePosition);
    const distanceBetweenInitialRoadStartAndEndRoadStart =
      route.warehousePosition.distanceTo(route.finalRoutePosition);

    const sI =
      distanceBetweenInitialRoadStartAndEndRoadStart +
      distanceBetweenCircleAndInitialRoadStart;

    // -wij / 2.0
    const negativeWidth = (Config.road.width * -1) / 2.0;

    // wij / 2.0
    const positiveWidth = Config.road.width / 2.0;

    if (
      xCoordinate >= 0.0 &&
      xCoordinate <= sI &&
      yCoordinate >= negativeWidth &&
      yCoordinate <= positiveWidth
    )
      return true;

    return false;
  }

  private static getTruckActualVelocity(
    truckStandardVelocity: number,
    movementType: TruckMovimentTypes
  ): number {
    switch (movementType) {
      case TruckMovimentTypes.BACKWARDS:
        return truckStandardVelocity * -1;
      case TruckMovimentTypes.FORWARD:
        return truckStandardVelocity;
      default:
        return truckStandardVelocity;
    }
  }

  public static calculateNextXCoordinate(
    currentXCoordinate: number,
    velocity: number,
    direction: number
  ) {
    return currentXCoordinate + velocity * Math.cos(direction);
  }

  public static calculateNextYCoordinate(
    currentYCoordinate: number,
    velocity: number,
    direction: number
  ) {
    return currentYCoordinate + velocity * Math.sin(direction);
  }

  public static calculateNextZCoordinate(currentZCoordinate: number) {
    return currentZCoordinate; //+ (truckHeight / 2.0);
  }
}
