import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ObjectTesting from "./PathForm";
import { container } from "../../container";
import { IPathService } from "../../services/IPathService";
import { SERVICE_KEYS } from "../../service-keys-const";
import { act, Simulate } from "react-dom/test-utils";
import { useRef } from "react";
import userEvent from "@testing-library/user-event";
import { IWarehouseService } from "../../services/IWarehouseService";

test("Test End To End Create", async () => {
  const warehouseService = container.get<IWarehouseService>(
    SERVICE_KEYS.WAREHOUSE_SERVICE
  );
  const pathService = container.get<IPathService>(SERVICE_KEYS.PATH_SERVICE);
  const successSaveHandler = jest.fn();
  render(
    <ObjectTesting
      pathService={pathService}
      warehouseService={warehouseService}
      submitRef={undefined}
      successSaveHandler={successSaveHandler}
    />
  );

  await act(async () => {
    fireEvent.change(
      screen.getByRole("spinbutton", { name: "Distance (km):" }),
      { target: { value: "1" } }
    );
    fireEvent.change(
      screen.getByRole("spinbutton", { name: "Path Time (Minutes):" }),
      { target: { value: "1" } }
    );
    fireEvent.change(
      screen.getByRole("spinbutton", { name: "Spent Energy:" }),
      {
        target: { value: "1" },
      }
    );
    fireEvent.change(
      screen.getByRole("spinbutton", { name: "Extra Charge Time:" }),
      {
        target: { value: "1" },
      }
    );
    var select1 = screen.getByRole("combobox", { name: "Start Warehouse:" });
    fireEvent.change(select1, {
      target: { value: (select1 as HTMLSelectElement).options[0].value },
    });
    var select2 = screen.getByRole("combobox", { name: "End Warehouse:" });
    fireEvent.change(select2, {
      target: { value: (select2 as HTMLSelectElement).options[0].value },
    });
  });

  await act(async () => {
    fireEvent.click(screen.getByText("Submit"));
  });

  await waitFor(() => {
    expect(successSaveHandler).toHaveBeenCalled();
  });
});
