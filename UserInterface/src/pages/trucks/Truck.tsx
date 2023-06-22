import React, { useEffect, useRef, useState } from "react";
import HeaderStyle from "../../components/header/Header";
import ButtonStyle from "../../components/header/Button";
import { container } from "../../container";
import { SERVICE_KEYS } from "../../service-keys-const";
import { toast, ToastContainer } from "react-toastify";
import { ITruckService } from "../../services/ITruckService";
import { IAuthService } from "../../services/IAuthService";
import TruckForm from "./TruckForm";
import TruckTable from "./TruckTable";

const Truck: React.FunctionComponent = () => {
  //Validate user access
  const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
  authService.validateResourceAccess("Trucks");

  //Declare dependency injection
  const truckService = container.get<ITruckService>(SERVICE_KEYS.TRUCK_SERVICE);

  //Declare buttons state
  const [btnAddDisabled, setBtnAddDisabled] = useState(false);
  const [btnEditDisabled, setBtnEditDisabled] = useState(false);
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(true);
  const [btnInhibitDisabled, setBtnInhibitDisabled] = useState(false);
  const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
  // const [formFilterDisabled, setFormFilterDisabled] = useState(false);

  const [formActive, setFormActive] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingLicensePlate, setEditingLicensePlate] = useState("");

  // const [getFilter, setGetFilter] = useState("");

  const openAddNew = () => {
    setFormActive(true);
    setBtnAddDisabled(true);
    setBtnEditDisabled(true);
    setBtnSaveDisabled(false);
    setBtnCancelDisabled(false);
    setEditingId("");
    setBtnInhibitDisabled(true);
    // setFormFilterDisabled(true);
  };
  const openEdit = () => {
    setFormActive(true);
    setBtnAddDisabled(true);
    setBtnEditDisabled(true);
    setBtnSaveDisabled(false);
    setBtnCancelDisabled(false);
    setBtnInhibitDisabled(true);
    // setFormFilterDisabled(true);
  };

  // const changeGetFilter = (value: string) => {
  //   console.log(value);
  //   if (value === "All") {
  //     setBtnInhibitDisabled(true);
  //     // setGetFilter("all");
  //   } else {
  //     setBtnInhibitDisabled(false);
  //     // setGetFilter("");
  //   }
  // };

  const inhibitReg = () => {
    toast(t => (
      <span>
        Are you sure you want to inhibit this Truck? {editingLicensePlate}
        <div
          style={{
            marginLeft: "100px",
            marginRight: "auto",
            marginTop: "10px",
          }}
        >
          <button
            onClick={() => inhibitTruck(editingId)}
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
  };

  const hideForm = () => {
    setBtnInhibitDisabled(false);
    setFormActive(false);
    setBtnAddDisabled(false);
    setBtnEditDisabled(false);
    setBtnSaveDisabled(true);
    setBtnCancelDisabled(true);
    // setFormFilterDisabled(false);
  };

  const inhibitTruck = (id: string) => {
    truckService
      .delete(id)
      .then(() => {
        window.location.reload();
        toast("Truck Inhibited Successfully!");
      })
      .catch(e => {
        toast.error(
          "Error Inhibiting truck: " +
            JSON.stringify((e.response as any).data as any)
        );
      });
  };

  const updateSelectedID = (id: string, licensePlate: string) => {
    setEditingId(id);
    setEditingLicensePlate(licensePlate);
  };

  const handleSuccessSave = (response: any) => {
    toast("Truck Saved Successfully!");
    hideForm();
  };

  const submitRef = useRef<HTMLButtonElement>();

  return (
    <div className="flexOne">
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
        {/* <Form.Group className="" controlId="formGetFilter">
          <Form.Select
            disabled={formFilterDisabled}
            style={{ height: "50px", marginLeft: "10px" }}
            required={true}
            onChange={e => changeGetFilter(e.target.value)}
          >
            <option key={"1"} value={"Active"}>
              Active
            </option>
            <option key={"2"} value={"All"}>
              All
            </option>
          </Form.Select>
        </Form.Group> */}
        <ButtonStyle
          disable={btnInhibitDisabled}
          onClick={inhibitReg}
          className="btnDanger"
          style={{
            marginLeft: "auto",
            marginRight: "10px",
          }}
        >
          Disable
        </ButtonStyle>
      </HeaderStyle>
      {formActive && (
        <TruckForm
          successSaveHandler={handleSuccessSave}
          submitRef={submitRef as React.MutableRefObject<HTMLButtonElement>}
          id={editingId}
          truckService={truckService}
        ></TruckForm>
      )}
      {!formActive && (
        <TruckTable
          updateSelectedId={updateSelectedID}
          truckService={truckService}
        ></TruckTable>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Truck;
