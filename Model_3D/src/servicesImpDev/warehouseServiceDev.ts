import { injectable } from "inversify";
import { WarehouseDto } from "../dtos/warehouse";
import { IWarehouseService } from "../services/IWarehouseService";

@injectable()
export class WarehouseServiceDev implements IWarehouseService {
  getAll(): Promise<Array<WarehouseDto>> {
    return Promise.resolve([
      {
        id: "FakeId1",
        locality: "Arouca",
        latitude: 40.9321,
        longitude: 8.2451,
        altitude: 250,
      },
      {
        id: "FakeId2",
        locality: "Espinho",
        latitude: 41.0072,
        longitude: 8.641,
        altitude: 550,
      },
      {
        id: "FakeId3",
        locality: "Gondomar",
        latitude: 42.1115,
        longitude: 8.7613,
        altitude: 200,
      },
      {
        id: "FakeId4",
        locality: "Matosinhos",
        latitude: 41.3517,
        longitude: 8.7479,
        altitude: 350,
      },
      {
        id: "FakeId5",
        locality: "Oliveira de Azeméis",
        latitude: 42.1187,
        longitude: 8.277,
        altitude: 400,
      },
      {
        id: "FakeId6",
        locality: "Paredes",
        latitude: 41.4387,
        longitude: 8.477,
        altitude: 100,
      },
      {
        id: "FakeId7",
        locality: "Vale de Cambra",
        latitude: 41.343,
        longitude: 7.7956,
        altitude: 50,
      },
      {
        id: "FakeId8",
        locality: "Trofa",
        latitude: 42.843,
        longitude: 8.7956,
        altitude: 50,
      },
      {
        id: "FakeId9",
        locality: "Scavém",
        latitude: 42.943,
        longitude: 8.4956,
        altitude: 50,
      },
      {
        id: "FakeId10",
        locality: "Valongo",
        latitude: 42.743,
        longitude: 7.8956,
        altitude: 250,
      },
    ] as WarehouseDto[]);
  }
}
