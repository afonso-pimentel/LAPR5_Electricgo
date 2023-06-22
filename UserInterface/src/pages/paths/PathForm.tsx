import { AxiosError } from "axios";
import { Path } from "../../models/Path";
import React, { useEffect, useState } from "react";
import { Form, Row } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { Warehouse } from "../../models/Warehouse";
import { IPathService } from "../../services/IPathService";
import { IWarehouseService } from "../../services/IWarehouseService";
import { PostPathRequestDto } from "../../dtos/Path/PostPathRequestDto";
import * as PathMapper from "../../mappers/PathMapper";
import * as WarehouseMapper from "../../mappers/WarehouseMapper";
import { toast, ToastContainer } from "react-toastify";
import { getPathContributingMatches } from "@remix-run/router/dist/utils";
import Col from 'react-bootstrap/Col'

interface PathFormProps {
  id?: String;
  pathService: IPathService;
  warehouseService: IWarehouseService;
  submitRef: React.MutableRefObject<HTMLButtonElement> | undefined;
  successSaveHandler: Function;
}

const PathForm: React.FunctionComponent<PathFormProps> = (
  props
): JSX.Element => {
  const { register, handleSubmit, setValue } = useForm<Path>({
    mode: "onBlur",
  });
  const [warehouses, setWarehouses] = useState<Array<Warehouse> | null>(null);
  const [data, setData] = useState<Path | null>(null);

  useEffect(() => {
    getWarehouses();
  }, []);

  //#region Call Api Functions
  const getWarehouses = () => {
    props.warehouseService
      .getAll()
      .then((response: any) => {
        setWarehouses(
          WarehouseMapper.GetResponseArrayToModelArray(response.data)
        );
      })
      .catch((e: AxiosError) => {
        console.log(e);
        toast.error(`Location: GetWarehouses | Status: ${e.code} 
            | Message: ${JSON.stringify(
              e?.response?.data
            )} (Is the server running?)`);
      });
  };

  const onSubmit: SubmitHandler<Path> = (data: Path) => {
    const path: PostPathRequestDto = PathMapper.FormToPostRequest(data);
    props.pathService
      .post(path)
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
          `Location: PostPath | Status: ${e.code} | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
  };
  //#endregion

  return (
    <Form
      data-testid="form"
      onSubmit={handleSubmit(onSubmit)}
      className="moduleContent"
    >
      <Row>
      <Col xs={12} md={4}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Start Warehouse:</Form.Label>
          <Form.Select
            defaultValue={data?.startWarehouse as string}
            {...register("startWarehouse", { required: true })}
          >
            {warehouses && warehouses.length > 0 ? (
              (warehouses.map((startwarehouse: Warehouse) => {
                return (
                  <option
                    key={startwarehouse.id as string}
                    value={startwarehouse.id as string}
                  >
                    {startwarehouse.code + " - " + startwarehouse.description}
                  </option>
                );
              }) as any)
            ) : (
              <option value="">Loading...</option>
            )}
          </Form.Select>
          <Form.Label>End Warehouse:</Form.Label>
          <Form.Select
            defaultValue={data?.endWarehouse as string}
            {...register("endWarehouse", { required: true })}
          >
            {warehouses && warehouses.length > 0 ? (
              (warehouses.map((endwarehouse: Warehouse) => {
                return (
                  <option
                    key={endwarehouse.id as string}
                    value={endwarehouse.id as string}
                  >
                    {endwarehouse.code + " - " + endwarehouse.description}
                  </option>
                );
              }) as any)
            ) : (
              <option value="">Loading...</option>
            )}
          </Form.Select>
        </Form.Group>
        </Col>
        <Col xs={12} md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Distance (km):</Form.Label>
          <Form.Control
            type="number"
            {...register("distance", {
              required: true,
              pattern: /^[0-9\b]+$/i,
            })}
          />
        </Form.Group>
        </Col>
        <Col xs={12} md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Path Time (Minutes):</Form.Label>
          <Form.Control
            type="number"
            {...register("pathTime", {
              required: true,
              pattern: /^[0-9\b]+$/i,
            })}
          />
        </Form.Group>
        </Col>
      </Row>
      <Row>
      <Col xs={12} md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Spent Energy:</Form.Label>
          <Form.Control
            type="number"
            {...register("spentEnergy", {
              required: true,
              pattern: /^[0-9\b]+$/i,
            })}
          />
        </Form.Group>
        </Col>
        <Col xs={12} md={4}>
        <Form.Group className="mb-3">
          <Form.Label>Extra Charge Time:</Form.Label>
          <Form.Control
            type="number"
            {...register("extraChargeTime", {
              required: true,
              pattern: /^[0-9\b]+$/i,
            })}
          />
        </Form.Group>
        </Col>
      </Row>
      <ToastContainer></ToastContainer>
      <button ref={props.submitRef} type="submit" style={{ display: "none" }} />
    </Form>
  );
};

export default PathForm;
