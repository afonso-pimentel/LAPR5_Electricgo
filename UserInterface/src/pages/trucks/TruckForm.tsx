import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import { Button, Form, Row } from 'react-bootstrap';
import { useForm, SubmitHandler } from "react-hook-form";
import { Truck } from '../../models/Truck';
import { ITruckService } from '../../services/ITruckService';
import { PostTruckRequestDto } from '../../dtos/Truck/PostTruckRequestDto';
import * as TruckMapper from '../../mappers/TruckMapper';
import { toast, ToastContainer } from 'react-toastify';

interface TruckFormProps {
    id?: String;
    truckService: ITruckService,
    submitRef: React.MutableRefObject<HTMLButtonElement> | undefined,
    successSaveHandler: Function,
}

const TruckForm: React.FunctionComponent<TruckFormProps> = (props): JSX.Element => {
    const { register, handleSubmit, setValue } = useForm<Truck>({ mode: 'onBlur' });


    const onSubmit: SubmitHandler<Truck> = data => {
        const truck: PostTruckRequestDto = TruckMapper.FormToPostRequest(data);
        props.truckService.post(truck)
            .then((response: any) => {
                props.successSaveHandler.call(response);
            })
            .catch((e: AxiosError) => {

                // handle invalid data errors
                if (e.response?.status === 400) {
                    toast.error("Invalid data: " + JSON.stringify(((e.response as any).data as any)));
                    return;
                }

                // handle other errors other than internal server error
                if (e.response?.status !== 500) {
                    toast.error("Invalid data: " + JSON.stringify(((e.response as any).data as any).errors));
                    return;
                }

                // fallback
                console.log(e);
                toast.error(`Location: PostTruck | Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
            });
    }
    //#endregion
    return (
        <Form data-testid='form' onSubmit={handleSubmit(onSubmit)} className="moduleContent">
            <Row>
                <Col xs={12} md={4}>
                    <Form.Group className="mb-3" controlId="licensePlate">
                        <Form.Label>License Plate:</Form.Label>
                        <Form.Control type='text' {...register("licensePlate", { required: true, pattern: /^([a-zA-Z]|[0-9]){2}-([a-zA-Z]|[0-9]){2}-([a-zA-Z]|[0-9]){2}$/i })} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={4}>
                    <Form.Group className="mb-3" controlId="tare">
                        <Form.Label>Tare (Kg):</Form.Label>
                        <Form.Control type='number' {...register("tare", { required: true, pattern: /^[0-9\b]+$/i })} />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group className="mb-3" controlId="loadCapacity">
                        <Form.Label>Load Capacity (Kg):</Form.Label>
                        <Form.Control type='number' {...register("loadCapacity", { required: true, pattern: /^[0-9\b]+$/i })} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={4}>
                    <Form.Group className="mb-3" controlId="fullLoadAutonomy">
                        <Form.Label>Full Load Autonomy (km):</Form.Label>
                        <Form.Control type='number' {...register("fullLoadAutonomy", { required: true, pattern: /^[0-9\b]+$/i })} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={4}>
                    <Form.Group className="mb-3" controlId="capacity">
                        <Form.Label>Capacity (kWh):</Form.Label>
                        <Form.Control type='number' {...register("capacity", { required: true, pattern: /^[0-9\b]+$/i })} />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group className="mb-3" controlId="fastChargeTime">
                        <Form.Label>Fast Charge Time (minutes):</Form.Label>
                        <Form.Control type='number' {...register("fastChargeTime", { required: true, pattern: /^[0-9\b]+$/i })} />
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group className="mb-3" controlId="slowChargeTime">
                        <Form.Label>Slow Charge Time (minutes):</Form.Label>
                        <Form.Control type='number' {...register("slowChargeTime", { required: true, pattern: /^[0-9\b]+$/i })} />
                    </Form.Group>
                </Col>
            </Row>
            <ToastContainer></ToastContainer>
            <Button data-testid="button" ref={props.submitRef} type="submit" style={{ display: 'none' }} >Submit</Button>
        </Form>
    );
}

export default TruckForm
