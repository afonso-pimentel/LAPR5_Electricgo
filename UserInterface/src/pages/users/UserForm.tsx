import { AxiosError } from "axios";
import { User } from "../../models/User";
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUserService } from "../../services/IUserService";
import { PostUserRequestDto } from "../../dtos/User/PostUserRequestDto";
import * as UserMapper from "../../mappers/UserMapper";
import { toast, ToastContainer } from "react-toastify";
import Col from 'react-bootstrap/Col'

interface UserFormProps {
  id?: String;
  userService: IUserService;
  submitRef: React.MutableRefObject<HTMLButtonElement> | undefined;
  successSaveHandler: Function;
}

const UserForm: React.FunctionComponent<UserFormProps> = (
  props
): JSX.Element => {
  const { register, handleSubmit, setValue } = useForm<User>({
    mode: "onBlur",
  });
  const [data, setData] = useState<User | null>(null);

  const onSubmit: SubmitHandler<User> = async (data: User) => {
    const User: PostUserRequestDto =
      UserMapper.FormToPostRequest(data);
    props.userService
      .post(User)
      .then((response: any) => {
        props.successSaveHandler.call(response);
      })
      .catch((e: AxiosError) => {
        if(e.response?.status === 400){
          toast.error(
            "Invalid data: " +
              ((e.response as any).data.error)
          );
          return;
        }
        if (e.response?.status !== 500) {
          toast.error(
            "Invalid data: " +
              JSON.stringify(((e.response as any).data as any).errors)
          );
          return;
        }
        console.log(e);
        toast.error(
          `Location: PostUser | Status: ${
            e.code
          } | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
  };
  //#endregion

  return (
    <Form data-testid='form' onSubmit={handleSubmit(onSubmit)} className="moduleContent">
      <Row>
      <Col xs={12} md={3}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="string"
            {...register("name", {
              required: true
            })}
          />
        </Form.Group>
        </Col>
        <Col xs={12} md={3}>
        <Form.Group controlId="phoneNumber">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="string"
            {...register("phoneNumber", {
              required: true,
              pattern: /^[0-9]{9}$/i,
            })}
          />
        </Form.Group>
        </Col>
        <Col xs={12} md={3}>
        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="string"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
            })}
          />
        </Form.Group>
        </Col>
        <Col xs={12} md={3}>
        <Form.Group controlId="role">
          <Form.Label>Role:</Form.Label>
          <Form.Select {...register("role", { required: true })}>
            <option key="1" value="1">Administrator</option>;
            <option key="2" value="2">Logistics Manager</option>;
            <option key="3" value="3">Warehouse Manager</option>;
            <option key="4" value="4">Fleet Manager</option>;
          </Form.Select>
        </Form.Group>
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
      <Button data-testid="button" ref={props.submitRef} type="submit" style={{ display: 'none' }}>Submit</Button>
    </Form>
  );
};

export default UserForm;
