import { CFormInput } from "@coreui/react";
import { Modal, Select } from "antd";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { studentInitalState } from "../../types/ObjectInitialState";
import { useEffect } from "react";

export default function EditStudent({ open, setOpen }){

    const {
        getStudents,
        currentStudent,
        setCurrentStudent,
        getLastYear,
        lastYear
    } = useCustomContext()

    useEffect( () => {
        getLastYear()
    }, [])

    const closeModal = _=> {
        setOpen( false )
        setCurrentStudent( studentInitalState )
    }

    const confirm = async _=> {
        if( !currentStudent.studentName ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir le nom complet!",
                timer: 5000
            });
        }
        else if( !currentStudent.studentEmail ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez saisir l'adresse e-mail'!",
                timer: 5000
            });
        }
        else{
            const updatedStudent = Object
                .entries( currentStudent )
                .reduce(( accumulateur, [ key, value ]) => {
                if( ![ "adminPassword", "studentPassword" ].includes( key ) ) accumulateur[key] = value
                return accumulateur
                }, {})

            await axios.put(`/student/edit/${currentStudent.studentId}`, { ... updatedStudent })
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
        setCurrentStudent({ ...currentStudent, [ e.target.id ]: e.target.value })
    }

    return(
        <>
            <Modal
                open = { open }
                title = "Modification d'étudiant"
                okText = 'Modifier'
                cancelText = 'Annuler'
                onCancel = { closeModal }
                onOk = { confirm }
                zIndex={1050}
                centered
                style={{ margin: '20px auto'}}
            >
                {
                    /^\d{4}$/.test( currentStudent.studentInscriptionNumber ) && 
                    <span style={{ position: 'absolute', zIndex: 100, top: 77, left: 75, fontSize: '1rem' }}> -SI </span>
                }
                <CFormInput
                    type="text"
                    id="studentInscriptionNumber"
                    floatingClassName="mb-3"
                    floatingLabel="Numéro matricule"
                    placeholder="Numéro matricule"
                    onChange = { event => {
                        if(/^\d{0,4}$/.test(event.target.value)) handleInputChange( event )
                    }}
                    readOnly
                    value = { currentStudent.studentInscriptionNumber }
                />

                <CFormInput
                    type="text"
                    id="studentName"
                    floatingClassName="mb-3"
                    floatingLabel="Nom et prénom"
                    placeholder="Nom et prénom"
                    onChange = { handleInputChange }
                    value = { currentStudent.studentName }
                />

                <CFormInput
                    type="text"
                    id="studentEmail"
                    floatingClassName="mb-3"
                    floatingLabel="Adresse e-mail"
                    placeholder="Adresse e-mail"
                    onChange = { handleInputChange }
                    value = { currentStudent.studentEmail }
                />

                <CFormInput
                    type="text"
                    id="studentAddress"
                    floatingClassName="mb-3"
                    floatingLabel="Adresse du domicile"
                    placeholder="Adresse du domicile"
                    onChange = { handleInputChange }
                    value = { currentStudent.studentAddress }
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
                    disabled
                    onChange = { value => setCurrentStudent({...currentStudent, levelId: value })}
                    value = { currentStudent.levelId }
                />

            </Modal>
        </>
    )
}