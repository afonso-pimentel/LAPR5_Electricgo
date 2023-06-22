import { injectable } from "inversify";
import { PathDto } from "../dtos/path";
import { IPathService } from "../services/IPathService";

@injectable()
export class PathServiceDev implements IPathService {
  getAll(): Promise<Array<PathDto>> {
    return Promise.resolve([
      // Arouca
      {
        startWarehouse: "FakeId1",
        endWarehouse: "FakeId2",
        distance: 10,
      },
      {
        startWarehouse: "FakeId1",
        endWarehouse: "FakeId5",
        distance: 10,
      },
      {
        startWarehouse: "FakeId1",
        endWarehouse: "FakeId7",
        distance: 10,
      },
      // Espinho
      {
        startWarehouse: "FakeId2",
        endWarehouse: "FakeId1",
        distance: 10,
      },
      {
        startWarehouse: "FakeId2",
        endWarehouse: "FakeId4",
        distance: 10,
      },
      // Gondomar
      {
        startWarehouse: "FakeId3",
        endWarehouse: "FakeId5",
        distance: 10,
      },
      {
        startWarehouse: "FakeId3",
        endWarehouse: "FakeId4",
        distance: 10,
      },
      {
        startWarehouse: "FakeId3",
        endWarehouse: "FakeId8",
        distance: 10,
      },
      // Matosinhos
      {
        startWarehouse: "FakeId4",
        endWarehouse: "FakeId2",
        distance: 10,
      },
      {
        startWarehouse: "FakeId4",
        endWarehouse: "FakeId3",
        distance: 10,
      },
      {
        startWarehouse: "FakeId4",
        endWarehouse: "FakeId6",
        distance: 10,
      },
      // Oliveira de Azeméis
      {
        startWarehouse: "FakeId5",
        endWarehouse: "FakeId1",
        distance: 10,
      },
      {
        startWarehouse: "FakeId5",
        endWarehouse: "FakeId3",
        distance: 10,
      },
      {
        startWarehouse: "FakeId5",
        endWarehouse: "FakeId9",
        distance: 10,
      },
      {
        startWarehouse: "FakeId5",
        endWarehouse: "FakeId10",
        distance: 10,
      },
      {
        startWarehouse: "FakeId5",
        endWarehouse: "FakeId7",
        distance: 10,
      },
      // Paredes
      {
        startWarehouse: "FakeId6",
        endWarehouse: "FakeId4",
        distance: 10,
      },
      // Vale de Cambra
      {
        startWarehouse: "FakeId7",
        endWarehouse: "FakeId10",
        distance: 10,
      },
      {
        startWarehouse: "FakeId7",
        endWarehouse: "FakeId1",
        distance: 10,
      },
      {
        startWarehouse: "FakeId7",
        endWarehouse: "FakeId5",
        distance: 10,
      },
      // Trofa
      {
        startWarehouse: "FakeId8",
        endWarehouse: "FakeId9",
        distance: 10,
      },
      {
        startWarehouse: "FakeId8",
        endWarehouse: "FakeId3",
        distance: 10,
      },
      // Sacavém
      {
        startWarehouse: "FakeId9",
        endWarehouse: "FakeId10",
        distance: 10,
      },
      {
        startWarehouse: "FakeId9",
        endWarehouse: "FakeId5",
        distance: 10,
      },
      {
        startWarehouse: "FakeId9",
        endWarehouse: "FakeId8",
        distance: 10,
      },
      // Valongo
      {
        startWarehouse: "FakeId10",
        endWarehouse: "FakeId5",
        distance: 10,
      },
      {
        startWarehouse: "FakeId10",
        endWarehouse: "FakeId7",
        distance: 10,
      },
      {
        startWarehouse: "FakeId10",
        endWarehouse: "FakeId9",
        distance: 10,
      },
    ] as PathDto[]);
  }
}
