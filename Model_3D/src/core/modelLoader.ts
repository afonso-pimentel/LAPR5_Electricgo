import * as THREE from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Config } from "../config/config";
import { scene } from "./renderer";
export class ModelLoader {
  private loader = new OBJLoader();

  public async truck() {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath(
      "/threejsassets/draco/gltf/"
    );
    gltfLoader.setDRACOLoader(dracoLoader);

    const object = await gltfLoader.loadAsync(
      "/threejsassets/models/truck/truck.gltf"
    );
    object.scene.name = "AutoTruck3DModel";

    object.scene.scale.set(
      Config.truck.width,
      Config.truck.height,
      Config.truck.depth
    );

    return object.scene;
  }

  /**
   * load a tree model from a .obj file
   * @param position
   */
  public tree(position: THREE.Vector3) {
    this.loader.load("/threejsassets/models/tree/tree-oval.obj", (object) => {
      object.scale.set(1, 1, 1);
      object.position.set(position.x, position.y, position.z);
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material.name === "tree_bark_dark") {
            child.material.color.set(Config.color.treeBark);
          }
          if (child.material.name === "tree_green") {
            child.material.color.set(Config.color.treeLeaves);
          }
          child.castShadow = true;
        }
      });
      scene.add(object);
    });
  }

  /**
   * load a building model from a .obj file
   * @param position
   * @param displacedPosition
   * @param colors
   */
  public warehouse(
    position: THREE.Vector3,
    displacedPosition: THREE.Vector3 | undefined,
    colors: { walls: string; roof: string; windows: string; frames: string }
  ) {
    this.loader.load(
      "/threejsassets/models/warehouse/building.obj",
      (object) => {
        object.scale.set(
          Config.warehouse.scale.x,
          Config.warehouse.scale.y,
          Config.warehouse.scale.z
        );

        let processedPosition = new THREE.Vector3(0, 0, 0);

        if (displacedPosition) {
          processedPosition.set(
            displacedPosition.x,
            displacedPosition.y,
            displacedPosition.z
          );
        } else {
          processedPosition.set(position.x, position.y, position.z);
        }

        if (displacedPosition) {
          object.rotateY(
            Math.atan2(
              position.x - displacedPosition.x,
              position.z - displacedPosition.z
            )
          );
        }

        object.position.set(
          processedPosition.x,
          processedPosition.y,
          processedPosition.z
        );

        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.material[0].color.set(colors.walls);
            child.material[1].color.set(colors.windows);
            child.material[2].color.set(colors.frames);
            child.material[3].color.set(colors.roof);

            child.castShadow = true;
          }
        });
        scene.add(object);
      }
    );
  }
}
