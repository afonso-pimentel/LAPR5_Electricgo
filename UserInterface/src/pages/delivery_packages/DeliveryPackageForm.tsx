import { AxiosError } from "axios";
import { Delivery } from "../../models/Delivery";
import React, { useEffect, useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { DeliveryPackage } from '../../models/DeliveryPackage';
import { IDeliveryService } from '../../services/IDeliveryService';
import { IDeliveryPackageService } from '../../services/IDeliveryPackageService';
import { PostDeliveryPackageRequestDto } from '../../dtos/DeliveryPackage/PostDeliveryPackageRequestDto';
import * as DeliveryPackageMapper from '../../mappers/DeliveryPackageMapper';
import * as DeliveryMapper from '../../mappers/DeliveryMapper';
import { toast, ToastContainer } from 'react-toastify';
import Col from 'react-bootstrap/Col'


interface DeliveryPackageFormProps {
    id?: String;
    deliveryService: IDeliveryService,
    deliveryPackageService: IDeliveryPackageService,
    submitRef: React.MutableRefObject<HTMLButtonElement> | undefined,
    successSaveHandler: Function,
}

const DeliveryPackageForm: React.FunctionComponent<DeliveryPackageFormProps> = (props): JSX.Element => {
    const { register, handleSubmit, setValue } = useForm<DeliveryPackage>({ mode: 'onBlur' });

    const [deliveries, setDeliveries] = useState<Array<Delivery> | null>(null);
    const [data, setData] = useState<DeliveryPackage | null>(null);

    useEffect(() => {
        getDeliveries();
        if (props.id)
            getDeliveryPackage(props.id);
    }, []);

    //#region Call Api Functions
    const getDeliveryPackage = (id: String) => {
        props.deliveryPackageService.get(id)
            .then((response: any) => {
                const data: DeliveryPackage = DeliveryPackageMapper.GetResponseToModel(response.data);
                setData(data);
                setValue("deliveryId", data.deliveryId);
                setValue("loadTime", data.loadTime);
                setValue("unloadTime", data.unloadTime);
                setValue("x", data.x);
                setValue("y", data.y);
                setValue("z", data.z);
            })
            .catch((e: AxiosError) => {
                console.log(e);
                toast.error(`Location: GetDeliveryPackage | Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
            });
    };

    const getDeliveries = () => {
        props.deliveryService.getAll()
            .then((response: any) => {
                setDeliveries(DeliveryMapper.GetResponseArrayToModelArray(response.data));
            })
            .catch((e: AxiosError) => {
                console.log(e);
                toast.error(`Location: GetDeliveries | Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
            });
    };

    const onSubmit: SubmitHandler<DeliveryPackage> = data => {
        const deliveryPackage: PostDeliveryPackageRequestDto = DeliveryPackageMapper.FormToPostRequest(data);
        props.deliveryPackageService.post(deliveryPackage)
            .then((response: any) => {
                props.successSaveHandler.call(response);
            })
            .catch((e: AxiosError) => {
                if (e.response?.status !== 500) {
                    toast.error("Invalid data: " + JSON.stringify(((e.response as any).data as any).errors));
                    return;
                }
                console.log(e);
                toast.error(`Location: PostDeliveryPackage | Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
            });
    }
    //#endregion

    return (
        <Form data-testid='form' onSubmit={handleSubmit(onSubmit)} className="moduleContent">
            <Row>
      <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="deliveryId">
                    <Form.Label>Delivery:</Form.Label>
                    <Form.Select defaultValue={data?.deliveryId as string} {...register("deliveryId", { required: true })}>
                        {
                            deliveries && deliveries.length > 0 ? deliveries.map((delivery: Delivery) => {
                                return <option key={delivery.id as string} value={delivery.id as string}>{delivery.deliveryDate + ' - ' + delivery.load}</option>;
                            }) as any :
                                <option value=''>Loading...</option>
                        }
                    </Form.Select>
                </Form.Group>
        </Col>
        <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="loadTime">
                    <Form.Label>Load Time (Minutes):</Form.Label>
                    <Form.Control type='number' {...register("loadTime", { required: true, pattern: /^[0-9\b]+$/i })} />
                </Form.Group>
        </Col>
        <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="unloadTime">
                    <Form.Label>Unload Time (Minutes):</Form.Label>
                    <Form.Control type='number' {...register("unloadTime", { required: true, pattern: /^[0-9\b]+$/i })} />
                </Form.Group>
        </Col>
            </Row>
            <Row>
        <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="positionX">
                    <Form.Label>Position X:</Form.Label>
                    <Form.Control type='number' {...register("x", { required: true, pattern: /^[0-9\b]+$/i })} />
                </Form.Group>
        </Col>
        <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="positionY">
                    <Form.Label>Position Y:</Form.Label>
                    <Form.Control type='number' {...register("y", { required: true, pattern: /^[0-9\b]+$/i })} />
                </Form.Group>
        </Col>
        <Col xs={12} md={4}>
                <Form.Group className="mb-3" controlId="positionZ">
                    <Form.Label>Position Z:</Form.Label>
                    <Form.Control type='number' {...register("z", { required: true, pattern: /^[0-9\b]+$/i })} />
                </Form.Group>
        </Col>
            </Row>
            <ToastContainer></ToastContainer>
            <Button data-testid="button" ref={props.submitRef} type="submit" style={{ display: 'none' }}>Submit</Button>
        </Form>
    );
}

export default DeliveryPackageForm
