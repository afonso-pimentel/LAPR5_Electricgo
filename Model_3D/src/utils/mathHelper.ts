import * as THREE from "three";
import { Config } from "../config/config";

export class MathHelper {
  public static distance3dVector3(
    vector1: THREE.Vector3,
    vector2: THREE.Vector3
  ): number {
    return Math.sqrt(
      Math.pow(vector1.x - vector2.x, 2) +
        Math.pow(vector1.y - vector2.y, 2) +
        Math.pow(vector1.z - vector2.z, 2)
    );
  }

  public static pointOnVector3WithDistance(
    vector1: THREE.Vector3,
    vector2: THREE.Vector3,
    distance: number
  ): THREE.Vector3 {
    let vector = new THREE.Vector3();
    vector.subVectors(vector2, vector1);
    vector.normalize();
    vector.multiplyScalar(distance);
    vector.add(vector1);
    return vector;
  }

  public static pointOnVector3WithDistanceAfterEnd(
    vector1: THREE.Vector3,
    vector2: THREE.Vector3,
    distance: number
  ): THREE.Vector3 {
    let vectorDistance = MathHelper.distance3dVector3(vector1, vector2);

    let vector = new THREE.Vector3();
    vector.subVectors(vector2, vector1);
    vector.normalize();
    vector.multiplyScalar(vectorDistance + distance);
    vector.add(vector1);
    return vector;
  }

  // getPointAtDistance
  // Returns a point at a given distance along a line
  public static getPointAtDistance(
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    distance: number
  ): THREE.Vector3 {
    let dx = p2.x - p1.x;
    let dy = p2.y - p1.y;
    let dz = p2.z - p1.z;
    let len = Math.sqrt(dx * dx + dy * dy + dz * dz);
    dx /= len;
    dy /= len;
    dz /= len;
    return new THREE.Vector3(
      p1.x + dx * distance,
      p1.y + dy * distance,
      p1.z + dz * distance
    );
  }

  public static getPointAtDistanceProjectedOnPlaneY(
    p1: THREE.Vector3,
    p2: THREE.Vector3,
    distance: number
  ): THREE.Vector3 {
    const projY = new THREE.Vector3(0, p1.y, 0);
    const p1B = p1.clone();
    p1B.projectOnPlane(projY);
    const p2B = p2.clone();
    p2B.projectOnPlane(projY);

    let point = MathHelper.getPointAtDistance(p1B, p2B, distance);

    point.y = p1.y;

    return point;
  }

  public static getTwoPointsWithDistance(
    point1: THREE.Vector3,
    point2: THREE.Vector3,
    distance: number
  ): THREE.Vector3[] {
    let vector = new THREE.Vector3();
    vector.subVectors(point2, point1);
    vector.normalize();
    vector.multiplyScalar(distance);
    let point3 = new THREE.Vector3();
    point3.addVectors(point1, vector);
    let point4 = new THREE.Vector3();
    point4.subVectors(point2, vector);
    return [point3, point4];
  }

  public static LongitudeToVectorPosition(
    long: number,
    longMin: number,
    longMax: number
  ): number {
    return (((Config.long.max - Config.long.min) / (longMax - longMin)) *
      (long - longMin) +
      Config.long.min) as number;
  }

  public static AltitudeToVectorPosition(
    alt: number,
    altMin: number,
    altMax: number
  ): number {
    return (((Config.alt.max - Config.alt.min) / (altMax - altMin)) *
      (alt - altMin) +
      Config.alt.min) as number;
  }

  public static LatitudeToVectorPosition(
    lat: number,
    latMin: number,
    latMax: number
  ): number {
    return (((Config.lat.max - Config.lat.min) / (latMax - latMin)) *
      (lat - latMin) +
      Config.lat.min) as number;
  }

  /**
   * orders points clockwise in reference to a center point
   * @param center
   * @param points
   * @returns
   */
  public static orderClockwise(
    center: THREE.Vector3,
    points: THREE.Vector3[]
  ): THREE.Vector3[] {
    const angles = points.map(({ x, y, z }) => {
      let pt = new THREE.Vector3(x, y, z);

      return {
        pt,
        angle: (Math.atan2(z - center.z, x - center.x) * 180) / Math.PI,
      };
    });

    // Sort your points by angle
    const pointsSorted = angles.sort((a, b) => a.angle - b.angle);

    return pointsSorted.map(({ pt }) => pt);
  }

  /**
   * Calculates the angle between two vectors in reference to another center point in radians
   * @param center
   * @param v1
   * @param v2
   * @returns
   */
  public static getAngleOfCenterBetweenTwoVectorsInRadians(
    center: THREE.Vector3,
    v1: THREE.Vector3,
    v2: THREE.Vector3
  ) {
    const x1 = v1.x - center.x;
    const z1 = v1.z - center.z;

    // Find the x and y coordinates of the second point relative to the center point of the circle
    const x2 = v2.x - center.x;
    const z2 = v2.z - center.z;

    // Find the center angle in radians made by the two points using the Math.atan2() method
    let angle = Math.atan2(z2 - z1, x2 - x1);

    // get angle clockwise
    let angle1 = Math.atan2(v1.x - center.x, v1.z - center.z);
    let angle2 = Math.atan2(v2.x - center.x, v2.z - center.z);

    if (angle1 < 0) {
      angle1 += Math.PI * 2;
    }

    if (angle2 < 0) {
      angle2 += Math.PI * 2;
    }

    if (angle2 < angle1) {
      angle = angle1 - angle2;
    } else {
      angle = angle2 - angle1;
    }
    return angle;
  }

  /**
   * Calculate the area of a circle slice using the center of the circle, the starting point, and the ending point
   * @param v1
   * @param v2
   * @param center
   * @returns
   */
  public static clockwiseArea(
    v1: THREE.Vector3,
    v2: THREE.Vector3,
    center: THREE.Vector3
  ) {
    let angle = MathHelper.getAngleOfCenterBetweenTwoVectorsInRadians(
      center,
      v1,
      v2
    );

    let area = 0.5 * angle * center.distanceTo(v1) * center.distanceTo(v2);

    return area;
  }

  /**
   * Calculate the theta angle of a circle slice using the center of the circle, the starting point, and the ending point
   * @param center
   * @param start
   * @param end
   * @returns
   */
  public static calculateTheta(
    center: THREE.Vector3,
    start: THREE.Vector3,
    end: THREE.Vector3
  ): number {
    // Calculate the angles of the starting and ending points relative to the center of the circle
    const startAngle = Math.atan2(start.z - center.z, start.x - center.x);
    const endAngle = Math.atan2(end.z - center.z, end.x - center.x);

    // Calculate the theta angle at the center of the circle
    let theta = endAngle - startAngle;

    // Make sure the theta angle is between 0 and 2 * PI
    if (theta < 0) {
      theta += 2 * Math.PI;
    }

    return theta;
  }

  /**
   * Get the theta angle and area of a circle slice, also return the center, start and end points of the slice
   * @param center
   * @param start
   * @param end
   * @returns
   */
  public static calculateDataFromCircleSlice(
    center: THREE.Vector3,
    start: THREE.Vector3,
    end: THREE.Vector3
  ): {
    theta: number;
    area: number;
    center: THREE.Vector3;
    start: THREE.Vector3;
    end: THREE.Vector3;
  } {
    // Calculate the radius of the circle
    const radius = center.distanceTo(start);

    // Calculate the theta angle at the center of the circle
    const theta = this.calculateTheta(center, start, end);

    // Calculate the area of the sector
    const area = 0.5 * theta * radius * radius;

    return { theta, area, center, start, end };
  }

    /**
   * An array is linear if and only if every nth element
   * of the array is either bigger or smaller than the previous elements.
   * possible to 
   * @param numberOfElements The number of elements in the array.
   * @param array The array.
   * @returns True if array is linear and false if it's not.
   */
  public static isLinearArray(numberOfElements:number, array:number[]): boolean
  {
      
      // Base Case
      if (numberOfElements == 1)
          return true;
      else
      {
          
          // First subarray is
          // strictly increasing
          if (array[0] < array[1])
          {
              let i = 1;
  
              // Check for strictly
              // increasing condition
              // & find the break point
              while (i < numberOfElements && array[i - 1] < array[i])
              {
                  i++;
              }
  
              // Check for strictly
              // decreasing condition
              // & find the break point
              while (i + 1 < numberOfElements && array[i] > array[i + 1])
              {
                  i++;
              }
  
              // If i is equal to
              // length of array
              if (i >= numberOfElements - 1)
                  return true;
              else
                  return false;
          }
  
          // First subarray is
          // strictly Decreasing
          else if (array[0] > array[1])
          {
              let i = 1;
  
              // Check for strictly
              // increasing condition
              // & find the break point
              while (i < numberOfElements && array[i - 1] > array[i])
              {
                  i++;
              }
  
              // Check for strictly
              // increasing condition
              // & find the break point
              while (i + 1 < numberOfElements && array[i] < array[i + 1])
              {
                  i++;
              }
  
              // If i is equal to
              // length of array - 1
              if (i >= numberOfElements - 1)
                  return true;
              else
                  return false;
          }
  
          // Condition if ar[0] == ar[1]
          else
          {
              for(let i = 2; i < numberOfElements; i++)
              {
                  if (array[i - 1] <= array[i])
                      return false;
              }
              return true;
          }
      }
    }
}
