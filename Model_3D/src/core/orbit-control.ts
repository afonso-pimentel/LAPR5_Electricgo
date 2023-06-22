import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Config } from "../config/config";
import { camera } from "./camera";
import { renderer } from "./renderer";
import { scene } from "./renderer";

export const controls = new OrbitControls(camera, renderer.domElement);

// the code below allows to move the camera to the clicked point on the canvas by holding down the ctrl key and clicking on the canvas
let canvasDom = document.querySelector(Config.canvasDomId) as HTMLCanvasElement;
canvasDom.addEventListener("click", (event) => {
  if (event.ctrlKey) {
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      controls.target = intersects[0].point;
      controls.update();
    }
  }
});

controls.enableDamping = true;
controls.enablePan = true;
controls.enableZoom = true;
controls.enableRotate = true;
controls.rotateSpeed = 0.5;
controls.zoomSpeed = 0.5;
controls.panSpeed = 0.5;
