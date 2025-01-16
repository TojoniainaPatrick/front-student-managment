import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Table, Input, Space } from 'antd'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import NewStudent from "./NewStudent";
import { studentTableColumns } from "../../constant/tableColumns";
import useCustomContext from "../../hooks/useCustomContext";
import { useEffect, useState } from "react";
const { Search } = Input
import Swal from 'sweetalert2'
import axios from "../../api/axios";
import EditStudent from "./EditStudent";

export default function Student(){

    const {
        students,
        setCurrentStudent,
        getStudents
    } = useCustomContext()

    const [ search, setSearch ] = useState('')
    const [ openUpdate, setOpenUpdate ] = useState( false )

    useEffect(() => {
        getStudents()
    }, [])

    const onSearch = (value, _e, info) => set(info?.source, value)

    const searchedData = students.filter( student =>
        student.studentInscriptionNumber?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        student.studentName?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        student.studentEmail?.toString().toLowerCase().includes( search.toString().toLowerCase()) || 
        student.studentAddress?.toString().toLowerCase().includes( search.toString().toLowerCase()) || 
        student.Level?.levelDesignation?.toString().toLowerCase().includes( search.toString().toLowerCase()) 
    )
 
    const handleOpenUpdate = professor => {
        setCurrentStudent( professor )
        setOpenUpdate( true )
    }

    const deleteStudent = async studentId => {
       
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
                await axios.delete(`/student/delete/${studentId}`)
                .then( _ => {
                    getStudents()
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
            <EditStudent open = { openUpdate } setOpen = { setOpenUpdate } />
            <CRow >
                <CCol xs = { 12 }>

                    <CRow
                        className="d-flex mx-2 "
                        style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}
                    >
                        <CCol>
                            <Search 
                                placeholder="Recherche ..."
                                onSearch={onSearch}
                                enterButton
                                onChange = { e => setSearch( e.target.value ) }
                                size="large"
                                style={{ width: 300, marginRight: 10 }}
                            />
                            <NewStudent />
                        </CCol>
                    </CRow>

                    <CCard className="m-4">
                        <CCardHeader> ETUDIANT </CCardHeader>
                        <CCardBody>
                            <Table
                                size="small"
                                dataSource = {
                                    searchedData.map(( item, key )=>({
                                        ...item,
                                        key: key,
                                        studentLevel: item.Level?.levelDesignation,
                                        action: <Space>
                                            
                                            <CButton 
                                                color="primary"
                                                className="text-white me-1"
                                                onClick = { _ => handleOpenUpdate( item )}
                                            >
                                                <AiOutlineEdit />
                                            </CButton>

                                            <CButton
                                                color="danger"
                                                className="text-white"
                                                onClick = { () => deleteStudent( item.studentId) }
                                            >
                                                <AiOutlineDelete />
                                            </CButton>

                                        </Space>
                                    }))
                                }
                                columns = { studentTableColumns }
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