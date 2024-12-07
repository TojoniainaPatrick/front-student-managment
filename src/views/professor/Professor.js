import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import { Table, Input, Space } from 'antd'
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai"
import { professorTableColumns } from "../../constant/tableColumns";
import useCustomContext from "../../hooks/useCustomContext";
import { useEffect, useState } from "react";
const { Search } = Input
import Swal from 'sweetalert2'
import axios from "../../api/axios";
import EditProfessor from "./EditProfessor";
import NewProfessor from "./NewProfessor";

export default function Professor(){

    const {
        professors,
        getProfessors,
        setCurrentProfessor
    } = useCustomContext()

    const [ search, setSearch ] = useState('')
    const [ openUpdate, setOpenUpdate ] = useState( false )


    useEffect(() => {
        getProfessors()
    }, [])

    const onSearch = (value, _e, info) => set(info?.source, value)

    const searchedData = professors.filter( professor =>
        professor.professorName?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        professor.professorEmail?.toString().toLowerCase().includes( search.toString().toLowerCase()) ||
        professor.professorAddress?.toString().toLowerCase().includes( search.toString().toLowerCase()) 
    )

    const handleOpenUpdate = professor => {
        setCurrentProfessor( professor )
        setOpenUpdate( true )
    }

    const deleteProfessor = async professorId => {
       
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
                await axios.delete(`/professor/delete/${professorId}`)
                .then( _ => {
                    getProfessors()
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
            <EditProfessor open = { openUpdate } setOpen = { setOpenUpdate } />
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
                            <NewProfessor />
                        </CCol>
                    </CRow>

                    <CCard className="m-4">
                        <CCardHeader> ENSEIGNANT </CCardHeader>
                        <CCardBody>
                            <Table
                                size="small"
                                dataSource = {
                                    searchedData.map(( item, key )=>({
                                        ...item,
                                        key: key,
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
                                                onClick = { () => deleteProfessor( item.professorId) }
                                            >
                                                <AiOutlineDelete />
                                            </CButton>

                                        </Space>
                                    }))
                                }
                                columns = { professorTableColumns }
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