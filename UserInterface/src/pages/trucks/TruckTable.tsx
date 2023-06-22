import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import * as FaIcons from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import SelectRowType from "../../components/form/DataTableConfigs";
import * as TruckMapper from "../../mappers/TruckMapper";
import { Truck } from "../../models/Truck";
import { ITruckService } from "../../services/ITruckService";

type TruckTableProps = {
  updateSelectedId: Function;
  truckService: ITruckService;
};

const TruckTable: React.FunctionComponent<TruckTableProps> = (
  props
): JSX.Element => {
  const [items, setItems] = useState<Truck[]>([]);

  SelectRowType.onSelect = (
    row: any,
    isSelect: boolean,
    rowIndex: number,
    e: any
  ) => {
    if (!isSelect) return;
    props.updateSelectedId(row.id, row.licensePlate);
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "tare",
      text: "Tare",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "loadCapacity",
      text: "Load Capacity",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "fullLoadAutonomy",
      text: "Full Load Autonomy",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "capacity",
      text: "Capacity",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "fastChargeTime",
      text: "Fast Charge Time",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "slowChargeTime",
      text: "Slow Charge Time",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "licensePlate",
      text: "License Plate",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "isActive",
      text: "Is Active",
      formatter: isActiveFormatter,
    },
  ];

  function isActiveFormatter(cell: any, row: any) {
    console.log(cell);
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
    props.truckService
      .getAll()
      .then((response: any) => {
        setItems(TruckMapper.GetResponseArrayToModelArray(response.data));
      })
      .catch((e: AxiosError) => {
        console.log(e);
        toast.error(
          `Location: GetTrucks Status: ${e.code} | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
  };

  function indication() {
    return "Loading...";
  }

  return (
    <div data-testid="table">
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

export default TruckTable;
