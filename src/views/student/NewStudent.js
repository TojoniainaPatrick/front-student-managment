import { CButton, CFormInput } from "@coreui/react";
import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { studentInitalState } from "../../types/ObjectInitialState";

export default function NewStudent(){

    const {
        getStudents,
        getLastYear,
        lastYear
    } = useCustomContext()

    useEffect( () => {
        getLastYear()
    }, [])

    const [ open, setOpen ] = useState( false )
    const [ student, setStudent ] = useState( studentInitalState )

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setStudent( studentInitalState )
    }

    const confirm = async _=> {
        if( !student.studentInscriptionNumber ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir le numéro matricule!",
                timer: 5000
            });
        }
        else if( !student.studentName ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir le nom de l'employé!",
                timer: 5000
            });
        }
        else if( !student.studentEmail ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir l'adresse e-mail!",
                timer: 5000
            });
        }
        else if( !student.studentAddress ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer l'adresse!",
                timer: 5000
            });
        }
        else if( !student.studentPassword ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir le mot de passe",
                timer: 5000
            });
        }
        else if( !student.levelId ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez choisir un niveau!",
                timer: 5000
            });
        }
        else{
            await axios.post('/student/add', student )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 2000
                });
                getStudents()
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
        setStudent({ ...student, [ e.target.id ]: e.target.value })
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
                    id="studentInscriptionNumber"
                    floatingClassName="mb-3"
                    floatingLabel="Numéro matricule"
                    placeholder="Numéro matricule"
                    onChange = { handleInputChange }
                    value = { student.studentInscriptionNumber }
                />

                <CFormInput
                    type="text"
                    id="studentName"
                    floatingClassName="mb-3"
                    floatingLabel="Nom et prénom"
                    placeholder="Nom et prénom"
                    onChange = { handleInputChange }
                    value = { student.studentName }
                />

                <CFormInput
                    type="text"
                    id="studentEmail"
                    floatingClassName="mb-3"
                    floatingLabel="Adresse e-mail"
                    placeholder="Adresse e-mail"
                    onChange = { handleInputChange }
                    value = { student.studentEmail }
                />

                <CFormInput
                    type="text"
                    id="studentAddress"
                    floatingClassName="mb-3"
                    floatingLabel="Adresse du domicile"
                    placeholder="Adresse du domicile"
                    onChange = { handleInputChange }
                    value = { student.studentAddress }
                />

                <CFormInput
                    type="password"
                    id="studentPassword"
                    floatingClassName="mb-3"
                    floatingLabel="Mot de passe"
                    placeholder="Mot de passe"
                    onChange = { handleInputChange }
                    value = { student.studentPassword }
                />

                <Select
                    placeholder = "Niveau"
                    style = {{ width: '100%', height: 50, marginBottom: 20}}
                    options = {
                        [{ label: "Choisissez un niveau", value: ''}]
                        .concat(
                            lastYear?.Levels?.map( level => ({
                                label: level.levelDesignation ,
                                value: level.levelId
                            }))
                        )
                    }
                    onChange = { value => setStudent({...student, levelId: value }) }
                    value = { student.levelId }
                />

            </Modal>
        </>
    )
}