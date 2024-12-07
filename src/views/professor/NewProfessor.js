import { CButton, CFormInput } from "@coreui/react";
import { Modal } from "antd";
import { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { professorInitialState, studentInitalState } from "../../types/ObjectInitialState";

export default function NewProfessor(){

    const {
        getProfessors,
    } = useCustomContext()


    const [ open, setOpen ] = useState( false )
    const [ professor, setProfessor ] = useState( professorInitialState )

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setProfessor( studentInitalState )
    }

    const confirm = async _=> {
        if( !professor.professorName ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir le nom complet!",
                timer: 5000
            });
        }
        else if( !professor.professorEmail ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir l'adresse e-mail!",
                timer: 5000
            });
        }
        else if( !professor.professorAddress ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer l'adresse!",
                timer: 5000
            });
        }
        else{
            await axios.post('/professor/add', professor )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 2000
                });
                getProfessors()
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
        setProfessor({ ...professor, [ e.target.id ]: e.target.value })
    }

    return(
        <>
            <CButton color="success text-white" onClick = { openModal }> <i> <CiSquarePlus /> </i> Ajouter </CButton>

            <Modal
                open = { open }
                title = 'Nouvel étudiant'
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
                    id="professorName"
                    floatingClassName="mb-3"
                    floatingLabel="Nom et prénom"
                    placeholder="Nom et prénom"
                    onChange = { handleInputChange }
                    value = { professor.professorName }
                />

                <CFormInput
                    type="text"
                    id="professorEmail"
                    floatingClassName="mb-3"
                    floatingLabel="Adresse e-mail"
                    placeholder="Adresse e-mail"
                    onChange = { handleInputChange }
                    value = { professor.professorEmail }
                />

                <CFormInput
                    type="text"
                    id="professorAddress"
                    floatingClassName="mb-3"
                    floatingLabel="Adresse du domicile"
                    placeholder="Adresse du domicile"
                    onChange = { handleInputChange }
                    value = { professor.professorAddress }
                />

            </Modal>
        </>
    )
}