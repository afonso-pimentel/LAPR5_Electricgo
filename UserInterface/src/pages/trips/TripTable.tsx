import { AxiosError } from 'axios';
import React, { MutableRefObject, useEffect, useImperativeHandle, useRef, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { toast, ToastContainer } from 'react-toastify';
import SelectRowType from '../../components/form/DataTableConfigs'
import * as TripMapper from '../../mappers/TripMapper';
import * as DeliveryMapper from '../../mappers/DeliveryMapper';
import * as TruckMapper from '../../mappers/TruckMapper';
import * as WarehouseMapper from "../../mappers/WarehouseMapper";
import { Delivery } from '../../models/Delivery';
import { Trip } from '../../models/Trip';
import { ITripService } from '../../services/ITripService';
import { IDeliveryService } from '../../services/IDeliveryService';
import { IWarehouseService } from '../../services/IWarehouseService';
import { ITruckService } from '../../services/ITruckService';
import { Warehouse } from '../../models/Warehouse';
import { Truck } from '../../models/Truck';
import Popup from 'reactjs-popup';
import { PopupActions } from 'reactjs-popup/dist/types';
import * as FaIcons from "react-icons/fa";
import { TripStep } from '../../models/TripStep';
import ReactPaginate from 'react-paginate';

type TripTableProps = {
    updateSelectedId: Function,
    tripService: ITripService,
    deliveryService: IDeliveryService,
    warehouseService: IWarehouseService,
    truckService: ITruckService,
    showDetailsRef: MutableRefObject<unknown>
}

const TripTable: React.FunctionComponent<TripTableProps> = (props): JSX.Element  => {
    const [ items , setItems ] = useState<Trip[]>([]);
    const [ itemsDetails , setItemsDetails ] = useState<TripStep[]>([]);
    const [ deliveries , setDeliveries ] = useState<Delivery[]>([]);
    const [ warehouses , setWarehouses ] = useState<Warehouse[]>([]);
    const [ trucks , setTrucks ] = useState<Truck[]>([]);
    const [page, setPage] = useState<number>(0);
    const [sizePerPage, setSizePerPage] = useState<number>(5);
    const [ numPages , setNumPages ] = useState<number>(0);
    const [ loadDependencies , setLoadDependencies ] = useState<boolean>(true);
    const popUpRef = useRef<PopupActions>() as MutableRefObject<PopupActions>;

    SelectRowType.onSelect = (row: any, isSelect: boolean, rowIndex: number, e: any)  =>{
        if(!isSelect) return;
        props.updateSelectedId(row.id);
    };

    const columns = [
        {
            dataField: 'id',
            text: 'ID',
            hidden: true
        }, {
            dataField: 'truck.licensePlate',
            text: 'Truck',
            sort: true,
            filter: textFilter()
        }, {
            dataField: 'date',
            text: 'Date',
            sort: true,
            filter: textFilter()
        }
    ];

    useEffect(() => {
        if(loadDependencies)
            getDeliveries();
        else
            getItems(page, sizePerPage);
    }, [loadDependencies]);

    const getDeliveries = () => {
        props.deliveryService.getAll()
        .then((response: any) => {
            setDeliveries(DeliveryMapper.GetResponseArrayToModelArray(response.data));
            getWarehouses();
        })
        .catch((e: AxiosError) => {
            console.log(e);
            toast.error(`Location: GetDelivery Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
        });
    };

    const getWarehouses = () => {
        props.warehouseService
        .getAll()
        .then((response: any) => {
            setWarehouses(WarehouseMapper.GetResponseArrayToModelArray(response.data));
            getTrucks();
        })
        .catch((e: AxiosError) => {
            console.log(e);
            toast.error(
            `Location: GetWarehouses Status: ${
                e.code
            } | Message: ${JSON.stringify(
                e?.response?.data
            )} (Is the server running?)`
            );
        });
    };

    const getTrucks = () => {
        props.truckService.getAll()
        .then((response: any) => {
            setTrucks(TruckMapper.GetResponseArrayToModelArray(response.data));
            setLoadDependencies(false);
        })
        .catch((e: AxiosError) => {
            console.log(e);
            toast.error(`Location: GetTrucks Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
        });
    };

    const getItems = (page: number, limit: number) => {
        props.tripService.getAllByPage(page, limit)
        .then((response: any) => {
            var pages = response.data.totalPageCount;
            setNumPages(pages);
            setItems(TripMapper.GetResponseArrayToModelArray(response.data.trips,warehouses,deliveries,trucks));
        })
        .catch((e: AxiosError) => {
            console.log(e);
            toast.error(`Location: GetTrips Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
        });
    };

    function indication() {
        return "Loading...";
    }

    /** SHOW DETAILS */
    useImperativeHandle(props.showDetailsRef, () => ({
        showDetails: (id: string) => {
            if(id === undefined) return;
            if(id === "") return;

            setItemsDetails(items.find((item: Trip) => { return item.id === id; })?.steps ?? []);
            popUpRef.current.open();
        },
        reloadGrid: () => {
            setLoadDependencies(true);
        }
    }));

      function isChargingWarehouseFormatter(cell: any, row: any) {
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
        if (cell === 0) {
          return <></>;
        }
        return <>{ parseFloat(cell).toFixed(3) + " kWh"}</>;
      }

      function chargingTimeFormatter(cell: any, row: any) {
        if (cell === undefined) {
          return <></>;
        }
        if (cell === 0) {
          return <></>;
        }
        return <>{ parseFloat(cell).toFixed(3) + " min"}</>;
      }

      function orderFormatter(cell: any, row: any) {
        return <>{ "#" + cell}</>;
      }

      const columnsDetails =[
        {
            dataField: "order",
            text: "Order",
            formatter: orderFormatter,
        },
        {
          dataField: "warehouse.description",
          text: "Warehouse",
        },
        {
          dataField: "delivery.load",
          text: "Delivery Load",
        },
        {
          dataField: "isWarehousesToCharge",
          text: "Is Charging Warehouse",
          headerFormatter: () => <FaIcons.FaBolt />,
          formatter: isChargingWarehouseFormatter,
        },
        {
          dataField: "chargeQuantity",
          text: "Charging Quantity",
          headerFormatter: () => <FaIcons.FaPlug />,
          formatter: chargingQuantityFormatter,
        },
        {
          dataField: "chargeTime",
          text: "Charging Time",
          headerFormatter: () => <FaIcons.FaClock />,
          formatter: chargingTimeFormatter,
        },
      ];

      /** PAGE HANDLER */
      const handlePageClick = (event: any) => {
        setPage(event.selected);
        setSizePerPage(sizePerPage);
        setLoadDependencies(true);
      };

    return (
        <div data-testid='table'>
            <ToastContainer></ToastContainer>
            <BootstrapTable
                    keyField="id"
                    data={ items }
                    columns={ columns }
                    bordered={ false}
                    noDataIndication={ indication }
                    filter={ filterFactory() }
                    filterPosition="top"
                    selectRow={ SelectRowType }
                    classes="moduleContent"
                />
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={numPages}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                />
            <Popup
                ref={popUpRef}
            >
                <BootstrapTable
                    keyField="order"
                    data={ itemsDetails }
                    columns={ columnsDetails }
                    bordered={ false}
                    classes="moduleContent"
                />
            </Popup>
        </div>
    )
}

export default TripTable
