import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Table, Input, Space } from 'antd'
import { AiOutlineDelete } from "react-icons/ai"
import { scheduleTableColumns } from "../../constant/tableColumns";
import useCustomContext from "../../hooks/useCustomContext";
import { useEffect, useState } from "react";
const { Search } = Input
import Swal from 'sweetalert2'
import axios from "../../api/axios";
import NewScheduleItem from "./NewScheduleItem";
import { useNavigate } from "react-router-dom";
import { day, timeTable } from "../../constant/periode";

export default function Subject(){

    const {
        schedules,
        getSchedules
    } = useCustomContext()

    const [ search, setSearch ] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        getSchedules()
    }, [])

    const onSearch = (value, _e, info) => set(info?.source, value)

    const searchedData = schedules.filter( timeTable =>
        timeTable.scheduleItemDay?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        timeTable.scheduleItemHour?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        timeTable.Subject?.subjectName?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        timeTable.Subject?.Professor?.professorName?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        timeTable.Subject?.Level?.levelDesignation?.toString().toLowerCase().includes( search.toString().toLowerCase())
    )

    const deleteSchedule = async subjectId => {
       
        Swal.fire({
            title: "Suppression",
            text: "Souhaitez-vous continuer la suppression?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Continuer",
            cancelButtonText: "Annuler",
            reverseButtons: true
        }).then( async result => {
            if (result.isConfirmed) {
                await axios.delete(`/subject/delete/${subjectId}`)
                .then( _ => {
                    getSchedules()
                    Swal.fire({
                        title: "Suppression",
                        text: "Suppression effectuée avec succès!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                })
                .catch( error => {
                    if( error?.response?.data?.message ){
                        Swal.fire({
                            title: "Suppression",
                            text: error?.response?.data?.message,
                            icon: "error"
                        });
                    }
                    else{
                        Swal.fire({
                            title: "Suppression",
                            text: error.message,
                            icon: "error"
                        });
                    }
                })
            } 
        });
    }

    return(
        <>
            <CRow >
                <CCol xs = { 12 }>

                    <CRow
                        className = "d-flex mx-2 "
                        style = {{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                    >
                        <CCol>

                            <Search 
                                placeholder = "Recherche ..."
                                onSearch = { onSearch }
                                enterButton
                                onChange = { e => setSearch( e.target.value ) }
                                size = "large"
                                style = {{ width: 300, marginRight: 10 }}
                            />
                            <NewScheduleItem />

                            <CButton
                                color = "primary"
                                className="text-white ms-2"
                                onClick = { _ => navigate('/app/schedule/insight') }
                            >
                                Aperçu
                            </CButton>
                        </CCol>
                    </CRow>

                    <CCard className="m-4">
                        <CCardHeader> HORAIRE </CCardHeader>
                        <CCardBody>
                            <Table
                                size = "small"
                                dataSource = {
                                    searchedData.map(( item, key )=>({
                                        ...item,
                                        key: key,
                                        levelDesignation: item.Subject?.Level?.levelDesignation,
                                        professorName: item.Subject?.Professor?.professorName,
                                        subjectName: item.Subject?.subjectName,
                                        scheduleItemHour: timeTable[ item.scheduleItemHour ],
                                        scheduleItemDay: day[ item.scheduleItemDay ],
                                        action:
                                        <Space>

                                            <CButton
                                                color="danger"
                                                className="text-white"
                                                onClick = { () => deleteSchedule( item.subjectId ) }
                                            >
                                                <AiOutlineDelete />
                                            </CButton>

                                        </Space>
                                    }))
                                }
                                columns = { scheduleTableColumns }
                                scroll = {{
                                    y: 'calc( 100vh - 470px )',
                                    x: '70vw'
                                }}
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </>
    )
}