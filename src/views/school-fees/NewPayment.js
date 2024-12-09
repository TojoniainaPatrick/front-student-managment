import { CFormInput } from "@coreui/react";
import { Modal } from "antd";
import { useState } from "react";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { paymentInstallmentInitalState } from "../../types/ObjectInitialState";

export default function NewPayment({ open, setOpen }){

    const {
        getSchoolFees,
        currentSchoolFees
    } = useCustomContext()

    const [ paymentInstallment, setPaymentInstallment ] = useState( paymentInstallmentInitalState )

    const closeModal = _=> {
        setOpen( false )
        setPaymentInstallment( paymentInstallmentInitalState )
    }

    const confirm = async _=> {
        if(
            !paymentInstallment.paymentInstallMentAmount ||
            paymentInstallment.paymentInstallMentAmount <= 0 ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer un montant valide",
                timer: 5000
            });
        }
        else if( Number( currentSchoolFees.schoolFeesRemainder) < Number( paymentInstallment.paymentInstallMentAmount ) ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Montant saisi excède le reste à payer!",
                timer: 5000
            });
        }
        else{
            await axios.post('/payment/add', {
                ...paymentInstallment,
                schoolFeesId: currentSchoolFees.schoolFeesId
            })
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 2000
                });
                getSchoolFees()
                closeModal()
            })
            .catch( error => {
                if( error?.response?.data?.message ){
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error?.response?.data?.message,
                    });
                }
                else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: error.message,
                    });
                }
                console.log( error )
            })
        }
    }

    const handleInputChange = e => {
        setPaymentInstallment({ ...paymentInstallment, [ e.target.id ]: e.target.value })
    }

    return(
        <>

            <Modal
                open = { open }
                title = 'Nouvelle tranche de paiement'
                okText = 'Ajouter'
                cancelText = 'Annuler'
                onCancel = { closeModal }
                onOk = { confirm }
                zIndex={1050}
                centered
                style={{ margin: '20px auto'}}
            >

                <CFormInput
                    disabled
                    type="text"
                    id="month"
                    floatingClassName="mb-3"
                    floatingLabel="Mois"
                    onChange = { handleInputChange }
                    value = { currentSchoolFees.Month?.monthName }
                />

                <CFormInput
                    disabled
                    type="text"
                    id="schoolFeesAmount"
                    floatingClassName="mb-3"
                    floatingLabel="Montant"
                    onChange = { handleInputChange }
                    value = { currentSchoolFees.schoolFeesAmount }
                />

                <CFormInput
                    disabled
                    type="text"
                    id="schoolFeesRemainder"
                    floatingClassName="mb-3"
                    floatingLabel="Reste"
                    onChange = { handleInputChange }
                    value = { currentSchoolFees.schoolFeesRemainder }
                />

                <CFormInput
                    type="number"
                    id="paymentInstallMentAmount"
                    floatingClassName="mb-3"
                    floatingLabel="Montant à payer"
                    placeholder="Montant à payer"
                    onChange = { handleInputChange }
                    value = { paymentInstallment.paymentInstallMentAmount || "" }
                />

            </Modal>
        </>
    )
}