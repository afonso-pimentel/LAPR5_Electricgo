import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next";
import filterFactory, {
  customFilter,
  textFilter,
} from "react-bootstrap-table2-filter";
import { toast, ToastContainer } from "react-toastify";
import SelectRowType from "../../components/form/DataTableConfigs";
import * as PathMapper from "../../mappers/PathMapper";
import { Path } from "../../models/Path";
import { Warehouse } from "../../models/Warehouse";
import { IPathService } from "../../services/IPathService";
import { IWarehouseService } from "../../services/IWarehouseService";
import * as WarehouseMapper from "../../mappers/WarehouseMapper";
import ReactPaginate from "react-paginate";

type PathTableProps = {
  updateSelectedId: Function;
  pathService: IPathService;
  warehouseService: IWarehouseService;
};

const DeliveryPackageTable: React.FunctionComponent<PathTableProps> = (
  props
): JSX.Element => {
  const [items, setItems] = useState<Path[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sizePerPage, setSizePerPage] = useState<number>(10);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [totalPageCount, setTotalPageCount] = useState(null);

  SelectRowType.onSelect = (
    row: any,
    isSelect: boolean,
    rowIndex: number,
    e: any
  ) => {
    if (!isSelect) return;
    props.updateSelectedId(row.id);
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "startWarehouse",
      text: "Start Warehouse",
      formatter: warehouseFormatter,
    },
    {
      dataField: "endWarehouse",
      text: "End Warehouse",
      formatter: warehouseFormatter,
    },
    {
      dataField: "distance",
      text: "Distance",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "pathTime",
      text: "Path time",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "spentEnergy",
      text: "Energy spent",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "extraChargeTime",
      text: "Extra charge time",
      sort: true,
      filter: textFilter(),
    },
  ];

  function warehouseFormatter(cell: any, row: any) {
    var displayText = warehouses.find(
      (warehouse: Warehouse) => warehouse.id === cell
    );
    return (
      <> {displayText ? displayText.code + "-" + displayText.locality : ""} </>
    );
  }

  useEffect(() => {
    async function fetchData() {
      try {
        await getItems(page, sizePerPage);
        await getWarehouses();
      } catch (e: any) {
        console.log(e);
        toast.error(
          `Location: GetDelivery Status: ${e.code} | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      }
    }
    fetchData();
  }, [page, sizePerPage]); // specify dependencies here

  const getItems = async (page: number, limit: number) => {
    props.pathService
      .getByPage(page, limit)
      .then((response: any) => {
        setItems(PathMapper.GetResponseArrayToModelArray(response.data.paths));
        setTotalPageCount(response.data.totalPageCount);
      })
      .catch((e: AxiosError) => {
        console.log(e);
        toast.error(
          `Location: GetPaths Status: ${e.code} | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
  };

  const getWarehouses = async () => {
    props.warehouseService
      .getAll()
      .then((response: any) => {
        setWarehouses(
          WarehouseMapper.GetResponseArrayToModelArray(response.data)
        );
      })
      .catch((e: AxiosError) => {
        console.log(e);
        toast.error(
          `Location: GetDelivery Status: ${e.code} | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
  };

  function indication() {
    return "Loading...";
  }

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    getItems(event.selected, sizePerPage);
  };

  if (totalPageCount === null) {
    return (
      <div data-testid="table">
        <ToastContainer></ToastContainer>
        <p>Loading...</p>
      </div>
    )
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
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPageCount}
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
    </div>
  );
};

export default DeliveryPackageTable;
