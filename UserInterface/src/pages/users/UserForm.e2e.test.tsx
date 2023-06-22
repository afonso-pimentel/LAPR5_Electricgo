import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import ObjectTesting from './UserForm';
import { container } from "../../container";
import { SERVICE_KEYS } from '../../service-keys-const';
import { act, Simulate } from 'react-dom/test-utils';
import { IUserService } from '../../services/IUserService';

test('Create User with valid Data calls Submit [End-To-End]', async () => {
  const userService = container.get<IUserService>(SERVICE_KEYS.USER_SERVICE);
  const successSaveHandler = jest.fn();

  render(<ObjectTesting userService={userService} submitRef={undefined} successSaveHandler={successSaveHandler}  />);
  var rndNumber = Math.floor(100000000 + Math.random() * 900000000);
  await act(async () => {
    fireEvent.change(screen.getByRole("textbox", { name: "Name:" }), { target: { value: "Ricardo" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Phone Number:" }), { target: { value: rndNumber.toString() } });
    fireEvent.change(screen.getByRole("combobox", { name: "Role:" }), { target: { value: 2 } });
});

  await act(async () => {
    fireEvent.click(screen.getByText('Submit'));
  });

  await waitFor(() => {
    expect(successSaveHandler).toHaveBeenCalled();
  })
});


test('Create User with invalid Data does not call Submit [End-To-End]', async () => {
  const userService = container.get<IUserService>(SERVICE_KEYS.USER_SERVICE);
  const successSaveHandler = jest.fn();

  render(<ObjectTesting userService={userService} submitRef={undefined} successSaveHandler={successSaveHandler}  />);

  await act(async () => {
    fireEvent.change(screen.getByRole("textbox", { name: "Name:" }), { target: { value: "Ricardo" } });
    fireEvent.change(screen.getByRole("textbox", { name: "Phone Number:" }), { target: { value: "2" } });
    fireEvent.change(screen.getByRole("combobox", { name: "Role:" }), { target: { value: 2 } });
});

  await act(async () => {
    fireEvent.click(screen.getByText('Submit'));
  });

  await waitFor(() => {
    expect(successSaveHandler).toHaveBeenCalledTimes(0);
  })
});

