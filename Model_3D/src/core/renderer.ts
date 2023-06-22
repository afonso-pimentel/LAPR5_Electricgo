import {
  WebGLRenderer,
  Scene,
  sRGBEncoding,
  PCFShadowMap,
  ACESFilmicToneMapping,
  Color,
} from "three";
import { Config } from "../config/config";

export const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
export const scene = new Scene();
scene.background = new Color(Config.color.sceneBg);

const canvas: HTMLElement = document.querySelector(
  Config.canvasDomId
) as HTMLElement;

// Renderer
export const renderer = new WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});

// More realistic shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = sRGBEncoding;
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;

function updateRenderer() {
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // To avoid performance problems on devices with higher pixel ratio
}

// allows for resizing the window
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  updateRenderer();
});

updateRenderer();

export default {
  renderer,
};
