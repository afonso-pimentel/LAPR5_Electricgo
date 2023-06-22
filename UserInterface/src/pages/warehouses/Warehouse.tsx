import React, { useRef, useState } from "react";
import HeaderStyle from "../../components/header/Header";
import ButtonStyle from "../../components/header/Button";
import { container } from "../../container";
import { SERVICE_KEYS } from "../../service-keys-const";
import { toast, ToastContainer } from "react-toastify";
import WarehouseTable from "./WarehouseTable";
import { IWarehouseService } from "../../services/IWarehouseService";
import WarehouseForm from "./WarehouseForm";
import { IAuthService } from "../../services/IAuthService";
import { AxiosError } from "axios";

const Warehouse: React.FunctionComponent = () => {
  //Validate user access
  const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
  authService.validateResourceAccess("Warehouses");

  //Declare dependency injection
  const warehouseService = container.get<IWarehouseService>(
    SERVICE_KEYS.WAREHOUSE_SERVICE
  );

  //Declare buttons state
  const [btnAddDisabled, setBtnAddDisabled] = useState(false);
  const [btnEditDisabled, setBtnEditDisabled] = useState(false);
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(true);
  const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
  const [btnInhibitDisabled, setBtnInhibitDisabled] = useState(false)

  const [formActive, setFormActive] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingCode, setEditingCode] = useState("");
  const [editingActive, setIsActive] = useState(false);

  const openAddNew = () => {
    setFormActive(true);
    setBtnAddDisabled(true);
    setBtnEditDisabled(true);
    setBtnSaveDisabled(false);
    setBtnCancelDisabled(false);
    setEditingId("");
  };
  const openEdit = () => {
    setFormActive(true);
    setBtnAddDisabled(true);
    setBtnEditDisabled(true);
    setBtnInhibitDisabled(true);
    setBtnSaveDisabled(false);
    setBtnCancelDisabled(false);
  };

  const hideForm = () => {
    setFormActive(false);
    setBtnAddDisabled(false);
    setBtnEditDisabled(false);
    setBtnInhibitDisabled(false);
    setBtnSaveDisabled(true);
    setBtnCancelDisabled(true);
  };

  const updateSelectedID = (id: string, code: string, isActive:boolean) => {
    setEditingId(id);
    setEditingCode(code);
    setIsActive(isActive);
  };

  const handleSuccessSave = (response: any) => {
    toast("Warehouse Saved Successfully!");
    hideForm();
  };

  const inhibitReg = () => {
    if(editingCode === undefined || editingCode === ""){
      toast.error(t => (
        <span>
          You must first select a warehouse.
          <div
            style={{
              marginLeft: "100px",
              marginRight: "auto",
              marginTop: "10px",
            }}
          >
          </div>
        </span>
      ));
    }else if(!editingActive){
      toast.error(t => (
        <span>
          The selected warehouse is already inhibited.
          <div
            style={{
              marginLeft: "100px",
              marginRight: "auto",
              marginTop: "10px",
            }}
          >
          </div>
        </span>
      ));
    }
    else{
      toast(t => (
        <span>
          Are you sure you want to inhibit the Warehouse '{editingCode}'?
          <div
            style={{
              marginLeft: "100px",
              marginRight: "auto",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => inhibitWarehouse(editingId)}
              style={{
                backgroundColor: "white",
                color: "black",
                marginRight: "5px",
                borderRadius: "5px",
                borderWidth: "1px",
                padding: "5px",
              }}
            >
              Yes
            </button>
            <button
              onClick={() => toast.dismiss()}
              style={{
                backgroundColor: "white",
                color: "black",
                borderWidth: "1px",
                padding: "5px",
              }}
            >
              No
            </button>
          </div>
        </span>
      ));
    }
   };

   const inhibitWarehouse = (id: string) => {
    warehouseService
      .inhibit(id)
      .then(() => {
        window.location.reload();
        toast("Warehouse Inhibited Successfully!");
        hideForm();
      })
      .catch((e: AxiosError) => {
        if (e.response?.status !== 500) {
          toast.error(
            "Invalid request: " +
              JSON.stringify(((e.response as any).data as any).message)
          );
          return;
        }
        console.log(e);
        toast.error(
          `Location: InhibitWarehouse | Status: ${
            e.code
          } | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
  };

  const submitRef = useRef<HTMLButtonElement>();

  return (
    <div className='flexOne'>
      <HeaderStyle>
        <ButtonStyle disable={btnAddDisabled} onClick={openAddNew}>
          Add
        </ButtonStyle>
        <ButtonStyle disable={btnEditDisabled} onClick={openEdit}>
          Edit
        </ButtonStyle>
        <ButtonStyle
          disable={btnSaveDisabled}
          onClick={() => submitRef.current?.click()}
        >
          Save
        </ButtonStyle>
        <ButtonStyle
          className="btnDanger"
          disable={btnCancelDisabled}
          onClick={hideForm}
        >
          Cancel
        </ButtonStyle>
        <ButtonStyle disable={btnInhibitDisabled} onClick={inhibitReg}>Inhibit</ButtonStyle> 
      </HeaderStyle>
      {formActive && (
        <WarehouseForm
          successSaveHandler={handleSuccessSave}
          submitRef={submitRef as React.MutableRefObject<HTMLButtonElement>}
          id={editingId}
          warehouseService={warehouseService}
        ></WarehouseForm>
      )}
      {!formActive && (
        <WarehouseTable
          updateSelectedId={updateSelectedID}
          warehouseService={warehouseService}
        ></WarehouseTable>
      )}
    </div>
  );
};


export default Warehouse;
