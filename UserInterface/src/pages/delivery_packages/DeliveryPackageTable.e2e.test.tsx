import { render, screen } from '@testing-library/react';
import ObjectTesting from './DeliveryPackageTable';
import { container } from "../../container";
import { IDeliveryPackageService } from '../../services/IDeliveryPackageService';
import { SERVICE_KEYS } from '../../service-keys-const';
import { act } from 'react-dom/test-utils';
import { IDeliveryService } from '../../services/IDeliveryService';

test('Test End To End', async () => {

  const deliveryPackageService = container.get<IDeliveryPackageService>(SERVICE_KEYS.DELIVERY_PACKAGE_SERVICE);
  const deliveryService = container.get<IDeliveryService>(SERVICE_KEYS.DELIVERY_SERVICE);

  const fakeHandler = jest.fn().mockImplementation((s) => { console.log(s) });

  render(<ObjectTesting deliveryPackageService={deliveryPackageService} deliveryService={deliveryService} updateSelectedId={fakeHandler} />);
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); //Let the data load
  });

  var rows = document.getElementsByTagName('tr');
  expect(rows.length).toBeGreaterThan(3); // 2 rows + 1 header + 1 filter
});


