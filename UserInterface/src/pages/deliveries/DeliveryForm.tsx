import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Form, Row } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { Delivery } from '../../models/Delivery';
import { Warehouse } from '../../models/Warehouse';
import { IDeliveryService } from '../../services/IDeliveryService';
import { IWarehouseService } from '../../services/IWarehouseService';
import { PostDeliveryRequestDto } from '../../dtos/Delivery/PostDeliveryRequestDto';
import * as DeliveryMapper from '../../mappers/DeliveryMapper';
import * as WarehouseMapper from '../../mappers/WarehouseMapper';
import { toast, ToastContainer } from 'react-toastify';
import Col from 'react-bootstrap/Col'


interface DeliveryFormProps {
    id?: String;
    deliveryService: IDeliveryService,
    warehouseService: IWarehouseService,
    submitRef: React.MutableRefObject<HTMLButtonElement> | undefined,
    successSaveHandler: Function,
}

const DeliveryForm: React.FunctionComponent<DeliveryFormProps> = (props): JSX.Element => {
    const { register, handleSubmit, setValue } = useForm<Delivery>({ mode: 'onBlur' });

    const [warehouses, setWarehouses] = useState<Array<Warehouse> | null>(null);
    const [data, setData] = useState<Delivery | null>(null);

    useEffect(() => {
        getWarehouses();
        if (props.id)
            getDelivery(props.id);
    }, []);

    //#region Call Api Functions
    const getDelivery = (id: String) => {
        props.deliveryService.get(id)
            .then((response: any) => {
                const data: Delivery = DeliveryMapper.GetResponseToModel(response.data);
                setData(data);
                setValue("warehouseId", data.warehouseId);
                setValue("deliveryDate", data.deliveryDate);
                setValue("load", data.load);
            })
            .catch((e: AxiosError) => {
                console.log(e);
                toast.error(`Location: GetDelivery | Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
            });
    };

    const getWarehouses = () => {
        props.warehouseService.getAll()
            .then((response: any) => {
                setWarehouses(WarehouseMapper.GetResponseArrayToModelArray(response.data));
            })
            .catch((e: AxiosError) => {
                console.log(e);
                toast.error(`Location: GetDeliveries | Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
            });
    };

    const onSubmit: SubmitHandler<Delivery> = data => {
        console.log(data);
        const delivery: PostDeliveryRequestDto = DeliveryMapper.FormToPostRequest(data);
        console.log(delivery);
        props.deliveryService.post(delivery)
            .then((response: any) => {
                props.successSaveHandler.call(response);
            })
            .catch((e: AxiosError) => {
                if (e.response?.status !== 500) {
                    toast.error("Invalid data: " + JSON.stringify(((e.response as any).data as any).errors));
                    return;
                }
                console.log(e);
                toast.error(`Location: PostDelivery | Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
            });
    }
    //#endregion

    return (
        <Form data-testid='form' onSubmit={handleSubmit(onSubmit)} className="moduleContent">
            <Row>
               <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="warehouseId">
                    <Form.Label>Warehouse:</Form.Label>
                    <Form.Select defaultValue={data?.warehouseId as string} {...register("warehouseId", { required: true })}>
                        {
                            warehouses && warehouses.length > 0 ? warehouses.map((warehouse: Warehouse) => {
                                return <option key={warehouse.id as string} value={warehouse.id as string}>{warehouse.code + ' - ' + warehouse.description}</option>;
                            }) as any :
                                <option value=''>Loading...</option>
                        }
                    </Form.Select>
                </Form.Group>
                </Col>
      <Col xs={12} md={4}>
                <Form.Group className="" controlId="deliveryDate">
                    <Form.Label>Date:</Form.Label>
                    <Form.Control
                        type="date"
                        {...register("deliveryDate", { required: true })}/>
                </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="load">
                    <Form.Label>Load (Kg):</Form.Label>
                    <Form.Control type='number' {...register("load", { required: true, pattern: /^[0-9\b]+$/i })} />
                </Form.Group>
                </Col>
            </Row>
            <ToastContainer></ToastContainer>
            <Button data-testid="button" ref={props.submitRef} type="submit" style={{ display: 'none' }}>Submit</Button>
        </Form>
    );
}

export default DeliveryForm
