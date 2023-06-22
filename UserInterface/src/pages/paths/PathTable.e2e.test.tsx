import { render, screen } from '@testing-library/react';
import ObjectTesting from './PathTable';
import { container } from "../../container";
import { SERVICE_KEYS } from '../../service-keys-const';
import { act } from 'react-dom/test-utils';
import { IPathService } from '../../services/IPathService';
import { IWarehouseService } from '../../services/IWarehouseService';

test('Load Data for Paths End-To-End', async () => {

  const pathService = container.get<IPathService>(SERVICE_KEYS.PATH_SERVICE);
  const warehouseService = container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE);

  const fakeHandler = jest.fn().mockImplementation((s) => { console.log(s) });

  render(<ObjectTesting pathService={pathService} warehouseService={warehouseService} updateSelectedId={fakeHandler} />);
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 3000)); //Let the data load
  });

  var rows = document.getElementsByTagName('tr');
  expect(rows.length).toBeGreaterThan(2); // 1 header + 1 filter
});


