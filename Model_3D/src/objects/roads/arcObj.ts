import * as THREE from "three";
import { Config } from "../../config/config";
import { Material } from "../material";
import { scene } from "/@/core/renderer";
import { MathHelper } from "/@/utils/mathHelper";

export class ArcObj {
  public points: THREE.Vector3[];
  public start: THREE.Vector3;
  public end: THREE.Vector3;
  public heightDifference: number;
  public _length: number;
  public width: number;
  public orientation: number; // radians
  public inclination: number; // radians

  constructor(points: THREE.Vector3[]) {
    this.points = points;
    this.start = points[0];
    this.end = points[points.length - 1];
    this.heightDifference = this.end.y - this.start.y;
    this.width = Config.road.width;
    this._length = this.calculateLength();
    this.orientation = this.calculateOrientation();
    this.inclination = this.calculateInclination();
  }

  /**
   * Generate arc object that is used to draw the road
   * @param path
   * @returns
   */
  public static createArcObjs(path: THREE.Vector3[]) {
    let arcObj = new ArcObj(path);

    let arcShapes = [];

    for (let i = 0; i < path.length - 1; i++) {
      let arcShape = arcObj.createArcShape(path[i], path[i + 1]);
      arcShapes.push(arcShape);
    }

    return arcShapes;
  }

  /**
   * Generate arc shape that is a mesh made of different segments (materials)
   * @param pt1
   * @param pt2
   * @returns
   */
  public createArcShape(pt1: THREE.Vector3, pt2: THREE.Vector3) {
    const distance = Math.round(pt1.distanceTo(pt2) / 2);

    const laneDivision = Config.road.width * 0.02; // 5% of the road width
    const sideWalk = Config.road.width * 0.1; // 10% of the road width ;
    const laneWidth = Config.road.width * 0.38; // 35% of the road width
    const sideWalkColor = Config.color.sideWalk;
    const laneColor = Config.color.roadAsphalt;

    const ls = distance; // length segments
    const ws = 5; // width segments
    const lss = ls + 1;
    const wss = ws + 1;

    const curve = new THREE.CatmullRomCurve3([pt1, pt2]);
    const points = curve.getPoints(ls);
    const len = curve.getLength();
    const lenList = curve.getLengths(ls);

    const faceCount = ls * ws * 2;
    const vertexCount = lss * wss;

    const indices = new Uint32Array(faceCount * 3);
    const vertices = new Float32Array(vertexCount * 3);
    const uvs = new Float32Array(vertexCount * 2);

    const g = new THREE.BufferGeometry();
    g.setIndex(new THREE.BufferAttribute(indices, 1));
    g.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    g.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    let idxCount = 0;
    let a, b1, c1, c2;

    for (let j = 0; j < ls; j++) {
      for (let i = 0; i < ws; i++) {
        // 2 faces / segment,  3 vertex indices
        a = wss * j + i;
        b1 = wss * (j + 1) + i; // right-bottom
        c1 = wss * (j + 1) + 1 + i;
        //  b2 = c1							// left-top
        c2 = wss * j + 1 + i;

        indices[idxCount] = a; // right-bottom
        indices[idxCount + 1] = b1;
        indices[idxCount + 2] = c1;

        indices[idxCount + 3] = a; // left-top
        indices[idxCount + 4] = c1; // = b2,
        indices[idxCount + 5] = c2;

        g.addGroup(idxCount, 6, i); // write group for multi material

        idxCount += 6;
      }
    }

    let uvIdxCount = 0;

    for (let j = 0; j < lss; j++) {
      for (let i = 0; i < wss; i++) {
        uvs[uvIdxCount] = lenList[j] / len;
        uvs[uvIdxCount + 1] = i / ws;

        uvIdxCount += 2;
      }
    }

    let x, y, z;
    let posIdx = 0; // position index

    let tangent;
    const normal = new THREE.Vector3();
    const binormal = new THREE.Vector3(0, 1, 0);

    const t = []; // tangents
    const n = []; // normals
    const b = []; // binormals

    for (let j = 0; j < lss; j++) {
      // to the points

      tangent = curve.getTangent(j / ls);
      t.push(tangent.clone());

      normal.crossVectors(tangent, binormal);

      normal.y = 0; // to prevent lateral slope of the road

      normal.normalize();
      n.push(normal.clone());

      binormal.crossVectors(normal, tangent); // new binormal
      b.push(binormal.clone());
    }

    const dw = [
      -(laneWidth + laneDivision + sideWalk),
      -(laneWidth + laneDivision),
      -laneDivision,
      laneDivision,
      laneWidth + laneDivision,
      laneWidth + laneDivision + sideWalk,
    ]; // width from the center line

    for (let j = 0; j < lss; j++) {
      // length

      for (let i = 0; i < wss; i++) {
        // width

        x = points[j].x + dw[i] * n[j].x;
        y = points[j].y;
        z = points[j].z + dw[i] * n[j].z;

        vertices[posIdx] = x;
        vertices[posIdx + 1] = y;
        vertices[posIdx + 2] = z;

        posIdx += 3;
      }
    }

    const tex = new THREE.TextureLoader().load(
      "/threejsassets/textures/laneDivision.png"
    );
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.setX(ls * 1);

    const material = [
      new THREE.MeshBasicMaterial({
        color: sideWalkColor,
        side: THREE.DoubleSide,
      }),
      new THREE.MeshBasicMaterial({ color: laneColor, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({ color: laneColor, side: THREE.DoubleSide }),
      new THREE.MeshBasicMaterial({
        color: sideWalkColor,
        side: THREE.DoubleSide,
      }),
    ];

    const roadMesh = new THREE.Mesh(g, material);
    roadMesh.receiveShadow=true;
    roadMesh.castShadow=true;

    let bridgeBellyGeometry = g.clone();

    for (let i = 0; i < ls + 1; i++) {
      for (let j = 0; j < ws + 1; j++) {
        if (j == 2 || j == 3) {
          let yVal = bridgeBellyGeometry.attributes.position.getY(
            j + i * (ws + 1)
          );

          bridgeBellyGeometry.attributes.position.setY(
            j + i * (ws + 1),
            yVal - 3
          );
        }

        if (j == 1 || j == 4) {
          let yVal = bridgeBellyGeometry.attributes.position.getY(
            j + i * (ws + 1)
          );

          bridgeBellyGeometry.attributes.position.setY(
            j + i * (ws + 1),
            yVal - 1.5
          );
        }
      }
    }

    // add bridge belly
    const bridgeBellyMaterial = new THREE.MeshBasicMaterial({
      color: "#1a1a1a",
    });

    const bridgeBelly = new THREE.Mesh(
      bridgeBellyGeometry,
      bridgeBellyMaterial
    );

    bridgeBelly.castShadow = true;
    bridgeBelly.receiveShadow = true;

    scene.add(bridgeBelly);

    // add pillars
    if (distance > Config.connect.kOfConnect * 2) {
      let distanceBetweenPillars = 12;
      let numberOFPillars = Math.floor(distance / (distanceBetweenPillars / 2));

      for (let i = 0; i < numberOFPillars; i++) {
        let pilarPosition = MathHelper.pointOnVector3WithDistance(
          pt1,
          pt2,
          i * distanceBetweenPillars
        );

        let pilarHeight = pilarPosition.y;

        const pillarGeometry = new THREE.CylinderGeometry(
          2,
          2,
          pilarHeight,
          32
        );
        const pillarMaterial = Material.concrete();
        const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
        pillar.position.copy(pilarPosition);
        pillar.position.y = pilarHeight / 2 - 1;
        pillar.castShadow = true;

        scene.add(pillar);
      }
    }

    return roadMesh;
  }

  public calculateLength() {
    return this.start.distanceTo(this.end);
  }

  public calculateOrientation() {
    return Math.atan2(this.end.z - this.start.z, this.end.x - this.start.x);
  }

  public calculateInclination() {
    return Math.atan2(this.heightDifference, this._length);
  }
}