import { CButton, CFormInput } from "@coreui/react";
import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { subjectInitialState } from "../../types/ObjectInitialState";

export default function NewSubject(){

    const {
        getProfessors,
        getSubjects,
        getLastYear,
        lastYear,
        professors
    } = useCustomContext()

    useEffect( () => {
        getProfessors()
        getLastYear()
    }, [])

    const [ open, setOpen ] = useState( false )
    const [ subject, setSubject ] = useState( subjectInitialState )

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setSubject( subjectInitialState )
    }

    const confirm = async _=> {
        if( !subject.subjectName ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez indiquer la désignation de la matière!",
                timer: 5000
            });
        }
        else if( !subject.professorId ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez choisir un(e) enseignant(e)!",
                timer: 5000
            });
        }
        else if( !subject.levelId ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez choisir un niveau!",
                timer: 5000
            });
        }
        else{
            await axios.post('/subject/add', subject )
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
        setSubject({ ...subject, [ e.target.id ]: e.target.value })
    }

    return(
        <>
            <CButton color="success text-white" onClick = { openModal }> <i> <CiSquarePlus /> </i> Ajouter </CButton>

            <Modal
                open = { open }
                title = 'Nouvelle matière'
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
                    id="subjectName"
                    floatingClassName="mb-3"
                    floatingLabel="Désignation"
                    placeholder="Désignation"
                    onChange = { handleInputChange }
                    value = { subject.subjectName }
                />

                <Select
                    placeholder = "Enseignant"
                    style = {{ width: '100%', height: 50, marginBottom: 20}}
                    options = {
                        [{ label: "Choisissez un(e) enseignant(e)", value: ''}]
                        .concat(
                            ( Array.isArray( professors ) ? professors : [] ).map( level => ({
                                label: level.professorName ,
                                value: level.professorId
                            }))
                        )
                    }
                    onChange = { value => setSubject({...subject, professorId: value }) }
                    value = { subject.professorId }
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
                    onChange = { value => setSubject({...subject, levelId: value }) }
                    value = { subject.levelId }
                />

            </Modal>
        </>
    )
}