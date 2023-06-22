import { render, screen } from "@testing-library/react";
import ObjectTesting from "./UserTable";
import { container } from "../../container";
import { IUserService } from "../../services/IUserService";
import { SERVICE_KEYS } from "../../service-keys-const";
import { act } from "react-dom/test-utils";

test("Load Data", async () => {
  const userService = container.get<IUserService>(
    SERVICE_KEYS.USER_SERVICE
  );
  var spy = jest.spyOn(userService, "getAll").mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: "00e6e562-683e-4057-af59-24b35c6ce09a",
          name: "Ricardo",
          phoneNumber: "123456789",
          role: 1,
        },
        {
          id: "00e3e562-683e-4057-af59-24b35c6ce09a",
          name: "Rui",
          phoneNumber: "987654321",
          role: 3,
        },
        {
          id: "00e65562-683e-4057-af59-24b35c6ce09a",
          name: "Afonso",
          phoneNumber: "568547245",
          role: 2,
        },
      ],
    } as any)
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
  spy.mockClear();
  var rows = document.getElementsByTagName("tr");
  expect(rows.length).toBe(5); // 3 rows + 1 header + 1 filter
});




test("Load Data has a status svg", async () => {
  const userService = container.get<IUserService>(
    SERVICE_KEYS.USER_SERVICE
  );
  var spy = jest.spyOn(userService, "getAll").mockImplementation(() =>
    Promise.resolve({
      data: [
        {
          id: "00e6e562-683e-4057-af59-24b35c6ce09a",
          name: "Ricardo",
          phoneNumber: "123456789",
          role: 1,
        },
        {
          id: "00e3e562-683e-4057-af59-24b35c6ce09a",
          name: "Rui",
          phoneNumber: "987654321",
          role: 3,
        },
        {
          id: "00e65562-683e-4057-af59-24b35c6ce09a",
          name: "Afonso",
          phoneNumber: "568547245",
          role: 2,
        },
      ],
    } as any)
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


  spy.mockClear();
  var rows = document.getElementsByTagName("svg");
  expect(rows.length).toBe(3); // 3 rows + 1 header + 1 filter
});
