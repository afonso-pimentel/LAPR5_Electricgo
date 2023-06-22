import { act, render, screen, waitFor } from '@testing-library/react';
import ObjectTesting from './Trip';

test('Load Table On Creating Trip', async () => {
  render(<ObjectTesting />);
  var table = await screen.findByTestId('table');

  expect(table).toBeVisible();
});
