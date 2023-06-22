import { AxiosError } from "axios";
import { Warehouse } from "../../models/Warehouse";
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { IWarehouseService } from "../../services/IWarehouseService";
import { PostWarehouseRequestDto } from "../../dtos/Warehouse/PostWarehouseRequestDto";
import * as WarehouseMapper from "../../mappers/WarehouseMapper";
import { toast, ToastContainer } from "react-toastify";
import Col from 'react-bootstrap/Col'

interface WarehouseFormProps {
  id?: String;
  warehouseService: IWarehouseService;
  submitRef: React.MutableRefObject<HTMLButtonElement> | undefined;
  successSaveHandler: Function;
}

const WarehouseForm: React.FunctionComponent<WarehouseFormProps> = (
  props
): JSX.Element => {
  const { register, handleSubmit, setValue } = useForm<Warehouse>({
    mode: "onBlur",
  });
  const [data, setData] = useState<Warehouse | null>(null);

  const onSubmit: SubmitHandler<Warehouse> = async (data: Warehouse) => {
    const warehouse: PostWarehouseRequestDto =
      WarehouseMapper.FormToPostRequest(data);
    props.warehouseService
      .post(warehouse)
      .then((response: any) => {
        props.successSaveHandler.call(response);
      })
      .catch((e: AxiosError) => {
        if (e.response?.status !== 500) {
          toast.error(
            "Invalid data: " +
              JSON.stringify(((e.response as any).data as any).errors)
          );
          return;
        }
        console.log(e);
        toast.error(
          `Location: PostWarehouse | Status: ${
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
      <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="warehouse">
          <Form.Label>Warehouse Code (X00):</Form.Label>
          <Form.Control
            type="string"
            {...register("code", {
              required: true,
              pattern: /[A-Z][0-9][0-9]/i,
            })}
          />
        </Form.Group>
        </Col>
        <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="string"
            {...register("description", {
              required: true,
            })}
          />
        </Form.Group>
        </Col>
      </Row>
      <Row>
      <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="streetName">
          <Form.Label>Street Name:</Form.Label>
          <Form.Control
            type="string"
            {...register("streetName", {
              required: true,
            })}
          />
        </Form.Group>
        </Col>
      <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="doorNumber">
          <Form.Label>Door Number:</Form.Label>
          <Form.Control
            type="string"
            {...register("doorNumber", {
              required: true,
              pattern: /^[0-9\b]+$/i,
            })}
          />
        </Form.Group>
        </Col>
      <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="zipCode">
          <Form.Label>Zip Code:</Form.Label>
          <Form.Control
            type="string"
            {...register("zipCode", {
              required: true,
              pattern: /^\d{4}-\d{3}$/,
            })}
          />
        </Form.Group>
        </Col>
      <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="locality">
          <Form.Label>Locality:</Form.Label>
          <Form.Control
            type="string"
            {...register("locality", {
              required: true,
            })}
          />
        </Form.Group>
        </Col>
      </Row>
      <Row>
      <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="latitude">
          <Form.Label>Latitude:</Form.Label>
          <Form.Control
            type="string"
            {...register("latitude", {
              required: true,
              pattern: /^-?\d+\.\d{0,4}$/,
            })}
          />
        </Form.Group>
        </Col>
      <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="longitude">
          <Form.Label>Longitude:</Form.Label>
          <Form.Control
            type="string"
            {...register("longitude", {
              required: true,
              pattern: /^-?\d+\.\d{0,4}$/,
            })}
          />
        </Form.Group>
        </Col>
      <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="altitude">
          <Form.Label>Altitude:</Form.Label>
          <Form.Control
            type="string"
            {...register("altitude", {
              required: true,
              pattern: /^[0-9\b]+$/i,
            })}
          />
        </Form.Group>
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
      <Button data-testid="button" ref={props.submitRef} type="submit" style={{ display: 'none' }}>Submit</Button>
    </Form>
  );
};

export default WarehouseForm;
