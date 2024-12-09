import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react"
import useCustomContext from "../../hooks/useCustomContext";
import { useEffect, useState } from "react";
import { MdDeleteOutline, MdEditSquare } from "react-icons/md";
import NewAcademicYear from "./NewAcademicYear";
import NewLevel from "./NewLevel";
import Swal from "sweetalert2";
import axios from "../../api/axios";
import EditLevel from "./EditLevel";

export default function ScheduleInsight(){

    const {
        getLastYear,
        lastYear,
        getAcademicYears,
        academicYears,
        setCurrentLevel
    } = useCustomContext()

    useEffect(() => {
        getLastYear()
        getAcademicYears()
    }, [])

    const [ selectedYear, setSelectedyear ] = useState( lastYear )
    const [ openEdit, setOpenEdit ] = useState( false )

    const clickYear = year => {
        if ( selectedYear?.academicYearId == year.academicYearId ){
            setSelectedyear( null )
        }
        else{
            setSelectedyear( year )
        }
    }

    
    const deleteLevel = async levelId => {
       
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
                await axios.delete(`/level/delete/${levelId}`)
                .then( _ => {
                    getLastYear()
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

    const editLevel = level => {
        setCurrentLevel( level )
        setOpenEdit( true )
    }

    return(
        <CRow>

            <EditLevel open = { openEdit } setOpen = { setOpenEdit } />

            <CCol xs = { 12 } md = { 4 } >

                <CCard className = "mb-4">

                    <CCardHeader className="d-flex align-items-center justify-content-between">
                        <h6> Année universitaire </h6>
                        <NewAcademicYear />
                    </CCardHeader>

                    <CCardBody>
                        {
                            academicYears
                            .sort(( a, b ) => b.academicYearId - a.academicYearId )
                            .map(( year, index ) =>
                                <CCard onClick = { () => clickYear( year ) } className="mb-2" key = { index }>
                                    <CCardBody
                                        className = {
                                            lastYear?.academicYearId == year.academicYearId
                                            ? 'text-center bg-primary text-white'
                                            : selectedYear?.academicYearId == year.academicYearId
                                            ? 'text-center bg-secondary text-white'
                                            : 'text-center text-secondary'
                                        }
                                    >
                                        { `${ year?.year1 } - ${ year?.year2 }` }
                                    </CCardBody>
                                </CCard>
                            )
                        }
                    </CCardBody>

                </CCard>

            </CCol>

            <CCol xs = { 12 } md = { 8 } >

                <CCard className = "mb-4">

                    <CCardHeader className="d-flex align-items-center justify-content-between">
                        <h6> Niveau </h6>
                        <NewLevel />
                    </CCardHeader>

                    <CCardBody>
                        <CRow>
                            {
                                (
                                    Array.isArray( selectedYear?.Levels ) ?
                                    selectedYear?.Levels :
                                    Array.isArray( lastYear.Levels ) ? lastYear.Levels : []
                                )
                                .map(( level, index ) =>
                                    <CCol key = { index } xs = { 12 } md = { 4 }>
                                        <CCard className="mb-2">
                                            <CCardHeader className="text-end">
                                                <CButton onClick = { () => editLevel( level ) }  color="secondary" className="text-white"> <MdEditSquare /> </CButton>
                                                <CButton onClick = { () => deleteLevel( level.levelId ) } color="danger" className="text-white ms-2"> <MdDeleteOutline /> </CButton>
                                            </CCardHeader>
                                            <CCardBody>
                                                <p> <strong className="text-primary"> Designation : </strong> { level.levelDesignation } </p>
                                                <p> <strong className="text-primary"> Ecolage : </strong> { level.monthlySchoolFees } &nbsp; Ar </p>
                                            </CCardBody>
                                        </CCard>
                                    </CCol>
                                )
                            }
                        </CRow>
                    </CCardBody>

                </CCard>

                <CCard className = "mb-4">

                    <CCardHeader className="text-center">
                        <h6> Mois </h6>
                    </CCardHeader>

                    <CCardBody>
                        <CRow>
                            {
                                (
                                    Array.isArray( selectedYear?.Months ) ?
                                    selectedYear?.Months :
                                    Array.isArray( lastYear.Months ) ? lastYear.Months : []
                                )
                                .map(( month, index ) =>
                                    <CCol key = { index }  xs = { 12 } md = { 3 }>
                                        <CCard className="mb-2" style={{ cursor: 'pointer'}}>
                                            <CCardBody> { month.monthName } </CCardBody>
                                        </CCard>
                                    </CCol>
                                )
                            }
                        </CRow>
                    </CCardBody>

                </CCard>

            </CCol>

        </CRow>
    )
}