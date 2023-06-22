import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import { toast, ToastContainer } from 'react-toastify';
import SelectRowType from '../../components/form/DataTableConfigs'
import * as DeliveryPackageMapper from '../../mappers/DeliveryPackageMapper';
import * as DeliveryMapper from '../../mappers/DeliveryMapper';
import { Delivery } from '../../models/Delivery';
import { DeliveryPackage } from '../../models/DeliveryPackage';
import { IDeliveryPackageService } from '../../services/IDeliveryPackageService';
import { IDeliveryService } from '../../services/IDeliveryService';

type DeliveryPackageTableProps = {
    updateSelectedId: Function,
    deliveryPackageService: IDeliveryPackageService,
    deliveryService: IDeliveryService,
}

const DeliveryPackageTable: React.FunctionComponent<DeliveryPackageTableProps> = (props): JSX.Element  => {
    const [ items , setItems ] = useState<DeliveryPackage[]>([]);
    const [ deliveries , setDeliveries ] = useState<Delivery[]>([]);

    SelectRowType.onSelect = (row: any, isSelect: boolean, rowIndex: number, e: any)  =>{
        if(!isSelect) return;
        props.updateSelectedId(row.id);
    };

    const columns = [{
        dataField: 'id',
        text: 'ID',
        hidden: true
    }, {
        dataField: 'deliveryId',
        text: 'Delivery',
        formatter: deliveryFormatter,
    }, {
        dataField: 'loadTime',
        text: 'Load Time',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'unloadTime',
        text: 'Unload Time',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'x',
        text: 'X',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'y',
        text: 'Y',
        sort: true,
        filter: textFilter()
    }, {
        dataField: 'z',
        text: 'Z',
        sort: true,
        filter: textFilter()
    }];

    function deliveryFormatter(cell: any, row: any) {
        var displayText = deliveries.find((delivery: Delivery) => delivery.id === cell);
        return <> {displayText ? displayText.deliveryDate : ''} </>
    }

    useEffect(() => { getDeliveries(); getItems(); }, []);

    const getItems = () => {
        props.deliveryPackageService.getAll()
        .then((response: any) => {
            setItems(DeliveryPackageMapper.GetResponseArrayToModelArray(response.data));
        })
        .catch((e: AxiosError) => {
            console.log(e);
            toast.error(`Location: GetDeliveryPackages Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
        });
    };
    const getDeliveries = () => {
        props.deliveryService.getAll()
        .then((response: any) => {
            setDeliveries(DeliveryMapper.GetResponseArrayToModelArray(response.data));
        })
        .catch((e: AxiosError) => {
            console.log(e);
            toast.error(`Location: GetDelivery Status: ${e.code} | Message: ${JSON.stringify(e?.response?.data)} (Is the server running?)`);
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

export default DeliveryPackageTable
