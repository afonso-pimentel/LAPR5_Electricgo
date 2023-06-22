import * as THREE from "three";
import { Scene } from "three";
import { Mesh } from "three";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoutesMetadata } from "../classes/warehouse";
import { scene } from "../core/renderer";
import {
  TruckMovementHelper,
  TruckNextPosition,
} from "../utils/truckMovementHelper";
import KeyStates from "./keyStates";
import { TruckMovimentTypes } from "./truckMovementTypes";

export interface TruckSettings {
  height: number;
  width: number;
  depth: number;
  turningSpeed: number;
  inclinationSpeed: number;
  speed: number;
}

export class Truck {
  public truck3dModel: THREE.Object3D<THREE.Event> | undefined;

  private static truckSettings = {
    height: 2,
    width: 2,
    depth: 2,
    turningSpeed: 75.0, // expressed in degrees/second,
    inclinationSpeed: 85.0, // expressed in degrees/second
    speed: 0.35,
  } as TruckSettings;

  private direction: number; // expressed in degrees
  private inclinationGoal: number;
  private currentPointIdentifier: string;
  private currentInclination: number;
  public keyStates: KeyStates;
  public clock: THREE.Clock;
  private roundabouts: THREE.Vector3[];
  private routes: RoutesMetadata[];

  public constructor(
    sceneModelOfTruck: THREE.Object3D<THREE.Event>,
    roundabouts: THREE.Vector3[],
    routes: RoutesMetadata[]
  ) {
    this.truck3dModel = sceneModelOfTruck;
    this.direction = 0;
    this.keyStates = {
      left: false,
      right: false,
      backwards: false,
      forwards: false,
    } as unknown as KeyStates;

    this.roundabouts = roundabouts;
    this.routes = routes;
    this.direction = 0;
    this.inclinationGoal = -100;
    this.currentInclination = 0;
    this.clock = new THREE.Clock();
    this.currentPointIdentifier = "";
  }

  /**
   * Loads a truck into a specific position in the world.
   * @param position Position of the truck in 3 AXIS(X,Y,Z)
   */
  public static loadTruck(position: THREE.Vector3) {
    const gltfLoader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();

    dracoLoader.setDecoderPath(
      "/threejsassets/draco/gltf/"
    );
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load("/threejsassets/models/truck/truck.gltf", (object) => {
      object.scene.name = "Truck3DModel";

      object.scene.scale.set(
        Truck.truckSettings.width,
        Truck.truckSettings.height,
        Truck.truckSettings.depth
      );
      object.scene.position.set(position.x, position.y, position.z);

      object.scene.traverse((truck3dModel)=>{

        if(truck3dModel instanceof Mesh){
          truck3dModel.castShadow=true;
        }

      });

      scene.add(object.scene);
    });
  }


  public position(): THREE.Vector3 | undefined {
    if (this.truck3dModel != undefined) {
      return this.truck3dModel.position;
    }

    return undefined;
  }

  public moveTruck(scene: Scene) {
    if (this.truck3dModel != undefined) {
      const elapsedTime = this.clock.getDelta();

      let directionIncrement = Truck.truckSettings.turningSpeed * elapsedTime;

      if (this.keyStates.right && (this.keyStates.forward || this.keyStates.backward)) {
        directionIncrement = directionIncrement * -1;
      }

      if ((this.keyStates.left || this.keyStates.right) && (this.keyStates.forward || this.keyStates.backward)) {
        const currentDirectionInRadians = THREE.MathUtils.degToRad(
          this.direction
        );
        const directionIncrementInRadians =
          THREE.MathUtils.degToRad(directionIncrement);

        let finalDirectionWithIncrementInRadians =
          currentDirectionInRadians + directionIncrementInRadians;
        let directionIncrementCalculationInRadians = 0;

        if (finalDirectionWithIncrementInRadians < -(Math.PI * 2)) {
          const diff = finalDirectionWithIncrementInRadians + Math.PI * 2;
          directionIncrementCalculationInRadians =
            directionIncrementInRadians + diff * -1;
          // reset turn axis
          this.direction = 0;
        } else if (finalDirectionWithIncrementInRadians > Math.PI * 2) {
          const diff = finalDirectionWithIncrementInRadians - Math.PI * 2;
          directionIncrementCalculationInRadians =
            directionIncrementInRadians - diff;
          // reset turn axis
          this.direction = 0;
        } else {
          directionIncrementCalculationInRadians = directionIncrementInRadians;
        }

        this.direction += THREE.MathUtils.radToDeg(
          directionIncrementCalculationInRadians
        );
        this.truck3dModel.rotateY(directionIncrementCalculationInRadians);
      }

      const directionInRadians = THREE.MathUtils.degToRad(this.direction);

      let movementType: TruckMovimentTypes | undefined;

      if (this.keyStates.forward) {
        movementType = TruckMovimentTypes.FORWARD;
      }

      if (this.keyStates.backward) {
        movementType = TruckMovimentTypes.BACKWARDS;
      }

      if (movementType != undefined) {
        let nextCoordinates: TruckNextPosition | undefined =
          TruckMovementHelper.calculateNextCoordinates(
            Truck.truckSettings,
            this.truck3dModel.position,
            directionInRadians,
            movementType,
            this.roundabouts,
            this.routes
          );

        if (nextCoordinates != undefined) {
          if (this.inclinationGoal === -100) {
            this.inclinationGoal = nextCoordinates?.currentRoadInclination;
          }

          if (
            nextCoordinates.currentRoadIdentifier != this.currentPointIdentifier
          ) {
            this.currentPointIdentifier = nextCoordinates.currentRoadIdentifier;
            // The inclination the truck should have
            this.inclinationGoal = nextCoordinates.currentRoadInclination;
            if (this.inclinationGoal == 0) {
              this.inclinationGoal += 0.0001;
            }
          }

          // Based on three.js animations what should the inclination increment be?
          let animationInclinationIncrement = THREE.MathUtils.degToRad(
            Truck.truckSettings.inclinationSpeed * elapsedTime
          );

          // Detect scenario when truck needs to reduce it's inclination
          if (this.currentInclination > this.inclinationGoal) {
            animationInclinationIncrement *= -1;
          }

          const overallInclinationIncrement =
            this.currentInclination + animationInclinationIncrement;

          if (
            (this.inclinationGoal < 0 &&
              overallInclinationIncrement < this.inclinationGoal) ||
            (this.inclinationGoal > 0 &&
              overallInclinationIncrement > this.inclinationGoal)
          ) {
            const differenceBetweenInclinationGoalAndIncrement =
              overallInclinationIncrement - this.inclinationGoal;
            animationInclinationIncrement -=
              differenceBetweenInclinationGoalAndIncrement;
          }

          this.truck3dModel.position.set(
            nextCoordinates.x,
            nextCoordinates.y,
            nextCoordinates.z
          );
          let group = scene.getObjectByName("TestGroup");
          if (group != undefined) {
            group.position.set(
              nextCoordinates.x,
              nextCoordinates.y,
              nextCoordinates.z
            );

            const angle = group.position.angleTo(this.truck3dModel.position);
            console.log(`Angle: ${angle}`);
          }

          if (this.currentInclination != this.inclinationGoal) {
            this.truck3dModel.rotateX(animationInclinationIncrement);
            console.log(
              `Animation inclination crement: ${animationInclinationIncrement}`
            );

            this.currentInclination += animationInclinationIncrement;
          }

          console.log(
            `Current truck3d model rotation Y axis: ${this.truck3dModel.rotation.y}`
          );
          /*console.log(`Current inclination: ${this.currentInclination}`);
             console.log(`Inclination goal: ${this.inclinationGoal}`);*/
        }
      }
    }
  }
}
