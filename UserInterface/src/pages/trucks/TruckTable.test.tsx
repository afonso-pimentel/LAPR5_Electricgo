import { render, screen } from "@testing-library/react";
import ObjectTesting from "./TruckTable";
import { container } from "../../container";
import { ITruckService } from "../../services/ITruckService";
import { SERVICE_KEYS } from "../../service-keys-const";
import { act } from "react-dom/test-utils";

test("Load Data", async () => {
  const truckService = container.get<ITruckService>(
    SERVICE_KEYS.DELIVERY_PACKAGE_SERVICE
  );
  var spy = jest.spyOn(truckService, "getAll").mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: "1",
          tare: 4,
          loadCapacity: 5,
          fullLoadAutonomy: 20,
          capacity: 80,
          fastChargeTime: 3,
          slowChargeTime: 30,
          licensePlate: "12-TR-YU",
        },
        {
          id: "2",
          tare: 4,
          loadCapacity: 5,
          fullLoadAutonomy: 20,
          capacity: 80,
          fastChargeTime: 3,
          slowChargeTime: 30,
          licensePlate: "12-TR-YE",
        },
        {
          id: "3",
          tare: 4,
          loadCapacity: 5,
          fullLoadAutonomy: 20,
          capacity: 80,
          fastChargeTime: 3,
          slowChargeTime: 30,
          licensePlate: "12-TR-YI",
        },
      ],
    } as any)
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
  spy.mockClear();
  var rows = document.getElementsByTagName("tr");
  expect(rows.length).toBe(5); // 3 rows + 1 header + 1 filter
});
