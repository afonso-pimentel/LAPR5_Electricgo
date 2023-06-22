import React, { useEffect, useRef, useState } from "react";
import HeaderStyle from "../../components/header/Header";
import ButtonStyle from "../../components/header/Button";
import { Form, Row } from "react-bootstrap";
import { container } from "../../container";
import { SERVICE_KEYS } from "../../service-keys-const";
import { toast, ToastContainer } from "react-toastify";
import * as TruckMapper from "../../mappers/TruckMapper";
import { Truck } from "../../models/Truck";
import { ITruckService } from "../../services/ITruckService";
import { IPlanningService } from "../../services/IPlanningService";
import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { GetPlanningRequestDto } from "../../dtos/Planning/GetPlanningRequestDto";
import { IWarehouseService } from "../../services/IWarehouseService";
import PlanningTable from "./PlanningTable";
import { Planning } from "../../models/Planning";
import { IDeliveryService } from "../../services/IDeliveryService";
import Col from 'react-bootstrap/Col'
import { IAuthService } from "../../services/IAuthService";


const PlanningGet: React.FunctionComponent = () => {
  //Validate user access
  const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
  authService.validateResourceAccess("Planning");

  //Declare dependency injection
  const truckService = container.get<ITruckService>(SERVICE_KEYS.TRUCK_SERVICE);
  const warehouseService = container.get<IWarehouseService>(
    SERVICE_KEYS.WAREHOUSE_SERVICE
  );
  const planningService = container.get<IPlanningService>(
    SERVICE_KEYS.PLANNING_SERVICE
  );
  const deliveryService = container.get<IDeliveryService>(
    SERVICE_KEYS.DELIVERY_SERVICE
  );

  //Declare buttons state
  const [btnListPlanningDisabled, setListPlanningDisabled] = useState(false);
  const [btnClearDisabled, setBtnClearDisabled] = useState(true);

  const [truckId, setTruckId] = useState("");

  const [trucks, setTrucks] = useState<Array<Truck> | null>(null);
  const [data, setData] = useState<GetPlanningRequestDto | null>(null);

  const [plan, setPlan] = useState<Planning | null>(null);

  const { register, handleSubmit } = useForm<GetPlanningRequestDto>();

  const [date, setDate] = useState(new Date());
  const [heuritstic, setHeuristic] = useState("");

  const [tableActive, setTableActive] = useState(false);

  useEffect(() => {
    getTrucks();
  }, []);

  const getTrucks = () => {
    truckService
      .getActives()
      .then((response: any) => {
        setTrucks(TruckMapper.GetResponseArrayToModelArray(response.data));
      })
      .catch((e: AxiosError) => {
        console.log(e);
        toast.error(
          `Location: GetTrucks | Status: ${e.code} | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
  };

  function formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const openGet = () => {
    if (truckId !== "truckId")
      setData({
        truckId: truckId,
        date: formatDate(date),
        heuristic: heuritstic,
      });
    setTableActive(true);
    setBtnClearDisabled(false);
  };

  const hideTable = () => {
    setTableActive(false);
    setBtnClearDisabled(true);
  };

  return (
    <div className='flexOne'>
      <HeaderStyle>
        <Form style={{marginRight: "10px", width:"70%"}}>
          <Row>
            <Col xs={12} md={3}>
              <Form.Group className="mb-3" controlId="formTruckSelect">
                <Form.Select
                  style={{ height: "50px", marginLeft: "10px" }}
                  defaultValue={data?.truckId as string}
                  required={true}
                  onChange={e => setTruckId(e.target.value)}
                >
                  {trucks && trucks.length > 0 ? (
                    (trucks.map((truck: Truck) => {
                      return (
                        <option
                          key={truck.id as string}
                          value={truck.id as string}
                        >
                          {truck.licensePlate}
                        </option>
                      );
                    }) as any)
                  ) : (
                    <option value="">Loading...</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={3}>
              <Form.Group className="" controlId="date">
                <Form.Control
                  style={{ height: "50px", marginLeft: "10px" }}
                  type="date"
                  required={true}
                  onChange={e => setDate(new Date(e.target.value))}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group className="" controlId="formHeuristicsSelect">
                <Form.Select
                  style={{ height: "50px", marginLeft: "10px" }}
                  required={true}
                  onChange={e => setHeuristic(e.target.value)}
                >
                  <option key={"1"} value={"1"}>
                    Weight
                  </option>
                  <option key={"2"} value={"2"}>
                    Distance
                  </option>
                  <option key={"3"} value={"3"}>
                    Distance x Weight
                  </option>
                  <option key={"4"} value={"4"}>
                    Algoritmo Genético
                  </option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        <ButtonStyle disable={btnListPlanningDisabled} onClick={openGet}>
          Get
        </ButtonStyle>
        <ButtonStyle disable={btnClearDisabled} onClick={hideTable}>
          Clear
        </ButtonStyle>
      </HeaderStyle>
      {tableActive && (
        <PlanningTable
          data={data as GetPlanningRequestDto}
          planningService={planningService}
          warehouseService={warehouseService}
          deliveryService={deliveryService}
        ></PlanningTable>
      )}
      <ToastContainer />
    </div>
  );
};

export default PlanningGet;
