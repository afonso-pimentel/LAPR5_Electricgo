import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { toast, ToastContainer } from 'react-toastify';
import SelectRowType from '../../components/form/DataTableConfigs'
import * as DeliveryMapper from '../../mappers/DeliveryMapper';
import * as WarehouseMapper from '../../mappers/WarehouseMapper';
import { Delivery } from '../../models/Delivery';
import { IDeliveryService } from '../../services/IDeliveryService';
import { Warehouse } from '../../models/Warehouse';
import { IWarehouseService } from '../../services/IWarehouseService';

type DeliveryTableProps = {
    updateSelectedId: Function,
    warehouseService: IWarehouseService,
    deliveryService: IDeliveryService,
}

const DeliveryTable: React.FunctionComponent<DeliveryTableProps> = (props): JSX.Element  => {
    const [ items , setItems ] = useState<Delivery[]>([]);
    const [ warehouses , setWarehouses ] = useState<Warehouse[]>([]);

    SelectRowType.onSelect = (row: any, isSelect: boolean, rowIndex: number, e: any)  =>{
        if(!isSelect) return;
        props.updateSelectedId(row.id);
    };

    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden: true
    }, {
        dataField: 'warehouseId',
        text: 'Warehouse',
        formatter: warehouseFormatter,
    }, {
        dataField: 'deliveryDate',
        text: 'Date',
        sort: true,
        formatter: dateFormatter,
        filter: textFilter()
    }, {
        dataField: 'load',
        text: 'Load',
        sort: true,
        filter: textFilter()
    }];

    function warehouseFormatter(cell: any, row: any) {
        var displayText = warehouses.find((warehouses: Warehouse) => warehouses.id === cell);
        return <> {displayText ? displayText.code + ' - ' + displayText.description : ''} </>
    }
    function dateFormatter(cell: any, row: any) {
        var displayText = cell?.split(' ')[0];
        return <> {displayText} </>
    }
    

    useEffect(() => { getWarehouses();  }, []);

    const getItems = () => {
        props.deliveryService.getAll()
        .then((response: any) => {
            setItems(DeliveryMapper.GetResponseArrayToModelArray(response.data));
        })
        .catch((e: AxiosError) => {
            console.log(e);
            toast.error(`Location: GetDelivery Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
        });
    };
    const getWarehouses = () => {
        props.warehouseService.getAll()
        .then((response: any) => {
            setWarehouses(WarehouseMapper.GetResponseArrayToModelArray(response.data));
            getItems();
        })
        .catch((e: AxiosError) => {
            console.log(e);
            toast.error(`Location: GetWarehouses Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
        });
    };

    function indication() {
        return "Loading...";
    }

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
        </div>
    )
}

export default DeliveryTable
