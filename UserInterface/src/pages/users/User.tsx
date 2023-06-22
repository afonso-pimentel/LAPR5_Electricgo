import React, { useRef, useState } from "react";
import HeaderStyle from "../../components/header/Header";
import ButtonStyle from "../../components/header/Button";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import { container } from "../../container";
import { IUserService } from "../../services/IUserService";
import { SERVICE_KEYS } from "../../service-keys-const";
import { toast, ToastContainer } from "react-toastify";
import { AxiosError } from "axios";
import { IAuthService } from "../../services/IAuthService";

const User: React.FunctionComponent = () => {
  //Validate user access
  const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
  authService.validateResourceAccess("Users");

  //Declare dependency injection
  const userService = container.get<IUserService>(SERVICE_KEYS.USER_SERVICE);

  //Declare buttons state
  const [btnAddDisabled, setBtnAddDisabled] = useState(false);
  const [btnEditDisabled, setBtnEditDisabled] = useState(false);
  const [btnSaveDisabled, setBtnSaveDisabled] = useState(true);
  const [btnCancelDisabled, setBtnCancelDisabled] = useState(true);
  const [btnAnonymizeDisabled, setBtnAnonymizeDisabled] = useState(false);

  const [formActive, setFormActive] = useState(false);
  const [editingId, setEditingId] = useState("");

  const [editingName, setEditingName] = useState("");
  const [editingPhoneNumber, setEditingPhoneNumber] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

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
    setBtnAnonymizeDisabled(true);
  };

  const hideForm = () => {
    setFormActive(false);
    setBtnAddDisabled(false);
    setBtnEditDisabled(false);
    setBtnSaveDisabled(true);
    setBtnCancelDisabled(true);
    setBtnAnonymizeDisabled(false);
  };


  const updateSelectedID = (id: string, name: string, phoneNumber: string) => {
    setEditingId(id);
    setEditingName(name);
    setEditingPhoneNumber(phoneNumber);
  };


  const handleSuccessSave = (response: any) => {
    toast("User Saved Successfully!");
    hideForm();
  };

  const AnonymizeReg = () => {

    if (editingId === undefined || editingId === "") {
      toast.error((t) => (
        <span>
          You must first select a user.
          <div
            style={{
              marginLeft: "100px",
              marginRight: "auto",
              marginTop: "10px",
            }}
          ></div>
        </span>
      ));
    } else if (editingPhoneNumber === '999999999') {
      toast.error((t) => (
        <span>
          The selected user is already anonymized.
          <div
            style={{
              marginLeft: "100px",
              marginRight: "auto",
              marginTop: "10px",
            }}
          ></div>
        </span>
      ));
    } else {
      toast((t) => (
        <span>
          Are you sure you want to anonymize the User '{editingName}'?
          <div
            style={{
              marginLeft: "100px",
              marginRight: "auto",
              marginTop: "10px",
            }}
          >
            <button
              onClick={() => anonymizeUser(editingId)}
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

  const anonymizeUser = (id: string) => {
    userService
      .anonymize(id)
      .then((user) => {
        toast("User Anonymized Successfully!");
        hideForm();
        setRefreshTrigger(refreshTrigger + 1);
        if (user !== null && user.data !== null) {
            updateSelectedID(user.data.id, user.data.name, user.data.phoneNumber);
        }
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
          `Location: anonymizeUser | Status: ${
            e.code
          } | Message: ${JSON.stringify(
            e?.response?.data
          )} (Is the server running?)`
        );
      });
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
          onClick={() => {
            submitRef.current?.click();
          }}
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
        <ButtonStyle disable={btnAnonymizeDisabled} onClick={AnonymizeReg}>
          Anonymize
        </ButtonStyle>
      </HeaderStyle>
      {formActive && (
        <UserForm
          successSaveHandler={handleSuccessSave}
          submitRef={submitRef as React.MutableRefObject<HTMLButtonElement>}
          id={editingId}
          userService={userService}
        ></UserForm>
      )}
      {!formActive && (
        <UserTable
          updateSelectedId={updateSelectedID}
          userService={userService}
          refreshTrigger={refreshTrigger} 
        ></UserTable>
      )}
    </div>
  );
};

export default User;
