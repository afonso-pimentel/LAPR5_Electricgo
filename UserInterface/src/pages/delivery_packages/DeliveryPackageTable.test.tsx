import { render, screen } from '@testing-library/react';
import ObjectTesting from './DeliveryPackageTable';
import { container } from "../../container";
import { IDeliveryPackageService } from '../../services/IDeliveryPackageService';
import { SERVICE_KEYS } from '../../service-keys-const';
import { act } from 'react-dom/test-utils';
import { IDeliveryService } from '../../services/IDeliveryService';

test('Load Data', async () => {

  const deliveryPackageService = container.get<IDeliveryPackageService>(SERVICE_KEYS.DELIVERY_PACKAGE_SERVICE);
  const deliveryService = container.get<IDeliveryService>(SERVICE_KEYS.DELIVERY_SERVICE);
  var spy = jest.spyOn(deliveryService, 'getAll').mockImplementation(() => Promise.resolve({
    data: [
      {
          id: "1",
          deliveryDate: "2022-11-30 23:00:00 ",
          load: 12,
      }
    ]
  } as any));
  var spy2 = jest.spyOn(deliveryPackageService, 'getAll').mockImplementation(() => Promise.resolve({
    data: [
      {
        id: "1",
        deliveryId: "1",
        loadTime: 3,
        unloadTime: 3,
        x: 3,
        y: 3,
        z: 3,
      },
      {
        id: "4",
        deliveryId: "1",
        loadTime: 3,
        unloadTime: 3,
        x: 3,
        y: 3,
        z: 3,
      },
      {
        id: "2",
        deliveryId: "1",
        loadTime: 3,
        unloadTime: 3,
        x: 3,
        y: 3,
        z: 3,
      }
    ]
  } as any));
  const fakeHandler = jest.fn().mockImplementation((s) => { console.log(s) });

  render(<ObjectTesting deliveryPackageService={deliveryPackageService} deliveryService={deliveryService} updateSelectedId={fakeHandler} />);
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); //Let the data load
  });
  spy.mockClear();
  var rows = document.getElementsByTagName('tr');
  expect(rows.length).toBe(5); // 3 rows + 1 header + 1 filter
});


