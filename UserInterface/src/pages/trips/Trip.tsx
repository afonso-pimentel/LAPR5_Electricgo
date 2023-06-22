import React, { MutableRefObject, RefObject, useRef, useState } from 'react'
import HeaderStyle from '../../components/header/Header'
import ButtonStyle from '../../components/header/Button'
import TripTable from './TripTable'
import { container } from '../../container'
import { IDeliveryService } from '../../services/IDeliveryService'
import { SERVICE_KEYS } from '../../service-keys-const'
import { ITripService } from '../../services/ITripService'
import { toast, ToastContainer } from 'react-toastify'
import { IWarehouseService } from '../../services/IWarehouseService'
import { ITruckService } from '../../services/ITruckService'
import { PopupActions } from 'reactjs-popup/dist/types'
import { IPlanningService } from '../../services/IPlanningService'
import { Col, Form, Row } from 'react-bootstrap'

const Trip: React.FunctionComponent = () => {
    //Declare dependency injection
    const deliveryService = container.get<IDeliveryService>(SERVICE_KEYS.DELIVERY_SERVICE);
    const warehouseService = container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE);
    const truckService = container.get<ITruckService>(SERVICE_KEYS.TRUCK_SERVICE);
    const TripService = container.get<ITripService>(SERVICE_KEYS.TRIP_SERVICE);
    const planningService = container.get<IPlanningService>(SERVICE_KEYS.PLANNING_SERVICE);

    //Declare buttons state
    const [editingId, setEditingId] = useState("")
    const [date, setDate] = useState(new Date())
    const [btnOpenDetailsDisabled, setBtnOpenDetailsDisabled] = useState(false)

    const updateSelectedID = (id: string) => {
        setEditingId(id);
    }
    const callPlanDay = () => {
        planningService.getByDay(date.toISOString().split('T')[0]).then((response) => {
            console.log(response.data);
            if (response.data) {
                showDetailsRef.current?.reloadGrid();
                toast.success(response.data.message);
            }
        }).catch((error) => {
            toast.error(error.response.data);
        });
    }

    const showDetailsRef = useRef<any>();

    return (
        <div className='flexOne'>
            <HeaderStyle>
                <ButtonStyle disable={btnOpenDetailsDisabled} onClick={() => { showDetailsRef.current?.showDetails(editingId); }}>Open Details</ButtonStyle>
                <Form style={{marginRight: "10px", minWidth: "130px"}}>
                    <Row style={{minWidth: "130px"}}>
                        <Col xs={12} md={3}>
                        <Form.Group className="" controlId="date">
                            <Form.Control
                            style={{ height: "50px", marginLeft: "10px", minWidth: "130px" }}
                            type="date"
                            required={true}
                            defaultValue={date.toISOString().split('T')[0]}
                            onChange={e => setDate(new Date(e.target.value))}
                            />
                        </Form.Group>
                        </Col>
                    </Row>
                </Form>
                <ButtonStyle disable={btnOpenDetailsDisabled} onClick={callPlanDay}>Plan Trips For Day</ButtonStyle>
            </HeaderStyle>
            <TripTable
                updateSelectedId={updateSelectedID}
                showDetailsRef={showDetailsRef}
                tripService={TripService}
                deliveryService={deliveryService}
                warehouseService={warehouseService}
                truckService={truckService}></TripTable>
            <ToastContainer />
        </div>
    )
}

export default Trip
