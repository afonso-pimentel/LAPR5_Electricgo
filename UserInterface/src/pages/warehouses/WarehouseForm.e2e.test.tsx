import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ObjectTesting from './WarehouseForm';
import { container } from "../../container";
import { SERVICE_KEYS } from '../../service-keys-const';
import { act, Simulate } from 'react-dom/test-utils';
import { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { IWarehouseService } from '../../services/IWarehouseService';

test('Create Warehouse with valid Data calls Submit [End-To-End]', async () => {
  const warehouseService = container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE);
  const successSaveHandler = jest.fn();

  render(<ObjectTesting warehouseService={warehouseService} submitRef={undefined} successSaveHandler={successSaveHandler}  />);

  await act(async () => {
  fireEvent.change(screen.getByRole("textbox", { name: "Warehouse Code (X00):" }), { target: { value: "A99" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Description:" }), { target: { value: "Armazém em Arouca" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Street Name:" }), { target: { value: "PRAÇA DO MUNICÍPIO" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Door Number:" }), { target: { value: "33" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Zip Code:" }), { target: { value: "4544-001" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Locality:" }), { target: { value: "Mosteiró" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Latitude:" }), { target: { value: "40.9321" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Longitude:" }), { target: { value: "8.2451" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Altitude:" }), { target: { value: "250" } });
});
  
  await act(async () => {
    fireEvent.click(screen.getByText('Submit'));
  });

  await waitFor(() => {
    expect(successSaveHandler).toHaveBeenCalled();
  })
});


test('Create Warehouse with invalid Data does not call Submit [End-To-End]', async () => {
  const warehouseService = container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE);
  const successSaveHandler = jest.fn();

  render(<ObjectTesting warehouseService={warehouseService} submitRef={undefined} successSaveHandler={successSaveHandler}  />);

  await act(async () => {
  fireEvent.change(screen.getByRole("textbox", { name: "Warehouse Code (X00):" }), { target: { value: "INVALID WAREHOUSE CODE" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Description:" }), { target: { value: "Armazém em Arouca" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Street Name:" }), { target: { value: "PRAÇA DO MUNICÍPIO" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Door Number:" }), { target: { value: "33" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Zip Code:" }), { target: { value: "4544-001" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Locality:" }), { target: { value: "Arouca" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Latitude:" }), { target: { value: "40.9321" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Longitude:" }), { target: { value: "8.2451" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Altitude:" }), { target: { value: "250" } });
});
  
  await act(async () => {
    fireEvent.click(screen.getByText('Submit'));
  });

  await waitFor(() => {
    expect(successSaveHandler).toHaveBeenCalledTimes(0);
  })
});

