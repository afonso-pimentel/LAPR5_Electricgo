import { act, render, screen, waitFor } from '@testing-library/react';
import ObjectTesting from './DeliveryPackage';


test('Load Table On Creating', async () => {
  render(<ObjectTesting />);
  var table = await screen.findByTestId('table');

  expect(table).toBeVisible();
});

test('Load Form On Add', async () => {
  render(<ObjectTesting />);

  await act(async () => {
    var addBtn = await screen.findByText('Add');
    addBtn.click();
  });

  var form = await screen.findByTestId('form');

  expect(form).toBeVisible();
});

test('Load Form On Edit', async () => {
  render(<ObjectTesting />);

  await act(async () => {
    var editBtn = await screen.findByText('Edit');
    editBtn.click();
  });

    var form = await screen.findByTestId('form');

    expect(form).toBeVisible();
});