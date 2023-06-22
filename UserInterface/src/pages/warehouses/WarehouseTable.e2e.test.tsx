import { render, screen } from "@testing-library/react";
import ObjectTesting from "./WarehouseTable";
import { container } from "../../container";
import { IWarehouseService } from "../../services/IWarehouseService";
import { SERVICE_KEYS } from "../../service-keys-const";
import { act } from "react-dom/test-utils";

test("Test End To End", async () => {
  const warehouseService = container.get<IWarehouseService>(
    SERVICE_KEYS.WAREHOUSE_SERVICE
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

  var rows = document.getElementsByTagName("tr");
  expect(rows.length).toBeGreaterThan(3); // 2 rows + 1 header + 1 filter
});
