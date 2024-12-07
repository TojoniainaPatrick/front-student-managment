import { CFormInput } from "@coreui/react";
import { Modal, Select } from "antd";
import { useEffect } from "react";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { subjectInitialState } from "../../types/ObjectInitialState";

export default function EditSubject({ open, setOpen }){

    const {
        getProfessors,
        getSubjects,
        getLastYear,
        lastYear,
        professors,
        currentSubject,
        setCurrentSubject
    } = useCustomContext()

    useEffect( () => {
        getProfessors()
        getLastYear()
    }, [])

    const closeModal = _=> {
        setOpen( false )
        setCurrentSubject( subjectInitialState )
    }

    const confirm = async _=> {
        if( !currentSubject.subjectName ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer la désignation de la matière!",
                timer: 5000
            });
        }
        else{
            await axios.put(`/subject/edit/${ currentSubject.subjectId }`, currentSubject )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 2000
                });
                getSubjects()
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
        setCurrentSubject({ ...currentSubject, [ e.target.id ]: e.target.value })
    }

    return(
        <>
            <Modal
                open = { open }
                title = 'Nouvelle matière'
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
                    id="subjectName"
                    floatingClassName="mb-3"
                    floatingLabel="Désignation"
                    placeholder="Désignation"
                    onChange = { handleInputChange }
                    value = { currentSubject.subjectName }
                />

                <Select
                    placeholder = "Enseignant"
                    style = {{ width: '100%', height: 50, marginBottom: 20}}
                    disabled
                    options = {
                        [{ label: "Choisissez un(e) enseignant(e)", value: ''}]
                        .concat(
                            ( Array.isArray( professors ) ? professors : [] ).map( level => ({
                                label: level.professorName ,
                                value: level.professorId
                            }))
                        )
                    }
                    onChange = { value => setCurrentSubject({...currentSubject, professorId: value }) }
                    value = { currentSubject.professorId }
                />

                <Select
                    placeholder = "Niveau"
                    style = {{ width: '100%', height: 50, marginBottom: 20}}
                    disabled
                    options = {
                        [{ label: "Choisissez un niveau", value: ''}]
                        .concat(
                            lastYear?.Levels?.map( level => ({
                                label: level.levelDesignation ,
                                value: level.levelId
                            }))
                        )
                    }
                    onChange = { value => setCurrentSubject({...currentSubject, levelId: value }) }
                    value = { currentSubject.levelId }
                />

            </Modal>
        </>
    )
}