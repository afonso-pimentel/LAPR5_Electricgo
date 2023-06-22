import * as THREE from "three";
import { Config } from "../../config/config";
import { Material } from "../material";
import { Warehouse } from "./../../classes/warehouse";

export class Rotunda {
  public centerPosition: THREE.Vector3;
  public radius: number;

  constructor(centerPosition: THREE.Vector3) {
    this.centerPosition = new THREE.Vector3(
      centerPosition.x,
      centerPosition.y,
      centerPosition.z
    );
    this.radius = Config.rotunda.kOfCircle + Config.road.width * 0.5;
  }

  /**
   * generate list of rotundas
   * @param warehouses
   * @returns
   */
  public static generateRotundasFromWarehouseList(warehouses: Warehouse[]) {
    const rotundaList = [];
    for (let i = 0; i < warehouses.length; i++) {
      let rotundaObj = new Rotunda(warehouses[i].position).getRotundaShape();
      rotundaList.push(rotundaObj);
    }
    return rotundaList;
  }

  /**
   * return rotunda object (groups of 3d obj) from position of warehouse
   * @returns
   */
  public getRotundaShape() {
    const circle = new THREE.Mesh(
      new THREE.CircleGeometry(this.radius, 30),
      Material.asphalt()
    );
    circle.rotation.x = -Math.PI / 2;
    circle.receiveShadow = true;

    //* berm ring
    let halfH = this.radius * 0.1;
    let r = this.radius * 0.2;
    let R = this.radius * 0.3;

    let points = [
      new THREE.Vector2(r, -halfH),
      new THREE.Vector2(R, -halfH),
      new THREE.Vector2(R, halfH),
      new THREE.Vector2(r, halfH),
      new THREE.Vector2(r, -halfH),
    ];

    const ring = new THREE.Mesh(
      new THREE.LatheGeometry(points, 72),
      Material.concrete()
    );
    ring.receiveShadow = true;
    ring.castShadow = true;

    //* grass cylinder
    const grass = new THREE.Mesh(
      new THREE.CylinderGeometry(
        this.radius * 0.2,
        this.radius * 0.2,
        this.radius * 0.1,
        30
      ),
      Material.grass()
    );
    grass.receiveShadow = true;

    // add the cylinder to the circle
    const rotundaGroup = new THREE.Group();
    rotundaGroup.add(grass);
    rotundaGroup.add(ring);
    rotundaGroup.add(circle);

    circle.receiveShadow = true;

    rotundaGroup.position.set(
      this.centerPosition.x,
      this.centerPosition.y + Config.InfinityNumber,
      this.centerPosition.z
    );

    return rotundaGroup;
  }
}
