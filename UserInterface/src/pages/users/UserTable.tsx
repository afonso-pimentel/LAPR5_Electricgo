import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import BootstrapTable, { SelectRowProps } from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import { toast, ToastContainer } from "react-toastify";
import SelectRowType from "../../components/form/DataTableConfigs";
import * as UserMapper from "../../mappers/UserMapper";
import { User } from "../../models/User";
import { IUserService } from "../../services/IUserService";
import * as FaIcons from "react-icons/fa";


type UserTableProps = {
  updateSelectedId: Function;
  userService: IUserService;
  refreshTrigger: number; 
};


const UserTable: React.FunctionComponent<UserTableProps> = (
  props,
): JSX.Element => {
  const [items, setItems] = useState<User[]>([]);


  SelectRowType.onSelect = (
    row: any,
    isSelect: boolean,
    rowIndex: number,
    e: any
  ) => {
    if (!isSelect) return;
    props.updateSelectedId(row.id, row.name, row.phoneNumber);
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      hidden: true,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "phoneNumber",
      text: "Phone Number",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "role",
      text: "Role",
      sort: true,
      filter: textFilter(),
      formatter: roleFormatter,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      formatter: isAnonFormatter
    },
  ];

  function isAnonFormatter(cell: any, row: any) {
    if (row.phoneNumber === '999999999') {
      return <FaIcons.FaTimes />;
    } else {
      return <FaIcons.FaCheck />;
    }

  }

  function roleFormatter(cell: any, row: any) {
    switch (cell) {
      case 1:
        return "Administrator";
      case 2:
        return "Logistics Manager";
      case 3:
        return "Warehouse Manager";
      case 4:
        return "Fleet Manager";
      default:
        return "";
    }
  }

  useEffect(() => {
    getItems();
  }, [props.refreshTrigger]);

  const getItems = () => {
    props.userService
      .getAll()
      .then((response: any) => {
        setItems(UserMapper.GetResponseArrayToModelArray(response.data));
      })
      .catch((e: AxiosError) => {
        console.log(e);
        toast.error(
          `Location: GetUsers Status: ${
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

export default UserTable;
