import { render, screen } from "@testing-library/react";
import ObjectTesting from "./UserTable";
import { container } from "../../container";
import { IUserService } from "../../services/IUserService";
import { SERVICE_KEYS } from "../../service-keys-const";
import { act } from "react-dom/test-utils";

test("Test End To End", async () => {
  const userService = container.get<IUserService>(
    SERVICE_KEYS.USER_SERVICE
  );

  const fakeHandler = jest.fn().mockImplementation(s => {
    console.log(s);
  });

  render(
    <ObjectTesting
      userService={userService}
      updateSelectedId={fakeHandler}
      refreshTrigger={0}
    />
  );
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); //Let the data load
  });

  var rows = document.getElementsByTagName("tr");
  expect(rows.length).toBeGreaterThan(3); // 2 rows + 1 header + 1 filter
});
