import * as THREE from "three";
import { Config } from "../config/config";

export class Material {
  public static concrete(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: Config.color.concrete,
      roughness: 0.5,
    });
  }

  public static asphalt(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: Config.color.asphalt,
      roughness: 0.5,
    });
  }

  public static grass(): THREE.MeshStandardMaterial {
    return new THREE.MeshStandardMaterial({
      color: Config.color.rotundaGrass,
      roughness: 0.5,
    });
  }
}
