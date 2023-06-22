import * as THREE from "three";
import { scene } from "./renderer";
import { gui } from "./gui";
import { Config } from "../config/config";

class FogWithBool extends THREE.Fog {
  visible = true;
}

export class CustomFog {
  /**
   * Add fog to the scene and add a gui toggle
   */
  public static fog() {
    let fog = new FogWithBool(
      Config.fog.color,
      Config.fog.near,
      Config.fog.far
    );

    scene.fog = fog;

    const toggleFog = gui.add(fog, "visible").name("Fog").setValue(false);
    scene.fog = null;

    toggleFog.onChange(() => {
      if (fog.visible) {
        scene.fog = fog;
      } else {
        scene.fog = null;
      }
    });
  }
}
