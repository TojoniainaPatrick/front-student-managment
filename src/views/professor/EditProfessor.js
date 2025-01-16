import { CFormInput } from "@coreui/react";
import { Modal } from "antd";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { professorInitialState } from "../../types/ObjectInitialState";

export default function EditProfessor({ open, setOpen }){

    const {
        getProfessors,
        currentProfessor,
        setCurrentProfessor
    } = useCustomContext()

    const closeModal = _=> {
        setOpen( false )
        setCurrentProfessor( professorInitialState )
    }

    const confirm = async _=> {
        if( !currentProfessor.professorName ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir le nom complet!",
                timer: 5000
            });
        }
        else if( !currentProfessor.professorEmail ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir l'adresse e-mail'!",
                timer: 5000
            });
        }
        else if( !currentProfessor.professorAddress ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer l'adresse du domicile!",
                timer: 5000
            });
        }
        else{
            await axios.put(`/professor/edit/${currentProfessor.professorId}`, currentProfessor )
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
        setCurrentProfessor({ ...currentProfessor, [ e.target.id ]: e.target.value })
    }

    return(
        <>
            <Modal
                open = { open }
                title = "Modification d'enseignant"
                okText = 'Modifier'
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
                    value = { currentProfessor?.professorName }
                />

                <CFormInput
                    type="text"
                    id="professorEmail"
                    floatingClassName="mb-3"
                    floatingLabel="Adresse e-mail"
                    placeholder="Adresse e-mail"
                    onChange = { handleInputChange }
                    value = { currentProfessor?.professorEmail }
                />

                <CFormInput
                    type="text"
                    id="professorAddress"
                    floatingClassName="mb-3"
                    floatingLabel="Adresse du domicile"
                    placeholder="Adresse du domicile"
                    onChange = { handleInputChange }
                    value = { currentProfessor?.professorAddress }
                />

            </Modal>
        </>
    )
}