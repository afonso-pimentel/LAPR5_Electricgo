import * as THREE from "three";
import { Config } from "../config/config";

export class Ground {
  /**
   * generate the ground and export it, so we can use it in the main.ts file
   * @returns {THREE.Mesh} the ground mesh
   */
  public static generateGround(): THREE.Mesh {
    const width = Config.ground.width * Config.scale * 1.4;
    const height = Config.ground.height * Config.scale * 1.4;

    let geometry = new THREE.PlaneGeometry(width, height, 10, 10);

    const plane = new THREE.Mesh(
      geometry,
      new THREE.MeshStandardMaterial({ color: Config.color.ground })
    );

    plane.position.set(0, -Config.InfinityNumber, 0);
    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;

    return plane;
  }

  public static generateSea(): THREE.Mesh {
    const width = Config.skyboxSize * Config.scale;
    const height = Config.skyboxSize * Config.scale;

    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height, 10, 10),
      new THREE.MeshToonMaterial({ color: Config.color.sea })
    );

    plane.position.set(0, -Config.island.height, 0);
    plane.rotation.x = -Math.PI / 2;

    return plane;
  }

  /**
   * island generation
   * @param widthSegments
   * @param heightSegments
   * @returns
   */
  public static generateIsland(
    widthSegments: number,
    heightSegments: number
  ): THREE.Mesh {
    let geometry = new THREE.PlaneGeometry(
      Config.ground.width * Config.scale * 1.9,
      Config.ground.height * Config.scale * 1.9,
      widthSegments,
      heightSegments
    );

    let indexMax1 = heightSegments * 0.88;
    let indexMax2 = heightSegments * 0.9;
    let indexMax3 = heightSegments * 0.95;
    let indexMin1 = heightSegments * 0.12;
    let indexMin2 = heightSegments * 0.1;
    let indexMin3 = heightSegments * 0.05;
    const digLevelAmount1 = Config.island.height * 0.3;
    const digLevelAmount2 = Config.island.height * 0.6;
    const digLevelAmount3 = Config.island.height;

    for (let i = 0; i <= widthSegments; i++) {
      for (let j = 0; j <= heightSegments; j++) {
        if (
          i >= indexMax1 ||
          i <= indexMin1 ||
          j >= indexMax1 ||
          j <= indexMin1
        ) {
          geometry.attributes.position.setZ(
            i + (i * heightSegments + j),
            -(Math.random() * 1 + digLevelAmount1)
          );
        }
        if (
          i >= indexMax2 ||
          i <= indexMin2 ||
          j >= indexMax2 ||
          j <= indexMin2
        ) {
          geometry.attributes.position.setZ(
            i + (i * heightSegments + j),
            -(Math.random() * 1 + digLevelAmount2)
          );
        }
        if (
          i >= indexMax3 ||
          i <= indexMin3 ||
          j >= indexMax3 ||
          j <= indexMin3
        ) {
          geometry.attributes.position.setZ(
            i + (i * heightSegments + j),
            -(Math.random() * 1 + digLevelAmount3)
          );
        }
      }
    }

    const c1 = new THREE.Color(Config.color.ground);
    const c2 = new THREE.Color(Config.color.groundToSand);
    const c3 = new THREE.Color(Config.color.sand);
    const c4 = new THREE.Color(Config.color.sandToSea);

    // the three vector points
    const v1 = new THREE.Vector3();

    geometry.setAttribute(
      "color",
      new THREE.BufferAttribute(
        new Float32Array(geometry.attributes.position.count * 3),
        3
      )
    );

    // Set the color for each vertex
    for (let i = 0; i < geometry.attributes.position.count; i++) {
      v1.fromBufferAttribute(geometry.attributes.position, i);
      const min = v1.z;

      let color = c1;

      if (min >= 0) {
        color = c1;
      } else if (min >= -(digLevelAmount1 + 1)) {
        color = c2;
      } else if (min >= -(digLevelAmount2 + 1)) {
        color = c3;
      } else if (min < -(digLevelAmount2 + 1)) {
        color = c4;
      }

      geometry.attributes.color.setXYZ(i, color.r, color.g, color.b);
    }

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
    });
    // add gouraudShading to the material ( this is the default )
    (material as any).flatShading = true;

    const plane = new THREE.Mesh(geometry, material);

    plane.position.set(0, -Config.InfinityNumber, 0);

    plane.rotation.x = -Math.PI / 2;
    plane.receiveShadow = true;

    return plane;
  }
}
