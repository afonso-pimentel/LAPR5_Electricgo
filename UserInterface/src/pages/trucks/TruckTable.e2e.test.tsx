import { render, screen } from "@testing-library/react";
import ObjectTesting from "./TruckTable";
import { container } from "../../container";
import { ITruckService } from "../../services/ITruckService";
import { SERVICE_KEYS } from "../../service-keys-const";
import { act } from "react-dom/test-utils";

test("Test End To End", async () => {
  const truckService = container.get<ITruckService>(
    SERVICE_KEYS.DELIVERY_PACKAGE_SERVICE
  );

  const fakeHandler = jest.fn().mockImplementation(s => {
    console.log(s);
  });

  render(
    <ObjectTesting truckService={truckService} updateSelectedId={fakeHandler} />
  );
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); //Let the data load
  });

  var rows = document.getElementsByTagName("tr");
  expect(rows.length).toBeGreaterThan(3); // 2 rows + 1 header + 1 filter
});
