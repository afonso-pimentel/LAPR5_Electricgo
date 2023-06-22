import * as THREE from "three";
import { Config } from "../config/config";

export class Skybox {
  /**
   * generate skybox from images
   * @returns
   */
  public static generateSkybox(): THREE.Mesh {
    let materialArray = [];
    let texture_ft = new THREE.TextureLoader().load(
      "/threejsassets/textures/side.png"
    );
    let texture_bk = new THREE.TextureLoader().load(
      "/threejsassets/textures/side.png"
    );
    let texture_up = new THREE.TextureLoader().load(
      "/threejsassets/textures/top.png"
    );
    let texture_dn = new THREE.TextureLoader().load(
      "/threejsassets/textures/bottom.png"
    );
    let texture_rt = new THREE.TextureLoader().load(
      "/threejsassets/textures/side.png"
    );
    let texture_lf = new THREE.TextureLoader().load(
      "/threejsassets/textures/side.png"
    );

    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));

    for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;
    let skyboxGeo = new THREE.BoxGeometry(
      Config.skyboxSize,
      Config.skyboxSize,
      Config.skyboxSize
    );
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);

    return skybox;
  }
}
