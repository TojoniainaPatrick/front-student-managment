import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import Swal from 'sweetalert2'
import logo from '../../assets/brand/logo.jpg'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CImage, CRow } from "@coreui/react";
import dayjs from "dayjs";

export default function PrintPayment(){
    const {
        schoolFeesId
    } = useParams()

    const [ schoolFees, setSchoolFees ] = useState({})

    useEffect(() => {
        const getSchoolFees = async () => {
            axios(`/school-fees/id/${ schoolFeesId }`)
            .then( response => {
                setSchoolFees( response.data.data )
            })
            .catch( error => {
                console.log( error )
                if ( error?.response?.data?.message ){
                    Swal.fire({
                        icon: 'error',
                        text: error.response.data.message,
                        // showConfirmButton: true
                    })
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        text: error.message
                    })
                }
            })
        }

        getSchoolFees()

    }, [])

    return(
        <CRow className="d-flex flex-column justify-content-center align-items-center print">

            <CCol xs = { 10 } className="mb-3">
                <CCard>
                    <CCardHeader>
                        <CCol className="d-flex justify-content-center align-items-center" xs = { 12 }>
                            <h4> Reçu de payement d'écolage </h4>
                        </CCol>
                    </CCardHeader>

                    <CCardBody>

                        <CCol sx = { 12 }>

                            <CRow>
                                <CCol xs = { 4 } className="d-flex justify-content-center align-items-center mb-3">
                                    <CCard>
                                        <CCardBody>
                                            <CImage src = { logo } width = { 120 } />
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                                <CCol xs = { 8 }>
                                    <CCard>
                                        <CCardBody>
                                            <p> <strong>Année Universitaire : </strong>{ schoolFees.Month?.AcademicYear?.year1 } - { schoolFees.Month?.AcademicYear?.year2 } </p>
                                            <p> <strong>Montant : </strong>{ schoolFees.schoolFeesAmount } &nbsp; Ariary </p>
                                            <p> <strong>Etudiant(e) : </strong>{ schoolFees.Student?.studentName } </p>
                                            <p> <strong>Niveau: </strong>{ schoolFees.Student?.Level?.levelDesignation } </p>
                                        </CCardBody>
                                    </CCard>
                                </CCol>
                            </CRow>

                        </CCol>

                        <CCol xs = { 12 }>
                            <CCard>
                                <CCardHeader>
                                    <CCol className="d-flex justify-content-center align-items-center" xs = { 12 }>
                                        <h6> Tranche(s) de paiement </h6>
                                    </CCol>
                                </CCardHeader>
                                <CCardBody>
                                    <table style = {{ width: '100%' }}>
                                        <thead>
                                            <tr style={{ height: 40, borderBottom: '1px solid lightGrey' }}>
                                                <th> Montant </th>
                                                <th> Date </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                schoolFees.PaymentInstallments?.map(( item, key ) =>
                                                    <tr style={{ height: 40, borderBottom: '1px solid lightGrey' }} key = { key }>
                                                        <td> { item.paymentInstallMentAmount } &nbsp; Ariary </td>
                                                        <td> { dayjs( item.paymentInstallmentDate).format("DD/MM/YYYY") } &nbsp;  </td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </CCardBody>
                            </CCard>
                        </CCol>

                        <CRow className="my-5">
                            <CCol xs = { 6 } className="mb-3 d-flex justify-content-center">
                                <h6> Etudiant </h6>
                            </CCol>
                            <CCol xs = { 6 } className="mb-3 d-flex justify-content-center">
                                <h6> Responsable </h6>
                            </CCol>
                        </CRow>

                    </CCardBody>
                </CCard>
            </CCol>

            <CCol xs = { 10 } className="mb-3 d-flex justify-content-end">
                <CButton color="danger" className="text-white none" onClick = { () => window.print()}> Imprimer </CButton>
            </CCol>

        </CRow>
    )
}