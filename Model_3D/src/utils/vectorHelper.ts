import * as THREE from "three";

export class VectorHelper {
  /**
   * compare two vectors, return true if they are equal or inverted
   * @param array1
   * @param array2
   * @returns
   */
  public static compareVector3Arrays(
    array1: THREE.Vector3[],
    array2: THREE.Vector3[]
  ): boolean {
    if (array1.length !== array2.length) {
      return false;
    }

    let resultNormal = true;
    let resultInverted = true;

    for (let i = 0; i < array1.length; i++) {
      if (!array1[i].equals(array2[i])) {
        resultNormal = false;
      }
    }

    // if equals to inverted array
    for (let i = 0; i < array1.length; i++) {
      if (!array1[i].equals(array2[array2.length - 1 - i])) {
        resultInverted = false;
      }
    }

    return resultNormal || resultInverted;
  }
}
