import * as THREE from "three";

import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Config } from "../config/config";
import { scene } from "./renderer";
import { Warehouse } from "../classes/warehouse";
import { camera } from "./camera";

export class TextLoader {
  /**
   * Load font and generate text geometry
   * @param position
   * @param lookat
   * @param text
   * @param size
   * @param height
   */
  public text(
    position: THREE.Vector3,
    lookat: THREE.Vector3,
    text: string,
    size: number = 6,
    height: number = 2
  ) {
    const fontLoader = new FontLoader();
    fontLoader.load(
      "/threejsassets/fonts/droid_serif_regular.typeface.json",
      (droidFont) => {
        const textGeometry = new TextGeometry(text, {
          size: size,
          height: height,
          font: droidFont,
        });

        textGeometry.center();

        const textMaterial = new THREE.MeshStandardMaterial();
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.x = position.x;
        textMesh.position.y = position.y + Config.warehouse.height;
        textMesh.position.z = position.z;

        // rotate the text to face the point that the building is looking at
        if (position) {
          textMesh.rotateY(
            Math.atan2(position.x - lookat.x, position.z - lookat.z) + Math.PI
          );
        }

        textMesh.name = "model1";

        // Add the model to the scene
        scene.add(textMesh);
      }
    );
  }

  public static groupedCityNames(
    warehouses: Warehouse[],
    size = 6,
    height = 2
  ) {
    const fontLoader = new FontLoader();

    const modelGroup = new THREE.Group();
    modelGroup.name = "cityNameGroup";

    warehouses.forEach((warehouse) => {
      let position = warehouse.position;
      if (warehouse.displacedPosition) {
        position = warehouse.displacedPosition;
      }
      let cityName = warehouse.city;

      fontLoader.load(
        "/threejsassets/fonts/droid_serif_regular.typeface.json",
        (droidFont) => {
          const textGeometry = new TextGeometry(cityName, {
            size: size,
            height: height,
            font: droidFont,
          });

          textGeometry.center();

          const textMaterial = new THREE.MeshStandardMaterial();
          const textMesh = new THREE.Mesh(textGeometry, textMaterial);
          textMesh.position.x = position.x;
          textMesh.position.y =
            position.y + Config.warehouse.height * Config.warehouse.scale.y;
          textMesh.position.z = position.z;

          modelGroup.add(textMesh);
        }
      );
      scene.add(modelGroup);
    });
  }

  public static animateCityNames() {
    // Get the group by its name
    const group = scene.getObjectByName("cityNameGroup");
    if (group) {
      // Get the camera position
      const cameraPos = camera.position;

      // Iterate over each object in the group
      for (let i = 0; i < group.children.length; i += 1) {
        const object = group.children[i];

        // Make the object look at the camera position
        object.lookAt(cameraPos.x, object.position.y, cameraPos.z);
      }
    }
  }
}
