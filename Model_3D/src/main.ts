import { renderer, scene } from "./core/renderer";
import camera from "./core/camera";
import { controls } from "./core/orbit-control";

import "./style.css";
import * as Light from "./core/lighting";
import { Ground } from "./objects/ground";
import { WarehousesObj } from "./objects/warehouses";
import { Rotunda } from "./objects/roads/rotunda";
import { PathBuilder } from "./classes/pathBuilder";
import { RoutesMetadata, Warehouse } from "./classes/warehouse";
import { Path } from "./classes/path";
import { RoadDrawer } from "./classes/roadDrawer";
import { IPathService } from "./services/IPathService";
import { SERVICE_KEYS } from "./service-keys-const";
import { IWarehouseService } from "./services/IWarehouseService";
import { container } from "./container";
import { Skybox } from "./core/skybox";
import { ModelLoader } from "./core/modelLoader";
import { CookieHelper } from "./utils/cookieHelper";
import { WarehouseDto } from "./dtos/warehouse";
import { PathDto } from "./dtos/path";
import { TextLoader } from "./core/textLoader";
import { CustomFog } from "./core/fog";
import { gui } from "./core/gui";
import { Truck } from "./player/truck";
import * as THREE from "three";
import * as AutoTruck from "./animation/autoTruck";
import { MathHelper } from "./utils/mathHelper";
import { Trip } from "./classes/trip";

const keyCodes = {
  left: "ArrowLeft",
  right: "ArrowRight",
  backward: "ArrowDown",
  forward: "ArrowUp",
  startGame: "Space",
  stopGame: "KeyQ",
};

let truckCharacter: Truck | undefined;
let roundabouts: THREE.Vector3[] | undefined;
let routes: RoutesMetadata[] | undefined;

function init() {
  //* ##################################################################### //
  //* ##################### add all parts to the scene #################### //
  //* ##################################################################### //

  let ambientLight = Light.ambient();
  scene.add(ambientLight); // add lighting

  let directionalLight = Light.directional();
  scene.add(directionalLight); // add lighting

  let sea = Ground.generateSea();
  scene.add(sea); // add the ground

  let skybox = Skybox.generateSkybox();
  scene.add(skybox);

  CustomFog.fog(); // add fog, this also adds the gui option to toggle fog

  let island = Ground.generateIsland(100, 100);
  scene.add(island);

  // if there are no warehouses or paths loaded, do not try to draw them
  if (warehouseData && pathData) {
    let warehouseList = Warehouse.dataToWarehouseList(warehouseData);

    let pathList = Path.dataToPathList(pathData, warehouseList);

    let processedWarehouseList = PathBuilder.buildPathsForWarehouses(
      warehouseList,
      pathList
    );

    let rotundas = Rotunda.generateRotundasFromWarehouseList(
      processedWarehouseList
    );
    scene.add(...rotundas);

    const loader = new ModelLoader();
    processedWarehouseList.forEach((warehouse) => {
      loader.tree(warehouse.position);
    });

    const mainWarehouse = processedWarehouseList.find((warehouse) => {
      return warehouse.city.toUpperCase().includes("GONDOMAR");
    });

    if (mainWarehouse != undefined) {
      var truckPosition = new THREE.Vector3(
        mainWarehouse.position.x,
        mainWarehouse.position.y,
        mainWarehouse.position.z - 10
      );
      Truck.loadTruck(truckPosition);
    }

    WarehousesObj.loadWarehousesObj(processedWarehouseList);

    TextLoader.groupedCityNames(processedWarehouseList);

    let roadObjList = RoadDrawer.generateRoads(processedWarehouseList);
    scene.add(...roadObjList);

    let riseList = WarehousesObj.genRises(processedWarehouseList);
    scene.add(...riseList);

    let tt = Warehouse.extractRoutesAndRotundasFromWarehouses(
      processedWarehouseList
    );

    roundabouts = tt.rotundas;
    routes = tt.listOfRoutesMetadata;

    // let simulatedDeliveryList = ["FakeId3", "FakeId8"];

    let simulatedDeliveryList = [
      "FakeId4",
      "FakeId3",
      "FakeId8",
      "FakeId9",
      "FakeId10",
      "FakeId5",
      "FakeId7",
      "FakeId1",
      "FakeId2",
      "FakeId4",
    ];

    let trip = Trip.tripBuilder(simulatedDeliveryList, processedWarehouseList);

    AutoTruck.initTrips(trip);

    // let autoTruckCookie = CookieHelper.getCookie("isRunning") ?? "true";
    // let guiAutoTruckName = autoTruckCookie === "true" ? "On" : "Off";

    const truckLoader = new ModelLoader();

    truckLoader.truck().then((truck) => {
      let cubeWidth: number = 4.2;
      let cubeHeight: number = 6;
      let cubeDepth: number = 5;
      const geometry = new THREE.BoxGeometry(cubeWidth, cubeHeight, cubeDepth);

      const material = new THREE.MeshBasicMaterial({
        color: 0x000000, // Black color
        wireframe: true,
        transparent: true, // Enable transparency
        opacity: 0, // Fully transparent
      });
      const cube = new THREE.Mesh(geometry, material);

      truck.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      cube.name = "truckBox";
      cube.add(truck);
      truck.position.setX(-cubeWidth / 2);
      scene.add(cube);
      cube.position.copy(trip.routePoints[0]);

      var isRunning = false;
      gui
        .add(
          {
            test: () => {
              // CookieHelper.toggleCookie("isRunning");
              isRunning = !isRunning;
              AutoTruck.animateAutoTruck(isRunning);
            },
          },
          "test"
        )
        .name("Auto Truck: ");

      // // let uy = new THREE.Vector3(0, 0, 0);
      // console.log("cube", cube.position);

      // let truckPt = { position: truck.position };

      // let toggleAutoTruckCamera = gui
      //   .add(truckPt, "position")
      //   .name("camera auto truck");

      // // Listen for changes to the dropdown menu
      // toggleAutoTruckCamera.onChange(function (value) {
      //   // Find the city object with the selected city name
      //   let city = warehouseCities.find((d) => d.city === value);

      //   citiesObj.position = city.position;
      //   citiesObj.camera = city.camera;

      //   controls.target = citiesObj.position;
      //   controls.update();
      //   animateTrackAutoTruck();
      // });

      var trackCube: boolean = false;
      function setCameraToAutoTruckPosition() {
        trackCube = !trackCube;
        if (trackCube) {
          // camera.position.set(
          //   cube.position.x,
          //   cube.position.y,
          //   cube.position.z
          // );

          // controls.target = cube.position;
          // controls.update();

          animateCameraTrackAutoTruck();
        } else {
          controls.target = new THREE.Vector3(
            cube.position.x,
            0,
            cube.position.z
          );
          controls.update();
        }
      }

      gui
        .add({ func: () => setCameraToAutoTruckPosition() }, "func")
        .name("Set Camera to Auto Truck");

      const animateCameraTrackAutoTruck = () => {
        if (!trackCube) {
          return;
        }

        let frontPoint = new THREE.Vector3();
        frontPoint.copy(cube.position);
        frontPoint.z += cubeDepth / 2;
        frontPoint.x += cubeWidth / 2;

        let backPoint = new THREE.Vector3();
        backPoint.copy(cube.position);
        backPoint.z -= cubeDepth / 2;
        backPoint.x -= cubeWidth / 2;

        let displacedPoint = MathHelper.getPointAtDistance(
          frontPoint,
          backPoint,
          70
        );
        displacedPoint.y += 50;

        controls.target = cube.position;
        controls.update();
        camera.position.lerp(displacedPoint, 0.2);
        controls.update();

        requestAnimationFrame(animateCameraTrackAutoTruck);
      };
    });

    const warehouseCities =
      Warehouse.extractWarehouseCitiesAndDisplacedPositions(
        processedWarehouseList
      );

    var citiesObj = {
      city: warehouseCities[0].city,
      position: warehouseCities[0].position,
      camera: warehouseCities[0].camera,
    };

    // Create a dropdown menu for the cities
    var citySelect = gui
      .add(
        citiesObj,
        "city",
        warehouseCities.map((d: any) => d.city)
      )
      .name("Go To:");

    // Listen for changes to the dropdown menu
    citySelect.onChange(function (value) {
      // Find the city object with the selected city name
      var city = warehouseCities.find((d: any) => d.city === value);

      citiesObj.position = city.position;
      citiesObj.camera = city.camera;

      controls.target = citiesObj.position;
      controls.update();
      animateMoveToWarehouse();
    });

    const animateMoveToWarehouse = () => {
      if (camera.position.distanceTo(citiesObj.camera) < 1) {
        return;
      }
      camera.position.lerp(citiesObj.camera, 0.2);

      requestAnimationFrame(animateMoveToWarehouse);
    };
  }

  //* ##################################################################### //
  //* ############################## add gui ############################## //
  //* ##################################################################### //

  gui
    .add(skybox as any, "visible")
    .name("Skybox")
    .setValue(true);

  // add a source data toggle on the gui between the dev and prod data
  let developmentCookie = CookieHelper.getCookie("development") ?? "true";
  let guiSourceName =
    developmentCookie === "true" ? "development" : "production";

  gui
    .add(
      { development: () => CookieHelper.toggleCookieAndReload("development") },
      "development"
    )
    .name("Source: " + guiSourceName);

  // Axes Helper
  /* const axesHelper = new THREE.AxesHelper(100);
   axesHelper.setColors("#ff0000", "#00ff00", "#0000ff");
  scene.add(axesHelper);
   gui.add(axesHelper, "visible").name("Axes Helper").setValue(true);*/

  //* Call animate function

  animate();
}

//* ##################################################################### //
//* ################## Prepare Warehouse and Path Data ################## //
//* ##################################################################### //

let warehouseData: Array<WarehouseDto>;
let pathData: Array<PathDto>;

Promise.all([
  container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE).getAll(),
  container.get<IPathService>(SERVICE_KEYS.PATH_SERVICE).getAll(),
]).then((data) => {
  warehouseData = data[0];
  pathData = data[1];
  init();
});

//* ##################################################################### //
//* ########################## Animate function ######################### //
//* ##################################################################### //

let playGame: boolean = false;

const onDocumentKey = (event: KeyboardEvent, state: boolean) => {
  if (document.activeElement == document.body && truckCharacter != undefined) {
    if (event.code == keyCodes.left) {
      truckCharacter.keyStates.left = state;
    } else if (event.code == keyCodes.right) {
      truckCharacter.keyStates.right = state;
    }
    if (event.code == keyCodes.backward) {
      truckCharacter.keyStates.backward = state;
    } else if (event.code == keyCodes.forward) {
      truckCharacter.keyStates.forward = state;
    } else if (event.code == keyCodes.startGame) {
      playGame = true;
    } else if (event.code == keyCodes.stopGame) {
      playGame = false;
    }
  }
};

// Register the event handler to be called on key press
document.addEventListener("keydown", (event) => onDocumentKey(event, true));

// Register the event handler to be called on key release
document.addEventListener("keyup", (event) => onDocumentKey(event, false));

const animate = () => {
  TextLoader.animateCityNames();

  controls.update();

  if (truckCharacter === undefined) {
    let sceneObject = scene.getObjectByName("Truck3DModel");

    if (
      sceneObject != undefined &&
      roundabouts != undefined &&
      routes != undefined
    ) {
      truckCharacter = new Truck(sceneObject, roundabouts, routes);
      console.log(`Truck model has been LOADED!`);
    }
  }

  if (playGame && truckCharacter != undefined) {
    truckCharacter.moveTruck(scene);

    const truckPosition = truckCharacter.position();

    if (truckPosition != undefined) {
      //creating an offset position for camera with respect to the car
      var offset = new THREE.Vector3(
        truckPosition.x + 30,
        truckPosition.y + 20,
        truckPosition.z + 10
      );
      // tried to create delay position value for enable smooth transition for camera
      camera.position.lerp(offset, 0.2);
      // updating lookat alway look at the car
      camera.lookAt(truckPosition);
    }
  }

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};
