import { PerspectiveCamera } from "three";
import { scene, sizes } from "./renderer";
import { Config } from "../config/config";

const VERTICAL_FIELD_OF_VIEW = 45; // degrees 45 is the normal

export const camera = new PerspectiveCamera(
  VERTICAL_FIELD_OF_VIEW,
  sizes.width / sizes.height
);

camera.position.set(
  Config.camera.position.x,
  Config.camera.position.y,
  Config.camera.position.z
);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  camera.lookAt(0, 0, 0);
});

camera.name = "Camera";

scene.add(camera);

export default camera;
