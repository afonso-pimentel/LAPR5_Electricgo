import * as THREE from "three";
import { Config } from "../config/config";

//* add the lighting to the scene and export it, so we can use it in the main.ts file

export function ambient(): THREE.AmbientLight {
  const ambientLight = new THREE.AmbientLight(Config.color.lightAmbient, 0.5);

  return ambientLight;
}

export function directional(): THREE.DirectionalLight {
  const directionalLight = new THREE.DirectionalLight(
    Config.color.lightDirectional,
    1
  );
  directionalLight.position.set(0, 90, 40);
  let d = 1000; // width and height of the light square
  let r = 1; // radius of the shadow, this affects the blur of the shadow
  let mapSize = 8192;
  directionalLight.castShadow = true;
  directionalLight.shadow.radius = r;
  directionalLight.shadow.mapSize.width = mapSize;
  directionalLight.shadow.mapSize.height = mapSize;
  directionalLight.shadow.camera.top = directionalLight.shadow.camera.right = d;
  directionalLight.shadow.camera.bottom = directionalLight.shadow.camera.left =
    -d;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 4000;

  return directionalLight;
}
