import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { toast, ToastContainer } from "react-toastify";
import SelectRowType from "../../components/form/DataTableConfigs";
import * as WarehouseMapper from "../../mappers/WarehouseMapper";
import * as FaIcons from "react-icons/fa";
import { Warehouse } from "../../models/Warehouse";
import { IWarehouseService } from "../../services/IWarehouseService";

type WarehouseTableProps = {
  updateSelectedId: Function;
  warehouseService: IWarehouseService;
};

const WarehouseTable: React.FunctionComponent<WarehouseTableProps> = (
  props
): JSX.Element => {
  const [items, setItems] = useState<Warehouse[]>([]);

  SelectRowType.onSelect = (
    row: any,
    isSelect: boolean,
    rowIndex: number,
    e: any
  ) => {
    if (!isSelect) return;
    props.updateSelectedId(row.id, row.code, row.isActive);
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "code",
      text: "Code",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "streetName",
      text: "Street Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "doorNumber",
      text: "Door Number",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "locality",
      text: "Locality",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "latitude",
      text: "Latitude",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "longitude",
      text: "Longitude",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "altitude",
      text: "Altitude",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "isActive",
      text: "Is Active",
      formatter: isActiveFormatter
    },
  ];

  function isActiveFormatter(cell: any, row: any) {
    if (cell === true) {
      return <FaIcons.FaCheck />;
    } else {
      return <FaIcons.FaTimes />;
    }
  }

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    props.warehouseService
      .getAll(true)
      .then((response: any) => {
        setItems(WarehouseMapper.GetResponseArrayToModelArray(response.data));
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

  function indication() {
    return "Loading...";
  }

  return (
    <div data-testid='table'>
      <ToastContainer></ToastContainer>
      <BootstrapTable
        keyField="id"
        data={items}
        columns={columns}
        bordered={false}
        noDataIndication={indication}
        filter={filterFactory()}
        filterPosition="top"
        selectRow={SelectRowType}
        classes="moduleContent"
      />
    </div>
  );
};

export default WarehouseTable;
