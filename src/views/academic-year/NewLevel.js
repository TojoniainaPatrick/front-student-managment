import { CButton, CFormInput } from "@coreui/react";
import { Modal } from "antd";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { levelInitialState } from "../../types/ObjectInitialState";

export default function NewLevel(){

    const {
        getLastYear,
        lastYear
    } = useCustomContext()


    const [ open, setOpen ] = useState( false )
    const [ level, setLevel ] = useState( levelInitialState )

    useEffect(() => {
        getLastYear()
    }, [])

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setLevel( levelInitialState )
    }

    const confirm = async _=> {
        if( !level.levelDesignation ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer la désignation du niveau!",
                timer: 5000
            });
        }
        else if( !level.monthlySchoolFees ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer l'écolage mensuel!",
                timer: 5000
            });
        }
        else{
            await axios.post('/level/add', {
                ...level,
                academicYearId: lastYear?.academicYearId
            } )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 2000
                });
                getLastYear()
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
        const { id, value } = e.target
        if( id == "monthlySchoolFees" && /^\d*$/.test(value)){
            setLevel({ ...level, [ id ]: value })
        }
        else if( id == "levelDesignation"){
            setLevel({ ...level, [ id ]: value })
        }
    }

    return(
        <>
            <CButton color="primary" onClick = { openModal }> <i> <CiSquarePlus /> </i> Ajouter </CButton>

            <Modal
                open = { open }
                title = 'Nouveau niveau'
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
                    id="levelDesignation"
                    floatingClassName="mb-3"
                    floatingLabel="Désignation"
                    placeholder="Désignation"
                    onChange = { handleInputChange }
                    value = { level.levelDesignation }
                />

                <CFormInput
                    type="text"
                    id="monthlySchoolFees"
                    floatingClassName="mb-3"
                    floatingLabel="Ecolage mensuel"
                    placeholder="Ecolage mensuel"
                    onChange = { handleInputChange }
                    value = { level.monthlySchoolFees }
                />

            </Modal>
        </>
    )
}