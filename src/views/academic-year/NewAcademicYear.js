import { CButton, CFormInput } from "@coreui/react";
import { Modal } from "antd";
import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { academicYearInitialState, studentInitalState } from "../../types/ObjectInitialState";

export default function NewAcademicYear(){

    const {
        getAcademicYears,
    } = useCustomContext()


    const [ open, setOpen ] = useState( false )
    const [ academicYear, setAcademicYear ] = useState( academicYearInitialState )

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setAcademicYear( studentInitalState )
    }

    const confirm = async _=> {
        if( !academicYear.year1 ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir l'année 1!",
                timer: 5000
            });
        }
        else if( !academicYear.year2 ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir l'année 2!",
                timer: 5000
            });
        }
        else{
            await axios.post('/year/add', academicYear )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 2000
                });
                getAcademicYears()
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
        if( /^\d{0,4}$/.test(e.target.value)){
            setAcademicYear({ ...academicYear, [ e.target.id ]: e.target.value })
        }
    }

    return(
        <>
            <CButton color="primary" onClick = { openModal }> <i> <CiSquarePlus /> </i> Ajouter </CButton>

            <Modal
                open = { open }
                title = 'Nouvelle année universitaire'
                okText = 'Ajouter'
                cancelText = 'Annuler'
                onCancel = { closeModal }
                onOk = { confirm }
                zIndex={1050}
                centered
                style={{ margin: '20px auto'}}
            >

                <CFormInput
                    type="text"
                    id="year1"
                    floatingClassName="mb-3"
                    floatingLabel="Année 1"
                    placeholder="Année 1"
                    onChange = { handleInputChange }
                    value = { academicYear.year1 }
                />

                <CFormInput
                    type="text"
                    id="year2"
                    floatingClassName="mb-3"
                    floatingLabel="Année 2"
                    placeholder="Année 2"
                    onChange = { handleInputChange }
                    value = { academicYear.year2 }
                />

            </Modal>
        </>
    )
}