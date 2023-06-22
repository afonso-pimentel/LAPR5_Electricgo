import { fireEvent, render, screen } from "@testing-library/react";
import ObjectTesting from "./TripTable";
import { container } from "../../container";
import { SERVICE_KEYS } from "../../service-keys-const";
import { act } from "react-dom/test-utils";
import { IDeliveryService } from "../../services/IDeliveryService";
import { IWarehouseService } from "../../services/IWarehouseService";
import { ITruckService } from "../../services/ITruckService";
import { ITripService } from "../../services/ITripService";
import React from "react";

test("Load Data for Paths", async () => {
    const deliveryService = container.get<IDeliveryService>(SERVICE_KEYS.DELIVERY_SERVICE);
    const warehouseService = container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE);
    const truckService = container.get<ITruckService>(SERVICE_KEYS.TRUCK_SERVICE);
    const tripService = container.get<ITripService>(SERVICE_KEYS.TRIP_SERVICE);

    var spyTripService = jest
      .spyOn(tripService, "getAllByPage")
      .mockImplementation(() =>
        Promise.resolve({
            data: {
                trips: [
                    {
                        id: "63ac3d81c3e21003c608d30a",
                        truckId: "3dea7256-09c9-46c7-a88f-d84257603ce3",
                        date: "2022-12-29",
                        warehouseIds: [
                            "c2b7777d-6ba1-40c4-9fbe-470ddc165393",
                            "bc6b0307-3531-42f2-864d-9f5d74b13789",
                            "68699020-a01e-4b50-bb19-8e041f6d1a75",
                            "ef6ff355-bdb1-4c10-b5ad-6d45bf1ab958",
                            "ed904a97-3463-4b08-aea7-cb28d743f3c7",
                            "fcdf630f-c87e-4c16-9ccf-b01632793549",
                            "00e6e562-683e-4057-af59-24b35c6ce09a"
                        ],
                        deliveryIds: [
                            "f52f2735-caff-45ae-a210-54370a80800f",
                            "10f1bcbb-a370-4040-9461-6ce184a918ce",
                            "aeba6553-d915-42ef-82d0-a0a528b5ac54",
                            "47fb76c8-6a38-4742-a991-00d374221e7b",
                            "872a025e-2d6f-4e06-b159-52f4757d7a06",
                            "d8408472-0758-4195-ad5d-41a55f4cd256",
                            "8e412c75-e29e-4dde-8b5d-4993c9a0336d"
                        ],
                        areWarehousesToCharge: [
                            false,
                            false,
                            false,
                            true,
                            false,
                            false,
                            true
                        ],
                        chargeQuantities: [
                            0,
                            0,
                            0,
                            40.72542372881355,
                            0,
                            0,
                            27.940677966101696
                        ],
                        chargeTimes: [
                            0,
                            0,
                            0,
                            50.90677966101694,
                            0,
                            0,
                            34.92584745762712
                        ],
                        planningCost: 477.70872881355933,
                        heuristic: "1"
                    },
                    {
                        id: "63ac81d79b4e28f366439cad",
                        truckId: "854db77c-ad9d-4027-8318-e45bf76226a3",
                        date: "2022-12-29",
                        warehouseIds: [
                            "c2b7777d-6ba1-40c4-9fbe-470ddc165393",
                            "bc6b0307-3531-42f2-864d-9f5d74b13789",
                            "68699020-a01e-4b50-bb19-8e041f6d1a75",
                            "ef6ff355-bdb1-4c10-b5ad-6d45bf1ab958",
                            "ed904a97-3463-4b08-aea7-cb28d743f3c7",
                            "fcdf630f-c87e-4c16-9ccf-b01632793549",
                            "00e6e562-683e-4057-af59-24b35c6ce09a"
                        ],
                        deliveryIds: [
                            "f52f2735-caff-45ae-a210-54370a80800f",
                            "10f1bcbb-a370-4040-9461-6ce184a918ce",
                            "aeba6553-d915-42ef-82d0-a0a528b5ac54",
                            "47fb76c8-6a38-4742-a991-00d374221e7b",
                            "872a025e-2d6f-4e06-b159-52f4757d7a06",
                            "d8408472-0758-4195-ad5d-41a55f4cd256",
                            "8e412c75-e29e-4dde-8b5d-4993c9a0336d"
                        ],
                        areWarehousesToCharge: [
                            false,
                            false,
                            false,
                            true,
                            false,
                            false,
                            true
                        ],
                        chargeQuantities: [
                            0,
                            0,
                            0,
                            40.72542372881355,
                            0,
                            0,
                            27.940677966101696
                        ],
                        chargeTimes: [
                            0,
                            0,
                            0,
                            50.90677966101694,
                            0,
                            0,
                            34.92584745762712
                        ],
                        planningCost: 477.70872881355933,
                        heuristic: "4"
                    }
                ],
                totalPageCount: 3
            }
        } as any)
      );

    var spyWarehouseService = jest
      .spyOn(warehouseService, "getAll")
      .mockImplementation(() =>
        Promise.resolve({
          data:
          [
            {
               id: "00e6e562-683e-4057-af59-24b35c6ce09a",
               code: "A01",
               description: "Armazém em Arouca",
               streetName: "PRAÇA DO MUNICÍPIO",
               doorNumber: "243",
               locality: "Arouca",
               latitude: 40.9321,
               longitude: -8.2451,
               altitude: 250,
               isActive: true
            },
            {
               id: "55f19d94-4793-44ff-9201-49368115f1fa",
               code: "A02",
               description: "Armazém em Espinho",
               streetName: "LG. JOSÉ SALVADOR",
               doorNumber: "111",
               locality: "Espinho",
               latitude: 41.0072,
               longitude: -8.641,
               altitude: 550,
               isActive: true
            },
            {
               id: "fcdf630f-c87e-4c16-9ccf-b01632793549",
               code: "A03",
               description: "Armazém em Gondomar",
               streetName: "PRAÇA MANUEL GUEDES",
               doorNumber: "503",
               locality: "Gondomar",
               latitude: 42.1115,
               longitude: -8.7613,
               altitude: 200,
               isActive: true
            },
            {
               id: "fcfc1999-16b0-4ee5-b4d3-17969680cee5",
               code: "A04",
               description: "Armazém em Maia",
               streetName: "PRAÇA DO MUNICÍPIO",
               doorNumber: "503",
               locality: "Maia",
               latitude: 41.2279,
               longitude: -8.621,
               altitude: 700,
               isActive: true
            },
            {
               id: "ec5b7755-fb6d-4689-814f-061c94c3c92a",
               code: "A05",
               description: "Armazém em Matosinhos",
               streetName: "AV. D. AFONSO HENRIQUES",
               doorNumber: "503",
               locality: "Matosinhos",
               latitude: 41.1844,
               longitude: -8.6963,
               altitude: 350,
               isActive: true
            },
            {
               id: "43c81b97-bcfa-42c3-81ba-300de00719b0",
               code: "A06",
               description: "Armazém em Oliveira de Azemeis",
               streetName: "PRAÇA DA REPÚBLICA",
               doorNumber: "503",
               locality: "Oliveira de Azemeis",
               latitude: 40.8387,
               longitude: -8.477,
               altitude: 750,
               isActive: true
            },
            {
               id: "ceb40bc3-e183-4c38-9c0c-8da3d06b96f4",
               code: "A07",
               description: "Armazém em Paredes",
               streetName: "PRAÇA JOSÉ GUILHERME",
               doorNumber: "503",
               locality: "Paredes",
               latitude: 41.252,
               longitude: -8.3304,
               altitude: 0,
               isActive: true
            },
            {
               id: "ef6ff355-bdb1-4c10-b5ad-6d45bf1ab958",
               code: "A08",
               description: "Armazém em Porto",
               streetName: "PRAÇA GENERAL HUMBERTO DELGADO",
               doorNumber: "503",
               locality: "Porto",
               latitude: 41.1579,
               longitude: -8.6291,
               altitude: 600,
               isActive: true
            },
            {
               id: "c2b7777d-6ba1-40c4-9fbe-470ddc165393",
               code: "A09",
               description: "Armazém em Povoa de Varzim",
               streetName: "PRAÇA DO ALMADA",
               doorNumber: "503",
               locality: "Povoa de Varzim",
               latitude: 41.3804,
               longitude: -8.7609,
               altitude: 400,
               isActive: true
            },
            {
               id: "7d27a83d-3669-4c19-be65-98e83ad8d2dc",
               code: "A10",
               description: "Armazém em Santa Maria da Feira",
               streetName: "PRAÇA DA REPÚBLICA",
               doorNumber: "503",
               locality: "Santa Maria da Feira",
               latitude: 40.9268,
               longitude: -8.5483,
               altitude: 100,
               isActive: true
            },
            {
               id: "68699020-a01e-4b50-bb19-8e041f6d1a75",
               code: "A11",
               description: "Armazém em Santo Tirso",
               streetName: "PRAÇA 25 DE ABRIL",
               doorNumber: "503",
               locality: "Santo Tirso",
               latitude: 41.3431,
               longitude: -8.4738,
               altitude: 650,
               isActive: true
            },
            {
               id: "cfcd1543-47f1-43e0-9981-ce009edaf720",
               code: "A12",
               description: "Armazém em Sao Joao da Madeira",
               streetName: "AV. DA LIBERDADE",
               doorNumber: "503",
               locality: "Sao Joao da Madeira",
               latitude: 40.905,
               longitude: -8.4907,
               altitude: 300,
               isActive: true
            },
            {
               id: "ab949c29-557e-4e4d-9507-460280028f37",
               code: "A13",
               description: "Armazém em Trofa",
               streetName: "RUA DAS INDUSTRIAS",
               doorNumber: "503",
               locality: "Trofa",
               latitude: 41.3391,
               longitude: -8.56,
               altitude: 450,
               isActive: true
            },
            {
               id: "abe30730-8acc-48d8-ab63-6c83190b8d81",
               code: "A14",
               description: "Armazém em Vale de Cambra",
               streetName: "Av. CAMILO TAVARES DE MATOS",
               doorNumber: "503",
               locality: "Vale de Cambra",
               latitude: 40.843,
               longitude: -8.3956,
               altitude: 50,
               isActive: true
            },
            {
               id: "ed904a97-3463-4b08-aea7-cb28d743f3c7",
               code: "A15",
               description: "Armazém em Valongo",
               streetName: "AV. 5 DE OUTUBRO",
               doorNumber: "503",
               locality: "Valongo",
               latitude: 41.1887,
               longitude: -8.4983,
               altitude: 800,
               isActive: true
            },
            {
               id: "bc6b0307-3531-42f2-864d-9f5d74b13789",
               code: "A16",
               description: "Armazém em Vila do Conde",
               streetName: "R. DA IGREJA",
               doorNumber: "503",
               locality: "Vila do Conde",
               latitude: 41.3517,
               longitude: -8.7479,
               altitude: 150,
               isActive: true
            },
            {
               id: "4a6a89a2-ccd8-4612-9bca-f95b74658099",
               code: "A17",
               description: "Armazém em Vila Nova de Gaia",
               streetName: "RUA ALVARES CABRAL",
               doorNumber: "503",
               locality: "Vila Nova de Gaia",
               latitude: 41.1239,
               longitude: -8.6118,
               altitude: 500,
               isActive: true
            }
        ],
        } as any)
      );

      var spyTruckService = jest
      .spyOn(truckService, "getAll")
      .mockImplementation(() =>
        Promise.resolve({
          data:
          [
            {
               id: "3dea7256-09c9-46c7-a88f-d84257603ce3",
               tare: 7500,
               loadCapacity: 4300,
               fullLoadAutonomy: 84,
               capacity: 84,
               fastChargeTime: 20,
               slowChargeTime: 30,
               licensePlate: "65-20-VA",
               isActive: true
            },
            {
               id: "854db77c-ad9d-4027-8318-e45bf76226a3",
               tare: 7500,
               loadCapacity: 5300,
               fullLoadAutonomy: 84,
               capacity: 84,
               fastChargeTime: 100,
               slowChargeTime: 120,
               licensePlate: "54-80-BA",
               isActive: true
            },
            {
               id: "cd9ea99b-c4e3-410f-86be-92fab890ea52",
               tare: 10,
               loadCapacity: 1,
               fullLoadAutonomy: 1,
               capacity: 10,
               fastChargeTime: 1,
               slowChargeTime: 1,
               licensePlate: "RL-40-40",
               isActive: true
            }
        ],
        } as any)
      );


      var spyDeliveryService = jest
      .spyOn(deliveryService, "getAll")
      .mockImplementation(() =>
        Promise.resolve({
          data:
          [
            {
                id: "8e412c75-e29e-4dde-8b5d-4993c9a0336d",
                warehouseId: "00e6e562-683e-4057-af59-24b35c6ce09a",
                deliveryDate: "06/01/2023 22:58:26",
                load: "200"
            },
            {
                id: "f52f2735-caff-45ae-a210-54370a80800f",
                warehouseId: "c2b7777d-6ba1-40c4-9fbe-470ddc165393",
                deliveryDate: "06/01/2023 22:58:26",
                load: "150"
            },
            {
                id: "d8408472-0758-4195-ad5d-41a55f4cd256",
                warehouseId: "fcdf630f-c87e-4c16-9ccf-b01632793549",
                deliveryDate: "06/01/2023 22:58:26",
                load: "100"
            },
            {
                id: "47fb76c8-6a38-4742-a991-00d374221e7b",
                warehouseId: "ef6ff355-bdb1-4c10-b5ad-6d45bf1ab958",
                deliveryDate: "06/01/2023 22:58:26",
                load: "120"
            },
            {
                id: "aeba6553-d915-42ef-82d0-a0a528b5ac54",
                warehouseId: "68699020-a01e-4b50-bb19-8e041f6d1a75",
                deliveryDate: "06/01/2023 22:58:26",
                load: "300"
            },
            {
                id: "10f1bcbb-a370-4040-9461-6ce184a918ce",
                warehouseId: "bc6b0307-3531-42f2-864d-9f5d74b13789",
                deliveryDate: "06/01/2023 22:58:26",
                load: "300"
            },
            {
                id: "872a025e-2d6f-4e06-b159-52f4757d7a06",
                warehouseId: "ed904a97-3463-4b08-aea7-cb28d743f3c7",
                deliveryDate: "06/01/2023 22:58:26",
                load: "300"
            }
        ],
        } as any)
      );


    const fakeHandler = jest.fn().mockImplementation((s) => {
      console.log(s);
    });
    const showDetailsRef = React.createRef();
    render(
      <ObjectTesting
        deliveryService={deliveryService}
        warehouseService={warehouseService}
        tripService={tripService}
        truckService={truckService}
        showDetailsRef={showDetailsRef}
        updateSelectedId={fakeHandler}
      />
    );
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); //Let the data load
    });

    spyWarehouseService.mockClear();
    spyTruckService.mockClear();
    spyDeliveryService.mockClear();
    spyTripService.mockClear();

    var rows = document.getElementsByTagName("tr");
    expect(rows.length).toBe(4); // 2 rows + 1 header + 1 filter
  });