import { CButton, CFormInput } from "@coreui/react";
import { Modal, Select } from "antd";
import { useEffect, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import useCustomContext from "../../hooks/useCustomContext";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import { scheduleItemInitialState } from "../../types/ObjectInitialState";
import { day, timeTable } from "../../constant/periode";

export default function NewScheduleItem(){

    const {
        getSubjects,
        getSchedules,
        subjects
    } = useCustomContext()

    useEffect( () => {
        getSubjects()
        getSchedules()
    }, [])

    const [ open, setOpen ] = useState( false )
    const [ schedule, setSchedule ] = useState( scheduleItemInitialState )

    const openModal = _=> setOpen(true)

    const closeModal = _=> {
        setOpen( false )
        setSchedule( scheduleItemInitialState )
    }

    const confirm = async _=> {
        if( !schedule.scheduleItemDay ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez selectionner un jour!",
                timer: 5000
            });
        }
        else if( !schedule.scheduleItemHour ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez selectionner une heure!",
                timer: 5000
            });
        }
        else if( !schedule.subjectId ){
            Swal.fire({
                position: "center",
                icon: "warning",
                title: "Veuillez choisir une matière!",
                timer: 5000
            });
        }
        else{
            await axios.post('/schedule/add', schedule )
            .then( _ => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Opération effectuée avec succès!",
                    showConfirmButton: false,
                    timer: 2000
                });
                getSchedules()
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

    return(
        <>
            <CButton color="success text-white" onClick = { openModal }> <i> <CiSquarePlus /> </i> Ajouter </CButton>

            <Modal
                open = { open }
                title = 'Nouvel horaire'
                okText = 'Ajouter'
                cancelText = 'Annuler'
                onCancel = { closeModal }
                onOk = { confirm }
                zIndex = {1050}
                centered
                style = {{ margin: '20px auto'}}
            >

                <Select
                    placeholder = "Jour"
                    style = {{ width: '100%', height: 50, marginBottom: 20}}
                    options = {
                        [{ label: "Choisissez un jour", value: ''}]
                        .concat(
                            ( Object.entries(day).map( ([ value, label ]) => ({
                                label ,
                                value
                            }))
                        ))
                    }
                    onChange = { value => setSchedule({...schedule, scheduleItemDay: value, subjectId: null }) }
                    value = { schedule.scheduleItemDay }
                />
                
                <Select
                    placeholder = "Heure"
                    style = {{ width: '100%', height: 50, marginBottom: 20}}
                    options = {
                        [{ label: "Choisissez une heure", value: ''}]
                        .concat(
                            ( Object.entries(timeTable).map( ([ value, label ]) => ({
                                label ,
                                value
                            }))
                        ))
                    }
                    onChange = { value => setSchedule({...schedule, scheduleItemHour: value, subjectId: null }) }
                    value = { schedule.scheduleItemHour }
                />

                <Select
                    placeholder = "Matière"
                    style = {{ width: '100%', height: 50, marginBottom: 20}}
                    options = {
                        [{ label: "Choisissez une matière", value: ''}]
                        .concat(
                            subjects.map( subject => ({
                                label: subject.subjectName ,
                                value: subject.subjectId
                            }))
                        )
                    }
                    onChange = { value => setSchedule({...schedule, subjectId: value }) }
                    value = { schedule.subjectId }
                />

            </Modal>
        </>
    )
}