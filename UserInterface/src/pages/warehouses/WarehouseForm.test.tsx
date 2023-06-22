import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ObjectTesting from './WarehouseForm';
import { container } from "../../container";
import { SERVICE_KEYS } from '../../service-keys-const';
import { act, Simulate } from 'react-dom/test-utils';
import { useRef } from 'react';
import userEvent from '@testing-library/user-event';
import { IWarehouseService } from '../../services/IWarehouseService';

test('Create Warehouse with valid Data calls Submit', async () => {
  const warehouseService = container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE);
  const successSaveHandler = jest.fn();

  var spy = jest.spyOn(warehouseService, 'post').mockImplementation(() => Promise.resolve({
    data: {
      id: "00e6e562-683e-4057-af59-24b35c6ce09a",
      code: "A01",
      description: "Armazém em Arouca",
      streetName: "PRAÇA DO MUNICÍPIO",
      doorNumber: "33",
      locality: "Arouca",
      latitude: 40.9321,
      longitude: 8.2451,
      altitude: 250
    }
  } as any));

  render(<ObjectTesting warehouseService={warehouseService} submitRef={undefined} successSaveHandler={successSaveHandler}  />);

  await act(async () => {
  fireEvent.change(screen.getByRole("textbox", { name: "Warehouse Code (X00):" }), { target: { value: "A01" } });
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
    expect(successSaveHandler).toHaveBeenCalled();
  })
});


test('Create Warehouse with invalid Data does not call Submit', async () => {
  const warehouseService = container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE);
  const successSaveHandler = jest.fn();

  var spy = jest.spyOn(warehouseService, 'post').mockImplementation(() => Promise.resolve({
    data: {
      id: "00e6e562-683e-4057-af59-24b35c6ce09a",
      code: "A01",
      description: "Armazém em Arouca",
      streetName: "PRAÇA DO MUNICÍPIO",
      doorNumber: "33",
      locality: "Arouca",
      latitude: 40.9321,
      longitude: 8.2451,
      altitude: 250
    }
  } as any));

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

