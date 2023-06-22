import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { toast, ToastContainer } from "react-toastify";
import SelectRowType from "../../components/form/DataTableConfigs";
import * as PlanningMapper from "../../mappers/PlanningMapper";
import * as WarehouseMapper from "../../mappers/WarehouseMapper";
import * as DeliveryMapper from '../../mappers/DeliveryMapper';
import { Planning } from "../../models/Planning";
import { IPlanningService } from "../../services/IPlanningService";
import { GetPlanningRequestDto } from "../../dtos/Planning/GetPlanningRequestDto";
import { Warehouse } from "../../models/Warehouse";
import { IWarehouseService } from "../../services/IWarehouseService";
import * as FaIcons from "react-icons/fa";
import { IndividualPlanning } from "../../models/IndividualPlanning";
import { IDeliveryService } from "../../services/IDeliveryService";
import { Delivery } from "../../models/Delivery";

type PlanningTableProps = {
  data: GetPlanningRequestDto;
  planningService: IPlanningService;
  warehouseService: IWarehouseService;
  deliveryService: IDeliveryService,
};

const PlanningTable: React.FunctionComponent<PlanningTableProps> = (
  props
): JSX.Element => {
  let planning: Planning | null;
  const [
    selectedWarehouseQuantityToCharging,
    setSelectedWarehouseQuantityToCharging,
  ] = useState<string | null>("");
  const [selectedWarehouseTimeToCharge, setSelectedWarehouseTimeToCharge] =
    useState<string | null>("");

  const [individualPlanningArray, setIndividualPlanningArray] = useState<IndividualPlanning[] | undefined>();
  const [warehouses, setWarehouses] = useState<Warehouse[] | undefined>();
  const [ deliveries , setDeliveries ] = useState<Delivery[]>([]);

  const columns = [
    {
      dataField: "warehouse",
      text: "Warehouse",
      formatter: warehouseFormatter,
    },
    {
      dataField: "delivery",
      text: "Delivery",
      formatter: deliveryFormatter,
    },
    {
      dataField: "isChargingWarehouse",
      text: "Is Charging Warehouse",
      headerFormatter: () => <FaIcons.FaBolt />,
      formatter: isChargingWarehouseFormatter,
    },
    {
      dataField: "chargingQuantity",
      text: "Charging Quantity",
      headerFormatter: () => <FaIcons.FaPlug />,
      formatter: chargingQuantityFormatter,
    },
    {
      dataField: "chargingTime",
      text: "Charging Time",
      headerFormatter: () => <FaIcons.FaClock />,
      formatter: chargingTimeFormatter,
    },
  ];

  function warehouseFormatter(cell: any, row: any){
    var warehouse = warehouses?.find(x => x.id === cell);
    return <>
      {warehouse?.code} - {warehouse?.description}
    </>
  }

  function deliveryFormatter(cell: any, row: any){
    var delivery = deliveries?.find(x => x.id === cell);
    return <>
      {delivery?.deliveryDate} - {delivery?.load}
    </>
  }

  function isChargingWarehouseFormatter(cell: any, row: any) {
    console.log(cell);
    if (cell === true) {
      return <FaIcons.FaBatteryEmpty />;
    } else {
      return <FaIcons.FaBatteryFull />;
    }
  }

  function chargingQuantityFormatter(cell: any, row: any) {
    if (cell === undefined) {
      return <></>;
    }
    if (cell === "0") {
      return <></>;
    }
    return <>{ parseFloat(cell).toFixed(3) + " kWh"}</>;
  }

  function chargingTimeFormatter(cell: any, row: any) {
    if (cell === undefined) {
      return <></>;
    }
    if (cell === "0") {
      return <></>;
    }
    return <>{ parseFloat(cell).toFixed(3) + " min"}</>;
  }

  useEffect(() => {
    getDeliveries();
    getWarehousesAll();
    getPlanning();
  }, []);

  const getPlanning = () => {
    props.planningService
      .get(props.data)
      .then((response: any) => {
        planning = PlanningMapper.GetResponseToModel(response.data) as Planning;
        var individualPlanningList = convertToIndividualPlanningArray(planning as Planning);
        setIndividualPlanningArray(individualPlanningList);
        toast.success("Planning generated successfully! The cost is: " + planning?.planningCost.toFixed(3));
      })
      .catch((e: AxiosError) => {
        console.log(e);
        toast.error(
          `Location: GetPlanning | Status: ${
            e.code
          } | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
  };
  const getWarehousesAll = () => {
    props.warehouseService
      .getAll()
      .then((response: any) => {
        const warehouses = WarehouseMapper.GetResponseArrayToModelArray(response.data) as Warehouse[];
        setWarehouses(warehouses);

      })
      .catch((e: AxiosError) => {
        console.log(e);
        toast.error(
          `Location: GetWarehousesAll | Status: ${
            e.code
          } | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
  };

  const getDeliveries = () => {
    props.deliveryService.getAll()
    .then((response: any) => {
        var deliveryList = DeliveryMapper.GetResponseArrayToModelArray(response.data)
        setDeliveries(deliveryList);
    })
    .catch((e: AxiosError) => {
        console.log(e);
        toast.error(`Location: GetDelivery Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
    });
};

  function convertToIndividualPlanningArray(planning: Planning) : IndividualPlanning[] {
    var individualPlanningList: Array<IndividualPlanning> = new Array<IndividualPlanning>();
    for (let index = 0; index < planning.listOrderDeliveries.length; index++) {
      const delivery = planning.listOrderDeliveries[index];
      const warehouse = planning.listOrderWarehouses[index];
      const IsCharging = planning.listWarehousesToCharge.includes(warehouse);
      let chargingQuantity = "0";
      let chargingTime = "0";
      if(IsCharging){
       const indexOfWarehouse = planning.listWarehousesToCharge.indexOf(warehouse);
        chargingQuantity = planning.listWarehousesQuantityToCharge[indexOfWarehouse];
        chargingTime = planning.listWarehousesTimeToCharge[indexOfWarehouse];
      }

      individualPlanningList.push({
         warehouse: warehouse,
         delivery: delivery,
         isChargingWarehouse: IsCharging,
         chargingQuantity: chargingQuantity,
         chargingTime: chargingTime
       } as any as IndividualPlanning);
    }
    return individualPlanningList;
  }


  function indication() {
    return "Loading...";
  }

  if (individualPlanningArray !== undefined) {
    return (
      <div data-testid="table">
        <ToastContainer></ToastContainer>
        <BootstrapTable
          keyField="delivery"
          data={individualPlanningArray}
          columns={columns}
          bordered={false}
          noDataIndication={indication}
          //filter={filterFactory()}
          //filterPosition="top"
          selectRow={SelectRowType}
          classes="moduleContent"
        />
      </div>
    );
  } else {
    return <></>;
  }
};
export default PlanningTable;
