import { fireEvent, render, screen } from "@testing-library/react";
import ObjectTesting from "./PathTable";
import { container } from "../../container";
import { IDeliveryPackageService } from "../../services/IDeliveryPackageService";
import { SERVICE_KEYS } from "../../service-keys-const";
import { act } from "react-dom/test-utils";
import { IDeliveryService } from "../../services/IDeliveryService";
import { IPathService } from "../../services/IPathService";
import { IWarehouseService } from "../../services/IWarehouseService";
import ReactPaginate from "react-paginate";

test("Load Data for Paths", async () => {
  const pathService = container.get<IPathService>(SERVICE_KEYS.PATH_SERVICE);
  const warehouseService = container.get<IWarehouseService>(
    SERVICE_KEYS.WAREHOUSE_SERVICE
  );

  var spyPathService = jest
    .spyOn(pathService, "getByPage")
    .mockImplementation(() =>
      Promise.resolve({
        data: {
          paths: [
            {
              id: "330b2363-ccef-452d-bb87-a0a761d99c6a",
              startWarehouse: "00e6e562-683e-4057-af59-24b35c6ce09a",
              endWarehouse: "55f19d94-4793-44ff-9201-49368115f1fa",
              distance: 30,
              pathTime: 40,
              spentEnergy: 50,
              extraChargeTime: 20,
            },
            {
              id: "4202761f-2328-44fe-85d3-31c2079d1460",
              startWarehouse: "55f19d94-4793-44ff-9201-49368115f1fa",
              endWarehouse: "00e6e562-683e-4057-af59-24b35c6ce09a",
              distance: 40,
              pathTime: 30,
              spentEnergy: 20,
              extraChargeTime: 10,
            },
          ],
          totalPageCount: 28,
        },
      } as any)
    );

  var spyWarehouseService = jest
    .spyOn(warehouseService, "getAll")
    .mockImplementation(() =>
      Promise.resolve({
        data: [
          {
            id: "00e6e562-683e-4057-af59-24b35c6ce09a",
            code: "A01",
            description: "Armazém em Arouca",
            streetName: "LARGO DE AROUCA",
            doorNumber: "33",
            locality: "Arouca",
            latitude: 47.1,
            longitude: 38.1,
            altitude: 200,
          },
          {
            id: "55f19d94-4793-44ff-9201-49368115f1fa",
            code: "A02",
            description: "Armazém em Espinho",
            streetName: "LARGO DE Espinho",
            doorNumber: "43",
            locality: "Arouca",
            latitude: 48.1,
            longitude: 32.1,
            altitude: 300,
          },
        ],
      } as any)
    );
  const fakeHandler = jest.fn().mockImplementation((s) => {
    console.log(s);
  });

  render(
    <ObjectTesting
      pathService={pathService}
      warehouseService={warehouseService}
      updateSelectedId={fakeHandler}
    />
  );
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); //Let the data load
  });

  spyPathService.mockClear();
  spyWarehouseService.mockClear();

  var rows = document.getElementsByTagName("tr");
  expect(rows.length).toBe(4); // 2 rows + 1 header + 1 filter
});

it("should update the page number when a pagination button is clicked", () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <ReactPaginate pageCount={5} onPageChange={setPage} />
  );

  fireEvent.click(getByText("2"));
  expect(setPage).toHaveBeenCalledWith({ selected: 1 });
});

it("should update the page number when a pagination button is clicked2", () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <ReactPaginate pageCount={10} onPageChange={setPage} />
  );

  fireEvent.click(getByText("Next"));
  expect(setPage).toHaveBeenCalledWith({ selected: 1 });
});

it("should update the page number when a pagination button is clicked3", () => {
  const setPage = jest.fn();
  const { getByText } = render(
    <ReactPaginate pageCount={10} onPageChange={setPage} forcePage={2} />
  );

  fireEvent.click(getByText("Previous"));
  expect(setPage).toHaveBeenCalledWith({ selected: 1 });
});
