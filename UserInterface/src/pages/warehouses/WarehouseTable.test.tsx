import { render, screen } from "@testing-library/react";
import ObjectTesting from "./WarehouseTable";
import { container } from "../../container";
import { IWarehouseService } from "../../services/IWarehouseService";
import { SERVICE_KEYS } from "../../service-keys-const";
import { act } from "react-dom/test-utils";

test("Load Data", async () => {
  const warehouseService = container.get<IWarehouseService>(
    SERVICE_KEYS.WAREHOUSE_SERVICE
  );
  var spy = jest.spyOn(warehouseService, "getAll").mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: "1",
          code: "A00",
          description: "Warehouse A",
          streetName: "Rua Warehouse A",
          doorNumber: "1",
          locality: "Porto",
          latitude: 40.9999,
          longitude: -8.1111,
          altitude: 50,
        },
        {
          id: "2",
          code: "A01",
          description: "Warehouse B",
          streetName: "Rua Warehouse B",
          doorNumber: "2",
          locality: "Lisboa",
          latitude: 35.8888,
          longitude: -7.2222,
          altitude: 70,
        },
        {
          id: "3",
          code: "A02",
          description: "Warehouse C",
          streetName: "Rua Warehouse C",
          doorNumber: "3",
          locality: "Aveiro",
          latitude: 45.1234,
          longitude: -5.2322,
          altitude: 100,
        },
      ],
    } as any)
  );
  const fakeHandler = jest.fn().mockImplementation(s => {
    console.log(s);
  });

  render(
    <ObjectTesting
      warehouseService={warehouseService}
      updateSelectedId={fakeHandler}
    />
  );
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); //Let the data load
  });
  spy.mockClear();
  var rows = document.getElementsByTagName("tr");
  expect(rows.length).toBe(5); // 3 rows + 1 header + 1 filter
});
