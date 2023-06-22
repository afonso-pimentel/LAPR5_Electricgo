import React, { useRef, useState } from "react";
import HeaderStyle from "../../components/header/Header";
import ButtonStyle from "../../components/header/Button";
import PathForm from "./PathForm";
import { container } from "../../container";
import { SERVICE_KEYS } from "../../service-keys-const";
import { IPathService } from "../../services/IPathService";
import { IWarehouseService } from "../../services/IWarehouseService";
import { toast, ToastContainer } from "react-toastify";
import PathTable from "./PathTable";
import { IAuthService } from "../../services/IAuthService";

const Path: React.FunctionComponent = () => {
  //Validate user access
  const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
  authService.validateResourceAccess("Paths");

  //Declare dependency injection
  const pathService = container.get<IPathService>(SERVICE_KEYS.PATH_SERVICE);
  const warehouseService = container.get<IWarehouseService>(
    SERVICE_KEYS.WAREHOUSE_SERVICE
  );

  //Declare buttons state
  const [btnAddDisabled, setBtnAddDisabled] = useState(false);
  const [btnEditDisabled, setBtnEditDisabled] = useState(false);
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(true);
  const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);

  const [formActive, setFormActive] = useState(false);
  const [editingId, setEditingId] = useState("");

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
    setBtnSaveDisabled(false);
    setBtnCancelDisabled(false);
  };

  const hideForm = () => {
    setFormActive(false);
    setBtnAddDisabled(false);
    setBtnEditDisabled(false);
    setBtnSaveDisabled(true);
    setBtnCancelDisabled(true);
  };

  const updateSelectedID = (id: string) => {
    setEditingId(id);
  };

  const handleSuccessSave = (response: any) => {
    toast("Path Saved Successfully!");
    hideForm();
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
      </HeaderStyle>
      {formActive && (
        <PathForm
          successSaveHandler={handleSuccessSave}
          submitRef={submitRef as React.MutableRefObject<HTMLButtonElement>}
          id={editingId}
          warehouseService={warehouseService}
          pathService={pathService}
        ></PathForm>
      )}
      {!formActive && 
        <PathTable updateSelectedId={updateSelectedID} pathService={pathService} warehouseService={warehouseService}></PathTable>
        }
      <ToastContainer />
    </div>
  );
};

export default Path;
