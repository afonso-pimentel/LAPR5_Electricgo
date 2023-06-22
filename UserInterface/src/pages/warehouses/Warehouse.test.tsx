import { act, render, screen, waitFor } from "@testing-library/react";
import ObjectTesting from "./Warehouse";

test("Load Table On Creating Warehouse", async () => {
  render(<ObjectTesting />);
  var table = await screen.findByTestId("table");

  expect(table).toBeVisible();
});

test("Load Form On Add Warehouse", async () => {
  render(<ObjectTesting />);

  await act(async () => {
    var addBtn = await screen.findByText("Add");
    addBtn.click();
  });

  var form = await screen.findByTestId("form");

  expect(form).toBeVisible();
});

test("Load Form On Edit Warehouse", async () => {
  render(<ObjectTesting />);

  await act(async () => {
    var editBtn = await screen.findByText("Edit");
    editBtn.click();
  });

  var form = await screen.findByTestId("form");

  expect(form).toBeVisible();
});

test("inhibit warehouse", async () => {
  render(<ObjectTesting />);

  await act(async () => {
    var disableBtn = await screen.findByText("Inhibit");

    disableBtn.click();
  });

  const toasts = await screen.findAllByText(
    "You must first select a warehouse."
  );

  expect(toasts[0]).toBeInTheDocument();
});
