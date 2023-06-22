import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ObjectTesting from './DeliveryPackageForm';
import { container } from "../../container";
import { IDeliveryPackageService } from '../../services/IDeliveryPackageService';
import { SERVICE_KEYS } from '../../service-keys-const';
import { act, Simulate } from 'react-dom/test-utils';
import { IDeliveryService } from '../../services/IDeliveryService';
import { useRef } from 'react';
import userEvent from '@testing-library/user-event';

test('Test End To End Create', async () => {
  const deliveryService = container.get<IDeliveryService>(SERVICE_KEYS.DELIVERY_SERVICE);
  const deliveryPackageService = container.get<IDeliveryPackageService>(SERVICE_KEYS.DELIVERY_PACKAGE_SERVICE);
  const successSaveHandler = jest.fn();
  render(<ObjectTesting deliveryPackageService={deliveryPackageService} deliveryService={deliveryService} submitRef={undefined} successSaveHandler={successSaveHandler}  />);

  await act(async () => {
  fireEvent.change(screen.getByRole("spinbutton", { name: "Unload Time (Minutes):" }), { target: { value: "1" } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Load Time (Minutes):" }), { target: { value: "1" } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Position X:" }), { target: { value: "1" } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Position Y:" }), { target: { value: "1" } });
  fireEvent.change(screen.getByRole("spinbutton", { name: "Position Z:" }), { target: { value: "1" } });
  var select = screen.getByRole("combobox", { name: "Delivery:" });
  fireEvent.change(select, { target: { value: (select as HTMLSelectElement).options[0].value } });
});

  await act(async () => {
    fireEvent.click(screen.getByText('Submit'));
  });

  await waitFor(() => {
    expect(successSaveHandler).toHaveBeenCalled();
  })
});

