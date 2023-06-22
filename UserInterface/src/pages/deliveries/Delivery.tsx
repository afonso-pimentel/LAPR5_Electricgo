import React, { useRef, useState } from 'react'
import HeaderStyle from '../../components/header/Header'
import ButtonStyle from '../../components/header/Button'
import DeliveryTable from './DeliveryTable'
import DeliveryForm from './DeliveryForm'
import { container } from '../../container'
import { IDeliveryService } from '../../services/IDeliveryService'
import { SERVICE_KEYS } from '../../service-keys-const'
import { toast, ToastContainer } from 'react-toastify'
import { IWarehouseService } from '../../services/IWarehouseService'
import { IAuthService } from '../../services/IAuthService'

const Delivery: React.FunctionComponent = () => {
    //Validate user access
    const authService = container.get<IAuthService>(SERVICE_KEYS.AUTH_SERVICE);
    authService.validateResourceAccess("Deliveries");

    //Declare dependency injection
    const deliveryService = container.get<IDeliveryService>(SERVICE_KEYS.DELIVERY_SERVICE);
    const warehouseService = container.get<IWarehouseService>(SERVICE_KEYS.WAREHOUSE_SERVICE);

    //Declare buttons state
    const [btnAddDisabled, setBtnAddDisabled] = useState(false)
    const [btnEditDisabled, setBtnEditDisabled] = useState(false)
    const [btnSaveDisabled, setBtnSaveDisabled] = useState(true)
    const [btnCancelDisabled, setBtnCancelDisabled] = useState(true)

    const [formActive, setFormActive] = useState(false)
    const [editingId, setEditingId] = useState("")

    const openAddNew = () => {
        setFormActive(true)
        setBtnAddDisabled(true)
        setBtnEditDisabled(true)
        setBtnSaveDisabled(false)
        setBtnCancelDisabled(false)
        setEditingId("")
    }
    const openEdit = () => {
        setFormActive(true)
        setBtnAddDisabled(true)
        setBtnEditDisabled(true)
        setBtnSaveDisabled(false)
        setBtnCancelDisabled(false)
    }

    const hideForm = () => {
        setFormActive(false)
        setBtnAddDisabled(false)
        setBtnEditDisabled(false)
        setBtnSaveDisabled(true)
        setBtnCancelDisabled(true)
    }

    const updateSelectedID = (id: string) => {
        setEditingId(id)
    }

    const handleSuccessSave = (response: any) => {
        toast("Delivery Saved Successfully!");
        hideForm();
    }

    const submitRef = useRef<HTMLButtonElement>();

    return (
        <div className='flexOne'>
            <HeaderStyle>
                <ButtonStyle disable={btnAddDisabled} onClick={openAddNew}>Add</ButtonStyle>
                <ButtonStyle disable={btnEditDisabled} onClick={openEdit}>Edit</ButtonStyle>
                <ButtonStyle disable={btnSaveDisabled} onClick={() => { submitRef.current?.click(); }}>Save</ButtonStyle>
                <ButtonStyle className='btnDanger' disable={btnCancelDisabled} onClick={hideForm}>Cancel</ButtonStyle>
            </HeaderStyle>
            {
                formActive &&
                <DeliveryForm successSaveHandler={handleSuccessSave}
                submitRef={submitRef as React.MutableRefObject<HTMLButtonElement>}
                id={editingId}
                deliveryService={deliveryService}
                warehouseService={warehouseService} ></DeliveryForm>
            }
            {
                !formActive &&
                <DeliveryTable
                updateSelectedId={updateSelectedID}
                warehouseService={warehouseService}
                deliveryService={deliveryService}></DeliveryTable>
            }
            <ToastContainer />
        </div>
    )
}

export default Delivery
