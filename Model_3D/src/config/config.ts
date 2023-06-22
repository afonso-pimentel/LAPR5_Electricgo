// x is horizontal / left and right
// y is vertical / up and down
// z is depth / front and back

export const Config: any = {
  canvasDomId: "#webgl",
  scale: 3,
  displaceDistance: 15,
  InfinityNumber: 0.1,
  camera: {
    position: {
      x: 0,
      y: 150,
      z: 150,
    },
  },
  color: {
    sceneBg: "#333",
    lightDirectional: "#ffffff",
    lightAmbient: "#ffffff",
    concrete: "#aaaaaa",
    asphalt: "#1a1a1a",
    roadAsphalt: "#0a0a0a",
    sideWalk: "#aaaaaa",
    rotundaGrass: "#2a742c",
    treeLeaves: "#2a742c",
    treeBark: "#3c2f2f",
    hill: "#61811f",
    ground: "#61811f",
    groundToSand: "#817e1f",
    sand: "#e6e26d",
    sandToSea: "#dfdd95",
    sea: "#1ec8ff",
  },
  warehouse: {
    scale: {
      x: 2,
      y: 2,
      z: 2,
    },
    height: 18,
  },
  arc: {
    curvePoints: 5,
  },
  rotunda: {
    kOfCircle: 5,
  },
  connect: {
    kOfConnect: 8,
  },
  road: {
    width: 9,
    height: 0.1,
  },
  skyboxSize: 2000,
  ground: {
    width: 100,
    height: 100,
  },
  island: {
    height: 10,
  },
  sea: {
    width: 1000,
    height: 1000,
  },
  fog: {
    near: 400,
    far: 1000,
    color: "#ffffff",
  },
  //Default constants values for Lat, Long and Altitude Conversion
  lat: {
    min: -50,
    max: 50,
  },
  long: {
    min: -50,
    max: 50,
  },
  alt: {
    min: 0,
    max: 10,
  },
  truck: {
    width: 2,
    height: 2,
    depth: 2,
  },
  autoTruck: {
    largeCurveSegments: 30,
    smallCurveSegments: 20,
  },
  warehouseApiUrl:
    "http://ec2-35-181-130-177.eu-west-3.compute.amazonaws.com/warehouse/api/",
  logisticsApiUrl:
    "http://ec2-35-181-130-177.eu-west-3.compute.amazonaws.com/logistics/api/",
  development: true,
};

export const WarehouseColors: any = {
  default: {
    roof: "#6b73c5",
    walls: "#9aba54",
    windows: "#8bd2f6",
    frames: "#573018",
  },
  Arouca: {
    roof: "#2a742c",
    walls: "#108965",
    windows: "#8bd2f6",
    frames: "#aaaaaa",
  },
  Espinho: {
    roof: "#722a74",
    walls: "#a01717",
    windows: "#8bd2f6",
    frames: "#5d2c15",
  },
  Gondomar: {
    roof: "#2a3c74",
    walls: "#009b10",
    windows: "#8bd2f6",
    frames: "#1b3189",
  },
  Maia: {
    roof: "#2a742c",
    walls: "#89102e",
    windows: "#8bd2f6",
    frames: "#aaaaaa",
  },
  Matosinhos: {
    roof: "#742a74",
    walls: "#108940",
    windows: "#8bd2f6",
    frames: "#8e2d2d",
  },
  Porto: {
    roof: "#2a742c",
    walls: "#161089",
    windows: "#8bd2f6",
    frames: "#aaaaaa",
  },
  Povoa_de_Varzim: {
    roof: "#2a742c",
    walls: "#161089",
    windows: "#8bd2f6",
    frames: "#aaaaaa",
  },
  Santa_Maria_da_Feira: {
    roof: "#2a3b74",
    walls: "#108912",
    windows: "#8bd2f6",
    frames: "#23943a",
  },
  Santo_Tirso: {
    roof: "#1f2842",
    walls: "#897910",
    windows: "#8bd2f6",
    frames: "#232394",
  },
  Sao_Joao_da_Madeira: {
    roof: "#bf7a25",
    walls: "#891e10",
    windows: "#8bd2f6",
    frames: "#94236a",
  },
  Trofa: {
    roof: "#1dd70c",
    walls: "#107f89",
    windows: "#8bd2f6",
    frames: "#2c9423",
  },
  Vale_de_Cambra: {
    roof: "#653415",
    walls: "#897910",
    windows: "#8bd2f6",
    frames: "#362394",
  },
  Valongo: {
    roof: "#422e1f",
    walls: "#10892a",
    windows: "#8bd2f6",
    frames: "#942341",
  },
  Vila_do_Conde: {
    roof: "#e36f16",
    walls: "#891071",
    windows: "#8bd2f6",
    frames: "#d2910f",
  },
  Vila_Nova_de_Gaia: {
    roof: "#38c63f",
    walls: "#b89f71",
    windows: "#8bd2f6",
    frames: "#711a31",
  },
};
