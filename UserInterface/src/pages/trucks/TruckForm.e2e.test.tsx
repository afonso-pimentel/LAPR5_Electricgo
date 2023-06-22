import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ObjectTesting from './TruckForm';
import { container } from "../../container";
import { ITruckService } from '../../services/ITruckService';
import { SERVICE_KEYS } from '../../service-keys-const';
import { act, Simulate } from 'react-dom/test-utils';
import { IDeliveryService } from '../../services/IDeliveryService';
import { useRef } from 'react';
import userEvent from '@testing-library/user-event';

test('Test End To End Create', async () => {
  const truckService = container.get<ITruckService>(SERVICE_KEYS.TRUCK_SERVICE);
  const successSaveHandler = jest.fn();
  render(<ObjectTesting truckService={truckService} submitRef={undefined} successSaveHandler={successSaveHandler}  />);

  // random number between 01 and 99
  const random1 = (Math.floor(Math.random() * 99) + 1) + "";
  random1.padStart(2, "0");
  const random2 = (Math.floor(Math.random() * 99) + 1) + "";
  random2.padStart(2, "0"); 

  const licensePlate = `GT-${random1}-${random2}`;
  

  await act(async () => {
    fireEvent.change(screen.getByRole("textbox", { name: "License Plate:" }), { target: { value: licensePlate } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Full Load Autonomy (km):" }), { target: { value: "1" } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Capacity (kWh):" }), { target: { value: "1" } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Fast Charge Time (minutes):" }), { target: { value: "1" } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Slow Charge Time (minutes):" }), { target: { value: "10" } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Tare (Kg):" }), { target: { value: "1" } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Load Capacity (Kg):" }), { target: { value: "1" } });
});

  await act(async () => {
    fireEvent.click(screen.getByText('Submit'));
  });

  await waitFor(() => {
    expect(successSaveHandler).toHaveBeenCalled();
  })
});

